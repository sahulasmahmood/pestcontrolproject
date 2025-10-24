import { useState, useEffect } from 'react';

interface Service {
  _id: string;
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
  status: string;
}

interface UseServicesReturn {
  services: Service[];
  serviceNames: string[];
  serviceTypes: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/services?limit=100');
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setServices(result.data || []);
      } else {
        throw new Error(result.message || 'Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Extract service names for dropdowns
  const serviceNames = services.map(service => service.serviceName);
  
  // Extract unique service types
  const serviceTypes = [...new Set(services.map(service => service.serviceType))];

  return {
    services,
    serviceNames,
    serviceTypes,
    loading,
    error,
    refetch: fetchServices,
  };
}