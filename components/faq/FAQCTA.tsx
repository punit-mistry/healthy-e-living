"use client";

import { motion } from "framer-motion";
import { optimizedItemVariants } from "../animations/optimized-animations";

interface FAQCTAProps {
  inView: boolean;
}

export default function FAQCTA({ inView }: FAQCTAProps) {
  return (
    <motion.div
      variants={optimizedItemVariants}
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
  );
}
