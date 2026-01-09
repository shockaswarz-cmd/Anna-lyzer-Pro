import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import BrandMark from "./BrandMark";
import { routes, navItems } from "@/lib/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (key: string) => {
    setIsMenuOpen(false);
    const route = routes[key];
    if (route) {
      setLocation(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6">
        <motion.button
          onClick={() => navigate('home')}
          className="flex items-center cursor-pointer group"
          data-testid="logo-home-link"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BrandMark />
        </motion.button>

        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3">
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm xl:text-[15px] font-medium group"
              data-testid={`nav-${key}`}
            >
              {label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-3/4" />
            </button>
          ))}
        </nav>

        <motion.div
          className="hidden lg:flex"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => navigate('contact')}
            className="group px-6 xl:px-7 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-400 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 text-sm xl:text-[15px]"
            data-testid="button-get-quote"
          >
            Request Quote
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300" />
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden relative w-10 h-10 hover:bg-white/10"
          data-testid="button-mobile-menu"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-x-0 top-20 bg-background/98 backdrop-blur-xl border-t border-white/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="container py-6 space-y-1 px-4 sm:px-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 }
                }
              }}
            >
              {navItems.map(({ key, label }) => (
                <motion.button
                  key={key}
                  onClick={() => navigate(key)}
                  className="block w-full text-left text-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300 py-3 px-4 rounded-lg"
                  data-testid={`mobile-nav-${key}`}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -20 }
                  }}
                >
                  {label}
                </motion.button>
              ))}
              <motion.div
                className="pt-4"
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 }
                }}
              >
                <Button
                  onClick={() => navigate('contact')}
                  className="w-full py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-all duration-300 shadow-lg shadow-primary/20"
                  data-testid="mobile-button-get-quote"
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
