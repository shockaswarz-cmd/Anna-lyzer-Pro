import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import bourrarroLogo from "@assets/Properties (1)_1758478693104.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Mobile menu toggled:', !isMenuOpen);
  };

  const handleNavClick = (section: string) => {
    let sectionId = section;
    if (section === 'home') sectionId = '';
    if (section === 'about') sectionId = 'testimonials'; // Link About to testimonials section
    
    const element = sectionId ? document.getElementById(sectionId) : document.body;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleGetQuote = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95">
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Luxury Logo */}
        <div className="flex items-center space-x-4">
          <img 
            src={bourrarroLogo} 
            alt="Bourarro Properties - Luxury Investment" 
            className="h-12 w-auto filter brightness-110"
          />
          <div className="hidden lg:block w-px h-8 bg-primary/30"></div>
          <div className="hidden lg:block">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Premium Investments</span>
          </div>
        </div>

        {/* Luxury Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="nav-home"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('services')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="nav-services"
          >
            Services
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="nav-about"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('faq')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="nav-faq"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="nav-contact"
          >
            Contact
          </button>
        </nav>

        {/* Luxury CTA Button - Desktop */}
        <Button 
          onClick={handleGetQuote}
          className="hidden md:flex px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          data-testid="button-get-quote"
        >
          Request Quote
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden"
          data-testid="button-mobile-menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Luxury Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary/20 bg-background/98 backdrop-blur-xl">
          <div className="container py-6 space-y-4 px-6">
            <button 
              onClick={() => handleNavClick('home')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('services')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-services"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-about"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('faq')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-faq"
            >
              FAQ
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-contact"
            >
              Contact
            </button>
            <Button 
              onClick={handleGetQuote}
              className="w-full mt-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300"
              data-testid="mobile-button-get-quote"
            >
              Request Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}