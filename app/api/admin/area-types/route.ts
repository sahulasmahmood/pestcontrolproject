import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import AreaType from "@/config/utils/admin/services/areaTypeSchema";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// GET - Fetch all area types
export async function GET(request: NextRequest) {
  try {
    await connectDB();

        const areaTypes = await AreaType.find()
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: areaTypes,
      message: "Area types fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching area types:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch area types",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - Create new area type
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
          message: "Area type name is required",
        },
        { status: 400 }
      );
    }

    // Check if area type already exists
    const existingAreaType = await AreaType.findOne({ 
      name: body.name.trim()
    });

    if (existingAreaType) {
      return NextResponse.json(
        {
          success: false,
          message: "Area type already exists",
        },
        { status: 400 }
      );
    }

    const newAreaType = new AreaType({ name: body.name.trim() });
    const savedAreaType = await newAreaType.save();
    
    return NextResponse.json({
      success: true,
      data: savedAreaType,
      message: "Area type created successfully",
    });

  } catch (error: any) {
    console.error("Error creating area type:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Area type already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create area type",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
