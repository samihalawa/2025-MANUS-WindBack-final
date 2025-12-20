import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does WindBack protect my privacy?",
    answer: "WindBack uses military-grade encryption to protect all your data. Everything is encrypted locally on your device before being synced to the cloud. We use end-to-end encryption, meaning even we cannot access your recordings or transcripts. You have complete control over what gets recorded and can pause or delete recordings at any time."
  },
  {
    question: "What devices and platforms are supported?",
    answer: "WindBack is currently available for macOS (10.15+) and iOS (14+). We also support the Limitless Pendant hardware for always-on audio capture. Cross-device sync works seamlessly across all your devices, and we're working on Windows and Android support."
  },
  {
    question: "How much storage do I get?",
    answer: "Free users get unlimited local storage and 10 hours of AI processing per month. Premium users get unlimited AI processing and unlimited cloud storage with automatic sync across all devices. All plans include compression and efficient storage to minimize space usage."
  },
  {
    question: "Can I import my existing Rewind data?",
    answer: "Yes! WindBack is 100% compatible with Rewind recordings and metadata. You can import all your historical data, including screenshots, audio transcripts, and meeting summaries. The import process is simple and preserves all your timestamps and metadata."
  },
  {
    question: "How accurate is the AI search and transcription?",
    answer: "WindBack uses state-of-the-art AI models for transcription and search, including GPT-5 for natural language queries. Our OCR accuracy exceeds 95% for most text, and our speaker diarization can distinguish between different speakers with high accuracy. The AI continuously improves based on usage patterns."
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer: "You retain full access to all your locally stored data even after canceling. Cloud-synced data remains accessible for 90 days after cancellation, giving you time to export or download everything. You can always export your entire history in standard formats."
  },
  {
    question: "Does WindBack work with the Limitless Pendant?",
    answer: "Yes! WindBack has native integration with the Limitless Pendant. Simply pair your pendant with the WindBack app, and all your audio recordings will automatically sync and be transcribed. The integration includes battery monitoring, recording status, and seamless switching between device audio and pendant audio."
  },
  {
    question: "Can I use WindBack for business or team collaboration?",
    answer: "Currently, WindBack is focused on individual productivity and personal memory augmentation. However, you can share specific recordings, transcripts, or meeting summaries with team members. We're working on team plans with collaboration features for future releases."
  },
  {
    question: "How does the $99/year pricing work?",
    answer: "The Premium plan is billed annually at $99/year, which works out to just $8.25/month. You get immediate access to all premium features including unlimited AI processing, advanced GPT-5 Ask AI, pendant sync, priority support, and cross-device cloud sync. There are no hidden fees or usage limits."
  },
  {
    question: "Is there a free trial for the Premium plan?",
    answer: "The Free plan lets you experience core WindBack features with 10 hours of AI processing per month. This is effectively a permanent trial that never expires. If you need more processing power or premium features, you can upgrade to Premium at any time and cancel whenever you want."
  }
];

export function FAQ() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about WindBack
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg border border-gray-200 px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a 
            href="#contact" 
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
