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
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern luxury property" 
          className="w-full h-full object-cover scale-110 animate-pulse"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-1/3 right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
              Guaranteed Rent,
            </span>{" "}
            <span className="bg-gradient-to-r from-chart-2 to-accent bg-clip-text text-transparent font-extrabold">
              Zero Hassle
            </span>,{" "}
            <span className="text-white">Every Month</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional property management with market value rent, 0% commission, 
            and flexible 3-5 year leases. Your property, fully managed.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20" data-testid="benefit-commission">
              <div className="w-3 h-3 bg-gradient-to-r from-chart-2 to-accent rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-white">0% Commission</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20" data-testid="benefit-lease">
              <div className="w-3 h-3 bg-gradient-to-r from-chart-2 to-accent rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-white">3-5 Year Flexible Lease</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20" data-testid="benefit-management">
              <div className="w-3 h-3 bg-gradient-to-r from-chart-2 to-accent rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-white">Full Property Management</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="text-lg px-10 py-7 h-auto bg-gradient-to-r from-primary to-chart-1 hover:from-primary/90 hover:to-chart-1/90 text-white font-semibold shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 border-0"
              data-testid="button-hero-quote"
            >
              Get Your Guaranteed Rent Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleLearnMore}
              className="text-lg px-10 py-7 h-auto bg-white/15 border-2 border-white/40 text-white hover:bg-white/25 backdrop-blur-md font-semibold transition-all duration-300 transform hover:scale-105"
              data-testid="button-hero-learn"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}