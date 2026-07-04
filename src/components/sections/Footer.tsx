import Link from "next/link";
import Image from "next/image";
import { footer, site } from "@/lib/content";

function FooterLink({ label, href }: { label: string; href?: string }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-muted/60">
        {label}
        <span className="rounded-full border border-dashed border-line px-1.5 py-px text-[8.5px] font-bold uppercase tracking-[0.08em] text-muted/70">
          Soon
        </span>
      </span>
    );
  }
  return (
    <Link href={href} className="text-sm text-muted transition-colors hover:text-ink">
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.3))] py-16 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* brand + newsletter */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Link href="#top" className="inline-flex items-center gap-3">
              <span className="grid h-16 w-16 place-items-center">
                <Image src="/cheers-logo.svg" alt={site.name} width={96} height={96} className="h-full w-full" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{footer.blurb}</p>
          </div>
          <div className="lg:justify-self-end">
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-ink">{footer.newsletter.title}</h4>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">{footer.newsletter.body}</p>
            {/* Netlify Forms: attributes baked into static HTML; no JS needed. */}
            <form name="newsletter" method="POST" data-netlify="true" className="mt-4 flex max-w-sm gap-2">
              <input type="hidden" name="form-name" value="newsletter" />
              <input
                type="email"
                name="email"
                required
                placeholder="Work email"
                aria-label="Email address"
                className="glass w-full rounded-xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-accent/60"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[linear-gradient(120deg,#5bb873,#2e8b57)] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgba(46,158,91,0.55)] transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* link columns */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-ink">{col.heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink {...l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">{footer.copyright}</p>
          <ul className="flex items-center gap-5">
            {footer.socials.map((s) => (
              <li key={s} className="inline-flex items-center gap-1.5 text-sm text-muted/60">
                {s}
                <span className="rounded-full border border-dashed border-line px-1.5 py-px text-[8.5px] font-bold uppercase tracking-[0.08em] text-muted/70">
                  Soon
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
