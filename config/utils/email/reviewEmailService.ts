import EmailSMTP from "@/config/utils/admin/smtp/emailSMTPSchema";
import { createSMTPTransporter } from "@/config/models/connectSMTP";

// Function to send review invitation email
export async function sendReviewInvitation(lead: any) {
  try {
    // Get SMTP configuration
    const smtpConfig = await EmailSMTP.findOne({
      id: "default",
      isActive: true,
    });

    if (!smtpConfig) {
      console.warn("SMTP configuration not found - review invitation not sent");
      return;
    }

    if (!lead.email || !lead.reviewToken) {
      console.log("No customer email or review token, skipping review invitation");
      return;
    }

    const transporter = createSMTPTransporter(smtpConfig);
    const reviewUrl = `${process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/review?token=${lead.reviewToken}`;

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #22C55E 0%, #059669 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">How was our service?</h1>
          <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Perfect Pest Control</p>
        </div>
        
        <div style="padding: 30px; background-color: white; margin: 20px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #1f2937; margin: 0 0 15px 0;">Hi ${lead.fullName}!</h2>
            <p style="color: #4b5563; line-height: 1.6; margin: 0;">
              We hope you're satisfied with our ${lead.serviceType} service. Your feedback helps us improve and helps other customers make informed decisions.
            </p>
          </div>

          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22C55E; margin-bottom: 30px;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0;">Service Details:</h3>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${lead.serviceType}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(lead.serviceDate).toLocaleDateString('en-IN')}</p>
            <p style="margin: 5px 0;"><strong>Address:</strong> ${lead.address}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${reviewUrl}" style="display: inline-block; background: linear-gradient(135deg, #22C55E 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Share Your Review
            </a>
          </div>

          <div style="background-color: #fffbeb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #1f2937; margin: 0 0 15px 0;">Why Your Review Matters:</h3>
            <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
              <li>Helps us maintain high service standards</li>
              <li>Assists other customers in choosing our services</li>
              <li>Takes less than 2 minutes to complete</li>
              <li>Your honest feedback is valuable to us</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #4b5563; margin: 0 0 15px 0;">Need support or have concerns?</p>
            <p style="margin: 5px 0;"><strong>Call:</strong> <a href="tel:04624802258" style="color: #22C55E;">04624802258</a></p>
            <p style="margin: 5px 0;"><strong>WhatsApp:</strong> <a href="tel:9626341555" style="color: #22C55E;">9626341555</a></p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:perfectpestcontrol555@gmail.com" style="color: #22C55E;">perfectpestcontrol555@gmail.com</a></p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 2px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              Thank you for choosing Perfect Pest Control!<br>
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
      subject: "Share Your Experience - Perfect Pest Control Review",
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log("Review invitation email sent to:", lead.email);
  } catch (error) {
    console.error("Failed to send review invitation:", error);
  }
}