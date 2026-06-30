import type { IconName } from "@/components/ui/Icon";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  name: "Cheers Wisdom",
  tagline: "Advancing Human Consciousness",
};

export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; full?: string; href: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "About",
    href: "#about",
    items: [
      { label: "Story", href: "#about" },
      { label: "Vision & Mission", href: "#about" },
      { label: "Leadership", href: "#" },
      { label: "Team", href: "#" },
      { label: "Advisory Board", href: "#" },
      { label: "Timeline", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    label: "Science",
    full: "Science & Research",
    href: "#research",
    items: [
      { label: "Scientific Foundations", href: "#research" },
      { label: "Publications", href: "#" },
      { label: "Clinical Trials", href: "#" },
      { label: "Patents", href: "#" },
      { label: "White Papers", href: "#" },
      { label: "Research Collaborations", href: "#research" },
    ],
  },
  {
    label: "Platform",
    href: "#products",
    items: [
      { label: "AI Architecture", href: "#" },
      { label: "Situational Awareness", href: "#" },
      { label: "Intervention Engine", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
  {
    label: "Solutions",
    href: "#products",
    items: [
      { label: "Healthcare", href: "#products" },
      { label: "Digital Safety", href: "#products" },
      { label: "Mining", href: "#" },
      { label: "Driving", href: "#" },
      { label: "Finance", href: "#products" },
      { label: "Social Wellness", href: "#" },
      { label: "Sports", href: "#" },
      { label: "Future Solutions", href: "#" },
    ],
  },
  {
    label: "Industries",
    href: "#",
    items: [
      { label: "Government", href: "#" },
      { label: "Healthcare", href: "#" },
      { label: "Education", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "Transportation", href: "#" },
      { label: "Mining", href: "#" },
      { label: "Sports", href: "#" },
    ],
  },
  {
    label: "Evidence",
    href: "#insights",
    items: [
      { label: "Case Studies", href: "#" },
      { label: "Success Stories", href: "#insights" },
      { label: "Outcomes", href: "#" },
      { label: "Testimonials", href: "#insights" },
      { label: "Reports", href: "#" },
    ],
  },
  {
    label: "Resources",
    href: "#insights",
    items: [
      { label: "Knowledge Centre", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Videos", href: "#" },
      { label: "Downloads", href: "#" },
      { label: "Gallery", href: "#" },
      { label: "Events", href: "#" },
      { label: "Media Centre", href: "#" },
    ],
  },
  {
    label: "Partners",
    href: "#research",
    items: [
      { label: "Universities", href: "#research" },
      { label: "Hospitals", href: "#research" },
      { label: "Government", href: "#" },
      { label: "NGOs", href: "#" },
      { label: "Technology", href: "#" },
    ],
  },
  {
    label: "Trust",
    full: "Trust Centre",
    href: "#",
    items: [
      { label: "Privacy", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Responsible AI", href: "#" },
      { label: "Security", href: "#" },
      { label: "Ethics", href: "#" },
    ],
  },
  {
    label: "Contact",
    href: "#contact",
    items: [
      { label: "Sales", href: "#contact" },
      { label: "Government", href: "#contact" },
      { label: "Research", href: "#contact" },
      { label: "Support", href: "#contact" },
      { label: "Media", href: "#contact" },
      { label: "Careers", href: "#" },
    ],
  },
];

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

export const about = {
  eyebrow: "Who We Are",
  title: "About Cheers Wisdom",
  paragraphs: [
    "Cheers Wisdom is a global R&D company pioneering adaptive AI companions that understand, track, and guide human experiences across health, emotion, and cognition.",
    "From cardiac recovery to cyber wellbeing, we transform awareness into measurable, life-changing outcomes.",
  ],
  dimensions: ["Physical", "Mental", "Social", "Cyber", "Financial"],
};

export const scienceSoul = {
  eyebrow: "Where Science Meets Soul",
  title: "Where science meets soul",
  subtitle:
    "Wellness is situational. It changes with how we think, feel, and act. Our AI companions blend neuroscience, behavioral science, and emotional intelligence to guide people through awareness-driven recovery and decision-making.",
  features: [
    { title: "Emotional Intelligence + AI", body: "Blending empathy with computational power.", icon: "BrainCircuit" as IconName },
    { title: "Personalized Situational Awareness", body: "Adapting to your unique context.", icon: "ScanEye" as IconName },
    { title: "Real-Time Adaptive Guidance", body: "Dynamic support when you need it most.", icon: "Activity" as IconName },
    { title: "Ethical & Evidence-Based Framework", body: "Grounded in science and human values.", icon: "ShieldCheck" as IconName },
  ],
};

export const products = {
  eyebrow: "The Cheers Wisdom Core AI",
  title: "One ecosystem, every dimension of life",
  subtitle:
    "Our ecosystem connects AI-driven solutions across life's key dimensions: health, digital safety, fashion, finance, and research.",
  items: [
    { name: "Cheers Health", tagline: "Recovery & Rehabilitation", icon: "HeartPulse" as IconName },
    { name: "Cheers Digital", tagline: "Emotional Safety Online", icon: "Shield" as IconName },
    { name: "Cheers Wellthy", tagline: "Financial Emotional Balance", icon: "Wallet" as IconName },
    { name: "Cheers Fashion", tagline: "Identity & Mood Wellness", icon: "Shirt" as IconName },
    { name: "Cheers Research", tagline: "Innovation in Human-AI Science", icon: "Microscope" as IconName },
  ],
};

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

export const testimonials = {
  eyebrow: "Wisdom in Action",
  title: "Real impact, real voices",
  items: [
    { quote: "Cheers Health redefines recovery through awareness.", name: "Dr. Sundeep Mishra", role: "Ujala Cygnus", initials: "SM" },
    { quote: "Students feel emotionally safer online with Cheers Digital.", name: "Principal", role: "Modern School", initials: "MS" },
    { quote: "It reminded me to eat, rest, and care, like a real companion.", name: "Trial Patient", role: "Jaipur", initials: "TP" },
  ],
};

export const cta = {
  title: "Join the Wisdom Movement",
  body: "Partner with us to bring adaptive AI wellness to your hospital, school, or organization.",
  button: { label: "Get in Touch", href: "#contact" },
};

export const footer = {
  blurb: "Advancing human consciousness through adaptive AI companions across health, emotion, and awareness.",
  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Products", href: "#products" },
    { label: "Team", href: "#about" },
    { label: "Research", href: "#research" },
    { label: "Insights", href: "#insights" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
  ],
  socials: ["LinkedIn", "X", "Instagram", "YouTube"],
  copyright: "© 2025 Cheers Wisdom Pvt. Ltd. All rights reserved.",
};
