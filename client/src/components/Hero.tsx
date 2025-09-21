import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/luxury_apartment_building_hero_7b1df623.png";

export default function Hero() {
  const handleGetQuote = () => {
    console.log('Get Quote button clicked from hero');
  };

  const handleLearnMore = () => {
    console.log('Learn More button clicked from hero');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern luxury property" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Guaranteed Rent, Zero Hassle
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Market value rent, 0% commission, and full property management for 3-5 years.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-white/90">
            <div className="flex items-center gap-2" data-testid="benefit-commission">
              <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
              <span className="text-lg font-medium">0% Commission</span>
            </div>
            <div className="flex items-center gap-2" data-testid="benefit-lease">
              <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
              <span className="text-lg font-medium">3-5 Year Flexible Lease</span>
            </div>
            <div className="flex items-center gap-2" data-testid="benefit-management">
              <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
              <span className="text-lg font-medium">Full Property Management</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="px-8 py-3"
              data-testid="button-hero-quote"
            >
              Get Your Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleLearnMore}
              className="px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              data-testid="button-hero-learn"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}