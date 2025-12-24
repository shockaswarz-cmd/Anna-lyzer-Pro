import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NextSectionButton from "@/components/NextSectionButton";

export default function Home() {
  const businessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bourarroproperties.uk/#business",
    "name": "Bourarro Properties",
    "alternateName": "Bourarro Properties Ltd",
    "description": "Luxury property investment specialists offering guaranteed rental returns for high-net-worth investors. Professional property management with 3-5 year guaranteed income, zero commission, and comprehensive service across the UK.",
    "url": "https://bourarroproperties.uk",
    "logo": "https://bourarroproperties.uk/logo.png",
    "image": "https://bourarroproperties.uk/og-image.jpg",
    "telephone": "07435549937",
    "email": "Info@Bourarroproperties.uk",
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
    <div className="bg-background">
      <SEOHead
        title="Luxury Property Investment | Guaranteed Rental Returns | Bourarro Properties"
        description="Luxury property investment with guaranteed rental income for 3-5 years. Zero commission, comprehensive management for high-net-worth investors in London."
        keywords="luxury property investment UK, guaranteed rental returns, high net worth property investment, premium property management London, guaranteed rental income, zero commission property investment, luxury real estate investment, property investment guaranteed returns, exclusive property opportunities, luxury landlord services"
        ogTitle="Bourarro Properties - Luxury Property Investment with Guaranteed Returns"
        ogDescription="Exclusive property investment for discerning investors. Guaranteed rental income, zero fees, and premium property management across London's luxury real estate market."
        ogUrl="https://bourarroproperties.uk"
        structuredData={businessStructuredData}
        canonicalUrl="https://bourarroproperties.uk"
      />
      <div className="relative">
        <Header />
        <Hero />
      </div>
      <NextSectionButton href="/services" label="Explore Our Services" />
      <Footer />
    </div>
  );
}