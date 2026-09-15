import dynamic from "next/dynamic";
import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Trusted } from "@/components/sections/Trusted";
import { Footer } from "@/components/sections/Footer";

// Below-fold sections are code-split: their HTML is still statically rendered
// (SEO unaffected), but their JS leaves the critical bundle so first-load
// hydration on mobile doesn't evaluate the whole page at once.
const Capabilities = dynamic(() => import("@/components/sections/Capabilities").then((m) => m.Capabilities));
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Dimensions = dynamic(() => import("@/components/sections/Dimensions").then((m) => m.Dimensions));
const Science = dynamic(() => import("@/components/sections/Science").then((m) => m.Science));
const Solutions = dynamic(() => import("@/components/sections/Solutions").then((m) => m.Solutions));
const Architecture = dynamic(() => import("@/components/sections/Architecture").then((m) => m.Architecture));
const Research = dynamic(() => import("@/components/sections/Research").then((m) => m.Research));
const Evidence = dynamic(() => import("@/components/sections/Evidence").then((m) => m.Evidence));
const Dashboards = dynamic(() => import("@/components/sections/Dashboards").then((m) => m.Dashboards));
const Government = dynamic(() => import("@/components/sections/Government").then((m) => m.Government));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then((m) => m.Testimonials));
const Team = dynamic(() => import("@/components/sections/Team").then((m) => m.Team));
const Gallery = dynamic(() => import("@/components/sections/Gallery").then((m) => m.Gallery));
const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => m.CTA));

export default function Home() {
  return (
    <>
      <Aurora />
      <Header />
      <main>
        <Hero />
        <Trusted />
        <Capabilities />
        <About />
        <Dimensions />
        <Science />
        <Solutions />
        <Architecture />
        <Research />
        <Evidence />
        <Dashboards />
        <Government />
        <Testimonials />
        <Team />
        <Gallery />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
