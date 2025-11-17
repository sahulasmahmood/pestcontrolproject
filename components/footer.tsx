"use client";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Clock,
  Award,
  Users,
  Bug,
  Shield,
  Home,
  Building,
  IndianRupee,
  Copy
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useTheme } from "./providers/theme";
import { useContact } from "@/hooks/use-contact";
import { useServices } from "@/hooks/use-services";
import Image from "next/image";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Static data for Perfect Pest Control
const staticContactInfo = {
  primaryPhone: "0462-480-2258",
  secondaryPhone: "9626-341-555",
  whatsappNumber: "9626341555",
  email: "perfectpestcontrol555@gmail.com",
  address: "24, Rainbow Colony, Peratchi Amman Kovil Street, Vannarpettai",
  city: "Tirunelveli",
  state: "Tamil Nadu", 
  pincode: "627003",
  country: "India",

}

const staticThemeData = {
  siteName: "Perfect Pest Control",
  logo: "/perfect-pest-control-logo.png"
}

export default function Footer() {
  const { themeData } = useTheme();
  const { contactInfo } = useContact();
  const { services, loading: servicesLoading } = useServices();
  const { toast } = useToast();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Dynamic pest control services for footer
  const pestControlServices = services.slice(0, 6).map(service => ({
    name: service.serviceName,
    href: `/services/${service.slug}`
  }));

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ];

/*   const destinations = [
    'Chennai', 'Madurai', 'Coimbatore', 'Trichy', 'Salem', 'Tirunelveli'
  ] */;

  const handleWhatsAppClick = () => {
    const message = "Hi! I need pest control services. Please provide more details and a free quote.";
    const whatsappNumber = contactInfo?.whatsappNumber || staticContactInfo.whatsappNumber;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    const phoneNumber = contactInfo?.primaryPhone || staticContactInfo.primaryPhone;
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-600/10 to-orange-600/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info - Enhanced */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-2">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-3 group">
              {(themeData?.logo || staticThemeData.logo) ? (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20">
                  <Image 
                    src={themeData?.logo || staticThemeData.logo} 
                    alt="Perfect Pest Control Logo" 
                    width={56} 
                    height={56} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-admin-gradient rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl sm:text-2xl">P</span>
                </div>
              )}
              <div>
                <div className="font-bold text-xl sm:text-2xl bg-admin-gradient bg-clip-text text-transparent">
                  {(themeData?.siteName || staticThemeData.siteName).split(' ')[0]}
                </div>
                <div className="text-sm sm:text-base font-medium">
                  Pest Control
                </div>
              </div>
            </Link>

            {/* Company Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md">
              Leading provider of professional pest control services across Tamil Nadu, delivering safe, effective, and reliable pest management solutions for residential, commercial, and industrial properties.
            </p>

            {/* Static Contact Info */}
            <div className="space-y-3">
              {/* Primary Phone */}
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-admin-primary flex-shrink-0" />
                <a
                  href={`tel:${contactInfo?.primaryPhone || staticContactInfo.primaryPhone}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {contactInfo?.primaryPhone || staticContactInfo.primaryPhone}
                </a>
              </div>
              
              {/* Secondary Phone */}
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-admin-primary flex-shrink-0" />
                <a
                  href={`tel:${contactInfo?.secondaryPhone || staticContactInfo.secondaryPhone}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {contactInfo?.secondaryPhone || staticContactInfo.secondaryPhone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-admin-primary flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo?.email || staticContactInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium break-all"
                >
                  {contactInfo?.email || staticContactInfo.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-admin-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  {`${contactInfo?.address || staticContactInfo.address}, ${contactInfo?.city || staticContactInfo.city}, ${contactInfo?.state || staticContactInfo.state}-${contactInfo?.pincode || staticContactInfo.pincode}, ${contactInfo?.country || staticContactInfo.country}`}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold text-sm">Follow Us</h4>
              <div className="flex flex-wrap gap-3">
                {/* Facebook - Only show if URL is provided in contact info */}
                {contactInfo?.facebook && (
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 hover:bg-blue-600/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-blue-500/50"
                    title="Follow us on Facebook"
                  >
                    <Facebook className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </a>
                )}
                
                {/* Instagram - Only show if URL is provided in contact info */}
                {contactInfo?.instagram && (
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 hover:bg-pink-600/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-pink-500/50"
                    title="Follow us on Instagram"
                  >
                    <Instagram className="h-4 w-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                  </a>
                )}

                {/* Twitter - Only show if URL is provided in contact info */}
                {contactInfo?.twitter && (
                  <a
                    href={contactInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 hover:bg-blue-400/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-blue-400/50"
                    title="Follow us on Twitter"
                  >
                    <Twitter className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </a>
                )}

                {/* LinkedIn - Only show if URL is provided in contact info */}
                {contactInfo?.linkedin && (
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 hover:bg-blue-700/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-blue-700/50"
                    title="Follow us on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-blue-700 transition-colors" />
                  </a>
                )}

                {/* YouTube - Only show if URL is provided in contact info */}
                {contactInfo?.youtube && (
                  <a
                    href={contactInfo.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/10 hover:bg-red-600/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-red-500/50"
                    title="Follow us on YouTube"
                  >
                    <Youtube className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </a>
                )}
                
                {/* WhatsApp - Always show since it's essential for pest control business */}
                <button
                  onClick={handleWhatsAppClick}
                  className="group p-2 bg-white/10 hover:bg-green-600/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-green-500/50"
                  title="Contact us on WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4 text-gray-400 group-hover:text-green-500 transition-colors" />
                </button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {servicesLoading ? (
                <li className="text-gray-400 text-sm">Loading services...</li>
              ) : pestControlServices.length === 0 ? (
                <li className="text-gray-400 text-sm">No services available</li>
              ) : (
                pestControlServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-gray-300 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Options */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Payment Options</h3>
            
            {/* Desktop QR Code - Hidden on mobile */}
            <div className="hidden md:block bg-white p-4 rounded-xl mb-4 w-fit">
              <QRCodeSVG
                value={`upi://pay?pa=sheikaaa17noor-1@oksbi&pn=${encodeURIComponent("Perfect Pest Control")}`}
                size={150}
                level="H"
                className="rounded-lg"
              />
            </div>

            {/* UPI Payment Links - Optimized for mobile */}
            <div className="space-y-4">
              {/* Mobile UPI App Link */}
              <a
                href="upi://pay?pa=sheikaaa17noor-1@oksbi&pn=Perfect%20Pest%20Control"
                className="md:hidden flex items-center gap-3 p-3 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-all duration-300 border border-green-500/20 hover:border-green-500/30"
              >
                <IndianRupee className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Pay via UPI</div>
                  <div className="text-xs text-gray-400">Tap to open UPI app</div>
                </div>
                <ArrowRight className="h-4 w-4 text-green-500" />
              </a>

              {/* Copyable UPI ID */}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-300">UPI ID:</div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg min-w-0">
                  <span className="text-xs font-mono text-gray-300 truncate">sheikaaa17noor-1@oksbi</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 hover:bg-white/10 flex-shrink-0"
                    title="Copy UPI ID"
                    onClick={() => {
                      navigator.clipboard.writeText("sheikaaa17noor-1@oksbi");
                      toast({
                        title: "UPI ID Copied",
                        description: "UPI ID has been copied to clipboard",
                      });
                    }}
                  >
                    <Copy className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>

              {/* Payment Apps Links */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="phonepe://pay?pa=sheikaaa17noor-1@oksbi&pn=Perfect%20Pest%20Control"
                  className="flex items-center gap-2 px-4 py-2.5 bg-admin-gradient hover:opacity-90 rounded-lg transition-all duration-300 group"
                >
                  <span className="text-xs font-medium text-white">PhonePe</span>
                  <ArrowRight className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-all" />
                </a>
                <a
                  href="gpay://upi/pay?pa=sheikaaa17noor-1@oksbi&pn=Perfect%20Pest%20Control"
                  className="flex items-center gap-2 px-4 py-2.5 bg-admin-gradient hover:opacity-90 rounded-lg transition-all duration-300 group"
                >
                  <span className="text-xs font-medium text-white">Google Pay</span>
                  <ArrowRight className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-all" />
                </a>
                <a
                  href="paytmmp://pay?pa=sheikaaa17noor-1@oksbi&pn=Perfect%20Pest%20Control"
                  className="flex items-center gap-2 px-4 py-2.5 bg-admin-gradient hover:opacity-90 rounded-lg transition-all duration-300 group"
                >
                  <span className="text-xs font-medium text-white">Paytm</span>
                  <ArrowRight className="h-3 w-3 text-white opacity-0 group-hover:opacity-100 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 pb-6 sm:pb-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed px-2">
            © 2025 Perfect Pest Control. All rights reserved. ❤️ 
            <span className="block sm:inline sm:ml-1 hover:text-white transition-colors">
              <a href="https://mntfuture.com/" target="_blank" rel="noopener noreferrer">Developed by MnT</a>
            </span>
          </p>
        </div>
    </footer>
  );
}