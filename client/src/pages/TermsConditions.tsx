import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function TermsConditions() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms & Conditions - Bourarro Properties | Guaranteed Rent Service Terms"
        description="Read Bourarro Properties' terms and conditions for our guaranteed rent services. Understand our service agreements, property management terms, and legal obligations."
        keywords="terms conditions, guaranteed rent terms, property management agreement, service terms, Bourarro Properties, rental guarantee conditions"
        canonicalUrl="https://bourarroproperties.co.uk/terms-conditions"
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
              
              <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <Card>
              <CardContent className="prose prose-lg max-w-none p-8">
                
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-6">
                  These Terms and Conditions ("Terms") govern your use of the Bourarro Properties website and services. 
                  By accessing our website or using our guaranteed rent and property investment services, you agree to be bound by these Terms.
                </p>
                
                <p className="text-muted-foreground mb-6">
                  Bourarro Properties is a property investment and management company registered in England and Wales. 
                  Our registered address is Unit 4536, 182-184 High Street North, London, England, E6 2JA, United Kingdom.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Our Services</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Guaranteed Rent Services</h3>
                <ul className="text-muted-foreground mb-4 space-y-2">
                  <li>• Guaranteed monthly rental income for 3-5 year terms</li>
                  <li>• Professional property management and maintenance</li>
                  <li>• Tenant sourcing and management</li>
                  <li>• Property valuation and market analysis services</li>
                  <li>• Legal compliance and safety certification management</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Serviced Accommodation</h3>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Short-term property rentals through our Lodgify platform</li>
                  <li>• Fully furnished and managed accommodations</li>
                  <li>• Professional cleaning and maintenance services</li>
                  <li>• 24/7 guest support and management</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Guaranteed Rent Terms</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Rental Guarantee</h3>
                <p className="text-muted-foreground mb-4">
                  Our guaranteed rent service provides fixed monthly payments regardless of property occupancy. 
                  The guaranteed amount is typically 80-90% of current market rent, determined through professional valuation.
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Contract Terms</h3>
                <ul className="text-muted-foreground mb-4 space-y-2">
                  <li>• Minimum contract period: 3 years (extendable to 5 years)</li>
                  <li>• Monthly payments made by standing order on agreed dates</li>
                  <li>• No commission fees or hidden charges</li>
                  <li>• Annual rent reviews based on market conditions</li>
                  <li>• 90-day notice period for contract termination</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Property Requirements</h3>
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Property must meet all UK safety and legal standards</li>
                  <li>• Current EPC rating, gas safety certificates required</li>
                  <li>• Property condition assessment and any required improvements</li>
                  <li>• Valid buildings insurance and landlord liability cover</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Your Responsibilities as Property Owner</h2>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Maintain valid landlord insurance and safety certificates</li>
                  <li>• Ensure property meets all legal compliance requirements</li>
                  <li>• Provide accurate property information and documentation</li>
                  <li>• Allow reasonable access for inspections and maintenance</li>
                  <li>• Comply with Right to Rent and other UK landlord obligations</li>
                  <li>• Maintain property exterior and structural elements</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Our Responsibilities</h2>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• Guarantee monthly rent payments as agreed in contract</li>
                  <li>• Provide professional property management services</li>
                  <li>• Handle all tenant sourcing, screening, and management</li>
                  <li>• Arrange necessary maintenance and repairs</li>
                  <li>• Ensure legal compliance for all tenancy agreements</li>
                  <li>• Return property in good condition at contract end</li>
                  <li>• Provide regular property condition reports</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Website Use</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">Acceptable Use</h3>
                <p className="text-muted-foreground mb-4">You agree to use our website only for lawful purposes and in accordance with these Terms. You must not:</p>
                
                <ul className="text-muted-foreground mb-4 space-y-2">
                  <li>• Use the website for any fraudulent or unlawful purposes</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Transmit harmful code, viruses, or malicious software</li>
                  <li>• Infringe upon intellectual property rights</li>
                  <li>• Submit false or misleading information</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3">Quote Requests</h3>
                <p className="text-muted-foreground mb-6">
                  Quote requests submitted through our website are not binding offers. All quotes are subject to 
                  property inspection, market analysis, and contract negotiation. We reserve the right to decline 
                  any property that does not meet our investment criteria.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Booking Terms (Serviced Accommodation)</h2>
                
                <ul className="text-muted-foreground mb-6 space-y-2">
                  <li>• All bookings are processed through our Lodgify platform</li>
                  <li>• Payment required at time of booking confirmation</li>
                  <li>• Cancellation policies apply as stated in booking confirmation</li>
                  <li>• Check-in and check-out times must be adhered to</li>
                  <li>• Property damage or excessive cleaning fees may apply</li>
                  <li>• Maximum occupancy limits must not be exceeded</li>
                </ul>

                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
                <p className="text-muted-foreground mb-6">
                  All content on this website, including text, graphics, logos, images, and software, is owned by 
                  Bourarro Properties or our licensors and is protected by UK and international copyright laws. 
                  You may not reproduce, distribute, or create derivative works without our written permission.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-6">
                  To the fullest extent permitted by law, Bourarro Properties shall not be liable for any indirect, 
                  incidental, special, or consequential damages arising from your use of our services or website. 
                  Our total liability shall not exceed the amount paid by you for our services in the 12 months 
                  preceding the claim.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Force Majeure</h2>
                <p className="text-muted-foreground mb-6">
                  We shall not be liable for any failure to perform our obligations due to circumstances beyond our 
                  reasonable control, including but not limited to acts of God, government regulations, pandemic 
                  restrictions, strikes, or natural disasters.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Termination</h2>
                <p className="text-muted-foreground mb-6">
                  We may terminate or suspend your access to our website and services immediately, without notice, 
                  if you breach these Terms. Property management contracts have separate termination clauses as 
                  specified in individual agreements.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Data Protection</h2>
                <p className="text-muted-foreground mb-6">
                  Your privacy is important to us. Please review our 
                  <a href="/privacy-policy" className="text-primary hover:underline"> Privacy Policy</a> to understand 
                  how we collect, use, and protect your personal information in accordance with UK GDPR.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Governing Law</h2>
                <p className="text-muted-foreground mb-6">
                  These Terms are governed by English law and you agree to submit to the exclusive jurisdiction of 
                  the English courts for any disputes arising from these Terms or your use of our services.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">14. Changes to Terms</h2>
                <p className="text-muted-foreground mb-6">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
                  posting on our website. Your continued use of our services constitutes acceptance of any changes.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">15. Severability</h2>
                <p className="text-muted-foreground mb-6">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will remain 
                  in full force and effect.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mb-4">16. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2"><strong>Bourarro Properties</strong></p>
                  <p className="text-muted-foreground mb-2">Unit 4536, 182-184 High Street North</p>
                  <p className="text-muted-foreground mb-2">London, England, E6 2JA, United Kingdom</p>
                  <p className="text-muted-foreground mb-2">Email: Info@Bourarroproperties.co.uk</p>
                  <p className="text-muted-foreground">Phone: 07435549937</p>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}