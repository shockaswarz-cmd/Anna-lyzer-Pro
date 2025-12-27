import { Button } from "@/components/ui/button";
import { Menu, X, Home } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import bourrarroLogo from "@assets/Properties (1)_1758478693104.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Mobile menu toggled:', !isMenuOpen);
  };

  const handleNavClick = (section: string) => {
    setIsMenuOpen(false);
    
    const routes: Record<string, string> = {
      'home': '/',
      'services': '/services',
      'accommodations': '/properties',
      'about': '/about',
      'investors': '/investors',
      'faq': '/faq',
      'contact': '/contact'
    };
    
    const route = routes[section];
    if (route) {
      setLocation(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGetQuote = () => {
    setLocation('/contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95">
      <div className="container flex h-20 items-center justify-between px-6">
        {/* Luxury Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-4 cursor-pointer group"
          data-testid="logo-home-link"
        >
          <img 
            src={bourrarroLogo} 
            alt="Bourarro Properties - Property Investment" 
            className="h-10 w-auto opacity-90 transition-opacity group-hover:opacity-100 filter drop-shadow-sm"
          />
          <div className="hidden lg:block w-px h-8 bg-primary/30"></div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-foreground">Bour</span>
              <span className="text-primary">arro</span>
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              <Home className="w-3 h-3" />
              Properties
            </span>
          </div>
        </button>

        {/* Luxury Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
          <button 
            onClick={() => handleNavClick('home')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-home"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('services')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-services"
          >
            Services
          </button>
          <button 
            onClick={() => handleNavClick('accommodations')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-accommodations"
          >
            Properties
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-about"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('investors')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-investors"
          >
            Investors
          </button>
          <button 
            onClick={() => handleNavClick('faq')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-faq"
          >
            FAQ
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
            data-testid="nav-contact"
          >
            Contact
          </button>
        </nav>

        {/* Luxury CTA Button - Desktop */}
        <Button 
          onClick={handleGetQuote}
          className="hidden lg:flex px-6 xl:px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm xl:text-base"
          data-testid="button-get-quote"
        >
          Request Quote
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="lg:hidden"
          data-testid="button-mobile-menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Luxury Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-primary/20 bg-background/98 backdrop-blur-xl">
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
              onClick={() => handleNavClick('accommodations')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-accommodations"
            >
              Properties
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-about"
            >
              About
            </button>
            <button 
              onClick={() => handleNavClick('investors')}
              className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
              data-testid="mobile-nav-investors"
            >
              Investors
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