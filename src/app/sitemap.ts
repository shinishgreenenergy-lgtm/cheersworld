import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://www.cheerswisdom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/knowledge`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
