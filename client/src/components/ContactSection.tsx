import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Calculator } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    propertyAddress: "",
    currentRent: "",
    message: ""
  });

  const [estimatedRent, setEstimatedRent] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Form field updated: ${field} = ${value}`);
  };

  const calculateRent = () => {
    // Mock calculation based on current rent
    const current = parseFloat(formData.currentRent) || 0;
    const estimated = Math.round(current * 1.15); // 15% increase simulation
    setEstimatedRent(estimated);
    console.log('Rent calculation triggered:', { current, estimated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // TODO: Remove mock functionality - replace with actual form submission
    alert('Thank you for your enquiry! We will contact you within 24 hours.');
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get Your Guaranteed Rent Quote
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your journey to stress-free property investment with guaranteed monthly rent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Request Your Quote</CardTitle>
              <CardDescription>
                Fill in your details for a guaranteed rent estimate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Your phone number"
                    required
                    data-testid="input-phone"
                  />
                </div>

                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger data-testid="select-property-type">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio Apartment</SelectItem>
                      <SelectItem value="1bed">1 Bedroom</SelectItem>
                      <SelectItem value="2bed">2 Bedroom</SelectItem>
                      <SelectItem value="3bed">3 Bedroom</SelectItem>
                      <SelectItem value="4bed">4+ Bedroom</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                    placeholder="Full property address including postcode"
                    required
                    data-testid="input-address"
                  />
                </div>

                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="currentRent">Current Monthly Rent (£)</Label>
                    <Input
                      id="currentRent"
                      type="number"
                      value={formData.currentRent}
                      onChange={(e) => handleInputChange("currentRent", e.target.value)}
                      placeholder="1500"
                      data-testid="input-current-rent"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={calculateRent}
                    className="gap-2"
                    data-testid="button-calculate"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculate
                  </Button>
                </div>

                {estimatedRent && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4" data-testid="rent-estimate">
                    <p className="text-sm text-muted-foreground mb-1">Estimated Guaranteed Rent:</p>
                    <p className="text-2xl font-bold text-primary">£{estimatedRent}/month</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      *This is an estimate. Final rent guaranteed after property assessment.
                    </p>
                  </div>
                )}

                <div>
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Tell us about your property, investment goals, or any specific requirements..."
                    rows={4}
                    data-testid="input-message"
                  />
                </div>

                <Button type="submit" className="w-full text-lg py-6" data-testid="button-submit">
                  Get My Guaranteed Rent Quote
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
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
                    <div className="text-muted-foreground">info@bourarro.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4" data-testid="contact-phone">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-muted-foreground">0800 123 4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-4" data-testid="contact-address">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Visit Us</div>
                    <div className="text-muted-foreground">
                      123 Property Street<br />
                      London, UK W1A 0AA
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
                    <span>Over 10 years of property management experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>500+ satisfied landlords in our portfolio</span>
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
        </div>
      </div>
    </section>
  );
}