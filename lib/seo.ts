import type { Metadata } from "next"
import { absoluteUrl, contact, person, serviceArea, site, social } from "./site"

interface PageMetaInput {
  /** Page title without the site suffix; the root layout template appends it. */
  title: string
  description: string
  path: string
  /** Use when the title already contains the brand and must not get the suffix. */
  absoluteTitle?: boolean
  noindex?: boolean
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  /** True when the route has its own opengraph-image file. */
  ownImage?: boolean
}

export const DEFAULT_OG_ALT = "Healthy E Living — Food should feel good. So should you. Personalised nutrition with clinical dietitian Irika Goyal."

// Pages that define openGraph don't inherit the root opengraph-image, so the
// default card is referenced explicitly.
const defaultImage = { url: "/opengraph-image", width: 1200, height: 630, type: "image/jpeg", alt: DEFAULT_OG_ALT }

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
  ownImage,
}: PageMetaInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} · ${site.shortName}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url: path,
      title: socialTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(ownImage ? {} : { images: [defaultImage] }),
      ...(type === "article" ? { publishedTime, modifiedTime, authors: [absoluteUrl("/about")] } : {}),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, ...(ownImage ? {} : { images: [defaultImage] }) },
  }
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export const ids = {
  website: `${site.url}/#website`,
  organization: `${site.url}/#organization`,
  person: `${site.url}/#irika-goyal`,
} as const

type Json = Record<string, unknown>

/** Entities shared by every page. Rendered once, from the root layout. */
export function siteGraph(): Json {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: absoluteUrl("/"),
        name: site.name,
        alternateName: site.shortName,
        description: site.description,
        inLanguage: site.language,
        publisher: { "@id": ids.organization },
      },
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        logo: { "@type": "ImageObject", url: absoluteUrl("/android-chrome-512x512.png"), width: 512, height: 512 },
        email: contact.email,
        telephone: contact.phoneE164,
        founder: { "@id": ids.person },
        areaServed: [
          { "@type": "City", name: serviceArea.inPerson },
          { "@type": "Country", name: "India" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "reservations",
            name: "WhatsApp bookings",
            telephone: `+${contact.whatsappNumber}`,
            url: `https://wa.me/${contact.whatsappNumber}`,
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: contact.phoneE164,
            email: contact.email,
            availableLanguage: ["English", "Hindi"],
          },
        ],
        sameAs: [social.instagram],
      },
      {
        "@type": "Person",
        "@id": ids.person,
        name: person.name,
        honorificPrefix: "Dt.",
        jobTitle: person.jobTitle,
        url: absoluteUrl("/about"),
        image: absoluteUrl("/images/irika-goyal-dietitian-smiling.jpg"),
        worksFor: { "@id": ids.organization },
        sameAs: [social.linkedin],
        knowsAbout: [
          "Clinical nutrition",
          "Medical nutrition therapy",
          "Weight management",
          "Diabetes nutrition",
          "PCOS nutrition",
          "Gut health",
          "Sports nutrition",
          "Pregnancy nutrition",
        ],
      },
    ],
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbJson(crumbs: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

interface WebPageInput {
  path: string
  name: string
  description: string
  crumbs?: Crumb[]
  type?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage" | "MedicalWebPage"
  extra?: Json[]
  mainEntity?: Json
  about?: Json
  /** Extra properties merged into the WebPage node (e.g. reviewedBy). */
  pageProps?: Json
}

export function webPageJson({ path, name, description, crumbs, type = "WebPage", extra = [], mainEntity, about, pageProps }: WebPageInput): Json {
  const url = absoluteUrl(path)
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: site.language,
        isPartOf: { "@id": ids.website },
        ...(crumbs ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
        ...(mainEntity ? { mainEntity } : {}),
        ...(about ? { about } : {}),
        ...pageProps,
      },
      ...(crumbs ? [{ ...breadcrumbJson(crumbs), "@id": `${url}#breadcrumb` }] : []),
      ...extra,
    ],
  }
}

export function faqEntities(faqs: { question: string; answer: string }[]): Json[] {
  return faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  }))
}

/** Serialise JSON-LD safely for inline <script> output. */
export function serializeJsonLd(data: Json): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
