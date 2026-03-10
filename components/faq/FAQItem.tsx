"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { optimizedItemVariants } from "../animations/optimized-animations";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

export default function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
  return (
    <motion.div
      layout
      variants={optimizedItemVariants}
      className="border-2 border-slate-200 rounded-xl overflow-hidden hover:border-[#6A431C] transition-all hover:shadow-lg"
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-5 bg-gradient-to-r from-white to-yellow-50 hover:from-yellow-50 hover:to-orange-50 transition-colors group"
      >
        <span className="text-left font-semibold text-slate-900 group-hover:text-[#6A431C] transition">
          {question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }} // Reduced from 0.25
        >
          <ChevronDown className="w-5 h-5 text-[#6A431C]" />
        </motion.div>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }} // Reduced from 0.25
          className="overflow-hidden"
        >
          <div className="px-6 py-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-t-2 border-slate-200 text-slate-700 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
