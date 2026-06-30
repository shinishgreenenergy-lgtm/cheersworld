import type { Metadata } from "next";
import { Sora, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

// Premium, highly readable pairing: Sora for headings, Inter for body.
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Handwritten script for the "Consciousness" word.
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dancing",
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
    <html lang="en" className={`${sora.variable} ${inter.variable} ${dancing.variable}`}>
      <head>
        {/* Google Material Symbols (used in the mega-menu) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
