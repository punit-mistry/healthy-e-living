"use client";

import { motion } from "framer-motion";
import { optimizedItemVariants } from "../animations/optimized-animations";

interface ContactHeaderProps {
  inView: boolean;
}

export default function ContactHeader({ inView }: ContactHeaderProps) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={optimizedItemVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
        Get In Touch
      </p>

      <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
        Let's Start Your Journey
      </h2>

      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        Reach out to schedule your consultation via WhatsApp or ask any
        questions about my services.
      </p>
    </motion.div>
  );
}
