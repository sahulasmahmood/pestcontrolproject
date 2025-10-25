// Service data utilities

export interface ServiceData {
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
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Fetch services from API
export async function fetchServices(options: {
  limit?: number;
  page?: number;
  serviceType?: string;
  featured?: boolean;
} = {}) {
  try {
    const { limit = 50, page = 1, serviceType, featured } = options;
    
    // Check if we're in a server environment and can access the database directly
    if (typeof window === 'undefined') {
      try {
        const connectDB = (await import("@/config/models/connectDB")).default;
        const Service = (await import("@/config/utils/admin/services/serviceSchema")).default;
        
        await connectDB();

        // Build query for active services only
        const query: any = { 
          status: "active", 
          isDeleted: false 
        };
        
        if (serviceType) query.serviceType = serviceType;
        if (featured !== undefined) query.featured = featured === true;

        const skip = (page - 1) * limit;

        // Get services and total count
        const [services, totalServices] = await Promise.all([
          Service.find(query)
            .select('-isDeleted -__v') // Exclude internal fields
            .sort({ featured: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
          Service.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalServices / limit);

        return {
          services: JSON.parse(JSON.stringify(services)),
          pagination: {
            currentPage: page,
            totalPages,
            totalServices,
            limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
          },
        };
      } catch (dbError) {
        console.error('Database fetch failed, falling back to API:', dbError);
      }
    }
    
    // Fallback to API call for client-side or if database fails
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
    });
    
    if (serviceType) params.append('serviceType', serviceType);
    if (featured !== undefined) params.append('featured', featured.toString());
    
    const response = await fetch(`${baseUrl}/api/services?${params}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch services:', response.status, response.statusText);
      return { services: [], pagination: null };
    }
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('API returned error:', result.message);
      return { services: [], pagination: null };
    }
    
    return {
      services: result.data || [],
      pagination: result.pagination || null,
    };
  } catch (error) {
    console.error('Error fetching services:', error);
    return { services: [], pagination: null };
  }
}

// Fetch single service by slug
export async function fetchServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    // Check if we're in a server environment and can access the database directly
    if (typeof window === 'undefined') {
      try {
        const connectDB = (await import("@/config/models/connectDB")).default;
        const Service = (await import("@/config/utils/admin/services/serviceSchema")).default;
        
        await connectDB();
        
        // Find service by slug directly from database
        const service = await Service.findOne({ 
          slug, 
          status: "active", 
          isDeleted: false 
        })
        .select('-isDeleted -__v')
        .lean();

        if (!service) {
          return null;
        }

        // Convert MongoDB ObjectId to string for serialization
        return JSON.parse(JSON.stringify(service));
      } catch (dbError) {
        console.error('Database fetch failed, falling back to API:', dbError);
      }
    }
    
    // Fallback to API call for client-side or if database fails
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/services/${slug}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch service:', response.status, response.statusText);
      return null;
    }
    
    const result = await response.json();
    
    if (!result.success) {
      console.error('API returned error:', result.message);
      return null;
    }
    
    return result.data || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Generate service metadata
export function generateServiceMetadata(service: ServiceData) {
  const title = service.seoTitle || `${service.serviceName} - Perfect Pest Control`;
  const description = service.seoDescription || 
    `${service.shortDescription || service.description} ${service.basePrice ? `Starting from ₹${service.basePrice}` : ''}. Professional pest control service.`;
  const keywords = service.seoKeywords || 
    `${service.serviceName}, ${service.serviceType}, pest control, ${service.pests?.join(', ') || ''}, Perfect Pest Control`;

  return {
    title,
    description,
    keywords,
  };
}

// Format price display
export function formatPrice(basePrice?: string): string {
  if (basePrice) {
    return `From ₹${basePrice}`;
  }
  return 'Contact for pricing';
}

// Get service type icon and color
export function getServiceTypeStyle(type: string) {
  const styles = {
    'Sanitization': { color: 'from-blue-500 to-cyan-600', icon: 'ShieldCheck' },
    'Specialized': { color: 'from-emerald-500 to-green-600', icon: 'Target' },
    'Rodent Control': { color: 'from-red-500 to-orange-600', icon: 'AlertTriangle' },
    'General Pest': { color: 'from-purple-500 to-indigo-600', icon: 'Bug' },
    'Vector Control': { color: 'from-teal-500 to-green-600', icon: 'Zap' },
  };
  
  return styles[type as keyof typeof styles] || { color: 'from-gray-500 to-slate-600', icon: 'Shield' };
}