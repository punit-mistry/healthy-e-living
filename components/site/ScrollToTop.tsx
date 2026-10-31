"use client"

import { useEffect, useRef, useState } from "react"
import { scrollToTop } from "./SmoothScroll"

/** Round "back to top" button, bottom-right above the WhatsApp shortcut, ringed by scroll progress. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const ring = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      ring.current?.style.setProperty("stroke-dashoffset", String(1 - p))
      setVisible(window.scrollY > 500)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => scrollToTop()}
      tabIndex={visible ? 0 : -1}
      className={`no-print fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-paper text-ink shadow-[0_3px_0_0_var(--color-ink),0_10px_24px_-12px_rgb(37_45_39/0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-coral sm:bottom-24 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle
          ref={ring}
          cx="24"
          cy="24"
          r="21"
          pathLength={1}
          fill="none"
          stroke="var(--color-coral-deep)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
        />
      </svg>
      <svg viewBox="0 0 24 24" className="relative h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
