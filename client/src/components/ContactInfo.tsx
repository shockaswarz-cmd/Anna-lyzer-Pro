import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/navigation";

const benefits = [
  "Over 5+ years of property management experience",
  "100+ satisfied landlords in our portfolio",
  "100% transparent fees and contracts",
  "24/7 property management support"
];

export default function ContactInfo() {
  return (
    <div className="space-y-4 sm:space-y-8">
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-2xl">Contact Information</CardTitle>
          <CardDescription className="text-sm">
            Get in touch with our property experts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div className="flex items-center gap-3 sm:gap-4" data-testid="contact-email">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-sm sm:text-base">Email Us</div>
              <div className="text-muted-foreground text-xs sm:text-sm truncate">{contactInfo.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4" data-testid="contact-phone">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base">Call Us</div>
              <div className="text-muted-foreground text-xs sm:text-sm">{contactInfo.phone}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4" data-testid="contact-address">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base">Visit Us</div>
              <div className="text-muted-foreground text-xs sm:text-sm">
                {contactInfo.address}<br />
                {contactInfo.city}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Why Choose Bourarro Properties?</h3>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
