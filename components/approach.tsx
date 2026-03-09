"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Highlighter } from "./highlighter/Highlighter";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Initial Assessment",
    description:
      "Comprehensive evaluation of your health history, dietary habits, lifestyle, and nutrition goals.",
  },
  {
    id: 2,
    number: "02",
    title: "Personalized Planning",
    description:
      "Development of a custom nutrition plan based on your specific needs and preferences.",
  },
  {
    id: 3,
    number: "03",
    title: "Education & Support",
    description:
      "Ongoing guidance, education, and behavioral support to help you succeed.",
  },
  {
    id: 4,
    number: "04",
    title: "Regular Monitoring",
    description:
      "Follow-up appointments to track progress and adjust the plan as needed.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Approach() {
  return (
    <LazyMotion features={domAnimation}>
      <section
        id="approach"
        className="py-20 sm:py-28 bg-gradient-to-b from-white via-yellow-50/40 to-white relative overflow-hidden"
      >
        {/* static background glow (no animation) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-20 w-72 h-72 bg-yellow-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#6A431C]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* heading */}
          <m.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
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
          </m.div>

          {/* steps */}
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <m.div key={step.id} variants={itemVariants} className="relative group">

                {/* connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-[2px] bg-gradient-to-r from-[#6A431C] to-[#8B5A2B]" />
                )}

                <div
                  className="
                  bg-white
                  p-8
                  rounded-2xl
                  border border-yellow-100
                  transform-gpu
                  hover:-translate-y-1
                  transition-transform
                  h-full
                  "
                >
                  {/* top row */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-4xl font-bold text-[#6A431C] font-serif opacity-40">
                      {step.number}
                    </span>

                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 bg-[#6A431C] rounded-full" />
                    </div>
                  </div>

                  {/* title */}
                  <Highlighter action="highlight" color="#E6D2BE" isView>
                    <h3 className="font-semibold text-primary text-lg mb-2">
                      {step.title}
                    </h3>
                  </Highlighter>

                  {/* description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}