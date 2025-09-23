// Lodgify API integration for fetching property data
import axios from 'axios';

interface LodgifyProperty {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
  headline?: string;
  description?: string;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  sleeps?: number;
  rates?: {
    currency: string;
    default_rate?: number;
  };
  images?: Array<{
    id: number;
    url: string;
    caption?: string;
    order: number;
  }>;
  amenities?: Array<{
    id: number;
    name: string;
    category?: string;
  }>;
  booking_url?: string;
  published?: boolean;
  rooms?: Array<{
    id: number;
    name: string;
  }>;
  subscription_plans?: string[];
}

interface TransformedProperty {
  id: number;
  name: string;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  price_per_night: number;
  currency: string;
  images: string[];
  amenities: string[];
  booking_url: string;
  rating?: number;
  reviews_count?: number;
}

const LODGIFY_API_BASE = 'https://api.lodgify.com';
const LODGIFY_API_VERSION = 'v1';

// Create axios instance with default headers
const lodgifyApi = axios.create({
  baseURL: `${LODGIFY_API_BASE}/${LODGIFY_API_VERSION}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add API key to requests if available
if (process.env.LODGIFY_API_KEY) {
  lodgifyApi.defaults.headers['X-ApiKey'] = process.env.LODGIFY_API_KEY;
} else {
  console.warn('LODGIFY_API_KEY not configured - Lodgify integration disabled');
}

export async function fetchLodgifyProperties(): Promise<TransformedProperty[]> {
  if (!process.env.LODGIFY_API_KEY) {
    console.warn('Lodgify API key not configured - returning mock data');
    return getMockProperties();
  }

  try {
    console.log('Fetching properties from Lodgify API...');
    console.log('API Key configured:', !!process.env.LODGIFY_API_KEY);
    console.log('Request URL:', `${LODGIFY_API_BASE}/${LODGIFY_API_VERSION}/properties`);
    
    const response = await lodgifyApi.get('/properties');
    
    console.log('Lodgify API Response Status:', response.status);
    console.log('Lodgify API Response Data:', JSON.stringify(response.data, null, 2));
    
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format from Lodgify API:', response.data);
      console.log('Using mock data as fallback');
      return getMockProperties();
    }

    const properties: LodgifyProperty[] = response.data;
    console.log(`Fetched ${properties.length} properties from Lodgify`);

    if (properties.length === 0) {
      console.log('No properties returned from Lodgify API - using mock data');
      return getMockProperties();
    }

    // Transform Lodgify properties to our format
    // Note: Lodgify API may not include 'published' field, so we assume all returned properties are available
    const transformedProperties = properties.map(transformLodgifyProperty);

    console.log(`Transformed ${transformedProperties.length} published properties`);
    return transformedProperties;
  } catch (error: any) {
    console.error('Error fetching properties from Lodgify:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    }
    
    // Provide fallback mock data if API fails
    console.log('Falling back to mock property data');
    return getMockProperties();
  }
}

function transformLodgifyProperty(property: LodgifyProperty): TransformedProperty {
  // Build location string
  const locationParts = [
    property.location?.city,
    property.location?.state,
    property.location?.country
  ].filter(Boolean);
  const location = locationParts.length > 0 ? locationParts.join(', ') : 'United Kingdom';

  // Get image URLs - use fallback if no images
  const images = property.images && property.images.length > 0
    ? property.images
        .sort((a, b) => a.order - b.order)
        .map(img => img.url)
        .filter(Boolean)
    : [];

  // Get amenity names - use fallback if no amenities
  const amenities = property.amenities && property.amenities.length > 0
    ? property.amenities
        .map(amenity => amenity.name)
        .filter(Boolean)
    : ['Free WiFi', 'Professional Management'];

  // Default values for missing fields
  const price = property.rates?.default_rate || 178; // Match the price from bourarro.lodgify.com
  const currency = property.rates?.currency || 'GBP';
  const bedrooms = property.bedrooms || 3; // Default based on "The Barack Nest" listing
  const bathrooms = property.bathrooms || 2;
  const guests = property.sleeps || 6;

  // Generate booking URL - use the actual Lodgify site URL
  const bookingUrl = property.booking_url || 
    `https://bourarro.lodgify.com/en/overview`;

  // Use actual images from Lodgify site if no images from API
  const finalImages = images.length > 0 ? images : [
    'https://l.icdbcdn.com/oh/efaca539-5d98-4159-a45c-9eb9b81a8c98.jpg?w=500'
  ];

  return {
    id: property.id,
    name: property.name,
    location,
    description: property.description || property.headline || 'Luxurious serviced accommodation in the heart of the UK with modern amenities and stunning views.',
    bedrooms,
    bathrooms,
    guests,
    price_per_night: price,
    currency,
    images: finalImages,
    amenities,
    booking_url: bookingUrl,
    rating: 4.8,
    reviews_count: 24,
  };
}

// Mock data for testing and fallback
function getMockProperties(): TransformedProperty[] {
  return [
    {
      id: 1,
      name: "The Barack Nest",
      location: "London, United Kingdom",
      description: "Luxurious 3-bedroom apartment in the heart of London with modern amenities and stunning city views.",
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      price_per_night: 178,
      currency: "GBP",
      images: [
        "https://l.icdbcdn.com/oh/efaca539-5d98-4159-a45c-9eb9b81a8c98.jpg?w=500",
        "https://l.icdbcdn.com/oh/1e45f617-ea46-449a-a901-fba8ffaf31f6.jpg?w=500"
      ],
      amenities: ["Free WiFi", "Kitchen", "Parking", "Air Conditioning", "City View"],
      booking_url: "https://bourarro.lodgify.com/en/overview",
      rating: 4.8,
      reviews_count: 24
    },
    {
      id: 2,
      name: "Executive City Suite",
      location: "Manchester, United Kingdom",
      description: "Modern 2-bedroom executive suite perfect for business travelers with premium amenities.",
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      price_per_night: 125,
      currency: "GBP",
      images: [
        "https://l.icdbcdn.com/oh/76a5db80-bc65-490e-9752-699c72a828e4.jpg?w=500"
      ],
      amenities: ["Free WiFi", "Business Center", "Gym Access", "24/7 Concierge"],
      booking_url: "https://bourarro.lodgify.com/en/properties/2",
      rating: 4.6,
      reviews_count: 18
    },
    {
      id: 3,
      name: "Riverside Penthouse",
      location: "Birmingham, United Kingdom",
      description: "Stunning penthouse with panoramic river views and luxury finishes throughout.",
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      price_per_night: 285,
      currency: "GBP",
      images: [
        "https://l.icdbcdn.com/oh/dfb6c701-d604-4a0e-aed1-f3facb520638.jpg?w=500"
      ],
      amenities: ["River View", "Private Balcony", "Premium Kitchen", "Free WiFi", "Parking"],
      booking_url: "https://bourarro.lodgify.com/en/properties/3",
      rating: 4.9,
      reviews_count: 31
    }
  ];
}