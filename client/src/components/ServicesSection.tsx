import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  DollarSign, 
  Clock, 
  Wrench, 
  CreditCard, 
  KeyRound 
} from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "Guaranteed Lease Terms",
    description: "Comprehensive 3-5 year guaranteed tenancy agreements with full-service property management throughout the entire investment period.",
  },
  {
    icon: DollarSign,
    title: "Zero Commission Structure",
    description: "Transparent pricing with no hidden fees or charges. The agreed rent amount is the exact amount you receive, every single month.",
  },
  {
    icon: Clock,
    title: "365-Day Income Guarantee",
    description: "Continuous rental income whether your property is occupied or vacant. Guaranteed monthly payments without exception.",
  },
  {
    icon: Wrench,
    title: "Concierge Maintenance",
    description: "Professional property maintenance and repairs at no additional cost through our experienced in-house service team.",
  },
  {
    icon: CreditCard,
    title: "Seamless Payment System",
    description: "Automated payment service with guaranteed rent transfers directly to your account on the same date each month.",
  },
  {
    icon: KeyRound,
    title: "Property Stewardship",
    description: "Your valuable investment property returned in immaculate condition with our comprehensive care and protection guarantee.",
  },
];

export default function ServicesSection() {
  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Service clicked: ${serviceTitle}`);
  };

  return (
    <section id="services" className="py-24 bg-secondary relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            Comprehensive <span className="text-primary italic">Investment</span> Benefits
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Professional property management solutions designed for investors seeking guaranteed returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover-elevate cursor-pointer h-full transition-all duration-500 group"
                onClick={() => handleServiceClick(service.title)}
                data-testid={`service-card-${index}`}
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-lg">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Luxury Trust Indicators */}
        <div className="mt-12 sm:mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">£150k+</div>
              <div className="text-xs sm:text-base text-muted-foreground">Avg Monthly Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">75+</div>
              <div className="text-xs sm:text-base text-muted-foreground">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">99.8%</div>
              <div className="text-xs sm:text-base text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">5+</div>
              <div className="text-xs sm:text-base text-muted-foreground">Year Guarantees</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}