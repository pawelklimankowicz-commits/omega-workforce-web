import type { MetadataRoute } from "next";

const BASE_URL = "https://omegaworkforce.pl";

/**
 * Dynamiczny robots.txt — generowany przez Next.js.
 * Dostępny pod: /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
