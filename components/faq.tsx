"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

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
        "Initial consultations are 60 minutes, followed by 30-minute follow-ups. Frequency depends on your needs—typically weekly or bi-weekly to start, then monthly for maintenance.",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-orange-50"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">

        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-[#6A431C]/10"
        />

        <motion.div
          animate={{
            y: [0, 40, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl bg-yellow-200/30"
        />

        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full blur-3xl bg-orange-200/20"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            FAQs
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Common Questions
          </h2>

          <p className="text-lg text-slate-600">
            Have questions? I'm here to help clarify anything about my services.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              variants={itemVariants}
              className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-[#6A431C] transition-all hover:shadow-lg"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between px-6 py-5 bg-gradient-to-r from-white to-yellow-50 hover:from-yellow-50 hover:to-orange-50 transition-colors group"
              >
                <span className="text-left font-semibold text-slate-900 group-hover:text-[#6A431C] transition">
                  {faq.question}
                </span>

                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#6A431C]" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-t-2 border-slate-200 text-slate-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 rounded-2xl p-8 text-center shadow-xl bg-gradient-to-r from-[#6A431C] to-[#8B5A2B] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 opacity-0 group-hover:opacity-100 transition" />

          <div className="relative z-10">
            <p className="text-white/90 mb-4">Still have questions?</p>

            <p className="font-semibold text-white mb-4">
              Reach out directly for a consultation call.
            </p>

            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#6A431C] rounded-lg hover:bg-yellow-50 transition font-medium hover:shadow-lg">
              Schedule Consultation
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}