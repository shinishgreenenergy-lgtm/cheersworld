import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Dancing_Script, Fraunces, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { HashRescroll } from "@/components/providers/HashRescroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Premium pairing: Bricolage Grotesque for expressive headings, Plus Jakarta
// Sans for crisp, highly readable body copy.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display-src",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Handwritten script for the "Consciousness" word.
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

// Editorial display serif for hero/section headlines — high-contrast, humane,
// with true italics for accent words. Variable optical size keeps large
// settings sharp.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-serif-src",
  display: "swap",
});

// Instrument mono for eyebrows, stage labels and data — the "lab" voice.
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cheerswisdom.com"),
  title: "Cheers Wisdom · Human Intelligence Platform",
  description:
    "One AI platform advancing human outcomes across healthcare, education, mining, transportation, finance, sports and government.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cheers Wisdom · Human Intelligence Platform",
    description:
      "One AI Platform. Multiple Human Outcomes. Continuous understanding and adaptive intervention, built on science.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cheers Wisdom · Human Intelligence Platform",
    description:
      "One AI Platform. Multiple Human Outcomes. Continuous understanding and adaptive intervention, built on science.",
  },
};

// JSON-LD structured data — real, verifiable credentials only.
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cheers Wisdom",
  legalName: "Cheers Wisdom Pvt. Ltd.",
  url: "https://www.cheerswisdom.com",
  logo: "https://www.cheerswisdom.com/cheers-logo.svg",
  description:
    "Human Intelligence Platform advancing human outcomes across healthcare, education, mining, transportation, finance, sports and government.",
  email: "support@cheerswisdom.com",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable} ${dancing.variable} ${fraunces.variable} ${splineMono.variable}`}>
      <head>
        {/* On refresh, always start at the very top: disable the browser's
            scroll restoration before it can re-apply the old position.
            Hash targets (/#contact) still scroll natively on load. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash)window.scrollTo(0,0)}catch(e){}",
          }}
        />
        {/* Google Material Symbols (mega-menu icons). Subsetted to only the icons we
            actually use via &icon_names — the full variable font is ~346 KB, the subset
            is a few KB. preconnect warms the font origins so the small fetch is fast. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=account_balance,arrow_forward,article,auto_stories,balance,biotech,bolt,business,category,checkroom,chevron_right,clinical_notes,dashboard,description,directions_car,diversity_3,domain,download,emoji_events,event,extension,fact_check,flag,format_quote,groups,handshake,hub,info,local_hospital,local_police,lock,mail,map,memory,menu_book,monitoring,newspaper,photo_library,policy,psychology,query_stats,rocket_launch,schema,school,science,security,sell,sensors,shield,smart_display,sports_soccer,support_agent,terrain,timeline,trending_up,verified,verified_user,volunteer_activism,work,workspace_premium&display=block"
        />
      </head>
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <SmoothScroll>
          <HashRescroll />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
