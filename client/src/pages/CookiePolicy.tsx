import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function CookiePolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Cookie Policy - Bourarro Properties | Website Cookies & Tracking"
        description="Learn about Bourarro Properties' cookie policy. Understand how we use cookies to improve our property investment website and protect your privacy."
        keywords="cookie policy, website cookies, tracking cookies, privacy, web analytics, Bourarro Properties, property investment cookies"
        canonicalUrl="https://bourarroproperties.co.uk/cookie-policy"
        ogUrl="https://bourarroproperties.co.uk/cookie-policy"
      />
      <Header />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setLocation('/')}
                className="mb-4 text-muted-foreground hover:text-foreground"
                data-testid="button-back-home"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              
              <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <Card>
              <CardContent className="prose prose-lg max-w-none p-8">
                
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground mb-6">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                  They are widely used to make websites work more efficiently and to provide information to website owners 
                  about how visitors use their sites.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
                <p className="text-muted-foreground mb-6">
                  Bourarro Properties uses cookies to enhance your browsing experience, analyze website performance, 
                  and provide personalized property investment services. We only use cookies that are necessary for 
                  our website to function properly and to improve our services.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Essential Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  These cookies are necessary for our website to function properly. They enable basic features like 
                  page navigation, form submissions, and access to secure areas. Our website cannot function properly without these cookies.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Session management for quote requests</li>
                    <li>• Security tokens for form submissions</li>
                    <li>• Website theme preferences (light/dark mode)</li>
                    <li>• Language and region settings</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">Analytics Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  We use analytics cookies to understand how visitors interact with our website. This helps us improve 
                  our services and identify popular property types or investment preferences.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Google Analytics (tracking page views and user behavior)</li>
                    <li>• Property search preferences and filters used</li>
                    <li>• Quote calculator usage patterns</li>
                    <li>• Popular content and service pages</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">Functional Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  These cookies enable enhanced functionality and personalization, such as remembering your property 
                  search preferences or contact form information for future visits.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Saved property search criteria (location, price range)</li>
                    <li>• Recently viewed properties</li>
                    <li>• Contact form auto-fill information</li>
                    <li>• Newsletter subscription preferences</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">Marketing Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  With your consent, we may use marketing cookies to show you relevant property investment opportunities 
                  and personalized content based on your interests and browsing behavior.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Remarketing pixels for targeted advertising</li>
                    <li>• Social media integration (LinkedIn, Facebook)</li>
                    <li>• Email marketing campaign tracking</li>
                    <li>• Lead generation and conversion tracking</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Some cookies are placed by third-party services that appear on our pages. We use the following external services:
                </p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>Google Analytics:</strong> Website performance and user behavior analysis</li>
                  <li>• <strong>Lodgify:</strong> Serviced accommodation booking platform integration</li>
                  <li>• <strong>SendGrid:</strong> Email communication services</li>
                  <li>• <strong>Property Data APIs:</strong> Real-time UK property market information</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">5. How to Control Cookies</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Browser Settings</h3>
                <p className="text-muted-foreground mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. You can typically:
                </p>
                
                <ul className="text-muted-foreground mb-4 space-y-2">
                  <li>• View and delete cookies stored on your device</li>
                  <li>• Block all cookies or only third-party cookies</li>
                  <li>• Set preferences for specific websites</li>
                  <li>• Receive notifications when cookies are being set</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Browser-Specific Instructions</h3>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li>• <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li>• <strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li>• <strong>Edge:</strong> Settings → Site permissions → Cookies and site data</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Opt-Out Links</h3>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
                  <li>• Marketing cookies can be disabled through your browser settings</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookie Consent</h2>
                <p className="text-muted-foreground mb-6">
                  When you first visit our website, you'll see a cookie banner asking for your consent to use non-essential cookies. 
                  You can accept all cookies, reject optional cookies, or customize your preferences. You can change your 
                  cookie preferences at any time by clearing your browser cookies and revisiting our website.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Impact of Disabling Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  If you choose to disable cookies, some features of our website may not function properly:
                </p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Property search preferences may not be saved</li>
                  <li>• Quote calculator may require re-entering information</li>
                  <li>• Contact forms may not submit properly</li>
                  <li>• Website analytics will not track your visit</li>
                  <li>• Personalized content recommendations will not be available</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookie Retention</h2>
                <p className="text-muted-foreground mb-6">
                  Different cookies have different lifespans:
                </p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>Session cookies:</strong> Deleted when you close your browser</li>
                  <li>• <strong>Persistent cookies:</strong> Remain until expiry date or manual deletion</li>
                  <li>• <strong>Analytics cookies:</strong> Typically expire after 2 years</li>
                  <li>• <strong>Marketing cookies:</strong> Usually expire after 30-90 days</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Updates to Cookie Policy</h2>
                <p className="text-muted-foreground mb-6">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or legal requirements. 
                  When we make significant changes, we will update the "last modified" date at the top of this policy and 
                  may provide additional notice through our website.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2"><strong>Bourarro Properties</strong></p>
                  <p className="text-muted-foreground mb-2">Unit 4536, 182-184 High Street North</p>
                  <p className="text-muted-foreground mb-2">London, England, E6 2JA, United Kingdom</p>
                  <p className="text-muted-foreground mb-2">Email: Info@Bourarroproperties.co.uk</p>
                  <p className="text-muted-foreground">Phone: 07435549937</p>
                </div>

                <p className="text-muted-foreground mt-6">
                  For more information about cookies and online privacy, you can visit the Information Commissioner's Office at 
                  <a href="https://ico.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer"> ico.org.uk</a>.
                </p>

              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}