import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Clock, TrendingUp, Phone, CheckCircle } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_property_investment_hero.png";

export default function Hero() {
  const [, setLocation] = useLocation();

  const handleGetQuote = () => {
    setLocation('/contact');
  };

  const handleCallNow = () => {
    window.location.href = 'tel:07435549937';
  };

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury property investment" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-0">
        <div className="max-w-4xl">
          <div className="mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">Trusted by 100+ Landlords</span>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Get <span className="text-primary">Guaranteed Rent</span><br className="hidden sm:block" />
            <span className="text-white/90">Every Month</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            Stop chasing tenants. We pay your rent on time, every time, for <span className="text-primary font-semibold">3-5 years</span> guaranteed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 md:mb-8 max-w-2xl">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm sm:text-base">Zero Fees</div>
                <div className="text-white/70 text-xs sm:text-sm">No hidden costs</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm sm:text-base">24hr Quote</div>
                <div className="text-white/70 text-xs sm:text-sm">Fast response</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-sm sm:text-base">85% Market</div>
                <div className="text-white/70 text-xs sm:text-sm">Rent guaranteed</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-primary/30"
              data-testid="button-hero-quote"
            >
              Get Your Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleCallNow}
              className="px-6 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/40 hover:border-white/60 rounded-full transition-all duration-300"
              data-testid="button-hero-call"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base">No upfront costs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base">Full property care</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-sm sm:text-base">UK-wide coverage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-white/50 text-xs sm:text-sm">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">£150k+</div>
              <div>Monthly Revenue</div>
            </div>
            <div className="hidden sm:block w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">75+</div>
              <div>Properties</div>
            </div>
            <div className="hidden sm:block w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">99.8%</div>
              <div>Satisfaction</div>
            </div>
            <div className="hidden sm:block w-px bg-white/20 h-10"></div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-white">5+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
