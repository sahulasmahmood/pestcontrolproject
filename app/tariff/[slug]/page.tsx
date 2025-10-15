import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import TariffDetailClient from "@/components/TariffDetailClient";

// Static pest control services data (same as main page)
const pestControlServices = [
  {
    id: "disinfection-spray",
    serviceName: "Disinfection Spray Service (Sodium Hypochloride)",
    serviceType: "Sanitization",
    description: "Professional disinfection service using sodium hypochloride for complete sanitization of residential and commercial spaces.",
    basePrice: "1,500",
    premiumPrice: "3,500",
    area: "Up to 2000 sq ft",
    warranty: "1 month",
    image: "/disinfection-spray.jpg",
    featured: true,
    inclusions: ["Complete Area Disinfection", "Safe Chemical Application", "Post-Service Report", "Health Certificate"],
    pests: ["Virus", "Bacteria", "Germs", "Pathogens"],
    slug: "disinfection-spray-service"
  },
  {
    id: "sanitizer-cleaning",
    serviceName: "Sanitizer Cleaning Spray Service",
    serviceType: "Sanitization",
    description: "Comprehensive sanitizer cleaning service for maintaining hygiene standards in homes and commercial establishments.",
    basePrice: "1,200",
    premiumPrice: "2,800",
    area: "Up to 1500 sq ft",
    warranty: "2 weeks",
    image: "/sanitizer-cleaning.jpg",
    featured: true,
    inclusions: ["Surface Sanitization", "Air Purification", "Equipment Sanitization", "Safety Guidelines"],
    pests: ["Bacteria", "Virus", "Germs", "Microorganisms"],
    slug: "sanitizer-cleaning-spray"
  }
];

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const service = pestControlServices.find(s => s.slug === slug);
  
  if (!service) {
    return {
      title: "Service Not Found - Perfect Pest Control",
    };
  }
  
  return {
    title: `${service.serviceName} - Perfect Pest Control`,
    description: `${service.description} Starting from ₹${service.basePrice}. Professional pest control service with ${service.warranty} warranty.`,
    keywords: `${service.serviceName}, ${service.serviceType}, pest control, ${service.pests.join(', ')}, Perfect Pest Control`,
  };
}

// Get service data by slug
function getServiceData(slug: string) {
  return pestControlServices.find(service => service.slug === slug) || null;
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceData = getServiceData(slug);

  if (!serviceData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <TariffDetailClient tariffData={serviceData} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}

// Generate static params for the available services
export async function generateStaticParams() {
  return pestControlServices.map((service) => ({
    slug: service.slug,
  }));
}