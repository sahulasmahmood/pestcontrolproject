"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
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

  // Transform your testimonial data to match TestimonialsColumn format
  const transformedTestimonials = activeTestimonials.map((testimonial) => ({
    text: testimonial.content,
    image: testimonial.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    name: testimonial.name,
    role: `${testimonial.location} • ${testimonial.servicesType}`,
  }));

  // Split testimonials into three columns
  const firstColumn = transformedTestimonials.slice(0, Math.ceil(transformedTestimonials.length / 3));
  const secondColumn = transformedTestimonials.slice(
    Math.ceil(transformedTestimonials.length / 3),
    Math.ceil((transformedTestimonials.length / 3) * 2)
  );
  const thirdColumn = transformedTestimonials.slice(Math.ceil((transformedTestimonials.length / 3) * 2));

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
    <section className="bg-background my-20 relative overflow-hidden">
      {/* Background patterns - behind testimonial cards */}
      <div className="absolute inset-0 pointer-events-none">
        <BugPattern
          width={60}
          height={60}
          glow={true}
          density="low"
          className="text-admin-primary/20 opacity-40"
        />
      </div>
      
      <div className="container z-10 mx-auto relative">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};