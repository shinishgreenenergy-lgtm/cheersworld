import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { products } from "@/lib/content";
import { TINTS } from "@/lib/tints";

export function Products() {
  return (
    <section id="products" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={products.eyebrow} title={products.title} subtitle={products.subtitle} />
        {/* single row of tilted (parallelogram) cards that lift on hover */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.items.map((p, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={p.name} delay={(i % 5) * 0.06}>
                <a
                  href="#contact"
                  className="group block h-full transition-transform duration-300 ease-out hover:-translate-y-3"
                >
                  <div className="glass relative flex h-full flex-col overflow-hidden px-6 py-7 [transform:skewX(-9deg)] transition-shadow duration-300 group-hover:shadow-[0_32px_64px_-26px_rgba(11,11,20,0.34)]">
                    {/* colour separator bar (tilts with the card) */}
                    <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                    {/* content counter-skews so it stays upright */}
                    <div className="[transform:skewX(9deg)]">
                      <div className="flex items-center justify-between">
                        <div
                          className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                          style={{ background: t.tile, boxShadow: `0 12px 26px -12px ${t.glow}` }}
                        >
                          <Icon name={p.icon} className="h-6 w-6" />
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <h3 className="mt-5 text-lg font-extrabold leading-tight tracking-tight">{p.name}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{p.tagline}</p>
                      <span
                        aria-hidden
                        className="mt-5 block h-[2px] w-8 origin-left transition-transform duration-300 group-hover:scale-x-[2.2]"
                        style={{ background: t.bar }}
                      />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
