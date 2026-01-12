import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is Rent to Rent safe for landlords?",
    answer: "Yes, if done correctly with a legally binding contract and a reputable Rent to Rent operator. It's important to conduct due diligence on the company managing the property. We provide comprehensive legal agreements and full transparency in our operations."
  },
  {
    question: "How does Rent to Rent guarantee my rent?",
    answer: "The Rent to Rent operator takes on the responsibility of paying rent whether or not the property is fully occupied. They profit by renting the property out at a higher rate while ensuring you receive consistent monthly payments."
  },
  {
    question: "Is Rent to Rent legal in the UK?",
    answer: "Yes, Rent to Rent is completely legal if the correct agreements are in place and local regulations (such as HMO licensing and safety standards) are followed. We ensure full compliance with all applicable laws and regulations."
  },
  {
    question: "What contracts should I use for Rent to Rent?",
    answer: "The two main agreements are: Company Let Agreement – A commercial lease agreement where the Rent to Rent operator sublets the property, and Management Agreement – The operator manages the property on behalf of the landlord. We handle all legal documentation."
  },
  {
    question: "Do I need to inform my mortgage lender?",
    answer: "Yes, if your property has a mortgage, you must check if subletting is allowed. Some lenders may require a commercial mortgage or specific permissions. We can provide guidance on approaching your lender with the necessary documentation."
  },
  {
    question: "Who is responsible for tenant compliance?",
    answer: "The Rent to Rent operator is responsible for vetting tenants, handling deposits, and ensuring compliance with right-to-rent checks and other regulations. However, the landlord should ensure they work with a professional operator like us."
  },
  {
    question: "Can I increase the rent during the agreement?",
    answer: "Usually, the Rent to Rent operator negotiates a fixed rent for the duration of the contract, but you can include rent review clauses for periodic increases. We typically include annual rent reviews linked to market rates."
  },
  {
    question: "How long do Rent to Rent contracts usually last?",
    answer: "Typically 3 to 5 years, but the length is negotiable based on what works best for both parties. Longer terms provide more stability for both landlords and operators, ensuring consistent returns."
  }
];

export default function FAQSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 sm:py-32 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
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
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-xs sm:text-sm tracking-wide uppercase">FAQ</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Frequently Asked{" "}
            <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get answers to common questions about our guaranteed rent services.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card/60 backdrop-blur-sm border border-white/10 rounded-xl px-6 data-[state=open]:border-primary/30 transition-all duration-300 overflow-hidden"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger
                    className="text-left font-semibold text-base sm:text-lg hover:no-underline py-5 sm:py-6 hover:text-primary transition-colors duration-300 [&[data-state=open]]:text-primary"
                    data-testid={`faq-trigger-${index}`}
                  >
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-6"
                    data-testid={`faq-content-${index}`}
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
