'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)

  // After mount: show only logo for 1.4s, then expand full navbar
  useEffect(() => {
    const t = setTimeout(() => setExpanded(true), 1400)
    return () => clearTimeout(t)
  }, [])

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#approach', label: 'Approach' },
    { href: '#reels', label: 'Reels' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      <style>{`
        .glass-header {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(255, 248, 235, 0.45) 50%,
            rgba(255, 255, 255, 0.50) 100%
          );
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.45);
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 4px 32px rgba(106, 67, 28, 0.06),
            0 1px 8px rgba(0,0,0,0.04);
        }

        .glass-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,0.18) 0%,
            transparent 100%
          );
          pointer-events: none;
        }

        .nav-link {
          position: relative;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(71, 45, 18, 0.75);
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #6A431C;
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover { color: #6A431C; }
        .nav-link:hover::after { width: 100%; }

        .cta-glass {
          background: rgba(106, 67, 28, 0.08);
          border: 1px solid rgba(106, 67, 28, 0.28);
          color: #6A431C;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          border-radius: 999px;
          padding: 0.45rem 1.2rem;
          transition: background 0.2s, box-shadow 0.2s;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }
        .cta-glass:hover {
          background: rgba(106, 67, 28, 0.14);
          box-shadow: 0 4px 16px rgba(106, 67, 28, 0.18);
        }

        .logo-mark {
          background: linear-gradient(135deg, #6A431C, #a0632a);
          border-radius: 10px;
          box-shadow:
            0 2px 8px rgba(106,67,28,0.3),
            0 1px 0 rgba(255,255,255,0.3) inset;
        }
      `}</style>

      <header className="glass-header sticky top-0 z-50 relative overflow-hidden">

        {/* Subtle floating orbs inside header */}
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-16 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(255,220,130,0.18), transparent)', filter: 'blur(20px)' }}
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-0 right-1/3 w-48 h-12 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(106,67,28,0.1), transparent)', filter: 'blur(16px)' }}
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center h-16">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                className="logo-mark w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                whileHover={{ scale: 1.08, rotate: 3 }}
              >
                H
              </motion.div>

              <motion.span
                className="font-serif text-lg font-semibold text-slate-900"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
              >
                Health.e.living
              </motion.span>
            </Link>

            {/* ── DESKTOP NAV — slides in after delay ── */}
            <AnimatePresence>
              {expanded && (
                <motion.nav
                  className="hidden md:flex items-center gap-7"
                  initial={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className="nav-link"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 180, damping: 20 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>

            {/* ── CTA — slides in after delay ── */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  className="hidden md:flex"
                  initial={{ opacity: 0, scale: 0.88, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.35 }}
                >
                  <button className="cta-glass">Call Now</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── MOBILE TOGGLE ── */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#6A431C]"
              aria-label="Toggle menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── MOBILE MENU ── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden border-t border-white/40 py-4 space-y-3"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block nav-link py-1"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <button className="cta-glass w-full mt-2">Call Now</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}