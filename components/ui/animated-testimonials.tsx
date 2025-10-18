"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  id?: string;
  rating?: number;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  // Early return if no testimonials
  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center text-gray-500">
          No testimonials available.
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  // Ensure active index is within bounds
  useEffect(() => {
    if (active >= testimonials.length) {
      setActive(0);
    }
  }, [testimonials.length, active]);

  // Pre-calculate stable rotations to avoid vibration
  const stableRotations = testimonials.map(() => Math.floor(Math.random() * 21) - 10);
  return (
    <div className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12 sm:py-12 md:py-16 lg:py-20 relative">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id || `testimonial-${index}-${testimonial.name}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: stableRotations[index] || 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : stableRotations[index] || 0,
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    // Removed the bouncing y animation that causes vibration
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: stableRotations[index] || 0,
                  }}
                 transition={{
                    duration: 1.2,
                    ease: "easeInOut", // Filigree Solutions approach - simple, stable easing
                  }}
                  className="absolute inset-0 origin-center will-change-transform"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)' // Force GPU layer
                  }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl border-4 border-white/20"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 max-w-full">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 overflow-hidden max-w-full"
          >
            {/* Star Rating */}
            {testimonials[active]?.rating && (
              <div className="flex mb-4">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-black dark:text-white break-words">
              {testimonials[active]?.name || ""}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500 break-words">
              {testimonials[active]?.designation || ""}
            </p>
             <p className="mt-8 text-lg text-gray-500 dark:text-neutral-300 break-words hyphens-auto leading-relaxed">
              {testimonials[active]?.quote || ""}
            </p>
          </motion.div>
          <div className="flex gap-4 pt-8 justify-center md:justify-start">
            <button
              onClick={handlePrev}
              className="group/button flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-admin-gradient hover:opacity-90 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <IconArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-admin-gradient hover:opacity-90 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <IconArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
