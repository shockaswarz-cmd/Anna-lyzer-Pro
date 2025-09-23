import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Key, LineChart, Wrench, ShieldCheck, Target, ArrowRight, MessageCircle } from "lucide-react";

export default function InvestorDealsSection() {
  const features = [
    {
      icon: Globe2,
      title: "UK-Wide Coverage",
      description: "Access to major cities and emerging markets via our extensive network of on-the-ground partners"
    },
    {
      icon: Key,
      title: "Off-Market Access",
      description: "Direct access to off-market opportunities through established relationships with agents, developers, and landlords"
    },
    {
      icon: LineChart,
      title: "Data-Driven Analysis",
      description: "Comprehensive market analysis using Land Registry data, rental analytics, and yield stress testing"
    },
    {
      icon: Wrench,
      title: "End-to-End Service",
      description: "Complete support from sourcing and negotiation through to conveyancing and ongoing management"
    },
    {
      icon: ShieldCheck,
      title: "Risk & Compliance",
      description: "RICS-aligned valuations, comprehensive legal checks, and full tenancy compliance verification"
    },
    {
      icon: Target,
      title: "Multiple Strategies",
      description: "BTL, BRR, serviced accommodation, HMO, and new builds aligned to your investment goals"
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Brief",
      description: "Define your investment criteria and goals"
    },
    {
      step: "2", 
      title: "Source",
      description: "Identify and secure suitable opportunities"
    },
    {
      step: "3",
      title: "Verify",
      description: "Complete due diligence and risk assessment"
    },
    {
      step: "4",
      title: "Secure & Manage",
      description: "Complete purchase and optional ongoing management"
    }
  ];

  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/DR10Vs1zkXO07s7C0VMymb?mode=ems_copy_t', '_blank');
  };

  return (
    <section id="investors" className="py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-6 py-3 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold text-sm tracking-wide uppercase">For Investors</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold font-serif text-foreground mb-6">
            Investment Deal <span className="text-primary italic">Sourcing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We source, analyze, and secure high-yield property opportunities tailored to your investment brief across the UK.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover-elevate cursor-default h-full transition-all duration-500 group overflow-visible"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Strip */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold font-serif text-foreground text-center mb-8">Our Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border border-primary/20 text-center" data-testid={`process-step-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-lg">{step.step}</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Panel */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 mb-12 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold font-serif text-foreground mb-6 text-center">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tailored deal alerts matching your investment criteria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Complete diligence pack with photos, comparables, and ROI analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Negotiated pricing and preferred terms</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Full completion support and legal assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optional ongoing property management services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Access to guaranteed rent programs on completed purchases</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 mr-4 mb-4"
            onClick={() => {
              const processSection = document.querySelector('#investors h3');
              if (processSection) {
                processSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            data-testid="button-see-process"
          >
            See How We Work
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="text-lg px-8 py-6 mb-4"
            onClick={handleWhatsAppJoin}
            data-testid="button-whatsapp-group"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Join Private Investors Group
          </Button>
        </div>
      </div>
    </section>
  );
}