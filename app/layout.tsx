import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
export const metadata = {
  title: "Transform Your Health with Personalized Nutrition | Book Consultation",
  description:
    "Work with clinical dietitian Irika Goyal to create evidence-based nutrition plans tailored to your health goals. Book your consultation today for sustainable lifestyle changes.",
  openGraph: {
    title: "Transform Your Health with Personalized Nutrition | Book Consultation",
    description:
      "Work with clinical dietitian Irika Goyal to create evidence-based nutrition plans tailored to your health goals. Book your consultation today for sustainable lifestyle changes.",
    url: "https://healthy-e-living.vercel.app/",
    siteName: "Nutrition by Irika Goyal",
    images: [
      {
        url: "https://i.ibb.co/SwK5zdZh/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Transform Your Health with Personalized Nutrition - Book Consultation with Irika Goyal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transform Your Health with Personalized Nutrition | Book Consultation",
    description:
      "Work with clinical dietitian Irika Goyal to create evidence-based nutrition plans tailored to your health goals. Book your consultation today for sustainable lifestyle changes.",
    images: ["https://i.ibb.co/SwK5zdZh/logo.jpg"],
  },
};
const _geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const _playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"]
});



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f7f4' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable} ${_playfair.variable}`}>
      <head>
        {/* Open Graph (Facebook, LinkedIn, WhatsApp, Discord etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Transform Your Health with Personalized Nutrition | Book Consultation" />
        <meta property="og:description" content="Work with clinical dietitian Irika Goyal to create evidence-based nutrition plans tailored to your health goals. Book your consultation today for sustainable lifestyle changes." />
        <meta property="og:url" content="https://healthy-e-living.vercel.app/" />
        <meta property="og:image" content="https://i.ibb.co/SwK5zdZh/logo.jpg" />
        <meta property="og:site_name" content="Nutrition by Irika Goyal" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Transform Your Health with Personalized Nutrition | Book Consultation" />
        <meta name="twitter:description" content="Work with clinical dietitian Irika Goyal to create evidence-based nutrition plans tailored to your health goals. Book your consultation today for sustainable lifestyle changes." />
        <meta name="twitter:image" content="https://i.ibb.co/SwK5zdZh/logo.jpg" />

        {/* Optional but recommended */}
        <meta name="theme-color" content="#8B5A2B" />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
