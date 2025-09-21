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
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real experiences from landlords who have transformed their property investments 
            with our guaranteed rent services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="hover-elevate cursor-pointer h-full"
              onClick={() => handleTestimonialClick(testimonial.name)}
              data-testid={`testimonial-card-${index}`}
            >
              <CardContent className="p-8 h-full flex flex-col">
                <Quote className="w-8 h-8 text-primary/60 mb-6" />
                
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-8 flex-grow">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground" data-testid={`testimonial-name-${index}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground" data-testid={`testimonial-title-${index}`}>
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