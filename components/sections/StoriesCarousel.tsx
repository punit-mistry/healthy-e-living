"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Testimonial } from "@/data/testimonials"

const styles = [
  { card: "bg-butter", mark: "text-coral", fade: "from-butter" },
  { card: "bg-mint", mark: "text-green", fade: "from-mint" },
]

const LONG = 330
const DELAY = 6000

function Card({
  t,
  i,
  active,
  onToggle,
}: {
  t: Testimonial
  i: number
  active: boolean
  onToggle: (open: boolean) => void
}) {
  const s = styles[i % styles.length]
  const [open, setOpen] = useState(false)
  const long = t.quote.length > LONG
  const quoteRef = useRef<HTMLQuoteElement>(null)
  return (
    <figure
      data-card
      className={`group relative flex w-[85%] shrink-0 snap-start flex-col rounded-[1.5rem] p-5 pt-8 transition-all duration-500 ease-out hover:-translate-y-1 sm:w-[26rem] sm:p-6 sm:pt-9 ${s.card} ${
        active ? "opacity-100" : "opacity-70 sm:scale-[0.98]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-4 left-5 font-italic text-[4rem] leading-none transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${s.mark}`}
      >
        &ldquo;
      </span>
      <div className="relative">
        <blockquote
          ref={quoteRef}
          style={long ? { maxHeight: open ? (quoteRef.current?.scrollHeight ?? 2000) : 272 } : undefined}
          className={`space-y-3 overflow-hidden text-base leading-relaxed text-ink transition-[max-height] duration-500 ease-in-out ${
            long ? "" : ""
          }`}
        >
          {t.title && <p className="font-display text-lg font-bold">{t.title}</p>}
          {t.quote.split("\n\n").map((para, j) => (
            <p key={j}>{para}</p>
          ))}
        </blockquote>
        {long && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t ${s.fade} to-transparent transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>
      {long && (
        <button
          type="button"
          onClick={() => {
            setOpen(!open)
            onToggle(!open)
          }}
          aria-expanded={open}
          className="mt-2 self-start text-sm font-bold underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <figcaption className="mt-auto border-t-2 border-ink/15 pt-3">
        <span className="mt-4 block font-display text-lg font-bold">{t.name}</span>
        <span className="text-sm text-ink-soft">{t.context}</span>
      </figcaption>
    </figure>
  )
}

export default function StoriesCarousel({ items }: { items: Testimonial[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [cycle, setCycle] = useState(0) // restarts the progress animation
  const paused = useRef(false)
  const expanded = useRef(0)
  const reduced = useRef(false)

  const goTo = useCallback((n: number) => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>("[data-card]")
    const card = cards[n]
    if (!card) return
    el.scrollTo({ left: card.offsetLeft - cards[0].offsetLeft, behavior: reduced.current ? "auto" : "smooth" })
    setCycle((c) => c + 1)
  }, [])

  // Track which card is nearest the left edge.
  const onScroll = () => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>("[data-card]")
    const base = cards[0].offsetLeft
    let best = 0
    let dist = Infinity
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - base - el.scrollLeft)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    // At the very end, the last card may not reach the left edge.
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) best = cards.length - 1
    setIndex(best)
  }

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced.current || items.length < 2) return
    const id = window.setInterval(() => {
      if (paused.current || expanded.current > 0 || document.hidden) return
      const el = ref.current
      if (!el) return
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
      goTo(atEnd ? 0 : Math.min(index + 1, items.length - 1))
    }, DELAY)
    return () => window.clearInterval(id)
  }, [index, items.length, goTo, cycle])

  const step = (dir: 1 | -1) => goTo(Math.max(0, Math.min(items.length - 1, index + dir)))
  const btn =
    "grid h-11 w-11 place-items-center rounded-full border-2 border-ink bg-paper text-lg font-bold transition duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

  return (
    <div
      className="mt-8"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => window.setTimeout(() => (paused.current = false), 4000)}
    >
      <div
        ref={ref}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client stories"
        tabIndex={0}
        className="-mx-4 flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-4 pt-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <Card
            key={t.name}
            t={t}
            i={i}
            active={i === index}
            onToggle={(o) => (expanded.current += o ? 1 : -1)}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex gap-3">
          <button type="button" onClick={() => step(-1)} aria-label="Previous story" className={btn}>
            &larr;
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next story" className={btn}>
            &rarr;
          </button>
        </div>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose story">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Story ${i + 1}: ${t.name}`}
              onClick={() => goTo(i)}
              className={`relative h-2.5 overflow-hidden rounded-full bg-ink/15 transition-all duration-500 ${
                i === index ? "w-10" : "w-2.5 hover:bg-ink/30"
              }`}
            >
              {i === index && (
                <span
                  key={`${index}-${cycle}`}
                  className="absolute inset-0 origin-left rounded-full bg-green motion-safe:animate-[story-fill_6s_linear_forwards]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <style>{`@keyframes story-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  )
}
