"use client";

import { motion } from "framer-motion";
import { optimizedBackgroundAnimation, shouldReduceMotion } from "../animations/optimized-animations";

export default function CTABackground() {
  // Skip animations on mobile for better performance
  if (shouldReduceMotion()) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        {...optimizedBackgroundAnimation}
        className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />

      <motion.div
        {...optimizedBackgroundAnimation}
        transition={{
          ...optimizedBackgroundAnimation.transition,
          duration: 25, // Different timing
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"
      />

      <motion.div
        {...optimizedBackgroundAnimation}
        transition={{
          ...optimizedBackgroundAnimation.transition,
          duration: 30, // Different timing
        }}
        className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl"
      />
    </div>
  );
}
