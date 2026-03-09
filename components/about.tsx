"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { SpinningText } from "./spinning-text/SpinningText";

const stats = [
  { id: 1, value: "4+", label: "Years of Experience" },
  { id: 2, value: "100+", label: "Patients Helped" },
  { id: 3, value: "95%", label: "Client Satisfaction" },
  { id: 4, value: "10+", label: "Specializations" },
];

const features = [
  {
    id: 1,
    title: "Medical Nutrition Therapy",
    desc: "Specialized treatment for various health conditions",
  },
  {
    id: 2,
    title: "Personalized Planning",
    desc: "Nutrition plans tailored to your lifestyle and preferences",
  },
  {
    id: 3,
    title: "Ongoing Support",
    desc: "Regular follow-ups and adjustments for optimal results",
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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function About() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="about" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <m.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Left */}
            <m.div variants={itemVariants} className="space-y-6">
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

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.id} className="flex gap-4">
                    <div className="w-6 h-6 bg-[#6A431C] rounded text-white flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        {feature.title}
                      </p>
                      <p className="text-slate-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </m.div>

            {/* Right */}
            <m.div
              variants={itemVariants}
              className="flex flex-col relative pt-16"
            >
              {/* Spinning text */}
              <div className="absolute -top-5 right-14 -translate-x-1/2 hidden md:block">
                <SpinningText>Nourish • Balance • Thrive •</SpinningText>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 sm:gap-8 ">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm group transform-gpu transition-transform hover:-translate-y-1 cursor-pointer "
                  >
                    <p className="text-4xl sm:text-5xl font-bold text-[#6A431C] mb-2 group-hover:scale-[1.08] duration-300">
                      {stat.value}
                    </p>

                    <p className="text-slate-600 font-medium ">{stat.label}</p>
                  </div>
                ))}
              </div>
            </m.div>

          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}