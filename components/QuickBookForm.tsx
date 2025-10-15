"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Bug } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useToast } from "@/hooks/use-toast";
// import { useContact } from "@/hooks/use-contact"; // Commented out for static data

// Static contact info for Perfect Pest Control
const staticContactInfo = {
  primaryPhone: "0462-480-2258",
  secondaryPhone: "9626-341-555",
  whatsappNumber: "9626341555",
  email: "perfectpestcontrol555@gmail.com"
}

export default function QuickBookForm() {
  const { toast } = useToast();
  // const { contactInfo } = useContact(); // Commented out for static data
  const contactInfo = staticContactInfo; // Using static data
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    description: ""
  });

  // Static services for Perfect Pest Control
  const services = [
    "Anti Termite Treatment",
    "Rat Control", 
    "Bed Bug Treatment",
    "Ant Control",
    "Mosquito Control",
    "Cockroach Control",
    "Disinfection Spray Service",
    "General Pest Control"
  ];

  // Static locations for Perfect Pest Control service areas
  useEffect(() => {
    setLocations([
      "Tirunelveli", "Tuticorin", "Tenkasi", "Nagercoil", "Madurai",
      "Ramanathapuram", "Sivakasi", "Virudhunagar", "Kovilpatti", "Sankarankovil"
    ]);
  }, []);



  // Listen for service prefill events from homepage services
  useEffect(() => {
    const handlePrefillService = (event: CustomEvent) => {
      setFormData(prev => ({ ...prev, service: event.detail }));
    };

    window.addEventListener('prefillService', handlePrefillService as EventListener);
    return () => {
      window.removeEventListener('prefillService', handlePrefillService as EventListener);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save lead to database
      const leadData = {
        fullName: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        serviceType: formData.service,
        travelDate: formData.preferredDate,
        travelTime: formData.preferredTime || "",
        returnDate: "",
        pickupLocation: formData.address,
        dropLocation: "",
        passengers: 1, // Default value
        message: `Pest control enquiry for ${formData.service}. Address: ${formData.address}, Preferred Date: ${formData.preferredDate}${formData.preferredTime ? `, Time: ${formData.preferredTime}` : ''}. Description: ${formData.description}`,
        status: "new",
        priority: "high",
        source: "website",
        estimatedCost: "To be determined",
        notes: "Pest control enquiry form submission"
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to save lead');
      }

      // Create WhatsApp message with form data
      const message = `🐛 *Pest Control Enquiry*
      
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email || 'Not provided'}
*Service:* ${formData.service}
*Address:* ${formData.address}
*Preferred Date:* ${formData.preferredDate}
*Preferred Time:* ${formData.preferredTime || 'Flexible'}
*Description:* ${formData.description || 'No additional details'}

Please provide availability and pricing details.`;

      const whatsappNumber = contactInfo.whatsappNumber;
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Enquiry Sent!",
        description: "We'll contact you shortly with availability and pricing details.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        address: "",
        preferredDate: "",
        preferredTime: "",
        description: ""
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center">
            <Bug className="h-6 w-6 mr-2 text-admin-primary" />
            Get Free Quote
          </CardTitle>
          <p className="text-gray-600">Professional pest control services</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleQuickBook} className="space-y-3 sm:space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email address"
                className="mt-1"
              />
            </div>



            {/* Service Selection */}
            <div>
              <Label htmlFor="service" className="text-gray-700 font-medium">
                Pest Control Service *
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
                required
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select pest control service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Address Field */}
            <div>
              <Label htmlFor="address" className="text-gray-700 font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-red-500" />
                 Address *
              </Label>
              <Input
                id="address"
                type="text"
                required
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete address"
                className="mt-1"
              />
            </div>

            {/* Service Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate" className="text-gray-700 font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                  Preferred Date *
                </Label>
                <Input
                  id="preferredDate"
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="preferredTime" className="text-gray-700 font-medium">
                  Preferred Time
                </Label>
                <Input
                  id="preferredTime"
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Problem Description
              </Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the pest problem, affected areas, severity, etc."
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-admin-primary focus:border-transparent resize-none"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-admin-gradient text-white hover:opacity-90 py-3 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Enquiry...
                </>
              ) : (
                <>
                  <WhatsAppIcon className="h-5 w-5 mr-2" />
                  Get Free Quote
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}