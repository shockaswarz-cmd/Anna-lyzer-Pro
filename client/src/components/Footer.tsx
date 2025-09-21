import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', newsletterEmail);
    // TODO: Remove mock functionality - replace with actual newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail("");
  };

  const handleLinkClick = (link: string) => {
    console.log(`Footer link clicked: ${link}`);
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Social media clicked: ${platform}`);
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-sm">B</span>
              </div>
              <span className="font-bold text-xl">Bourarro Properties</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Professional property management with guaranteed rent services. 
              Transforming property investment for landlords across the UK.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('facebook')}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="social-facebook"
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('twitter')}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('linkedin')}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('instagram')}
                className="text-primary-foreground hover:bg-primary-foreground/10"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleLinkClick('home')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-home"
              >
                Home
              </button>
              <button 
                onClick={() => handleLinkClick('services')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-services"
              >
                Services
              </button>
              <button 
                onClick={() => handleLinkClick('about')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-about"
              >
                About Us
              </button>
              <button 
                onClick={() => handleLinkClick('faq')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-faq"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleLinkClick('contact')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-link-contact"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Services</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleLinkClick('guaranteed-rent')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-service-guaranteed-rent"
              >
                Guaranteed Rent
              </button>
              <button 
                onClick={() => handleLinkClick('property-management')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-service-management"
              >
                Property Management
              </button>
              <button 
                onClick={() => handleLinkClick('maintenance')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-service-maintenance"
              >
                Maintenance Services
              </button>
              <button 
                onClick={() => handleLinkClick('legal-compliance')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-service-legal"
              >
                Legal Compliance
              </button>
              <button 
                onClick={() => handleLinkClick('portfolio-advice')}
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                data-testid="footer-service-advice"
              >
                Portfolio Advice
              </button>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3" data-testid="footer-contact-email">
                <Mail className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">info@bourarro.com</span>
              </div>
              <div className="flex items-center gap-3" data-testid="footer-contact-phone">
                <Phone className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">0800 123 4567</span>
              </div>
              <div className="flex items-center gap-3" data-testid="footer-contact-address">
                <MapPin className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-sm text-primary-foreground/80">London, UK</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2" data-testid="newsletter-form">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                  required
                  data-testid="input-newsletter"
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  size="sm"
                  data-testid="button-newsletter"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/60">
              © 2024 Bourarro Properties. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => handleLinkClick('privacy')}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                data-testid="footer-legal-privacy"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('terms')}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                data-testid="footer-legal-terms"
              >
                Terms & Conditions
              </button>
              <button 
                onClick={() => handleLinkClick('cookies')}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                data-testid="footer-legal-cookies"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}