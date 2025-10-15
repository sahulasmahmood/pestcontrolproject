// app/page.tsx
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CompleteHome from "@/components/Home/CompleteHome";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { HomeSeo } from "@/components/Home/HomeSeo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Perfect Pest Control - Professional Pest Control Services',
  description: 'Professional pest control services in TamilNadu. Specializing in anti-termite, rat control, bed bug treatment, ant control, mosquito control, and disinfection services.',
  keywords: 'pest control, anti termite, rat control, bed bug treatment, ant control, mosquito control, disinfection, Tirunelveli, Perfect Pest Control'
};

// Static data for pest control services
const staticPestControlData = {
  services: [
    {
      id: 1,
      title: "Anti Termite Treatment",
      description: "Complete termite protection for your property with advanced treatment methods",
      image: "/images/anti-termite.jpg",
      category: "Structural Protection",
      price: "Contact for Quote",
      featured: true
    },
    {
      id: 2,
      title: "Rat Control",
      description: "Effective rodent control solutions for residential and commercial properties",
      image: "/images/rat-control.jpg",
      category: "Rodent Control",
      price: "Contact for Quote",
      featured: true
    },
    {
      id: 3,
      title: "Bed Bug Treatment",
      description: "Complete bed bug elimination with safe and effective treatment methods",
      image: "/images/bed-bug.jpg",
      category: "Insect Control",
      price: "Contact for Quote",
      featured: true
    },
    {
      id: 4,
      title: "Mosquito Control",
      description: "Comprehensive mosquito control for homes and commercial spaces",
      image: "/images/mosquito-control.jpg",
      category: "Vector Control",
      price: "Contact for Quote",
      featured: true
    },
    {
      id: 5,
      title: "Disinfection Spray Service",
      description: "Professional disinfection using sodium hypochloride sanitizer cleaning spray",
      image: "/images/disinfection.jpg",
      category: "Sanitization",
      price: "Contact for Quote",
      featured: true
    },
    {
      id: 6,
      title: "Cockroach Control",
      description: "Effective cockroach elimination for kitchens and commercial areas",
      image: "/images/cockroach-control.jpg",
      category: "Insect Control",
      price: "Contact for Quote",
      featured: false
    }
  ],
  serviceCategories: [
    {
      id: 1,
      category: "Industrial",
      description: "Comprehensive pest control solutions for industrial facilities",
      services: ["Anti Termite", "Rat Control", "Cockroach Control", "Disinfection"]
    },
    {
      id: 2,
      category: "Commercial",
      description: "Professional pest management for offices and commercial spaces",
      services: ["Bed Bug Treatment", "Mosquito Control", "Ant Control", "Sanitization"]
    },
    {
      id: 3,
      category: "Household",
      description: "Safe and effective pest control for residential properties",
      services: ["All Pest Types", "Disinfection", "Preventive Treatment", "Emergency Service"]
    }
  ],
  banners: [
    {
      id: 1,
      title: "Professional Pest Control",
      subtitle: "Your Trusted Partner Since Years",
      image: "/images/pest-control-banner1.jpg"
    },
    {
      id: 2,
      title: "Safe & Effective Solutions",
      subtitle: "Protecting Your Property",
      image: "/images/pest-control-banner2.jpg"
    }
  ]
};

const staticTestimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Tirunelveli",
    rating: 5,
    comment: "Excellent pest control service! They completely eliminated our termite problem. Very professional team.",
    image: "/images/testimonial1.jpg"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Tuticorin",
    rating: 5,
    comment: "Perfect Pest Control solved our rat problem effectively. The team was professional and the pricing was reasonable.",
    image: "/images/testimonial2.jpg"
  },
  {
    id: 3,
    name: "Arun Krishnan",
    location: "Madurai",
    rating: 5,
    comment: "Best pest control service in the region. Highly recommend for both residential and commercial properties.",
    image: "/images/testimonial3.jpg"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HomeSeo />
      <Navbar />
      <CompleteHome />
      <Footer />
      <FloatingContactButtons />
    </div>
  );
}
