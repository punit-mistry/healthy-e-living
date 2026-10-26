/**
 * "Happy Diwali, happier you" — the seasonal offer card, shown in DiwaliOfferModal.
 *
 * The bottom edge of the card is the "ground" (a diya on the label, an anar
 * fountain on the corner); the sky above and to the right gets a rocket on a
 * dotted trail and a couple of bursts. Every illustration is decorative
 * (aria-hidden) and every animation lives in globals.css under
 * prefers-reduced-motion, so the offer reads the same with motion off.
 */

import type { CSSProperties, ReactNode } from "react"
import { Sparkle, Underline } from "@/components/brand/Motifs"
import DiwaliFilmyLine from "@/components/sections/DiwaliFilmyLine"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { formatInr } from "@/lib/format"
import { diwaliOffer } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

type Vars = CSSProperties & Record<`--${string}`, string | number>

/* Sticker outline: scallops of slightly uneven size, like a hand-cut label. */
const BADGE = (() => {
  const n = 16
  const inner = 40
  const bumps = [54, 51.5, 53, 50.5, 53.5, 51]
  const at = (r: number, a: number) => `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`
  let d = `M${at(inner, 0)}`
  for (let i = 0; i < n; i++) {
    const mid = ((i + 0.5) / n) * Math.PI * 2
    const end = ((i + 1) / n) * Math.PI * 2
    d += `Q${at(bumps[i % bumps.length], mid)} ${at(inner, end)}`
  }
  return `${d}Z`
})()

/* Radial firework: alternating long/short rays around (0, 0). */
function burstRays(count: number, r1: number, long: number, short: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2
    const r2 = i % 2 === 0 ? long : short
    return `M${(Math.cos(a) * r1).toFixed(1)} ${(Math.sin(a) * r1).toFixed(1)}L${(Math.cos(a) * r2).toFixed(1)} ${(Math.sin(a) * r2).toFixed(1)}`
  })
}
const SKY_RAYS = burstRays(10, 4, 12, 8.5)
const CORNER_RAYS = burstRays(8, 4.5, 13, 9)

/* Anar sparks, by resting position; they animate out from the nozzle (30, 34). */
const SPARKS = [
  { x: 30, y: 6, r: 2.2, c: "var(--color-marigold)", d: 2.9 },
  { x: 19, y: 13, r: 1.8, c: "var(--color-coral)", d: 3.4 },
  { x: 41, y: 12, r: 2, c: "var(--color-marigold)", d: 2.6 },
  { x: 11, y: 24, r: 1.5, c: "var(--color-marigold)", d: 3.8 },
  { x: 49, y: 22, r: 1.6, c: "var(--color-coral)", d: 3.1 },
  { x: 24, y: 2, r: 1.3, c: "var(--color-coral)", d: 4.2 },
]

function Star4({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0 -10C0.5 -3 3 -0.5 10 0C3 0.5 0.5 3 0 10C-0.5 3 -3 0.5 -10 0C-3 -0.5 -0.5 -3 0 -10Z"
      fill={color}
    />
  )
}

/** A friendly Diwali rocket on its stick, flying up-right along a dotted trail. */
function Rocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 -12 134 112" className={className} aria-hidden="true" focusable="false">
      <path d="M64 58C50 70 38 72 28 82S12 96 4 98" fill="none" stroke="var(--color-coral)" strokeWidth="3" strokeLinecap="round" strokeDasharray="0 7.5" />
      <Star4 x={36} y={70} s={0.45} color="var(--color-marigold)" />
      <Star4 x={14} y={88} s={0.3} color="var(--color-green-soft)" />
      <g transform="translate(92 28) rotate(45)">
        <g className="diwali-rocket-fly">
          <path d="M4.5 8L4.5 40" stroke="var(--color-green-deep)" strokeWidth="1.8" strokeLinecap="round" />
          <path className="diwali-flame" d="M-3.5 9C-3 15 -1 19 0 22C1 19 3 15 3.5 9Z" fill="var(--color-butter)" stroke="var(--color-coral)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M-5 1L-10 10L-5 8Z M5 1L10 10L5 8Z" fill="var(--color-green)" stroke="var(--color-ink)" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="-5.5" y="-14" width="11" height="23" rx="3" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.8" />
          <rect x="-4.6" y="1" width="9.2" height="3.6" fill="var(--color-butter)" />
          <path d="M-5.5 -13.5L0 -25L5.5 -13.5Z" fill="var(--color-coral)" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M-2.4 -7.5Q0 -5 2.4 -7.5" fill="none" stroke="var(--color-coral)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
      <g transform="translate(118 2)">
        <g className="diwali-pop diwali-pop--rocket">
          {SKY_RAYS.map((d, i) => (
            <path key={d} d={d} stroke={i % 2 ? "var(--color-marigold)" : "var(--color-coral)"} strokeWidth="2.4" strokeLinecap="round" />
          ))}
          <circle r="2" fill="var(--color-marigold)" />
        </g>
      </g>
    </svg>
  )
}

/** Clay anar (flower pot) with a fountain of sparks. */
function Anar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 72" className={className} aria-hidden="true" focusable="false">
      {SPARKS.map((s, i) => (
        <circle
          key={i}
          className="diwali-spark"
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill={s.c}
          style={{ "--fx": `${30 - s.x}px`, "--fy": `${34 - s.y}px`, "--dur": `${s.d}s`, "--delay": `${i * 0.45}s` } as Vars}
        />
      ))}
      <Star4 x={36} y={4} s={0.5} color="var(--color-marigold)" />
      <path d="M24 39L36 39L47 67L13 67Z" fill="var(--color-coral)" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M19.6 50L40.4 50L42.6 56L17.4 56Z" fill="var(--color-butter)" />
      <path d="M17.4 56L42.6 56" stroke="var(--color-ink)" strokeWidth="1.4" opacity="0.35" />
      <rect x="22" y="35" width="16" height="5" rx="2.5" fill="var(--color-green)" stroke="var(--color-ink)" strokeWidth="2" />
    </svg>
  )
}

/** Small diya with a flickering flame, used beside the label. */
export function Diya({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 28" className={className} aria-hidden="true" focusable="false">
      <path className="diwali-flame diwali-flame--diya" d="M16 2C19.5 7 20 10.5 16 14C12 10.5 12.5 7 16 2Z" fill="var(--color-butter)" stroke="var(--color-coral)" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2.5 15.5C6 25 26 25 29.5 15.5C24 17.5 8 17.5 2.5 15.5Z" fill="var(--color-marigold)" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 20.5C12 22 20 22 24 20.5" fill="none" stroke="var(--color-coral)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="0 3.2" />
    </svg>
  )
}

/** Three little spark ticks after the label. */
function SparkTicks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 20" className={className} aria-hidden="true" focusable="false">
      <path d="M3 15L8 11M7 5L10 9.5M15 3L13.5 8.5" fill="none" stroke="var(--color-coral)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="19" cy="12" r="1.8" fill="var(--color-marigold)" />
    </svg>
  )
}

export const percentOff = Math.round((1 - diwaliOffer.offerPrice / diwaliOffer.regularPrice) * 100)

/* ----------------------------------------------------------------- the sky */

/* Each shot: a rocket climbs from (dx, dy) below its target, then bursts.
   Targets hug the edges so the show frames the card rather than hiding behind it. */
const SHOTS = [
  { x: 14, y: 16, dx: 90, dy: 320, dur: 5.6, delay: 0.1, a: "var(--color-marigold)", b: "var(--color-coral)", size: 1 },
  { x: 84, y: 12, dx: -110, dy: 340, dur: 6.2, delay: 0.7, a: "var(--color-coral)", b: "var(--color-butter)", size: 1.15 },
  { x: 50, y: 7, dx: 30, dy: 300, dur: 5.1, delay: 1.3, a: "var(--color-butter)", b: "var(--color-paper)", size: 0.85 },
  { x: 7, y: 48, dx: 120, dy: 280, dur: 6.8, delay: 1.9, a: "var(--color-coral-soft)", b: "var(--color-marigold)", size: 0.9 },
  { x: 93, y: 44, dx: -100, dy: 300, dur: 5.9, delay: 2.4, a: "var(--color-mint)", b: "var(--color-coral)", size: 0.95 },
  { x: 30, y: 26, dx: -70, dy: 260, dur: 6.5, delay: 3.1, a: "var(--color-coral)", b: "var(--color-marigold)", size: 0.75 },
  { x: 70, y: 28, dx: 80, dy: 280, dur: 5.4, delay: 3.6, a: "var(--color-marigold)", b: "var(--color-mint)", size: 0.8 },
].map((s) => ({ ...s, tilt: (Math.atan2(-s.dx, s.dy) * 180) / Math.PI }))

const SKY_BURST = burstRays(14, 9, 42, 33)
const SKY_DOTS = Array.from({ length: 7 }, (_, i) => {
  const a = (i / 7) * Math.PI * 2 + 0.3
  return { cx: +(Math.cos(a) * 22).toFixed(1), cy: +(Math.sin(a) * 22).toFixed(1) }
})

/** Fireworks behind the offer: rockets fly up from all sides and burst. Plays a few rounds, then rests. */
export function DiwaliSky() {
  return (
    <div className="diwali-sky" aria-hidden="true">
      {SHOTS.map((s, i) => (
        <div
          key={i}
          className="diwali-shot"
          style={{ left: `${s.x}%`, top: `${s.y}%`, "--dx": `${s.dx}px`, "--dy": `${s.dy}px`, "--tilt": `${s.tilt.toFixed(1)}deg`, "--dur": `${s.dur}s`, "--delay": `${s.delay}s`, "--size": s.size } as Vars}
        >
          <svg viewBox="-6 -14 12 34" className="diwali-shot__rocket" focusable="false">
            <path d="M0 8L0 19" stroke="var(--color-butter)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="0 3" />
            <path d="M-2.5 5C-2 9 -1 11 0 13C1 11 2 9 2.5 5Z" fill="var(--color-butter)" />
            <rect x="-3" y="-6" width="6" height="12" rx="1.6" fill="var(--color-paper)" />
            <path d="M-3 -5.5L0 -12L3 -5.5Z" fill={s.a} />
          </svg>
          <svg viewBox="-50 -50 100 100" className="diwali-shot__burst" focusable="false">
            {SKY_BURST.map((d, j) => (
              <path key={d} d={d} stroke={j % 2 ? s.b : s.a} strokeWidth="3" strokeLinecap="round" />
            ))}
            {SKY_DOTS.map((p, j) => (
              <circle key={j} cx={p.cx} cy={p.cy} r="2.2" fill={s.b} />
            ))}
            <Star4 x={0} y={0} s={0.7} color={s.a} />
          </svg>
        </div>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- the card */

function Chip({ tone, icon, children }: { tone: string; icon: "clock" | "hourglass" | "tag"; children: ReactNode }) {
  return (
    <li className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[0.8rem] font-semibold leading-none text-ink sm:px-3 sm:text-[0.95rem] ${tone}`}>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" focusable="false">
        {icon === "clock" && <path d="M8 2.2a5.8 5.8 0 1 1-.1 0M8 4.8V8l2.3 1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
        {icon === "hourglass" && <path d="M4 2h8M4 14h8M5 2c0 3.5 6 3.5 6 6s-6 2.5-6 6M11 2c0 3.5-6 3.5-6 6s6 2.5 6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
        {icon === "tag" && <path d="M2.5 8.6V3a.5.5 0 0 1 .5-.5h5.6l5 5a1 1 0 0 1 0 1.4l-4.2 4.2a1 1 0 0 1-1.4 0ZM5.6 5.6h.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      {children}
    </li>
  )
}

export default function DiwaliOffer({ className = "" }: { className?: string }) {
  const { label, title, regularPrice, offerPrice, duration, dialogues } = diwaliOffer

  return (
    <div className={`relative ${className}`}>
      <div className="diwali-card relative rounded-[1.75rem] border-2 border-ink bg-paper px-5 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-11">
        {/* ------------------------------------------------ sky decorations */}
        <Rocket className="diwali-deco pointer-events-none absolute -top-[3.6rem] right-[4.5rem] w-[4.5rem] sm:-top-[4.5rem] sm:right-[8rem] sm:w-32" />
        <svg viewBox="-16 -16 32 32" className="diwali-deco pointer-events-none absolute -left-3 -top-14 w-9 sm:-left-5 sm:-top-16 sm:w-11" aria-hidden="true" focusable="false">
          <g className="diwali-pop diwali-pop--corner">
            {CORNER_RAYS.map((d, i) => (
              <path key={d} d={d} stroke={i % 2 ? "var(--color-coral)" : "var(--color-marigold)"} strokeWidth="2.4" strokeLinecap="round" />
            ))}
            <circle r="2" fill="var(--color-coral)" />
          </g>
        </svg>
        <span className="diwali-deco diwali-confetti pointer-events-none absolute right-[42%] -top-6 hidden h-2 w-2 rotate-45 rounded-[2px] bg-marigold sm:block" aria-hidden="true" />
        <span className="diwali-deco diwali-confetti pointer-events-none absolute -right-2.5 bottom-[30%] h-2 w-2 rounded-full bg-coral" style={{ "--delay": "-2.4s" } as Vars} aria-hidden="true" />
        <span className="diwali-deco diwali-confetti pointer-events-none absolute -left-2.5 bottom-[22%] h-1.5 w-1.5 rotate-45 rounded-[1px] bg-green-soft" style={{ "--delay": "-4s" } as Vars} aria-hidden="true" />

        {/* A gift tag tied to the top edge. */}
        <p className="diwali-tag hand absolute -top-4 left-4 rounded-lg border-2 border-ink bg-butter py-0.5 pl-5 pr-3 text-[1.3rem] leading-tight sm:-top-5 sm:text-[1.5rem] text-ink shadow-[2px_2px_0_0_var(--color-ink)] sm:left-6">
          <span className="absolute left-1.5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border-[1.5px] border-ink bg-paper" aria-hidden="true" />
          only for you!
        </p>

        {/* ------------------------------------------------------- content */}
        <div className="pr-11 sm:pr-24">
          <p className="flex w-fit items-center gap-1.5 whitespace-nowrap text-[0.8rem] font-bold uppercase tracking-[0.14em] text-coral-deep sm:gap-2 sm:text-[0.88rem] sm:tracking-[0.16em]">
            <Diya className="h-5 w-6 shrink-0 -translate-y-0.5 sm:h-6 sm:w-7" />
            <span>{label}</span>
            <SparkTicks className="h-4 w-5 shrink-0" />
          </p>
          <p className="mt-2 font-display text-[1.6rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2.15rem]">{title}</p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2" aria-label="Offer details">
          <Chip tone="bg-mint" icon="clock">
            {duration} session
          </Chip>
          <Chip tone="bg-coral-soft" icon="tag">
            Special discount
          </Chip>
          <Chip tone="bg-butter-soft" icon="hourglass">
            Limited time offer
          </Chip>
        </ul>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <s className="diwali-was diwali-stagger font-display text-[1.4rem] font-semibold text-ink-soft sm:text-[1.8rem]" style={{ "--delay": "320ms" } as Vars}>
            <span className="sr-only">Regular price </span>
            {formatInr(regularPrice)}
          </s>
          <span className="diwali-stagger relative inline-block font-display text-[3.1rem] font-extrabold leading-none tracking-[-0.035em] text-green sm:text-[4.25rem]" style={{ "--delay": "460ms" } as Vars}>
            <span className="sr-only">Diwali price </span>
            {formatInr(offerPrice)}
            <Underline color="var(--color-marigold)" className="draw-on-load absolute -bottom-2.5 left-0 h-3 w-full" style={{ "--draw-delay": "900ms" } as Vars} />
          </span>
        </p>

        <p className="diwali-badge absolute -right-2 -top-8 grid h-[5rem] w-[5rem] place-items-center sm:-right-5 sm:-top-9 sm:h-[7.25rem] sm:w-[7.25rem]">
          <svg viewBox="-6 -6 112 112" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true" focusable="false">
            <path d={BADGE} transform="translate(3.5 3.5)" fill="var(--color-ink)" />
            <path d={BADGE} fill="var(--color-coral-deep)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="33" fill="none" stroke="var(--color-paper)" strokeWidth="1.5" strokeDasharray="0.5 4.5" strokeLinecap="round" opacity="0.7" />
          </svg>
          <span className="relative flex flex-col items-center leading-none text-white">
            <span className="font-display text-[1.5rem] font-extrabold tracking-[-0.04em] sm:text-[2.15rem]">{percentOff}%</span>
            <span className="mt-0.5 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] sm:text-[0.92rem]">off</span>
          </span>
          <Sparkle className="diwali-twinkle absolute -bottom-1 -left-2 h-5 w-5 sm:-left-3 sm:h-6 sm:w-6" color="var(--color-marigold)" />
        </p>

        <div className="mt-7">
          <a
            href={waUrl("diwali")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="diwali_modal"
            className="diwali-cta btn btn-primary w-full gap-2 px-4 text-base sm:min-h-[3.5rem] sm:w-auto sm:gap-[0.6rem] sm:px-8 sm:text-[1.1rem]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book Your Consultation
            <svg viewBox="0 0 20 12" className="diwali-cta__arrow hidden h-3 w-5 shrink-0 min-[360px]:block" aria-hidden="true" focusable="false">
              <path d="M1 6.5C6 5.5 11 6 18 6M13 1.5L18 6L13 10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <DiwaliFilmyLine lines={dialogues} />

        {/* ---------------------------------------------------- the ground */}
        <Anar className="diwali-deco pointer-events-none absolute -bottom-[0.55rem] right-3 w-11 sm:right-6 sm:w-[3.75rem]" />
      </div>
    </div>
  )
}
