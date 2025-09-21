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
    title: "3-5 Year Guaranteed Lease",
    description: "Long-term guaranteed tenancy with full property management throughout the entire period.",
  },
  {
    icon: DollarSign,
    title: "0% Commission",
    description: "No hidden fees or charges. The rent agreed is the rent you receive, every month.",
  },
  {
    icon: Clock,
    title: "365-Day Rent Guarantee",
    description: "Get paid whether your property is occupied or vacant. No rent breaks, ever.",
  },
  {
    icon: Wrench,
    title: "Free Maintenance",
    description: "Complete minor repairs at no cost with our in-house maintenance team.",
  },
  {
    icon: CreditCard,
    title: "Automated Payments",
    description: "Receive your rent on the same day every month via direct bank transfer.",
  },
  {
    icon: KeyRound,
    title: "Property Protection",
    description: "Property returned in guaranteed condition, subject to fair wear and tear.",
  },
];

export default function ServicesSection() {
  const handleServiceClick = (serviceTitle: string) => {
    console.log(`Service clicked: ${serviceTitle}`);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional property management designed to maximize your returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="hover-elevate cursor-pointer h-full"
                onClick={() => handleServiceClick(service.title)}
                data-testid={`service-card-${index}`}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <IconComponent className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow line-clamp-2">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}