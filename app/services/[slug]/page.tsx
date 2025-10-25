import { notFound } from 'next/navigation';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ServiceDetailClient from "@/components/ServiceDetailClient";

interface PageProps {
  params: {
    slug: string;
  };
}

// Fetch single service by slug
async function getServiceBySlug(slug: string) {
  try {
    // For server-side rendering, we can directly import and use the database
    const connectDB = (await import("@/config/models/connectDB")).default;
    const Service = (await import("@/config/utils/admin/services/serviceSchema")).default;
    
    await connectDB();
    
    // Find service by slug directly from database
    const service = await Service.findOne({ 
      slug, 
      status: "active", 
      isDeleted: false 
    })
    .select('-isDeleted -__v')
    .lean();

    if (!service) {
      return null;
    }

    // Increment view count
    await Service.findByIdAndUpdate((service as any)._id, { 
      $inc: { views: 1 } 
    });

    // Convert MongoDB ObjectId to string for serialization
    return JSON.parse(JSON.stringify(service));
    
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Generate static params for all services
export async function generateStaticParams() {
  try {
    // For build time, we can directly import and use the database
    const connectDB = (await import("@/config/models/connectDB")).default;
    const Service = (await import("@/config/utils/admin/services/serviceSchema")).default;
    
    await connectDB();
    
    // Get all active services
    const services = await Service.find({ 
      status: "active", 
      isDeleted: false 
    })
    .select('slug')
    .lean();
    
    return services.map((service: any) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceData = await getServiceBySlug(resolvedParams.slug);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found - Perfect Pest Control',
      description: 'The requested pest control service could not be found.',
    };
  }

  return {
    title: serviceData.seoTitle || `${serviceData.serviceName} - Perfect Pest Control`,
    description: serviceData.seoDescription || serviceData.description,
    keywords: serviceData.seoKeywords || `${serviceData.serviceName}, ${serviceData.serviceType}, pest control, Perfect Pest Control`,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceData = await getServiceBySlug(resolvedParams.slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <ServiceDetailClient serviceData={serviceData} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}