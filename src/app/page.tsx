import { Aurora } from "@/components/ui/Aurora";
import { TrustSeal } from "@/components/ui/TrustSeal";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Trusted } from "@/components/sections/Trusted";
import { About } from "@/components/sections/About";
import { ScienceSoul } from "@/components/sections/ScienceSoul";
import { Products } from "@/components/sections/Products";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";
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
        <ScienceSoul />
        <Products />
        <Partners />
        <Testimonials />
      </main>
      <Footer />
      <TrustSeal />
    </>
  );
}
