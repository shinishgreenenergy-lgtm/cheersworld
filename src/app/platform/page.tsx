import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ProductPage } from "@/components/sections/Product";
import { platformPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Platform · Cheers Wisdom",
  description: platformPage.heroBody,
};

export default function Page() {
  return (
    <>
      <Aurora />
      <Header />
      <main className="pt-16">
        <ProductPage product={platformPage} />
      </main>
      <Footer />
    </>
  );
}
