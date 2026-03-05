'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { label: 'Medical Nutrition Therapy', href: '#services' },
        { label: 'Weight Management', href: '#services' },
        { label: 'Sports Nutrition', href: '#services' },
        { label: 'Chronic Disease Management', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <footer className="bg-linear-to-b from-[#2d1f14] via-[#3d2817] to-[#1a1410] text-slate-300 relative overflow-hidden">
      {/* Gradient background elements with brand colors */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-linear-to-br from-[#6A431C]/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-linear-to-tr from-[#8B5A2B]/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-[#6A431C] to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                H
              </div>
              <span className="font-serif text-lg font-semibold text-white">
                Health.e.living
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Expert nutrition counseling for better health and quality of life.
            </p>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#8B5A2B] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">
              Get nutrition tips and health insights delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-primary border border-secondary rounded text-sm text-white placeholder-white focus:outline-none focus:border-secondary transition-colors"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-linear-to-r from-[#6A431C] to-[#8B5A2B] hover:shadow-lg text-white rounded font-medium text-sm transition-all"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-linear from-[#6A431C]/30 to-transparent my-8" />

        {/* Bottom */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-sm text-slate-400">
            © {currentYear} Health.e.living. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* <a href="#" className="text-slate-400 hover:text-[#8B5A2B] transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-slate-400 hover:text-[#8B5A2B] transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.121 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a> */}
            <a href="#" className="text-slate-400 hover:text-[#8B5A2B] transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Legal */}
        <motion.div
          className="mt-8 pt-8 border-t border-linear from-[#6A431C]/30 to-transparent text-center text-xs "
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>
            This website is for informational purposes only. 
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
