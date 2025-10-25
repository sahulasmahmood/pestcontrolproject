import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ServicesPageClient from "@/components/ServicesPageClient";
import { ServicesPageSeo } from "@/components/Services/ServicesSeo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// SEO metadata
export const metadata = {
  title: "Pest Control Services & Pricing - Perfect Pest Control",
  description:
    "Professional pest control services with transparent pricing. Residential and commercial pest management, termite control, rodent removal, and eco-friendly solutions.",
  keywords:
    "pest control services, pest control pricing, termite control cost, rodent removal rates, commercial pest control, residential pest management",
};

// Fetch services from API
async function getServices() {
  try {
    // For server-side rendering, we can directly import and use the database
    const connectDB = (await import("@/config/models/connectDB")).default;
    const Service = (await import("@/config/utils/admin/services/serviceSchema")).default;
    
    await connectDB();

    // Get services directly from database
    const services = await Service.find({ 
      status: "active", 
      isDeleted: false 
    })
    .select('-isDeleted -__v') // Exclude internal fields
    .sort({ featured: -1, createdAt: -1 })
    .limit(50)
    .lean();

    // Convert MongoDB ObjectIds to strings for serialization
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error('Error fetching services:', error);
    return []; // Return empty array if API fails
  }
}

export default async function PestControlServicesPage() {
  const servicesData = await getServices();

  return (
    <div className="min-h-screen">
      <ServicesPageSeo />
      <Navbar />
      <ServicesPageClient servicesData={servicesData || []} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}