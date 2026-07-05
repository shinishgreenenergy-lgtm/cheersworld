export type Publication = {
  kind: "journal" | "conference" | "poster" | "whitepaper";
  title: string;
  authors?: string;
  journal?: string;
  year?: number;
  doi?: string;
  status: "Published" | "In Review" | "In Preparation";
  href?: string;
};

export const research = {
  eyebrow: "Research",
  title: "Research is the product",
  subtitle:
    "Every solution begins as a study. Explore the work in progress with our clinical, academic and research partners.",
  tabs: ["Studies & Trials", "Publications", "Patents", "Collaborations"] as const,
  studies: [
    { title: "Cardiac recovery & patient awareness", partner: "NIMS Jaipur", status: "In progress", kind: "Clinical study" },
    { title: "Adolescent cyber-wellbeing pilot", partner: "Modern School", status: "In progress", kind: "School pilot" },
    { title: "Cyber-wellbeing pilot", partner: "Sancheti School", status: "In progress", kind: "School pilot" },
    { title: "Perceptual-cognitive training", partner: "Faubert Lab (NeuroTrackerX)", status: "Active", kind: "Research collaboration" },
    { title: "Cognitive computing research", partner: "Amity Cognitive Computing Lab", status: "Active", kind: "Research collaboration" },
    { title: "Cyber AI research", partner: "CIIPS", status: "Active", kind: "Research collaboration" },
  ],
  // Real papers drop in here — the card component already renders every field.
  publications: [] as Publication[],
  publicationsSoon: "Our first publications are in preparation with clinical and academic partners.",
  patentsSoon: "Patent filings are underway. Details will appear here once public.",
};
