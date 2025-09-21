import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import testimonialMan from "@assets/generated_images/professional_businessman_testimonial_photo_0e9ca4a4.png";
import testimonialWoman from "@assets/generated_images/professional_businesswoman_testimonial_photo_705e7be5.png";
import testimonialWomanGlasses from "@assets/generated_images/professional_woman_glasses_testimonial_64a414e7.png";
import testimonialYoungMan from "@assets/generated_images/young_professional_man_testimonial_affae0c7.png";
import testimonialSeniorWoman from "@assets/generated_images/senior_businesswoman_testimonial_023c9063.png";
import testimonialBeardedMan from "@assets/generated_images/bearded_professional_man_testimonial_95036613.png";
import testimonialYoungWoman from "@assets/generated_images/young_businesswoman_dark_hair_testimonial_b3a8ed3b.png";
import testimonialNavySuit from "@assets/generated_images/man_navy_suit_testimonial_c404bd61.png";

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
    image: testimonialBeardedMan,
    initials: "MC"
  },
  {
    quote: "Five years into our partnership and I couldn't be happier. The monthly payments arrive like clockwork, every single month.",
    name: "Sarah Richardson",
    title: "Buy-to-Let Investor",
    image: testimonialWomanGlasses,
    initials: "SR"
  },
  {
    quote: "I was skeptical about guaranteed rent at first, but Bourarro delivered everything they promised. Best decision I've made for my property business.",
    name: "David Kumar",
    title: "Real Estate Entrepreneur", 
    image: testimonialYoungMan,
    initials: "DK"
  },
  {
    quote: "After 30 years as a landlord, I wish I'd found Bourarro sooner. They handle everything while I enjoy my retirement stress-free.",
    name: "Margaret Wilson",
    title: "Retired Landlord",
    image: testimonialSeniorWoman,
    initials: "MW"
  },
  {
    quote: "The transparency and professionalism is outstanding. No hidden fees, no surprises, just reliable monthly income as promised.",
    name: "Robert Zhang",
    title: "Property Portfolio Manager",
    image: testimonialNavySuit,
    initials: "RZ"
  },
  {
    quote: "Working full-time, I needed someone I could trust with my rental property. Bourarro has exceeded all my expectations.",
    name: "Emily Foster",
    title: "First-Time Landlord",
    image: testimonialYoungWoman,
    initials: "EF"
  },
  {
    quote: "The rent guarantee product is brilliant. I get market rate rent whether the property is occupied or not - it's revolutionary.",
    name: "Alexander Price",
    title: "Commercial Property Owner",
    image: testimonialMan,
    initials: "AP"
  },
  {
    quote: "Bourarro's team is incredibly responsive. Any issues are resolved quickly and professionally. I sleep well at night knowing they're managing my properties.",
    name: "Lisa Campbell",
    title: "Multi-Property Investor",
    image: testimonialWoman,
    initials: "LC"
  },
  {
    quote: "I've worked with several letting agents over the years, but none compare to Bourarro's level of service and reliability.",
    name: "Thomas Anderson",
    title: "Property Developer",
    image: testimonialBeardedMan,
    initials: "TA"
  },
  {
    quote: "The guaranteed rent model has transformed my cashflow. I can now plan my finances with complete confidence.",
    name: "Jennifer Hayes",
    title: "Property Investment Consultant",
    image: testimonialWomanGlasses,
    initials: "JH"
  },
  {
    quote: "As a busy professional, I appreciate how Bourarro handles all the tenant headaches. I just receive my monthly payment and that's it.",
    name: "Mark Thompson",
    title: "IT Director & Landlord",
    image: testimonialYoungMan,
    initials: "MT"
  },
  {
    quote: "The maintenance service is exceptional. They've actually improved the condition of my property over the lease period.",
    name: "Patricia Moore",
    title: "Experienced Landlord",
    image: testimonialSeniorWoman,
    initials: "PM"
  },
  {
    quote: "I was losing money with void periods and problem tenants. Bourarro solved all of that with their guaranteed rent scheme.",
    name: "Steven Clark",
    title: "Property Investment Specialist",
    image: testimonialNavySuit,
    initials: "SC"
  },
  {
    quote: "The contract terms are fair and transparent. No complicated clauses or hidden costs - just straightforward property management.",
    name: "Rachel Green",
    title: "Legal Professional & Investor",
    image: testimonialYoungWoman,
    initials: "RG"
  },
  {
    quote: "Bourarro has helped me scale my property portfolio faster than I ever imagined. The guaranteed income gives me confidence to invest more.",
    name: "Andrew Scott",
    title: "Property Portfolio Builder",
    image: testimonialMan,
    initials: "AS"
  },
  {
    quote: "The peace of mind is invaluable. I know my property is in safe hands and my income is guaranteed regardless of market conditions.",
    name: "Caroline Brown",
    title: "Investment Property Owner",
    image: testimonialWoman,
    initials: "CB"
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