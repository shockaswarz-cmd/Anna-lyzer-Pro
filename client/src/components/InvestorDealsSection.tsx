import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Key, LineChart, Wrench, ShieldCheck, Target, ArrowRight, MessageCircle, Play } from "lucide-react";
import showcaseVideo from "../assets/WhatsApp Video 2025-09-27 at 12.09.02_1758972223556.mp4";

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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">For Investors</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-4 sm:mb-6">
            Investment Deal <span className="text-primary italic">Sourcing</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            We source, analyze, and secure high-yield property opportunities tailored to your investment brief across the UK.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto mb-10 sm:mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 hover-elevate cursor-default h-full transition-all duration-500 group overflow-visible"
                data-testid={`feature-card-${index}`}
              >
                <CardContent className="p-5 sm:p-8 h-full flex flex-col">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-2 sm:mb-4">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Strip */}
        <div className="mb-10 sm:mb-16">
          <h3 className="text-xl sm:text-3xl font-bold font-serif text-foreground text-center mb-6 sm:mb-8">Our Process</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border border-primary/20 text-center" data-testid={`process-step-${index}`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-primary font-bold text-base sm:text-lg">{step.step}</span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1 sm:mb-2">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Panel */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <CardContent className="p-5 sm:p-8">
            <h3 className="text-lg sm:text-2xl font-bold font-serif text-foreground mb-4 sm:mb-6 text-center">What You Get</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Tailored deal alerts matching your criteria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Complete diligence pack with ROI analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Negotiated pricing and preferred terms</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Full completion support and legal assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optional ongoing property management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>Access to guaranteed rent programs</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Showcase Video Section */}
        <Card className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border-2 border-primary/20 mb-8 sm:mb-12 max-w-5xl mx-auto overflow-hidden">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Video Content */}
              <div className="relative bg-background/5 flex items-center justify-center">
                <video
                  controls
                  className="w-full max-h-[250px] sm:max-h-[400px] lg:max-h-[500px] object-contain"
                  data-testid="property-showcase-video"
                >
                  <source src={showcaseVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Content Panel */}
              <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6 w-fit">
                  <Play className="w-3 sm:w-4 h-3 sm:h-4 text-primary" />
                  <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">Property Showcase</span>
                </div>

                <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold font-serif text-foreground mb-4 sm:mb-6">
                  This Year's <span className="text-primary italic">Sourced Properties</span>
                </h3>

                <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                  Discover the stunning properties we've sourced for our clients. Each property meets specific investment criteria.
                </p>

                <div className="space-y-2 sm:space-y-4 text-sm sm:text-base">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Bespoke sourcing based on specifications</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Prime UK locations</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Exceptional value and investment potential</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            variant="secondary"
            size="lg"
            className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 mb-4"
            onClick={handleWhatsAppJoin}
            data-testid="button-whatsapp-group"
          >
            <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Join Investors Group
          </Button>
        </div>
      </div>
    </section>
  );
}