export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-canvas" />
      <div className="absolute -left-40 -top-48 h-[42rem] w-[42rem] rounded-full bg-accent/25 blur-[130px] animate-floaty" />
      <div
        className="absolute -right-44 top-1/3 h-[38rem] w-[38rem] rounded-full bg-accent-2/20 blur-[130px] animate-floaty"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-accent-3/15 blur-[140px] animate-floaty"
        style={{ animationDelay: "-9s" }}
      />
    </div>
  );
}
