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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Landlords: Why Choose Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional property management services designed to maximize your returns 
            while minimizing your stress and involvement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
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