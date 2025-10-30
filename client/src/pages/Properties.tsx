import Header from "@/components/Header";
import ServicedAccommodationSection from "@/components/ServicedAccommodationSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Properties() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Property Portfolio | Serviced Accommodation | Bourarro Properties"
        description="Browse our exclusive portfolio of premium serviced accommodation and investment properties across the UK. High-quality properties with guaranteed returns."
        keywords="property portfolio, serviced accommodation UK, investment properties, holiday rentals, property listings, premium accommodation, UK properties"
        ogTitle="Property Portfolio - Bourarro Properties"
        ogDescription="Explore our curated collection of premium serviced accommodation and investment properties across prime UK locations."
        canonicalUrl="https://bourarroproperties.uk/properties"
        ogUrl="https://bourarroproperties.uk/properties"
      />
      <Header />
      <ServicedAccommodationSection />
      <Footer />
    </div>
  );
}
