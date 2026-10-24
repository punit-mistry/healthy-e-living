/**
 * Vercel sets VERCEL_ENV to "production", "preview" or "development".
 * Builds outside Vercel (e.g. local `next build`) are treated as production,
 * so self-hosting keeps working; only Vercel previews are hidden from crawlers.
 */
export const isPublicProduction = (process.env.VERCEL_ENV ?? "production") === "production"
