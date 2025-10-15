import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import ServicesPageClient from "@/components/ServicesPageClient";
import { ServicesPageSeo } from "@/components/Services/ServicesSeo";

export const dynamic = 'force-dynamic';

// SEO metadata
export const metadata = {
  title: "Pest Control Services & Pricing - Perfect Pest Control",
  description:
    "Professional pest control services with transparent pricing. Residential and commercial pest management, termite control, rodent removal, and eco-friendly solutions.",
  keywords:
    "pest control services, pest control pricing, termite control cost, rodent removal rates, commercial pest control, residential pest management",
}; 

// Static pest control services data - Perfect Pest Control Services
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
    slug: "disinfection-spray-service",
    gallery: [
      "/disinfection-spray-1.jpg",
      "/disinfection-spray-2.jpg", 
      "/disinfection-spray-3.jpg",
      "/disinfection-spray-4.jpg"
    ]
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
    slug: "sanitizer-cleaning-spray",
    gallery: [
      "/sanitizer-cleaning-1.jpg",
      "/sanitizer-cleaning-2.jpg",
      "/sanitizer-cleaning-3.jpg",
      "/sanitizer-cleaning-4.jpg"
    ]
  },
  {
    id: "anti-termite",
    serviceName: "Anti Termite Treatment",
    serviceType: "Specialized",
    description: "Advanced anti-termite treatment using latest technology for pre and post construction termite protection.",
    basePrice: "8,000",
    premiumPrice: "25,000",
    area: "Whole property",
    warranty: "5 years",
    image: "/anti-termite.jpg",
    featured: false,
    inclusions: ["Soil Treatment", "Wood Treatment", "Chemical Barrier", "Annual Inspection"],
    pests: ["Subterranean Termites", "Drywood Termites", "Dampwood Termites"],
    slug: "anti-termite-treatment"
  },
  {
    id: "rat-control",
    serviceName: "Rat Control Service",
    serviceType: "Rodent Control",
    description: "Professional rat control and elimination service with safe and effective methods for residential and commercial properties.",
    basePrice: "2,500",
    premiumPrice: "6,000",
    area: "Whole property",
    warranty: "4 months",
    image: "/rat-control.jpg",
    featured: false,
    inclusions: ["Rat Assessment", "Baiting & Trapping", "Entry Point Sealing", "Follow-up Service"],
    pests: ["Norway Rats", "Roof Rats", "House Rats"],
    slug: "rat-control-service"
  },
  {
    id: "bedbug-treatment",
    serviceName: "Bed Bug Treatment",
    serviceType: "Specialized",
    description: "Complete bed bug elimination using heat treatment and chemical methods for homes and hotels.",
    basePrice: "3,500",
    premiumPrice: "8,500",
    area: "Affected rooms",
    warranty: "6 months",
    image: "/bedbug-treatment.jpg",
    featured: false,
    inclusions: ["Bed Bug Inspection", "Heat Treatment", "Chemical Treatment", "Mattress Protection"],
    pests: ["Bed Bugs", "Bed Bug Eggs", "Bed Bug Nymphs"],
    slug: "bedbug-treatment"
  },
  {
    id: "ant-control",
    serviceName: "Ant Control Service",
    serviceType: "General Pest",
    description: "Effective ant control service targeting all types of ants with gel baits and spray treatments.",
    basePrice: "1,800",
    premiumPrice: "3,200",
    area: "Affected areas",
    warranty: "3 months",
    image: "/ant-control.jpg",
    featured: false,
    inclusions: ["Ant Colony Identification", "Gel Bait Application", "Spray Treatment", "Prevention Tips"],
    pests: ["Black Ants", "Red Ants", "Carpenter Ants", "Fire Ants"],
    slug: "ant-control-service"
  },
  {
    id: "mosquito-control",
    serviceName: "Mosquito Control Service",
    serviceType: "Vector Control",
    description: "Comprehensive mosquito control including fogging, larvicide treatment, and breeding site management.",
    basePrice: "1,500",
    premiumPrice: "3,500",
    area: "Outdoor areas",
    warranty: "2 months",
    image: "/mosquito-control.jpg",
    featured: false,
    inclusions: ["Breeding Site Treatment", "Fogging Service", "Larvicide Application", "Prevention Advice"],
    pests: ["Aedes Mosquitoes", "Culex Mosquitoes", "Anopheles Mosquitoes"],
    slug: "mosquito-control-service"
  },
  {
    id: "fly-control",
    serviceName: "Fly Control Service",
    serviceType: "General Pest",
    description: "Professional fly control service for restaurants, food establishments, and residential properties.",
    basePrice: "1,200",
    premiumPrice: "2,800",
    area: "Affected areas",
    warranty: "2 months",
    image: "/fly-control.jpg",
    featured: false,
    inclusions: ["Fly Trap Installation", "Breeding Site Treatment", "Spray Application", "Hygiene Consultation"],
    pests: ["House Flies", "Fruit Flies", "Drain Flies", "Blow Flies"],
    slug: "fly-control-service"
  },
  {
    id: "cockroach-control",
    serviceName: "Cockroach Control Service",
    serviceType: "General Pest",
    description: "Complete cockroach elimination using gel baits and targeted treatments for kitchens and commercial areas.",
    basePrice: "2,000",
    premiumPrice: "4,500",
    area: "Affected areas",
    warranty: "4 months",
    image: "/cockroach-control.jpg",
    featured: false,
    inclusions: ["Cockroach Assessment", "Gel Bait Treatment", "Crack & Crevice Treatment", "Follow-up Service"],
    pests: ["German Cockroaches", "American Cockroaches", "Oriental Cockroaches"],
    slug: "cockroach-control-service"
  },
  {
    id: "spider-lizard-control",
    serviceName: "Spider & Lizard Control",
    serviceType: "General Pest",
    description: "Safe and effective control of spiders and lizards using eco-friendly methods for homes and offices.",
    basePrice: "1,500",
    premiumPrice: "3,000",
    area: "Whole property",
    warranty: "3 months",
    image: "/spider-lizard-control.jpg",
    featured: false,
    inclusions: ["Spider Web Removal", "Targeted Treatment", "Entry Point Sealing", "Natural Repellents"],
    pests: ["House Spiders", "Garden Spiders", "House Lizards", "Wall Geckos"],
    slug: "spider-lizard-control"
  }
];

export default async function PestControlServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesPageSeo />
      <Navbar />
      <ServicesPageClient servicesData={pestControlServices} />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}