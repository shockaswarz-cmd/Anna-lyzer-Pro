import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Send, MessageSquare } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { motion, useInView } from "framer-motion";
import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", propertyType: "", propertyAddress: "", currentRent: "", message: ""
  });
  const [estimatedRent, setEstimatedRent] = useState<number | null>(null);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.propertyType) {
      toast({ title: "Missing Information", description: "Please select a property type", variant: "destructive" });
      return;
    }

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
    <section id="contact" className="py-24 sm:py-32 bg-secondary/50 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2.5 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">Contact Us</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Get Your <span className="text-primary">Guaranteed Rent</span> Quote
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Start your journey to stress-free property investment with guaranteed monthly rent.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border border-white/10">
              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-xl sm:text-2xl">Request Your Quote</CardTitle>
                <CardDescription className="text-base">Fill in your details for a guaranteed rent estimate.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0">
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                        className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Your phone number"
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                      data-testid="input-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type <span className="text-destructive">*</span></Label>
                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger className="bg-white/5 border-white/10 focus:border-primary/50" data-testid="select-property-type">
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

                  <div className="space-y-2">
                    <Label htmlFor="address">Property Address</Label>
                    <Input
                      id="address"
                      value={formData.propertyAddress}
                      onChange={(e) => handleInputChange("propertyAddress", e.target.value)}
                      placeholder="Full property address including postcode"
                      required
                      className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                      data-testid="input-address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentRent">Current Monthly Rent (£)</Label>
                    <Input
                      id="currentRent"
                      type="number"
                      value={formData.currentRent}
                      onChange={(e) => handleInputChange("currentRent", e.target.value)}
                      placeholder="1500"
                      className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors"
                      data-testid="input-current-rent"
                    />
                  </div>

                  {estimatedRent && propertyData && (
                    <motion.div
                      className="bg-primary/5 border border-primary/20 rounded-xl p-5"
                      data-testid="rent-estimate"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Market Rent</p>
                          <p className="text-lg font-semibold text-foreground">£{propertyData.averageRent}/month</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Property Value</p>
                          <p className="text-lg font-semibold text-foreground">£{propertyData.averagePrice.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="border-t border-primary/20 pt-4">
                        <p className="text-sm text-muted-foreground mb-1">Guaranteed Rent (85% of market):</p>
                        <p className="text-2xl font-bold text-primary">£{estimatedRent}/month</p>
                        <p className="text-sm text-muted-foreground mt-1">Rental Yield: {propertyData.rentalYield}%</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your property, investment goals, or any specific requirements..."
                      rows={4}
                      className="bg-white/5 border-white/10 focus:border-primary/50 transition-colors resize-none"
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-base sm:text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My Guaranteed Rent Quote
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactInfo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
