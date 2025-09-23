import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/luxury_apartment_building_hero_7b1df623.png";

export default function Hero() {
  const handleGetQuote = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional property investment opportunity" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      </div>

      {/* Luxury Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Property Investment Opportunity</span>
            </div>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Guaranteed <span className="text-primary italic">Rental</span> Returns
          </h1>
          
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Professional property investment with guaranteed rental income, zero fees, and comprehensive property management services.
          </p>

          {/* Premium Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="bg-card/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 text-center" data-testid="benefit-commission">
              <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Zero Fees</h3>
              <p className="text-white/80 text-sm">No commission, no hidden costs</p>
            </div>
            <div className="bg-card/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 text-center" data-testid="benefit-lease">
              <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Flexible Terms</h3>
              <p className="text-white/80 text-sm">3-5 year guaranteed lease options</p>
            </div>
            <div className="bg-card/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 text-center" data-testid="benefit-management">
              <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-3"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Management</h3>
              <p className="text-white/80 text-sm">Complete property management</p>
            </div>
          </div>

          {/* Luxury CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="px-12 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
              data-testid="button-hero-quote"
            >
              Request Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleLearnMore}
              className="px-12 py-4 text-lg font-semibold bg-white/5 border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-lg rounded-full transition-all duration-300 hover:scale-105"
              data-testid="button-hero-learn"
            >
              Discover More
            </Button>
          </div>
          
          {/* Trust Indicator */}
          <div className="mt-16 text-center">
            <p className="text-white/60 text-sm font-light mb-3">Trusted by high-net-worth investors across the UK</p>
            <div className="flex justify-center items-center gap-8 text-white/40">
              <div className="text-xs">£150k+ Avg Monthly Revenue Managed</div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="text-xs">75+ Properties</div>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="text-xs">99.8% Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Luxury Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-light tracking-widest uppercase">Scroll to Explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}