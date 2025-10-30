import Header from "@/components/Header";
import InvestorDealsSection from "@/components/InvestorDealsSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Investors() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Investment Deal Sourcing | Property Investment UK | Bourarro Properties"
        description="Professional property investment deal sourcing across the UK. Access off-market opportunities, comprehensive due diligence, and expert investment analysis for BTL, BRR, HMO, and serviced accommodation."
        keywords="property investment UK, deal sourcing, off-market properties, BTL investment, buy-to-let deals, property sourcing service, investment opportunities, HMO investments, property investors"
        ogTitle="Investment Deal Sourcing - Bourarro Properties"
        ogDescription="Source high-yield property investment opportunities with expert analysis, off-market access, and end-to-end support across the UK."
        canonicalUrl="https://bourarroproperties.uk/investors"
        ogUrl="https://bourarroproperties.uk/investors"
      />
      <Header />
      <InvestorDealsSection />
      <Footer />
    </div>
  );
}
