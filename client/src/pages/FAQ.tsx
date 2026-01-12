import Header from "@/components/Header";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import NextSectionButton from "@/components/NextSectionButton";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Frequently Asked Questions | Property Management FAQs | Bourarro Properties"
        description="Find answers to common questions about our guaranteed rent scheme, property management services, maintenance, and landlord solutions. Get the information you need about our services."
        keywords="property management FAQ, guaranteed rent questions, landlord FAQs, property management answers, rental guarantee questions, property services FAQ"
        ogTitle="Frequently Asked Questions - Bourarro Properties"
        ogDescription="Get answers to all your questions about guaranteed rent, property management, and our comprehensive landlord services."
        canonicalUrl="https://bourarroproperties.uk/faq"
        ogUrl="https://bourarroproperties.uk/faq"
      />
      <Header />
      <FAQSection />
      <NextSectionButton href="/contact" label="Get Your Free Quote" />
      <Footer />
    </div>
  );
}
