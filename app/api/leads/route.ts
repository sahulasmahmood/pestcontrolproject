import { NextRequest, NextResponse } from "next/server";
import Lead from "@/config/utils/admin/lead/leadSchema";
import connectDB from "@/config/models/connectDB";
import EmailSMTP from "@/config/utils/admin/smtp/emailSMTPSchema";
import { createSMTPTransporter } from "@/config/models/connectSMTP";
import crypto from "crypto";

// POST - Create new lead from frontend forms
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Basic validation - only check essential fields that we know exist
    if (!body.fullName || !body.phone || !body.serviceType) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Missing required fields: fullName, phone, and serviceType are required" 
        },
        { status: 400 }
      );
    }
    
    // Ensure we have either address or a default
    if (!body.address) {
      body.address = "To be specified";
    }
    
    // Ensure we have either serviceDate or a default
    if (!body.serviceDate) {
      body.serviceDate = new Date().toISOString().split('T')[0];
    }
    
    // Generate review token for future review invitations
    if (body.email && !body.reviewToken) {
      body.reviewToken = crypto.randomBytes(32).toString('hex');
    }
    
    const newLead = new Lead(body);
    const savedLead = await newLead.save();

    // Send email notifications
    try {
      await sendServiceBookingEmails(savedLead);
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the lead creation if email fails
    }

    return NextResponse.json({
      success: true,
      data: savedLead,
      message: "Service booking request submitted successfully! We'll contact you soon.",
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    
    // Handle validation errors from mongoose
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: "Please check all required fields are filled correctly" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

// Function to send service booking emails
async function sendServiceBookingEmails(lead: any) {
  // Get SMTP configuration
  const smtpConfig = await EmailSMTP.findOne({
    id: "default",
    isActive: true,
  });

  if (!smtpConfig) {
    console.warn("SMTP configuration not found - service booking submitted without email notification");
    return;
  }

  // Send admin notification
  await sendAdminServiceNotification(smtpConfig, lead);
  
  // Send customer confirmation
  await sendCustomerServiceConfirmation(smtpConfig, lead);
}

// Function to send admin notification for service booking
async function sendAdminServiceNotification(smtpConfig: any, lead: any) {
  const transporter = createSMTPTransporter(smtpConfig);
  const adminEmail = process.env.SMTP_FROM_EMAIL || smtpConfig.fromEmail;

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #22C55E 0%, #059669 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Service Booking Request</h1>
        <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Perfect Pest Control Admin Panel</p>
      </div>
      
      <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="border-left: 4px solid #22C55E; padding-left: 20px; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 10px 0;">Booking Information</h2>
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>Status:</strong> <span style="background-color: #22C55E; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">NEW BOOKING</span></p>
            <p style="margin: 5px 0;"><strong>Service Type:</strong> <span style="background-color: #059669; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.serviceType}</span></p>
            <p style="margin: 5px 0;"><strong>Property Type:</strong> <span style="background-color: #16a34a; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${lead.propertyType || 'Not specified'}</span></p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Customer Details</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${lead.fullName}</p>
            ${lead.email ? `<p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}" style="color: #22C55E;">${lead.email}</a></p>` : ''}
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${lead.phone}" style="color: #22C55E;">${lead.phone}</a></p>
            <p style="margin: 10px 0;"><strong>Address:</strong> ${lead.address}</p>
          </div>
          
          <div>
            <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Service Details</h3>
            <p style="margin: 10px 0;"><strong>Service:</strong> ${lead.serviceType}</p>
            <p style="margin: 10px 0;"><strong>Property:</strong> ${lead.propertyType || 'Not specified'}</p>
            <p style="margin: 10px 0;"><strong>Preferred Date:</strong> ${new Date(lead.serviceDate).toLocaleDateString('en-IN')}</p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
          </div>
        </div>

        ${lead.message ? `
        <div style="margin-bottom: 30px;">
          <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Additional Message</h3>
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E;">
            <p style="margin: 0; line-height: 1.6; color: #1f2937;">${lead.message}</p>
          </div>
        </div>
        ` : ''}

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            This email was automatically generated from the Perfect Pest Control website.<br>
            Lead ID: #${lead._id}<br>
            Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
    to: adminEmail,
    subject: `New Service Booking: ${lead.serviceType} - ${lead.fullName}`,
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}

// Function to send customer confirmation for service booking
async function sendCustomerServiceConfirmation(smtpConfig: any, lead: any) {
  if (!lead.email) {
    console.log("No customer email provided, skipping confirmation email");
    return;
  }

  const transporter = createSMTPTransporter(smtpConfig);

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      <div style="background: linear-gradient(135deg, #22C55E 0%, #059669 100%); padding: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Service Booking Confirmed!</h1>
        <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Perfect Pest Control</p>
      </div>
      
      <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin: 0 0 15px 0;">Hi ${lead.fullName}!</h2>
          <p style="color: #4b5563; line-height: 1.6; margin: 0;">
            Thank you for choosing Perfect Pest Control! We have received your service booking request and our team will contact you within 24 hours to schedule your service.
          </p>
        </div>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Your Booking Details:</h3>
          <p style="margin: 5px 0;"><strong>Service:</strong> ${lead.serviceType}</p>
          <p style="margin: 5px 0;"><strong>Address:</strong> ${lead.address}</p>
          <p style="margin: 5px 0;"><strong>Preferred Date:</strong> ${new Date(lead.serviceDate).toLocaleDateString('en-IN')}</p>
        </div>

        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">What Happens Next?</h3>
          <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Our team will call you within 24 hours to confirm the appointment</li>
            <li>Our certified technicians will perform the treatment</li>
            <li>We'll provide follow-up support and warranty as applicable</li>
          </ul>
        </div>

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0;">Why Choose Perfect Pest Control?</h3>
          <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>Professional and certified pest control experts</li>
            <li>Safe and eco-friendly treatment methods</li>
            <li>24/7 emergency service available</li>
            <li>Comprehensive warranty on treatments</li>
            <li>Serving Tirunelveli and surrounding areas</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #4b5563; margin: 0 0 15px 0;">Need immediate assistance or have questions?</p>
          <p style="margin: 5px 0;"><strong>Call:</strong> <a href="tel:04624802258" style="color: #22C55E;">04624802258</a></p>
          <p style="margin: 5px 0;"><strong>WhatsApp:</strong> <a href="tel:9626341555" style="color: #22C55E;">9626341555</a></p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:perfectpestcontrol555@gmail.com" style="color: #22C55E;">perfectpestcontrol555@gmail.com</a></p>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            Best regards,<br>
            Perfect Pest Control Team<br>
            Professional Pest Management Services<br>
            Tirunelveli, Tamil Nadu
          </p>
        </div>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`,
    to: lead.email,
    subject: "Service Booking Confirmed - Perfect Pest Control",
    html: emailHTML,
  };

  await transporter.sendMail(mailOptions);
}