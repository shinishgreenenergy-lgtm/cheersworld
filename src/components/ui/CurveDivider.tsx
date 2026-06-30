// Full-width wavy section divider (dreamcomposer-style curve), green-tinted.
export function CurveDivider() {
  return (
    <div aria-hidden className="relative -mt-px leading-[0]">
      <svg
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        className="block h-14 w-full sm:h-20 lg:h-28"
      >
        <defs>
          <linearGradient id="cwWaveFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e9e5b" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2e9e5b" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cwWaveBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fbf4d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8fbf4d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* back wave (olive-lime) */}
        <path
          d="M0,52 C260,98 520,8 760,40 C1000,72 1240,108 1440,56 L1440,130 L0,130 Z"
          fill="url(#cwWaveBack)"
        />
        {/* front wave (emerald) */}
        <path
          d="M0,74 C240,34 500,40 720,68 C980,100 1200,118 1440,78 L1440,130 L0,130 Z"
          fill="url(#cwWaveFront)"
        />
      </svg>
    </div>
  );
}
