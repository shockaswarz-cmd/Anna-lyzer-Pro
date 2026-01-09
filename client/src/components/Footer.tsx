import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowRight, Send } from "lucide-react";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import BrandMark from "./BrandMark";
import { routes, socialLinks, contactInfo } from "@/lib/navigation";
import tpoLogo from "../assets/tpo_1766874696216.jpg";
import prsLogo from "../assets/PRS_1766874696215.jpg";
import cmpLogo from "../assets/CM-protect-Logo_1766874696212.jpg";

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
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
  { key: 'cookies', label: 'Cookie Policy' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [, setLocation] = useLocation();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

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
    <footer className="bg-secondary border-t border-white/5 relative overflow-hidden" ref={footerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Brand Column */}
          <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
            <BrandMark />
            <p className="text-muted-foreground leading-relaxed text-sm">
              Professional property management with guaranteed rent services.
              Transforming property investment for landlords across the UK.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openSocial('linkedin')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary text-muted-foreground transition-all duration-300"
                data-testid="social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openSocial('instagram')}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary text-muted-foreground transition-all duration-300"
                data-testid="social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-5" variants={itemVariants}>
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => navigate(key)}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  data-testid={`footer-link-${key}`}
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div className="space-y-5" variants={itemVariants}>
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Our Services</h3>
            <div className="space-y-3">
              {serviceLinks.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => navigate(key)}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  data-testid={`footer-service-${key}`}
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div className="space-y-5" variants={itemVariants}>
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Resources</h3>
            <div className="space-y-3">
              {resourceLinks.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => navigate(key)}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 text-sm text-left"
                  data-testid={`footer-resource-${key}`}
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Stay Connected</h3>
            <div className="space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                data-testid="footer-contact-email"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a
                href={`tel:${contactInfo.phoneTel}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                data-testid="footer-contact-phone"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground" data-testid="footer-contact-address">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">{contactInfo.fullAddress}</span>
              </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-4" data-testid="newsletter-form">
              <h4 className="font-medium text-sm text-foreground">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
                  required
                  data-testid="input-newsletter"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 flex-shrink-0"
                  data-testid="button-newsletter"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="border-t border-white/5 mt-12 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              {[
                { src: tpoLogo, alt: "The Property Ombudsman - Member", title: "Member of The Property Ombudsman" },
                { src: prsLogo, alt: "Property Redress Scheme - Registered", title: "Registered with Property Redress Scheme" },
                { src: cmpLogo, alt: "Client Money Protection - Certified", title: "Client Money Protection Certified" }
              ].map((logo, index) => (
                <motion.img
                  key={index}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-16 sm:h-20 object-contain rounded-lg opacity-70 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0"
                  title={logo.title}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
              <div className="text-sm text-muted-foreground text-center md:text-left">
                © {new Date().getFullYear()} Bourarro Properties. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {legalLinks.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => navigate(key)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    data-testid={`footer-legal-${key}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
