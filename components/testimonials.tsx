"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Type 2 Diabetes Management",
    location: "Mumbai",
    content:
      "Working with Irika has been life-changing. My blood sugar levels are now well-controlled, and I feel more energetic than ever. The personalized meal plans are practical and delicious!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rajesh Patel",
    role: "Cardiovascular Health",
    location: "Bandra, Mumbai",
    content:
      "After my heart attack, I was lost about what to eat. Irika's detailed guidance and follow-up support helped me make lasting changes. My cardiologist was impressed with my progress.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anjali Desai",
    role: "Athletic Performance",
    location: "Andheri, Mumbai",
    content:
      "My sports performance improved noticeably after optimizing my nutrition. The guidance on fueling and recovery is exactly what I needed to level up my training.",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Weight Management",
    location: "Navi Mumbai",
    content:
      "Unlike other diets, this approach taught me about sustainable nutrition. I lost 35 pounds and have kept it off for 4 years now. The support made all the difference.",
    rating: 5,
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

export default function Testimonials() {
  return (
    <LazyMotion features={domAnimation}>
      <section id="testimonials" className="py-20 sm:py-28 bg-white">
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
              Patient Stories
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Transformations & Success Stories
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real results from real patients who took control of their health
              through nutrition.
            </p>
          </m.div>

          {/* Testimonials */}
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {testimonials.map((testimonial) => (
              <m.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-[#6A431C] hover:shadow-xl transition-all transform-gpu group"
              >
                <div className="flex items-center gap-2 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-700 leading-relaxed mb-6 text-sm">
                  "{testimonial.content}"
                </p>

                <div className="border-t border-slate-200 pt-4">
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-[#6A431C] font-medium">
                    {testimonial.role}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {testimonial.location}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Trust section */}
          {/* <m.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-8 text-center"
          >
            <p className="text-slate-600 mb-4">
              <span className="font-semibold text-slate-900">
                Trusted by 100+ patients
              </span>{" "}
              with 4+ years of success stories
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
              <span>• Experienced & Credentialed</span>
              <span>• Evidence-Based Practice</span>
              <span>• Compassionate Care</span>
            </div>
          </m.div> */}

        </div>
      </section>
    </LazyMotion>
  );
}