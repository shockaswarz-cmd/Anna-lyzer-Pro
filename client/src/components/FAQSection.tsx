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
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about our guaranteed rent services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border rounded-lg px-6"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger 
                  className="text-left font-semibold text-lg hover:no-underline py-6"
                  data-testid={`faq-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground leading-relaxed pb-6"
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