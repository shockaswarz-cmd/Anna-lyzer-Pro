export interface TransformedProperty {
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
  full_address?: string;
  postcode?: string;
  area?: string;
  coordinates?: { lat: number; lng: number };
}

export function getMockProperties(): TransformedProperty[] {
  return [
    {
      id: 1,
      name: "The Barack Nest",
      location: "Chafford Hundred, Grays, Essex",
      description: "Luxurious 3-bedroom serviced apartment located in the prestigious Chafford Hundred area of Grays, Essex. This professionally managed property offers stunning views, premium furnishings, and exceptional amenities for discerning business and leisure travelers.",
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      price_per_night: 178,
      currency: "GBP",
      images: [
        "https://l.icdbcdn.com/oh/efaca539-5d98-4159-a45c-9eb9b81a8c98.jpg?w=500",
        "https://l.icdbcdn.com/oh/1e45f617-ea46-449a-a901-fba8ffaf31f6.jpg?w=500",
        "https://l.icdbcdn.com/oh/76a5db80-bc65-490e-9752-699c72a828e4.jpg?w=500"
      ],
      amenities: ["Free WiFi", "Fully Furnished", "Weekly Housekeeping", "Kitchen Facilities", "Contactless Check-in", "Smart TV", "Premium Bedding", "Professional Management"],
      booking_url: "https://bourarro.lodgify.com/en/overview",
      rating: 4.8,
      reviews_count: 24,
      full_address: "Chafford Hundred, Grays, Essex",
      postcode: "RM16",
      area: "Thurrock",
      coordinates: { lat: 51.8849441464547, lng: 0.91458262472194 }
    },
    {
      id: 2,
      name: "Executive City Suite",
      location: "Manchester City Centre, Greater Manchester",
      description: "Modern 2-bedroom executive suite located in the heart of Manchester's vibrant city centre. Perfect for business travelers with premium amenities, high-speed internet, and easy access to transport links.",
      bedrooms: 2,
      bathrooms: 1,
      guests: 4,
      price_per_night: 125,
      currency: "GBP",
      images: ["https://l.icdbcdn.com/oh/76a5db80-bc65-490e-9752-699c72a828e4.jpg?w=500"],
      amenities: ["Free WiFi", "Business Center", "Gym Access", "24/7 Concierge", "Fully Furnished", "Kitchen Facilities", "Contactless Check-in"],
      booking_url: "https://bourarro.lodgify.com/en/properties/2",
      rating: 4.6,
      reviews_count: 18,
      full_address: "Manchester City Centre, Greater Manchester",
      postcode: "M1",
      area: "Manchester",
      coordinates: { lat: 53.4808, lng: -2.2426 }
    },
    {
      id: 3,
      name: "Riverside Penthouse",
      location: "Birmingham City Centre, West Midlands",
      description: "Stunning penthouse with panoramic river views and luxury finishes throughout. Located in Birmingham's prestigious city centre with easy access to business districts and cultural attractions.",
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      price_per_night: 285,
      currency: "GBP",
      images: ["https://l.icdbcdn.com/oh/dfb6c701-d604-4a0e-aed1-f3facb520638.jpg?w=500"],
      amenities: ["River View", "Private Balcony", "Premium Kitchen", "Free WiFi", "Parking", "Fully Furnished", "Weekly Housekeeping", "Smart TV"],
      booking_url: "https://bourarro.lodgify.com/en/properties/3",
      rating: 4.9,
      reviews_count: 31,
      full_address: "Birmingham City Centre, West Midlands",
      postcode: "B1",
      area: "Birmingham",
      coordinates: { lat: 52.4862, lng: -1.8904 }
    }
  ];
}
