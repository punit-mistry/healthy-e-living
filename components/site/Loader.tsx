import { HappyPlateAnimated, Wordmark } from "@/components/brand/Motifs"

/**
 * "The Happy Plate" brand loader.
 *
 * - Server-rendered over real, already-rendered page content; it never gates
 *   content, and crawlers and assistive tech ignore it (aria-hidden).
 * - Pure CSS: it dismisses itself after ~0.76s, whatever happens after.
 * - pointer-events: none, so it can never block clicks or trap focus.
 * - Shown at most once per browser tab, only in the cases described on
 *   LOADER_SEEN_SCRIPT, and never for people who prefer reduced motion.
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

/**
 * Runs before first paint and opts in to the intro (`html.hel-intro`) only
 * when it won't cost the visitor anything that matters:
 * - first page view in this tab, landing on the homepage (search visitors
 *   arriving on service/location pages see their content immediately);
 * - not on a slow connection or Data Saver.
 * An opaque overlay delays when Chrome records the page as painted (LCP), so
 * the intro is deliberately rare. Without JavaScript it never shows.
 */
export const LOADER_SEEN_SCRIPT =
  "try{var s=sessionStorage,c=navigator.connection,slow=c&&(c.saveData||/(^|-)(2g|3g)$/.test(c.effectiveType||''));if(!s.getItem('hel-seen')&&!slow&&location.pathname==='/'){document.documentElement.classList.add('hel-intro')}s.setItem('hel-seen','1')}catch(e){}"
