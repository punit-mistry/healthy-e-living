"use client"

import { useEffect, useRef } from "react"
import { Sparkle } from "@/components/brand/Motifs"

const rows = [
  ["Real food", "Indian plates", "No crash diets", "Your family table", "Evidence, not trends"],
  ["PCOS", "Diabetes", "Gut health", "Weight loss", "Pregnancy", "Sports nutrition"],
]

/** Big headline bands that slide sideways as you scroll, in opposite directions. */
export default function ScrollMarquee() {
  const section = useRef<HTMLElement>(null)
  const tracks = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const el = section.current
    if (!el) return
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      tracks.current.forEach((t, i) => {
        if (!t) return
        const dir = i % 2 === 0 ? -1 : 1
        t.style.transform = `translate3d(${(dir * p * 28 - (dir === 1 ? 28 : 0)) }%, 0, 0)`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={section} aria-label="What Irika helps with" className="overflow-hidden bg-green py-8 text-cream sm:py-12">
      {rows.map((words, i) => (
        <div
          key={i}
          ref={(n) => {
            tracks.current[i] = n
          }}
          aria-hidden={i > 0 ? "true" : undefined}
          className={`flex w-max items-center gap-6 whitespace-nowrap will-change-transform ${i > 0 ? "mt-3 sm:mt-5" : ""}`}
        >
          {[...words, ...words, ...words].map((w, j) => (
            <span key={j} className="flex items-center gap-6">
              <span className={`font-display font-extrabold tracking-tight ${i === 0 ? "text-5xl text-cream sm:text-7xl" : "text-4xl text-butter sm:text-6xl"}`}>{w}</span>
              <Sparkle className="h-7 w-7 flex-none sm:h-10 sm:w-10" color={i === 0 ? "var(--color-coral)" : "var(--color-mint)"} />
            </span>
          ))}
        </div>
      ))}
    </section>
  )
}
