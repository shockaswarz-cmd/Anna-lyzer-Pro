import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import testimonialMan from "@assets/generated_images/professional_businessman_testimonial_photo_0e9ca4a4.png";
import testimonialWoman from "@assets/generated_images/professional_businesswoman_testimonial_photo_705e7be5.png";

const testimonials = [
  {
    quote: "Amazing people, Great deals and excellent returns! Bourarro Properties transformed my investment portfolio immensely.",
    name: "James Martin",
    title: "Property Investor",
    image: testimonialMan,
    initials: "JM"
  },
  {
    quote: "Unlocking the best opportunities in the property market, Bourarro Properties has been pivotal in guiding me towards profitable investment endeavors.",
    name: "Nora Thomas",
    title: "Landlord & Investor", 
    image: testimonialWoman,
    initials: "NT"
  },
  {
    quote: "The guaranteed rent scheme has given me complete peace of mind. No more worrying about void periods or difficult tenants.",
    name: "Michael Chen",
    title: "Portfolio Landlord",
    image: testimonialMan,
    initials: "MC"
  }
];

export default function TestimonialsSection() {
  const handleTestimonialClick = (name: string) => {
    console.log(`Testimonial clicked: ${name}`);
  };

  return (
    <section className="py-24 bg-gradient-to-r from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-l from-chart-2/10 to-primary/10 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real experiences from landlords who have transformed their property investments 
            with our guaranteed rent services.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover-elevate cursor-pointer h-full group transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 border-0 bg-gradient-to-br from-background via-card to-muted/10"
              onClick={() => handleTestimonialClick(testimonial.name)}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8 h-full flex flex-col relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-chart-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <Quote className="w-10 h-10 text-primary/80 mb-6 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8 flex-grow group-hover:text-foreground/90 transition-colors duration-300 italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 group-hover:scale-110 transition-transform duration-300 ring-2 ring-transparent group-hover:ring-primary/30">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-lg">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-foreground group-hover:text-primary transition-colors duration-300" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium" data-testid={`testimonial-title-${index}`}>
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}