import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NextSectionButton from "@/components/NextSectionButton";

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Property Management Services UK | Guaranteed Rent | Bourarro Properties"
        description="Professional property management services including guaranteed rent, maintenance, tenant sourcing, and legal compliance. Get 3-5 years guaranteed rent at market value with 0% commission."
        keywords="property management services, guaranteed rent scheme, property maintenance UK, tenant sourcing, landlord services, property compliance, rental guarantee, property management London"
        ogTitle="Property Management Services - Bourarro Properties"
        ogDescription="Comprehensive property management services with guaranteed rent, professional maintenance, and full landlord support across the UK."
        canonicalUrl="https://bourarroproperties.uk/services"
        ogUrl="https://bourarroproperties.uk/services"
      />
      <Header />
      <ServicesSection />
      <NextSectionButton href="/properties" label="View Our Properties" />
      <Footer />
    </div>
  );
}
