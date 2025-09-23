import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy - Bourarro Properties | Data Protection & GDPR Compliance"
        description="Read Bourarro Properties' comprehensive privacy policy. Learn how we protect your personal data, comply with GDPR, and handle information for our guaranteed rent services."
        keywords="privacy policy, data protection, GDPR compliance, personal data, Bourarro Properties, property investment privacy"
        canonicalUrl="https://bourarroproperties.co.uk/privacy-policy"
        ogUrl="https://bourarroproperties.co.uk/privacy-policy"
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
              
              <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <Card>
              <CardContent className="prose prose-lg max-w-none p-8">
                
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  Bourarro Properties ("we," "our," or "us") is committed to protecting your privacy and personal data. 
                  This Privacy Policy explains how we collect, use, process, and protect your information when you visit our website 
                  or use our guaranteed rent and property investment services.
                </p>
                
                <p className="text-muted-foreground mb-6">
                  We are located at Unit 4536, 182-184 High Street North, London, England, E6 2JA, United Kingdom. 
                  You can contact us at Info@Bourarroproperties.co.uk or 07435549937.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information You Provide</h3>
                <ul className="text-muted-foreground mb-4 space-y-2">
                  <li>• Contact details (name, email address, phone number, postal address)</li>
                  <li>• Property information (addresses, valuations, rental income details)</li>
                  <li>• Financial information (investment capacity, current rental income)</li>
                  <li>• Communication preferences and enquiry details</li>
                  <li>• Property viewing and booking information</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Technical Information</h3>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• IP address and device information</li>
                  <li>• Browser type and version</li>
                  <li>• Website usage analytics and cookies</li>
                  <li>• Page interaction and navigation patterns</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">We use your personal data for the following purposes:</p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Providing guaranteed rent quotes and property valuations</li>
                  <li>• Managing property investment services and agreements</li>
                  <li>• Processing property bookings through our serviced accommodation platform</li>
                  <li>• Communicating about our services and responding to enquiries</li>
                  <li>• Sending marketing communications (with your consent)</li>
                  <li>• Improving our website and services through analytics</li>
                  <li>• Complying with legal obligations and regulatory requirements</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Legal Basis for Processing</h2>
                <p className="text-muted-foreground mb-4">We process your personal data based on:</p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• <strong>Contract performance:</strong> To provide guaranteed rent services and property management</li>
                  <li>• <strong>Legitimate interests:</strong> To improve our services and communicate relevant opportunities</li>
                  <li>• <strong>Consent:</strong> For marketing communications and optional services</li>
                  <li>• <strong>Legal obligation:</strong> For regulatory compliance and tax reporting</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We may share your information with trusted third parties who help us provide our services:
                </p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Property valuation and data providers (for accurate market pricing)</li>
                  <li>• Email service providers (SendGrid for communications)</li>
                  <li>• Lodgify booking platform (for serviced accommodation bookings)</li>
                  <li>• Legal and professional advisors</li>
                  <li>• Government authorities when required by law</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
                <p className="text-muted-foreground mb-6">
                  We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy. 
                  Generally, we keep client information for 7 years after the end of our business relationship, 
                  in line with financial and regulatory requirements. Marketing data is retained until you opt out.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground mb-4">Under UK GDPR, you have the right to:</p>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Access your personal data and receive a copy</li>
                  <li>• Correct inaccurate or incomplete information</li>
                  <li>• Request deletion of your personal data</li>
                  <li>• Object to processing or request restriction</li>
                  <li>• Data portability (receive your data in a structured format)</li>
                  <li>• Withdraw consent for marketing communications</li>
                  <li>• Lodge a complaint with the ICO</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Security</h2>
                <p className="text-muted-foreground mb-6">
                  We implement appropriate technical and organizational measures to protect your personal data against 
                  unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, 
                  access controls, and regular security assessments.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Transfers</h2>
                <p className="text-muted-foreground mb-6">
                  Some of our service providers may be located outside the UK/EU. When we transfer data internationally, 
                  we ensure appropriate safeguards are in place, such as adequacy decisions or standard contractual clauses.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-6">
                  Our website uses cookies to enhance your experience and provide analytics. Please see our 
                  <a href="/cookie-policy" className="text-primary hover:underline"> Cookie Policy</a> for detailed information 
                  about what cookies we use and how to manage them.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Children's Privacy</h2>
                <p className="text-muted-foreground mb-6">
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                  personal information from children without appropriate parental consent.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Policy</h2>
                <p className="text-muted-foreground mb-6">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                  We will notify you of significant changes and update the "last modified" date at the top of this policy.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2"><strong>Bourarro Properties</strong></p>
                  <p className="text-muted-foreground mb-2">Unit 4536, 182-184 High Street North</p>
                  <p className="text-muted-foreground mb-2">London, England, E6 2JA, United Kingdom</p>
                  <p className="text-muted-foreground mb-2">Email: Info@Bourarroproperties.co.uk</p>
                  <p className="text-muted-foreground">Phone: 07435549937</p>
                </div>

                <p className="text-muted-foreground mt-6">
                  You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) 
                  at <a href="https://ico.org.uk" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a> 
                  if you believe we have not handled your personal data appropriately.
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