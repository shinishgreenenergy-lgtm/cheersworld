import Link from "next/link";
import Image from "next/image";
import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.3))] py-16 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="#top" className="inline-flex items-center">
              <span className="grid h-20 w-20 place-items-center">
                <Image src="/cheers-logo.svg" alt={site.name} width={96} height={96} className="h-full w-full" />
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{footer.blurb}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-ink">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {footer.quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-ink">Connect</h4>
            <ul className="mt-4 space-y-3">
              {footer.socials.map((s) => (
                <li key={s}>
                  <Link href="#" className="text-sm text-muted transition-colors hover:text-ink">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-sm text-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
