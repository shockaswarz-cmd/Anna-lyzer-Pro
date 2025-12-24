import { Building2, Target, Shield, TrendingUp } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif text-foreground mb-4 sm:mb-6">
            About Bourarro Properties
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-primary mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Transforming property investment through guaranteed returns and unparalleled expertise
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 mb-10 sm:mb-16">
          <div className="text-center">
            <h3 className="text-xl sm:text-3xl font-bold font-serif text-foreground mb-4 sm:mb-6">Our Mission</h3>
            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              To make property investing <span className="text-primary font-semibold">better and easier</span> for investors 
              by delivering guaranteed rental income, comprehensive market analysis, and professional service that removes 
              the complexity and risk from real estate investment.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-10 sm:mb-16">
          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 border border-primary/20 rounded-full mb-3 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            </div>
            <h4 className="text-sm sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Guaranteed Returns</h4>
            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
              Secured rental income with our guarantee program
            </p>
          </div>

          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 border border-primary/20 rounded-full mb-3 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            </div>
            <h4 className="text-sm sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Market Expertise</h4>
            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
              Deep UK property market knowledge
            </p>
          </div>

          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 border border-primary/20 rounded-full mb-3 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <Building2 className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            </div>
            <h4 className="text-sm sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Quality Properties</h4>
            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
              High-yield investment opportunities
            </p>
          </div>

          <div className="text-center group">
            <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 border border-primary/20 rounded-full mb-3 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-300">
              <Target className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />
            </div>
            <h4 className="text-sm sm:text-xl font-bold text-foreground mb-2 sm:mb-3">Client Focus</h4>
            <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
              Tailored to your investment goals
            </p>
          </div>
        </div>

        {/* Company Story */}
        <div className="max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl sm:text-3xl font-bold font-serif text-foreground mb-4 sm:mb-6">
              Making Investment Excellence Accessible
            </h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
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
          </div>
        </div>
      </div>
    </section>
  );
}