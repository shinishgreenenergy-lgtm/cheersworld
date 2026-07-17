"use client";

import { useMemo, useState } from "react";
import { Camera, Expand } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { gallery } from "@/lib/content";

const ALL = "All";

export function Gallery() {
  const [filter, setFilter] = useState(ALL);

  // Only offer categories that actually have photos.
  const categories = useMemo(
    () => [ALL, ...gallery.categories.filter((c) => gallery.items.some((i) => i.category === c))],
    [],
  );
  const items = filter === ALL ? gallery.items : gallery.items.filter((i) => i.category === filter);

  return (
    <section id="gallery" className="flex min-h-[70svh] flex-col justify-center scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} subtitle={gallery.subtitle} />

        {gallery.items.length > 0 ? (
          <Reveal className="mt-10">
            {/* filter + count + nav in one compact control row */}
            <Carousel key={filter} opts={{ align: "start" }} className="w-full">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Tabs value={filter} onValueChange={setFilter}>
                  <TabsList variant="line" className="h-auto flex-wrap gap-1.5 p-0">
                    {categories.map((c) => (
                      <TabsTrigger
                        key={c}
                        value={c}
                        className="h-auto flex-none rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-[12px] font-bold text-ink-soft after:hidden hover:border-accent/40 data-[state=active]:border-accent/50 data-[state=active]:bg-accent data-[state=active]:text-white"
                      >
                        {c}
                        <span className="ml-1 font-mono text-[10px] opacity-60">
                          {c === ALL ? gallery.items.length : gallery.items.filter((i) => i.category === c).length}
                        </span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
                <div className="flex items-center gap-2">
                  <CarouselPrevious />
                  <CarouselNext />
                </div>
              </div>

              {/* compressed filmstrip */}
              <CarouselContent className="mt-5">
                {items.map((it) => (
                  <CarouselItem key={it.src} className="basis-4/5 sm:basis-2/5 lg:basis-[30%] xl:basis-[23.5%]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="group relative block h-56 w-full overflow-hidden rounded-2xl border border-line text-left sm:h-60"
                          aria-label={`Enlarge: ${it.caption}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={it.src}
                            alt={it.caption}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(180deg,transparent,rgba(10,12,20,0.72))]" />
                          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5">
                            <span className="min-w-0">
                              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/65">
                                {it.category}
                              </span>
                              <span className="mt-0.5 line-clamp-2 text-[12px] font-semibold leading-snug text-white">
                                {it.caption}
                              </span>
                            </span>
                            <Expand className="mb-0.5 h-3.5 w-3.5 shrink-0 text-white/70 transition-transform group-hover:scale-110" />
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl border-line bg-white p-3 sm:p-4" showCloseButton>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.src} alt={it.caption} className="max-h-[72svh] w-full rounded-xl object-contain" />
                        <DialogTitle className="px-1 font-display text-[15px] font-extrabold tracking-tight text-ink">
                          {it.caption}
                        </DialogTitle>
                        <DialogDescription className="-mt-2 px-1 pb-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                          {it.category}
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}
