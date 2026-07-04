const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const hero = {
  badge: "Global R&D Company",
  titleTop: "Advancing Human",
  titleAccent: "Consciousness",
  body:
    "We design AI companions that track, guide, and enhance human wellness across physical, mental, social, cyber, and financial dimensions.",
  image: img("photo-1506126613408-eca07ce68773", 1400),
  chip: { value: "Adaptive AI", label: "wellness companions" },
  ctaPrimary: { label: "Explore the Ecosystem", href: "#products" },
  ctaSecondary: { label: "Join the Movement", href: "#contact" },
};
