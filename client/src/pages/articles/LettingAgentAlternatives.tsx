import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Banknote, AlertTriangle, TrendingDown } from "lucide-react";
import { useLocation } from "wouter";

const comparisons = [
  {
    category: "Traditional Letting Agent",
    fee: "8-15% + VAT monthly",
    setup: "£200-500 tenant find fee",
    voidRisk: "Landlord bears full risk",
    maintenance: "Charged per job + markup",
    contract: "Rolling month-to-month",
    income: "Variable, depends on tenancy",
  },
  {
    category: "Guaranteed Rent (Bourarro)",
    fee: "0% commission",
    setup: "No setup fees",
    voidRisk: "Zero - always paid",
    maintenance: "Included at no cost",
    contract: "3-5 years guaranteed",
    income: "Fixed, predictable monthly",
  },
];

export default function LettingAgentAlternatives() {
  const [, setLocation] = useLocation();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Alternatives to Letting Agents UK 2025",
    "description": "Tired of high letting agent fees? Discover better alternatives including guaranteed rent schemes with zero commission.",
    "author": { "@type": "Organization", "name": "Bourarro Properties" },
    "publisher": { "@type": "Organization", "name": "Bourarro Properties" },
    "datePublished": "2025-01-01",
    "dateModified": "2025-01-01"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Best Alternatives to Letting Agents UK 2025 | Save Thousands"
        description="Tired of paying 10-15% letting agent fees? Discover alternatives including guaranteed rent schemes with zero commission and no void periods. Complete UK guide."
        keywords="alternatives to letting agents, letting agent fees, property management without agent, guaranteed rent vs letting agent, landlord alternatives, no commission letting"
        ogTitle="Best Alternatives to Letting Agents UK 2025"
        ogDescription="Save thousands on letting agent fees. Compare alternatives including guaranteed rent with zero commission."
        canonicalUrl="https://bourarroproperties.uk/alternatives/letting-agents"
        ogUrl="https://bourarroproperties.uk/alternatives/letting-agents"
        structuredData={articleSchema}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <article>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">Updated January 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Best Alternatives to Letting Agents UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Traditional letting agents charge 10-15% of your rent plus hidden fees. 
              Discover how guaranteed rent schemes can save you thousands while eliminating all landlord stress.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <TrendingDown className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">The True Cost of Letting Agents</h2>
                <p className="text-muted-foreground mb-3">
                  On a £1,500/month property, a 12% letting agent fee costs you <strong className="text-foreground">£2,160 per year</strong>. 
                  Add tenant-find fees, maintenance markups, and void periods, and you could be losing £4,000+ annually.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">12%</div>
                    <div className="text-xs text-muted-foreground">Average fee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">£500</div>
                    <div className="text-xs text-muted-foreground">Setup fees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">1-2mo</div>
                    <div className="text-xs text-muted-foreground">Avg void/year</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Banknote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">The Smart Alternative: Guaranteed Rent</h2>
                <p className="text-muted-foreground mb-4">
                  With Bourarro Properties, you receive guaranteed rent every month at 85-100% market value, 
                  with zero commission and no void periods. That's potentially £5,000+ more in your pocket annually.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Letting Agent vs Guaranteed Rent: Full Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-4 px-4">Factor</th>
                    <th className="text-left py-4 px-4">Letting Agent</th>
                    <th className="text-left py-4 px-4 bg-primary/5">Guaranteed Rent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Monthly Fee</td>
                    <td className="py-4 px-4 text-red-600">8-15% + VAT</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">0%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Setup Fee</td>
                    <td className="py-4 px-4 text-red-600">£200-500</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">£0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Void Periods</td>
                    <td className="py-4 px-4 text-red-600">Your risk</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">Zero risk</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Maintenance</td>
                    <td className="py-4 px-4 text-red-600">Extra charges</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">Included</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Contract Length</td>
                    <td className="py-4 px-4">Rolling</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">3-5 years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Income Stability</td>
                    <td className="py-4 px-4 text-red-600">Variable</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">100% guaranteed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Your Options as a UK Landlord</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-red-200 dark:border-red-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <h3 className="text-xl font-bold text-foreground">Traditional Letting Agent</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-500">•</span>
                      Pay 10-15% of rent every month
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-500">•</span>
                      Risk void periods with no income
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-500">•</span>
                      Pay extra for every repair
                    </li>
                    <li className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-red-500">•</span>
                      Deal with tenant issues yourself
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Guaranteed Rent</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="text-primary">•</span>
                      Zero commission - keep 100%
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="text-primary">•</span>
                      Guaranteed rent every month
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="text-primary">•</span>
                      All maintenance included
                    </li>
                    <li className="flex items-start gap-2 text-foreground">
                      <span className="text-primary">•</span>
                      Complete hands-off management
                    </li>
                  </ul>
                  <Button className="w-full mt-4" onClick={() => setLocation('/contact')} data-testid="button-card-cta">
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Stop Paying Letting Agent Fees</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Switch to guaranteed rent and save thousands per year. Get your free quote in under 24 hours 
              and discover how much more you could be earning.
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