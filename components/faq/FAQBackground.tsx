"use client";

import { motion } from "framer-motion";
import { optimizedBackgroundAnimation, shouldReduceMotion } from "../animations/optimized-animations";

export default function FAQBackground() {
  // Skip animations on mobile for better performance
  if (shouldReduceMotion()) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-[#6A431C]/10" />
        <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl bg-yellow-200/30" />
        <div className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full blur-3xl bg-orange-200/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        {...optimizedBackgroundAnimation}
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl bg-[#6A431C]/10"
      />

      <motion.div
        {...optimizedBackgroundAnimation}
        transition={{
          ...optimizedBackgroundAnimation.transition,
          duration: 25, // Slightly different timing
        }}
        className="absolute bottom-10 right-20 w-96 h-96 rounded-full blur-3xl bg-yellow-200/30"
      />

      <motion.div
        {...optimizedBackgroundAnimation}
        transition={{
          ...optimizedBackgroundAnimation.transition,
          duration: 30, // Different timing
        }}
        className="absolute top-1/2 right-1/4 w-60 h-60 rounded-full blur-3xl bg-orange-200/20"
      />
    </div>
  );
}
