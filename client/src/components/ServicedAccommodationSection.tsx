import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bed, Wifi, Car, Star, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Property {
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

export default function ServicedAccommodationSection() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");

  // Fetch properties from Lodgify API
  const { data: properties = [], isLoading, error } = useQuery<Property[]>({
    queryKey: ['/api/lodgify/properties'],
    enabled: true,
  });

  // Filter properties based on selected filters
  const filteredProperties = (properties as Property[]).filter((property: Property) => {
    const locationMatch = selectedLocation === "all" || property.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const priceMatch = selectedPriceRange === "all" || 
      (selectedPriceRange === "budget" && property.price_per_night <= 150) ||
      (selectedPriceRange === "mid" && property.price_per_night > 150 && property.price_per_night <= 300) ||
      (selectedPriceRange === "luxury" && property.price_per_night > 300);
    
    const sizeMatch = selectedSize === "all" || 
      (selectedSize === "studio" && property.bedrooms <= 1) ||
      (selectedSize === "apartment" && property.bedrooms >= 2 && property.bedrooms <= 3) ||
      (selectedSize === "house" && property.bedrooms >= 4);
    
    return locationMatch && priceMatch && sizeMatch;
  });

  // Get unique locations for filter
  const locations = Array.from(new Set((properties as Property[]).map((p: Property) => p.location)));

  return (
    <section id="accommodations" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
            Book Your Stay in Our Serviced Properties
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover Bourarro's premium serviced apartments, updated live from our booking platform. 
            Each property is professionally managed and ready to welcome you with luxury amenities and exceptional service.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <div className="min-w-[200px]">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger data-testid="select-location">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location: string) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[200px]">
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger data-testid="select-price">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="budget">Budget (£0-150)</SelectItem>
                <SelectItem value="mid">Mid-Range (£151-300)</SelectItem>
                <SelectItem value="luxury">Luxury (£301+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-[200px]">
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger data-testid="select-size">
                <SelectValue placeholder="Filter by Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="studio">Studio/1 Bed</SelectItem>
                <SelectItem value="apartment">2-3 Bedrooms</SelectItem>
                <SelectItem value="house">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground mt-4">Loading properties...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Unable to load properties at the moment. Please try again later.</p>
          </div>
        )}

        {/* Properties Grid */}
        {!isLoading && !error && filteredProperties.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property: Property) => (
              <Card key={property.id} className="group overflow-hidden hover-elevate transition-all duration-300" data-testid={`property-card-${property.id}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={property.images[0] || '/api/placeholder/400/250'} 
                    alt={property.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/80 text-white">
                      £{property.price_per_night}/night
                    </Badge>
                  </div>
                  {property.rating && (
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/80 rounded-full px-2 py-1">
                      <Star className="w-4 h-4 text-primary fill-current" />
                      <span className="text-white text-sm font-medium">{property.rating}</span>
                      {property.reviews_count && (
                        <span className="text-white/80 text-sm">({property.reviews_count})</span>
                      )}
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold font-serif text-foreground mb-2" data-testid={`property-name-${property.id}`}>
                      {property.name}
                    </h3>
                    <div className="flex items-center text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {property.description}
                    </p>
                  </div>

                  {/* Property Features */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Bed className="w-4 h-4 mr-1" />
                      <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <span>👥 {property.guests} guests</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities?.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Book Button */}
                  <Button 
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    data-testid={`button-book-${property.id}`}
                  >
                    <a 
                      href={property.booking_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      View & Book
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Properties Found */}
        {!isLoading && !error && filteredProperties.length === 0 && (properties as Property[]).length > 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties match your current filters. Try adjusting your selection.</p>
          </div>
        )}

        {/* No Properties Available */}
        {!isLoading && !error && (properties as Property[]).length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties are currently available. Check back soon for new listings!</p>
          </div>
        )}
      </div>
    </section>
  );
}