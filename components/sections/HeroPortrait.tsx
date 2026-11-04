import Image from "next/image"
import { Sparkle } from "@/components/brand/Motifs"
import { person } from "@/lib/site"
import square from "@/public/images/irika-goyal-dietitian-square.jpg"

interface HeroPortraitProps {
  /** Completes "…dietitian for <place>" in the alt text, so each page reads differently. */
  context?: string
  className?: string
}

/**
 * Portrait card for inner-page heroes.
 *
 * Besides introducing Irika, this gives pages that are otherwise all text a
 * prominent image near the H1 — the candidate search engines crop into the
 * thumbnail beside the result. The square source matches that crop.
 */
export default function HeroPortrait({ context, className = "" }: HeroPortraitProps) {
  const alt = context
    ? `${person.displayName}, ${person.jobTitle.toLowerCase()} serving ${context}`
    : `${person.displayName}, ${person.jobTitle.toLowerCase()}`

  return (
    <figure className={`relative mx-auto w-full max-w-xs lg:mx-0 lg:ml-auto ${className}`}>
      <Sparkle className="absolute -left-5 -top-5 z-10 h-10 w-10" color="var(--color-coral)" />
      <div className="overflow-hidden rounded-[2rem] border-[3px] border-ink bg-mint shadow-[6px_6px_0_0_var(--color-ink)]">
        <Image
          src={square}
          alt={alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 320px, 288px"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-4 text-center lg:text-left">
        <span className="hand block text-2xl leading-none text-coral-deep">hi, I&apos;m {person.firstName}!</span>
        <span className="mt-1 block text-sm font-semibold text-ink-soft">{person.jobTitle}</span>
      </figcaption>
    </figure>
  )
}
