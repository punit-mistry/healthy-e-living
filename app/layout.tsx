import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const _playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: 'Clinical Dietitian - Personalized Nutrition Counseling',
  description: 'Expert clinical dietitian offering personalized nutrition counseling and medical nutrition therapy for chronic disease management and wellness.',
  keywords: 'clinical dietitian, registered dietitian, nutrition counseling, medical nutrition therapy, dietitian near me',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

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
      <body className="font-sans antialiased bg-white text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
