import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Service from "@/config/utils/admin/services/serviceSchema";

// GET - Fetch single service by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    // Find service by slug
    const service = await Service.findOne({
      slug,
      status: "active",
      isDeleted: false
    })
      .select('-isDeleted -__v')
      .lean();

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found",
        },
        { status: 404 }
      );
    }

    // Increment view count
    await Service.findByIdAndUpdate(service._id, {
      $inc: { views: 1 }
    });

    return NextResponse.json({
      success: true,
      data: service,
      message: "Service fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch service",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}