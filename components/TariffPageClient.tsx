"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Phone, 
  CheckCircle, 
  Home, 
  Building, 
  Target, 
  Bug, 
  Clock, 
  Award,
  ShieldCheck,
  Zap,
  Leaf,
  Star,
  AlertTriangle,
  Microscope
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import { useBanner } from "@/hooks/use-banner";
import { useContact } from "@/hooks/use-contact";

interface ServiceItem {
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

interface TariffPageClientProps {
  tariffData: ServiceItem[];
}

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TariffPageClient({ tariffData }: TariffPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const { banner } = useBanner("tariff");
  const { contactInfo } = useContact();

  const handleBookService = (serviceName: string) => {
    const message = `Hi, I need ${serviceName} service. Please provide a detailed quote and schedule an inspection.`;
    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919003782966';
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'Sanitization': return <ShieldCheck className="h-4 w-4" />;
      case 'Specialized': return <Target className="h-4 w-4" />;
      case 'Rodent Control': return <AlertTriangle className="h-4 w-4" />;
      case 'General Pest': return <Bug className="h-4 w-4" />;
      case 'Vector Control': return <Zap className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'Sanitization': return 'from-blue-500 to-cyan-600';
      case 'Specialized': return 'from-emerald-500 to-green-600';
      case 'Rodent Control': return 'from-red-500 to-orange-600';
      case 'General Pest': return 'from-purple-500 to-indigo-600';
      case 'Vector Control': return 'from-teal-500 to-green-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  return (
    <>
      {/* Hero Section with Dynamic Banner */}
      <section className="relative bg-admin-gradient text-white py-16 sm:py-20 lg:py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {/* Image Layer */}
            <div className="absolute inset-0 opacity-100 transition-opacity duration-700">
              <img
                src={banner?.status === "active" && banner?.image ? banner.image : "/placeholder.jpg"}
                alt={banner?.title || "Perfect Pest Control Services"}
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
              className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-green-600/20"
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
              className="absolute inset-0 bg-gradient-to-bl from-green-500/20 via-transparent to-emerald-500/20"
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
            <Badge className="mb-3 sm:mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm">
              <ShieldCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
              Perfect Pest Control Services
            </Badge>

            {/* Optional dynamic banner title (keeps existing main heading) */}
            {banner?.title && (
              <p className="text-white/90 text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{banner.title}</p>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Professional Pest Control
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1 sm:mt-2 font-normal">
                Services & Pricing
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Comprehensive pest control solutions for residential, commercial, and industrial clients. 
              Transparent pricing with no hidden charges for all our professional services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Pricing Grid - Unique Layout */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Badge className="mb-6 bg-admin-gradient text-white px-6 py-3">
              <Shield className="h-4 w-4 mr-2" />
              Service Pricing
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Professional Pest Control
              <span className="block text-transparent bg-clip-text bg-admin-gradient">
                Services & Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing for all our pest control services with no hidden charges
            </p>
          </motion.div>

          {tariffData.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No pest control services available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured Services */}
              <div className="grid lg:grid-cols-2 gap-8">
                {tariffData.filter(service => service.featured).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-xl overflow-hidden group bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200">
                      <div className="grid md:grid-cols-2 gap-0 h-full">
                        {/* Image Section */}
                        <div className="aspect-[4/3] overflow-hidden relative">
                          <img
                            src={service.image || '/pest-control-service.jpg'}
                            alt={service.serviceName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          
                          {/* Service Type Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className={`bg-gradient-to-r ${getServiceTypeColor(service.serviceType)} text-white backdrop-blur-sm`}>
                              {getServiceTypeIcon(service.serviceType)}
                              <span className="ml-2">{service.serviceType}</span>
                            </Badge>
                          </div>

                          {/* Featured Badge */}
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-yellow-500 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Most Popular
                            </Badge>
                          </div>

                          {/* Warranty Info */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center space-x-1">
                                <Shield className="h-4 w-4" />
                                <span>{service.warranty} warranty</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{service.area}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <CardContent className="p-8 flex flex-col">
                          <div className="flex-grow">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                              {service.serviceName}
                            </h3>
                            
                            <p className="text-gray-600 mb-6 leading-relaxed">
                              {service.description}
                            </p>

                            {/* Pricing */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1">
                                  ₹{service.basePrice}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Basic</div>
                                <div className="text-sm text-gray-500">Service</div>
                              </div>
                              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-emerald-100">
                                <div className="text-2xl font-bold text-transparent bg-clip-text bg-admin-gradient mb-1">
                                  ₹{service.premiumPrice}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">Premium</div>
                                <div className="text-sm text-gray-500">Service</div>
                              </div>
                            </div>

                            {/* Target Pests */}
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Target Pests:</h4>
                              <div className="flex flex-wrap gap-2">
                                {service.pests.map((pest, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-emerald-50 border-emerald-200">
                                    {pest}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Inclusions */}
                            <div className="mb-8">
                              <h4 className="font-semibold text-gray-900 mb-3 text-sm">Service Includes:</h4>
                              <div className="grid grid-cols-1 gap-2">
                                {service.inclusions.map((inclusion, idx) => (
                                  <div key={idx} className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                                    {inclusion}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="mt-auto space-y-3">
                            <Button
                              onClick={() => {
                                setSelectedService(service.serviceName);
                                setIsModalOpen(true);
                              }}
                              className="w-full bg-admin-gradient text-white hover:shadow-lg h-12 text-base"
                            >
                              Get Quote & Book Service
                            </Button>
                            <Link
                              href={`/tariff/${service.slug}`}
                              className="block text-center text-admin-primary hover:text-admin-secondary transition-colors font-medium text-sm py-2"
                            >
                              View Detailed Information →
                            </Link>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Regular Services */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tariffData.filter(service => !service.featured).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group bg-white">
                      {/* Image Section */}
                      <div className="aspect-[3/2] overflow-hidden relative">
                        <img
                          src={service.image || '/pest-control-service.jpg'}
                          alt={service.serviceName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        
                        {/* Service Type Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className={`bg-gradient-to-r ${getServiceTypeColor(service.serviceType)} text-white backdrop-blur-sm`}>
                            {getServiceTypeIcon(service.serviceType)}
                            <span className="ml-2">{service.serviceType}</span>
                          </Badge>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            From ₹{service.basePrice}
                          </Badge>
                        </div>

                        {/* Service Info */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Shield className="h-4 w-4" />
                              <span>{service.warranty}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{service.area}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                            {service.serviceName}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                            {service.description}
                          </p>

                          {/* Pricing */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-transparent bg-clip-text bg-admin-gradient">
                                ₹{service.basePrice}
                              </div>
                              <div className="text-xs text-gray-500">Basic</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-lg font-bold text-transparent bg-clip-text bg-admin-gradient">
                                ₹{service.premiumPrice}
                              </div>
                              <div className="text-xs text-gray-500">Premium</div>
                            </div>
                          </div>

                          {/* Target Pests */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Target Pests:</h4>
                            <div className="flex flex-wrap gap-1">
                              {service.pests.slice(0, 2).map((pest, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {pest}
                                </Badge>
                              ))}
                              {service.pests.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{service.pests.length - 2} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Key Inclusions */}
                          <div className="mb-6">
                            <div className="space-y-2">
                              {service.inclusions.slice(0, 3).map((inclusion, idx) => (
                                <div key={idx} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                                  {inclusion}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto space-y-3">
                          <Button
                            onClick={() => {
                              setSelectedService(service.serviceName);
                              setIsModalOpen(true);
                            }}
                            className="w-full bg-admin-gradient text-white hover:shadow-lg text-sm"
                          >
                            Get Quote
                          </Button>
                          <Link
                            href={`/tariff/${service.slug}`}
                            className="block text-center text-admin-primary hover:text-admin-secondary transition-colors font-medium text-sm py-1"
                          >
                            Learn More →
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Service Guarantees Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Service Guarantees
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional pest control services backed by our commitment to excellence
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: "Licensed & Insured",
                description: "Fully licensed professionals with comprehensive insurance coverage",
                color: "from-blue-500 to-cyan-600"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Satisfaction Guarantee",
                description: "100% satisfaction guarantee with follow-up services included",
                color: "from-emerald-500 to-green-600"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "24/7 Support",
                description: "Round-the-clock customer support and emergency services",
                color: "from-purple-500 to-indigo-600"
              },
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Eco-Safe Methods",
                description: "Environmentally responsible pest control solutions",
                color: "from-green-500 to-emerald-600"
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-admin-gradient transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emergency & Custom Service Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-red-50 to-orange-50">
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
                <AlertTriangle className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Emergency Pest Control
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Urgent pest problem? We provide 24/7 emergency services for critical infestations.
              </p>
              
              <Button
                onClick={() => {
                  const phoneNumber = contactInfo?.primaryPhone || '+919003782966';
                  window.open(`tel:${phoneNumber}`, '_blank');
                }}
                className="bg-gradient-to-r from-red-500 to-orange-600 text-white hover:shadow-lg"
              >
                <Phone className="h-4 w-4 mr-2" />
                Emergency Hotline
              </Button>
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
                Need specialized treatment? Get a custom quote based on your specific pest problem and property size.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => {
                    const phoneNumber = contactInfo?.primaryPhone || '+919003782966';
                    window.open(`tel:${phoneNumber}`, '_blank');
                  }}
                  className="bg-admin-gradient text-white hover:opacity-90"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call for Custom Quote
                </Button>
                <Button
                  onClick={() => {
                    const whatsappNumber = contactInfo?.whatsappNumber || contactInfo?.primaryPhone || '919003782966';
                    const message = "Hi, I need a custom pest control quote for my property. Please help me with personalized pricing.";
                    window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  variant="outline"
                  className="border-admin-primary text-admin-primary hover:bg-admin-gradient hover:text-white"
                >
                  WhatsApp Us
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledService={selectedService}
      />
    </>
  );
}