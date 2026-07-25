import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nutrition by Irika Goyal - Clinical Dietitian",
    short_name: "Healthy E Living",
    description:
      "Work with clinical dietitian Irika Goyal for personalized nutrition plans and evidence-based dietary counseling.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8B5A2B",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  };
}
