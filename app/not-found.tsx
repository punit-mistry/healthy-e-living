"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const numberVariants = {
  hidden: { scale: 0.3, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 },
  },
}

const floatingOrbs = [
  { size: 250, top: "-15%", left: "10%", bg: "bg-yellow-100", delay: 0 },
  { size: 200, bottom: "-10%", right: "15%", bg: "bg-orange-100", delay: 1 },
  { size: 150, top: "20%", right: "5%", bg: "bg-amber-100", delay: 2 },
  { size: 180, bottom: "30%", left: "5%", bg: "bg-yellow-50", delay: 0.5 },
]

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {floatingOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none ${orb.bg} rounded-full blur-[100px] opacity-50`}
          style={{
            width: orb.size,
            height: orb.size,
            top: "top" in orb ? orb.top : undefined,
            bottom: "bottom" in orb ? orb.bottom : undefined,
            left: "left" in orb ? orb.left : undefined,
            right: "right" in orb ? orb.right : undefined,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8 + orb.delay * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      <motion.div
        className="relative text-center px-4 sm:px-6 max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={numberVariants} className="mb-6">
          <span className="font-serif text-[10rem] sm:text-[14rem] font-bold bg-gradient-to-br from-[#6A431C] to-[#8B5A2B] bg-clip-text text-transparent leading-none block select-none">
            404
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-16 h-1 bg-gradient-to-r from-[#6A431C] to-[#8B5A2B] rounded-full mx-auto mb-6"
        />

        <motion.h1
          variants={itemVariants}
          className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-600 mb-10 max-w-md mx-auto leading-relaxed"
        >
          Looks like you&apos;ve wandered off the nutrition plan.
          <br />
          This page doesn&apos;t exist — but a healthier you is just a click away.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#6A431C] text-white rounded-xl hover:bg-[#5A3715] transition-all font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <a
            href="https://wa.me/919833640891"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#6A431C] text-[#6A431C] rounded-xl hover:bg-[#6A431C] hover:text-white transition-all font-medium hover:-translate-y-0.5"
          >
            Consult a Dietitian
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-wrap justify-center gap-2.5"
        >
          {[
            { label: "Weight Loss", href: "/services/weight-loss" },
            { label: "PCOS Diet", href: "/services/pcos-diet" },
            { label: "Diabetes Diet", href: "/services/diabetes-diet" },
            { label: "Gut Health", href: "/services/gut-health" },
            { label: "Mumbai Dietitian", href: "/locations/mumbai" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs px-3.5 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-[#6A431C] hover:bg-[#6A431C] hover:text-white hover:border-[#6A431C] transition-all font-medium"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}
