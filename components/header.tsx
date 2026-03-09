'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

type Phase = 'center' | 'slide' | 'done'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>('center')
  const [scrolled, setScrolled] = useState(false)

  // Phase 1: logo appears centered (0–1000ms)
  // Phase 2: logo slides to left (1000–1650ms)
  // Phase 3: nav + CTA fade in (1650ms+)
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('slide'), 1000)
    const t2 = setTimeout(() => setPhase('done'),  1650)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#about',        label: 'About' },
    { href: '#services',     label: 'Services' },
    { href: '#approach',     label: 'Approach' },
    { href: '#reels',        label: 'Reels' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact',      label: 'Contact' },
  ]

  return (
    <>
      <style>{`
        .glass-header {
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.55) 0%,
            rgba(255,248,235,0.45) 50%,
            rgba(255,255,255,0.50) 100%
          );
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-bottom: 1px solid rgba(255,255,255,0.45);
          box-shadow: 0 4px 24px rgba(106,67,28,0.07), 0 1px 0 rgba(255,255,255,0.6) inset;
          transition: box-shadow 0.35s ease;
        }
        .glass-header.scrolled {
          box-shadow:
            0 4px 28px rgba(106,67,28,0.13),
            0 1px 0 rgba(255,255,255,0.6) inset;
        }

        .nav-link {
          position: relative;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(71,45,18,0.75);
          letter-spacing: 0.03em;
          transition: color 0.2s;
          text-decoration: none;
          white-space: nowrap;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 1.5px;
          background: #6A431C;
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover { color: #6A431C; }
        .nav-link:hover::after { width: 100%; }

        .logo-mark {
          background: linear-gradient(135deg, #6A431C, #a0632a);
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(106,67,28,0.3), 0 1px 0 rgba(255,255,255,0.3) inset;
          flex-shrink: 0;
        }

        /* ── Original Liquid Golden Glass CTA ── */
        .cta-liquid {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          padding: 0.45rem 1.25rem;
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          outline: none;
          color: #3d1f00;
          background: linear-gradient(
            135deg,
            rgba(255,220,100,0.75) 0%,
            rgba(218,160,50,0.85)  35%,
            rgba(255,195,60,0.70)  60%,
            rgba(200,140,30,0.80)  100%
          );
          box-shadow:
            0 0 0 1px rgba(255,215,80,0.7),
            0 1px 0 rgba(255,255,200,0.55) inset,
            0 -1px 0 rgba(160,100,10,0.3) inset,
            0 4px 18px rgba(200,140,20,0.35),
            0 1px 4px rgba(0,0,0,0.10);
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          transition: box-shadow 0.22s ease, transform 0.18s ease;
          will-change: transform;
        }
        .cta-liquid::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 52%;
          background: linear-gradient(180deg, rgba(255,255,230,0.45) 0%, rgba(255,240,180,0.10) 100%);
          border-radius: 999px 999px 60% 60%;
          pointer-events: none;
        }
        .cta-liquid::after {
          content: '';
          position: absolute;
          top: -50%; left: -75%;
          width: 50%; height: 200%;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,220,0.55) 50%, transparent 70%);
          transform: skewX(-20deg);
          animation: shimmer-sweep 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shimmer-sweep {
          0%   { left: -75%; opacity: 0; }
          15%  { opacity: 1; }
          60%  { left: 130%; opacity: 1; }
          61%  { opacity: 0; }
          100% { left: 130%; opacity: 0; }
        }
        .cta-liquid:hover {
          transform: translateY(-1px);
          box-shadow:
            0 0 0 1px rgba(255,220,90,0.9),
            0 1px 0 rgba(255,255,210,0.65) inset,
            0 -1px 0 rgba(160,100,10,0.35) inset,
            0 6px 28px rgba(200,140,20,0.50),
            0 2px 8px rgba(0,0,0,0.12);
        }
        .cta-liquid:active {
          transform: translateY(0px);
          box-shadow:
            0 0 0 1px rgba(200,150,40,0.7),
            0 4px 12px rgba(180,120,10,0.30);
        }
        .cta-liquid-full {
          width: 100%;
          justify-content: center;
          display: block;
          margin-top: 0.5rem;
          text-align: center;
        }
      `}</style>

      <header className={`glass-header sticky top-0 z-50${scrolled ? ' scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative flex items-center h-16">

            {/*
              Invisible ghost spacer — same size as the logo.
              Keeps the row layout stable so nav stays right-aligned
              once the logo animates into the left slot.
            */}
            <div
              className="invisible flex items-center gap-2.5 shrink-0 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-8 h-8 rounded-[10px]" />
              <span className="font-serif text-lg font-semibold whitespace-nowrap">Health.e.living</span>
            </div>

            {/* ── LOGO — starts centered, slides to left ── */}
            <motion.div
              className="absolute top-1/2"
              style={{ translateY: '-50%' }}
              initial={{ left: '50%', x: '-50%', opacity: 0, scale: 0.88 }}
              animate={
                phase === 'center'
                  ? { left: '50%', x: '-50%', opacity: 1, scale: 1 }
                  : { left: '0%',  x: '0%',   opacity: 1, scale: 1 }
              }
              transition={
                phase === 'center'
                  ? { duration: 0.5, ease: 'easeOut' }
                  : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Link href="/" className="flex items-center gap-2.5">
                <motion.div
                  className="logo-mark w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                >
                  H
                </motion.div>
                <span className="font-serif text-lg font-semibold text-slate-900 whitespace-nowrap">
                  Health.e.living
                </span>
              </Link>
            </motion.div>

            {/* ── DESKTOP NAV ── */}
            {phase === 'done' && (
              <motion.nav
                className="hidden md:flex items-center gap-7 ml-auto"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: 'easeOut' }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            )}

            {/* ── CTA ── */}
            {phase === 'done' && (
              <motion.div
                className="hidden md:flex ml-6"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: navLinks.length * 0.06 + 0.05 }}
              >
                <button className="cta-liquid">Call Now</button>
              </motion.div>
            )}

            {/* ── MOBILE TOGGLE ── */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#6A431C] ml-auto"
              aria-label="Toggle menu"
              animate={{ opacity: phase === 'center' ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ pointerEvents: phase === 'center' ? 'none' : 'auto' }}
            >
              <AnimatePresence mode="wait">
                {isOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={22} /></motion.span>
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
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden border-t border-white/40 py-4 space-y-3"
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block nav-link py-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <button className="cta-liquid cta-liquid-full">Call Now</button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>
    </>
  )
}