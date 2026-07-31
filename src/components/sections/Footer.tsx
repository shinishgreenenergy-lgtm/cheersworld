import Link from "next/link";
import Image from "next/image";
import { footer, site } from "@/lib/content";
import { NewsletterForm } from "./NewsletterForm";

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
                <Image src="/cheers-mark.png" alt={site.name} width={96} height={96} className="h-full w-full object-contain" />
              </span>
              <span className="font-display text-lg font-extrabold tracking-tight text-ink">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">{footer.blurb}</p>
          </div>
          <div className="lg:justify-self-end">
            <span className="block text-xs font-bold uppercase tracking-[0.1em] text-ink">{footer.newsletter.title}</span>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">{footer.newsletter.body}</p>
            <NewsletterForm />
          </div>
        </div>

        {/* link columns */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <span className="block text-xs font-bold uppercase tracking-[0.1em] text-ink">{col.heading}</span>
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
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
