import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Contact from "@/config/utils/admin/contact/ContactSchema";

// GET - Fetch contact information
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get the contact information (there should only be one record)
    let contactInfo = await Contact.findOne();

    // If no contact info exists, create default data
    if (!contactInfo) {
      const defaultContactInfo = {
        primaryPhone: "04624802258",
        secondaryPhone: "9626341555",
        whatsappNumber: "9626341555",
        email: "perfectpestcontrol555@gmail.com",
        address: "24, Rainbow Colony, Peratchi Amman Kovil Street, Vannarpettai",
        city: "Tirunelveli",
        state: "Tamil Nadu",
        pincode: "627003",
        country: "India",
        businessHours: "Mon-Sat: 8AM-8PM, Emergency 24/7",
        serviceHours: "24/7 Emergency Service Available",
        branchOffices: "Tuticorin, Tenkasi, Nagercoil, Madurai, Ramanathapuram",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "https://www.instagram.com/pestcontrol.tirunelveli",
        youtube: "",
        whatsapp: "",
        telegram: "",
        github: "",
        behance: "",
        dribbble: "",
        mapEmbedCode: "",
        latitude: "",
        longitude: "",
        pageTitle: "Get Professional Pest Control Services",
        pageDescription: "Need effective pest control solutions? Contact Perfect Pest Control for safe, reliable, and professional pest management services for your home and business.",
        officeTitle: "Visit Our Office - Perfect Pest Control",
        officeDescription: "Located in Tirunelveli, our office is easily accessible and our certified pest control experts are ready to help you with all your pest management needs.",
      };

      contactInfo = new Contact(defaultContactInfo);
      await contactInfo.save();
    }

    return NextResponse.json({
      success: true,
      data: contactInfo,
      message: "Contact information fetched successfully",
    });
  } catch (error: unknown) {
    console.error("Error fetching contact information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact information",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST - Create or update contact information
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['primaryPhone', 'whatsappNumber', 'email', 'address', 'city', 'state', 'pincode', 'country', 'pageTitle', 'pageDescription', 'officeTitle', 'officeDescription'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required and cannot be empty`,
          },
          { status: 400 }
        );
      }
    }

    // Check if contact info already exists
    let contactInfo = await Contact.findOne();

    if (contactInfo) {
      // Update existing contact info
      Object.assign(contactInfo, body);
      await contactInfo.save();
    } else {
      // Create new contact info
      contactInfo = new Contact(body);
      await contactInfo.save();
    }

    return NextResponse.json({
      success: true,
      data: contactInfo,
      message: "Contact information saved successfully",
    });
  } catch (error: unknown) {
    console.error("Error saving contact information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save contact information",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// PUT - Update contact information
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['primaryPhone', 'whatsappNumber', 'email', 'address', 'city', 'state', 'pincode', 'country', 'pageTitle', 'pageDescription', 'officeTitle', 'officeDescription'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === '') {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required and cannot be empty`,
          },
          { status: 400 }
        );
      }
    }

    // Find and update the contact info (there should only be one record)
    const contactInfo = await Contact.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      data: contactInfo,
      message: "Contact information updated successfully",
    });
  } catch (error: unknown) {
    console.error("Error updating contact information:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update contact information",
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}