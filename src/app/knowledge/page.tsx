import type { Metadata } from "next";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Knowledge } from "@/components/sections/Knowledge";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Knowledge Centre · Cheers Wisdom",
  description:
    "Glossary and frequently asked questions about the Cheers Wisdom Human Intelligence Platform.",
};

export default function KnowledgePage() {
  return (
    <>
      <Aurora />
      <Header />
      <main className="pt-16">
        <Knowledge />
      </main>
      <Footer />
    </>
  );
}
