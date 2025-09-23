import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import bourrarroLogo from "@assets/Properties (1)_1758478693104.png";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [, setLocation] = useLocation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', newsletterEmail);
    // TODO: Remove mock functionality - replace with actual newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail("");
  };

  const handleLinkClick = (link: string) => {
    console.log(`Footer link clicked: ${link}`);
    
    // Navigate to appropriate sections or pages
    switch(link) {
      case 'home':
        setLocation('/');
        break;
      case 'services':
        setLocation('/');
        setTimeout(() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'about':
        setLocation('/');
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'contact':
        setLocation('/');
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        break;
      case 'privacy':
        setLocation('/privacy-policy');
        break;
      case 'terms':
        setLocation('/terms-conditions');
        break;
      case 'cookies':
        setLocation('/cookie-policy');
        break;
      default:
        break;
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Social media clicked: ${platform}`);
    
    switch(platform) {
      case 'linkedin':
        window.open('https://www.linkedin.com/company/23675412/admin/dashboard/', '_blank');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/Bourarropropertiesltd/', '_blank');
        break;
      // Add other social media links here as needed
      default:
        break;
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={bourrarroLogo} 
                alt="Bourarro Properties" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Professional property management with guaranteed rent services. 
              Transforming property investment for landlords across the UK.
            </p>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('facebook')}
                className="text-muted-foreground hover:text-foreground"
                data-testid="social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('twitter')}
                className="text-muted-foreground hover:text-foreground"
                data-testid="social-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('linkedin')}
                className="text-muted-foreground hover:text-foreground"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSocialClick('instagram')}
                className="text-muted-foreground hover:text-foreground"
                data-testid="social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleLinkClick('home')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-home"
              >
                Home
              </button>
              <button 
                onClick={() => handleLinkClick('services')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-services"
              >
                Services
              </button>
              <button 
                onClick={() => handleLinkClick('about')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-about"
              >
                About Us
              </button>
              <button 
                onClick={() => handleLinkClick('faq')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-link-faq"
              >
                FAQ
              </button>
              <button 
                onClick={() => handleLinkClick('contact')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
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
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-service-guaranteed-rent"
              >
                Guaranteed Rent
              </button>
              <button 
                onClick={() => handleLinkClick('property-management')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-service-management"
              >
                Property Management
              </button>
              <button 
                onClick={() => handleLinkClick('maintenance')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-service-maintenance"
              >
                Maintenance Services
              </button>
              <button 
                onClick={() => handleLinkClick('legal-compliance')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-service-legal"
              >
                Legal Compliance
              </button>
              <button 
                onClick={() => handleLinkClick('portfolio-advice')}
                className="block text-muted-foreground hover:text-foreground transition-colors"
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
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Info@Bourarroproperties.co.uk</span>
              </div>
              <div className="flex items-center gap-3" data-testid="footer-contact-phone">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">07435549937</span>
              </div>
              <div className="flex items-center gap-3" data-testid="footer-contact-address">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Unit 4536, 182-184 High Street North, London, England, E6 2JA, United Kingdom</span>
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
                  className="bg-muted/50 border-border text-foreground placeholder:text-muted-foreground"
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
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Bourarro Properties. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button 
                onClick={() => handleLinkClick('privacy')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-legal-privacy"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('terms')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-legal-terms"
              >
                Terms & Conditions
              </button>
              <button 
                onClick={() => handleLinkClick('cookies')}
                className="text-muted-foreground hover:text-foreground transition-colors"
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