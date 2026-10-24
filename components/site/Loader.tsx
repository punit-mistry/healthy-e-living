import { HappyPlateAnimated, Wordmark } from "@/components/brand/Motifs"

/**
 * "The Happy Plate" brand loader.
 *
 * - Server-rendered over real, already-rendered page content; it never gates
 *   content, and crawlers and assistive tech ignore it (aria-hidden).
 * - Pure CSS: it dismisses itself after ~0.95s even if JavaScript fails.
 * - pointer-events: none, so it can never block clicks or trap focus.
 * - Shown once per browser tab (see LOADER_SEEN_SCRIPT) and never for
 *   people who prefer reduced motion.
 */
export default function Loader() {
  return (
    <div className="hel-loader" aria-hidden="true">
      <div className="flex flex-col items-center gap-5 px-6 text-center">
        <HappyPlateAnimated className="h-28 w-28 sm:h-32 sm:w-32" />
        <div className="hel-loader__word text-[2.1rem] sm:text-5xl">
          <Wordmark />
        </div>
        <p className="hel-loader__note hand text-2xl text-coral-deep sm:text-3xl">A little more joy on your plate.</p>
      </div>
    </div>
  )
}

/** Runs before first paint; marks the tab as having seen the loader. */
export const LOADER_SEEN_SCRIPT =
  "try{var s=window.sessionStorage;if(s.getItem('hel-seen')){document.documentElement.classList.add('hel-seen')}else{s.setItem('hel-seen','1')}}catch(e){}"
