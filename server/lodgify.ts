import axios from 'axios';
import { getMockProperties, TransformedProperty } from './lodgify-mock-data';

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
  rates?: { currency: string; default_rate?: number };
  images?: Array<{ id: number; url: string; caption?: string; order: number }>;
  amenities?: Array<{ id: number; name: string; category?: string }>;
  booking_url?: string;
  published?: boolean;
  rooms?: Array<{ id: number; name: string }>;
}

export type { TransformedProperty } from './lodgify-mock-data';

const LODGIFY_API_BASE = 'https://api.lodgify.com';
const LODGIFY_API_VERSION = 'v1';

const lodgifyApi = axios.create({
  baseURL: `${LODGIFY_API_BASE}/${LODGIFY_API_VERSION}`,
  headers: { 'Content-Type': 'application/json' },
});

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
    const response = await lodgifyApi.get('/properties');
    
    if (!response.data || !Array.isArray(response.data)) {
      return getMockProperties();
    }

    const properties: LodgifyProperty[] = response.data;
    if (properties.length === 0) {
      return getMockProperties();
    }

    return await Promise.all(properties.map(transformLodgifyProperty));
  } catch (error: any) {
    return getMockProperties();
  }
}

async function getUKLocationData(lat: number, lng: number) {
  try {
    const response = await axios.get(`https://api.postcodes.io/postcodes?lon=${lng}&lat=${lat}`);
    
    if (response.data?.status === 200 && response.data.result?.length > 0) {
      const location = response.data.result[0];
      const addressParts = [
        location.admin_ward,
        location.admin_district,
        location.admin_county || location.region
      ].filter(Boolean);
      
      return {
        address: addressParts.join(', ') || 'United Kingdom',
        postcode: location.postcode || '',
        area: location.admin_district || location.admin_county || 'United Kingdom'
      };
    }
    
    return { address: 'United Kingdom', postcode: '', area: 'United Kingdom' };
  } catch {
    return { address: 'United Kingdom', postcode: '', area: 'United Kingdom' };
  }
}

async function transformLodgifyProperty(property: LodgifyProperty): Promise<TransformedProperty> {
  let locationData = { address: 'United Kingdom', postcode: '', area: 'United Kingdom' };
  
  if (property.latitude && property.longitude) {
    locationData = await getUKLocationData(property.latitude, property.longitude);
  }

  const images = property.images?.length
    ? property.images.sort((a, b) => a.order - b.order).map(img => img.url).filter(Boolean)
    : [
        'https://l.icdbcdn.com/oh/efaca539-5d98-4159-a45c-9eb9b81a8c98.jpg?w=500',
        'https://l.icdbcdn.com/oh/1e45f617-ea46-449a-a901-fba8ffaf31f6.jpg?w=500',
        'https://l.icdbcdn.com/oh/76a5db80-bc65-490e-9752-699c72a828e4.jpg?w=500'
      ];

  const amenities = property.amenities?.length
    ? property.amenities.map(a => a.name).filter(Boolean)
    : ['Free WiFi', 'Professional Management', 'Fully Furnished', 'Kitchen Facilities', 'Weekly Housekeeping', 'Contactless Check-in', 'Smart TV', 'Premium Bedding'];

  return {
    id: property.id,
    name: property.name,
    location: locationData.address,
    description: property.description || property.headline || `Luxurious serviced accommodation located in ${locationData.area}. This professionally managed property offers modern amenities, premium furnishings, and exceptional service for business and leisure travelers.`,
    bedrooms: property.bedrooms || 3,
    bathrooms: property.bathrooms || 2,
    guests: property.sleeps || 6,
    price_per_night: property.rates?.default_rate || 178,
    currency: property.rates?.currency || 'GBP',
    images,
    amenities,
    booking_url: property.booking_url || 'https://bourarro.lodgify.com/en/overview',
    rating: 4.8,
    reviews_count: 24,
    full_address: locationData.address,
    postcode: locationData.postcode,
    area: locationData.area,
    coordinates: property.latitude && property.longitude ? { lat: property.latitude, lng: property.longitude } : undefined,
  };
}
