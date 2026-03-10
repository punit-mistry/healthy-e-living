"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { SparklesText } from "./sparkles-text/SparklesText";
import { WordRotate } from "./word-rotate/WordRotate";

/* ───────────────────────────────────────── */
/* Particle Component */
/* ───────────────────────────────────────── */

function Particle({ particle }: { particle: Record<string, number> }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none will-change-transform"
      style={{
        left: `${particle.startX}%`,
        bottom: "-10px",
        width: particle.size,
        height: particle.size,
        background: "rgba(184,134,81,0.8)",
      }}
      animate={{
        y: [0, -particle.yDistance],
        x: [0, particle.xDrift],
        opacity: [0, 1, 0],
        scale: [0.8, 1, 0.6],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: "easeOut",
      }}
    />
  );
}

/* ───────────────────────────────────────── */
/* Client-Only Background Animations */
/* ───────────────────────────────────────── */

function ClientOnlyBackground() {
  // ✅ ALL HOOKS AT TOP LEVEL - useState FIRST, then useMemo, then useEffect
  const [isMounted, setIsMounted] = useState(false);
  
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      startX: Math.random() * 100,
      size: 4 + Math.random() * 4,
      yDistance: 400 + Math.random() * 200,
      xDrift: (Math.random() - 0.5) * 80,
      duration: 8 + Math.random() * 4,
      delay: i * 0.8,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Early return AFTER all hooks are called
  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden hidden md:block">
      {/* Gradient blob 1 */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-yellow-200/40 via-orange-100/30 to-transparent rounded-full blur-[80px]"
      />

      {/* Gradient blob 2 */}
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#6A431C]/20 via-yellow-100/40 to-transparent rounded-full blur-[90px]"
      />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-[30%] left-[40%] w-[350px] h-[350px] bg-yellow-100 rounded-full blur-[70px]"
      />

      {/* Particles */}
      {particles.map((particle, i) => (
        <Particle key={i} particle={particle} />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────── */
/* Hero Component */
/* ───────────────────────────────────────── */

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Client-only background animations */}
      <ClientOnlyBackground />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={badgeVariants}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full shadow-sm"
        >
          <span className="w-2 h-2 bg-[#6A431C] rounded-full" />
          <span className="text-sm font-medium text-[#6A431C]">
            Nutrition by Irika Goyal
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
        >
          <SparklesText>Transform Your Health</SparklesText>

          <span className="block mt-2">Through</span>

          <span className="block text-[#6A431C] mt-2">
            <WordRotate
              duration={2500}
              className="font-serif"
              words={[
                "Personalized Nutrition",
                "Evidence-Based Nutrition",
                "Sustainable Nutrition",
                "Practical Nutrition",
                "Clinical Nutrition",
              ]}
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Work with a clinical dietitian to develop a nutrition plan
          tailored to your unique health goals, medical history, and lifestyle.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-[#6A431C] hover:bg-[#5A3715] text-white shadow-lg hover:shadow-xl transition-all"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Your Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* <Button
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-900"
          >
            Learn More
          </Button> */}
        </motion.div>

        {/* Trust indicators */}
        {/* <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-600"
        >
          {[
            "Evidence-Based Care",
            "Registered Dietitian",
            "Insurance Accepted",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-[#6A431C] font-bold shadow-sm">
                ✓
              </div>
              <span>{item}</span>
            </div>
          ))}
        </motion.div> */}
      </motion.div>
    </section>
  );
}
