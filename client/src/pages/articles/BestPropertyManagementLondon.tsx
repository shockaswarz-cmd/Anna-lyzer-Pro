import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Building, Users, Wrench } from "lucide-react";
import { useLocation } from "wouter";

const companies = [
  {
    name: "Bourarro Properties",
    rating: 4.9,
    recommended: true,
    speciality: "Guaranteed Rent & Full Management",
    fees: "0% Commission",
    services: ["Guaranteed rent", "Full maintenance", "Tenant management", "Legal compliance", "24/7 support"],
    pros: ["Zero commission structure", "3-5 year guaranteed income", "Complete hands-off management"],
    cons: ["Minimum property standards required"],
  },
  {
    name: "Foxtons",
    rating: 3.7,
    recommended: false,
    speciality: "High-end London Properties",
    fees: "12-18% + VAT",
    services: ["Tenant finding", "Rent collection", "Basic maintenance"],
    pros: ["Strong London brand", "Large tenant database"],
    cons: ["High fees", "No rent guarantee", "Additional charges common"],
  },
  {
    name: "Hamptons",
    rating: 3.6,
    recommended: false,
    speciality: "Premium Residential",
    fees: "10-15% + VAT",
    services: ["Property marketing", "Tenant vetting", "Rent collection"],
    pros: ["National coverage", "Established reputation"],
    cons: ["Premium pricing", "Void period risk", "Maintenance extra"],
  },
  {
    name: "OpenRent",
    rating: 3.4,
    recommended: false,
    speciality: "Self-service Platform",
    fees: "£49-249 flat fee",
    services: ["Tenant finding", "Reference checks", "Contract generation"],
    pros: ["Low upfront cost", "DIY flexibility"],
    cons: ["No ongoing management", "Landlord does all work", "No guarantees"],
  },
];

export default function BestPropertyManagementLondon() {
  const [, setLocation] = useLocation();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Property Management Companies London 2025",
    "description": "Compare the top property management companies in London. Find services with guaranteed rent, zero commission, and comprehensive landlord support.",
    "author": { "@type": "Organization", "name": "Bourarro Properties" },
    "publisher": { "@type": "Organization", "name": "Bourarro Properties" },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Property Management Companies London 2025 | Expert Guide"
        description="Compare the best property management companies in London for 2025. Find zero-commission services, guaranteed rent options, and full management solutions for landlords."
        keywords="best property management London, property management companies London, London letting agents, property managers London, landlord services London, property management fees London"
        ogTitle="Best Property Management Companies London 2025"
        ogDescription="Expert comparison of London's top property management companies. Find the best fees, services, and guaranteed rent options."
        canonicalUrl="https://bourarroproperties.uk/best/property-management-london"
        ogUrl="https://bourarroproperties.uk/best/property-management-london"
        structuredData={articleSchema}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <article>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">Updated January 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Best Property Management Companies London 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Finding the right property management company in London can save you thousands in fees and hours of stress. 
              We've reviewed the top providers to help you make an informed decision.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Top Pick: Bourarro Properties</h2>
                <p className="text-muted-foreground mb-4">
                  Bourarro Properties offers what no traditional letting agent can match: guaranteed rent with zero commission. 
                  Perfect for landlords who want predictable income without the hassle.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What to Look for in a Property Manager</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Building className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Fee Structure</h3>
                  <p className="text-sm text-muted-foreground">Understand all costs upfront. Hidden fees are common.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Service Level</h3>
                  <p className="text-sm text-muted-foreground">Full management vs tenant-find only options.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Wrench className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Check if repairs are included or charged extra.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">London Property Managers Compared</h2>
            <div className="space-y-6">
              {companies.map((company, index) => (
                <Card key={index} className={`overflow-hidden ${company.recommended ? 'border-2 border-primary' : ''}`}>
                  {company.recommended && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                      Recommended Choice
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{company.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{company.rating}/5</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{company.speciality}</span>
                        </div>
                      </div>
                      {company.recommended && (
                        <Button onClick={() => setLocation('/contact')} data-testid={`button-company-${index}`}>
                          Get Quote
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Fees</p>
                        <p className="font-semibold text-foreground">{company.fees}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pros</p>
                        <ul className="text-sm">
                          {company.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Cons</p>
                        <ul className="text-sm text-muted-foreground">
                          {company.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {company.services.map((service, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{service}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for Stress-Free Property Management?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join landlords across London who've switched to guaranteed rent with Bourarro Properties. 
              Zero commission, full management, complete peace of mind.
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