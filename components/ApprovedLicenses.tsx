"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, CheckCircle } from "lucide-react";
import Image from "next/image";

// Static data for approved licenses and certifications
const staticLicenses = [
  {
    id: "1",
    name: "Pest Control License",
    authority: "Tamil Nadu Pollution Control Board",
    image: "/images/licenses/pest-control-license.png",
    description: "Official pest control service license"
  },
  {
    id: "2", 
    name: "Environmental Clearance",
    authority: "Ministry of Environment",
    image: "/images/licenses/environmental-clearance.png",
    description: "Environmental safety certification"
  },
  {
    id: "3",
    name: "Chemical Handling License",
    authority: "Department of Factories",
    image: "/images/licenses/chemical-handling.png", 
    description: "Safe chemical handling certification"
  },
  {
    id: "4",
    name: "ISO 9001:2015",
    authority: "Quality Management System",
    image: "/images/licenses/iso-9001.png",
    description: "International quality standard certification"
  },
  {
    id: "5",
    name: "Trade License",
    authority: "Municipal Corporation",
    image: "/images/licenses/trade-license.png",
    description: "Municipal trade license"
  },
  {
    id: "6",
    name: "GST Registration",
    authority: "Government of India",
    image: "/images/licenses/gst-certificate.png",
    description: "Goods and Services Tax registration"
  },
  {
    id: "7",
    name: "Fire Safety Certificate",
    authority: "Fire Department",
    image: "/images/licenses/fire-safety.png",
    description: "Fire safety compliance certificate"
  },
  {
    id: "8",
    name: "Professional Liability Insurance",
    authority: "Insurance Company",
    image: "/images/licenses/insurance.png",
    description: "Professional liability coverage"
  }
];

interface ApprovedLicensesProps {
  showAll?: boolean;
  limit?: number;
}

export default function ApprovedLicenses({ showAll = false, limit = 8 }: ApprovedLicensesProps) {
  const displayLicenses = showAll ? staticLicenses : staticLicenses.slice(0, limit);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-admin-gradient relative overflow-hidden">
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-green-300/25"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-bl from-emerald-300/20 via-transparent to-white/15"
          animate={{
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Small floating bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/30 rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Certified & Licensed
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 px-2">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-emerald-400">
              Approved Licenses
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
            Fully licensed and certified pest control services with all required approvals
          </p>
        </motion.div>

        <div className={`grid gap-3 sm:gap-4 md:gap-6 justify-center ${
          displayLicenses.length <= 2 
            ? 'grid-cols-2 max-w-md mx-auto' 
            : displayLicenses.length <= 4
            ? 'grid-cols-2 sm:grid-cols-4 max-w-3xl mx-auto'
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'
        }`}>
          {displayLicenses.map((license, index) => (
            <motion.div
              key={license.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-white/30 h-full flex flex-col items-center text-center hover:-translate-y-2">
                {/* License Logo/Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 relative bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={license.image}
                    alt={license.name}
                    fill
                    className="object-contain p-2"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden text-admin-primary">
                    <Award className="h-8 w-8 sm:h-10 sm:w-10" />
                  </div>
                </div>

                {/* License Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2">
                      {license.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                      {license.authority}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {license.description}
                    </p>
                  </div>
                  
                  {/* Verified Badge */}
                  <div className="mt-3 flex items-center justify-center">
                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Message */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-green-300 mr-3" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Trusted & Certified
              </h3>
            </div>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Perfect Pest Control operates with all necessary licenses and certifications, 
              ensuring safe, legal, and professional pest control services for your peace of mind.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}