import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/smooth-scroll'
import FloatingActions from '@/components/floating-actions'
import './globals.css'
export const metadata = {
  title: {
    default: "Healthy E Living Mumbai – Best Dietitian & Nutritionist for Weight Loss, PCOS, Diabetes",
    template: "%s | Nutrition by Irika Goyal – Mumbai Dietitian",
  },
  description:
    "Mumbai's trusted clinical dietitian Dt. Irika Goyal offers personalized nutrition plans for weight loss, PCOS, diabetes, gut health & more. Online & in-person consultations. Book now!",
  keywords: [
    "dietitian in Mumbai",
    "nutritionist Mumbai",
    "best dietitian Mumbai",
    "weight loss dietitian Mumbai",
    "PCOS dietitian Mumbai",
    "diabetes dietitian Mumbai",
    "gut health dietitian",
    "online diet consultation",
    "nutritionist near me",
    "dietitian near me",
    "Healthy E Living",
    "Irika Goyal dietitian",
    "weight loss diet plan Mumbai",
    "PCOS diet plan",
    "diabetes management diet",
    "clinical dietitian",
    "personalized nutrition",
    "medical nutrition therapy",
    "online nutritionist India",
    "Indian diet plan for weight loss",
  ],
  authors: [{ name: "Dt. Irika Goyal", url: "https://www.healthelivingwithirika.com/about" }],
  creator: "Nutrition by Irika Goyal",
  publisher: "Nutrition by Irika Goyal",
  metadataBase: new URL("https://www.healthelivingwithirika.com/"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "YOUR_VERIFICATION_CODE",
  },
  referrer: "origin-when-cross-origin",
  classification: "Health, Nutrition, Dietitian, Wellness",
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
  },
  openGraph: {
    title: "Healthy E Living Mumbai – Best Dietitian & Nutritionist for Weight Loss, PCOS & Diabetes",
    description:
      "Mumbai's trusted clinical dietitian Dt. Irika Goyal. Personalized nutrition plans for weight loss, PCOS, diabetes, gut health. Online & in-person consultations available.",
    url: "https://www.healthelivingwithirika.com/",
    siteName: "Nutrition by Irika Goyal – Mumbai Dietitian",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.healthelivingwithirika.com/brand-logo.PNG",
        width: 1200,
        height: 630,
        alt: "Healthy E Living – Best Dietitian in Mumbai – Dt. Irika Goyal Clinical Nutritionist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthy E Living Mumbai – Best Dietitian & Nutritionist",
    description:
      "Mumbai's trusted dietitian Dt. Irika Goyal. Personalized nutrition for weight loss, PCOS, diabetes & gut health. Book your consultation today!",
    images: ["https://www.healthelivingwithirika.com/brand-logo.PNG"],
    site: "@NutritionIrika",
    creator: "@NutritionIrika",
  },
  appleWebApp: {
    capable: true,
    title: "Healthy E Living",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "nutrition",
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
        {/* Geo tags for Local SEO */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="19.0760;72.8777" />
        <meta name="ICBM" content="19.0760, 72.8777" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        <meta name="target" content="all" />
        <meta name="distribution" content="global" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://www.healthelivingwithirika.com/#website",
                  "url": "https://www.healthelivingwithirika.com/",
                  "name": "Nutrition by Irika Goyal",
                  "description": "Work with clinical dietitian Irika Goyal to create evidence-based nutrition plans tailored to your health goals. Book your consultation today for sustainable lifestyle changes.",
                  "publisher": { "@id": "https://www.healthelivingwithirika.com/#person" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://www.healthelivingwithirika.com/?s={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://www.healthelivingwithirika.com/#person",
                  "name": "Dt. Irika Goyal",
                  "alternateName": "Irika Goyal",
                  "jobTitle": "Clinical Dietitian & Nutritionist",
                  "description": "Clinical dietitian with 4+ years of experience in personalized nutrition therapy, medical nutrition therapy, and sustainable lifestyle changes.",
                  "url": "https://www.healthelivingwithirika.com/",
                  "image": "https://i.ibb.co/SwK5zdZh/logo.jpg",
                  "knowsAbout": [
                    "Personalized Nutrition", "Medical Nutrition Therapy", "Chronic Disease Management",
                    "Weight Management", "Gut Health", "Diabetes Management", "PCOS Diet",
                    "Sports Nutrition", "Pregnancy Nutrition"
                  ]
                },
                {
                  "@type": "MedicalBusiness",
                  "@id": "https://www.healthelivingwithirika.com/#business",
                  "name": "Nutrition by Irika Goyal",
                  "description": "Clinical dietitian offering personalized nutrition plans, medical nutrition therapy, and evidence-based dietary counseling in Mumbai.",
                  "url": "https://www.healthelivingwithirika.com/",
                  "telephone": "+919833640891",
                  "email": "health.e.living23@gmail.com",
                  "priceRange": "$$",
                  "image": "https://i.ibb.co/SwK5zdZh/logo.jpg",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                  },
                  "founder": { "@id": "https://www.healthelivingwithirika.com/#person" },
                  "areaServed": [
                    { "@type": "City", "name": "Mumbai" },
                    { "@type": "City", "name": "Thane" },
                    { "@type": "City", "name": "Navi Mumbai" }
                  ],
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "50",
                    "bestRating": "5"
                  },
                  "review": [
                    {
                      "@type": "Review",
                      "author": { "@type": "Person", "name": "Pulkit Agarwal" },
                      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                      "reviewBody": "Working with Irika has been a game-changer for me. Her guidance has helped me build a healthy relationship with food."
                    },
                    {
                      "@type": "Review",
                      "author": { "@type": "Person", "name": "Namrata Jain" },
                      "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                      "reviewBody": "I have never been so confident about my body before. Thank you for all the hard work."
                    }
                  ]
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://www.healthelivingwithirika.com/#breadcrumb",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.healthelivingwithirika.com/" }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://www.healthelivingwithirika.com/#faq",
                  "mainEntity": [
                    { "@type": "Question", "name": "How often will I need to come in?", "acceptedAnswer": { "@type": "Answer", "text": "Initial consultations are 45-60 minutes, followed by 20-30 minute follow-ups. Frequency depends on your needs. Typically every ten days to start, then every fortnight for maintenance." } },
                    { "@type": "Question", "name": "Do you offer virtual consultations?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! I offer both in-person and virtual appointments via secure video conferencing. Choose what works best for your schedule." } },
                    { "@type": "Question", "name": "What should I bring to my first appointment?", "acceptedAnswer": { "@type": "Answer", "text": "Bring your current medications, lab results (if available), and any food logs you may have. I'll also ask about your health history and goals." } },
                    { "@type": "Question", "name": "Can you help with meal planning?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, personalized meal planning is a core part of my service. I create practical, delicious meal plans that fit your lifestyle and dietary preferences." } },
                    { "@type": "Question", "name": "How long does it take to see results?", "acceptedAnswer": { "@type": "Answer", "text": "Results vary by person and condition. Some see improvements in 2-4 weeks, while others may take longer. Consistency and follow-up are key to sustainable results." } }
                  ]
                },
                {
                  "@type": "Service",
                  "@id": "https://www.healthelivingwithirika.com/#service",
                  "name": "Dietitian & Nutrition Services",
                  "provider": { "@id": "https://www.healthelivingwithirika.com/#person" },
                  "areaServed": { "@type": "City", "name": "Mumbai" },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Nutrition Services",
                    "itemListElement": [
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Weight Loss Diet" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PCOS Diet Plan" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diabetes Diet Plan" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Gut Health Diet" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sports Nutrition" } }
                    ]
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
        <FloatingActions />
      </body>
    </html>
  )
}
