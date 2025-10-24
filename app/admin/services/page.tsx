"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import RichTextEditor from "@/components/ui/rich-text-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Shield,
  Upload,
  ImageIcon,
  Loader2
} from "lucide-react";
import axios from "axios";

interface Service {
  _id?: string;
  serviceName: string;
  serviceType: string;
  shortDescription?: string;
  description: string;
  basePrice: string;
  coverageArea: string;
  serviceAreaTypes?: string[];
  image: string;
  gallery: string[];
  featured: boolean;
  inclusions: string[];
  pests: string[];
  slug: string;
  status: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalServices: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Service Types and Area Types are now fully dynamic - no static values

// Helper function to check if RichTextEditor content is empty
const isQuillContentEmpty = (content: string) => {
  if (!content) return true;
  const textContent = content.replace(/<[^>]*>/g, '').trim();
  return textContent === '' || textContent === '\n';
};

export default function ServicesPage() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingButtonId, setDeletingButtonId] = useState<string | null>(null);
  const scrollPositionRef = useRef<number>(0);

  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalServices: 0,
    limit: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    shortDescription: "",
    description: "",
    basePrice: "",
    coverageArea: "",
    serviceAreaTypes: [] as string[],
    inclusions: "",
    pests: "",
    image: "",
    gallery: [] as string[],
    status: "active",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  // Service Type Management States
  const [serviceTypes, setServiceTypes] = useState<{ _id: string; name: string }[]>([]);
  const [newServiceTypeName, setNewServiceTypeName] = useState("");
  const [showAddServiceType, setShowAddServiceType] = useState(false);
  const [editingServiceType, setEditingServiceType] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editServiceTypeName, setEditServiceTypeName] = useState("");
  const [deletingServiceTypeId, setDeletingServiceTypeId] = useState<string | null>(null);
  const [serviceTypeDropdownOpen, setServiceTypeDropdownOpen] = useState(false);
  const [explicitlyClosingServiceType, setExplicitlyClosingServiceType] = useState(false);

  // Service Area Type Management States
  const [areaTypes, setAreaTypes] = useState<{ _id: string; name: string }[]>([]);
  const [newAreaTypeName, setNewAreaTypeName] = useState("");
  const [showAddAreaType, setShowAddAreaType] = useState(false);
  const [editingAreaType, setEditingAreaType] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [editAreaTypeName, setEditAreaTypeName] = useState("");
  const [deletingAreaTypeId, setDeletingAreaTypeId] = useState<string | null>(null);
  const [areaTypeDropdownOpen, setAreaTypeDropdownOpen] = useState(false);
  const [explicitlyClosingAreaType, setExplicitlyClosingAreaType] = useState(false);

  // Check if maximum featured services limit reached (3 featured services max)
  const maxFeaturedReached =
    Array.isArray(services) && services.filter((svc) => svc.featured).length >= 3;

  const [selectedFiles, setSelectedFiles] = useState<{
    mainImage: File | null;
    galleryImages: File[];
  }>({
    mainImage: null,
    galleryImages: [],
  });

  // Fetch services from API
  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      
      // Get JWT token from localStorage
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.get(`/api/admin/services?page=${page}&limit=6`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setServices(response.data.data);
        setPagination(response.data.pagination);
        setCurrentPage(page);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch services",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch service types from database
  const fetchServiceTypes = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await axios.get('/api/admin/service-types', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setServiceTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  // Fetch area types from database
  const fetchAreaTypes = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await axios.get('/api/admin/area-types', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        setAreaTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching area types:", error);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
    fetchServiceTypes();
    fetchAreaTypes();
  }, [currentPage]);

  const handleEdit = (service: Service) => {
    scrollPositionRef.current = window.scrollY;
    
    setEditingId(service._id || null);
    setFormData({
      serviceName: service.serviceName,
      serviceType: service.serviceType,
      shortDescription: service.shortDescription || "",
      description: service.description,
      basePrice: service.basePrice,
      coverageArea: service.coverageArea,
      serviceAreaTypes: service.serviceAreaTypes || [],
      inclusions: service.inclusions.join(", "),
      pests: service.pests.join(", "),
      image: service.image,
      gallery: service.gallery || [],
      status: service.status,
      featured: service.featured,
      seoTitle: service.seoTitle || "",
      seoDescription: service.seoDescription || "",
      seoKeywords: service.seoKeywords || "",
    });
    setSelectedFiles({
      mainImage: null,
      galleryImages: [],
    });
    setIsAddModalOpen(true);
  };

  const handleSave = async () => {
    setIsFormSubmitted(true);
    setIsSaving(true);

    // Validate required fields - only Service Name, Type, Description, and Main Image
    if (!formData.serviceName || formData.serviceName.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Service name is required and cannot be empty.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    if (!formData.serviceType || formData.serviceType.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Service type is required and cannot be empty.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    if (isQuillContentEmpty(formData.description)) {
      toast({
        title: "Validation Error",
        description: "Full description is required and cannot be empty.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    if (!formData.image) {
      toast({
        title: "Validation Error",
        description: "Service image is required.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    try {
      // Get JWT token from localStorage first
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again to continue.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Prepare form data for submission (including files)
      const submitFormData = new FormData();
      
      // Add all text fields
      submitFormData.append('serviceName', formData.serviceName.trim());
      submitFormData.append('serviceType', formData.serviceType);
      submitFormData.append('shortDescription', formData.shortDescription.trim());
      submitFormData.append('description', formData.description.trim());
      submitFormData.append('basePrice', formData.basePrice.trim());
      submitFormData.append('coverageArea', formData.coverageArea.trim());
      submitFormData.append('serviceAreaTypes', JSON.stringify(formData.serviceAreaTypes));
      submitFormData.append('featured', formData.featured.toString());
      submitFormData.append('status', formData.status);
      
      // Add existing image URL if no new file selected
      if (!selectedFiles.mainImage && formData.image) {
        submitFormData.append('existingImage', formData.image);
      }
      
      // Add new main image file if selected
      if (selectedFiles.mainImage) {
        submitFormData.append('mainImage', selectedFiles.mainImage);
      }
      
      // Add existing gallery URLs
      formData.gallery.forEach((url, index) => {
        if (!url.startsWith('blob:')) {
          submitFormData.append(`existingGallery[${index}]`, url);
        }
      });
      
      // Add new gallery image files
      selectedFiles.galleryImages.forEach((file, index) => {
        submitFormData.append(`galleryImages`, file);
      });
      
      // Add arrays as JSON strings
      submitFormData.append('inclusions', JSON.stringify(
        formData.inclusions.split(",").map((f) => f.trim()).filter((f) => f)
      ));
      submitFormData.append('pests', JSON.stringify(
        formData.pests.split(",").map((f) => f.trim()).filter((f) => f)
      ));
      
      // Add SEO fields
      submitFormData.append('seoTitle', formData.seoTitle.trim());
      submitFormData.append('seoDescription', formData.seoDescription.trim());
      submitFormData.append('seoKeywords', formData.seoKeywords.trim());

      const url = editingId
        ? `/api/admin/services/${editingId}`
        : "/api/admin/services";
      const method = editingId ? "put" : "post";

      const response = await axios[method](url, submitFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast({
          title: editingId ? "Service Updated" : "Service Added",
          description: `Service has been successfully ${
            editingId ? "updated" : "added"
          }.`,
        });
        fetchServices(currentPage);
        handleCancel();
      } else {
        toast({
          title: "Error",
          description: response.data.message || "Failed to save service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setDeletingServiceId(id);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    setDeletingButtonId(id);
    
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again to continue.",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.delete(`/api/admin/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast({
          title: "Service Deleted",
          description: "Service has been successfully deleted.",
        });
        setDeletingServiceId(null);

        // Check if we need to go back to previous page
        const remainingServices = Array.isArray(services) ? services.filter((s) => s._id !== id) : [];
        if (remainingServices.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchServices(currentPage);
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeletingButtonId(null);
    }
  };

  // Service Type Management Functions
  const handleAddServiceType = async () => {
    if (!newServiceTypeName.trim()) {
      toast({
        title: "Error",
        description: "Service type name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post('/api/admin/service-types', 
        { name: newServiceTypeName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        await fetchServiceTypes();
        toast({
          title: "Service Type Added",
          description: "New service type has been successfully added.",
        });
        setNewServiceTypeName("");
        setShowAddServiceType(false);
        setExplicitlyClosingServiceType(true);
        setServiceTypeDropdownOpen(false);
        setFormData({ ...formData, serviceType: response.data.data.name });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add service type",
        variant: "destructive",
      });
    }
  };

  const handleEditServiceType = async () => {
    if (!editServiceTypeName.trim() || !editingServiceType) {
      toast({
        title: "Error",
        description: "Service type name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.put(`/api/admin/service-types/${editingServiceType.id}`, 
        { name: editServiceTypeName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        await fetchServiceTypes();
        toast({
          title: "Service Type Updated",
          description: "Service type has been successfully updated.",
        });
        setEditingServiceType(null);
        setEditServiceTypeName("");
        setExplicitlyClosingServiceType(true);
        setServiceTypeDropdownOpen(false);
        if (formData.serviceType === editingServiceType.name) {
          setFormData({ ...formData, serviceType: editServiceTypeName.trim() });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update service type",
        variant: "destructive",
      });
    }
  };

  const handleDeleteServiceType = async (serviceTypeId: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const serviceTypeToDelete = serviceTypes.find(type => type._id === serviceTypeId);

      const response = await axios.delete(`/api/admin/service-types/${serviceTypeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        await fetchServiceTypes();
        toast({
          title: "Service Type Deleted",
          description: "Service type has been successfully deleted.",
        });
        setDeletingServiceTypeId(null);
        
        if (formData.serviceType === serviceTypeToDelete?.name) {
          setFormData({ ...formData, serviceType: "" });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete service type",
        variant: "destructive",
      });
    }
  };

  // Area Type Management Functions
  const handleAddAreaType = async () => {
    if (!newAreaTypeName.trim()) {
      toast({
        title: "Error",
        description: "Area type name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.post('/api/admin/area-types', 
        { name: newAreaTypeName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        await fetchAreaTypes();
        toast({
          title: "Area Type Added",
          description: "New area type has been successfully added.",
        });
        setNewAreaTypeName("");
        setShowAddAreaType(false);
        setExplicitlyClosingAreaType(true);
        setAreaTypeDropdownOpen(false);
        setFormData({ 
          ...formData, 
          serviceAreaTypes: [...formData.serviceAreaTypes, response.data.data.name] 
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add area type",
        variant: "destructive",
      });
    }
  };

  const handleEditAreaType = async () => {
    if (!editAreaTypeName.trim() || !editingAreaType) {
      toast({
        title: "Error",
        description: "Area type name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.put(`/api/admin/area-types/${editingAreaType.id}`, 
        { name: editAreaTypeName.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data.success) {
        await fetchAreaTypes();
        toast({
          title: "Area Type Updated",
          description: "Area type has been successfully updated.",
        });
        setEditingAreaType(null);
        setEditAreaTypeName("");
        setExplicitlyClosingAreaType(true);
        setAreaTypeDropdownOpen(false);
        if (formData.serviceAreaTypes.includes(editingAreaType.name)) {
          const updatedAreaTypes = formData.serviceAreaTypes.map(type => 
            type === editingAreaType.name ? editAreaTypeName.trim() : type
          );
          setFormData({ ...formData, serviceAreaTypes: updatedAreaTypes });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update area type",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAreaType = async (areaTypeId: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        toast({
          title: "Authentication Error",
          description: "Please login again",
          variant: "destructive",
        });
        return;
      }

      const areaTypeToDelete = areaTypes.find(type => type._id === areaTypeId);

      const response = await axios.delete(`/api/admin/area-types/${areaTypeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data.success) {
        await fetchAreaTypes();
        toast({
          title: "Area Type Deleted",
          description: "Area type has been successfully deleted.",
        });
        setDeletingAreaTypeId(null);
        
        if (formData.serviceAreaTypes.includes(areaTypeToDelete?.name || "")) {
          setFormData({ 
            ...formData, 
            serviceAreaTypes: formData.serviceAreaTypes.filter(type => type !== areaTypeToDelete?.name)
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete area type",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    const savedScrollPosition = scrollPositionRef.current;
    
    setIsAddModalOpen(false);
    setEditingId(null);
    setFormData({
      serviceName: "",
      serviceType: "",
      shortDescription: "",
      description: "",
      basePrice: "",
      coverageArea: "",
      serviceAreaTypes: [],
      inclusions: "",
      pests: "",
      image: "",
      gallery: [],
      status: "active",
      featured: false,
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });
    setSelectedFiles({
      mainImage: null,
      galleryImages: [],
    });
    
    requestAnimationFrame(() => {
      window.scrollTo({ 
        top: savedScrollPosition, 
        behavior: "instant" 
      });
    });
  };

  const handleImageUpload = (type: "main" | "gallery") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = type === "gallery";
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        if (type === "main") {
          setSelectedFiles((prev) => ({ ...prev, mainImage: files[0] }));
          const previewUrl = URL.createObjectURL(files[0]);
          setFormData((prev) => ({ ...prev, image: previewUrl }));
        } else {
          setSelectedFiles((prev) => ({
            ...prev,
            galleryImages: [...prev.galleryImages, ...files],
          }));
          const previewUrls = files.map((file) => URL.createObjectURL(file));
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, ...previewUrls],
          }));
        }

        toast({
          title: "Images Selected",
          description: `${files.length} image(s) selected. Click Save to upload.`,
        });
      }
    };
    input.click();
  };

  const removeGalleryImage = (index: number) => {
    const removedUrl = formData.gallery[index];

    if (removedUrl && removedUrl.startsWith("blob:")) {
      const blobIndex = formData.gallery
        .filter((url) => url.startsWith("blob:"))
        .indexOf(removedUrl);
      if (blobIndex !== -1) {
        setSelectedFiles((prev) => ({
          ...prev,
          galleryImages: prev.galleryImages.filter((_, i) => i !== blobIndex),
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPaginationItems = () => {
    if (!pagination) return [];
    
    const items = [];
    const { currentPage, totalPages } = pagination;

    // Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          className={
            !pagination.hasPrevPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    // Page numbers
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className={`cursor-pointer ${
              currentPage === 1
                ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                : ""
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className={`cursor-pointer ${
                currentPage === i
                  ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className={`cursor-pointer ${
              currentPage === totalPages
                ? "bg-admin-gradient text-white border-0 hover:bg-admin-gradient"
                : ""
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            !pagination.hasNextPage
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-admin-gradient bg-clip-text text-transparent">
            Services Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your pest control services with pricing and details
          </p>
        </div>

        <Dialog
          open={isAddModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              setIsFormSubmitted(false);
              const savedScrollPosition = scrollPositionRef.current;
              handleCancel();
              
              setTimeout(() => {
                window.scrollTo({ 
                  top: savedScrollPosition, 
                  behavior: "instant" 
                });
              }, 50);
            } else {
              scrollPositionRef.current = window.scrollY;
            }
            setIsAddModalOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                scrollPositionRef.current = window.scrollY;
                setEditingId(null);
                setFormData({
                  serviceName: "",
                  serviceType: "",
                  shortDescription: "",
                  description: "",
                  basePrice: "",
                  coverageArea: "",
                  serviceAreaTypes: [],
                  inclusions: "",
                  pests: "",
                  image: "",
                  gallery: [],
                  status: "active",
                  featured: false,
                  seoTitle: "",
                  seoDescription: "",
                  seoKeywords: "",
                });
                setSelectedFiles({
                  mainImage: null,
                  galleryImages: [],
                });
                setIsAddModalOpen(true);
              }}
              className="bg-admin-gradient text-white border-0"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle className="text-2xl bg-admin-gradient bg-clip-text text-transparent">
                {editingId ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-8 p-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceName" className="text-base font-semibold">
                      Service Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="serviceName"
                      value={formData.serviceName}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceName: e.target.value })
                      }
                      placeholder="e.g., Anti Termite Treatment"
                      className={`mt-2 ${
                        isFormSubmitted && !formData.serviceName
                          ? "ring-1 ring-red-500 focus:ring-2 focus:ring-red-500"
                          : ""
                      }`}
                    />
                    {isFormSubmitted && !formData.serviceName && (
                      <p className="text-sm text-red-500 mt-1">
                        Service name is required
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <Label className="text-base font-semibold">
                      Service Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="mt-2 space-y-2">
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => {
                          setFormData({ ...formData, serviceType: value });
                          setServiceTypeDropdownOpen(false);
                        }}
                        open={serviceTypeDropdownOpen}
                        onOpenChange={(open) => {
                          if (
                            !open &&
                            (editingServiceType || showAddServiceType) &&
                            !explicitlyClosingServiceType
                          ) {
                            setServiceTypeDropdownOpen(true);
                            return;
                          }
                          setServiceTypeDropdownOpen(open);
                          if (explicitlyClosingServiceType) {
                            setExplicitlyClosingServiceType(false);
                          }
                          if (!open && !explicitlyClosingServiceType) {
                            setShowAddServiceType(false);
                            setEditingServiceType(null);
                            setNewServiceTypeName("");
                            setEditServiceTypeName("");
                          }
                        }}
                      >
                        <SelectTrigger className={`w-full ${
                          isFormSubmitted && !formData.serviceType
                            ? "ring-1 ring-red-500 focus:ring-2 focus:ring-red-500"
                            : ""
                        }`}>
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent className="z-50">
                          {serviceTypes.length === 0 && (
                            <div className="px-2 py-1.5 text-sm text-gray-500">
                              No service types available. Add one below.
                            </div>
                          )}
                          
                          {serviceTypes.map((serviceType) => (
                            <div
                              key={serviceType._id}
                              className="flex items-center justify-between group"
                            >
                              <SelectItem
                                value={serviceType.name}
                                className="flex-1"
                              >
                                {serviceType.name}
                              </SelectItem>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-blue-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowAddServiceType(false);
                                    setNewServiceTypeName("");
                                    setEditingServiceType({
                                      id: serviceType._id,
                                      name: serviceType.name,
                                    });
                                    setEditServiceTypeName(serviceType.name);
                                    setServiceTypeDropdownOpen(true);
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 hover:bg-red-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeletingServiceTypeId(serviceType._id);
                                  }}
                                >
                                  <Trash2 className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          ))}

                          <div
                            className="cursor-pointer hover:bg-gray-100 px-2 py-1.5 text-sm flex items-center border-t"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setEditingServiceType(null);
                              setEditServiceTypeName("");
                              setShowAddServiceType(true);
                              setNewServiceTypeName("");
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Service Type
                          </div>

                          {showAddServiceType && (
                            <div
                              className="p-4 border-t bg-gray-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-semibold">
                                  Add New Service Type
                                </Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => {
                                    setShowAddServiceType(false);
                                    setNewServiceTypeName("");
                                    setExplicitlyClosingServiceType(true);
                                    setServiceTypeDropdownOpen(false);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <Input
                                value={newServiceTypeName}
                                onChange={(e) => setNewServiceTypeName(e.target.value)}
                                placeholder="Enter service type name"
                                className="mb-3"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddServiceType();
                                  }
                                }}
                              />
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleAddServiceType}
                                  className="flex-1 bg-admin-gradient text-white"
                                >
                                  <Save className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setShowAddServiceType(false);
                                    setNewServiceTypeName("");
                                    setExplicitlyClosingServiceType(true);
                                    setServiceTypeDropdownOpen(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}

                          {editingServiceType && (
                            <div
                              className="p-4 border-t bg-gray-50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <Label className="text-sm font-semibold">
                                  Edit Service Type
                                </Label>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => {
                                    setEditingServiceType(null);
                                    setEditServiceTypeName("");
                                    setExplicitlyClosingServiceType(true);
                                    setServiceTypeDropdownOpen(false);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <Input
                                value={editServiceTypeName}
                                onChange={(e) => setEditServiceTypeName(e.target.value)}
                                placeholder="Enter service type name"
                                className="mb-3"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleEditServiceType();
                                  }
                                }}
                              />
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={handleEditServiceType}
                                  className="flex-1 bg-admin-gradient text-white"
                                >
                                  <Save className="h-3 w-3 mr-1" />
                                  Update
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingServiceType(null);
                                    setEditServiceTypeName("");
                                    setExplicitlyClosingServiceType(true);
                                    setServiceTypeDropdownOpen(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {isFormSubmitted && !formData.serviceType && (
                      <p className="text-sm text-red-500 mt-1">
                        Service type is required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="shortDescription" className="text-base font-semibold">
                    Short Description
                  </Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Brief description for service cards and previews"
                    rows={2}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be shown in service cards and previews
                  </p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-base font-semibold">
                    Full Description <span className="text-red-500">*</span>
                  </Label>
                  <div className={`mt-2 ${isFormSubmitted && isQuillContentEmpty(formData.description) ? "ring-1 ring-red-500 focus:ring-2 focus:ring-red-500 rounded-md" : ""}`}>
                    <RichTextEditor
                      value={formData.description}
                      onChange={(content: string) => setFormData({
                        ...formData,
                        description: content,
                      })}
                      placeholder="Detailed description of the service for the service detail page"
                    />
                  </div>
                  {isFormSubmitted && isQuillContentEmpty(formData.description) && (
                    <p className="text-sm text-red-500 mt-1">
                      Full description is required
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    This will be shown on the service detail page with rich text formatting
                  </p>
                </div>
              </div>

              {/* Pricing & Coverage - Optional Fields */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Pricing & Coverage <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="basePrice" className="text-base font-semibold">
                      Base Price
                    </Label>
                    <Input
                      id="basePrice"
                      value={formData.basePrice}
                      onChange={(e) =>
                        setFormData({ ...formData, basePrice: e.target.value })
                      }
                      placeholder="e.g., ₹1,500"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverageArea" className="text-base font-semibold">
                      Coverage Area
                    </Label>
                    <Input
                      id="coverageArea"
                      value={formData.coverageArea}
                      onChange={(e) =>
                        setFormData({ ...formData, coverageArea: e.target.value })
                      }
                      placeholder="e.g., Up to 2000 sq ft"
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Square footage or area coverage (e.g., "Up to 2000 sq ft")
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <Label className="text-base font-semibold">
                    Service Area Types (Multi-select)
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                      Select multiple area types where this service is available (e.g., Residential, Commercial, Industrial)
                    </p>
                  <div className="mt-2 space-y-2">
                    {/* Selected Area Types Display */}
                    {formData.serviceAreaTypes.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50">
                        {formData.serviceAreaTypes.map((areaType, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {areaType}
                            <X 
                              className="h-3 w-3 cursor-pointer hover:text-red-500" 
                              onClick={() => {
                                const newAreaTypes = formData.serviceAreaTypes.filter((_, i) => i !== index);
                                setFormData({ ...formData, serviceAreaTypes: newAreaTypes });
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Select
                      value=""
                      onValueChange={(value) => {
                        if (value && !formData.serviceAreaTypes.includes(value)) {
                          setFormData({ 
                            ...formData, 
                            serviceAreaTypes: [...formData.serviceAreaTypes, value] 
                          });
                        }
                        setAreaTypeDropdownOpen(false);
                      }}
                      open={areaTypeDropdownOpen}
                      onOpenChange={(open) => {
                        if (
                          !open &&
                          (editingAreaType || showAddAreaType) &&
                          !explicitlyClosingAreaType
                        ) {
                          setAreaTypeDropdownOpen(true);
                          return;
                        }
                        setAreaTypeDropdownOpen(open);
                        if (explicitlyClosingAreaType) {
                          setExplicitlyClosingAreaType(false);
                        }
                        if (!open && !explicitlyClosingAreaType) {
                          setShowAddAreaType(false);
                          setEditingAreaType(null);
                          setNewAreaTypeName("");
                          setEditAreaTypeName("");
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select area types (Residential, Commercial, etc.)" />
                      </SelectTrigger>
                      <SelectContent className="z-50">
                        {areaTypes.length === 0 && (
                          <div className="px-2 py-1.5 text-sm text-gray-500">
                            No area types available. Add one below.
                          </div>
                        )}
                        
                        {areaTypes.map((areaType) => (
                          <div
                            key={areaType._id}
                            className="flex items-center justify-between group"
                          >
                            <SelectItem
                              value={areaType.name}
                              className="flex-1"
                              disabled={formData.serviceAreaTypes.includes(areaType.name)}
                            >
                              <div className="flex items-center">
                                {areaType.name}
                                {formData.serviceAreaTypes.includes(areaType.name) && (
                                  <Badge variant="secondary" className="ml-2 text-xs">Selected</Badge>
                                )}
                              </div>
                            </SelectItem>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-blue-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowAddAreaType(false);
                                  setNewAreaTypeName("");
                                  setEditingAreaType({
                                    id: areaType._id,
                                    name: areaType.name,
                                  });
                                  setEditAreaTypeName(areaType.name);
                                  setAreaTypeDropdownOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-red-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeletingAreaTypeId(areaType._id);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div
                          className="cursor-pointer hover:bg-gray-100 px-2 py-1.5 text-sm flex items-center border-t"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setEditingAreaType(null);
                            setEditAreaTypeName("");
                            setShowAddAreaType(true);
                            setNewAreaTypeName("");
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Area Type
                        </div>

                        {showAddAreaType && (
                          <div
                            className="p-4 border-t bg-gray-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Label className="text-sm font-semibold">
                                Add New Area Type
                              </Label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  setShowAddAreaType(false);
                                  setNewAreaTypeName("");
                                  setExplicitlyClosingAreaType(true);
                                  setAreaTypeDropdownOpen(false);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              value={newAreaTypeName}
                              onChange={(e) => setNewAreaTypeName(e.target.value)}
                              placeholder="Enter area type name"
                              className="mb-3"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddAreaType();
                                }
                              }}
                            />
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                onClick={handleAddAreaType}
                                className="flex-1 bg-admin-gradient text-white"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setShowAddAreaType(false);
                                  setNewAreaTypeName("");
                                  setExplicitlyClosingAreaType(true);
                                  setAreaTypeDropdownOpen(false);
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        {editingAreaType && (
                          <div
                            className="p-4 border-t bg-gray-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <Label className="text-sm font-semibold">
                                Edit Area Type
                              </Label>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => {
                                  setEditingAreaType(null);
                                  setEditAreaTypeName("");
                                  setExplicitlyClosingAreaType(true);
                                  setAreaTypeDropdownOpen(false);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              value={editAreaTypeName}
                              onChange={(e) => setEditAreaTypeName(e.target.value)}
                              placeholder="Enter area type name"
                              className="mb-3"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleEditAreaType();
                                }
                              }}
                            />
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                size="sm"
                                onClick={handleEditAreaType}
                                className="flex-1 bg-admin-gradient text-white"
                              >
                                <Save className="h-3 w-3 mr-1" />
                                Update
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingAreaType(null);
                                  setEditAreaTypeName("");
                                  setExplicitlyClosingAreaType(true);
                                  setAreaTypeDropdownOpen(false);
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Service Details - Optional */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Service Details <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                </h3>
                <div>
                  <Label htmlFor="inclusions" className="text-base font-semibold">
                    Inclusions
                  </Label>
                  <p className="text-sm text-gray-500 mt-1 mb-2">
                    Enter each inclusion on a new line or separated by commas
                  </p>
                  <Textarea
                    id="inclusions"
                    value={formData.inclusions}
                    onChange={(e) =>
                      setFormData({ ...formData, inclusions: e.target.value })
                    }
                    placeholder="Eg:
Covers all rooms, 
Safe chemicals pet and child-friendly, 
Gel and spray treatment for targeted pests, 
Frequency: Once a month, 
Free follow-up within 7 days"
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="pests" className="text-base font-semibold">
                    Target Pests
                  </Label>
                  <p className="text-sm text-gray-500 mt-1 mb-2">
                    List the pests this service targets (comma-separated)
                  </p>
                  <Textarea
                    id="pests"
                    value={formData.pests}
                    onChange={(e) =>
                      setFormData({ ...formData, pests: e.target.value })
                    }
                    placeholder="e.g., Cockroaches, Ants, Termites, Bed Bugs, Mosquitoes"
                    rows={3}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Images
                </h3>
                
                {/* Main Image */}
                <div>
                  <Label className="text-base font-semibold">
                    Main Image <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 space-y-4">
                    <Button
                      type="button"
                      onClick={() => handleImageUpload("main")}
                      variant="outline"
                      className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-blue-400"
                    >
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Click to upload main image
                        </p>
                      </div>
                    </Button>
                    {formData.image && (
                      <div className="relative">
                        <Image
                          src={formData.image}
                          alt="Main service image"
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: "" });
                            setSelectedFiles((prev) => ({ ...prev, mainImage: null }));
                          }}
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {isFormSubmitted && !formData.image && (
                    <p className="text-sm text-red-500 mt-1">
                      Main image is required
                    </p>
                  )}
                </div>

                {/* Gallery Images */}
                <div>
                  <Label className="text-base font-semibold">
                    Gallery Images (Optional)
                  </Label>
                  <div className="mt-2 space-y-4">
                    <Button
                      type="button"
                      onClick={() => handleImageUpload("gallery")}
                      variant="outline"
                      className="w-full h-24 border-2 border-dashed border-gray-300 hover:border-blue-400"
                    >
                      <div className="text-center">
                        <ImageIcon className="h-6 w-6 mx-auto mb-1 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Add gallery images
                        </p>
                      </div>
                    </Button>
                    {formData.gallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-4">
                        {formData.gallery.map((image, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                              width={120}
                              height={96}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  Settings
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="status" className="text-base font-semibold">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 mt-8">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      disabled={!formData.featured && maxFeaturedReached}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="featured" className="text-base font-semibold">
                      Featured Service
                    </Label>
                    {!formData.featured && maxFeaturedReached && (
                      <p className="text-xs text-gray-500">
                        (Max 3 featured services)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold bg-admin-gradient bg-clip-text text-transparent">
                  SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="seoTitle" className="text-base font-semibold">
                      SEO Title <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, seoTitle: e.target.value })
                      }
                      placeholder="e.g., Professional Pest Control Services | Perfect Pest Control"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoDescription" className="text-base font-semibold">
                      SEO Description <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) =>
                        setFormData({ ...formData, seoDescription: e.target.value })
                      }
                      placeholder="e.g., Get professional pest control services with guaranteed results. Safe, effective, and eco-friendly solutions for your home and business."
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="seoKeywords" className="text-base font-semibold">
                      SEO Keywords <span className="text-gray-500">(Optional)</span>
                    </Label>
                    <Input
                      id="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={(e) =>
                        setFormData({ ...formData, seoKeywords: e.target.value })
                      }
                      placeholder="e.g., pest control, termite treatment, rodent control, bed bug removal"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-admin-gradient text-white border-0"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {editingId ? "Update Service" : "Save Service"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services List - Horizontal Cards with Image Left */}
      <div className="grid gap-6">
        {Array.isArray(services) && services.map((service) => (
          <Card key={service._id} className="shadow-xl border-0">
            <CardContent className="p-10">
                 <div className="flex gap-8 h-full">
                {/* Left Side - Service Image */}
                <div className="flex-shrink-0 flex flex-col">
                  <div className="w-96 flex-1 rounded-lg overflow-hidden border-0 shadow-md">
                    <Image
                      src={service.image || "/placeholder.jpg"}
                      alt={service.serviceName}
                      width={384}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Gallery Preview */}
                  {service.gallery && service.gallery.length > 0 && (
                    <div className="mt-3">
                      <div className="flex gap-2 overflow-x-auto">
                        {service.gallery.slice(0, 4).map((image, index) => (
                          <div key={index} className="flex-shrink-0">
                            <Image
                              src={image}
                              alt={`Gallery ${index + 1}`}
                              width={60}
                              height={40}
                              className="w-15 h-10 object-cover rounded border"
                            />
                          </div>
                        ))}
                        {service.gallery.length > 4 && (
                          <div className="flex-shrink-0 w-15 h-10 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                            +{service.gallery.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Service Content */}
                <div className="flex-1 flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-gray-900">{service.serviceName}</h3>
                      <Badge
                        variant={service.status === "active" ? "default" : "secondary"}
                        className={service.status === "active" ? "bg-admin-gradient text-white" : ""}
                      >
                        {service.status}
                      </Badge>
                      {service.featured && (
                        <Badge className="bg-yellow-500 text-yellow-900">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      <Shield className="h-4 w-4 inline mr-2" />
                      {service.serviceType}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {service.basePrice && (
                        <div>
                          <span className="font-semibold text-gray-900">Base Price: </span>
                          <span className="text-gray-600">₹{service.basePrice}</span>
                        </div>
                      )}
                      {service.coverageArea && (
                        <div>
                          <span className="font-semibold text-gray-900">Coverage: </span>
                          <span className="text-gray-600">{service.coverageArea}</span>
                        </div>
                      )}
                      {service.inclusions && service.inclusions.length > 0 && (
                        <div>
                          <span className="font-semibold text-gray-900">Inclusions: </span>
                          <span className="text-gray-600">{service.inclusions.length} items</span>
                        </div>
                      )}
                      {service.pests && service.pests.length > 0 && (
                        <div>
                          <span className="font-semibold text-gray-900">Target Pests: </span>
                          <span className="text-gray-600">{service.pests.length} types</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Description:</h4>
                      <div 
                        className="text-gray-600 text-sm line-clamp-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                    </div>
                    
                    {service.inclusions && service.inclusions.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Service Inclusions:</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.inclusions.slice(0, 6).map((inclusion, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {inclusion}
                            </Badge>
                          ))}
                          {service.inclusions.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.inclusions.length - 6} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 ml-6">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteClick(service._id!)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      disabled={isDeleting && deletingButtonId === service._id}
                    >
                      {isDeleting && deletingButtonId === service._id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {!loading && (!Array.isArray(services) || services.length === 0) && (
        <div className="text-center py-12">
          <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No services found
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by creating your first pest control service.
          </p>
          <Button
            onClick={() => {
              scrollPositionRef.current = window.scrollY;
              setEditingId(null);
              setFormData({
                serviceName: "",
                serviceType: "",
                shortDescription: "",
                description: "",
                basePrice: "",
                coverageArea: "",
                serviceAreaTypes: [],
                inclusions: "",
                pests: "",
                image: "",
                gallery: [],
                status: "active",
                featured: false,
                seoTitle: "",
                seoDescription: "",
                seoKeywords: "",
              });
              setSelectedFiles({
                mainImage: null,
                galleryImages: [],
              });
              setIsAddModalOpen(true);
            }}
            className="bg-admin-gradient text-white border-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Service
          </Button>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deletingServiceId}
        onOpenChange={() => setDeletingServiceId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              service from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingServiceId && handleDelete(deletingServiceId)}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Service Type Confirmation Dialog */}
      <AlertDialog
        open={!!deletingServiceTypeId}
        onOpenChange={() => setDeletingServiceTypeId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service Type?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service type? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingServiceTypeId && handleDeleteServiceType(deletingServiceTypeId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Area Type Confirmation Dialog */}
      <AlertDialog
        open={!!deletingAreaTypeId}
        onOpenChange={() => setDeletingAreaTypeId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Area Type?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this area type? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingAreaTypeId && handleDeleteAreaType(deletingAreaTypeId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
