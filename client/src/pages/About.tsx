import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Us | Professional Property Management | Bourarro Properties"
        description="Learn about Bourarro Properties - your trusted partner in property management. Professional team delivering guaranteed rent and comprehensive landlord services across the UK."
        keywords="about bourarro properties, property management company, professional landlords, UK property experts, guaranteed rent provider, property investment experts"
        ogTitle="About Bourarro Properties - Professional Property Management"
        ogDescription="Discover how Bourarro Properties delivers exceptional property management services with guaranteed rent and comprehensive landlord support."
        canonicalUrl="https://bourarroproperties.uk/about"
        ogUrl="https://bourarroproperties.uk/about"
      />
      <Header />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
