"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Highlighter } from "./highlighter/Highlighter";

export default function Approach() {
  const { ref, inView } = useInView({
    threshold: 0.5, // trigger when 50% visible
    triggerOnce: true,
  });

  const steps = [
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
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.25,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="approach"
      ref={ref}
      className="py-20 sm:py-28 bg-gradient-to-b from-white via-yellow-50/50 to-white relative overflow-hidden"
    >
      {/* Floating gradient background */}
      <div className="absolute inset-0 pointer-events-none">

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-br from-yellow-100/30 to-transparent rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#6A431C]/15 to-transparent rounded-full blur-3xl"
        />

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
          animate={inView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%)] w-8 h-1 bg-gradient-to-r from-[#6A431C] to-[#8B5A2B]" />
              )}

              <div
                className="
                bg-gradient-to-br from-white to-yellow-50/50
                p-8 rounded-2xl
                border border-yellow-100
                hover:-translate-y-2
                hover:shadow-2xl
                transition-all duration-500 ease-out
                h-full relative overflow-hidden
                group
                "
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6A431C]/5 to-[#8B5A2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Section */}
                <div className="mb-4 flex items-center justify-between relative z-10">

                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 0.4, y: 0 } : {}}
                    transition={{ delay: index * 0.2 }}
                    className="text-4xl font-bold text-[#6A431C] font-serif"
                  >
                    {step.number}
                  </motion.span>

                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center group-hover:from-[#6A431C] group-hover:to-[#8B5A2B] transition-all shadow-md">

                    <div className="w-6 h-6 bg-[#6A431C] rounded-full group-hover:bg-white transition-all" />

                  </div>
                </div>

                {/* Title */}
                <Highlighter action="highlight" color="#E6D2BE" isView>
                  <h3 className="font-semibold text-primary text-lg mb-2 relative z-10 group-hover:text-[#6A431C] transition-colors">
                    {step.title}
                  </h3>
                </Highlighter>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed relative z-10">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Timeline */}
        <div className="lg:hidden mt-12">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">

                  <div className="w-10 h-10 bg-gradient-to-br from-[#6A431C] to-[#8B5A2B] text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                    {index + 1}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-[#6A431C] to-yellow-200 mt-2" />
                  )}
                </div>

                <div className="pb-6">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-sm">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}