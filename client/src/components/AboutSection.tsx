import { Building2, Target, Shield, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    icon: Shield,
    title: "Guaranteed Returns",
    description: "Secured rental income with our guarantee program"
  },
  {
    icon: TrendingUp,
    title: "Market Expertise",
    description: "Deep UK property market knowledge"
  },
  {
    icon: Building2,
    title: "Quality Properties",
    description: "High-yield investment opportunities"
  },
  {
    icon: Target,
    title: "Client Focus",
    description: "Tailored to your investment goals"
  }
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
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
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">About Us</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            About <span className="text-primary">Bourarro</span> Properties
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforming property investment through guaranteed returns and unparalleled expertise
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="bg-card/60 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 mb-16 sm:mb-20 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="text-center relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              To make property investing <span className="text-primary font-semibold">better and easier</span> for investors
              by delivering guaranteed rental income, comprehensive market analysis, and professional service that removes
              the complexity and risk from real estate investment.
            </p>
          </div>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-primary/10 border border-primary/20 rounded-2xl mb-5 sm:mb-6 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <IconComponent className="w-7 sm:w-9 h-7 sm:h-9 text-primary" />
                </motion.div>
                <h4 className="text-base sm:text-xl font-bold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Company Story */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center sm:text-left">
            Making Investment Excellence Accessible
          </h3>
          <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Founded on the principle that property investment should be <span className="text-foreground font-medium">transparent,
              profitable, and stress-free</span>, Bourarro Properties bridges the gap between complex market dynamics
              and investor success.
            </p>
            <p>
              Our innovative approach combines cutting-edge market analysis with time-tested investment strategies,
              delivering guaranteed rental returns that traditional property investment simply cannot match.
            </p>
            <p>
              We believe every investor deserves access to <span className="text-primary font-medium">institutional-grade
              opportunities</span> with the personal attention that builds lasting wealth.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
