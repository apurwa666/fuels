export interface EmailTemplate {
  id: number;
  name: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface CaseStudyStat {
  label: string;
  value: string;
}

export interface GaugeData {
  pct: number;
  max: number;
  label: string;
  fromValue: string;
}

export interface StrategyData {
  iconName: string;
  title: string;
  desc: string;
}

export interface ResultData {
  label: string;
  from: string;
  to: string;
  lift: string;
}

export interface CaseStudy {
  id: number;
  clientName: string;
  title: string;
  subtitle: string;
  industry: string;
  timeline: string;
  stack: string;
  lift: string;
  imageUrl: string;
  creativeUrl: string; // Added for detailed work showcase
  excerpt: string;
  slug: string;
  overview: string;
  challenge: string;
  challengeStats: CaseStudyStat[];
  gauges: GaugeData[];
  strategies: StrategyData[];
  results: ResultData[];
  mandalaPct: number;
  mandalaLabel: string;
  mandalaTitle: string;
  mandalaSub: string;
  mandalaDesc: string;
  testimonial: {
    quote: string;
    author: string;
  };
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  imageUrl: string;
  excerpt: string;
  content: React.FC;
  author: string;
  date: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  name: string;
  title: string;
  imageUrl: string;
  dataAiHint?: string;
}

export interface NavLink {
    href?: string;
    label: string;
    children?: { href: string; label: string }[];
}
