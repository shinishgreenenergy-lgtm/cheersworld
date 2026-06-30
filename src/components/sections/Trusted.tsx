import { Reveal } from "../ui/Reveal";
import { Marquee } from "../ui/Marquee";
import { Icon, type IconName } from "../ui/Icon";
import { partners } from "@/lib/content";

type Partner = { name: string; icon: IconName };

const items: Partner[] = partners.groups.flatMap((g) =>
  g.items.map((name) => ({ name, icon: g.icon })),
);

function LogoLockup({ name, icon }: Partner) {
  return (
    <div className="group flex items-center gap-2.5 whitespace-nowrap">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-accent transition-colors duration-300 group-hover:border-accent/60">
        <Icon name={icon} className="h-[18px] w-[18px]" strokeWidth={1.6} />
      </span>
      <span className="font-display text-[17px] font-extrabold tracking-tight text-ink/80 transition-colors duration-300 group-hover:text-ink">
        {name}
      </span>
    </div>
  );
}

export function Trusted() {
  return (
    <section className="border-y border-line/70 bg-white/40 py-14 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-[13px] font-bold uppercase tracking-[0.2em] text-muted">
            In collaboration with leading hospitals, schools &amp; research labs
          </p>
        </Reveal>
      </div>
      <div className="relative mt-10 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <Marquee duration={48} gap={56}>
          {items.map((p, i) => (
            <LogoLockup key={`l-${i}`} {...p} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
