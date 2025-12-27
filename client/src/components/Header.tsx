import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import BrandMark from "./BrandMark";
import { routes, navItems } from "@/lib/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navigate = (key: string) => {
    setIsMenuOpen(false);
    const route = routes[key];
    if (route) {
      setLocation(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/98 backdrop-blur-xl supports-[backdrop-filter]:bg-background/95">
      <div className="container flex h-20 items-center justify-between px-6">
        <button 
          onClick={() => navigate('home')}
          className="flex items-center cursor-pointer group"
          data-testid="logo-home-link"
        >
          <BrandMark />
        </button>

        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
          {navItems.map(({ key, label }) => (
            <button 
              key={key}
              onClick={() => navigate(key)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm xl:text-base"
              data-testid={`nav-${key}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <Button 
          onClick={() => navigate('contact')}
          className="hidden lg:flex px-6 xl:px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg text-sm xl:text-base"
          data-testid="button-get-quote"
        >
          Request Quote
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden"
          data-testid="button-mobile-menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-primary/20 bg-background/98 backdrop-blur-xl">
          <div className="container py-6 space-y-4 px-6">
            {navItems.map(({ key, label }) => (
              <button 
                key={key}
                onClick={() => navigate(key)}
                className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors py-2"
                data-testid={`mobile-nav-${key}`}
              >
                {label}
              </button>
            ))}
            <Button 
              onClick={() => navigate('contact')}
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
