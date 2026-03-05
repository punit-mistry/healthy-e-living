'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Calendar, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-[#6A431C] via-[#8B5A2B] to-[#6A431C] relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Ready to Take Control of Your Health?
        </h2>

        <p className="text-xl text-yellow-50 mb-10 max-w-2xl mx-auto leading-relaxed">
          Let's discuss your health goals and create a personalized nutrition plan that works for your lifestyle.
        </p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-white text-[#6A431C] hover:bg-yellow-50 shadow-xl font-semibold"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-[#6A431C] hover:bg-white/10 font-semibold"
          >
            <Phone className="mr-2 h-5 w-5" />
            Call Now
          </Button>
        </motion.div>

        {/* Trust Row */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8 border-t-2 border-white/30 text-yellow-50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm">Free 15-min consultation</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center gap-3 hover:text-white transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/30 to-white/10 flex items-center justify-center hover:bg-white/40 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm">Results-driven approach</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
