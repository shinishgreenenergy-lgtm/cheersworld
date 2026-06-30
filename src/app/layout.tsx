import type { Metadata } from "next";
import { Nunito, Questrial, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

// Structura-style pairing: Nunito for headings/labels, Questrial for body.
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-questrial",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cheerswisdom.com"),
  title: "Cheers Wisdom · Advancing Human Consciousness",
  description:
    "A global R&D company designing adaptive AI companions that track, guide, and enhance human wellness across physical, mental, social, cyber, and financial dimensions.",
  openGraph: {
    title: "Cheers Wisdom · Advancing Human Consciousness",
    description:
      "Adaptive AI companions that track, guide, and enhance human wellness across health, emotion, and cognition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nunito.variable} ${questrial.variable} ${playfair.variable}`}>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
