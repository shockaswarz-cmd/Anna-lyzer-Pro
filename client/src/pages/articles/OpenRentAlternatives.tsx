import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Star, ArrowRight, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

const alternatives = [
  {
    name: "Bourarro Properties",
    type: "Guaranteed Rent Provider",
    rating: 4.9,
    recommended: true,
    pricing: "Zero commission",
    bestFor: "Landlords wanting guaranteed income",
    features: [
      { name: "Guaranteed monthly rent", included: true },
      { name: "Zero void periods", included: true },
      { name: "Full property management", included: true },
      { name: "Maintenance included", included: true },
      { name: "3-5 year contracts", included: true },
      { name: "Tenant management", included: true },
    ],
  },
  {
    name: "OpenRent",
    type: "Self-Service Platform",
    rating: 3.4,
    recommended: false,
    pricing: "£49-249 per listing",
    bestFor: "DIY landlords with time",
    features: [
      { name: "Guaranteed monthly rent", included: false },
      { name: "Zero void periods", included: false },
      { name: "Full property management", included: false },
      { name: "Maintenance included", included: false },
      { name: "Long-term contracts", included: false },
      { name: "Tenant management", included: false },
    ],
  },
  {
    name: "Rightmove Landlords",
    type: "Listing Platform",
    rating: 3.2,
    recommended: false,
    pricing: "£99+ per listing",
    bestFor: "Maximum exposure",
    features: [
      { name: "Guaranteed monthly rent", included: false },
      { name: "Zero void periods", included: false },
      { name: "Full property management", included: false },
      { name: "Maintenance included", included: false },
      { name: "Long-term contracts", included: false },
      { name: "Tenant management", included: false },
    ],
  },
  {
    name: "SpareRoom",
    type: "Room Rental Platform",
    rating: 3.5,
    recommended: false,
    pricing: "Free - £99",
    bestFor: "HMO landlords",
    features: [
      { name: "Guaranteed monthly rent", included: false },
      { name: "Zero void periods", included: false },
      { name: "Full property management", included: false },
      { name: "Maintenance included", included: false },
      { name: "Long-term contracts", included: false },
      { name: "Tenant management", included: false },
    ],
  },
];

export default function OpenRentAlternatives() {
  const [, setLocation] = useLocation();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best OpenRent Alternatives UK 2025 - Complete Comparison",
    "description": "Looking for OpenRent alternatives? Compare the best platforms and services for UK landlords, including guaranteed rent options.",
    "author": { "@type": "Organization", "name": "Bourarro Properties" },
    "publisher": { "@type": "Organization", "name": "Bourarro Properties" },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best OpenRent Alternatives UK 2025 | Compare Landlord Platforms"
        description="Looking for OpenRent alternatives? Compare the best letting platforms and guaranteed rent services for UK landlords. Find options with zero fees and guaranteed income."
        keywords="OpenRent alternatives, OpenRent competitors, best letting platforms UK, landlord platforms, OpenRent vs, tenant finding services, guaranteed rent alternative"
        ogTitle="Best OpenRent Alternatives UK 2025 - Expert Comparison"
        ogDescription="Compare OpenRent alternatives including guaranteed rent providers and full-service property management options."
        canonicalUrl="https://bourarroproperties.uk/alternatives/openrent"
        ogUrl="https://bourarroproperties.uk/alternatives/openrent"
        structuredData={articleSchema}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <article>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">Updated January 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Best OpenRent Alternatives UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              OpenRent is popular for its low fees, but it leaves landlords doing all the work. 
              Discover alternatives that offer guaranteed rent, full management, and zero hassle.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">The Problem with Self-Service Platforms</h2>
                <p className="text-muted-foreground">
                  While OpenRent and similar platforms have low upfront costs, they leave landlords responsible for 
                  tenant management, rent collection, maintenance, and void periods. For busy landlords, the hidden 
                  costs often outweigh the savings.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Best Alternative: Bourarro Properties</h2>
                <p className="text-muted-foreground mb-4">
                  Instead of paying to find tenants yourself, get guaranteed rent every month with zero commission. 
                  Bourarro Properties handles everything while you enjoy predictable income.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">OpenRent Alternatives Compared</h2>
            <div className="space-y-6">
              {alternatives.map((alt, index) => (
                <Card key={index} className={`overflow-hidden ${alt.recommended ? 'border-2 border-primary' : ''}`}>
                  {alt.recommended && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      Recommended Alternative
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{alt.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{alt.type}</Badge>
                          <span className="text-muted-foreground">•</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{alt.rating}/5</span>
                        </div>
                      </div>
                      {alt.recommended && (
                        <Button onClick={() => setLocation('/contact')} data-testid={`button-alt-${index}`}>
                          Get Quote
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Pricing</p>
                        <p className="font-semibold text-foreground">{alt.pricing}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Best For</p>
                        <p className="font-semibold text-foreground">{alt.bestFor}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {alt.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          {feature.included ? (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why Landlords Are Moving Away from OpenRent</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">While OpenRent offers an affordable way to find tenants, many landlords discover hidden costs:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong className="text-foreground">Time investment:</strong> You handle viewings, negotiations, and paperwork yourself</li>
                <li><strong className="text-foreground">Void period risk:</strong> Empty months mean zero income while mortgage payments continue</li>
                <li><strong className="text-foreground">Tenant issues:</strong> Late payments, disputes, and evictions become your problem</li>
                <li><strong className="text-foreground">Maintenance burden:</strong> Every repair and emergency call is on you</li>
                <li><strong className="text-foreground">No guarantees:</strong> Your income depends entirely on tenant reliability</li>
              </ul>
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for a Better Alternative?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop doing all the work for minimal savings. Get guaranteed rent, zero commission, 
              and complete property management with Bourarro Properties.
            </p>
            <Button size="lg" onClick={() => setLocation('/contact')} data-testid="button-article-cta">
              Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}