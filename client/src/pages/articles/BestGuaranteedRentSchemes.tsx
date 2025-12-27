import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Shield, Clock, Banknote } from "lucide-react";
import { useLocation } from "wouter";

const schemes = [
  {
    name: "Bourarro Properties",
    rating: 4.9,
    recommended: true,
    rentGuarantee: "85-100% market value",
    contractLength: "3-5 years",
    commission: "0%",
    coverage: "UK-wide",
    maintenanceIncluded: true,
    highlights: ["Zero commission", "Full property care", "24hr quote response", "Guaranteed payments"],
  },
  {
    name: "Local Council Schemes",
    rating: 3.8,
    recommended: false,
    rentGuarantee: "70-80% market value",
    contractLength: "1-3 years",
    commission: "0%",
    coverage: "Council area only",
    maintenanceIncluded: false,
    highlights: ["Government backed", "Tenant referrals", "Limited flexibility"],
  },
  {
    name: "Traditional Letting Agents",
    rating: 3.5,
    recommended: false,
    rentGuarantee: "No guarantee",
    contractLength: "Rolling",
    commission: "8-15%",
    coverage: "Varies",
    maintenanceIncluded: false,
    highlights: ["Tenant finding only", "High fees", "Void periods at landlord risk"],
  },
  {
    name: "Rent Guarantee Insurance",
    rating: 3.2,
    recommended: false,
    rentGuarantee: "Claims-based",
    contractLength: "Annual renewal",
    commission: "2-5% of rent",
    coverage: "UK-wide",
    maintenanceIncluded: false,
    highlights: ["Insurance product", "Claims process required", "Exclusions apply"],
  },
];

export default function BestGuaranteedRentSchemes() {
  const [, setLocation] = useLocation();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Guaranteed Rent Schemes UK 2025 - Complete Comparison Guide",
    "description": "Compare the top guaranteed rent schemes in the UK for 2025. Find out which companies offer the best rates, longest contracts, and zero commission.",
    "author": {
      "@type": "Organization",
      "name": "Bourarro Properties"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bourarro Properties",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bourarroproperties.uk/logo.png"
      }
    },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Guaranteed Rent Schemes UK 2025 | Compare Top Providers"
        description="Compare the best guaranteed rent schemes in the UK for 2025. Discover which companies offer 85-100% market value, zero commission, and 3-5 year contracts. Expert landlord guide."
        keywords="best guaranteed rent schemes UK, guaranteed rent companies, rent guarantee scheme comparison, landlord guaranteed rent, best rent guarantee 2025, guaranteed rental income UK"
        ogTitle="Best Guaranteed Rent Schemes UK 2025 - Expert Comparison"
        ogDescription="Find the best guaranteed rent scheme for your property. Compare rates, contract lengths, and fees across top UK providers."
        canonicalUrl="https://bourarroproperties.uk/best/guaranteed-rent-schemes"
        ogUrl="https://bourarroproperties.uk/best/guaranteed-rent-schemes"
        structuredData={articleSchema}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <article>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">Updated January 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Best Guaranteed Rent Schemes UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Looking for a guaranteed rent scheme that actually delivers? We've compared the top UK providers 
              to help landlords find the best rates, longest contracts, and most reliable service.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Top Pick: Bourarro Properties</h2>
                <p className="text-muted-foreground mb-4">
                  After extensive research, Bourarro Properties stands out as the best guaranteed rent provider in the UK, 
                  offering up to 100% market value rent, zero commission, and comprehensive property management.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What is a Guaranteed Rent Scheme?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A guaranteed rent scheme (also known as rent-to-rent or corporate let) is an arrangement where a 
              property management company pays landlords a fixed monthly rent, regardless of whether the property 
              is occupied. This eliminates void periods, late payments, and tenant-related stress.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Guaranteed Income</h3>
                  <p className="text-sm text-muted-foreground">Receive rent every month, even during void periods</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Long-Term Security</h3>
                  <p className="text-sm text-muted-foreground">Contracts typically range from 3-5 years</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Banknote className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground">Best schemes charge zero commission</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Guaranteed Rent Schemes Compared</h2>
            <div className="space-y-6">
              {schemes.map((scheme, index) => (
                <Card key={index} className={`overflow-hidden ${scheme.recommended ? 'border-2 border-primary' : ''}`}>
                  {scheme.recommended && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      Recommended Choice
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{scheme.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{scheme.rating}/5</span>
                        </div>
                      </div>
                      {scheme.recommended && (
                        <Button onClick={() => setLocation('/contact')} data-testid={`button-scheme-${index}`}>
                          Get Quote
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Rent Guarantee</p>
                        <p className="font-semibold text-foreground">{scheme.rentGuarantee}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contract Length</p>
                        <p className="font-semibold text-foreground">{scheme.contractLength}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Commission</p>
                        <p className="font-semibold text-foreground">{scheme.commission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Coverage</p>
                        <p className="font-semibold text-foreground">{scheme.coverage}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {scheme.highlights.map((highlight, i) => (
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
            <h2 className="text-3xl font-bold text-foreground mb-6">How to Choose the Right Guaranteed Rent Scheme</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">When evaluating guaranteed rent schemes, consider these key factors:</p>
              <ol className="space-y-3 list-decimal pl-6">
                <li><strong className="text-foreground">Rent percentage:</strong> The best schemes offer 85-100% of market value. Avoid schemes offering less than 80%.</li>
                <li><strong className="text-foreground">Contract length:</strong> Longer contracts (3-5 years) provide more security and predictable income.</li>
                <li><strong className="text-foreground">Commission structure:</strong> Look for zero-commission schemes to maximize your returns.</li>
                <li><strong className="text-foreground">Maintenance coverage:</strong> Premium schemes include full property maintenance at no extra cost.</li>
                <li><strong className="text-foreground">Company reputation:</strong> Check reviews, years in business, and property portfolio size.</li>
              </ol>
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Guaranteed Rent?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of landlords who trust Bourarro Properties for guaranteed rental income. 
              Get your free, no-obligation quote in under 24 hours.
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