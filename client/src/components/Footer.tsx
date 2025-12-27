import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import BrandMark from "./BrandMark";
import { routes, socialLinks, contactInfo } from "@/lib/navigation";
import tpoLogo from "@assets/tpo_1766874696216.jpg";
import prsLogo from "@assets/PRS_1766874696215.jpg";
import cmpLogo from "@assets/CM-protect-Logo_1766874696212.jpg";

const quickLinks = [
  { key: 'home', label: 'Home' },
  { key: 'services', label: 'Services' },
  { key: 'about', label: 'About Us' },
  { key: 'faq', label: 'FAQ' },
  { key: 'contact', label: 'Contact' }
];

const serviceLinks = [
  { key: 'guaranteed-rent', label: 'Guaranteed Rent' },
  { key: 'property-management', label: 'Property Management' },
  { key: 'maintenance', label: 'Maintenance Services' },
  { key: 'legal-compliance', label: 'Legal Compliance' },
  { key: 'portfolio-advice', label: 'Portfolio Advice' }
];

const resourceLinks = [
  { key: 'best-guaranteed-rent', label: 'Best Guaranteed Rent Schemes' },
  { key: 'best-property-management', label: 'Best Property Management' },
  { key: 'alt-openrent', label: 'OpenRent Alternatives' },
  { key: 'alt-letting-agents', label: 'Letting Agent Alternatives' }
];

const legalLinks = [
  { key: 'privacy', label: 'Privacy' },
  { key: 'terms', label: 'Terms' },
  { key: 'cookies', label: 'Cookies' }
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [, setLocation] = useLocation();

  const navigate = (key: string) => {
    const route = routes[key];
    if (route) {
      setLocation(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail("");
  };

  const openSocial = (platform: keyof typeof socialLinks) => {
    window.open(socialLinks[platform], '_blank');
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4">
            <BrandMark />
            <p className="text-muted-foreground leading-relaxed">
              Professional property management with guaranteed rent services. 
              Transforming property investment for landlords across the UK.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => openSocial('linkedin')}
                className="text-muted-foreground hover:text-foreground"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => openSocial('instagram')}
                className="text-muted-foreground hover:text-foreground"
                data-testid="social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map(({ key, label }) => (
                <button 
                  key={key}
                  onClick={() => navigate(key)}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`footer-link-${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Services</h3>
            <div className="space-y-2">
              {serviceLinks.map(({ key, label }) => (
                <button 
                  key={key}
                  onClick={() => navigate(key)}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`footer-service-${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <div className="space-y-2">
              {resourceLinks.map(({ key, label }) => (
                <button 
                  key={key}
                  onClick={() => navigate(key)}
                  className="block text-muted-foreground hover:text-foreground transition-colors text-left"
                  data-testid={`footer-resource-${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3" data-testid="footer-contact-email">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3" data-testid="footer-contact-phone">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3" data-testid="footer-contact-address">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{contactInfo.fullAddress}</span>
              </div>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2" data-testid="newsletter-form">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
                  required
                  data-testid="input-newsletter"
                />
                <Button type="submit" variant="secondary" size="sm" data-testid="button-newsletter">
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
              <img 
                src={tpoLogo} 
                alt="The Property Ombudsman - Member" 
                className="h-14 sm:h-16 w-auto max-w-[120px] sm:max-w-[150px] object-cover rounded-md opacity-90 hover:opacity-100 transition-opacity"
                title="Member of The Property Ombudsman"
              />
              <img 
                src={prsLogo} 
                alt="Property Redress Scheme - Registered" 
                className="h-14 sm:h-16 w-auto max-w-[120px] sm:max-w-[150px] object-cover rounded-md opacity-90 hover:opacity-100 transition-opacity"
                title="Registered with Property Redress Scheme"
              />
              <img 
                src={cmpLogo} 
                alt="Client Money Protection - Certified" 
                className="h-14 sm:h-16 w-auto max-w-[120px] sm:max-w-[150px] object-cover rounded-full opacity-90 hover:opacity-100 transition-opacity"
                title="Client Money Protection Certified"
              />
            </div>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-border/50">
              <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
                © 2024 Bourarro Properties. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                {legalLinks.map(({ key, label }) => (
                  <button 
                    key={key}
                    onClick={() => navigate(key)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`footer-legal-${key}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
