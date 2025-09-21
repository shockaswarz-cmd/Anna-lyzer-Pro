import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  return (
    <section className="py-24 bg-gradient-to-b from-muted/20 via-background to-muted/40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-l from-chart-2/5 to-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-chart-1 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about our guaranteed rent services 
            and property management solutions.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent via-primary to-chart-1 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6" data-testid="faq-accordion">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group bg-gradient-to-r from-background via-card to-background border-0 rounded-2xl px-8 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:shadow-primary/10 overflow-hidden relative"
                data-testid={`faq-item-${index}`}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-chart-1/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute inset-[1px] bg-gradient-to-r from-background via-card to-background rounded-2xl -z-10"></div>
                
                <AccordionTrigger 
                  className="text-left font-bold text-lg hover:no-underline py-6 group-hover:text-primary transition-colors duration-300 [&>svg]:transition-colors [&>svg]:duration-300 group-hover:[&>svg]:text-primary"
                  data-testid={`faq-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground leading-relaxed pb-6 group-hover:text-foreground/90 transition-colors duration-300"
                  data-testid={`faq-content-${index}`}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}