import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ServicesPageClient from "@/components/ServicesPageClient";
import { ServicesPageSeo } from "@/components/Services/ServicesSeo";
import { fetchServices } from "@/lib/services";

export const dynamic = 'force-dynamic';

// SEO metadata
export const metadata = {
  title: "Pest Control Services & Pricing - Perfect Pest Control",
  description:
    "Professional pest control services with transparent pricing. Residential and commercial pest management, termite control, rodent removal, and eco-friendly solutions.",
  keywords:
    "pest control services, pest control pricing, termite control cost, rodent removal rates, commercial pest control, residential pest management",
};

export default async function PestControlServicesPage() {
  const { services } = await fetchServices({ limit: 50 });

  return (
    <div className="min-h-screen">
      <ServicesPageSeo />
      <Navbar />
      <ServicesPageClient servicesData={services} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}