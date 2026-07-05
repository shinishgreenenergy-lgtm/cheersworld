import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Trusted } from "@/components/sections/Trusted";
import { About } from "@/components/sections/About";
import { Dimensions } from "@/components/sections/Dimensions";
import { Science } from "@/components/sections/Science";
import { Solutions } from "@/components/sections/Solutions";
import { Architecture } from "@/components/sections/Architecture";
import { Research } from "@/components/sections/Research";
import { Evidence } from "@/components/sections/Evidence";
import { Dashboards } from "@/components/sections/Dashboards";
import { Government } from "@/components/sections/Government";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { Gallery } from "@/components/sections/Gallery";
import { Knowledge } from "@/components/sections/Knowledge";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Aurora />
      <Header />
      <main>
        <Hero />
        <Trusted />
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
        <Knowledge />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
