import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from "react";
import testimonialMan from "@assets/generated_images/professional_businessman_testimonial_photo_0e9ca4a4.png";
import testimonialWoman from "@assets/generated_images/professional_businesswoman_testimonial_photo_705e7be5.png";
import testimonialWomanGlasses from "@assets/generated_images/professional_woman_glasses_testimonial_64a414e7.png";
import testimonialYoungMan from "@assets/generated_images/young_professional_man_testimonial_affae0c7.png";
import testimonialSeniorWoman from "@assets/generated_images/senior_businesswoman_testimonial_023c9063.png";
import testimonialBeardedMan from "@assets/generated_images/bearded_professional_man_testimonial_95036613.png";
import testimonialYoungWoman from "@assets/generated_images/young_businesswoman_dark_hair_testimonial_b3a8ed3b.png";
import testimonialNavySuit from "@assets/generated_images/man_navy_suit_testimonial_c404bd61.png";
import testimonialOlderMan from "@assets/generated_images/older_professional_man_grey_hair_4be05ae2.png";
import testimonialBlondeWoman from "@assets/generated_images/young_blonde_woman_professional_ce686a66.png";

const testimonials = [
  {
    quote: "Amazing people, Great deals and excellent returns! Bourarro Properties transformed my investment portfolio immensely.",
    name: "James Martin",
    title: "Property Investor",
    image: testimonialMan,
    initials: "JM",
    rating: 5
  },
  {
    quote: "Unlocking the best opportunities in the property market, Bourarro Properties has been pivotal in guiding me towards profitable investment endeavors.",
    name: "Nora Thomas",
    title: "Landlord & Investor", 
    image: testimonialWoman,
    initials: "NT",
    rating: 5
  },
  {
    quote: "The guaranteed rent scheme has given me complete peace of mind. No more worrying about void periods or difficult tenants.",
    name: "Michael Chen",
    title: "Portfolio Landlord",
    image: testimonialBeardedMan,
    initials: "MC",
    rating: 4.5
  },
  {
    quote: "Five years into our partnership and I couldn't be happier. The monthly payments arrive like clockwork, every single month.",
    name: "Sarah Richardson",
    title: "Buy-to-Let Investor",
    image: testimonialWomanGlasses,
    initials: "SR",
    rating: 5
  },
  {
    quote: "I was skeptical about guaranteed rent at first, but Bourarro delivered everything they promised. Best decision I've made for my property business.",
    name: "David Kumar",
    title: "Real Estate Entrepreneur", 
    image: testimonialYoungMan,
    initials: "DK",
    rating: 4.5
  },
  {
    quote: "After 30 years as a landlord, I wish I'd found Bourarro sooner. They handle everything while I enjoy my retirement stress-free.",
    name: "Margaret Wilson",
    title: "Retired Landlord",
    image: testimonialSeniorWoman,
    initials: "MW",
    rating: 5
  },
  {
    quote: "The transparency and professionalism is outstanding. No hidden fees, no surprises, just reliable monthly income as promised.",
    name: "Robert Zhang",
    title: "Property Portfolio Manager",
    image: testimonialNavySuit,
    initials: "RZ",
    rating: 4.5
  },
  {
    quote: "Working full-time, I needed someone I could trust with my rental property. Bourarro has exceeded all my expectations.",
    name: "Emily Foster",
    title: "First-Time Landlord",
    image: testimonialYoungWoman,
    initials: "EF",
    rating: 5
  },
  {
    quote: "In my 25 years of property investment, I've never found a service as reliable as Bourarro. The guaranteed rent has revolutionized my retirement planning.",
    name: "William Harrison",
    title: "Veteran Property Investor",
    image: testimonialOlderMan,
    initials: "WH",
    rating: 5
  },
  {
    quote: "As a new investor, I was nervous about the rental market. Bourarro's team guided me through everything and now I earn consistent income without any stress.",
    name: "Sophie Williams",
    title: "New Property Investor",
    image: testimonialBlondeWoman,
    initials: "SW",
    rating: 4.5
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-1" data-testid="star-rating">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      ))}
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-3 h-3 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      console.log('Carousel scrolled to previous');
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      console.log('Carousel scrolled to next');
    }
  }, [emblaApi]);

  const handleTestimonialClick = (name: string) => {
    console.log(`Testimonial clicked: ${name}`);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from landlords who transformed their investments.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-12 w-12"
              data-testid="carousel-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-12 w-12"
              data-testid="carousel-next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef} data-testid="testimonials-carousel">
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <Card 
                    className="hover-elevate cursor-pointer h-full"
                    onClick={() => handleTestimonialClick(testimonial.name)}
                    data-testid={`testimonial-card-${index}`}
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <Quote className="w-8 h-8 text-primary/60" />
                        <StarRating rating={testimonial.rating} />
                      </div>
                      
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
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators - Hidden on Desktop */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-muted-foreground/30"
                data-testid={`carousel-indicator-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}