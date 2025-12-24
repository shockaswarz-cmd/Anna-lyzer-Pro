import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Information</CardTitle>
          <CardDescription>
            Get in touch with our property experts for immediate assistance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4" data-testid="contact-email">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Email Us</div>
              <div className="text-muted-foreground">Info@Bourarroproperties.co.uk</div>
            </div>
          </div>

          <div className="flex items-center gap-4" data-testid="contact-phone">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Call Us</div>
              <div className="text-muted-foreground">07435549937</div>
            </div>
          </div>

          <div className="flex items-center gap-4" data-testid="contact-address">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Visit Us</div>
              <div className="text-muted-foreground">
                Unit 4536, 182-184 High Street North<br />
                London, England, E6 2JA, United Kingdom
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Why Choose Bourarro Properties?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>Over 5+ years of property management experience</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>100+ satisfied landlords in our portfolio</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>100% transparent fees and contracts</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <span>24/7 property management support</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
