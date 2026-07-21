import type { Metadata } from "next";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { trustCentre } from "@/lib/content";

const doc = trustCentre.find((d) => d.slug === "privacy")!;

export const metadata: Metadata = {
  title: `${doc.title} · Cheers Wisdom`,
  description: doc.description,
};

export default function Page() {
  return <PolicyPage doc={doc} />;
}
