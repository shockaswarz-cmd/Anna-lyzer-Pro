import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Clock, TrendingUp, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../assets/generated_images/luxury_property_investment_hero.png";
import { contactInfo } from "@/lib/navigation";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function Hero() {
  const [, setLocation] = useLocation();

  const handleGetQuote = () => setLocation('/contact');
  const handleCallNow = () => window.location.href = `tel:${contactInfo.phoneTel}`;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src={heroImage}
          alt="Luxury property investment"
          className="w-full h-full object-cover object-center"
        />
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        {/* Subtle animated gradient accent */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-20 pb-24 sm:py-12 md:py-0">
        <motion.div
          className="max-w-4xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Trust Badge */}
          <motion.div
            className="mb-4 sm:mb-6"
            variants={fadeInUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-white/90 font-medium text-[11px] sm:text-sm tracking-wide">Trusted by 100+ Landlords Across the UK</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.1]"
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Get <span className="text-primary relative">
              Guaranteed Rent
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-primary/60 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
            <br />
            <span className="text-white/85">Every Single Month</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-10 max-w-2xl leading-relaxed"
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Stop chasing tenants. We pay your rent on time, every time, for{" "}
            <span className="text-primary font-semibold">3-5 years</span> guaranteed. Zero voids, zero stress.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10 max-w-xl"
            variants={staggerContainer}
          >
            {[
              { icon: Shield, title: "Zero Fees", subtitle: "No hidden costs" },
              { icon: Clock, title: "24hr Quote", subtitle: "Fast response" },
              { icon: TrendingUp, title: "85% Market", subtitle: "Rent guaranteed" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 bg-white/5 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-500 text-center sm:text-left cursor-default"
                variants={scaleIn}
                whileHover={{ y: -2, transition: { duration: 0.3 } }}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">{feature.title}</div>
                  <div className="text-white/60 text-[11px] sm:text-sm hidden sm:block">{feature.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10"
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              onClick={handleGetQuote}
              className="group w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-400 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5"
              data-testid="button-hero-quote"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCallNow}
              className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg font-semibold bg-white/5 backdrop-blur-md hover:bg-white/15 text-white border border-white/20 hover:border-white/40 rounded-full transition-all duration-400"
              data-testid="button-hero-call"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-8 text-white/70"
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {["No upfront costs", "Full property care", "UK-wide coverage"].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                <span className="text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16 pb-6 sm:pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-12 lg:gap-16">
              {[
                { value: "£150k+", label: "Revenue" },
                { value: "75+", label: "Properties" },
                { value: "99.8%", label: "Satisfaction" },
                { value: "5+", label: "Years" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="text-lg sm:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300">{stat.value}</div>
                  <div className="text-[10px] sm:text-sm text-white/50 leading-tight">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
