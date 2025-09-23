// Lodgify API integration for fetching property data
import axios from 'axios';

interface LodgifyProperty {
  id: number;
  name: string;
  headline?: string;
  description: string;
  location: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  rates?: {
    currency: string;
    default_rate?: number;
  };
  images: Array<{
    id: number;
    url: string;
    caption?: string;
    order: number;
  }>;
  amenities: Array<{
    id: number;
    name: string;
    category?: string;
  }>;
  booking_url?: string;
  published: boolean;
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
    const response = await lodgifyApi.get('/properties');
    
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format from Lodgify API:', response.data);
      return getMockProperties();
    }

    const properties: LodgifyProperty[] = response.data;
    console.log(`Fetched ${properties.length} properties from Lodgify`);

    // Transform Lodgify properties to our format
    const transformedProperties = properties
      .filter(property => property.published) // Only include published properties
      .map(transformLodgifyProperty);

    return transformedProperties;
  } catch (error) {
    console.error('Error fetching properties from Lodgify:', error);
    
    // Provide fallback mock data if API fails
    console.log('Falling back to mock property data');
    return getMockProperties();
  }
}

function transformLodgifyProperty(property: LodgifyProperty): TransformedProperty {
  // Build location string
  const locationParts = [
    property.location.city,
    property.location.state,
    property.location.country
  ].filter(Boolean);
  const location = locationParts.join(', ') || 'United Kingdom';

  // Get image URLs
  const images = property.images
    .sort((a, b) => a.order - b.order)
    .map(img => img.url)
    .filter(Boolean);

  // Get amenity names
  const amenities = property.amenities
    .map(amenity => amenity.name)
    .filter(Boolean);

  // Default price handling
  const price = property.rates?.default_rate || 150;
  const currency = property.rates?.currency || 'GBP';

  // Generate booking URL if not provided
  const bookingUrl = property.booking_url || 
    `https://bourarro.lodgify.com/en/properties/${property.id}`;

  return {
    id: property.id,
    name: property.name,
    location,
    description: property.description || property.headline || '',
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    guests: property.sleeps,
    price_per_night: price,
    currency,
    images: images.length > 0 ? images : ['/api/placeholder/400/250'],
    amenities,
    booking_url: bookingUrl,
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