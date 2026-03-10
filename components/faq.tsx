"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FAQItem from "./faq/FAQItem";
import FAQBackground from "./faq/FAQBackground";
import FAQHeader from "./faq/FAQHeader";
import FAQCTA from "./faq/FAQCTA";
import { optimizedContainerVariants } from "./animations/optimized-animations";

export default function FAQ() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    // {
    //   question: "Do you accept insurance?",
    //   answer:
    //     "Yes! I accept most major insurance plans. Some patients are fully covered, while others have a copay. Contact me to verify your specific plan coverage.",
    // },
    {
      question: "How often will I need to come in?",
      answer:
        "Initial consultations are 45-60 minutes, followed by 20-30 minute follow-ups. Frequency depends on your needs. Typically every ten days to start, then every fortnight for maintenance.",
    },
    {
      question: "Do you offer virtual consultations?",
      answer:
        "Absolutely! I offer both in-person and virtual appointments via secure video conferencing. Choose what works best for your schedule.",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "Bring your current medications, lab results (if available), and any food logs you may have. I’ll also ask about your health history and goals.",
    },
    {
      question: "Can you help with meal planning?",
      answer:
        "Yes, personalized meal planning is a core part of my service. I create practical, delicious meal plans that fit your lifestyle and dietary preferences.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Results vary by person and condition. Some see improvements in 2–4 weeks, while others may take longer. Consistency and follow-up are key to sustainable results.",
    },
  ];


  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-orange-50"
    >
      {/* Animated Background */}
      <FAQBackground />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FAQHeader inView={inView} />

        {/* FAQ Items */}
        <motion.div
          variants={optimizedContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <FAQCTA inView={inView} />
      </div>
    </section>
  );
}