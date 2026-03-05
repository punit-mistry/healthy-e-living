"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WordRotate } from "./word-rotate/WordRotate";

export default function Reels() {
  const [nutritionIndex, setNutritionIndex] = useState(0);
  const nutritionTexts = [
    "Personalized Nutrition",
    "Practical Nutrition",
    "Evidence-Based Nutrition",
    "Sustainable Nutrition",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setNutritionIndex((prev) => (prev + 1) % nutritionTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const textFlipVariants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
    center: {
      rotateX: 0,
      opacity: 1,
      transition: {
        rotateX: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      rotateX: direction > 0 ? 90 : -90,
      opacity: 0,
      transition: {
        rotateX: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const reels = [
    {
      id: 1,
      thumbnail: "https://i.ibb.co/6RPs33tL/reel1.webp",
      title: "Nutrition Tips",
      description: "Quick nutrition advice for daily wellness",
    },
    {
      id: 2,
      thumbnail: "https://i.ibb.co/dwdpfpCT/reel2.jpg",
      title: "Healthy Eating",
      description: "Simple recipes for balanced meals",
    },
    {
      id: 3,
      thumbnail: "https://i.ibb.co/zTH8bG4H/reel3.jpg",
      title: "Wellness Guide",
      description: "Tips for sustainable health changes",
    },
  ];

  return (
    <section id="reels" className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Text Flip Animation */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Follow on Social
          </p>

          {/* Flipping Text Animation */}
          <div className="mb-4 h-16 flex items-center justify-center">
            <WordRotate
              words={nutritionTexts}
              className=" text-4xl sm:text-5xl font-bold text-[#6A431C]"
              duration={1500}
            />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Health.e.living on Instagram
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Watch tips, recipes, and wellness advice in short, engaging videos.
          </p>
        </motion.div>

        {/* Reels Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {reels.map((reel) => (
            <motion.a
              key={reel.id}
              href={`https://www.instagram.com/health.e.living`}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-[#6A431C] transition-all cursor-pointer hover:shadow-xl"
            >
              {/* Reel Preview with Thumbnail Image */}
              <div className="aspect-[9/16] bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center relative overflow-hidden">
                {/* Thumbnail Image */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-[#6A431C] transition-colors">
                  {reel.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {reel.description}
                </p>
                <p className="text-xs text-[#6A431C] font-semibold uppercase tracking-widest">
                  View on Instagram →
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <Button
            asChild
            className="bg-[#6A431C] hover:bg-[#5A3715] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <a
              href="https://www.instagram.com/health.e.living"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5" />
              Follow Health.e.living
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
