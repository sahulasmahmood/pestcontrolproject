import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import { fetchServiceBySlug, fetchServices, generateServiceMetadata } from "@/lib/services";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug);
  
  if (!service) {
    return {
      title: "Service Not Found - Perfect Pest Control",
    };
  }
  
  return generateServiceMetadata(service);
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceData = await fetchServiceBySlug(slug);

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

// Generate static params for the available services
export async function generateStaticParams() {
  const { services } = await fetchServices({ limit: 100 });
  
  return services.map((service: any) => ({
    slug: service.slug,
  }));
}