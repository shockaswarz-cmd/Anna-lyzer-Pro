import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import ServicedAccommodationSection from "@/components/ServicedAccommodationSection";
import AboutSection from "@/components/AboutSection";
import InvestorDealsSection from "@/components/InvestorDealsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bourarroproperties.co.uk/#business",
    "name": "Bourarro Properties",
    "alternateName": "Bourarro Properties Ltd",
    "description": "Professional property management company offering guaranteed rent services, property maintenance, and comprehensive landlord solutions across the UK.",
    "url": "https://bourarroproperties.co.uk",
    "logo": "https://bourarroproperties.co.uk/logo.png",
    "image": "https://bourarroproperties.co.uk/og-image.jpg",
    "telephone": "07435549937",
    "email": "Info@Bourarroproperties.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 4536, 182-184 High Street North",
      "addressLocality": "London",
      "addressRegion": "England",
      "postalCode": "E6 2JA",
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.5329",
      "longitude": "0.0506"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "serviceType": "Property Management",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Management Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guaranteed Rent Service",
            "description": "3-5 year guaranteed rent at market value with 0% commission"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Property Management",
            "description": "Complete property management including tenant sourcing, maintenance, and compliance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Maintenance Services",
            "description": "Professional property maintenance and repair services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Legal Compliance",
            "description": "Ensuring properties meet all legal requirements and safety standards"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/bourarro-properties/",
      "https://www.instagram.com/Bourarropropertiesltd/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Guaranteed Rent Scheme UK | Property Management | Bourarro Properties"
        description="Get guaranteed rent at market value for 3-5 years with 0% commission. Professional UK property management and maintenance. Free quote available."
        keywords="guaranteed rent UK, property management London, landlord services, rental guarantee, property investment, serviced accommodation, property maintenance, tenant sourcing, property compliance, rental income guarantee"
        ogTitle="Bourarro Properties - Guaranteed Rent & Zero Hassle Property Management"
        ogDescription="Professional property management with guaranteed rent services. Get market value rent with 0% commission and full management for 3-5 years. Free quote available."
        ogUrl="https://bourarroproperties.co.uk"
        structuredData={businessStructuredData}
        canonicalUrl="https://bourarroproperties.co.uk"
      />
      <Header />
      <Hero />
      <ServicesSection />
      <ServicedAccommodationSection />
      <AboutSection />
      <InvestorDealsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}