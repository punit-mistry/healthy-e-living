"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Award, BookOpen, Users } from "lucide-react";

const credentials = [
  {
    id: 1,
    icon: Award,
    title: "Registered Dietitian Nutritionist",
    details: "MS in Nutrition Science, RDN, LDN",
    org: "Academy of Nutrition and Dietetics",
  },
  {
    id: 2,
    icon: BookOpen,
    title: "Specialized Training",
    details: "Sports Nutrition Specialty, Board Certified Specialist (CSSD)",
    org: "Commission on Dietetic Registration",
  },
  {
    id: 3,
    icon: Users,
    title: "Professional Memberships",
    details:
      "Active member of AND, dietetic practice groups and professional networks",
    org: "Continuing education & professional development",
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

export default function Credentials() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <m.div
            className="text-center mb-16"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
              Qualifications
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Evidence of Expertise
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dedicated to maintaining the highest standards of clinical
              practice and continuing education.
            </p>
          </m.div>

          {/* Cards */}
          <m.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {credentials.map((credential) => {
              const Icon = credential.icon;

              return (
                <m.div
                  key={credential.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  className="
                  bg-slate-50
                  border border-slate-200
                  rounded-2xl
                  p-8
                  transform-gpu
                  hover:border-[#6A431C]
                  hover:shadow-lg
                  transition-all
                  "
                >
                  <div className="w-16 h-16 bg-[#6A431C] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    {credential.title}
                  </h3>

                  <p className="text-[#6A431C] font-medium text-sm mb-3">
                    {credential.details}
                  </p>

                  <p className="text-slate-600 text-sm">{credential.org}</p>
                </m.div>
              );
            })}
          </m.div>

          {/* Bottom Info */}
          <m.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-8 sm:p-12 text-center"
          >
            <p className="text-slate-700 leading-relaxed">
              I maintain active licenses in multiple states and keep current
              with continuing education requirements. All services are
              evidence-based and compliant with Academy of Nutrition and
              Dietetics Standards of Practice.
            </p>
          </m.div>

        </div>
      </section>
    </LazyMotion>
  );
}