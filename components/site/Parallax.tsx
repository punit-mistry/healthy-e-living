"use client"

import { useEffect, useRef } from "react"

/**
 * Drifts its children against the scroll (speed < 0 floats up faster, > 0 lags)
 * and spins them slightly. Purely decorative; static for reduced-motion users.
 */
export default function Parallax({
  speed = 0.15,
  spin = 0,
  className,
  children,
}: {
  speed?: number
  spin?: number
  className?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = ref.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.parentElement?.getBoundingClientRect()
      if (!rect || rect.bottom < -200 || rect.top > window.innerHeight + 200) return
      const offset = window.innerHeight / 2 - (rect.top + rect.height / 2)
      el.style.transform = `translate3d(0, ${offset * speed}px, 0) rotate(${offset * spin}deg)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [speed, spin])

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none will-change-transform ${className ?? ""}`}>
      {children}
    </div>
  )
}
