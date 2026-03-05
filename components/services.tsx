"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Brain, Utensils, TrendingUp } from "lucide-react";

export default function Services() {
  const { ref, inView } = useInView({
    threshold: 0.5, // trigger when 50% visible
    triggerOnce: true,
  });

  const services = [
    {
      icon: Heart,
      title: "Cardiovascular Health",
      description:
        "Manage hypertension, cholesterol, and heart disease through evidence-based nutrition strategies.",
    },
    {
      icon: Brain,
      title: "Diabetes Management",
      description:
        "Optimize blood sugar control with personalized meal planning and lifestyle modifications.",
    },
    {
      icon: Utensils,
      title: "Weight Management",
      description:
        "Achieve sustainable weight loss with a comprehensive approach to nutrition and behavior change.",
    },
    {
      icon: TrendingUp,
      title: "Athletic Performance",
      description:
        "Enhance athletic performance and recovery with sports nutrition optimization.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
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
    <section id="services" className="py-20 sm:py-28 bg-white relative overflow-hidden" ref={ref}>
      
      {/* subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-16 w-72 h-72 bg-gradient-to-br from-yellow-100/30 to-transparent rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-[#6A431C]/10 to-transparent rounded-full blur-3xl"
        />

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* heading */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Services
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Specialized Nutrition Care
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From managing chronic conditions to optimizing athletic performance,
            I provide targeted nutrition therapy.
          </p>
        </motion.div>

        {/* cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                bg-gradient-to-br from-white to-yellow-50/40
                p-8 rounded-2xl
                border border-yellow-100
                hover:shadow-2xl
                transition-all duration-500
                group relative overflow-hidden
                "
              >
                {/* hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6A431C]/5 to-[#8B5A2B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="
                  w-14 h-14
                  bg-yellow-100
                  rounded-xl
                  flex items-center justify-center
                  mb-4
                  group-hover:bg-[#6A431C]
                  transition-colors
                  "
                >
                  <Icon className="w-7 h-7 text-[#6A431C] group-hover:text-white transition-colors" />
                </motion.div>

                {/* title */}
                <h3 className="font-semibold text-slate-900 text-lg mb-2 group-hover:text-[#6A431C] transition-colors">
                  {service.title}
                </h3>

                {/* description */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}