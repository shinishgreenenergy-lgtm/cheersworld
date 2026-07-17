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
    description: product.heroBody,
  };
}

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
      <Aurora />
      <Header />
      <main className="pt-16">
        <ProductPage product={product} />
      </main>
      <Footer />
    </>
  );
}
