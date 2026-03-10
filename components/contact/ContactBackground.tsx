"use client";

import { motion } from "framer-motion";
import { optimizedBackgroundAnimation, shouldReduceMotion } from "../animations/optimized-animations";

export default function ContactBackground() {
  // Skip animations on mobile for better performance
  if (shouldReduceMotion()) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#6A431C]/10 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        {...optimizedBackgroundAnimation}
        className="absolute top-10 left-10 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl"
      />

      <motion.div
        {...optimizedBackgroundAnimation}
        transition={{
          ...optimizedBackgroundAnimation.transition,
          duration: 25, // Different timing
        }}
        className="absolute bottom-10 right-20 w-96 h-96 bg-[#6A431C]/10 rounded-full blur-3xl"
      />
    </div>
  );
}
