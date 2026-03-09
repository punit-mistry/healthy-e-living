"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

const benefits = [
  { id: 1, text: "Diabetes management" },
  { id: 2, text: "Heart disease and hypertension" },
  { id: 3, text: "Weight loss and wellness" },
  { id: 4, text: "Gastrointestinal disorders" },
  { id: 5, text: "Kidney disease management" },
  { id: 6, text: "Cancer nutrition support" },
  { id: 7, text: "Food allergies and intolerances" },
  { id: 8, text: "Athletic performance optimization" },
  { id: 9, text: "Pregnancy and postpartum nutrition" },
  { id: 10, text: "Bone health and osteoporosis" },
  // { id: 11, text: "Autoimmune conditions" },
  // { id: 12, text: "Mental health and mood support" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Benefits() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 sm:py-28 bg-gradient-to-br from-white via-yellow-50/50 to-orange-50/30 relative overflow-hidden">
        
        {/* Background shapes (static) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-bl from-[#6A431C]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-yellow-200/30 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Heading */}
          <m.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
              Who Can Benefit
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              {/* I Help Patients With */}
               I have the expertise to support you in
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              managing a specific condition & optimizing your overall health.<br/>
              {/* I have the expertise to support you. */}
            </p>
          </m.div>

          {/* Benefits list */}
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {benefits.map((benefit) => (
              <m.div
                key={benefit.id}
                variants={itemVariants}
                whileHover={{ x: 3, y: -2 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-white to-yellow-50/50 border-2 border-yellow-200 rounded-xl hover:border-[#6A431C] hover:shadow-lg transition-all group relative transform-gpu"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#6A431C] to-[#8B5A2B] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <span className="text-slate-900 font-medium group-hover:text-[#6A431C] transition-colors">
                  {benefit.text}
                </span>
              </m.div>
            ))}
          </m.div>

          {/* CTA */}
          <m.div
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
          >
            <p className="text-slate-600 mb-6">
              If your specific condition isn't listed, please reach out.
              I may still be able to help.
            </p>

            <button className="hover:cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6A431C] to-[#8B5A2B] text-white rounded-lg hover:shadow-lg transition-all font-medium">
              Discuss Your Needs
            </button>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}