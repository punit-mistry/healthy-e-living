import Image from "next/image"
import { CurlyArrow, Sparkle } from "@/components/brand/Motifs"
import { social } from "@/lib/site"
import yogaInstitute from "@/public/images/instagram/irika-goyal-at-the-yoga-institute.jpg"
import beachSunset from "@/public/images/instagram/irika-goyal-beach-at-sunset.jpg"
import eatingRight from "@/public/images/instagram/irika-goyal-eating-right-feeling-best.jpg"

const posts = [
  { src: yogaInstitute, alt: "Irika Goyal standing in front of The Yoga Institute sign", caption: "a morning at The Yoga Institute", frame: "rotate-[-3deg]", offset: "" },
  { src: beachSunset, alt: "Irika Goyal walking barefoot on a beach at sunset", caption: "sunset walks count too", frame: "rotate-[2deg]", offset: "sm:translate-y-6" },
  { src: eatingRight, alt: "Irika Goyal smiling on a beach, with the caption 'POV: You start eating right and feeling like your best self!'", caption: "eating right, feeling great", frame: "rotate-[-1.5deg]", offset: "" },
]


/** Instagram section: real photos, polaroid-style, linking to the profile. Sized to fit one screen. */
export default function InstagramStrip({ headingId = "instagram-title" }: { headingId?: string }) {
  return (
    <section aria-labelledby={headingId} className="relative flex items-center overflow-hidden bg-mint py-10 sm:py-14 lg:min-h-[calc(100svh-4.5rem)]">
      <Sparkle className="absolute left-[6%] top-8 h-8 w-8" color="var(--color-coral)" />
      <div className="wrap grid w-full items-center gap-8 lg:grid-cols-[0.8fr_1.7fr] lg:gap-10">
        <div className="max-w-md">
          <p className="eyebrow">On Instagram</p>
          <h2 id={headingId} className="mt-3 text-display-l">
            Real food, real days, <span className="em text-green">real</span> me.
          </h2>
          <p className="mt-4 text-lede text-ink-soft">Everyday tips, meal ideas and a look at life beyond the consultation room.</p>
          <div className="relative mt-6 inline-block">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-track="instagram_click"
              data-track-location="instagram_section"
              className="btn btn-primary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
              </svg>
              Follow {social.instagramHandle}
            </a>
            <CurlyArrow className="absolute -right-20 top-0 hidden h-14 w-16 rotate-[-30deg] -scale-x-100 lg:block" />
          </div>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 pt-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-2">
          {posts.map((p) => (
            <li key={p.caption} className={`reveal w-[68vw] max-w-[19rem] flex-none snap-center sm:w-auto sm:max-w-none ${p.offset}`}>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-track="instagram_click"
                data-track-location="instagram_photo"
                className={`group mx-auto block rounded-[1.25rem] border-[3px] border-ink bg-paper p-3 pb-4 shadow-[6px_6px_0_0_var(--color-green)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${p.frame}`}
              >
                <span className="block overflow-hidden rounded-[0.8rem]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 30vw, 68vw"
                    className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:max-h-[52vh]"
                  />
                </span>
                <span className="hand mt-2 block text-center text-xl text-coral-deep sm:text-2xl">{p.caption}</span>
                <span className="sr-only"> — view on Instagram (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
