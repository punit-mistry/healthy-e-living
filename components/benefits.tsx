'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Benefits() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const benefits = [
    'Diabetes management and control',
    'Heart disease and hypertension',
    'Weight loss and wellness',
    'Gastrointestinal disorders',
    'Kidney disease management',
    'Cancer nutrition support',
    'Food allergies and intolerances',
    'Athletic performance optimization',
    'Pregnancy and postpartum nutrition',
    'Bone health and osteoporosis',
    'Autoimmune conditions',
    'Mental health and mood support',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-white via-yellow-50/50 to-orange-50/30 relative overflow-hidden" ref={ref}>
      {/* Gradient shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-bl from-[#6A431C]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-yellow-200/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={itemVariants}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Who Can Benefit
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            I Help Patients With
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether managing a specific condition or optimizing your overall health, I have the expertise to support you.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 4, y: -2 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-white to-yellow-50/50 border-2 border-yellow-200 rounded-xl hover:border-[#6A431C] hover:shadow-lg transition-all group overflow-hidden relative"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6A431C]/5 to-[#8B5A2B]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-6 h-6 bg-gradient-to-br from-[#6A431C] to-[#8B5A2B] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all relative z-10">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-slate-900 font-medium relative z-10 group-hover:text-[#6A431C] transition-colors">{benefit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-6">
            If your specific condition isn't listed, please reach out. I may still be able to help.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6A431C] to-[#8B5A2B] text-white rounded-lg hover:shadow-lg transition-all font-medium group relative overflow-hidden">
            <span className="relative z-10">Discuss Your Needs</span>
            <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5A2B] to-[#6A431C] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
