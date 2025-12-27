import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Banknote, AlertTriangle, TrendingDown, HelpCircle, Clock, Shield, Users, Home, Phone, TrendingUp, Calculator, FileText, Wrench } from "lucide-react";
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

const agentProblems = [
  {
    icon: Banknote,
    title: "High Commission Fees",
    problem: "8-15% + VAT monthly",
    impact: "On a £1,500/month property, that's £2,160-3,240 per year just in fees."
  },
  {
    icon: FileText,
    title: "Hidden Extra Charges",
    problem: "Tenant find, renewal, admin fees",
    impact: "Total costs often 20-30% higher than the advertised management fee."
  },
  {
    icon: TrendingDown,
    title: "No Void Protection",
    problem: "You lose income when empty",
    impact: "Average void periods of 4-6 weeks cost £1,500-3,000 annually."
  },
  {
    icon: Wrench,
    title: "Maintenance Markups",
    problem: "10-20% added to contractor bills",
    impact: "A £200 repair becomes £240, adding hundreds per year in hidden costs."
  },
  {
    icon: Clock,
    title: "Slow Response Times",
    problem: "Overworked, understaffed offices",
    impact: "Tenant issues escalate, good tenants leave, and you bear the cost."
  },
  {
    icon: Users,
    title: "High Staff Turnover",
    problem: "No continuity of care",
    impact: "You explain your property repeatedly to new staff who don't know your situation."
  }
];

const alternatives = [
  {
    name: "Guaranteed Rent",
    recommended: true,
    description: "A company leases your property directly, paying guaranteed rent regardless of occupancy. All management included.",
    pros: ["100% guaranteed income", "Zero commission", "All maintenance included", "3-5 year security", "Complete hands-off"],
    cons: ["Slightly lower than market rent", "Less control over tenant selection"],
    bestFor: "Landlords wanting certainty and zero hassle"
  },
  {
    name: "Self-Management",
    recommended: false,
    description: "You handle everything yourself: marketing, viewings, tenant management, maintenance coordination, and legal compliance.",
    pros: ["No management fees", "Full control", "Direct tenant relationship"],
    cons: ["Significant time investment", "Void period risk", "Requires expertise", "Always on call"],
    bestFor: "Experienced landlords with time and local presence"
  },
  {
    name: "Online Platforms (OpenRent)",
    recommended: false,
    description: "Low-cost platforms for finding tenants. You handle everything after the tenant is found.",
    pros: ["Low upfront cost", "Portal exposure", "DIY flexibility"],
    cons: ["No ongoing management", "All risk on landlord", "Time intensive"],
    bestFor: "Tech-savvy landlords wanting cheaper tenant-find"
  },
  {
    name: "Property Management Software",
    recommended: false,
    description: "Software tools to help self-managing landlords with rent collection, maintenance tracking, and compliance.",
    pros: ["Organized management", "Automated reminders", "Cheaper than agents"],
    cons: ["Still requires your time", "Learning curve", "No physical support"],
    bestFor: "Organized self-managers wanting better systems"
  }
];

const faqs = [
  {
    question: "Why are letting agent fees so high?",
    answer: "Letting agents operate on a commission model with significant overhead: office space, staff, marketing, and regulatory compliance. They also face void periods where they earn nothing, so they must charge enough during active tenancies to cover gaps. This model inevitably results in fees of 10-18% to remain profitable."
  },
  {
    question: "What's the difference between tenant-find and fully managed?",
    answer: "Tenant-find services (typically 4-8 weeks' rent) only find you a tenant and set up the tenancy. Fully managed (8-15% monthly + VAT) includes ongoing rent collection, maintenance coordination, and tenant issues. However, even 'fully managed' often excludes void period cover and has additional fees for things like tenancy renewals."
  },
  {
    question: "Is guaranteed rent really zero commission?",
    answer: "Yes, with quality providers like Bourarro Properties, there is genuinely no commission or management fee. The provider makes money from the difference between what they pay you and what they collect from tenants, but they also absorb all risk of voids and non-payment. You receive a fixed amount every month with no deductions."
  },
  {
    question: "How much can I save by switching from a letting agent?",
    answer: "The savings depend on your current fees and rent level. On a £1,500/month property with a typical 12% management fee, you'd pay £2,160/year in fees alone. With guaranteed rent at 0% commission, you keep all the agreed rent. Even accounting for a slightly lower rent percentage, most landlords come out ahead, especially when void period protection is factored in."
  },
  {
    question: "What if I've had a good experience with my letting agent?",
    answer: "If your agent provides excellent service, responds quickly, and you're happy with the fees, there may be no urgent reason to switch. However, it's worth periodically comparing your net returns (after all fees and void periods) with guaranteed rent options to ensure you're still getting the best deal."
  },
  {
    question: "Can I manage my property myself to save money?",
    answer: "Self-management can work well for landlords with experience, available time, and properties near where they live. However, many landlords underestimate the time required (15-25+ hours per tenancy) and the stress of being constantly on call. If your time has value, self-management may not actually save money compared to alternatives like guaranteed rent."
  },
  {
    question: "What happens if my guaranteed rent provider goes bust?",
    answer: "This is an important consideration. Choose established providers with proven track records and financial stability. Check how long they've been operating, read reviews, and understand what protections exist. Quality providers like Bourarro Properties have years of history and transparent operations."
  }
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
        title="Best Alternatives to Letting Agents UK 2025 | Save Thousands"
        description="Tired of paying 10-15% letting agent fees? Discover alternatives including guaranteed rent schemes with zero commission and no void periods. Complete UK guide."
        keywords="alternatives to letting agents, letting agent fees, property management without agent, guaranteed rent vs letting agent, landlord alternatives, no commission letting"
        ogTitle="Best Alternatives to Letting Agents UK 2025"
        ogDescription="Save thousands on letting agent fees. Compare alternatives including guaranteed rent with zero commission."
        canonicalUrl="https://bourarroproperties.uk/alternatives/letting-agents"
        ogUrl="https://bourarroproperties.uk/alternatives/letting-agents"
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
              Best Alternatives to Letting Agents UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Traditional letting agents charge 10-15% of your rent plus hidden fees, eating into your returns and 
              leaving you exposed to void periods. Discover how guaranteed rent schemes and other alternatives can 
              save you thousands while eliminating landlord stress.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              For decades, letting agents have been the default choice for landlords who don't want to manage properties 
              themselves. But their high fees, additional charges, and lack of void period protection mean landlords 
              often receive far less than they expect. With the rise of guaranteed rent schemes and technology-enabled 
              alternatives, there are now better options for landlords who want reliable income without the hassle 
              and expense of traditional agents.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <TrendingDown className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">The True Cost of Letting Agents</h2>
                <p className="text-muted-foreground mb-3">
                  On a £1,500/month property, a 12% letting agent fee costs you <strong className="text-foreground">£2,160 per year</strong> in commission alone. 
                  Add tenant-find fees (£500+), maintenance markups, and void periods, and you could be losing <strong className="text-foreground">£4,000-5,000 annually</strong> 
                  compared to alternatives like guaranteed rent.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">12%</div>
                    <div className="text-xs text-muted-foreground">Average monthly fee</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">£500+</div>
                    <div className="text-xs text-muted-foreground">Tenant find fee</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">6 wks</div>
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
                  With Bourarro Properties, you receive guaranteed rent every month at 85-100% of market value, 
                  with zero commission, no void periods, and all maintenance included. That's potentially 
                  <strong className="text-foreground"> £5,000+ more in your pocket annually</strong> compared to traditional letting agents.
                </p>
                <Button onClick={() => setLocation('/contact')} data-testid="button-top-pick-quote">
                  Get Your Free Quote <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Why Landlords Are Leaving Letting Agents</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Despite their widespread use, traditional letting agents have significant drawbacks that increasingly 
              drive landlords to seek alternatives. Here are the most common problems landlords experience:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentProblems.map((problem, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <problem.icon className="w-6 h-6 text-red-500 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{problem.title}</h3>
                        <p className="text-sm font-medium text-red-600 mb-1">{problem.problem}</p>
                        <p className="text-sm text-muted-foreground">{problem.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Letting Agent vs Guaranteed Rent: Full Comparison</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To understand why guaranteed rent is often the better choice, let's compare every aspect of both 
              approaches side by side:
            </p>
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
                    <td className="py-4 px-4 font-medium">Tenant Find Fee</td>
                    <td className="py-4 px-4 text-red-600">£200-500 each time</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">£0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Renewal Fee</td>
                    <td className="py-4 px-4 text-red-600">£50-150 each renewal</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">£0</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Void Periods</td>
                    <td className="py-4 px-4 text-red-600">Your risk - no income</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">Zero risk - always paid</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Rent Arrears</td>
                    <td className="py-4 px-4 text-red-600">Your risk</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">Provider's risk</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Maintenance</td>
                    <td className="py-4 px-4 text-red-600">Extra charges + markup</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">All included</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Contract Security</td>
                    <td className="py-4 px-4">Rolling monthly</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">3-5 years fixed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Income Predictability</td>
                    <td className="py-4 px-4 text-red-600">Variable</td>
                    <td className="py-4 px-4 bg-primary/5 text-green-600 font-semibold">100% guaranteed</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Your Involvement</td>
                    <td className="py-4 px-4">Some (decisions, issues)</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">None required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">All Your Alternatives to Letting Agents</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Beyond guaranteed rent, there are several other ways to manage your property without traditional 
              letting agents. Here's an honest assessment of each option:
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
                    <h3 className="text-xl font-bold text-foreground mb-2">{alt.name}</h3>
                    <p className="text-muted-foreground mb-4">{alt.description}</p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Advantages</p>
                        <ul className="space-y-1">
                          {alt.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Disadvantages</p>
                        <ul className="space-y-1">
                          {alt.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Best For</p>
                        <p className="text-sm text-muted-foreground">{alt.bestFor}</p>
                        {alt.recommended && (
                          <Button 
                            className="mt-4 w-full" 
                            onClick={() => setLocation('/contact')} 
                            data-testid={`button-alt-${index}`}
                          >
                            Get Quote
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Calculating Your Potential Savings</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              To understand the true value of switching from a letting agent, you need to calculate your actual 
              net returns. Here's how to compare:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-red-200 dark:border-red-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator className="w-5 h-5 text-red-500" />
                    <h3 className="text-xl font-bold text-foreground">With Letting Agent</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual rent (£1,500/mo)</span>
                      <span className="text-foreground">£18,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Management fee (12%)</span>
                      <span className="text-red-600">-£2,160</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenant find fee</span>
                      <span className="text-red-600">-£500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Void period (6 weeks)</span>
                      <span className="text-red-600">-£2,077</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maintenance (avg)</span>
                      <span className="text-red-600">-£800</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span className="text-foreground">Net Annual Income</span>
                      <span className="text-foreground">£12,463</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <h3 className="text-xl font-bold text-foreground">With Guaranteed Rent</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guaranteed rent (90%)</span>
                      <span className="text-foreground">£16,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Management fee</span>
                      <span className="text-green-600">£0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tenant find fee</span>
                      <span className="text-green-600">£0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Void periods</span>
                      <span className="text-green-600">£0 (covered)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Maintenance</span>
                      <span className="text-green-600">£0 (included)</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold">
                      <span className="text-foreground">Net Annual Income</span>
                      <span className="text-green-600">£16,200</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-lg font-bold text-foreground">
                    Annual Savings: <span className="text-green-600">£3,737</span>
                  </p>
                  <p className="text-muted-foreground">
                    That's <strong className="text-foreground">30% more net income</strong> with guaranteed rent versus a traditional letting agent, 
                    plus complete peace of mind and zero time investment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Making the Switch: What to Expect</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              If you're currently with a letting agent and considering guaranteed rent, here's what the transition 
              process typically looks like:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Check Your Agent Contract</h3>
                  <p className="text-muted-foreground">
                    Review your current management agreement for notice periods and any early termination clauses. 
                    Most contracts require 1-3 months notice. If you're mid-tenancy, you may need to wait until 
                    the current tenancy ends.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Get a Guaranteed Rent Quote</h3>
                  <p className="text-muted-foreground">
                    Contact a guaranteed rent provider for a no-obligation assessment. They'll evaluate your 
                    property and provide a quote showing exactly what rent they can guarantee. This typically 
                    takes 24-48 hours.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Compare the Numbers</h3>
                  <p className="text-muted-foreground">
                    Calculate your true net returns under both scenarios, including all fees and void period risk. 
                    Most landlords find guaranteed rent provides equal or better returns with zero hassle.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Give Notice to Your Agent</h3>
                  <p className="text-muted-foreground">
                    Once you've decided to switch, provide formal notice to your current agent according to your 
                    contract terms. Arrange for handover of keys, documents, and any tenant deposits.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold">5</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Complete the Transition</h3>
                  <p className="text-muted-foreground">
                    The guaranteed rent provider will handle the property transition, inspect the property, 
                    and begin your guaranteed payments. From this point, your involvement is complete.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">When to Stay with Your Letting Agent</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              To be fair, there are some situations where traditional letting agents may still be the right choice:
            </p>
            <ul className="space-y-3 text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">You want maximum rent:</strong> If achieving the absolute highest 
                  possible rent is your priority and you're willing to accept void periods, agents may get marginally 
                  higher rents in some cases.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">You want to choose tenants:</strong> With guaranteed rent, the 
                  provider manages tenant selection. If having control over who lives in your property is essential, 
                  you may prefer traditional management.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Your agent is exceptional:</strong> If you have a genuinely 
                  excellent agent with low fees, fast response times, and minimal void periods, the comparison may be 
                  closer. These agents are rare, however.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-foreground">Short-term ownership:</strong> If you plan to sell within a year, 
                  the flexibility of month-to-month management may be more convenient than a multi-year guaranteed rent 
                  contract.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              For most landlords, however, the combination of guaranteed income, zero fees, and complete hands-off 
              management makes guaranteed rent the superior choice for long-term property investment.
            </p>
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

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Stop Paying Letting Agent Fees</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Switch to guaranteed rent and save thousands per year. Get your free quote in under 24 hours 
              and discover how much more you could be earning from your property investment.
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
