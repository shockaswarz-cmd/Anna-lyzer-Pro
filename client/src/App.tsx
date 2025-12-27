import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

// Lazy load pages to reduce initial bundle size
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Properties = lazy(() => import("@/pages/Properties"));
const About = lazy(() => import("@/pages/About"));
const Investors = lazy(() => import("@/pages/Investors"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermsConditions"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const NotFound = lazy(() => import("@/pages/not-found"));

// SEO Article pages - lazy loaded for optimal bundle size
const BestGuaranteedRentSchemes = lazy(() => import("@/pages/articles/BestGuaranteedRentSchemes"));
const BestPropertyManagementLondon = lazy(() => import("@/pages/articles/BestPropertyManagementLondon"));
const BestServicedAccommodation = lazy(() => import("@/pages/articles/BestServicedAccommodation"));
const OpenRentAlternatives = lazy(() => import("@/pages/articles/OpenRentAlternatives"));
const LettingAgentAlternatives = lazy(() => import("@/pages/articles/LettingAgentAlternatives"));

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/properties" component={Properties} />
        <Route path="/about" component={About} />
        <Route path="/investors" component={Investors} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-conditions" component={TermsConditions} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        {/* SEO Article Routes */}
        <Route path="/best/guaranteed-rent-schemes" component={BestGuaranteedRentSchemes} />
        <Route path="/best/property-management-london" component={BestPropertyManagementLondon} />
        <Route path="/best/serviced-accommodation" component={BestServicedAccommodation} />
        <Route path="/alternatives/openrent" component={OpenRentAlternatives} />
        <Route path="/alternatives/letting-agents" component={LettingAgentAlternatives} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
