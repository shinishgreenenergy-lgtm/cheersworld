// Only verifiably real partners appear here. Metrics without a `value`
// render as "Coming Soon" — never invent numbers.
type Partner = { name: string; logo?: string };

export const trust: {
  eyebrow: string;
  subhead: string;
  groups: { label: string; soon?: boolean; items: Partner[] }[];
  metrics: { label: string; value?: number }[];
} = {
  eyebrow: "In collaboration with leading institutions",
  subhead:
    "Every institution below is a real, named partner we work with today — hospitals, schools and research labs advancing the science with us. Nothing here is aspirational.",
  groups: [
    {
      label: "Clinical",
      items: [
        { name: "NIMS Jaipur", logo: "/partners/nims-jaipur.png" },
        { name: "NIMS Hyderabad", logo: "/partners/nims-hyderabad.svg" },
        { name: "Medtrina Hospitals", logo: "/partners/meditrina.png" },
        { name: "Renova Hospitals", logo: "/partners/renova.svg" },
        { name: "Ujala Cygnus Hospitals", logo: "/partners/ujala-cygnus.jpeg" },
        { name: "PGIMER Chandigarh" },
      ],
    },
    {
      label: "Academic",
      items: [
        { name: "Sancheti School", logo: "/partners/sancheti.webp" },
        { name: "Modern School", logo: "/partners/modern-school.png" },
      ],
    },
    {
      label: "Research",
      items: [
        { name: "Faubert Lab", logo: "/partners/faubert.png" },
        { name: "CIIPS (Cyber AI Research)", logo: "/partners/ciips.png" },
        { name: "Amity Cognitive Computing Lab", logo: "/partners/amity-accbi.png" },
      ],
    },
    { label: "Government", soon: true, items: [] },
    { label: "Technology", soon: true, items: [] },
  ],
  metrics: [
    { label: "Partner hospitals", value: 6 },
    { label: "Partner schools", value: 2 },
    { label: "Research labs", value: 3 },
    { label: "Publications" },
    { label: "Clinical studies" },
    { label: "AI interactions" },
    { label: "Countries" },
    { label: "Patents" },
    { label: "Awards" },
  ],
};
