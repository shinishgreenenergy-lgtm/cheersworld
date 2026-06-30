import {
  Brain, Sparkles, Timer, Compass, Eye, Heart, Shield, Lightbulb, Leaf,
  Focus, Activity, Target, Quote, Star, ArrowRight, ArrowUpRight, MoveRight,
  Play, Waves, Wind, Gauge, Zap, Menu, X, Check, BrainCircuit, HandHeart,
  Sprout, Infinity as InfinityIcon, Network, Headphones, ScanEye,
  ShieldCheck, HeartPulse, Wallet, Shirt, Microscope, Building2,
  GraduationCap, FlaskConical, Globe, Users, Mail,
  type LucideProps,
} from "lucide-react";

export const icons = {
  Brain, Sparkles, Timer, Compass, Eye, Heart, Shield, Lightbulb, Leaf,
  Focus, Activity, Target, Quote, Star, ArrowRight, ArrowUpRight, MoveRight,
  Play, Waves, Wind, Gauge, Zap, Menu, X, Check, BrainCircuit, HandHeart,
  Sprout, Infinity: InfinityIcon, Network, Headphones, ScanEye,
  ShieldCheck, HeartPulse, Wallet, Shirt, Microscope, Building2,
  GraduationCap, FlaskConical, Globe, Users, Mail,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp {...props} />;
}
