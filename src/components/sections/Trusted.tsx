import { Reveal } from "../ui/Reveal";
import { Marquee } from "../ui/Marquee";
import { Icon, type IconName } from "../ui/Icon";
import { partners } from "@/lib/content";
import { TINTS } from "@/lib/tints";

type Partner = { name: string; icon: IconName; ti: number };

// One flat list, colour-coded by partner category (hospitals / schools / research).
const items: Partner[] = partners.groups.flatMap((g, gi) =>
  g.items.map((name) => ({ name, icon: g.icon, ti: gi })),
);
const rowA = items.filter((_, i) => i % 2 === 0);
const rowB = items.filter((_, i) => i % 2 === 1);

function LogoChip({ name, icon, ti }: Partner) {
  const t = TINTS[ti % TINTS.length];
  return (
    <div className="group/chip glass flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2.5 transition-transform duration-300 hover:-translate-y-0.5">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
        style={{ background: t.soft, color: t.text }}
      >
        <Icon name={icon} className="h-[17px] w-[17px]" strokeWidth={1.7} />
      </span>
      <span className="font-display text-[15px] font-bold tracking-tight text-ink/85 transition-colors duration-300 group-hover/chip:text-ink">
        {name}
      </span>
    </div>
  );
}

export function Trusted() {
  return (
    <section className="relative isolate overflow-hidden border-y border-[#d6dcd4] bg-[#e7ebe6] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cdd5cb] bg-white/60 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {items.length}+ partner institutions
            </span>
            <p className="text-[15px] font-semibold tracking-tight text-ink-soft">
              In collaboration with leading hospitals, schools &amp; research labs
            </p>
          </div>
        </Reveal>
      </div>

      {/* two counter-scrolling rows of colour-coded glass chips */}
      <div className="mt-9 space-y-4">
        <Marquee duration={54} gap={18}>
          {rowA.map((p, i) => (
            <LogoChip key={`a-${i}`} {...p} />
          ))}
        </Marquee>
        <Marquee duration={54} gap={18} reverse>
          {rowB.map((p, i) => (
            <LogoChip key={`b-${i}`} {...p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
