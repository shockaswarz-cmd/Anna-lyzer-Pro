import Header from "@/components/Header";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Us | Get a Free Quote | Bourarro Properties"
        description="Contact Bourarro Properties for a free property management quote. Get in touch for guaranteed rent services, property maintenance, or investment opportunities. Phone: 07435549937"
        keywords="contact property management, get quote guaranteed rent, property management contact, landlord services contact, free property quote, contact bourarro properties"
        ogTitle="Contact Bourarro Properties - Get Your Free Quote"
        ogDescription="Get in touch with our property management experts. Request a free quote for guaranteed rent and comprehensive landlord services."
        canonicalUrl="https://bourarroproperties.uk/contact"
        ogUrl="https://bourarroproperties.uk/contact"
      />
      <Header />
      <ContactSection />
      <Footer />
    </div>
  );
}
