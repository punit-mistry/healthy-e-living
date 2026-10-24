/**
 * Healthy E Living's signature graphic language.
 *
 * 1. The Happy Plate — a hand-drawn plate that doubles as a sun.
 * 2. Scribbles — hand-drawn underlines and loops that sit on type.
 * 3. Annotations — a curly arrow that points from a handwritten note.
 *
 * All strokes share one weight and round caps so the system feels drawn by
 * a single hand. Decorative motifs are aria-hidden.
 */

import type { CSSProperties } from "react"

interface SvgProps {
  className?: string
  style?: CSSProperties
}

/* Hand-drawn plate rim: overshoots its start point like a real pen stroke. */
const RIM = "M60 13C87 12 108 33 107 60C106 87 85 108 58 107C31 106 12 85 13 58C14 33 34 14 64 14"
const WELL = "M60 30C77 30 90 43 90 60C90 78 76 90 59 90C42 89 30 76 30 59"
const SMILE = "M42 64C49 76 71 77 78 64"

/* Rays sit outside the rim at alternating lengths. */
const RAY_PATHS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
  const r1 = 51
  const r2 = i % 2 === 0 ? 60 : 56.5
  const x1 = 60 + Math.cos(angle) * r1
  const y1 = 60 + Math.sin(angle) * r1
  const x2 = 60 + Math.cos(angle) * r2
  const y2 = 60 + Math.sin(angle) * r2
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`
})

export function HappyPlate({
  className,
  style,
  rays = true,
  variant = "colour",
}: SvgProps & { rays?: boolean; variant?: "colour" | "mono" }) {
  const line = variant === "mono" ? "currentColor" : "var(--color-green)"
  const smile = variant === "mono" ? "currentColor" : "var(--color-coral)"
  return (
    <svg viewBox="-4 -4 128 128" className={className} style={style} aria-hidden="true" focusable="false">
      {rays &&
        RAY_PATHS.map((d) => (
          <path key={d} d={d} fill="none" stroke={line} strokeWidth="4" strokeLinecap="round" />
        ))}
      <path d={RIM} fill={variant === "mono" ? "none" : "var(--color-paper)"} stroke={line} strokeWidth="4" strokeLinecap="round" />
      <path d={WELL} fill="none" stroke={line} strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      <path d={SMILE} fill="none" stroke={smile} strokeWidth="5" strokeLinecap="round" />
      {variant === "colour" && <circle cx="88" cy="30" r="6" fill="var(--color-butter)" />}
    </svg>
  )
}

/** Animated version for the loader; timings live in globals.css. */
export function HappyPlateAnimated({ className }: SvgProps) {
  return (
    <svg viewBox="-4 -4 128 128" className={className} aria-hidden="true" focusable="false">
      {RAY_PATHS.map((d, i) => (
        <path
          key={d}
          d={d}
          className="hel-loader__ray"
          style={{ "--i": i } as CSSProperties}
          fill="none"
          stroke="var(--color-green)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      <path d={RIM} pathLength={1} className="hel-loader__rim" fill="none" stroke="var(--color-green)" strokeWidth="4" strokeLinecap="round" />
      <path d={SMILE} pathLength={1} className="hel-loader__smile" fill="none" stroke="var(--color-coral)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="88" cy="30" r="6" className="hel-loader__dot" fill="var(--color-butter)" />
    </svg>
  )
}

/** Hand-drawn double underline, stretched under a word. */
export function Underline({ className, style, color = "var(--color-coral)" }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 200 20" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <path pathLength={1} d="M3 13C48 5 120 3 197 9" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path pathLength={1} d="M22 17C70 12 128 12 176 15" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

/** A loose loop drawn around a word or number. */
export function Loop({ className, style, color = "var(--color-coral)" }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 220 90" preserveAspectRatio="none" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        pathLength={1}
        d="M30 62C6 44 22 14 92 8C160 3 214 20 208 46C202 74 140 86 84 82C40 79 14 66 16 46C18 30 40 18 70 13"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
       
      />
    </svg>
  )
}

/** Curly annotation arrow. Points to the bottom-right by default. */
export function CurlyArrow({ className, style, color = "var(--color-ink)" }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 90 70" className={className} style={style} aria-hidden="true" focusable="false">
      <path pathLength={1} d="M6 10C26 4 44 12 42 28C40 40 26 40 28 28C30 16 50 14 62 26C70 34 74 46 76 58" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <path pathLength={1} d="M66 50L76 60L84 48" fill="none" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Small four-point sparkle. */
export function Sparkle({ className, style, color = "var(--color-butter)" }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M20 2C21 14 26 19 38 20C26 21 21 26 20 38C19 26 14 21 2 20C14 19 19 14 20 2Z" fill={color} />
    </svg>
  )
}

/** Leafy sprig used as a section flourish. */
export function Sprig({ className, style, color = "var(--color-green)" }: SvgProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 120" className={className} style={style} aria-hidden="true" focusable="false">
      <path pathLength={1} d="M40 116C38 84 40 50 46 8" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path pathLength={1} d="M41 88C26 86 14 74 12 58C28 60 39 72 41 88Z" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <path pathLength={1} d="M42 64C56 60 66 46 66 30C52 34 43 48 42 64Z" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      <path pathLength={1} d="M44 36C34 32 28 22 28 10C38 14 44 24 44 36Z" fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

/** The wordmark: lowercase, with the "e" set inside a butter-yellow plate. */
export function Wordmark({ className, tone = "ink" }: { className?: string; tone?: "ink" | "cream" }) {
  const text = tone === "cream" ? "text-cream" : "text-ink"
  return (
    <span className={`inline-flex items-center font-display font-extrabold tracking-[-0.04em] leading-none ${text} ${className ?? ""}`}>
      <span className="sr-only">Healthy E Living</span>
      <span aria-hidden="true" className="inline-flex items-center gap-[0.18em]">
        <span>healthy</span>
        <span className="inline-grid place-items-center rounded-full bg-butter text-green-deep w-[1.05em] h-[1.05em] text-[0.78em] -translate-y-[0.02em]">
          e
        </span>
        <span>living</span>
      </span>
    </span>
  )
}
