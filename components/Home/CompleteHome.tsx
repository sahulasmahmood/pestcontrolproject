"use client"

import { Suspense, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Clock, Users, Star, Phone, Shield, Award, Heart, Bug, Zap, Home } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"
import QuickBookForm from "@/components/QuickBookForm"
import ApprovedLicenses from "@/components/ApprovedLicenses"
// Commented out dynamic hooks for static data
// import { useBanner } from "@/hooks/use-banner"
// import { useTariff } from "@/hooks/use-tariff"
// import { usePackages } from "@/hooks/use-packages"
// import { useContact } from "@/hooks/use-contact"
import { Testimonials } from "./Testimonial"

// Static data for Perfect Pest Control
const staticBanner = {
  title: "Professional Pest Control Services",
  image: "/images/pest-control-banner.jpg",
  status: "active"
}

const staticContactInfo = {
  primaryPhone: "0462-480-2258",
  secondaryPhone: "9626-341-555",
  whatsappNumber: "9626341555",
  email: "perfectpestcontrol555@gmail.com",
  address: "24, Rainbow Colony, Peratchi Amman Kovil Street",
  city: "Tirunelveli",
  state: "Tamil Nadu",
  pincode: "627003",
  country: "India"
}

const staticServices = [
  {
    _id: "1",
    serviceName: "Anti Termite Treatment",
    description: "Complete termite protection for your property with advanced pre and post-construction treatment methods",
    image: "/images/anti-termite.jpg",
    price: "Contact for Quote",
    featured: true,
    category: "Structural Protection"
  },
  {
    _id: "2", 
    serviceName: "Rat Control",
    description: "Effective rodent control solutions for residential and commercial properties using safe methods",
    image: "/images/rat-control.jpg",
    price: "Contact for Quote",
    featured: true,
    category: "Rodent Control"
  },
  {
    _id: "3",
    serviceName: "Bed Bug Treatment", 
    description: "Complete bed bug elimination with safe and effective treatment methods for homes and hotels",
    image: "/images/bed-bug.jpg",
    price: "Contact for Quote",
    featured: true,
    category: "Insect Control"
  },
  {
    _id: "4",
    serviceName: "Mosquito Control",
    description: "Comprehensive mosquito control for homes and commercial spaces to prevent disease transmission",
    image: "/images/mosquito-control.jpg", 
    price: "Contact for Quote",
    featured: true,
    category: "Vector Control"
  },
  {
    _id: "5",
    serviceName: "Disinfection Spray Service",
    description: "Professional disinfection using sodium hypochloride sanitizer cleaning spray service",
    image: "/images/disinfection.jpg",
    price: "Contact for Quote", 
    featured: true,
    category: "Sanitization"
  },
  {
    _id: "6",
    serviceName: "Cockroach Control",
    description: "Effective cockroach elimination for kitchens, restaurants and commercial food areas",
    image: "/images/cockroach-control.jpg",
    price: "Contact for Quote",
    featured: false,
    category: "Insect Control"
  }
]

const staticServiceCategories = [
  {
    _id: "1",
    title: "Industrial Pest Control",
    description: "Comprehensive pest control solutions for industrial facilities, warehouses, and manufacturing units",
    image: "/images/industrial-pest-control.jpg",
    services: ["Anti Termite", "Rat Control", "Cockroach Control", "Disinfection"],
    featured: true
  },
  {
    _id: "2", 
    title: "Commercial Pest Control",
    description: "Professional pest management for offices, hotels, restaurants and commercial spaces",
    image: "/images/commercial-pest-control.jpg",
    services: ["Bed Bug Treatment", "Mosquito Control", "Ant Control", "Sanitization"],
    featured: true
  },
  {
    _id: "3",
    title: "Household Pest Control", 
    description: "Safe and effective pest control for residential properties and homes",
    image: "/images/household-pest-control.jpg",
    services: ["All Pest Types", "Disinfection", "Preventive Treatment", "Emergency Service"],
    featured: true
  }
]

const staticTestimonials = [
  {
    _id: "1",
    name: "Rajesh Kumar",
    location: "Tirunelveli",
    rating: 5,
    comment: "Excellent pest control service! They completely eliminated our termite problem. Very professional team and reasonable pricing.",
    image: "/images/testimonial1.jpg",
    status: "published"
  },
  {
    _id: "2",
    name: "Priya Sharma", 
    location: "Tuticorin",
    rating: 5,
    comment: "Perfect Pest Control solved our rat problem effectively. The team was professional and the service was excellent.",
    image: "/images/testimonial2.jpg",
    status: "published"
  },
  {
    _id: "3",
    name: "Arun Krishnan",
    location: "Madurai", 
    rating: 5,
    comment: "Best pest control service in the region. Highly recommend for both residential and commercial properties.",
    image: "/images/testimonial3.jpg",
    status: "published"
  }
]

export default function CompleteHome() {
  // Using static data instead of dynamic API calls
  const banner = staticBanner
  const isLoading = false
  const tariffData = staticServices
  const packagesData = staticServiceCategories
  const contactInfo = staticContactInfo
  const testimonials = staticTestimonials
  const testimonialsLoading = false

  const handleBookNow = (serviceTitle?: string) => {
    // For homepage, scroll to the quick book form
    const formElement = document.getElementById("quick-book-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const handleBookPackage = (packageTitle: string) => {
    const message = `Hi, I need ${packageTitle} service. Please provide more details and a free quote.`;
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919626341555';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '0462-480-2258';
    window.open(`tel:${phoneNumber}`, "_self")
  }

  // Update service cards rendering with static data
  const renderServices = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {tariffData.slice(0, 6).map((service, index) => (
          <motion.div
            key={service._id || `service-${index}`}
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, rotateY: 2 }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 h-full bg-white rounded-2xl hover:shadow-lg">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.serviceName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {service.price}
                    </Badge>
                  </div>
                  {service.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white">
                        ⭐ Featured
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {service.serviceName}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2 flex-grow">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      onClick={() => handleBookNow(service.serviceName)}
                      className="bg-admin-gradient text-white hover:opacity-90 text-sm sm:text-base py-2 sm:py-2.5 rounded-lg hover:scale-105 transition-all duration-300"
                    >
                      <Shield className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                      Get Quote
                    </Button>
                    <Link
                      href="/tariff"
                      className="text-admin-primary hover:text-admin-secondary transition-colors font-medium text-xs sm:text-sm"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 inline" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  // Update service categories rendering with static data
  const renderPackages = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {packagesData.slice(0, 6).map((pkg, index) => (
          <motion.div
            key={pkg._id || `package-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105 h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      Professional
                    </Badge>
                  </div>
                  {pkg.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white">
                        ⭐ Popular
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                    {pkg.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6 line-clamp-2 flex-grow">
                    {pkg.description}
                  </p>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-admin-primary">
                      Contact for Quote
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      onClick={() => handleBookPackage(pkg.title)}
                      className="bg-admin-gradient text-white hover:opacity-90 text-sm sm:text-base py-2 sm:py-2.5"
                    >
                      Get Quote
                    </Button>
                    <Link
                      href="/packages"
                      className="text-admin-primary hover:text-admin-secondary transition-colors font-medium text-xs sm:text-sm"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 inline" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  // Update testimonials rendering with static data
  const renderTestimonials = () => {
    return <Testimonials testimonials={testimonials} />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Banner Images */}
      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <Image
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.svg"}
                alt={banner?.title || "Home banner"}
                fill
                className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
            </div>
            
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/40" />
            
            {/* Subtle Admin Gradient Layer */}
            <div className="absolute inset-0 bg-admin-gradient/10" />
            
            {/* Optional: Animated Gradient Layer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-green-600/10 via-transparent to-emerald-600/10"
              animate={{
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-3 py-6 sm:px-6 sm:py-12 md:py-16 lg:py-20 xl:px-8 relative z-10 max-w-7xl">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div>
              <Badge className="mb-4 sm:mb-6 md:mb-8 hover:bg-admin-secondary bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5 sm:px-6 sm:py-2 md:px-8 md:py-3 text-xs sm:text-sm md:text-base rounded-full shadow-lg">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-2 sm:mr-3" />
                Welcome to Perfect Pest Control
              </Badge>
            </div>

            {/* Optional dynamic banner title (keeps existing headline below) */}
            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="block">Protect Your Property</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-emerald-400">
                  With Confidence
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 text-white/90 font-light">
              Professional Pest Control
            </p>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed px-1 sm:px-2 md:px-4">
              Experience professional pest control services with safety and reliability. From residential to commercial properties,
              we provide comprehensive pest management solutions including anti-termite, rodent control, and disinfection services.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2">
              <div className="w-full sm:w-auto">
                <Button
                  onClick={() => handleBookNow()}
                  size="lg"
                  className="w-full sm:w-auto bg-admin-gradient text-white border-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-2xl hover:shadow-green-500/25 rounded-xl hover:scale-105"
                >
                  <Shield className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  Get Free Quote
                </Button>
              </div>

              <div className="w-full sm:w-auto">
                <Button
                  onClick={handleCallNow}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold bg-transparent backdrop-blur-sm shadow-2xl hover:shadow-white/10 rounded-xl hover:scale-105"
                >
                  <Phone className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Replace the old banner indicators with a simple loading or no-banner indicator */}
        {!banner && !isLoading && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <p className="text-white/80 text-sm">No banner available</p>
            </div>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                number: "500+",
                label: "Properties Protected",
                icon: <Home className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              },
              {
                number: "5+",
                label: "Branch Locations",
                icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              },
              {
                number: "10+",
                label: "Years Experience",
                icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              },
              {
                number: "99%",
                label: "Success Rate",
                icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.6 }}
              >
                <Card className="hover:shadow-xl transition-all duration-500 border-0 shadow-lg bg-white h-full rounded-2xl hover:scale-105">
                  <CardContent className="p-2 sm:p-3 md:p-4 lg:p-6 text-center">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 bg-admin-gradient rounded-full flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </motion.div>
                    <motion.div
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-admin-gradient bg-clip-text text-transparent mb-1 sm:mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Book Form Section */}
      <section id="quick-book-form" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            <QuickBookForm />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-admin-gradient relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Animated overlay gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-yellow-600/30 via-transparent to-orange-600/30"
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-orange-500/20 via-transparent to-yellow-500/20"
            animate={{
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Straight line animations */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                scaleY: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}

          {/* Horizontal lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`hline-${i}`}
              className="absolute h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                left: `${15 + i * 20}%`,
                top: `${30 + i * 15}%`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            />
          ))}

          {/* Floating bubbles */}
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

          {/* Larger floating orbs */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-white/10 to-green-300/15 rounded-full blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-emerald-300/15 to-white/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative max-w-7xl z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
            variants={{
              initial: { opacity: 0, y: 60 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Professional Service
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
              Pest Control Excellence
              <span className="block text-green-200">Protecting Your Property</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed px-2 sm:px-4">
              Perfect Pest Control is your trusted pest management partner, specializing in comprehensive
              pest control solutions for residential, commercial, and industrial properties with safe and effective treatments.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
                title: "Our Mission",
                description:
                  "To provide safe, effective, and reliable pest control services across Tamil Nadu, ensuring every property is protected from pests with professional and eco-friendly solutions.",
                gradient: "from-green-600 to-emerald-600",
              },
              {
                icon: <Award className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
                title: "Our Vision",
                description:
                  "To be the most trusted pest control partner in South India, recognized for our commitment to excellence, customer satisfaction, and innovative pest management solutions.",
                gradient: "from-blue-600 to-cyan-600",
              },
              {
                icon: <Heart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />,
                title: "Our Values",
                description:
                  "Safety, effectiveness, customer satisfaction, and environmental responsibility are the core values that guide our pest control services, ensuring healthy environments for every client.",
                gradient: "from-purple-600 to-pink-600",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 60 },
                  animate: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                className="md:col-span-2 lg:col-span-1 md:last:col-start-1 md:last:col-end-3 lg:last:col-start-auto lg:last:col-end-auto"
              >
                <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-3 h-full border-0 shadow-lg overflow-hidden rounded-2xl backdrop-blur-sm bg-white/90 hover:bg-white/95">
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center relative">
                    <motion.div
                      className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">{item.icon}</div>
                    </motion.div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-yellow-200/25 to-orange-200/25 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-200/20 to-yellow-200/20 rounded-full blur-2xl"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              Our Services
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Pest Control Services
              <span className="block text-transparent bg-clip-text bg-admin-gradient">For Every Property Type</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              From residential homes to commercial buildings, we provide comprehensive pest management solutions
            </p>
          </motion.div>

          {renderServices()}

          <div className="text-center mt-12">
            <Link href="/tariff">
              <Button className="bg-admin-gradient text-white hover:opacity-90 px-8 py-3 text-lg font-semibold">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm">
              Service Categories
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
              Specialized
              <span className="block text-transparent bg-clip-text bg-admin-gradient">Pest Solutions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto px-2">
              Comprehensive pest control solutions tailored for industrial, commercial, and residential needs
            </p>
          </motion.div>

          {renderPackages()}

          <div className="text-center mt-12">
            <Link href="/packages">
              <Button className="bg-admin-gradient text-white hover:opacity-90 px-8 py-3 text-lg font-semibold">
                View All Solutions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Approved Licenses Section */}
      <ApprovedLicenses showAll={true} />

      {/* Dynamic Testimonials Section */}
      {renderTestimonials()}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-admin-gradient relative overflow-hidden">
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Animated overlay gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-green-300/20"
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
            className="absolute inset-0 bg-gradient-to-bl from-emerald-300/15 via-transparent to-white/10"
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

        {/* Small floating bubbles like About section */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating bubbles */}
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

        <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center relative z-10 max-w-7xl">
          <motion.div
            variants={{
              initial: { opacity: 0, y: 60 },
              animate: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-3 sm:mb-4 md:mb-6 bg-admin-secondary text-white border-white/30 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 text-xs sm:text-sm md:text-base">
              <Bug className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Need Pest Control?
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white">
              Protect Your Property
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                With Us Today
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
              Experience the safety and reliability of our pest control services. Protect your property across Tamil Nadu with
              our comprehensive pest management solutions and professional team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  onClick={() => {
                    const whatsappNumber = contactInfo?.whatsappNumber || '919626341555';
                    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I need pest control services. Please provide more details and a free quote.`;
                    window.open(whatsappUrl, '_blank');
                  }}
                  size="lg"
                  className="w-full sm:w-auto bg-white text-admin-secondary hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <WhatsAppIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Get Quote via WhatsApp
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  onClick={handleCallNow}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-transparent backdrop-blur-sm"
                >
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Call Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
