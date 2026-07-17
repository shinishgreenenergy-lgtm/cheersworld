"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { TINTS } from "@/lib/tints";
import type { Product, ProductSection } from "@/lib/content";

function Cta({ label, href, primary }: { label: string; href: string; primary?: boolean }) {
  const external = href.startsWith("http");
  const cls = primary
    ? "inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#5bb873,#2e8b57)] px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_18px_36px_-18px_rgba(46,158,91,0.7)] transition-transform hover:-translate-y-0.5"
    : "inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-5 py-2.5 text-[13.5px] font-semibold text-ink backdrop-blur transition-transform hover:-translate-y-0.5";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {label} <ArrowUpRight className="h-4 w-4" />
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function Section({ section, index }: { section: ProductSection; index: number }) {
  const t = TINTS[index % TINTS.length];
  const items = section.items ?? [];
  const stats = items.filter((i) => i.value);
  const cards = items.filter((i) => !i.value);
  return (
    <section id={section.id} className="scroll-mt-24 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-2.5">
            {section.eyebrow && (
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: t.text }}>
                {section.eyebrow}
              </span>
            )}
            {section.heading && (
              <h2 className="max-w-3xl text-balance font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.16] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_48]">
                {section.heading}
              </h2>
            )}
            {section.body && (
              <p className="max-w-3xl text-[15px] leading-relaxed text-muted">{section.body}</p>
            )}
          </div>
        </Reveal>

        {stats.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={`${s.value}-${i}`} delay={i * 0.06}>
                <div className="glass rounded-2xl px-5 py-6 text-center">
                  <div className="font-display text-3xl font-extrabold tracking-tight" style={{ color: t.text }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-[12.5px] font-medium text-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {cards.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((item, i) => (
              <Reveal key={`${item.title}-${i}`} delay={(i % 3) * 0.06}>
                <div className="glass relative h-full overflow-hidden rounded-2xl px-5 py-6">
                  <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: t.bar }} />
                  {item.icon && <div className="text-2xl">{item.icon}</div>}
                  {item.title && (
                    <h3 className="mt-2 font-display text-[15px] font-extrabold leading-tight tracking-tight text-ink">
                      {item.title}
                    </h3>
                  )}
                  {item.desc && <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{item.desc}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {section.image && (
          <Reveal className="mt-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={section.image}
              alt={section.heading || "Product visual"}
              loading="lazy"
              className="w-full rounded-3xl border border-line object-cover shadow-[0_40px_80px_-40px_rgba(20,22,42,0.35)]"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function ProductPage({ product }: { product: Product }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {product.tagline || product.name}
                </span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-6 max-w-xl text-balance font-serif text-[clamp(2.1rem,4.4vw,3.4rem)] font-medium leading-[1.1] tracking-[-0.01em] text-ink [font-variation-settings:'opsz'_60]">
                  {product.heroTitle}
                </h1>
              </Reveal>
              {product.heroBody && (
                <Reveal delay={0.12}>
                  <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">{product.heroBody}</p>
                </Reveal>
              )}
              {product.ctas.length > 0 && (
                <Reveal delay={0.18}>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {product.ctas.map((cta, i) => (
                      <Cta key={cta.label} label={cta.label} href={cta.href} primary={i === 0} />
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
            {product.heroImage && (
              <Reveal delay={0.15}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full rounded-3xl border border-line object-cover shadow-[0_50px_100px_-50px_rgba(20,22,42,0.45)]"
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {product.sections.map((s, i) => (
        <Section key={`${s.heading}-${i}`} section={s} index={i} />
      ))}

      {/* Closing CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-12 text-center">
              <h2 className="max-w-xl text-balance font-serif text-2xl font-medium text-ink sm:text-3xl">
                See {product.name} in action
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                <Cta label="Request a demo" href="/#contact" primary />
                <Cta label="All solutions" href="/#solutions" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
