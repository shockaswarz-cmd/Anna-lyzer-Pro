import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Clock, TrendingUp, Phone, CheckCircle } from "lucide-react";
import heroImage from "@assets/generated_images/luxury_property_investment_hero.png";
import { contactInfo } from "@/lib/navigation";

export default function Hero() {
  const [, setLocation] = useLocation();

  const handleGetQuote = () => setLocation('/contact');
  const handleCallNow = () => window.location.href = `tel:${contactInfo.phoneTel}`;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Luxury property investment" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20 pb-24 sm:py-12 md:py-0">
        <div className="max-w-4xl">
          <div className="mb-3 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-primary/20 border border-primary/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-primary font-semibold text-[10px] sm:text-sm tracking-wide uppercase">Trusted by 100+ Landlords</span>
            </div>
          </div>
          
          <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-6 leading-[1.15] sm:leading-tight">
            Get <span className="text-primary">Guaranteed Rent</span><br />
            <span className="text-white/90">Every Month</span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 sm:mb-8 max-w-2xl leading-relaxed">
            Stop chasing tenants. We pay your rent on time, every time, for <span className="text-primary font-semibold">3-5 years</span> guaranteed.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8 max-w-xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 text-center sm:text-left">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-xs sm:text-base">Zero Fees</div>
                <div className="text-white/70 text-[10px] sm:text-sm hidden sm:block">No hidden costs</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 text-center sm:text-left">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-xs sm:text-base">24hr Quote</div>
                <div className="text-white/70 text-[10px] sm:text-sm hidden sm:block">Fast response</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 text-center sm:text-left">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
              <div>
                <div className="text-white font-semibold text-xs sm:text-base">85% Market</div>
                <div className="text-white/70 text-[10px] sm:text-sm hidden sm:block">Rent guaranteed</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-4 sm:mb-8">
            <Button 
              size="lg" 
              onClick={handleGetQuote}
              className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-7 text-sm sm:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-shadow duration-300 shadow-2xl shadow-primary/30"
              data-testid="button-hero-quote"
            >
              Get Your Free Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleCallNow}
              className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-7 text-sm sm:text-lg font-semibold bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/40 hover:border-white/60 rounded-full transition-colors duration-300"
              data-testid="button-hero-call"
            >
              <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Call Now
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6 text-white/80">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-base">No upfront costs</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-base">Full property care</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <CheckCircle className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-primary" />
              <span className="text-xs sm:text-base">UK-wide coverage</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-8 text-white/50 text-[10px] sm:text-sm">
            <div className="text-center">
              <div className="text-base sm:text-2xl font-bold text-white">£150k+</div>
              <div className="leading-tight">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-2xl font-bold text-white">75+</div>
              <div className="leading-tight">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-2xl font-bold text-white">99.8%</div>
              <div className="leading-tight">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-2xl font-bold text-white">5+</div>
              <div className="leading-tight">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
