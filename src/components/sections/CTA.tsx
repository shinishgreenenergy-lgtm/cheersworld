import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { cta } from "@/lib/content";

export function CTA() {
  return (
    <section id="contact" className="min-h-[100svh] flex flex-col justify-center scroll-mt-24 px-4 py-20 sm:px-6">
      <Reveal>
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-5xl bg-[linear-gradient(130deg,#2e8b57,#5bb873_55%,#2e9e5b)] px-6 py-20 text-center shadow-[0_40px_80px_-30px_rgba(46,158,91,0.5)]">
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-3/25 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-black tracking-tight text-white sm:text-5xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">{cta.body}</p>
            <div className="mt-9 flex justify-center">
              <Button href={cta.button.href} variant="inverse" icon="arrow">
                {cta.button.label}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
