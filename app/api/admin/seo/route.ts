import { NextRequest, NextResponse } from "next/server";
import SEO from "@/config/utils/admin/seo/seoSchema";
import connectDB from "@/config/models/connectDB";

// GET - Fetch all SEO data
export async function GET() {
  try {
    await connectDB();
    
    // Check if SEO data exists, if not create default data (only once)
    let seoData = await SEO.find({}).sort({ lastUpdated: -1 });
    
    if (seoData.length === 0) {
      // Create default SEO data if none exists - using upsert to prevent duplicates
      const defaultSEOData = [
        {
          id: "home",
          pageName: "Home Page",
          title: "Perfect Pest Control - Professional Services Tamil Nadu",
          description: "Expert pest control in Tamil Nadu. Anti-termite, rodent control, bed bug treatment, mosquito control & disinfection. Safe, effective solutions for homes & businesses.",
          keywords: "pest control tamil nadu, anti termite, rodent control, bed bug treatment, mosquito control, disinfection, tirunelveli pest control",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "about",
          pageName: "About Us",
          title: "About Perfect Pest Control - Trusted Pest Management",
          description: "Perfect Pest Control provides safe, eco-friendly pest solutions in Tamil Nadu. Licensed professionals offering residential & commercial pest management services.",
          keywords: "about perfect pest control, pest control company, trusted pest control, professional pest management, licensed pest control, eco-friendly",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "services",
          pageName: "Services Page",
          title: "Pest Control Services - Termite, Rodent, Bed Bug Control",
          description: "Complete pest control: anti-termite treatment, rodent control, bed bug elimination, cockroach & mosquito control, professional disinfection services.",
          keywords: "pest control services, anti termite, rodent control, bed bug treatment, cockroach control, mosquito control, disinfection, commercial pest control",
          lastUpdated: new Date(),
          isActive: true,
        },
        {
          id: "contact",
          pageName: "Contact Us",
          title: "Contact Perfect Pest Control - Book Service 24/7",
          description: "Contact Perfect Pest Control for professional services. Available 24/7 for emergency pest control in Tamil Nadu. Get free quotes & expert consultation today.",
          keywords: "contact pest control, pest control booking, emergency pest control, free quote, consultation, 24/7 service, customer support",
          lastUpdated: new Date(),
          isActive: true,
        },
      ];

      // Use bulkWrite with upsert to prevent duplicates
      const bulkOps = defaultSEOData.map(item => ({
        updateOne: {
          filter: { id: item.id },
          update: { $setOnInsert: item },
          upsert: true
        }
      }));

      await SEO.bulkWrite(bulkOps);
      seoData = await SEO.find({}).sort({ lastUpdated: -1 });
      console.log("✅ SEO data initialized with default values");
    }
    
    return NextResponse.json({
      success: true,
      data: seoData,
    });
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch SEO data" },
      { status: 500 }
    );
  }
}

// PUT - Update SEO data
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { id, title, description, keywords } = body;

    if (!id || !title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedSEO = await SEO.findOneAndUpdate(
      { id },
      {
        title,
        description,
        keywords: keywords || "",
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!updatedSEO) {
      return NextResponse.json(
        { success: false, error: "SEO page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSEO,
      message: "SEO data updated successfully",
    });
  } catch (error) {
    console.error("Error updating SEO data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update SEO data" },
      { status: 500 }
    );
  }
}