import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import ServiceType from "@/config/utils/admin/services/serviceTypeSchema";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// GET - Fetch all service types
export async function GET(request: NextRequest) {
  try {
    await connectDB();

     const serviceTypes = await ServiceType.find()
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: serviceTypes,
      message: "Service types fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching service types:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch service types",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - Create new service type
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    await connectDB();

    const body = await request.json();
    
    if (!body.name || body.name.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          message: "Service type name is required",
        },
        { status: 400 }
      );
    }

    // Check if service type already exists
    const existingServiceType = await ServiceType.findOne({ 
      name: body.name.trim()
    });

    if (existingServiceType) {
      return NextResponse.json(
        {
          success: false,
          message: "Service type already exists",
        },
        { status: 400 }
      );
    }

    const newServiceType = new ServiceType({ name: body.name.trim() });
    const savedServiceType = await newServiceType.save();
    
    return NextResponse.json({
      success: true,
      data: savedServiceType,
      message: "Service type created successfully",
    });

  } catch (error: any) {
    console.error("Error creating service type:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Service type already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create service type",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
