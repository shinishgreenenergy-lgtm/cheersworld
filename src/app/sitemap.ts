import type { MetadataRoute } from "next";
import { products } from "@/lib/content";

export const dynamic = "force-static";

const BASE = "https://www.cheerswisdom.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/knowledge`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/platform`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/careers`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/responsible-ai`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/accessibility`, changeFrequency: "yearly", priority: 0.3 },
    ...products.map((p) => ({
      url: `${BASE}/products/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
