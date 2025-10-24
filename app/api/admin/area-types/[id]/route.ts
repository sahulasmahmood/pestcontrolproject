import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import AreaType from "@/config/utils/admin/services/areaTypeSchema";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// PUT - Update area type
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
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

    // Check if area type exists
    const existingAreaType = await AreaType.findById(id);
    if (!existingAreaType) {
      return NextResponse.json(
        { success: false, message: "Area type not found" },
        { status: 404 }
      );
    }

    // Check if new name already exists (excluding current area type)
    const duplicateAreaType = await AreaType.findOne({ 
      name: body.name.trim(),
      _id: { $ne: id }
    });

    if (duplicateAreaType) {
      return NextResponse.json(
        {
          success: false,
          message: "Area type with this name already exists",
        },
        { status: 400 }
      );
    }

    const updatedAreaType = await AreaType.findByIdAndUpdate(
      id,
      { name: body.name.trim() },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedAreaType,
      message: "Area type updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating area type:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Area type already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update area type",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete area type (hard delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    await connectDB();

    const { id } = await params;

    const areaType = await AreaType.findById(id);
    if (!areaType) {
      return NextResponse.json(
        { success: false, message: "Area type not found" },
        { status: 404 }
      );
    }

    // Hard delete - permanently remove from database
    await AreaType.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Area type deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting area type:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete area type",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
