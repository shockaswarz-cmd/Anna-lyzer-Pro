import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  DollarSign,
  Clock,
  Wrench,
  CreditCard,
  KeyRound,
  ArrowUpRight
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: Calendar,
    title: "Guaranteed Lease Terms",
    description: "Comprehensive 3-5 year guaranteed tenancy agreements with full-service property management throughout the entire investment period.",
  },
  {
    icon: DollarSign,
    title: "Zero Commission Structure",
    description: "Transparent pricing with no hidden fees or charges. The agreed rent amount is the exact amount you receive, every single month.",
  },
  {
    icon: Clock,
    title: "365-Day Income Guarantee",
    description: "Continuous rental income whether your property is occupied or vacant. Guaranteed monthly payments without exception.",
  },
  {
    icon: Wrench,
    title: "Concierge Maintenance",
    description: "Professional property maintenance and repairs at no additional cost through our experienced in-house service team.",
  },
  {
    icon: CreditCard,
    title: "Seamless Payment System",
    description: "Automated payment service with guaranteed rent transfers directly to your account on the same date each month.",
  },
  {
    icon: KeyRound,
    title: "Property Stewardship",
    description: "Your valuable investment property returned in immaculate condition with our comprehensive care and protection guarantee.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  const handleServiceClick = (serviceTitle: string) => {
    // Navigate to contact for quote
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-secondary relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 sm:mb-20"
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
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">Our Services</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Comprehensive{" "}
            <span className="text-primary relative">
              Investment
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </svg>
            </span>{" "}
            Benefits
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional property management solutions designed for investors seeking guaranteed returns and peace of mind.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Card
                  className="group bg-card/60 backdrop-blur-sm border border-white/10 hover:border-primary/30 cursor-pointer h-full transition-all duration-500 hover:bg-card/80 relative overflow-hidden"
                  onClick={() => handleServiceClick(service.title)}
                  data-testid={`service-card-${index}`}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />

                  <CardContent className="p-8 h-full flex flex-col relative z-10">
                    <div className="mb-6">
                      {/* Icon Container */}
                      <div className="relative mb-6">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500 group-hover:scale-110">
                          <IconComponent className="w-7 h-7 text-primary transition-transform duration-500 group-hover:scale-110" />
                        </div>
                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 group-hover:scale-125 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                        {service.title}
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed flex-grow text-base sm:text-lg">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-20 sm:mt-28"
          variants={containerVariants}
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {[
              { value: "£150k+", label: "Avg Monthly Revenue" },
              { value: "75+", label: "Managed Properties" },
              { value: "99.8%", label: "Client Satisfaction" },
              { value: "5+", label: "Year Guarantees" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group cursor-default"
                variants={statsVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="relative inline-block">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    {stat.value}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-primary/30 rounded-full"
                    initial={{ width: 0 }}
                    animate={statsInView ? { width: "100%" } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  />
                </div>
                <div className="text-sm sm:text-base text-muted-foreground mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
