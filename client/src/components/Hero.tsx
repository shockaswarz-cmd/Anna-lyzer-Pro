import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import propertyImage1 from "@assets/stock_images/luxury_modern_apartm_c41eb706.jpg";
import propertyImage2 from "@assets/stock_images/luxury_modern_apartm_88414ea8.jpg";
import propertyImage3 from "@assets/stock_images/luxury_modern_apartm_996c69ef.jpg";
import propertyImage4 from "@assets/stock_images/luxury_modern_apartm_0479402f.jpg";
import propertyImage5 from "@assets/stock_images/luxury_modern_apartm_5c08da58.jpg";
import interiorImage1 from "@assets/stock_images/luxury_apartment_int_82b3a767.jpg";
import interiorImage2 from "@assets/stock_images/luxury_apartment_int_f5bca62b.jpg";
import interiorImage3 from "@assets/stock_images/luxury_apartment_int_a341d7fc.jpg";
import interiorImage4 from "@assets/stock_images/luxury_apartment_int_79ab8c9f.jpg";
import interiorImage5 from "@assets/stock_images/luxury_apartment_int_bb87c447.jpg";

const propertyImages = [
  propertyImage1,
  interiorImage1,
  propertyImage2,
  interiorImage2,
  propertyImage3,
  interiorImage3,
  propertyImage4,
  interiorImage4,
  propertyImage5,
  interiorImage5,
];

export default function Hero() {
  const [, setLocation] = useLocation();
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const handleGetQuote = () => {
    setLocation('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="embla overflow-hidden h-full" ref={emblaRef}>
          <div className="embla__container flex h-full">
            {propertyImages.map((image, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 relative">
                <img 
                  src={image} 
                  alt={`Luxury property investment ${index + 1}`} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      </div>

      {/* Luxury Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Property Investment Opportunity</span>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
            Guaranteed <span className="text-primary italic">Rental</span> Returns
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Professional property investment with guaranteed rental income, zero fees, and comprehensive property management services.
          </p>

          {/* Premium Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="bg-card/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 text-center" data-testid="benefit-commission">
              <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
              <h3 className="text-lg font-semibold text-white mb-1">Zero Fees</h3>
              <p className="text-white/80 text-sm">No commission, no hidden costs</p>
            </div>
            <div className="bg-card/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 text-center" data-testid="benefit-lease">
              <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
              <h3 className="text-lg font-semibold text-white mb-1">Flexible Terms</h3>
              <p className="text-white/80 text-sm">3-5 year guaranteed lease options</p>
            </div>
            <div className="bg-card/20 backdrop-blur-sm border border-primary/30 rounded-2xl p-4 text-center" data-testid="benefit-management">
              <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
              <h3 className="text-lg font-semibold text-white mb-1">Comprehensive Management</h3>
              <p className="text-white/80 text-sm">Complete property management</p>
            </div>
          </div>

          {/* Luxury CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="px-10 py-3 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
              data-testid="button-hero-quote"
            >
              Request Quote
            </Button>
          </div>
          
          {/* Trust Indicator */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center items-center gap-4 text-white/40">
              <div className="text-xs">£150k+ Avg Monthly Revenue Managed</div>
              <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block"></div>
              <div className="text-xs">75+ Properties</div>
              <div className="w-1 h-1 bg-white/40 rounded-full hidden sm:block"></div>
              <div className="text-xs">99.8% Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}