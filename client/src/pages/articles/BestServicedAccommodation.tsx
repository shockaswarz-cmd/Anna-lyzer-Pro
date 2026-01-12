import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, ArrowRight, Home, Briefcase, Users, HelpCircle, MapPin, Wifi, UtensilsCrossed, ShieldCheck, Clock, Phone, Calendar, Building, Car } from "lucide-react";
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

const amenities = [
  { icon: Wifi, name: "High-Speed WiFi", description: "Essential for business and leisure guests" },
  { icon: UtensilsCrossed, name: "Fully Equipped Kitchen", description: "Home cooking convenience for longer stays" },
  { icon: ShieldCheck, name: "Professional Cleaning", description: "Hotel-standard cleanliness guaranteed" },
  { icon: Car, name: "Parking Available", description: "On-site or nearby parking options" },
];

const faqs = [
  {
    question: "What is the difference between serviced accommodation and a hotel?",
    answer: "Serviced accommodation offers self-contained living spaces with full kitchens, living areas, and often multiple bedrooms, making them ideal for longer stays or groups. Unlike hotels, you have complete privacy and the ability to prepare meals. However, quality serviced accommodation still provides hotel-style amenities like professional cleaning, fresh linens, and 24/7 support."
  },
  {
    question: "How long can I stay in serviced accommodation?",
    answer: "Serviced accommodation is extremely flexible. You can book from a single night up to many months. For stays over 28 days, you may benefit from reduced rates and the accommodation may be treated differently for tax purposes. Many business travellers and relocating families stay for 3-6 months or longer."
  },
  {
    question: "Is serviced accommodation suitable for families?",
    answer: "Absolutely. Serviced apartments are often the best choice for families due to separate bedrooms, full kitchens for preparing children's meals, living space for relaxation, and laundry facilities. They provide much more space and flexibility than hotel rooms at comparable or better prices."
  },
  {
    question: "What should I look for when booking serviced accommodation?",
    answer: "Key factors include: professional management with 24/7 support, clear pricing without hidden fees, quality furnishings and equipment, good location for your needs, verified reviews from previous guests, and flexible cancellation policies. For business stays, also check WiFi speeds and workspace availability."
  },
  {
    question: "How does pricing work for serviced accommodation?",
    answer: "Most serviced accommodation is priced per night, with discounts for weekly or monthly stays. Prices typically include all utilities, WiFi, and cleaning. Unlike hotels, there are usually no resort fees or mandatory service charges. Always confirm what's included before booking."
  },
  {
    question: "Can I book serviced accommodation for my company's employees?",
    answer: "Yes, corporate booking is common and often comes with benefits like dedicated account management, flexible cancellation, direct billing, and preferential rates. Many companies use serviced accommodation for project teams, relocating staff, or regular business travellers as it's more cost-effective than hotels for extended stays."
  }
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
        title="Best Serviced Accommodation Providers UK 2025 | Expert Guide"
        description="Compare the best serviced accommodation providers in the UK for 2025. Find professionally managed apartments with premium amenities for business and leisure stays."
        keywords="best serviced accommodation UK, serviced apartments London, corporate housing UK, short term rentals, business accommodation, serviced accommodation providers"
        ogTitle="Best Serviced Accommodation Providers UK 2025"
        ogDescription="Expert comparison of UK's top serviced accommodation providers. Find premium apartments with professional management."
        canonicalUrl="https://bourarroproperties.uk/best/serviced-accommodation"
        ogUrl="https://bourarroproperties.uk/best/serviced-accommodation"
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
              Best Serviced Accommodation Providers UK 2025
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              Whether you're travelling for business, relocating temporarily, or seeking a home-away-from-home experience, 
              choosing the right serviced accommodation provider makes all the difference. We've compared the top UK options 
              to help you find the perfect stay.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The UK serviced accommodation market has grown dramatically in recent years, driven by changing work patterns, 
              increasing business travel, and guests seeking more flexible alternatives to traditional hotels. From corporate 
              housing specialists to peer-to-peer platforms, the options can be overwhelming. This comprehensive guide cuts 
              through the noise to help you find accommodation that meets your specific needs, whether that's a one-night 
              business trip or a six-month relocation project.
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">Our Top Pick: Bourarro Properties</h2>
                <p className="text-muted-foreground mb-4">
                  Bourarro Properties offers premium serviced apartments across London and Essex, 
                  with professional management, 24/7 guest support, and exceptional attention to detail. 
                  Whether you need a studio for a week or a family home for six months, their portfolio 
                  offers flexible options with consistent quality.
                </p>
                <Button onClick={() => setLocation('/properties')} data-testid="button-top-pick-view">
                  View Properties <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What is Serviced Accommodation?</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Serviced accommodation refers to fully furnished properties available for short to medium-term rental, 
              complete with hotel-style services such as cleaning, linen changes, and guest support. Unlike traditional 
              rentals, serviced accommodation is designed for flexibility, allowing guests to book from just one night 
              to several months.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The concept bridges the gap between hotels and long-term rentals. You get the space and privacy of an 
              apartment or house, with the convenience and service standards of a hotel. Most serviced accommodations 
              include fully equipped kitchens, separate living and sleeping areas, laundry facilities, and modern 
              amenities like high-speed WiFi.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Quality varies enormously across the market. At the premium end, providers like Bourarro Properties offer 
              professionally designed interiors, hotel-quality linens, and responsive 24/7 support. At the other extreme, 
              peer-to-peer platforms may list properties with inconsistent standards and limited recourse if problems arise.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Who Uses Serviced Accommodation?</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Serviced accommodation appeals to a wide range of guests, each with different needs and priorities. 
              Understanding who uses these properties helps explain why the market has grown so rapidly:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Business Travellers</h3>
                  <p className="text-sm text-muted-foreground">Professionals needing comfortable, productive stays during work trips. They value reliable WiFi, workspace, and the ability to maintain their routines.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Home className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Relocating Families</h3>
                  <p className="text-sm text-muted-foreground">Families in transition during property purchases, renovations, or job relocations. They need space, normality, and the comforts of home.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Project Teams</h3>
                  <p className="text-sm text-muted-foreground">Corporate groups working on extended projects who need practical accommodation near work sites or client offices.</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Building className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Insurance Claimants</h3>
                  <p className="text-sm text-muted-foreground">Homeowners displaced by floods, fires, or other disasters who need comfortable temporary housing while their property is repaired.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Extended Holiday Guests</h3>
                  <p className="text-sm text-muted-foreground">Travellers seeking more authentic experiences than hotels offer, with the space to truly settle in and explore an area.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Medical Visitors</h3>
                  <p className="text-sm text-muted-foreground">Patients and families needing accommodation near hospitals for treatment, often requiring stays of several weeks.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">UK Serviced Accommodation Compared</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We've analysed the major serviced accommodation options in the UK across key factors including quality 
              consistency, service levels, pricing transparency, and overall guest experience:
            </p>
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
            <h2 className="text-3xl font-bold text-foreground mb-6">Professional Operators vs Peer-to-Peer Platforms</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              One of the biggest decisions when booking serviced accommodation is whether to use a professional operator 
              or a peer-to-peer platform. Each has distinct advantages and disadvantages:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Professional Operators
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Consistent quality:</strong> Properties are maintained to uniform standards with regular inspections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Professional support:</strong> Dedicated teams available 24/7 to resolve any issues quickly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Clear pricing:</strong> All-inclusive rates without hidden fees or cleaning charges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Corporate accounts:</strong> Easy booking and billing for business travellers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Reliable experience:</strong> Know exactly what you're getting before you arrive</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    Peer-to-Peer Platforms
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Wide selection:</strong> Many properties in most locations to choose from</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Unique properties:</strong> Access to unusual or character properties</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Variable quality:</strong> Standards depend entirely on individual hosts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Platform fees:</strong> Both guests and hosts pay significant commission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                      <span><strong className="text-foreground">Limited recourse:</strong> Problems can be difficult to resolve</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              For business travel, relocations, and any situation where reliability matters, professional operators 
              typically offer the better experience. Peer-to-peer platforms may suit leisure travellers seeking unique 
              properties who have time to research individual listings thoroughly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Essential Amenities in Quality Serviced Accommodation</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The best serviced accommodation provides everything you need for a comfortable, productive stay. 
              Here's what to expect from quality providers:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <amenity.icon className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground">{amenity.name}</h3>
                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">Beyond the basics, premium serviced accommodation often includes:</p>
              <ul className="space-y-2 list-disc pl-6">
                <li><strong className="text-foreground">Smart TV with streaming services</strong> for entertainment and relaxation</li>
                <li><strong className="text-foreground">Quality bed linens and towels</strong> changed regularly during your stay</li>
                <li><strong className="text-foreground">Washer and dryer</strong> essential for longer stays</li>
                <li><strong className="text-foreground">Dedicated workspace</strong> for remote working guests</li>
                <li><strong className="text-foreground">Coffee machine and kitchen essentials</strong> for self-catering convenience</li>
                <li><strong className="text-foreground">Iron and ironing board</strong> for business attire</li>
                <li><strong className="text-foreground">Secure building access</strong> for peace of mind</li>
                <li><strong className="text-foreground">Air conditioning or heating</strong> for year-round comfort</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">What to Look for in Serviced Accommodation</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Professional Management</h3>
                  <p className="text-muted-foreground">
                    Look for operators with dedicated support teams available around the clock. When issues arise at 
                    midnight, you need to know someone will respond. Professional operators should provide clear 
                    contact details and response time guarantees.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Quality Furnishings</h3>
                  <p className="text-muted-foreground">
                    Premium providers invest in quality beds, linens, and furnishings that make a real difference 
                    to your stay. Look for photos showing modern, well-maintained interiors. Cheap furniture and 
                    worn furnishings suggest a provider cutting corners elsewhere too.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Flexible Booking</h3>
                  <p className="text-muted-foreground">
                    The best operators offer options for both short and extended stays with fair cancellation 
                    policies. For business travel especially, look for flexibility around dates and the ability 
                    to extend stays if needed.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Clear Pricing</h3>
                  <p className="text-muted-foreground">
                    Reputable providers show all-inclusive pricing upfront. Be wary of operators who add cleaning 
                    fees, service charges, or other extras at checkout. The price you see should be the price you pay.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Prime Location</h3>
                  <p className="text-muted-foreground">
                    Consider proximity to your work location, transport links, and local amenities. The best 
                    serviced accommodation is often in central locations or well-connected residential areas 
                    that offer both convenience and a pleasant living environment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Serviced Accommodation vs Hotels: A Cost Comparison</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              For stays beyond a few nights, serviced accommodation typically offers better value than hotels. 
              Here's why the economics favour serviced apartments:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-4 px-4">Factor</th>
                    <th className="text-left py-4 px-4">Business Hotel</th>
                    <th className="text-left py-4 px-4 bg-primary/5">Serviced Apartment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Space</td>
                    <td className="py-4 px-4">20-30 sqm room</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">50-100+ sqm apartment</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Kitchen</td>
                    <td className="py-4 px-4">None or kitchenette</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">Full kitchen</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Meals</td>
                    <td className="py-4 px-4">Restaurant required (£30-60/day)</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">Self-catering (£10-20/day)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Laundry</td>
                    <td className="py-4 px-4">Hotel service (£50+/week)</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">In-unit washer/dryer</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Weekly Rate</td>
                    <td className="py-4 px-4">£150-250/night</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">£100-180/night (discounted)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Monthly Rate</td>
                    <td className="py-4 px-4">£4,000-7,000</td>
                    <td className="py-4 px-4 bg-primary/5 font-semibold">£2,500-4,500 (significant discount)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              For extended stays, the savings compound. A one-month stay in serviced accommodation versus a hotel 
              can save £2,000-3,000, even before accounting for meal and laundry savings. For corporate clients 
              booking multiple rooms or extended projects, the economics are even more compelling.
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

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-6">Booking Serviced Accommodation: Tips for Best Results</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <ol className="space-y-4 list-decimal pl-6">
                <li>
                  <strong className="text-foreground">Book direct when possible:</strong> Professional operators 
                  often offer better rates when you book directly rather than through third-party platforms. 
                  You may also get more flexibility on terms and better support.
                </li>
                <li>
                  <strong className="text-foreground">Ask about extended stay discounts:</strong> Most providers 
                  offer significant discounts for weekly or monthly bookings. Don't assume the nightly rate is fixed.
                </li>
                <li>
                  <strong className="text-foreground">Check reviews carefully:</strong> Look for recent reviews 
                  that mention cleanliness, communication, and problem resolution. How a provider handles issues 
                  matters as much as the initial experience.
                </li>
                <li>
                  <strong className="text-foreground">Confirm what's included:</strong> Ensure you understand 
                  exactly what's included in the rate: utilities, WiFi, cleaning, linen changes, and any other 
                  services. Get this in writing before booking.
                </li>
                <li>
                  <strong className="text-foreground">Consider location carefully:</strong> A slightly cheaper 
                  property in an inconvenient location may cost more in transport time and stress. Prioritise 
                  accessibility for your specific needs.
                </li>
                <li>
                  <strong className="text-foreground">Ask about flexible cancellation:</strong> Especially for 
                  business travel, flexible cancellation policies provide valuable peace of mind if plans change.
                </li>
              </ol>
            </div>
          </section>

          <section className="bg-secondary/50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Book Your Stay Today</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Experience premium serviced accommodation with Bourarro Properties. 
              Professional management, exceptional service, and unbeatable locations across London and Essex. 
              Whether you need a single night or a six-month stay, we have the perfect property for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setLocation('/properties')} data-testid="button-article-cta">
                View Available Properties <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setLocation('/contact')} data-testid="button-enquire">
                Make an Enquiry
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
