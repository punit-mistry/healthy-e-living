'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star } from 'lucide-react'

export default function Testimonials() {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Type 2 Diabetes Management',
      location: 'Mumbai',
      content: 'Working with Irika has been life-changing. My blood sugar levels are now well-controlled, and I feel more energetic than ever. The personalized meal plans are practical and delicious!',
      rating: 5,
    },
    {
      name: 'Rajesh Patel',
      role: 'Cardiovascular Health',
      location: 'Bandra, Mumbai',
      content: 'After my heart attack, I was lost about what to eat. Irika\'s detailed guidance and follow-up support helped me make lasting changes. My cardiologist was impressed with my progress.',
      rating: 5,
    },
    {
      name: 'Anjali Desai',
      role: 'Athletic Performance',
      location: 'Andheri, Mumbai',
      content: 'My sports performance improved noticeably after optimizing my nutrition. The guidance on fueling and recovery is exactly what I needed to level up my training.',
      rating: 5,
    },
    {
      name: 'Vikram Singh',
      role: 'Weight Management',
      location: 'Navi Mumbai',
      content: 'Unlike other diets, this approach taught me about sustainable nutrition. I lost 35 pounds and have kept it off for 4 years now. The support made all the difference.',
      rating: 5,
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
    <section id="testimonials" className="py-20 sm:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <p className="text-[#6A431C] font-semibold text-sm uppercase tracking-widest mb-3">
            Patient Stories
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Transformations & Success Stories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real results from real patients who took control of their health through nutrition.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              style={{
                perspective: '1000px',
              }}
              whileHover={{
                rotateY: 2,
                rotateX: -2,
                scale: 1.02,
              }}
              className="relative bg-gradient-to-br from-white to-slate-50 border-2 border-transparent rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              animate={{
                borderColor: hoveredCard === index ? '#6A431C' : '#e5e5e5',
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6A431C]/10 to-[#8B5A2B]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
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
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-gradient rounded-2xl p-8 text-center relative overflow-hidden"
        >
          {/* Gradient border background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6A431C]/20 to-[#8B5A2B]/20 -z-10" />
          
          <p className="text-slate-600 mb-4">
            <span className="font-semibold text-slate-900">Trusted by 100+ patients</span> with 4+ years of success stories
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#6A431C] rounded-full" />
              <span>Experienced & Credentialed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#6A431C] rounded-full" />
              <span>Evidence-Based Practice</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#6A431C] rounded-full" />
              <span>Compassionate Care</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
