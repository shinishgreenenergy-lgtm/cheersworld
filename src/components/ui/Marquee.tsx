import type { CSSProperties, ReactNode } from "react";

export function Marquee({
  children,
  duration = 36,
  gap = 64,
  reverse = false,
}: {
  children: ReactNode;
  duration?: number;
  gap?: number;
  reverse?: boolean;
}) {
  const style = {
    "--marquee-duration": `${duration}s`,
    gap: `${gap}px`,
    paddingRight: `${gap}px`,
  } as CSSProperties;
  const track =
    "flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]" +
    (reverse ? " [animation-direction:reverse]" : "");

  return (
    <div className="group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className={track} style={style}>
        {children}
      </div>
      <div aria-hidden className={track} style={style}>
        {children}
      </div>
    </div>
  );
}
