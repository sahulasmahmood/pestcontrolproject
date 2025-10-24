import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/models/connectDB";
import Service from "@/config/utils/admin/services/serviceSchema";
import { uploadToCloudinary } from "@/config/utils/cloudinary";
import jwt from "jsonwebtoken";

interface DecodedToken {
  adminId: string;
  email: string;
  role: string;
}

// PUT - Update service
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

    // Check if service exists
     const existingService = await Service.findById(id);
    if (!existingService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Check featured limit if changing to featured
    if (body.featured && !existingService.featured) {
      const existingFeaturedCount = await Service.countDocuments({ 
        featured: true, 
        isDeleted: false,
        _id: { $ne: id }
      });
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

    const updateData = {
      ...body,
      slug,
      image: finalImageUrl,
      gallery: finalGalleryUrls,
    };

    const updatedService = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedService,
      message: "Service updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating service:", error);
    
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update service",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete service (soft delete)
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;

    await connectDB();
    const { id } = await params;

    const service = await Service.findById(id);
    if (!service) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    // Soft delete
    service.isDeleted = true;
    await service.save();

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete service",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
