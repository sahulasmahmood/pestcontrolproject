import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import connectDB from "@/config/models/connectDB";
import Service from "@/config/utils/admin/services/serviceSchema";
import { uploadToCloudinary } from "@/config/utils/cloudinary";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// GET - Fetch services with pagination and filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const status = searchParams.get("status");
    const serviceType = searchParams.get("serviceType");
    const featured = searchParams.get("featured");

    // Build query
    const query: any = { isDeleted: false };
    if (status) query.status = status;
    if (serviceType) query.serviceType = serviceType;
    if (featured !== null) query.featured = featured === "true";

    const skip = (page - 1) * limit;

    // Get services and total count
    const [services, totalServices] = await Promise.all([
      Service.find(query)
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

// POST - Create new service
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication first
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

    const contentType = request.headers.get("content-type");
    let body: any;
    let mainImageFile: File | null = null;
    let galleryImageFiles: File[] = [];

    // Handle multipart form data (with files)
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      
      // Extract text fields
      body = {
        serviceName: formData.get("serviceName") as string,
        serviceType: formData.get("serviceType") as string,
        shortDescription: formData.get("shortDescription") as string || "",
        description: formData.get("description") as string,
        basePrice: formData.get("basePrice") as string,
        coverageArea: formData.get("coverageArea") as string,
        serviceAreaTypes: JSON.parse(formData.get("serviceAreaTypes") as string || "[]"),
        featured: formData.get("featured") === "true",
        status: formData.get("status") as string,
        image: formData.get("existingImage") as string || "",
        gallery: [],
        inclusions: JSON.parse(formData.get("inclusions") as string || "[]"),
        pests: JSON.parse(formData.get("pests") as string || "[]"),
        seoTitle: formData.get("seoTitle") as string || "",
        seoDescription: formData.get("seoDescription") as string || "",
        seoKeywords: formData.get("seoKeywords") as string || "",
      };

      // Extract existing gallery URLs
      const existingGallery: string[] = [];
      for (const [key, value] of formData.entries()) {
        if (key.startsWith('existingGallery[') && value) {
          existingGallery.push(value as string);
        }
      }
      body.gallery = existingGallery;

      // Extract file uploads
      mainImageFile = formData.get("mainImage") as File;
      
      const galleryFiles = formData.getAll("galleryImages") as File[];
      galleryImageFiles = galleryFiles.filter(file => file && file.size > 0);
      
    } else {
      // Handle JSON data (no files)
      body = await request.json();
    }
    
    // Check if maximum featured services limit reached (3 featured services max)
    if (body.featured) {
      const existingFeaturedCount = await Service.countDocuments({ featured: true, isDeleted: false });
      if (existingFeaturedCount >= 3) {
        return NextResponse.json(
          {
            success: false,
            message: "Maximum limit of 3 featured services reached. Please unfeature an existing service to feature this one.",
          },
          { status: 400 }
        );
      }
    }
    
    // Validate required fields - only Service Name, Type, and Description are required
    const requiredFields = ['serviceName', 'serviceType', 'description'];
    for (const field of requiredFields) {
      if (!body[field] || body[field].toString().trim() === '') {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required and cannot be empty`,
          },
          { status: 400 }
        );
      }
    }

    // Validate that we have either an existing image or a new image file
    if (!body.image && !mainImageFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Service image is required",
        },
        { status: 400 }
      );
    }

    // Generate slug from service name
    const slug = body.serviceName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let finalImageUrl = body.image;
    let finalGalleryUrls = [...body.gallery];

    // Upload main image to Cloudinary if new file provided
    if (mainImageFile) {
      try {
        const bytes = await mainImageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const folderPath = `services/${slug}/main`;
        const result = await uploadToCloudinary(buffer, folderPath);
        finalImageUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Main image upload failed:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload main image",
          },
          { status: 500 }
        );
      }
    }

    // Upload gallery images to Cloudinary if new files provided
    if (galleryImageFiles.length > 0) {
      try {
        const uploadPromises = galleryImageFiles.map(async (file) => {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const folderPath = `services/${slug}/gallery`;
          const result = await uploadToCloudinary(buffer, folderPath);
          return result.secure_url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        finalGalleryUrls = [...finalGalleryUrls, ...uploadedUrls];
      } catch (uploadError) {
        console.error("Gallery images upload failed:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload gallery images",
          },
          { status: 500 }
        );
      }
    }
    
    const serviceData = {
      ...body,
      slug,
      image: finalImageUrl,
      gallery: finalGalleryUrls,
    };
    
    const newService = new Service(serviceData);
    const savedService = await newService.save();
    
    // Revalidate pages after creating new service
    try {
      revalidatePath('/services');
      revalidatePath('/');
      revalidateTag('services');
    } catch (revalidateError) {
      console.error('Revalidation error:', revalidateError);
    }
    
    return NextResponse.json({
      success: true,
      data: savedService,
      message: "Service created successfully",
    });

  } catch (error: any) {
    console.error("Error in POST request:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process request",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
