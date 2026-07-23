import type { IconName } from "@/components/ui/Icon";
import type { SoonLink } from "./types";
import type { Product } from "./products";

const soon = (overview: string): SoonLink[] => [
  { label: "Overview", href: overview },
  { label: "Evidence", href: "/#evidence" },
  { label: "Research", href: "/#research" },
  { label: "Demo", href: "/#contact" },
];

export const solutions = {
  eyebrow: "Human Intelligence Platform",
  title: "One platform. Seven connected solutions.",
  subtitle:
    "Every Cheers solution runs on the same behavioral intelligence core — a living, state-aware model of how human states evolve over time, tuned to a different domain of human life.",
  hub: "Human Intelligence Platform",
  items: [
    {
      name: "Cheers Health",
      tagline: "Clinical recovery & patient wellbeing",
      domain: "Healthcare",
      icon: "HeartPulse" as IconName,
      facets: soon("/products/cheers-health"),
    },
    {
      name: "Cheers Digital",
      tagline: "Cyberbullying prevention & digital resilience",
      domain: "Education",
      icon: "Shield" as IconName,
      facets: soon("/products/cheers-digital"),
    },
    {
      name: "Cheers Social",
      tagline: "Social resilience & recovery from social stress",
      domain: "Social",
      icon: "Users" as IconName,
      facets: soon("/products/cheers-social"),
    },
    {
      name: "Cheers Finance",
      tagline: "Financial resilience & debt-stress detection",
      domain: "Finance",
      icon: "Wallet" as IconName,
      facets: soon("/products/cheers-finance"),
    },
    {
      name: "Cheers Miner",
      tagline: "Workforce readiness & fatigue-risk awareness",
      domain: "Industry",
      icon: "Mountain" as IconName,
      facets: soon("/products/cheers-miner"),
    },
    {
      name: "Cheers Fashion",
      tagline: "Fashion psychology & mindful consumption",
      domain: "Lifestyle",
      icon: "Shirt" as IconName,
      facets: soon("/products/cheers-fashion"),
    },
    {
      name: "Cheers Sports",
      tagline: "Athlete cognition & performance",
      domain: "Sports",
      icon: "Trophy" as IconName,
      facets: [
        { label: "Overview", href: "/#solutions" },
        { label: "Research" },
        { label: "Evidence" },
        { label: "Demo" },
      ] as SoonLink[],
    },
  ],
};

export const architecture = {
  eyebrow: "AI Architecture",
  title: "The Cheers behavioral intelligence architecture",
  subtitle:
    "Human well-being evolves through signals that appear across time. The platform analyzes those signals through a structured, continuously learning architecture.",
  stages: [
    {
      name: "Signal Collection",
      body: "Behavioral, emotional, social, and contextual signals are captured through conversational interfaces and structured inputs.",
      icon: "Waves" as IconName,
    },
    {
      name: "Longitudinal Modeling",
      body: "The system constructs a timeline of signals that allows patterns to emerge across days, weeks, and months.",
      icon: "Activity" as IconName,
    },
    {
      name: "State Detection",
      body: "Machine learning models detect transitions between states such as stable, stressed, recovering, declining, or high-risk.",
      icon: "ScanEye" as IconName,
    },
    {
      name: "Trajectory Analysis",
      body: "The system analyzes the direction of change and identifies early risk trajectories.",
      icon: "TrendingUp" as IconName,
    },
    {
      name: "Guidance & Alerts",
      body: "When risk signals appear, personalized recommendations and alerts are delivered to individuals and relevant stakeholders.",
      icon: "Siren" as IconName,
    },
    {
      name: "Outcome Learning",
      body: "The platform learns continuously from outcomes, improving predictive accuracy over time.",
      icon: "RefreshCw" as IconName,
    },
  ],
  loopNote: "Outcome Learning feeds back into Signal Collection — the loop never stops improving.",
  engine: {
    heading: "The behavioral intelligence engine",
    body: "At the core of Cheers Wisdom is a behavioral intelligence infrastructure designed to understand how human states evolve over time.",
    signals: {
      title: "Signals the platform collects",
      items: [
        "Behavioral routines and habits",
        "Emotional and cognitive indicators",
        "Digital interaction patterns",
        "Health recovery signals",
        "Financial decision behaviors",
        "Occupational readiness indicators",
        "Social stress signals",
        "Lifestyle and consumption patterns",
      ],
    },
    actions: {
      title: "What the AI can do",
      items: [
        "Guide individuals with personalized recommendations",
        "Notify clinicians, educators, or supervisors",
        "Trigger preventive interventions",
        "Provide insights to organizations responsible for safety and well-being",
      ],
    },
    note: "This allows organizations to understand human trajectories instead of isolated events — moving from isolated monitoring to trajectory-based prevention.",
  },
};

// The /platform page — one anchored section per engine, rendered with the
// same section system as the product pages (see ProductPage).
export const platformPage: Product = {
  slug: "platform",
  name: "Human Intelligence Platform",
  tagline: "Human Intelligence Platform",
  heroTitle: "One platform core, engineered around human state",
  heroBody:
    "Every Cheers solution runs on the same behavioral intelligence infrastructure — engines that observe signals in context, model them over time, predict risk trajectories, and intervene early. Explore each layer of the platform below.",
  heroImage: "/products/cheers-health-platform.jpg",
  ctas: [
    { label: "Request a demo", href: "/#contact" },
    { label: "See the architecture", href: "/#architecture" },
  ],
  sections: [
    {
      id: "situational-awareness",
      eyebrow: "Engine 01",
      heading: "Situational Awareness Engine",
      body:
        "Signals mean nothing out of context. The Situational Awareness Engine interprets behavioral, emotional, social, and contextual signals as they arrive — building a live picture of what is happening, right now, for this person.",
      items: [
        {
          icon: "🛰️",
          title: "Context fusion",
          desc: "Signals captured through conversational interfaces and structured inputs are fused with each person's situation and history.",
        },
        {
          icon: "🎚️",
          title: "State detection",
          desc: "Models detect transitions between states such as stable, stressed, recovering, declining, or high-risk.",
        },
        {
          icon: "📏",
          title: "Baseline drift",
          desc: "Every person is measured against their own baseline — deviation from self, not from a population average.",
        },
      ],
    },
    {
      id: "behaviour-intelligence",
      eyebrow: "Engine 02",
      heading: "Behaviour Intelligence Engine",
      body:
        "Well-being evolves through signals that appear across time. The Behaviour Intelligence Engine constructs a longitudinal timeline for each person, letting patterns emerge across days, weeks, and months.",
      items: [
        {
          icon: "📈",
          title: "Longitudinal modeling",
          desc: "A living model of each individual's state over time — thirty readings over two weeks reveal a trajectory a single snapshot never could.",
        },
        {
          icon: "🔁",
          title: "Habit & routine patterns",
          desc: "Behavioral routines, sleep, engagement, and adherence patterns build a behavioural model of each person.",
        },
        {
          icon: "📱",
          title: "Digital phenotyping",
          desc: "Digital-behaviour patterns are understood respectfully and transparently — signals of stress, not surveillance of content.",
        },
      ],
    },
    {
      id: "prediction",
      eyebrow: "Engine 03",
      heading: "Prediction Engine",
      body:
        "Complications, crises, and incidents rarely happen suddenly. The Prediction Engine analyzes the direction of change and identifies early risk trajectories — often days before an event.",
      items: [
        {
          icon: "🧭",
          title: "Trajectory analysis",
          desc: "The direction and velocity of change matter more than any single value — the engine projects where a person is heading.",
        },
        {
          icon: "🧮",
          title: "Composite risk scoring",
          desc: "Multi-component scoring across behavioral stability, trend deviation, escalation velocity, adherence, symptom volatility, and engagement continuity.",
        },
        {
          icon: "⏱️",
          title: "Early warning",
          desc: "Subtle trajectory shifts are surfaced days in advance — the window where prevention is still possible.",
        },
      ],
    },
    {
      id: "intervention",
      eyebrow: "Engine 04",
      heading: "Intervention Engine",
      body:
        "Detection without action changes nothing. When risk signals appear, the Intervention Engine delivers personalized recommendations to individuals and contextual alerts to the people responsible for them.",
      items: [
        {
          icon: "💬",
          title: "Personalized guidance",
          desc: "Timely nudges for medication, movement, rest, digital habits, or financial behavior — adapted to each person's state and language.",
        },
        {
          icon: "🚨",
          title: "Stakeholder alerts",
          desc: "Clinicians, educators, safety managers, and supervisors are notified when risk thresholds are crossed — with context, not just a flag.",
        },
        {
          icon: "🧾",
          title: "Escalation workflows",
          desc: "Structured response paths from report through review, investigation, intervention, and resolution — transparent and accountable.",
        },
      ],
    },
    {
      id: "analytics",
      eyebrow: "Platform Layer",
      heading: "Analytics",
      body:
        "Individual trajectories roll up into population intelligence — for hospitals, school systems, industrial operators, insurers, and public agencies.",
      items: [
        {
          icon: "📊",
          title: "Population risk overview",
          desc: "Real-time distribution of people across risk tiers, with predictions and trend lines for the population you're responsible for.",
        },
        {
          icon: "🧩",
          title: "Cohort & program insight",
          desc: "Compare cohorts, programs, and sites — see where interventions work and where risk is emerging.",
        },
        {
          icon: "💹",
          title: "Economic impact modeling",
          desc: "ROI scenario modeling with conservative, moderate, and optimistic projections — break-even analysis and multi-year savings.",
        },
      ],
    },
    {
      id: "reports",
      eyebrow: "Platform Layer",
      heading: "Reports",
      body:
        "Clear reporting for the people who must stand behind outcomes — clinicians, educators, safety managers, and agencies.",
      items: [
        {
          icon: "📄",
          title: "Clinical & program reports",
          desc: "Per-person and per-program reporting: recovery trajectories, incidents, interventions, and outcomes over time.",
        },
        {
          icon: "🕑",
          title: "Audit trails",
          desc: "Timestamped records of alerts, clinician confirmations, response times, and resolutions by severity tier.",
        },
        {
          icon: "🗂️",
          title: "Compliance-ready exports",
          desc: "HIPAA/IRDAI-ready, PDF-exportable compliance reports designed for regulatory and institutional review.",
        },
      ],
    },
    {
      id: "responsible-ai",
      eyebrow: "Our Commitments",
      heading: "Responsible AI",
      body:
        "The platform observes human beings at vulnerable moments. That demands a design philosophy: safety should never come at the cost of dignity.",
      items: [
        {
          icon: "🚫",
          title: "No surveillance",
          desc: "The platform does not monitor location, private communications, or personal activities — behavioral signals, not content spying.",
        },
        {
          icon: "🤝",
          title: "Dignity by design",
          desc: "Support, not discipline: data is used to help people, never for performance evaluation or punitive action.",
        },
        {
          icon: "🩺",
          title: "No medical diagnosis",
          desc: "The system identifies behavioral patterns that may indicate risk — it does not diagnose medical conditions.",
        },
        {
          icon: "🔬",
          title: "Evidence-driven",
          desc: "Claims are backed by peer-reviewed research; results are published and held to measurable outcomes, not promises.",
        },
      ],
    },
    {
      id: "security",
      eyebrow: "Trust",
      heading: "Security",
      body:
        "Behavioral and health signals are among the most sensitive data there is. The platform is built around consent, minimization, and accountability.",
      items: [
        {
          icon: "✅",
          title: "Consent-first collection",
          desc: "People know what is collected and why — participation is explicit, transparent, and revocable.",
        },
        {
          icon: "🔐",
          title: "Encryption & access control",
          desc: "Data is encrypted in transit and at rest, with role-based access so each portal sees only what it should.",
        },
        {
          icon: "📜",
          title: "Accountable by default",
          desc: "Audit logging across the platform — every alert, access, and intervention leaves a timestamped trail.",
        },
      ],
    },
    {
      id: "integrations",
      eyebrow: "Deployment",
      heading: "Integrations",
      body:
        "Designed to deploy in weeks, not years — the platform works alongside existing systems instead of demanding deep integration first.",
      items: [
        {
          icon: "🏥",
          title: "No EHR integration required",
          desc: "Clinical monitoring runs without complex hospital IT projects — enroll at discharge and start observing the same day.",
        },
        {
          icon: "📲",
          title: "Mobile-first & multilingual",
          desc: "Patients and users join via mobile app or WhatsApp, in English, Hindi, Telugu, or Marathi.",
        },
        {
          icon: "🖥️",
          title: "Portals & dashboards",
          desc: "Role-specific portals — patient, clinician, parent, teacher, safety manager — plus institution-wide dashboards and exports.",
        },
      ],
    },
  ],
};
