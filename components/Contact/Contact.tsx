"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Phone, Mail, MapPin, Send, Bug, Shield, Zap, Leaf, ShieldCheck, Microscope, Clock, Target } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"
import { useBanner } from "@/hooks/use-banner"
import { useContact } from "@/hooks/use-contact"
import { useServices } from "@/hooks/use-services"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
interface ContactProps {
  services?: string[]
}

export const Contact = ({ services: propServices }: ContactProps) => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  // Use dynamic contact info from API
  const { contactInfo } = useContact()
  const { serviceNames, loading: servicesLoading } = useServices()

  // Get dynamic services from API, fallback to prop services or static
  const services = serviceNames.length > 0 
    ? serviceNames
    : propServices || [
        "Anti Termite Treatment",
        "Rat Control Service",
        "Bed Bug Treatment",
        "Ant Control Service",
        "Mosquito Control Service",
        "Fly Control Service",
        "Cockroach Control Service",
        "Virus & Bacteria Control",
        "Spider & Lizard Control",
        "Rodent Control Service"
      ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.phone || !formData.service) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare data for API
      const submissionData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        serviceType: formData.service.trim(),
        serviceDate: new Date().toISOString().split('T')[0],
        address: "To be specified", // Required field
        propertyType: "", // Empty so admin can edit
        propertySize: null, // Empty so admin can edit
        message: formData.message.trim(),
        status: "new", // Required field
        priority: "medium", // Required field
        source: "website", // Changed from "contact_form" to "website"
        estimatedCost: "To be determined",
        notes: `Pest Control Service Inquiry\nEmail: ${formData.email}\nMessage: ${formData.message}`
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      await response.json();

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting Perfect Pest Control. We'll get back to you within 24 hours.",
      })

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Contact details using dynamic Perfect Pest Control data
  const contactDetails = [
    {
      icon: <Phone className="h-5 w-5 text-white" />,
      title: "Phone",
      details: (
        <div className="space-y-1">
          <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
            {contactInfo?.primaryPhone || "0462-480-2258"}
          </p>
          {contactInfo?.secondaryPhone && (
            <p className="text-gray-900 font-medium text-sm sm:text-base break-words">
              {contactInfo.secondaryPhone}
            </p>
          )}
        </div>
      ),
      description: contactInfo?.businessHours || "Mon-Sat: 8AM-8PM, Emergency 24/7",
    },
    {
      icon: <Mail className="h-5 w-5 text-white" />,
      title: "Email Address",
      details: contactInfo?.email || "perfectpestcontrol555@gmail.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <MapPin className="h-5 w-5 text-white" />,
      title: "Address",
      details: contactInfo?.address || "24, Rainbow Colony, Peratchi Amman Kovil Street, Vannarpettai",
      description: `${contactInfo?.city || "Tirunelveli"}, ${contactInfo?.state || "Tamil Nadu"}-${contactInfo?.pincode || "627003"}`,
    },
  ]

  const { banner } = useBanner("contact")

  return (
    <>
      {/* Hero Section */}
  <section className="relative bg-admin-gradient text-white py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <img
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.jpg"}
                alt={banner?.title || "Tamil Nadu Tourism"}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Dark Overlay Layer */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Gradient Overlay Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-transparent" />
            
            {/* Admin Gradient Layer */}
            <div className="absolute inset-0 bg-admin-gradient/20" />
            
            {/* Animated Gradient Layers */}
            <motion.div
              className="absolute inset-0 bg-admin-gradient/10"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute inset-0 bg-admin-gradient/5"
              animate={{
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 max-w-7xl">
          <motion.div
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              {banner?.title || "Get In Touch"}
            </Badge>

            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              {banner?.heading || "Professional Pest Control"}
              {!banner?.heading && (
                <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1 sm:mt-2 font-normal">
                  Contact & Support
                </span>
              )}
            </h1>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              {banner?.description || "Need reliable pest control services? Contact Perfect Pest Control today for professional, safe, and effective pest management solutions in Tirunelveli and surrounding areas."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section id="contact-form" className="pt-20 pb-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true }}>
              <Card className="shadow-xl border-0">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Pest Control Services Icons - Subtle Design */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8 p-4 sm:p-5 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🐜</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Ants</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🪳</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Roaches</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-400 to-slate-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🐭</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Rats</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🦟</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Mosquito</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🪲</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Termites</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🛏️</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Bed Bugs</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🪰</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Flies</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🦠</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Virus</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🕷️</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Spiders</p>
                      </div>
                      <div className="text-center group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-white text-sm sm:text-base font-medium">🐹</span>
                        </div>
                        <p className="text-xs font-medium text-gray-600">Rodents</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="fullName" className="text-gray-700 font-medium text-sm sm:text-base">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-1.5 sm:mt-2 h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-medium text-sm sm:text-base">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          className="mt-1.5 sm:mt-2 h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-gray-700 font-medium text-sm sm:text-base">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          value={formData.phone}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/[^0-9]/g, "")
                            handleInputChange("phone", numericValue)
                          }}
                          placeholder="Enter your phone number"
                          className="mt-1.5 sm:mt-2 h-10 sm:h-12 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service" className="text-gray-700 font-medium text-sm sm:text-base">
                          Service of Interest
                        </Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                          <SelectTrigger className="mt-1.5 sm:mt-2 h-10 sm:h-12 text-sm sm:text-base">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="z-50 max-h-60 overflow-y-auto">
                            {servicesLoading ? (
                              <SelectItem value="loading" disabled className="text-sm sm:text-base">Loading services...</SelectItem>
                            ) : services.length === 0 ? (
                              <SelectItem value="no-services" disabled className="text-sm sm:text-base">No services available</SelectItem>
                            ) : (
                              services.map((service) => (
                                <SelectItem key={service} value={service} className="text-sm sm:text-base">
                                  {service}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium text-sm sm:text-base">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Describe your pest problem (ants, cockroaches, rats, termites, etc.) and property details..."
                        rows={4}
                        className="mt-1.5 sm:mt-2 text-sm sm:text-base resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-10 sm:h-12 bg-admin-gradient text-white text-sm sm:text-base lg:text-lg font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                          <span className="text-xs sm:text-sm lg:text-base">Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs sm:text-sm lg:text-base">Send Message</span>
                          <Send className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 lg:space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-admin-gradient rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Bug className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    Contact Information
                  </h2>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                  Get in touch with our team of pest control experts. We're here to help you with all your pest control needs and
                  provide professional pest management services across Tirunelveli and surrounding areas.
                </p>
                
                {/* Pest Control Features - Hexagonal Design */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 p-5 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-2xl border-2 border-emerald-100 shadow-inner">
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg rotate-45 flex items-center justify-center mb-2 group-hover:rotate-90 transition-transform duration-300">
                      <ShieldCheck className="h-4 w-4 text-white transform -rotate-45 group-hover:-rotate-90" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-green-700">Licensed</span>
                  </div>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-blue-700">Fast Service</span>
                  </div>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-2 group-hover:rotate-12 transition-transform duration-300">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-green-700">Eco-Safe</span>
                  </div>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg rotate-12 flex items-center justify-center mb-2 group-hover:rotate-45 transition-transform duration-300">
                      <Clock className="h-4 w-4 text-white transform -rotate-12 group-hover:-rotate-45" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-orange-700">24/7 Emergency</span>
                  </div>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-2 group-hover:pulse transition-all duration-300">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-blue-700">Guaranteed</span>
                  </div>
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg rotate-45 flex items-center justify-center mb-2 group-hover:rotate-90 transition-transform duration-300">
                      <Microscope className="h-4 w-4 text-white transform -rotate-45 group-hover:-rotate-90" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-purple-700">Advanced Tech</span>
                  </div>
                </div>
              </motion.div>

              {contactDetails.map((info, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                    <CardContent className="p-4 sm:p-5 lg:p-6">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-admin-gradient rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                          <div className="text-white">{info.icon}</div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base lg:text-lg">
                            {info.title}
                          </h3>
                          {typeof info.details === 'string' ? (
                            <p className="text-gray-900 font-medium mb-1 text-sm sm:text-base break-words">
                              {info.details}
                            </p>
                          ) : (
                            info.details
                          )}
                          <p className="text-xs sm:text-sm text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pest Control Services Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm">
              <Bug className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Our Pest Control Services
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Professional Pest Management Solutions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              We provide comprehensive pest control services to protect your property from all types of pest infestations
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { icon: "🐜", title: "Ant Control", color: "from-red-400 to-orange-400", shape: "rounded-xl" },
              { icon: "🪳", title: "Cockroach Control", color: "from-amber-400 to-yellow-400", shape: "rounded-xl" },
              { icon: "🐭", title: "Rat Control", color: "from-gray-400 to-slate-400", shape: "rounded-xl" },
              { icon: "🦟", title: "Mosquito Control", color: "from-blue-400 to-cyan-400", shape: "rounded-xl" },
              { icon: "🪲", title: "Anti Termite", color: "from-purple-400 to-indigo-400", shape: "rounded-xl" },
              { icon: "🛏️", title: "Bed Bug Control", color: "from-pink-400 to-rose-400", shape: "rounded-xl" },
              { icon: "🪰", title: "Fly Control", color: "from-green-400 to-emerald-400", shape: "rounded-xl" },
              { icon: "🦠", title: "Virus & Bacteria", color: "from-red-400 to-pink-400", shape: "rounded-xl" },
              { icon: "🕷️", title: "Spider & Lizard", color: "from-orange-400 to-red-400", shape: "rounded-xl" },
              { icon: "🐹", title: "Rodent Control", color: "from-amber-400 to-orange-400", shape: "rounded-xl" },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 shadow-sm bg-white group">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${service.color} ${service.shape} flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-300 shadow-md`}>
                      <span className="text-white text-lg sm:text-xl font-medium">{service.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base group-hover:text-gray-900 transition-all duration-300">
                      {service.title}
                    </h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Perfect Pest Control Office
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight px-2">
              {contactInfo?.officeTitle || "Visit Our Office in Tirunelveli, Tamil Nadu"}
            </h2>
            <p className="text-sm sm:text-base  text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              {contactInfo?.officeDescription || "Located in Vannarpettai, Tirunelveli, our office is easily accessible and welcoming to all our clients. We also serve Tuticorin, Tenkasi, Nagercoil, Madurai, and Ramanathapuram."}
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              {contactInfo?.mapEmbedCode ? (
                <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] relative">
                  <div
                    className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                    dangerouslySetInnerHTML={{ __html: contactInfo.mapEmbedCode }}
                  />
                </div>
              ) : (
                <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gradient-to-br from-green-100 via-blue-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-admin-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <p className="text-gray-700 text-lg font-medium mb-2">Perfect Pest Control Office Location</p>
                    <p className="text-gray-600 text-sm mb-4">{contactInfo?.address || "24, Rainbow Colony, Peratchi Amman Kovil Street, Vannarpettai"}, {contactInfo?.city || "Tirunelveli"} - {contactInfo?.pincode || "627003"}</p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Bug className="h-3 w-3 text-green-600 mr-1" />
                        Pest Control
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-3 w-3 text-blue-600 mr-1" />
                        Licensed
                      </div>
                      <div className="flex items-center">
                        <Leaf className="h-3 w-3 text-green-600 mr-1" />
                        Eco-Safe
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Branch Offices Section */}
      {(contactInfo?.branchOffices || "Tuticorin, Tenkasi, Nagercoil, Madurai, Ramanathapuram") && (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-3 sm:px-4 md:px-6">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <Badge className="mb-4 sm:mb-6 bg-admin-gradient text-white px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Our Branch Offices
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                We Serve Across Tamil Nadu
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
                Perfect Pest Control has expanded our services across multiple cities to serve you better with professional pest management solutions.
              </p>
            </motion.div>

            {/* Modern Branch Offices Design */}
            <div className="max-w-6xl mx-auto">
              {/* Main Office - Featured */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mb-8 sm:mb-12"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-admin-primary via-gray-800 to-[#1F2937] p-8 sm:p-12 text-white shadow-2xl">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">Tirunelveli</h3>
                    <p className="text-white/80 text-lg mb-4">Main Office & Headquarters</p>
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Active 24/7
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Branch Offices - Modern Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {(contactInfo?.branchOffices || "Tuticorin, Tenkasi, Nagercoil, Madurai, Ramanathapuram")
                  .split(',')
                  .map((office, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                      <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-admin-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative p-6 text-center">
                          <div className="relative mx-auto mb-4 w-12 h-12">
                            <div className="absolute inset-0 bg-admin-gradient rounded-xl group-hover:scale-110 transition-transform duration-300"></div>
                            <div className="absolute inset-0 bg-admin-gradient rounded-xl animate-pulse opacity-75"></div>
                            <div className="relative flex items-center justify-center w-full h-full">
                              <MapPin className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 group-hover:text-admin-primary transition-colors duration-300">
                            {office.trim()}
                          </h3>
                          
                          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>Branch Office</span>
                          </div>
                          
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-admin-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>

              {/* Service Coverage Map Visualization */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="mt-12 p-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl border border-gray-100"
              >
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Complete Tamil Nadu Coverage</h4>
                  <p className="text-gray-600 text-sm">Professional pest control services across all major cities</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {(contactInfo?.branchOffices || "Tuticorin, Tenkasi, Nagercoil, Madurai, Ramanathapuram")
                    .split(',')
                    .map((office, index) => (
                      <div key={index} className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 hover:border-admin-primary/30 hover:shadow-md transition-all duration-300 group">
                        <div className="w-2 h-2 bg-admin-primary rounded-full mr-2 group-hover:animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-admin-primary transition-colors duration-300">
                          {office.trim()}
                        </span>
                      </div>
                    ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-8 sm:mt-12"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <p className="text-sm text-gray-600 mb-4">
                Need service in your area? Contact us to check availability.
              </p>
              <Button
                onClick={() => {
                  const message = "Hi! I need pest control services in my area. Please check availability and provide details.";
                  const whatsappNumber = (contactInfo?.whatsappNumber || "9626341555").replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-admin-gradient text-white hover:opacity-90 transition-all duration-300"
              >
                <WhatsAppIcon className="h-4 w-4 mr-2" />
                Check Service Availability
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Emergency & Custom Service Section - Modern Design */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Emergency Service */}
            <motion.div
              className="text-center lg:text-left"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg">
                <Clock className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                24/7 Emergency Pest Control
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Urgent pest infestation? Don't wait! We provide 24/7 emergency services for critical pest problems and severe infestations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => {
                    const phoneNumber = contactInfo?.primaryPhone || '0462-480-2258';
                    window.open(`tel:${phoneNumber}`, '_blank');
                  }}
                  className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-lg"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Hotline
                </Button>
                <Button
                  onClick={() => {
                    const whatsappNumber = contactInfo?.whatsappNumber || '9626341555';
                    const message = "🚨 EMERGENCY: I have an urgent pest problem that needs immediate attention. Please help!";
                    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 mr-2" />
                  WhatsApp Emergency
                </Button>
              </div>
            </motion.div>

            {/* Custom Quote */}
            <motion.div
              className="text-center lg:text-left"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-lg">
                <Microscope className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Custom Pest Solutions
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Need specialized treatment? Get a custom quote based on your specific pest problem, property size, and requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => {
                    const phoneNumber = contactInfo?.primaryPhone || '0462-480-2258';
                    window.open(`tel:${phoneNumber}`, '_blank');
                  }}
                  className="bg-admin-gradient text-white hover:opacity-90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call for Custom Quote
                </Button>
                <Button
                  onClick={() => {
                    const whatsappNumber = contactInfo?.whatsappNumber || '9626341555';
                    const message = "Hi, I need a custom pest control quote for my property. Please help me with personalized pricing and solutions.";
                    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  variant="outline"
                  className="border-admin-primary text-admin-primary hover:bg-admin-gradient hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
