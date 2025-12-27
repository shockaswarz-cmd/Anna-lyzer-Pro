import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Building, Users, Wrench, AlertTriangle, HelpCircle, MapPin, Banknote, Clock, Shield, Phone, TrendingUp } from "lucide-react";
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

const londonAreas = [
  { area: "Central London", avgRent: "£2,500-£4,000", management: "Premium", demand: "Very High" },
  { area: "East London", avgRent: "£1,600-£2,400", management: "Growing", demand: "High" },
  { area: "South London", avgRent: "£1,400-£2,200", management: "Strong", demand: "High" },
  { area: "North London", avgRent: "£1,500-£2,500", management: "Established", demand: "High" },
  { area: "West London", avgRent: "£1,800-£3,000", management: "Premium", demand: "Very High" },
];

const faqs = [
  {
    question: "What does a London property management company typically charge?",
    answer: "Traditional London letting agents charge between 8-18% of monthly rent plus VAT for full management, with additional fees for tenant finding (often 50-100% of one month's rent). Guaranteed rent providers like Bourarro Properties charge 0% commission, paying you a fixed rent regardless of tenancy status."
  },
  {
    question: "What's the difference between let-only and fully managed services?",
    answer: "Let-only services find tenants and set up the tenancy, then hand management back to you. Fully managed services handle everything: tenant finding, rent collection, maintenance, inspections, and tenant issues. For busy landlords or those living outside London, full management is usually worth the investment."
  },
  {
    question: "How do I know if my property manager is doing a good job?",
    answer: "Good indicators include: prompt rent payments, regular property inspections with reports, quick response to maintenance issues, low tenant turnover, and clear communication. Request regular updates and don't hesitate to raise concerns if standards slip."
  },
  {
    question: "Can I switch property management companies mid-tenancy?",
    answer: "Yes, you can change managing agents at any time, though you'll need to inform your tenants and arrange handover of keys, documents, and deposits. Check your current contract for notice periods and any exit fees before switching."
  },
  {
    question: "What should I check before signing with a property manager?",
    answer: "Verify they're registered with a property ombudsman, check their client money protection scheme, read reviews carefully, understand all fees upfront, confirm their maintenance contractor arrangements, and ensure they have adequate professional indemnity insurance."
  },
  {
    question: "Is guaranteed rent better than traditional property management?",
    answer: "For many landlords, yes. Guaranteed rent eliminates void periods, ensures consistent income, and includes full management with zero commission. You sacrifice some flexibility compared to traditional letting, but gain certainty and peace of mind."
  }
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        <article>
          <div className="mb-12">
            <Badge variant="outline" className="mb-4">Updated January 2025</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Best Property Management Companies London 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Finding the right property management company in London can save you thousands in fees and hours of stress. 
              We've reviewed the top providers to help you make an informed decision about who manages your most valuable asset.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              London's property market is one of the most dynamic and challenging in the world. With average rents continuing 
              to rise and tenant demand at record levels, landlords face both opportunities and challenges. The right property 
              management company can help you maximize returns while minimizing the headaches that come with being a landlord 
              in the capital. This comprehensive guide examines the best options available, from traditional high-street agents 
              to innovative guaranteed rent providers.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Top Pick: Bourarro Properties</h2>
                <p className="text-muted-foreground mb-4">
                  Bourarro Properties offers what no traditional letting agent can match: guaranteed rent with zero commission. 
                  For London landlords who want predictable income without the hassle, this represents the gold standard in 
                  property management. With contracts up to 5 years and comprehensive maintenance included, you can truly 
                  set and forget your property investment.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Understanding London Property Management</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Property management in London is a specialized field that requires deep knowledge of local regulations, 
              tenant expectations, and market dynamics. Unlike other UK cities, London landlords face unique challenges 
              including higher tenant turnover, stricter licensing requirements in many boroughs, and the need to 
              maintain properties to exacting standards to command premium rents.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A good property management company should handle everything from marketing your property and vetting tenants 
              to collecting rent, coordinating repairs, and ensuring legal compliance. In London's fast-paced market, 
              response times matter, and the difference between a good and bad managing agent can be thousands of pounds 
              in lost rent or unnecessary fees.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Building className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Fee Structure</h3>
                  <p className="text-sm text-muted-foreground">Understand all costs upfront including management fees, tenant finding fees, and hidden charges. London agents are notorious for add-on fees.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Service Level</h3>
                  <p className="text-sm text-muted-foreground">Compare let-only, rent collection, and fully managed services. Each tier offers different levels of involvement and cost.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Wrench className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Maintenance</h3>
                  <p className="text-sm text-muted-foreground">Check if repairs are included, capped, or charged separately with markups. This is where many agents make significant profit.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Types of Property Management Services</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Before comparing specific companies, it's important to understand the different types of property management 
              services available in London. Each offers different levels of involvement and comes with different pricing structures.
            </p>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Tenant-Find Only (Let-Only)</h3>
                  <p className="text-muted-foreground mb-4">
                    The agent markets your property, conducts viewings, vets tenants, and sets up the tenancy agreement. 
                    Once the tenant moves in, you take over all management responsibilities including rent collection, 
                    maintenance, and dealing with any issues that arise.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground"><strong className="text-foreground">Typical Cost:</strong> 4-8 weeks' rent</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Best For:</strong> Experienced landlords with time to manage</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Rent Collection Service</h3>
                  <p className="text-muted-foreground mb-4">
                    Includes tenant finding plus ongoing rent collection and basic financial management. The agent 
                    collects rent from the tenant and passes it to you, handling any payment issues. However, you 
                    remain responsible for property maintenance and inspections.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground"><strong className="text-foreground">Typical Cost:</strong> 6-10% of rent monthly</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Best For:</strong> Landlords who want payment protection but can handle maintenance</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Full Management</h3>
                  <p className="text-muted-foreground mb-4">
                    The comprehensive option covering everything: marketing, tenant finding, rent collection, 
                    maintenance coordination, regular inspections, and handling all tenant issues. The agent 
                    becomes your single point of contact for everything property-related.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground"><strong className="text-foreground">Typical Cost:</strong> 10-18% of rent monthly + VAT</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Best For:</strong> Busy landlords, overseas owners, or portfolio investors</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Guaranteed Rent
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    The ultimate hands-off solution. A company leases your property directly, paying you guaranteed 
                    rent every month regardless of whether the property is occupied. All tenant management, 
                    maintenance, and void period risk is absorbed by the provider.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-muted-foreground"><strong className="text-foreground">Typical Cost:</strong> 0% commission (Bourarro model)</span>
                    <span className="text-muted-foreground"><strong className="text-foreground">Best For:</strong> Any landlord wanting certainty and zero hassle</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">London Property Managers Compared</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We've analysed London's leading property management options across key criteria that matter most to landlords: 
              fees, service quality, reliability, and overall value for money. Here's how the major players compare:
            </p>
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">London Property Management by Area</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Property management requirements and rental values vary significantly across London. Understanding local 
              market conditions helps you choose the right management approach and set realistic expectations:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-4 px-4">Area</th>
                    <th className="text-left py-4 px-4">Avg. Rent (2-bed)</th>
                    <th className="text-left py-4 px-4">Management Market</th>
                    <th className="text-left py-4 px-4">Tenant Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {londonAreas.map((area, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-4 px-4 font-medium">{area.area}</td>
                      <td className="py-4 px-4">{area.avgRent}/month</td>
                      <td className="py-4 px-4">{area.management}</td>
                      <td className="py-4 px-4">{area.demand}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">The True Cost of London Property Management</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              When comparing property management options in London, it's essential to look beyond the headline percentage 
              fee. Many agents advertise competitive rates but make up the difference with additional charges. Here's 
              what to watch out for:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-red-200 dark:border-red-800">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Hidden Fees to Watch For
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Tenant finding fee (often 50-100% of one month's rent)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Renewal fees (for extending existing tenancies)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Maintenance markup (10-20% on contractor invoices)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Check-in/check-out inventory fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Safety certificate coordination charges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Court appearance and eviction management fees</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    What Bourarro Includes Free
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>All tenant finding and vetting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Complete property maintenance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Void period cover (you're always paid)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>All tenancy renewals and changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Regular property inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Legal compliance management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              When you add up all the potential fees from traditional agents, a "10%" management fee can easily become 
              15-20% of your rental income. Compare this with guaranteed rent providers who charge 0% commission and 
              include everything in the agreed rent, and the value proposition becomes clear.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What to Look for in a London Property Manager</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Professional Accreditation</h3>
                  <p className="text-muted-foreground">
                    Ensure your agent is registered with a property redress scheme (The Property Ombudsman or Property 
                    Redress Scheme) and has Client Money Protection insurance. These are legal requirements that protect 
                    your money if the agent fails.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Local Knowledge</h3>
                  <p className="text-muted-foreground">
                    London is not one market but many. A good property manager understands the specific demands, tenant 
                    profiles, and rental values in your property's area. They should be able to provide comparable 
                    evidence when valuing your property.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Response Times</h3>
                  <p className="text-muted-foreground">
                    In London's competitive market, delays cost money. Ask about average response times for tenant 
                    enquiries, maintenance issues, and emergency calls. Good agents should respond to urgent matters 
                    within hours, not days.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Track Record</h3>
                  <p className="text-muted-foreground">
                    Look for evidence of consistent performance: average void periods, tenant retention rates, and 
                    client reviews. A company willing to share these metrics is usually one that performs well on them.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why London Landlords Choose Guaranteed Rent</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The London property market presents unique challenges that make guaranteed rent particularly attractive. 
              High property values mean mortgage payments are substantial, making void periods financially devastating. 
              Meanwhile, tenant expectations are high, and the regulatory environment is complex.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Guaranteed rent solves these challenges in one package. You receive reliable income to cover your 
              mortgage regardless of what happens with tenants. Professional management ensures your property meets 
              all regulations and tenant expectations. And you're completely removed from the day-to-day stress of 
              landlording in one of the world's most demanding rental markets.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">£0</div>
                <div className="text-sm text-muted-foreground">Commission charged</div>
              </div>
              <div className="text-center p-6 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">3-5</div>
                <div className="text-sm text-muted-foreground">Year contracts available</div>
              </div>
              <div className="text-center p-6 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Payment reliability</div>
              </div>
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for Stress-Free Property Management?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join landlords across London who've switched to guaranteed rent with Bourarro Properties. 
              Zero commission, full management, complete peace of mind. Get your free quote today and discover 
              how much simpler London property investment can be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setLocation('/contact')} data-testid="button-article-cta">
                Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation('/services')} data-testid="button-learn-more">
                Explore Our Services
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Or call us on +44 7435 549937 for immediate assistance
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
