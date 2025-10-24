import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import ServiceType from "@/config/utils/admin/services/serviceTypeSchema";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// PUT - Update service type
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
          message: "Service type name is required",
        },
        { status: 400 }
      );
    }

    // Check if service type exists
    const existingServiceType = await ServiceType.findById(id);
    if (!existingServiceType) {
      return NextResponse.json(
        { success: false, message: "Service type not found" },
        { status: 404 }
      );
    }

    // Check if new name already exists (excluding current service type)
    const duplicateServiceType = await ServiceType.findOne({ 
      name: body.name.trim(),
      _id: { $ne: id }
    });

    if (duplicateServiceType) {
      return NextResponse.json(
        {
          success: false,
          message: "Service type with this name already exists",
        },
        { status: 400 }
      );
    }

    const updatedServiceType = await ServiceType.findByIdAndUpdate(
      id,
      { name: body.name.trim() },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedServiceType,
      message: "Service type updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating service type:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Service type already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update service type",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete service type (hard delete)
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

    const serviceType = await ServiceType.findById(id);
    if (!serviceType) {
      return NextResponse.json(
        { success: false, message: "Service type not found" },
        { status: 404 }
      );
    }

    // Hard delete - permanently remove from database
    await ServiceType.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Service type deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting service type:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete service type",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
