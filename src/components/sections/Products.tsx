import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { products } from "@/lib/content";

export function Products() {
  return (
    <section id="products" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={products.eyebrow} title={products.title} subtitle={products.subtitle} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.items.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.06}>
              <a
                href="#contact"
                className="grad-border group flex h-full flex-col rounded-4xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-22px_rgba(11,11,20,0.22)]"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(135deg,#5bb873,#2e8b57)] text-white shadow-[0_12px_26px_-12px_rgba(46,158,91,0.6)]">
                    <Icon name={p.icon} className="h-7 w-7" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold tracking-tight">{p.name}</h3>
                <p className="mt-1.5 text-[15px] text-muted">{p.tagline}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
