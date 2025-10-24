import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Service from "@/config/utils/admin/services/serviceSchema";

// GET - Fetch active services for public use
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const serviceType = searchParams.get("serviceType");
    const featured = searchParams.get("featured");

    // Build query for active services only
    const query: any = { 
      status: "active", 
      isDeleted: false 
    };
    
    if (serviceType) query.serviceType = serviceType;
    if (featured !== null) query.featured = featured === "true";

    const skip = (page - 1) * limit;

    // Get services and total count
    const [services, totalServices] = await Promise.all([
      Service.find(query)
        .select('-isDeleted -__v') // Exclude internal fields
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Service.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalServices / limit);

    return NextResponse.json({
      success: true,
      data: services,
      pagination: {
        currentPage: page,
        totalPages,
        totalServices,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      message: "Services fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}