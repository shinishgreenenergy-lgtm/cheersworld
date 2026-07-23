// Only verifiably real partners appear here. Metrics without a `value`
// render as "Coming Soon" — never invent numbers.
type Partner = { name: string; logo?: string; url?: string };

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
        { name: "NIMS Jaipur", logo: "/partners/nims-jaipur.png", url: "https://nimsuniversity.org" },
        { name: "NIMS Hyderabad", logo: "/partners/nims-hyderabad.svg", url: "https://nims.edu.in" },
        { name: "Meditrina Hospitals", logo: "/partners/meditrina.png", url: "https://meditrinahospitals.com" },
        { name: "Renova Hospitals", logo: "/partners/renova.svg", url: "https://renovahospitals.com" },
        { name: "Ujala Cygnus Hospitals", logo: "/partners/ujala-cygnus.jpeg", url: "https://ujalacygnus.com" },
        { name: "PGIMER Chandigarh", url: "https://pgimer.edu.in" },
      ],
    },
    {
      label: "Academic",
      items: [
        { name: "Sancheti School", logo: "/partners/sancheti.webp", url: "https://sanchetihospital.org" },
        { name: "Modern School", logo: "/partners/modern-school.png", url: "https://modernschool.net" },
      ],
    },
    {
      label: "Research",
      items: [
        { name: "Faubert Lab", logo: "/partners/faubert.png", url: "https://faubertlab.com" },
        { name: "CIIPS (Cyber AI Research)", logo: "/partners/ciips.png", url: "https://ciipsindia.com" },
        { name: "Amity Cognitive Computing Lab", logo: "/partners/amity-accbi.png", url: "https://www.amity.edu/jaipur/" },
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
