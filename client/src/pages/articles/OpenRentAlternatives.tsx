import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Star, ArrowRight, AlertTriangle, HelpCircle, Clock, Banknote, Users, Home, Shield, Phone, TrendingUp, FileText, Wrench } from "lucide-react";
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

const openrentProblems = [
  {
    icon: Clock,
    title: "Time Investment",
    description: "You handle all viewings, negotiations, and paperwork yourself. For busy professionals, this time cost often exceeds the money saved."
  },
  {
    icon: Banknote,
    title: "Void Period Risk",
    description: "Empty months mean zero income while mortgage payments continue. The average void period costs landlords £1,500-2,500."
  },
  {
    icon: Users,
    title: "Tenant Issues",
    description: "Late payments, disputes, and evictions become entirely your problem. Without experience, these situations can be costly and stressful."
  },
  {
    icon: Wrench,
    title: "Maintenance Burden",
    description: "Every repair and emergency call is on you to coordinate and pay for. No support network means you're always on call."
  },
  {
    icon: FileText,
    title: "Legal Complexity",
    description: "Landlord regulations change frequently. Staying compliant with deposits, safety checks, and notice requirements requires constant attention."
  },
  {
    icon: Shield,
    title: "No Guarantees",
    description: "Your income depends entirely on tenant reliability. One bad tenant can wipe out years of rental profit."
  }
];

const faqs = [
  {
    question: "Is OpenRent really free to use?",
    answer: "OpenRent offers a free basic listing that appears only on their own website. To appear on major portals like Rightmove and Zoopla, you need to pay £49-249. Additional services like Rent Now, enhanced listings, and reference checks all cost extra. The true cost of using OpenRent is typically higher than the advertised free option."
  },
  {
    question: "What are the main problems with using OpenRent?",
    answer: "The main issues are: you do all the work yourself (viewings, tenant selection, paperwork), you bear all risk of void periods and non-payment, you're responsible for all maintenance and tenant issues, and you need to stay on top of complex legal requirements. For many landlords, the hidden time and stress costs exceed the money saved."
  },
  {
    question: "What's the best alternative to OpenRent for busy landlords?",
    answer: "For landlords who want genuine hands-off property investment, guaranteed rent providers like Bourarro Properties offer the best alternative. You receive fixed monthly rent regardless of occupancy, with zero commission and full property management included. This eliminates all the work and risk that comes with OpenRent while providing income security."
  },
  {
    question: "How does guaranteed rent compare to OpenRent financially?",
    answer: "While OpenRent appears cheaper upfront, consider the full picture: void periods averaging 4-6 weeks per tenancy, potential rent arrears, maintenance costs, and the value of your time. Guaranteed rent at 85-100% of market value, paid every month without fail, often provides better net returns when all costs are factored in."
  },
  {
    question: "Can I switch from OpenRent to guaranteed rent mid-tenancy?",
    answer: "If you have existing tenants, you'll typically need to wait until the tenancy ends to switch to guaranteed rent. However, if your property is currently vacant, you can often start a guaranteed rent arrangement immediately. Contact providers to discuss your specific situation."
  },
  {
    question: "What type of landlord is OpenRent best suited for?",
    answer: "OpenRent works best for landlords who: have significant time to dedicate to property management, enjoy the hands-on aspects of landlording, have experience handling tenant issues and legal compliance, and are comfortable with income variability. If any of these don't apply, alternatives like guaranteed rent may be more suitable."
  }
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
        title="Best OpenRent Alternatives UK 2025 | Compare Landlord Platforms"
        description="Looking for OpenRent alternatives? Compare the best letting platforms and guaranteed rent services for UK landlords. Find options with zero fees and guaranteed income."
        keywords="OpenRent alternatives, OpenRent competitors, best letting platforms UK, landlord platforms, OpenRent vs, tenant finding services, guaranteed rent alternative"
        ogTitle="Best OpenRent Alternatives UK 2025 - Expert Comparison"
        ogDescription="Compare OpenRent alternatives including guaranteed rent providers and full-service property management options."
        canonicalUrl="https://bourarroproperties.uk/alternatives/openrent"
        ogUrl="https://bourarroproperties.uk/alternatives/openrent"
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
              Best OpenRent Alternatives UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              OpenRent is popular for its low fees, but it leaves landlords doing all the work themselves. 
              Discover alternatives that offer guaranteed rent, full management, and zero hassle for landlords 
              who want truly passive property income.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When OpenRent launched, it disrupted the traditional letting agent model by offering a low-cost, 
              DIY approach to finding tenants. For tech-savvy landlords with time on their hands, it was revolutionary. 
              But as many landlords have discovered, the apparent savings come with significant hidden costs: your time, 
              your stress, and the risk of void periods and problem tenants. This guide examines the best alternatives 
              for landlords who want a better balance of cost, effort, and peace of mind.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">The Problem with Self-Service Platforms</h2>
                <p className="text-muted-foreground mb-4">
                  While OpenRent and similar platforms have low upfront costs, they leave landlords responsible for 
                  tenant management, rent collection, maintenance coordination, and void periods. For busy landlords, 
                  the hidden costs often outweigh the savings. Consider: if your time is worth £30/hour and you spend 
                  20 hours managing each tenancy, you've already "spent" £600 before any problems arise.
                </p>
                <p className="text-muted-foreground">
                  Moreover, void periods averaging 4-6 weeks between tenants can cost £1,500-3,000 in lost rent. Add 
                  potential tenant issues, and the "cheap" option becomes expensive very quickly.
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
                  Instead of paying to find tenants yourself and then doing all the work, get guaranteed rent every 
                  month with zero commission. Bourarro Properties handles everything while you enjoy predictable 
                  income and complete peace of mind. No more chasing rent, coordinating repairs, or worrying about 
                  void periods.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Understanding What OpenRent Actually Offers</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              OpenRent positions itself as a low-cost alternative to traditional letting agents, and for tenant-finding 
              alone, it delivers on that promise. However, it's important to understand exactly what you get (and don't get) 
              when using the platform:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">What OpenRent Provides</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Property listing on OpenRent website</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Portal listings (Rightmove, Zoopla) for extra fee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Online application system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Reference checking service (paid add-on)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>Contract templates (paid add-on)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">What OpenRent Doesn't Provide</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Property viewings (you do these yourself)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Rent collection or chasing arrears</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Maintenance coordination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Void period cover or rent guarantee</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <span>Tenant problem resolution</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In essence, OpenRent is a marketing platform, not a property management service. Once you've found a 
              tenant, you're on your own. For landlords who understand this and have the time and experience to manage 
              effectively, it can work well. For everyone else, the limitations create significant problems.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">The Hidden Costs of Using OpenRent</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              While OpenRent's low fees are attractive, the true cost of being a DIY landlord extends far beyond 
              the listing price. Here are the hidden costs many landlords don't consider until it's too late:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {openrentProblems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <problem.icon className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">OpenRent Alternatives Compared</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We've compared OpenRent with other popular options, from similar DIY platforms to full-service 
              guaranteed rent providers. Here's how they stack up across the features that matter most to landlords:
            </p>
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
            <p className="text-muted-foreground mb-4 leading-relaxed">
              While OpenRent continues to be popular with first-time landlords attracted by low fees, experienced 
              landlords are increasingly seeking alternatives. Here's what they've discovered about the DIY approach:
            </p>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Time Trap</h3>
              <p className="mb-4">
                Each tenancy cycle requires significant landlord involvement: creating listings, responding to enquiries, 
                conducting viewings (often multiple), vetting applicants, preparing paperwork, conducting inventories, 
                and handling the move-in process. Conservative estimates suggest 15-25 hours per tenancy, and that's 
                before any problems arise. For landlords with demanding jobs or multiple properties, this time 
                investment becomes unsustainable.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Risk Reality</h3>
              <p className="mb-4">
                OpenRent provides tools for tenant referencing, but ultimately the landlord bears all risk. If a tenant 
                stops paying, you're responsible for the eviction process, which can take 6-12 months and cost thousands 
                in legal fees and lost rent. Without professional experience, many landlords make procedural errors that 
                delay evictions further.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Void Period Problem</h3>
              <p className="mb-4">
                Every time a tenancy ends, the clock starts ticking on your void period. Marketing, viewings, referencing, 
                and move-in typically take 4-8 weeks at minimum. During this time, mortgage payments continue but rental 
                income stops. One void period per year can eliminate most of the savings from using a low-cost platform.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">The Stress Factor</h3>
              <p className="mb-4">
                Being directly responsible for everything means you're always "on call." Weekend maintenance emergencies, 
                late-night complaints from neighbours, rent payment chasing, and tenant disputes all land directly in 
                your lap. Many landlords report that the stress of self-management significantly impacts their quality 
                of life, making the apparent savings not worth the cost.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Guaranteed Rent: The Stress-Free Alternative</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              For landlords tired of the DIY approach, guaranteed rent offers a fundamentally different model. Instead 
              of paying to find tenants and then managing everything yourself, a guaranteed rent provider becomes your 
              tenant and handles everything else.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Predictable Income</h3>
                  <p className="text-muted-foreground">
                    Receive the same amount on the same date every month, regardless of occupancy or tenant payment. 
                    No more income anxiety or cashflow uncertainty.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Zero Time Investment</h3>
                  <p className="text-muted-foreground">
                    No viewings to conduct, no rent to chase, no maintenance calls to handle. Your only interaction 
                    is receiving monthly payments and optional update reports.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Complete Risk Transfer</h3>
                  <p className="text-muted-foreground">
                    Void periods, tenant arrears, maintenance costs, and legal issues all become the provider's 
                    responsibility. Your income is guaranteed regardless.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Property Care</h3>
                  <p className="text-muted-foreground">
                    Quality providers maintain your property to high standards with regular inspections and 
                    prompt repairs, often returning it in better condition than received.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Making the Switch from OpenRent</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              If you're currently using OpenRent and considering a switch to guaranteed rent, here's what the 
              transition typically looks like:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Get a Quote</h3>
                  <p className="text-muted-foreground">
                    Contact a guaranteed rent provider for a no-obligation assessment of your property. They'll 
                    tell you what rent they can guarantee, typically within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Time Your Transition</h3>
                  <p className="text-muted-foreground">
                    If you have existing tenants, you'll typically wait until the tenancy ends. If your property 
                    is vacant, you can often start immediately.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Property Inspection</h3>
                  <p className="text-muted-foreground">
                    The provider inspects your property to confirm condition and any work needed. Some may 
                    request minor upgrades before agreeing to a contract.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Sign and Relax</h3>
                  <p className="text-muted-foreground">
                    Once the contract is signed, the provider takes over completely. You simply receive your 
                    guaranteed rent each month for the duration of the contract.
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Comparing the Numbers: A Real Example</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Let's compare the annual returns for a £1,500/month property using OpenRent versus guaranteed rent:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-4 px-4">Factor</th>
                    <th className="text-left py-4 px-4">OpenRent DIY</th>
                    <th className="text-left py-4 px-4 bg-primary/5">Guaranteed Rent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Annual Rent Potential</td>
                    <td className="py-4 px-4">£18,000</td>
                    <td className="py-4 px-4 bg-primary/5">£16,200 (90% rate)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Void Period (6 weeks avg)</td>
                    <td className="py-4 px-4 text-red-600">-£2,077</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600">£0 (covered)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Platform/Listing Fees</td>
                    <td className="py-4 px-4 text-red-600">-£249</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600">£0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Maintenance (avg)</td>
                    <td className="py-4 px-4 text-red-600">-£800</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600">£0 (included)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Time Cost (20hrs @ £30)</td>
                    <td className="py-4 px-4 text-red-600">-£600</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600">£0</td>
                  </tr>
                  <tr className="border-b font-bold">
                    <td className="py-4 px-4">Net Annual Income</td>
                    <td className="py-4 px-4">£14,274</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600">£16,200</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              In this realistic scenario, guaranteed rent actually provides <strong className="text-foreground">higher net income</strong> than the DIY approach, 
              even before accounting for the stress and uncertainty eliminated. And if anything goes wrong with a 
              tenant when self-managing, the gap widens dramatically.
            </p>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready for a Better Alternative?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Stop doing all the work for minimal savings. Get guaranteed rent, zero commission, 
              and complete property management with Bourarro Properties. Join landlords who've discovered 
              that true passive income is possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setLocation('/contact')} data-testid="button-article-cta">
                Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation('/services')} data-testid="button-learn-more">
                Learn More About Guaranteed Rent
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
