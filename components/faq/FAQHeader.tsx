"use client";

import { motion } from "framer-motion";
import { optimizedItemVariants } from "../animations/optimized-animations";

interface FAQHeaderProps {
  inView: boolean;
}

export default function FAQHeader({ inView }: FAQHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={optimizedItemVariants}
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
  );
}
