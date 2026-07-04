import type { IconName } from "@/components/ui/Icon";

export const partnerNames = [
  "NIMS Jaipur",
  "NIMS Hyderabad",
  "Medtrina Hospitals",
  "Renova Hospitals",
  "Ujala Cygnus",
  "Sancheti School",
  "Modern School",
  "Faubert Lab",
  "Amity Cognitive Lab",
];

export const partners = {
  eyebrow: "Built on Science. Backed by Trust.",
  title: "Built on science. Backed by trust.",
  subtitle:
    "In collaboration with leading hospitals, research institutions, and schools, bringing AI science to life through real human impact.",
  groups: [
    {
      heading: "Hospitals",
      icon: "Building2" as IconName,
      items: ["NIMS Jaipur", "NIMS Hyderabad", "Medtrina Hospitals", "Renova Hospitals", "Ujala Cygnus Hospitals"],
    },
    {
      heading: "Schools",
      icon: "GraduationCap" as IconName,
      items: ["Sancheti School", "Modern School"],
    },
    {
      heading: "Research",
      icon: "FlaskConical" as IconName,
      items: ["Faubert Lab (NeuroTrackerX)", "CIIPS (Cyber AI Research)", "Amity Cognitive Computing Lab"],
    },
  ],
};
