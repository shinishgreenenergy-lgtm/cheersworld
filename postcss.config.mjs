const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Tailwind 4 wraps everything in @layer, which pre-2022 browsers treat as
    // unknown and drop wholesale — the page renders as raw unstyled HTML.
    // This rewrites layers into plain rules with equivalent specificity so the
    // stylesheet works everywhere.
    "@csstools/postcss-cascade-layers": {},
  },
};

export default config;
