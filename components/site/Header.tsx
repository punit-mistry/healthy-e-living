import { HappyPlate, Wordmark } from "@/components/brand/Motifs"
import WhatsAppIcon from "@/components/ui-kit/WhatsAppIcon"
import { waUrl } from "@/lib/whatsapp"
import HomeLink from "./HomeLink"
import MobileMenu from "./MobileMenu"
import { DesktopNavLinks, MobileNavLinks } from "./NavLinks"

export default function Header() {
  return (
    <header role="banner" className="sticky top-0 z-50 border-b-2 border-ink/10 bg-cream/95 supports-[backdrop-filter]:bg-cream/90">
      <div className="wrap relative flex h-[4.5rem] items-center justify-between gap-4">
        <HomeLink className="group flex items-center gap-2.5 rounded-full py-1 pr-2">
          <HappyPlate className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[24deg]" />
          <span className="flex flex-col">
            <Wordmark className="text-[1.35rem]" />
            <span className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">with Irika Goyal</span>
          </span>
        </HomeLink>

        <nav aria-label="Main" className="hidden lg:block">
          <DesktopNavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waUrl("booking")}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_click"
            data-track-location="header"
            className="btn btn-primary hidden min-h-11! px-5! text-[0.95rem] sm:inline-flex"
          >
            <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
            Let&apos;s talk
          </a>
          <MobileMenu>
            <nav aria-label="Main">
              <MobileNavLinks />
            </nav>
            <a
              href={waUrl("booking")}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_click"
              data-track-location="mobile_menu"
              className="btn btn-primary mt-6 w-full"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Let&apos;s talk about your goals
            </a>
          </MobileMenu>
        </div>
      </div>
    </header>
  )
}
