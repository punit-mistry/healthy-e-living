"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SpinningText } from "./spinning-text/SpinningText";

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.1,
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

  return (
    <section id="about" className="py-20 sm:py-28 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
                About Irika Goyal
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Expert Nutrition Care with a Personal Touch
              </h2>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              With over 4 years of clinical experience, Irika Goyal specializes
              in helping individuals manage chronic diseases through
              personalized nutrition therapy. Her approach combines
              evidence-based science with compassionate, patient-centered care.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-[#6A431C] rounded text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Medical Nutrition Therapy
                  </p>
                  <p className="text-slate-600 text-sm">
                    Specialized treatment for various health conditions
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-[#6A431C] rounded text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Personalized Planning
                  </p>
                  <p className="text-slate-600 text-sm">
                    Nutrition plans tailored to your lifestyle and preferences
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-[#6A431C] rounded text-white flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Ongoing Support
                  </p>
                  <p className="text-slate-600 text-sm">
                    Regular follow-ups and adjustments for optimal results
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col relative pt-16"
          >
            {/* Spinning Text */}
            <div className="absolute -top-5 right-14 -translate-x-1/2">
              <SpinningText>
               Nourish • Balance • Thrive •
              </SpinningText>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl sm:text-5xl font-bold text-[#6A431C] mb-2">
                  4+
                </p>
                <p className="text-slate-600 font-medium">
                  Years of Experience
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl sm:text-5xl font-bold text-[#6A431C] mb-2">
                  100+
                </p>
                <p className="text-slate-600 font-medium">Patients Helped</p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl sm:text-5xl font-bold text-[#6A431C] mb-2">
                  95%
                </p>
                <p className="text-slate-600 font-medium">
                  Client Satisfaction
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-4xl sm:text-5xl font-bold text-[#6A431C] mb-2">
                  10+
                </p>
                <p className="text-slate-600 font-medium">Specializations</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
