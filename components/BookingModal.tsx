"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, Bug } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useToast } from "@/hooks/use-toast";
import { useContact } from "@/hooks/use-contact";
import { useServices } from "@/hooks/use-services";

// Static contact info for Perfect Pest Control
const staticContactInfo = {
  primaryPhone: "0462-480-2258",
  secondaryPhone: "9626-341-555",
  whatsappNumber: "9626341555",
  email: "perfectpestcontrol555@gmail.com"
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledTitle?: string;
}

export default function BookingModal({ isOpen, onClose, prefilledService, prefilledTitle }: BookingModalProps) {
  const { toast } = useToast();
  const { contactInfo } = useContact();
  const { serviceNames, loading: servicesLoading } = useServices();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: prefilledService || "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    description: ""
  });

  // Static service areas for Perfect Pest Control
  useEffect(() => {
    setLocations([
      "Tirunelveli", "Tuticorin", "Tenkasi", "Nagercoil", "Madurai",
      "Ramanathapuram", "Sivakasi", "Virudhunagar", "Kovilpatti", "Sankarankovil"
    ]);
  }, []);



  // Reset form when modal opens with prefilled data
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        service: prefilledService || prev.service || "",
      }));
    }
  }, [isOpen, prefilledService]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = [
      { field: 'name', label: 'Full Name' },
      { field: 'phone', label: 'Phone Number' },
      { field: 'service', label: 'Service Type' },
      { field: 'address', label: 'Address' },
      { field: 'preferredDate', label: 'Preferred Date' }
    ];

    const missingFields = requiredFields.filter(({ field }) => !formData[field as keyof typeof formData]);

    if (missingFields.length > 0) {
      toast({
        title: "Please fill required fields",
        description: `Missing: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save lead to database
      const leadData = {
        fullName: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        serviceType: formData.service,
        serviceDate: formData.preferredDate,
        serviceTime: formData.preferredTime || "",
        returnDate: "",
        address: formData.address,
        propertyType: "", // Empty so admin can edit
        propertySize: null, // Empty so admin can edit
        message: `Pest control enquiry for ${formData.service}. Address: ${formData.address}, Preferred Date: ${formData.preferredDate}${formData.preferredTime ? `, Time: ${formData.preferredTime}` : ''}. Description: ${formData.description}`,
        status: "new",
        priority: "high",
        source: "website",
        estimatedCost: "To be determined",
        notes: "Booking Modal form pest control enquiry"
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
        toast({
          title: "Enquiry failed",
          description: result.error || "Failed to submit enquiry. Please try again or call us directly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Create WhatsApp message
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

      // Open WhatsApp
      const whatsappNumber = contactInfo?.whatsappNumber || staticContactInfo.whatsappNumber;
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Enquiry Sent!",
        description: "We'll contact you shortly with availability and pricing details.",
      });

      // Reset form and close modal
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
      onClose();
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: "Enquiry submission failed",
        description: "Unable to submit your enquiry. Please try again or contact us directly for assistance.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center">
            <Bug className="h-6 w-6 mr-2 text-admin-primary" />
            Get Pest Control Quote
            {prefilledTitle && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                - {prefilledTitle}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                {servicesLoading ? (
                  <SelectItem value="loading" disabled>Loading services...</SelectItem>
                ) : serviceNames.length === 0 ? (
                  <SelectItem value="no-services" disabled>No services available</SelectItem>
                ) : (
                  serviceNames.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
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

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-admin-gradient text-white hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <WhatsAppIcon className="h-4 w-4 mr-2" />
                  Submit Now
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}