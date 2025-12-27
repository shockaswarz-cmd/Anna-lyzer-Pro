import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import BrandMark from "./BrandMark";
import { routes, socialLinks, contactInfo } from "@/lib/navigation";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
    </footer>
  );
}
