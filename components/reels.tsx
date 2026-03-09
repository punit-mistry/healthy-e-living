"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Instagram, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WordRotate } from "./word-rotate/WordRotate";

export default function Reels() {
  const nutritionTexts = [
    "Personalized Nutrition",
    "Practical Nutrition",
    "Evidence-Based Nutrition",
    "Sustainable Nutrition",
  ];

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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
      link: "https://www.instagram.com/health.e.living",
    },
    {
      id: 2,
      thumbnail: "https://i.ibb.co/dwdpfpCT/reel2.jpg",
      title: "Healthy Eating",
      description: "Simple recipes for balanced meals",
      link: "https://www.instagram.com/health.e.living",
    },
    {
      id: 3,
      thumbnail: "https://i.ibb.co/zTH8bG4H/reel3.jpg",
      title: "Wellness Guide",
      description: "Tips for sustainable health changes",
      link: "https://www.instagram.com/health.e.living",
    },
  ];

  return (
    <section id="reels" className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Follow on Social
          </p>

          <div className="mb-6 h-16 flex items-center justify-center">
            <WordRotate
              words={nutritionTexts}
              className="text-4xl sm:text-5xl font-bold text-[#6A431C]"
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
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View reel on Instagram"
              variants={itemVariants}
              // whileHover={{ y: -8 }}
              className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-[#6A431C] transition-all cursor-pointer hover:shadow-xl"
            >
              {/* Thumbnail */}
              <div className="aspect-[9/16] relative overflow-hidden group">
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-[#6A431C]" />
                  </div>
                </div>
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

        {/* CTA */}
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