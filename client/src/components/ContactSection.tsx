import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", propertyType: "", propertyAddress: "", currentRent: "", message: ""
  });
  const [estimatedRent, setEstimatedRent] = useState<number | null>(null);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const postcodeMatch = formData.propertyAddress.match(/([A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2})/i);
      const postcode = postcodeMatch ? postcodeMatch[1].toUpperCase().replace(/\s+/g, ' ') : '';
      
      const response = await apiRequest('POST', '/api/quote', {
        ...formData,
        postcode,
        currentRent: formData.currentRent ? parseInt(formData.currentRent) : null,
        estimatedValue: propertyData?.averagePrice || null,
        marketRent: propertyData?.averageRent || null,
        guaranteedRent: estimatedRent || null,
        rentalYield: propertyData?.rentalYield?.toString() || null,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote request');
      }
      
      toast({ title: "Quote Request Submitted", description: "We'll contact you within 24 hours with your guaranteed rent quote." });
      setFormData({ name: "", email: "", phone: "", propertyType: "", propertyAddress: "", currentRent: "", message: "" });
      setEstimatedRent(null);
      setPropertyData(null);
    } catch (error) {
      toast({ title: "Submission Error", description: error instanceof Error ? error.message : "Failed to submit quote request", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get Your Guaranteed Rent Quote</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start your journey to stress-free property investment with guaranteed monthly rent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Request Your Quote</CardTitle>
              <CardDescription>Fill in your details for a guaranteed rent estimate.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="Your full name" required data-testid="input-name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="your.email@example.com" required data-testid="input-email" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="Your phone number" required data-testid="input-phone" />
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
                  <Input id="address" value={formData.propertyAddress} onChange={(e) => handleInputChange("propertyAddress", e.target.value)} placeholder="Full property address including postcode" required data-testid="input-address" />
                </div>

                <div>
                  <Label htmlFor="currentRent">Current Monthly Rent (£)</Label>
                  <Input id="currentRent" type="number" value={formData.currentRent} onChange={(e) => handleInputChange("currentRent", e.target.value)} placeholder="1500" data-testid="input-current-rent" />
                </div>

                {estimatedRent && propertyData && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4" data-testid="rent-estimate">
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Market Rent</p>
                        <p className="text-lg font-semibold text-foreground">£{propertyData.averageRent}/month</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Property Value</p>
                        <p className="text-lg font-semibold text-foreground">£{propertyData.averagePrice.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-sm text-muted-foreground mb-1">Guaranteed Rent (85% of market):</p>
                      <p className="text-2xl font-bold text-primary">£{estimatedRent}/month</p>
                      <p className="text-sm text-muted-foreground mt-1">Rental Yield: {propertyData.rentalYield}%</p>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} placeholder="Tell us about your property, investment goals, or any specific requirements..." rows={4} data-testid="input-message" />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6" data-testid="button-submit">
                  {isSubmitting ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</>) : 'Get My Guaranteed Rent Quote'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
