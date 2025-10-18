"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { BugPattern } from "@/components/ui/bug-pattern";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  avatar: string;
  content: string;
  rating: number;
  servicesType: string;
  status: string;
}

interface AnimatedTestimonialWrapperProps {
  testimonials?: Testimonial[];
}

export const AnimatedTestimonialWrapper = ({ testimonials = [] }: AnimatedTestimonialWrapperProps) => {
  // Filter to show only published testimonials
  const activeTestimonials = testimonials.filter(
    (testimonial) => testimonial.status === "published"
  );

  // Transform your testimonial data to match AnimatedTestimonials format
  const transformedTestimonials = activeTestimonials.map((testimonial, index) => ({
    quote: testimonial.content,
    name: testimonial.name,
    designation: `${testimonial.location} • ${testimonial.servicesType}`,
    src: testimonial.avatar || "/placeholder.svg",
    id: testimonial._id || `testimonial-${index}`, // Add unique identifier
    rating: testimonial.rating, // Add rating
  }));

  if (activeTestimonials.length === 0) {
    return (
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-white/20"></div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative">
          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              No testimonials available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Enhanced Background with modern pest control pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-admin-primary/5 via-transparent to-admin-secondary/5"></div>
      
         {/* Modern Bug Pattern Background */}
      <BugPattern
        width={60}
        height={60}
        glow={true}
        density="medium"
        className="text-admin-primary/30 opacity-70"
      />
      
      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-admin-primary/8 to-transparent pointer-events-none"></div>
      
      {/* Additional subtle pattern enhancement */}
      <div className="absolute inset-0 bg-gradient-to-br from-admin-secondary/5 via-transparent to-admin-primary/5 pointer-events-none"></div>
      <div className="container mx-auto px-2 sm:px-4 md:px-6 relative">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
            What Our Clients
            <span className="block bg-admin-gradient bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        {/* Use the AnimatedTestimonials component with autoplay enabled */}
        <AnimatedTestimonials 
          testimonials={transformedTestimonials} 
          autoplay={true}
        />
      </div>
    </section>
  );
};