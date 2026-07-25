"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, MessageCircle, X } from "lucide-react"

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.5, y: 16 },
}

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group flex items-center">
      <div className="absolute right-full mr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div className="bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          {label}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-slate-800" />
        </div>
      </div>
      {children}
    </div>
  )
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false)

  const scrollToTop = () => {
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    setOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="actions"
            className="flex flex-col items-center gap-3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
              exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
            }}
          >
            <motion.div key="scroll-top" variants={itemVariants}>
              <Tooltip label="Scroll to top">
                <button
                  onClick={scrollToTop}
                  className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-[#6A431C]"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </Tooltip>
            </motion.div>

            <motion.div key="whatsapp" variants={itemVariants}>
              <Tooltip label="Chat on WhatsApp">
                <a
                  href="https://wa.me/919833640891"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              </Tooltip>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.92 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200 ${
          open
            ? "bg-slate-800 hover:bg-slate-700"
            : "bg-[#6A431C] hover:bg-[#5A3715]"
        }`}
        aria-label={open ? "Close menu" : "Quick actions"}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}
