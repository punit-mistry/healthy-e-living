import type { ArtKey } from "@/data/services"

/**
 * Small editorial illustrations for services and articles.
 * Line art sits on an organic colour blob; all decorative (aria-hidden).
 */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const

const art: Record<ArtKey, React.ReactNode> = {
  plate: (
    <>
      <path {...S} d="M32 12c11 0 20 9 20 20s-9 20-20 20-20-9-20-20 9-20 22-20" />
      <path {...S} d="M24 35c3 5 13 5 16 0" />
      <circle cx="42" cy="22" r="2.4" fill="currentColor" />
    </>
  ),
  scale: (
    <>
      <rect {...S} x="12" y="14" width="40" height="38" rx="9" />
      <path {...S} d="M22 28a10 10 0 0 1 20 0" />
      <path {...S} d="M32 28l4-5" />
    </>
  ),
  sprout: (
    <>
      <path {...S} d="M32 54V30" />
      <path {...S} d="M32 34c-10 0-16-7-16-16 10 0 16 7 16 16Z" />
      <path {...S} d="M32 30c0-9 6-15 16-15 0 9-6 15-16 15Z" />
      <path {...S} d="M22 54h20" />
    </>
  ),
  bolt: <path {...S} d="M36 8 18 36h14l-4 20 18-28H32l4-20Z" />,
  flower: (
    <>
      <circle {...S} cx="32" cy="30" r="5" />
      <path {...S} d="M32 25c-4-8 0-14 0-14s4 6 0 14M37 30c8-4 14 0 14 0s-6 4-14 0M32 35c4 8 0 14 0 14s-4-6 0-14M27 30c-8 4-14 0-14 0s6-4 14 0" />
      <path {...S} d="M32 49v7" />
    </>
  ),
  drop: (
    <>
      <path {...S} d="M32 9C24 21 17 29 17 38a15 15 0 0 0 30 0c0-9-7-17-15-29Z" />
      <path {...S} d="M25 40a7 7 0 0 0 6 6" />
    </>
  ),
  sun: (
    <>
      <circle {...S} cx="32" cy="32" r="10" />
      <path {...S} d="M32 10v6M32 48v6M10 32h6M48 32h6M16.5 16.5l4 4M43.5 43.5l4 4M16.5 47.5l4-4M43.5 20.5l4-4" />
    </>
  ),
  heart: <path {...S} d="M32 52S12 40 12 25c0-7 5-12 11-12 4 0 7 2 9 6 2-4 5-6 9-6 6 0 11 5 11 12 0 15-20 27-20 27Z" />,
  bean: (
    <>
      <path {...S} d="M40 12c9 2 14 11 12 21-2 12-12 20-24 19-10-1-16-9-14-17 1-6 6-8 10-9 5-1 6-4 6-8 0-5 4-7 10-6Z" />
      <path {...S} d="M24 38c4 4 10 4 14 0" />
    </>
  ),
  ribbon: <path {...S} d="M32 30c-6-8-10-14-6-18s9-1 6 6m0 12c6-8 10-14 6-18s-9-1-6 6M32 30 20 54M32 30l12 24" />,
  bowl: (
    <>
      <path {...S} d="M10 32h44c0 12-10 20-22 20S10 44 10 32Z" />
      <path {...S} d="M24 24c-3-3 3-6 0-10M32 24c-3-3 3-6 0-10M40 24c-3-3 3-6 0-10" />
    </>
  ),
  shield: (
    <>
      <path {...S} d="M32 9 14 16v13c0 12 8 21 18 26 10-5 18-14 18-26V16L32 9Z" />
      <path {...S} d="m24 31 6 6 11-12" />
    </>
  ),
  bump: (
    <>
      <path {...S} d="M32 10c11 0 18 13 18 25s-8 19-18 19-18-7-18-19 7-25 18-25Z" />
      <path {...S} d="M32 41s-7-4-7-9c0-2 2-4 4-4 1 0 2 1 3 2 1-1 2-2 3-2 2 0 4 2 4 4 0 5-7 9-7 9Z" />
    </>
  ),
  kite: (
    <>
      <path {...S} d="M38 8 52 24 36 42 22 26 38 8Z" />
      <path {...S} d="M22 26 36 42M38 8l-2 34" />
      <path {...S} d="M36 42c-4 4-10 3-12 7s-6 5-10 4" />
    </>
  ),
  cup: (
    <>
      <path {...S} d="M14 28h30v8c0 9-7 16-15 16s-15-7-15-16v-8Z" />
      <path {...S} d="M44 31h3a5 5 0 0 1 0 10h-4" />
      <path {...S} d="M24 20c-2-2 2-4 0-7M33 20c-2-2 2-4 0-7" />
    </>
  ),
  bone: (
    <g transform="rotate(-35 32 32)">
      <path {...S} d="M18 28h28M18 36h28" />
      <circle {...S} fill="var(--color-paper)" cx="15" cy="27" r="5.5" />
      <circle {...S} fill="var(--color-paper)" cx="15" cy="37" r="5.5" />
      <circle {...S} fill="var(--color-paper)" cx="49" cy="27" r="5.5" />
      <circle {...S} fill="var(--color-paper)" cx="49" cy="37" r="5.5" />
    </g>
  ),
  people: (
    <>
      <circle {...S} cx="24" cy="22" r="7" />
      <circle {...S} cx="42" cy="24" r="6" />
      <path {...S} d="M10 50c0-9 6-15 14-15s14 6 14 15M34 40c2-3 5-5 8-5 7 0 12 5 12 13" />
    </>
  ),
  screen: (
    <>
      <rect {...S} x="10" y="13" width="44" height="30" rx="5" />
      <path {...S} d="M6 51h52" />
      <path {...S} d="M25 29c3 4 11 4 14 0" />
    </>
  ),
  pin: (
    <>
      <path {...S} d="M32 56S14 39 14 26a18 18 0 0 1 36 0c0 13-18 30-18 30Z" />
      <circle {...S} cx="32" cy="26" r="6" />
    </>
  ),
  dumbbell: (
    <>
      <path {...S} d="M20 32h24" />
      <rect {...S} x="10" y="22" width="8" height="20" rx="3" />
      <rect {...S} x="46" y="22" width="8" height="20" rx="3" />
      <path {...S} d="M6 28v8M58 28v8" />
    </>
  ),
}

const BLOBS = [
  "M33 4c15 1 27 12 27 28S48 61 31 60 3 48 4 31 18 3 33 4Z",
  "M30 3c17-1 30 13 30 30 0 16-14 27-30 27S2 49 4 31C6 15 14 4 30 3Z",
  "M35 5c14 3 24 14 23 29-1 16-14 26-30 25S3 47 5 31 20 2 35 5Z",
]
const FILLS = ["var(--color-mint)", "var(--color-butter-soft)", "var(--color-coral-soft)"]

export default function ArtIcon({ name, className, tone = 0 }: { name: ArtKey; className?: string; tone?: number }) {
  const t = Math.abs(tone) % 3
  return (
    <svg viewBox="0 0 64 64" className={`text-green-deep ${className ?? ""}`} aria-hidden="true" focusable="false">
      <path d={BLOBS[t]} fill={FILLS[t]} />
      {art[name]}
    </svg>
  )
}
