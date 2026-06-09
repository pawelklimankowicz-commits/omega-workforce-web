import type { MetadataRoute } from "next";

const BASE_URL = "https://omegaworkforce.pl";

/**
 * Dynamiczny sitemap.xml — generowany przez Next.js.
 * Dostępny pod: /sitemap.xml
 *
 * Jak rozszerzyć o dynamiczne trasy (np. blog z CMS):
 *   const posts = await fetchPosts();
 *   return [...staticRoutes, ...posts.map(p => ({ url: `${BASE_URL}/blog/${p.slug}`, ... }))]
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/#uslugi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#ukraina`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#o-nas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
