"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Car, 
  Clock, 
  Users, 
  CheckCircle, 
  Phone,
  Star,
  MapPin,
  Shield,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useState } from "react";
import { useContact } from "@/hooks/use-contact";
import BookingModal from "@/components/BookingModal";
import "@/styles/prose.css";

interface ServiceData {
  _id?: string;
  id?: string;
  serviceName: string;
  serviceType: string;
  shortDescription?: string;
  description: string;
  basePrice?: string;
  coverageArea?: string;
  serviceAreaTypes?: string[];
  image: string;
  featured: boolean;
  inclusions?: string[];
  pests?: string[];
  slug: string;
  gallery?: string[];
  status?: string;
  views?: number;
  bookings?: number;
}

interface ServiceDetailClientProps {
  serviceData: ServiceData;
}

export default function ServiceDetailClient({ serviceData }: ServiceDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const { contactInfo } = useContact();

  const handleBookNow = () => {
    const message = `Hi, I need ${serviceData.serviceName} service. Please provide a detailed quote and schedule an inspection.`;
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919626341555';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '0462-480-2258';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleModalBooking = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-admin-gradient text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  {serviceData.serviceType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {serviceData.serviceName}
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {serviceData.shortDescription || serviceData.description}
                </p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  {serviceData.basePrice && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span className="font-semibold">From ₹{serviceData.basePrice}</span>
                    </div>
                  )}
                  {serviceData.coverageArea && (
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      <span className="font-semibold">{serviceData.coverageArea}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="font-semibold">Professional Service</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleBookNow}
                    size="lg"
                    className="bg-white text-admin-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                  >
                    Get Quote & Book Service
                  </Button>
                  <Button
                    onClick={handleCallNow}
                    size="lg"
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white hover:text-admin-primary hover:border-white px-8 py-3 text-lg font-semibold transition-all duration-300 bg-white/10 backdrop-blur-sm"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={serviceData.image || "/pest-control-service.jpg"}
                    alt={serviceData.serviceName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {serviceData.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-yellow-900">
                        ⭐ Featured Vehicle
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Pricing Information */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-admin-primary" />
                      Service Pricing
                    </h2>
                    {serviceData.basePrice && (
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Service Pricing</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-2">From ₹{serviceData.basePrice}</div>
                        <p className="text-blue-700 text-sm">Professional pest control service</p>
                      </div>
                    )}
                    {serviceData.coverageArea && (
                      <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="font-semibold text-emerald-900">Coverage Area</span>
                        </div>
                        <p className="text-emerald-800">{serviceData.coverageArea}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Service Overview - Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-admin-primary" />
                      About This Service
                    </h2>
                    <div 
                      className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: serviceData.description }}
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features & Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-0">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-admin-primary" />
                      Service Includes
                    </h2>
                    {serviceData.inclusions && serviceData.inclusions.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {serviceData.inclusions.map((inclusion, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{inclusion}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Service Area Types & Target Pests - Combined Section */}
                    {((serviceData.serviceAreaTypes && serviceData.serviceAreaTypes.length > 0) || 
                      (serviceData.pests && serviceData.pests.length > 0)) && (
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                          <Shield className="h-6 w-6 mr-3 text-admin-primary" />
                          Service Coverage & Target Pests
                        </h3>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Service Area Types */}
                          {serviceData.serviceAreaTypes && serviceData.serviceAreaTypes.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                              viewport={{ once: true }}
                            >
                              <Card className="card-hover h-full shadow-xl border-0">
                                <CardContent className="p-6">
                                  <h4 className="text-lg font-semibold mb-4 text-admin-primary flex items-center">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    Service Area Types
                                  </h4>
                                  <div className="grid grid-cols-1 gap-3">
                                    {serviceData.serviceAreaTypes.map((areaType, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
                                      >
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                          <MapPin className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-semibold text-blue-800 text-base">{areaType}</span>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )}

                          {/* Target Pests */}
                          {serviceData.pests && serviceData.pests.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              viewport={{ once: true }}
                            >
                              <Card className="card-hover h-full shadow-xl border-0">
                                <CardContent className="p-6">
                                  <h4 className="text-lg font-semibold mb-4 text-admin-primary flex items-center">
                                    <Shield className="h-5 w-5 mr-2" />
                                    Target Pests
                                  </h4>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {serviceData.pests.map((pest, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 hover:shadow-md transition-all duration-300"
                                      >
                                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                          <Shield className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="font-semibold text-red-800 text-sm">{pest}</span>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>



            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="sticky top-8"
              >
                <Card className="shadow-2xl border-0">
                  <CardContent className="p-8">
                    {serviceData.basePrice && (
                      <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-admin-primary mb-1">
                          From ₹{serviceData.basePrice}
                        </div>
                        <div className="text-gray-600">Professional Service</div>
                      </div>
                    )}

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Service Type</span>
                        <span className="font-semibold">{serviceData.serviceType}</span>
                      </div>
                      {serviceData.coverageArea && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-600">Coverage Area</span>
                          <span className="font-semibold">{serviceData.coverageArea}</span>
                        </div>
                      )}
                      {serviceData.serviceAreaTypes && serviceData.serviceAreaTypes.length > 0 && (
                        <div className="py-4">
                          <span className="text-gray-600 font-medium block mb-3">Service Area Types</span>
                          <div className="grid grid-cols-1 gap-2">
                            {serviceData.serviceAreaTypes.map((areaType, index) => (
                              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 text-center">
                                <span className="font-semibold text-blue-800 text-sm">{areaType}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={handleBookNow}
                        className="w-full bg-admin-gradient text-white hover:opacity-90 py-3 text-lg font-semibold"
                      >
                        Get Quote & Book Service
                      </Button>
                      <Button
                        onClick={handleModalBooking}
                        variant="outline"
                        className="w-full border-admin-primary text-admin-primary hover:bg-admin-primary hover:text-white py-3 text-lg font-semibold"
                      >
                        Quick Booking Form
                      </Button>
                      <Button
                        onClick={handleCallNow}
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 text-lg font-semibold"
                      >
                        <Phone className="h-5 w-5 mr-2" />
                        Call for Details
                      </Button>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
                      <p className="text-sm text-gray-600 mb-3">
                         Our pest control experts are here to help you with professional pest management solutions.
                      </p>
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Phone className="h-4 w-4 mr-2 text-admin-primary" />
                          <span>{contactInfo?.primaryPhone || '+91 96263 41555'}</span>
                        </div>
                        <div className="flex items-center">
                          <WhatsAppIcon className="h-4 w-4 mr-2 text-green-500" />
                          <span>WhatsApp Support Available</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Gallery Section - Separate & Clean */}
      {serviceData.gallery && serviceData.gallery.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-6 bg-admin-gradient text-white px-6 py-2 text-sm">
                <Star className="h-4 w-4 mr-2" />
                Service Documentation
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Service <span className="text-transparent bg-clip-text bg-admin-gradient">Gallery</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional documentation of our {serviceData.serviceName.toLowerCase()} service process and results
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Gallery Grid - Clean Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {serviceData.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={image}
                        alt={`${serviceData.serviceName} - Professional Service ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                      
                      {/* Overlay Content */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-gray-900 font-semibold text-sm">View Image</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image Caption */}
                    <div className="mt-4 text-center">
                      <p className="text-gray-600 text-sm">
                        Professional Service Documentation {index + 1}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Gallery Footer */}
              <div className="mt-16 text-center">
                <div className="inline-flex items-center justify-center bg-gray-50 rounded-full px-8 py-4">
                  <Star className="h-5 w-5 text-admin-primary mr-3" />
                  <span className="text-gray-700 font-medium">
                    {serviceData.gallery.length} Professional Service Images
                  </span>
                </div>
                <p className="mt-4 text-gray-500 text-sm max-w-2xl mx-auto">
                  All images showcase actual service delivery and results from our professional pest control team
                </p>
              </div>
            </motion.div>
          </div>

          {/* Image Modal */}
          {currentImageIndex !== null && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
              onClick={() => setCurrentImageIndex(null)}
            >
              <div 
                className="relative w-full h-full flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
                  onClick={() => setCurrentImageIndex(null)}
                >
                  <X className="w-8 h-8" />
                </button>
                
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentImageIndex(prev => Math.max(0, prev! - 1))}
                  disabled={currentImageIndex === 0}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>

                <img
                  src={serviceData.gallery[currentImageIndex]}
                  alt={`${serviceData.serviceName} - Gallery image ${currentImageIndex + 1}`}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />

                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentImageIndex(prev => Math.min(serviceData.gallery!.length - 1, prev! + 1))}
                  disabled={currentImageIndex === serviceData.gallery.length - 1}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={serviceData.serviceName}
      />
    </div>
  );
}