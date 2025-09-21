import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  DollarSign, 
  Home, 
  Clock, 
  Receipt, 
  Wrench, 
  CreditCard, 
  KeyRound 
} from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "1 to 5+ Year Lease",
    description: "Your property will be 100% managed for the whole period. You will not have to worry about finding tenants or leaving your property unoccupied.",
  },
  {
    icon: DollarSign,
    title: "0% Commission",
    description: "No hidden fees or charges, our leasing service is absolutely free. We manage the property free of charge and handle small maintenance issues at our cost.",
  },
  {
    icon: Home,
    title: "Market Value Rent",
    description: "Bourarro Properties will ensure we are able to offer you top end market value rent for your property investment.",
  },
  {
    icon: Clock,
    title: "Guaranteed Rent for 365 Days",
    description: "Whether your property is occupied or vacant – you get paid, no rent breaks, no rent stops, ensuring great rental yields.",
  },
  {
    icon: Receipt,
    title: "No Utility Bills or Council Tax",
    description: "You are not responsible for paying any utility bills or council tax during the lease period.",
  },
  {
    icon: Wrench,
    title: "Free Repairs",
    description: "We have a large team of trained maintenance operatives. We complete minor repairs free of charge as part of our management service.",
  },
  {
    icon: CreditCard,
    title: "Prompt Rental Payments",
    description: "Bourarro Properties will pay your rent on the same day every month via an automated BACS payment system direct into your bank account.",
  },
  {
    icon: KeyRound,
    title: "Returning Your Property",
    description: "When Bourarro Properties returns your property the internal condition is guaranteed, subject to fair wear and tear.",
  },
];

export default function ServicesSection() {
  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Service clicked: ${serviceTitle}`);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-muted/20 via-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-chart-1 to-primary bg-clip-text text-transparent">
              Landlords: Why Choose Us?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional property management services designed to maximize your returns 
            while minimizing your stress and involvement.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate cursor-pointer h-full group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border-0 bg-gradient-to-br from-background via-background to-muted/20"
                onClick={() => handleServiceClick(service.title)}
                data-testid={`service-card-${index}`}
              >
                <CardContent className="p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl transition-all duration-300 group-hover:scale-150"></div>
                  
                  <div className="mb-6 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-primary group-hover:text-chart-1 transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow group-hover:text-foreground/80 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 mt-4"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}