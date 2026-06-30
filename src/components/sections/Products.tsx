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
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.items.map((p, i) => {
            const t = TINTS[i % TINTS.length];
            return (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <a
                  href="#contact"
                  className="group glass relative flex h-full flex-col overflow-hidden rounded-none p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_-24px_rgba(11,11,20,0.28)]"
                >
                  {/* colour separator bar */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  <div className="flex items-center justify-between">
                    <div
                      className="grid h-14 w-14 place-items-center rounded-2xl text-white"
                      style={{ background: t.tile, boxShadow: `0 12px 26px -12px ${t.glow}` }}
                    >
                      <Icon name={p.icon} className="h-7 w-7" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold tracking-tight">{p.name}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{p.tagline}</p>
                  <span
                    aria-hidden
                    className="mt-5 h-[2px] w-8 origin-left transition-transform duration-300 group-hover:scale-x-[2.2]"
                    style={{ background: t.bar }}
                  />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
