"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { gallery } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Gallery() {
  const [filter, setFilter] = useState<string | null>(null);
  const items = filter ? gallery.items.filter((i) => i.category === filter) : gallery.items;

  return (
    <section id="gallery" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} subtitle={gallery.subtitle} />

        {/* category filter */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter(null)}
              className={cn(
                "rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all",
                filter === null ? "border-accent/50 bg-accent text-white" : "border-line bg-white/60 text-ink-soft hover:border-accent/40",
              )}
            >
              All
            </button>
            {gallery.categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all",
                  filter === c ? "border-accent/50 bg-accent text-white" : "border-line bg-white/60 text-ink-soft hover:border-accent/40",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {items.length > 0 ? (
            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
              {items.map((it) => (
                <figure key={it.src} className="group overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.src} alt={it.caption} loading="lazy" className="w-full transition-transform duration-500 group-hover:scale-105" />
                  <figcaption className="glass px-4 py-2.5 text-[12px] font-semibold text-ink-soft">{it.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.categories.slice(0, 4).map((c) => (
                <div key={c} className="grid aspect-[4/3] place-items-center rounded-2xl border-2 border-dashed border-line bg-white/40 text-center">
                  <div>
                    <Camera className="mx-auto h-7 w-7 text-muted/50" strokeWidth={1.5} />
                    <p className="mt-3 text-[13px] font-bold text-muted">{c}</p>
                    <span className="mt-1.5 inline-block rounded-full border border-dashed border-line px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-muted">
                      Coming Soon
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
