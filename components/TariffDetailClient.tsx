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
  Shield
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useState } from "react";
import { useContact } from "@/hooks/use-contact";
import BookingModal from "@/components/BookingModal";

interface ServiceData {
  id: string;
  serviceName: string;
  serviceType: string;
  description: string;
  basePrice: string;
  premiumPrice: string;
  area: string;
  warranty: string;
  image: string;
  featured: boolean;
  inclusions: string[];
  pests: string[];
  slug: string;
}

interface TariffDetailClientProps {
  tariffData: ServiceData;
}

export default function TariffDetailClient({ tariffData }: TariffDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contactInfo } = useContact();

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleCallNow = () => {
    const phoneNumber = contactInfo?.primaryPhone || '+919003782966';
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
              href="/tariff"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30 px-4 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  {tariffData.serviceType}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {tariffData.serviceName}
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {tariffData.description}
                </p>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="font-semibold">₹{tariffData.basePrice} - ₹{tariffData.premiumPrice}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-semibold">{tariffData.warranty} Warranty</span>
                  </div>
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
                    src={tariffData.image || "/pest-control-service.jpg"}
                    alt={tariffData.serviceName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  {tariffData.featured && (
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
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Basic Service</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-2">₹{tariffData.basePrice}</div>
                        <p className="text-blue-700 text-sm">Standard treatment package</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-900 mb-2">Premium Service</h3>
                        <div className="text-3xl font-bold text-green-600 mb-2">₹{tariffData.premiumPrice}</div>
                        <p className="text-green-700 text-sm">Comprehensive treatment package</p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-semibold text-yellow-900">Service Warranty</span>
                      </div>
                      <p className="text-yellow-800">{tariffData.warranty} warranty included</p>
                    </div>
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <MapPin className="h-5 w-5 text-emerald-600 mr-2" />
                        <span className="font-semibold text-emerald-900">Coverage Area</span>
                      </div>
                      <p className="text-emerald-800">{tariffData.area}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Features & Services */}
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
                      Service Includes
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {tariffData.inclusions.map((inclusion, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{inclusion}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Pests</h3>
                      <div className="flex flex-wrap gap-2">
                        {tariffData.pests.map((pest, index) => (
                          <Badge key={index} variant="outline" className="bg-emerald-50 border-emerald-200 text-emerald-700">
                            {pest}
                          </Badge>
                        ))}
                      </div>
                    </div>
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
                    <div className="text-center mb-8">
                      <div className="text-2xl font-bold text-admin-primary mb-1">
                        ₹{tariffData.basePrice}
                      </div>
                      <div className="text-gray-600">Basic Service</div>
                      <div className="text-lg font-semibold text-admin-primary mt-2">
                        ₹{tariffData.premiumPrice}
                      </div>
                      <div className="text-gray-600">Premium Service</div>
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Service Type</span>
                        <span className="font-semibold">{tariffData.serviceType}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Warranty</span>
                        <span className="font-semibold">{tariffData.warranty}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-600">Coverage Area</span>
                        <span className="font-semibold">{tariffData.area}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600">Availability</span>
                        <span className="font-semibold text-green-600">Available</span>
                      </div>
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
                        Our travel experts are here to help you plan your perfect trip.
                      </p>
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <Phone className="h-4 w-4 mr-2 text-admin-primary" />
                          <span>{contactInfo?.primaryPhone || '+91 90037 82966'}</span>
                        </div>
                        <div className="flex items-center">
                          <WhatsAppIcon className="h-4 w-4 mr-2 text-green-500" />
                          <span>WhatsApp Support</span>
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

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={tariffData.serviceName}
      />
      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={tariffData.serviceName}
      />
    </div>
  );
}