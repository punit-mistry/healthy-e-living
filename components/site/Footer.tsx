import Link from "next/link"
import { HappyPlate, Sprig, Wordmark } from "@/components/brand/Motifs"
import { getServiceBySlug } from "@/data/services"
import { contact, serviceArea, site, social } from "@/lib/site"
import { waUrl } from "@/lib/whatsapp"

const featuredServices = ["weight-loss", "pcos-diet", "diabetes-diet", "gut-health", "pregnancy-nutrition", "sports-nutrition"]
  .map(getServiceBySlug)
  .filter((s) => s !== undefined)

const practiceLinks = [
  { href: "/about", label: "Meet Irika" },
  { href: "/consultation", label: "How consultations work" },
  { href: "/services", label: "All services" },
  { href: "/blog", label: "Nutrition journal" },
  { href: "/resources", label: "Free resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
  { href: "/medical-disclaimer", label: "Medical disclaimer" },
]

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-butter">{title}</h2>
      <ul className="space-y-2.5 text-[0.95rem]">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-cream/85 underline-offset-4 transition-colors hover:text-cream hover:underline">
        {children}
      </Link>
    </li>
  )
}

export default function Footer() {
  return (
    <footer role="contentinfo" className="relative overflow-hidden bg-green-deep pb-28 pt-16 text-cream sm:pb-12">
      <Sprig className="pointer-events-none absolute -right-6 top-10 h-56 w-40 opacity-20" color="var(--color-mint)" />

      <div className="wrap relative">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <HappyPlate className="h-14 w-14" />
              <Wordmark tone="cream" className="text-3xl" />
            </Link>
            <p className="hand mt-4 text-2xl text-butter">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-cream/80">
              Personalised nutrition care with clinical dietitian Irika Goyal. {serviceArea.online} In-person sessions in {serviceArea.inPerson}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waUrl("booking")}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_click"
                data-track-location="footer"
                className="btn btn-cream"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Column title="Services">
              {featuredServices.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.shortName}
                </FooterLink>
              ))}
            </Column>
            <Column title="The practice">
              {practiceLinks.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </Column>
            <Column title="Where">
              <FooterLink href="/locations/mumbai">Dietitian in Mumbai</FooterLink>
              <FooterLink href="/locations/borivali">Borivali</FooterLink>
              <FooterLink href="/locations/malad">Malad</FooterLink>
              <FooterLink href="/locations/andheri">Andheri</FooterLink>
              <FooterLink href="/locations/thane">Thane</FooterLink>
              <FooterLink href="/locations/delhi">Delhi (online)</FooterLink>
              <FooterLink href="/locations/bengaluru">Bengaluru (online)</FooterLink>
              <FooterLink href="/locations">All areas we serve</FooterLink>
            </Column>
            <Column title="Say hello">
              <li>
                <a href={`mailto:${contact.email}`} className="break-all text-cream/85 hover:text-cream hover:underline">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phoneE164}`} className="text-cream/85 hover:text-cream hover:underline">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/85 hover:text-cream hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-cream/85 hover:text-cream hover:underline">
                  LinkedIn
                </a>
              </li>
            </Column>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-sm text-cream/70 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl">
            Information on this website is general and educational. It isn&apos;t a substitute for personalised medical advice — please speak to
            your doctor about any health concern.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cream hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-cream/60">
          © {new Date().getFullYear()} {site.name}. Crafted with care by{" "}
          <a href="https://www.bombaycoder.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-cream">
            BombayCoder
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
