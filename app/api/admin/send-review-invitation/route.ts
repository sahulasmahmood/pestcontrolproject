import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Lead from "@/config/utils/admin/lead/leadSchema";
import { sendReviewInvitation } from "@/config/utils/email/reviewEmailService";
import crypto from "crypto";

// POST - Send review invitation to a lead
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead ID is required",
        },
        { status: 400 }
      );
    }

    // Find the lead
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found",
        },
        { status: 404 }
      );
    }

    if (!lead.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead does not have an email address",
        },
        { status: 400 }
      );
    }

    // Generate review token if not exists
    if (!lead.reviewToken) {
      lead.reviewToken = crypto.randomBytes(32).toString('hex');
      await lead.save();
    }

    // Send review invitation
    await sendReviewInvitation(lead);

    return NextResponse.json({
      success: true,
      message: `Review invitation sent to ${lead.email}`,
    });
  } catch (error) {
    console.error("Error sending review invitation:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send review invitation",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}