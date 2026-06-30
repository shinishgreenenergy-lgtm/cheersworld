import { Reveal } from "../ui/Reveal";
import { Marquee } from "../ui/Marquee";
import { partners } from "@/lib/content";

// Real institution logos (downloaded locally for the static export).
const LOGOS: Record<string, string> = {
  "NIMS Jaipur": "/partners/nims-jaipur.png",
  "NIMS Hyderabad": "/partners/nims-hyderabad.svg",
  "Medtrina Hospitals": "/partners/meditrina.png",
  "Renova Hospitals": "/partners/renova.svg",
  "Ujala Cygnus Hospitals": "/partners/ujala-cygnus.jpeg",
  "Sancheti School": "/partners/sancheti.webp",
  "Modern School": "/partners/modern-school.png",
  "Faubert Lab (NeuroTrackerX)": "/partners/faubert.png",
  "CIIPS (Cyber AI Research)": "/partners/ciips.png",
  "Amity Cognitive Computing Lab": "/partners/amity-accbi.png",
};

const names = partners.groups.flatMap((g) => g.items).filter((n) => LOGOS[n]);

function LogoMark({ name }: { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGOS[name]}
      alt={name}
      loading="lazy"
      className="h-9 w-auto max-w-[150px] object-contain opacity-65 grayscale mix-blend-multiply transition-all duration-300 hover:opacity-100"
    />
  );
}

export function Trusted() {
  return (
    <section className="relative isolate overflow-hidden border-y border-line bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em] text-muted">
            In collaboration with leading hospitals, schools &amp; research labs
          </p>
        </Reveal>
      </div>

      {/* single thin line of greyscale logos, no boxes */}
      <div className="mt-6">
        <Marquee duration={52} gap={64}>
          {names.map((n, i) => (
            <LogoMark key={i} name={n} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
