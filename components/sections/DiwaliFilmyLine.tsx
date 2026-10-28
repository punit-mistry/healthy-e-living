"use client"

import { useEffect, useRef, useState } from "react"

const ROTATE_MS = 8000

/**
 * A filmy one-liner that changes every few seconds, plus a clapperboard that
 * skips to the next one. Rotation pauses on hover or focus, only runs while
 * the line is actually on screen, and is off for reduced-motion users (the
 * clapperboard still works).
 */
export default function DiwaliFilmyLine({ lines }: { lines: readonly string[] }) {
  const [index, setIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const paused = useRef(false)

  const next = () => setIndex((i) => (i + 1) % lines.length)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      const el = ref.current
      if (!el || paused.current || el.getClientRects().length === 0) return
      setIndex((i) => (i + 1) % lines.length)
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [lines.length])

  const pause = () => (paused.current = true)
  const resume = () => (paused.current = false)

  return (
    <div ref={ref} className="mt-5 flex items-center gap-2.5 pr-0 sm:mt-6 sm:gap-4 sm:pr-10" onMouseEnter={pause} onMouseLeave={resume} onFocus={pause} onBlur={resume}>
      <button
        type="button"
        onClick={next}
        aria-label="Next filmy line"
        data-track="diwali_dialogue"
        data-track-location="diwali_modal"
        className="diwali-clapper grid h-11 w-11 shrink-0 place-items-center rounded-full sm:h-12 sm:w-12 border-2 border-ink bg-butter text-ink shadow-[2px_2px_0_0_var(--color-ink)]"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" focusable="false">
          <rect x="3.5" y="10" width="17" height="10.5" rx="1.6" fill="var(--color-ink)" />
          <g className="diwali-clapper__arm">
            <path d="M3.2 9.2L19.6 5.2L18.9 2.4L2.5 6.4Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M6.5 5.5L8.6 7.9M10.6 4.5L12.7 6.9M14.7 3.5L16.8 5.9" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          <path d="M6 14h7M6 17h4.5" stroke="var(--color-butter)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <p key={index} className="diwali-line hand flex min-h-[2.5rem] items-center text-[0.98rem] min-[360px]:text-[1.1rem] leading-[1.15] text-coral-deep sm:min-h-[3.3rem] sm:text-[1.45rem]">
        &ldquo;{lines[index]}&rdquo;
      </p>
    </div>
  )
}
