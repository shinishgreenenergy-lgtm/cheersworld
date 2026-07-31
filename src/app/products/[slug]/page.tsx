import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ProductPage } from "@/components/sections/Product";
import { products } from "@/lib/content";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} · Cheers Wisdom`,
    description: product.seoDescription ?? product.heroBody,
    alternates: { canonical: `/products/${slug}` },
  };
}

const BASE = "https://www.cheerswisdom.com";

const productJsonLd = (product: (typeof products)[number]) => [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription ?? product.heroBody,
    url: `${BASE}/products/${product.slug}`,
    image: product.heroImage ? `${BASE}${product.heroImage}` : undefined,
    brand: { "@type": "Organization", name: "Cheers Wisdom" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
      { "@type": "ListItem", position: 2, name: product.name, item: `${BASE}/products/${product.slug}` },
    ],
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />
      <Aurora />
      <Header />
      <main className="pt-16">
        <ProductPage product={product} />
      </main>
      <Footer />
    </>
  );
}
