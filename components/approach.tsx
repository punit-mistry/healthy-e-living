"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Highlighter } from "./highlighter/Highlighter";

export default function Approach() {
  const steps = useMemo(
    () => [
      {
        number: "01",
        title: "Initial Assessment",
        description:
          "Comprehensive evaluation of your health history, dietary habits, lifestyle, and nutrition goals.",
      },
      {
        number: "02",
        title: "Personalized Planning",
        description:
          "Development of a custom nutrition plan based on your specific needs and preferences.",
      },
      {
        number: "03",
        title: "Education & Support",
        description:
          "Ongoing guidance, education, and behavioral support to help you succeed.",
      },
      {
        number: "04",
        title: "Regular Monitoring",
        description:
          "Follow-up appointments to track progress and adjust the plan as needed.",
      },
    ],
    [],
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="approach"
      className="py-20 sm:py-28 bg-gradient-to-b from-white via-yellow-50/40 to-white relative overflow-hidden"
    >
      {/* Lightweight Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-20 w-72 h-72 bg-yellow-100/40 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-[#6A431C]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={itemVariants}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            My Approach
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Evidence-Based & Patient-Centered Care
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A systematic approach designed to deliver sustainable results
            through collaboration and commitment.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%)] w-8 h-[2px] bg-gradient-to-r from-[#6A431C] to-[#8B5A2B]" />
              )}

              <div
                className="
                bg-white
                p-8
                rounded-2xl
                border border-yellow-100
                transition-transform duration-300
                hover:-translate-y-1
                h-full
                relative
                "
              >
                {/* Top Row */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl font-bold text-[#6A431C] font-serif opacity-40">
                    {step.number}
                  </span>

                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-[#6A431C] rounded-full" />
                  </div>
                </div>

                {/* Title */}
                <Highlighter action="highlight" color="#E6D2BE" isView>
                  <h3 className="font-semibold text-primary text-lg mb-2">
                    {step.title}
                  </h3>
                </Highlighter>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
