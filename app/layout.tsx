import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Caveat, DM_Sans, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp"
import Footer from "@/components/site/Footer"
import Header from "@/components/site/Header"
import Loader, { LOADER_SEEN_SCRIPT } from "@/components/site/Loader"
import RouteTransition from "@/components/site/RouteTransition"
import TrackClicks from "@/components/site/TrackClicks"
import JsonLd from "@/components/ui-kit/JsonLd"
import { siteGraph } from "@/lib/seo"
import { person, site } from "@/lib/site"
import "./globals.css"

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" })
const caveat = Caveat({ subsets: ["latin"], weight: ["600"], variable: "--font-caveat", display: "swap", preload: false })
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap", preload: false })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Healthy E Living: Dietitian Irika Goyal, Mumbai & Online",
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: person.displayName, url: "/about" }],
  creator: site.name,
  publisher: site.name,
  // No canonical here: it would be inherited by every page that forgot one.
  // Each page sets its own through pageMetadata().
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  formatDetection: { telephone: false, address: false, email: false },
  category: "health",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff6e8",
  colorScheme: "light",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      // Lets Next.js switch smooth scrolling off while it resets scroll on
      // route changes; without it, new pages animated in from mid-page.
      data-scroll-behavior="smooth"
      // The pre-paint loader script may add a class before hydration.
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable} ${caveat.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SEEN_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Loader />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RouteTransition />
        <TrackClicks />
        <JsonLd data={siteGraph()} />
        <Analytics />
      </body>
    </html>
  )
}
