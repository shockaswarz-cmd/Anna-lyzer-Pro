import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log('Mobile menu toggled:', !isMenuOpen);
  };

  const handleNavClick = (section: string) => {
    console.log(`Navigation clicked: ${section}`);
    setIsMenuOpen(false);
  };

  const handleGetQuote = () => {
    console.log('Get Quote button clicked');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">B</span>
          </div>
          <span className="font-bold text-xl text-foreground">Bourarro Properties</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
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

        {/* CTA Button - Desktop */}
        <Button 
          onClick={handleGetQuote}
          className="hidden md:flex"
          data-testid="button-get-quote"
        >
          Get Your Quote
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
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
              className="w-full mt-4"
              data-testid="mobile-button-get-quote"
            >
              Get Your Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}