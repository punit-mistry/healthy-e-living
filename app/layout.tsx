import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
export const metadata = {
  title: "Nutrition by Irika Goyal",
  description:
    "Personalized nutrition guidance based on evidence, sustainability, and practical lifestyle changes.",
  openGraph: {
    title: "Nutrition by Irika Goyal",
    description:
      "Personalized nutrition guidance based on evidence, sustainability, and practical lifestyle changes.",
    url: "https://healthy-e-living.vercel.app/",
    siteName: "Nutrition by Irika Goyal",
    images: [
      {
        url: "https://i.ibb.co/Hf7cRh01/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Nutrition by Irika Goyal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nutrition by Irika Goyal",
    description:
      "Personalized nutrition guidance based on evidence, sustainability, and practical lifestyle changes.",
    images: ["https://i.ibb.co/Hf7cRh01/logo.jpg"],
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
        <meta property="og:title" content="Nutrition by Irika Goyal" />
        <meta property="og:description" content="Personalized nutrition guidance based on evidence, sustainability, and practical lifestyle changes." />
        <meta property="og:url" content="https://healthy-e-living.vercel.app/" />
        <meta property="og:image" content="https://i.ibb.co/Hf7cRh01/logo.jpg" />
        <meta property="og:site_name" content="Nutrition by Irika Goyal" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nutrition by Irika Goyal" />
        <meta name="twitter:description" content="Personalized nutrition guidance based on evidence, sustainability, and practical lifestyle changes." />
        <meta name="twitter:image" content="https://i.ibb.co/Hf7cRh01/logo.jpg" />

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
