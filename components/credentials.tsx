'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, BookOpen, Users } from 'lucide-react'

export default function Credentials() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const credentials = [
    {
      icon: Award,
      title: 'Registered Dietitian Nutritionist',
      details: 'MS in Nutrition Science, RDN, LDN',
      org: 'Academy of Nutrition and Dietetics',
    },
    {
      icon: BookOpen,
      title: 'Specialized Training',
      details: 'Sports Nutrition Specialty, Board Certified Specialist (CSSD)',
      org: 'Commission on Dietetic Registration',
    },
    {
      icon: Users,
      title: 'Professional Memberships',
      details: 'Active member of AND, dietetic practice groups and professional networks',
      org: 'Continuing education & professional development',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Qualifications
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Evidence of Expertise
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Dedicated to maintaining the highest standards of clinical practice and continuing education.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {credentials.map((credential, index) => {
            const Icon = credential.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-[#6A431C] hover:shadow-lg transition-all"
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
                <p className="text-slate-600 text-sm">
                  {credential.org}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-8 sm:p-12 text-center"
        >
          <p className="text-slate-700 leading-relaxed">
            I maintain active licenses in multiple states and keep current with continuing education requirements. All services are evidence-based and compliant with Academy of Nutrition and Dietetics Standards of Practice.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
