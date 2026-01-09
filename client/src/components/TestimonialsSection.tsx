import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import testimonialMan from "../assets/generated_images/professional_businessman_testimonial_photo_0e9ca4a4.webp";
import testimonialWoman from "../assets/generated_images/professional_businesswoman_testimonial_photo_705e7be5.webp";
import testimonialWomanGlasses from "../assets/generated_images/professional_woman_glasses_testimonial_64a414e7.webp";
import testimonialYoungMan from "../assets/generated_images/young_professional_man_testimonial_affae0c7.webp";
import testimonialSeniorWoman from "../assets/generated_images/senior_businesswoman_testimonial_023c9063.webp";
import testimonialBeardedMan from "../assets/generated_images/bearded_professional_man_testimonial_95036613.webp";
import testimonialYoungWoman from "../assets/generated_images/young_businesswoman_dark_hair_testimonial_b3a8ed3b.webp";
import testimonialNavySuit from "../assets/generated_images/man_navy_suit_testimonial_c404bd61.webp";
import testimonialOlderMan from "../assets/generated_images/older_professional_man_grey_hair_4be05ae2.webp";
import testimonialBlondeWoman from "../assets/generated_images/young_blonde_woman_professional_ce686a66.webp";

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
    <div className="flex items-center gap-0.5" data-testid="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-primary text-primary" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 text-muted-foreground/30" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-primary text-primary" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-muted-foreground/30" />
      ))}
    </div>
  );
};

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={sectionRef}>
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
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">Testimonials</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            What Our{" "}
            <span className="text-primary">Clients</span>{" "}
            Say
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real experiences from landlords who transformed their property investments with us.
          </p>
        </motion.div>

        {/* Carousel Navigation */}
        <motion.div
          className="flex justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="h-12 w-12 rounded-full border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
            data-testid="carousel-prev"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="h-12 w-12 rounded-full border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
            data-testid="carousel-next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="overflow-hidden"
          ref={emblaRef}
          data-testid="testimonials-carousel"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
              >
                <Card
                  className="group bg-card/60 backdrop-blur-sm border border-white/10 hover:border-primary/20 h-full transition-all duration-500 hover:bg-card/80"
                  data-testid={`testimonial-card-${index}`}
                >
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Quote className="w-5 h-5 text-primary" />
                      </div>
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300" data-testid={`testimonial-name-${index}`}>
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground" data-testid={`testimonial-title-${index}`}>
                          {testimonial.title}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Indicators */}
        <div className="flex justify-center gap-2 mt-8 lg:hidden">
          {testimonials.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted-foreground/20 transition-colors duration-300"
              data-testid={`carousel-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
