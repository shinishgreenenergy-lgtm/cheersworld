import type { IconName } from "@/components/ui/Icon";
import type { SoonLink } from "./types";

export type Dimension = {
  name: string;
  icon: IconName;
  definition: string;
  why: string;
  assessment: string;
  intervention: string;
  solutions: string[];
  links: SoonLink[];
};

export const dimensionsIntro = {
  eyebrow: "Five Dimensions",
  title: "One person, five dimensions of wellbeing",
  subtitle:
    "The platform models wellbeing as five interconnected dimensions. Select one to see how the AI observes it, and how it intervenes.",
};

export const dimensions: Dimension[] = [
  {
    name: "Physical",
    icon: "Activity",
    definition: "The body's recovery, energy and vitality — from cardiac rehabilitation to daily movement, rest and nutrition.",
    why: "Physical state drives everything else: recovery speed, cognitive clarity, emotional resilience and safe performance at work.",
    assessment: "The platform observes activity, rest and self-reported recovery signals to build a continuous picture of physical state.",
    intervention: "Timely nudges for movement, rest and care routines — adapted to each person's recovery stage and daily context.",
    solutions: ["Cheers Health", "Cheers Drive", "Cheers ForeSite", "Cheers Sports"],
    links: [{ label: "Clinical studies", href: "/#research" }, { label: "Healthcare evidence", href: "/#evidence" }],
  },
  {
    name: "Mental",
    icon: "BrainCircuit",
    definition: "Clarity, focus, stress load and emotional resilience — the cognitive and emotional core of wellbeing.",
    why: "Mental state shapes decisions, safety and recovery. Fatigue and stress are leading factors in workplace and road incidents.",
    assessment: "Signals of attention, stress and mood are understood in context — situational awareness, not snapshots.",
    intervention: "Adaptive guidance for focus, stress recovery and emotional balance, delivered when it actually helps.",
    solutions: ["Cheers Health", "Cheers Presence", "Cheers Sports"],
    links: [{ label: "The science", href: "/#science" }],
  },
  {
    name: "Social",
    icon: "Users",
    definition: "Connection, belonging and support — the relationships that carry people through recovery and daily life.",
    why: "Isolation slows recovery and erodes resilience; connection measurably improves outcomes across every domain.",
    assessment: "The platform understands social context and engagement patterns as part of each person's situation.",
    intervention: "Prompts and programs that strengthen connection — for patients, students, teams and communities.",
    solutions: ["Cheers Presence", "Cheers Health"],
    links: [{ label: "Success stories", href: "/#testimonials" }],
  },
  {
    name: "Cyber",
    icon: "ShieldCheck",
    definition: "Safety and emotional wellbeing in digital life — online behaviour, exposure and digital balance.",
    why: "Digital life now shapes mental health, especially for young people. Cyber wellbeing is wellbeing.",
    assessment: "Digital-behaviour patterns are understood through digital phenotyping — respectfully and transparently.",
    intervention: "Cheers Digital guides safer, emotionally healthier digital habits for students and families.",
    solutions: ["Cheers Digital"],
    links: [{ label: "School pilots", href: "/#research" }, { label: "Education evidence", href: "/#evidence" }],
  },
  {
    name: "Financial",
    icon: "Wallet",
    definition: "Financial behaviour, security and confidence — the money-wellbeing link most platforms ignore.",
    why: "Financial stress is a major driver of anxiety, poor sleep and poor decisions; balance here lifts every other dimension.",
    assessment: "Behavioural patterns around spending and financial stress are observed as part of whole-person context.",
    intervention: "Cheers Finance builds awareness-driven financial habits and emotional balance around money.",
    solutions: ["Cheers Finance"],
    links: [{ label: "Solution overview", href: "/#solutions" }],
  },
];
