import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import EmailSMTP from "@/config/utils/admin/smtp/emailSMTPSchema";
import { createSMTPTransporter } from "@/config/models/connectSMTP";

// POST - Handle contact form submission
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Get SMTP configuration
    const smtpConfig = await EmailSMTP.findOne({
      id: "default",
      isActive: true,
    });

    if (!smtpConfig) {
      console.warn("SMTP configuration not found - contact form submitted without email notification");
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      });
    }

    try {
      // Send email notification to admin
      await sendContactNotification(smtpConfig, {
        name,
        email,
        phone,
        subject,
        message,
      });

      // Send confirmation email to customer
      await sendCustomerConfirmation(smtpConfig, {
        name,
        email,
        subject,
      });

      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Still return success to user, but log the email failure
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Function to send admin notification
async function sendContactNotification(smtpConfig: any, contactData: any) {
  const transporter = createSMTPTransporter(smtpConfig);

  const adminEmail = process.env.SMTP_FROM_EMAIL || smtpConfig.fromEmail;

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #22C55E 0%, #059669 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
        <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Perfect Pest Control</p>
      </div>
      
      <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="border-left: 4px solid #22C55E; padding-left: 20px; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 10px 0;">Contact Information</h2>
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${contactData.name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${contactData.email}" style="color: #22C55E;">${contactData.email}</a></p>
            ${contactData.phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${contactData.phone}" style="color: #22C55E;">${contactData.phone}</a></p>` : ''}
            ${contactData.subject ? `<p style="margin: 5px 0;"><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Message</h3>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E;">
            <p style="margin: 0; line-height: 1.6; color: #1f2937;">${contactData.message}</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            This email was automatically generated from the Perfect Pest Control website.<br>
            Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
    to: adminEmail,
    subject: `New Contact Form: ${contactData.subject || contactData.name}`,
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}

// Function to send customer confirmation
async function sendCustomerConfirmation(smtpConfig: any, contactData: any) {
  const transporter = createSMTPTransporter(smtpConfig);

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #22C55E 0%, #059669 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
        <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Perfect Pest Control</p>
      </div>
      
      <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0;">Hi ${contactData.name}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0;">
            Thank you for reaching out to Perfect Pest Control. We have received your message and our team will get back to you within 24 hours.
          </p>
        </div>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 10px 0;">Your Message Summary:</h3>
          ${contactData.subject ? `<p style="margin: 5px 0;"><strong>Subject:</strong> ${contactData.subject}</p>` : ''}
          <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </div>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Why Choose Perfect Pest Control?</h3>
          <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Professional and certified pest control experts</li>
            <li>Safe and eco-friendly treatment methods</li>
            <li>24/7 emergency service available</li>
            <li>Comprehensive pest management solutions</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #4b5563; margin: 0 0 15px 0;">Need immediate assistance?</p>
          <p style="margin: 5px 0;"><strong>Call:</strong> <a href="tel:04624802258" style="color: #22C55E;">04624802258</a></p>
          <p style="margin: 5px 0;"><strong>WhatsApp:</strong> <a href="tel:9626341555" style="color: #22C55E;">9626341555</a></p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:perfectpestcontrol555@gmail.com" style="color: #22C55E;">perfectpestcontrol555@gmail.com</a></p>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            Best regards,<br>
            Perfect Pest Control Team<br>
            Professional Pest Management Services
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
    to: contactData.email,
    subject: "Thank you for contacting Perfect Pest Control",
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}