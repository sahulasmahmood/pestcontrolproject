import { NextRequest, NextResponse } from "next/server";
import Lead from "@/config/utils/admin/lead/leadSchema";
import connectDB from "@/config/models/connectDB";

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
    
    const newLead = new Lead(body);
    const savedLead = await newLead.save();

    return NextResponse.json({
      success: true,
      data: savedLead,
      message: "Lead created successfully",
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