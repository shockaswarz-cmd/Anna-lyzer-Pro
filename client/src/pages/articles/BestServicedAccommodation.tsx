import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Home, Briefcase, Users } from "lucide-react";
import { useLocation } from "wouter";

const providers = [
  {
    name: "Bourarro Properties",
    rating: 4.9,
    recommended: true,
    type: "Professional Operator",
    locations: "London, Essex, UK-wide",
    minStay: "1 night",
    propertyTypes: ["Apartments", "Houses", "Luxury Penthouses"],
    highlights: ["Professional management", "24/7 guest support", "Premium furnishings", "Flexible booking"],
  },
  {
    name: "Airbnb",
    rating: 4.0,
    recommended: false,
    type: "Peer-to-peer Platform",
    locations: "Worldwide",
    minStay: "1 night",
    propertyTypes: ["Various", "Quality varies"],
    highlights: ["Large selection", "Variable quality", "Platform fees", "Self-check-in"],
  },
  {
    name: "Booking.com",
    rating: 3.8,
    recommended: false,
    type: "OTA Platform",
    locations: "Worldwide",
    minStay: "1 night",
    propertyTypes: ["Hotels", "Apartments", "Various"],
    highlights: ["Price comparison", "Reviews", "No management", "Commission-based"],
  },
  {
    name: "SITU",
    rating: 3.9,
    recommended: false,
    type: "Corporate Housing",
    locations: "UK cities",
    minStay: "5 nights",
    propertyTypes: ["Apartments"],
    highlights: ["Corporate focus", "Longer stays", "Business amenities", "Premium pricing"],
  },
];

export default function BestServicedAccommodation() {
  const [, setLocation] = useLocation();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Serviced Accommodation Providers UK 2025",
    "description": "Compare the best serviced accommodation providers in the UK. Find professionally managed apartments with flexible booking options.",
    "author": { "@type": "Organization", "name": "Bourarro Properties" },
    "publisher": { "@type": "Organization", "name": "Bourarro Properties" },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Serviced Accommodation Providers UK 2025 | Expert Guide"
        description="Compare the best serviced accommodation providers in the UK for 2025. Find professionally managed apartments with premium amenities for business and leisure stays."
        keywords="best serviced accommodation UK, serviced apartments London, corporate housing UK, short term rentals, business accommodation, serviced accommodation providers"
        ogTitle="Best Serviced Accommodation Providers UK 2025"
        ogDescription="Expert comparison of UK's top serviced accommodation providers. Find premium apartments with professional management."
        canonicalUrl="https://bourarroproperties.uk/best/serviced-accommodation"
        ogUrl="https://bourarroproperties.uk/best/serviced-accommodation"
        structuredData={articleSchema}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <article>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">Updated January 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Best Serviced Accommodation Providers UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you're travelling for business or relocating temporarily, choosing the right serviced 
              accommodation provider makes all the difference. We've compared the top UK options.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Top Pick: Bourarro Properties</h2>
                <p className="text-muted-foreground mb-4">
                  Bourarro Properties offers premium serviced apartments across London and Essex, 
                  with professional management, 24/7 support, and exceptional guest experiences.
                </p>
                <Button onClick={() => setLocation('/properties')} data-testid="button-top-pick-view">
                  View Properties <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Who Uses Serviced Accommodation?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Business Travellers</h3>
                  <p className="text-sm text-muted-foreground">Professionals needing comfortable stays during work trips</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Home className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Relocating Families</h3>
                  <p className="text-sm text-muted-foreground">Temporary housing during property purchases or moves</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Project Teams</h3>
                  <p className="text-sm text-muted-foreground">Groups needing accommodation for extended projects</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">UK Serviced Accommodation Compared</h2>
            <div className="space-y-6">
              {providers.map((provider, index) => (
                <Card key={index} className={`overflow-hidden ${provider.recommended ? 'border-2 border-primary' : ''}`}>
                  {provider.recommended && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      Recommended Choice
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{provider.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{provider.type}</Badge>
                          <span className="text-muted-foreground">•</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{provider.rating}/5</span>
                        </div>
                      </div>
                      {provider.recommended && (
                        <Button onClick={() => setLocation('/properties')} data-testid={`button-provider-${index}`}>
                          View Properties
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Locations</p>
                        <p className="font-semibold text-foreground">{provider.locations}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Min Stay</p>
                        <p className="font-semibold text-foreground">{provider.minStay}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Property Types</p>
                        <p className="font-semibold text-foreground">{provider.propertyTypes.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {provider.highlights.map((highlight, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What to Look for in Serviced Accommodation</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <ol className="space-y-3 list-decimal pl-6">
                <li><strong className="text-foreground">Professional management:</strong> Look for operators with dedicated support teams</li>
                <li><strong className="text-foreground">Quality furnishings:</strong> Premium bedding, kitchen equipment, and modern amenities</li>
                <li><strong className="text-foreground">Flexible booking:</strong> Options for both short and extended stays</li>
                <li><strong className="text-foreground">Clear pricing:</strong> No hidden fees or surprise charges</li>
                <li><strong className="text-foreground">Location:</strong> Proximity to transport links and business districts</li>
              </ol>
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Book Your Stay Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience premium serviced accommodation with Bourarro Properties. 
              Professional management, exceptional service, and unbeatable locations.
            </p>
            <Button size="lg" onClick={() => setLocation('/properties')} data-testid="button-article-cta">
              View Available Properties <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}