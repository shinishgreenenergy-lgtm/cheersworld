import { Aurora } from "@/components/ui/Aurora";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Trusted } from "@/components/sections/Trusted";
import { About } from "@/components/sections/About";
import { ScienceSoul } from "@/components/sections/ScienceSoul";
import { Products } from "@/components/sections/Products";
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
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
