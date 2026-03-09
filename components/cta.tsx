"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-r from-[#6A431C] via-[#8B5A2B] to-[#6A431C]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">

        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 50, 0], x: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 25, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Take Control of Your Health?
        </h2>

        <p className="text-xl text-yellow-50 mb-10 max-w-2xl mx-auto leading-relaxed">
          Let's discuss your health goals and create a personalized nutrition
          plan that works for your lifestyle.
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* <Button
            size="lg"
            className="bg-white text-[#6A431C] hover:bg-yellow-50 shadow-xl font-semibold hover:scale-105 transition-transform"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Consultation
          </Button> */}

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white  hover:bg-white text-[#6A431C] hover:text-[#6A431C] font-semibold hover:scale-105 transition-all"
          >
            <Phone className="mr-2 h-5 w-5" />
            Schedule Call Now 
          </Button>
        </motion.div>

        {/* Trust Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8 border-t border-white/30 text-yellow-50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            "Guided Consultation",
            "Online Payments Accepted ",
            "Results-driven approach",
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center hover:bg-white/40 transition">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 
                    8a1 1 0 01-1.414 0l-4-4a1 1 
                    0 011.414-1.414L8 12.586l7.293-7.293a1 
                    1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <span className="text-sm">{text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}