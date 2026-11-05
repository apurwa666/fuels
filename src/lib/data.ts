import type { EmailTemplate, CaseStudy, BlogPost, Testimonial, FaqItem, TeamMember, NavLink } from './types';
import { 
  CalendarCheck, 
  Workflow, 
  Users, 
  Target, 
  Zap, 
  Mail, 
  TrendingUp, 
  Layout,
  Clock,
  BarChart3
} from "lucide-react"
import React from 'react';

import { Blog1Content } from '@/components/blog-content/blog-1';
import { Blog2Content } from '@/components/blog-content/blog-2';
import { Blog3Content } from '@/components/blog-content/blog-3';
import { Blog4Content } from '@/components/blog-content/blog-4';
import { Blog5Content } from '@/components/blog-content/blog-5';
import { Blog6Content } from '@/components/blog-content/blog-6';
import placeholders from '@/app/lib/placeholder-images.json';

export const navLinks: NavLink[] = [
    { href: "/#about-us", label: "About Us" },
    { 
      label: "Services",
      children: [
        { href: "/email-marketing", label: "Email Marketing" },
        { href: "/growth-marketing", label: "Growth Marketing" },
      ]
    },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/blog", label: "Blog" },
  ]

export const stats = [
  {
    value: 30,
    label: "Satisfied Business Owners",
    suffix: " +",
    duration: 2000,
    icon: Users,
    prefix: "",
  },
  {
    value: 40,
    label: "Average Client ROI",
    suffix: " x",
    duration: 2000,
    icon: TrendingUp,
    prefix: "",
  },
  {
    value: 15,
    label: "Million revenue generated",
    suffix: " +",
    duration: 2000,
    icon: Mail,
    prefix: "$",
  },
]

export const services = [
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Full-service campaign creation, sending, analytics, and automation to turn your inbox into a revenue engine.",
    href: "/email-marketing",
    teaser: "Campaign creation, sending, analytics, automation, and smarter targeting."
  },
  {
    icon: TrendingUp,
    title: "Growth Marketing",
    description: "Sales development, customer lifecycle, and growth experiments that go beyond the inbox to scale your business.",
    href: "/growth-marketing",
    teaser: "Sales development, customer lifecycle, and growth experiments, beyond the inbox."
  }
]

export const emailServices = [
  {
    title: "Strategic Campaign Management",
    description: "End-to-end management of your email calendar. From conceptualization and copy to design and deployment.",
    icon: CalendarCheck,
  },
  {
    title: "Advanced Lifecycle Automation",
    description: "Automated flows that work while you sleep. Welcome series, abandoned carts, and post-purchase sequences designed for ROI.",
    icon: Workflow,
  },
  {
    title: "Data-Driven Segmentation",
    description: "Send the right message to the right person. We segment your list based on behavior and purchase history for maximum impact.",
    icon: Users,
  }
]

export const growthServices = [
  {
    title: "Sales Development & Lead Gen",
    description: "We build targeted account lists, manage cold outreach on Email and LinkedIn, and provide SDR support to fill your pipeline.",
    icon: Target,
  },
  {
    title: "Customer Lifecycle",
    description: "Optimize every touchpoint with onboarding flows, upsell nurture, churn prevention, and CRM hygiene.",
    icon: Workflow,
  },
  {
    title: "Growth Hacking & Experimentation",
    description: "Data-driven audits, CRO, and rapid experimentation cadences designed to find your most efficient growth levers.",
    icon: Zap,
  }
]

export const teamMembers: TeamMember[] = placeholders.team.map(member => ({
  name: member.name,
  title: 'Co-Founder & CEO',
  imageUrl: member.url,
  dataAiHint: member.hint,
}));

export const emailTemplates: EmailTemplate[] = placeholders.hero.templates.map(t => ({
  id: t.id,
  name: `Template ${t.id}`,
  imageUrl: t.url,
  dataAiHint: t.hint
}));

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    clientName: 'BSTC Thangka Store',
    slug: 'bstc-thangka-retention-machine',
    title: 'Turning a quiet newsletter into 26% of total revenue',
    subtitle: 'Hand-Painted Tibetan Art',
    imageUrl: placeholders.caseStudies[0].banner,
    creativeUrl: placeholders.caseStudies[0].email,
    excerpt: 'We rebuilt BSTC\'s marketing infrastructure from the ground up, transforming email into their primary growth engine.',
    industry: 'DTC · Art & Craft',
    timeline: '8 weeks',
    stack: 'Shopify + Klaviyo',
    lift: '+189% Lift',
    overview: 'BSTC Thangka Store specializes in authentic, hand-painted Tibetan thangka art. The goal was to scale online revenue through surgical email automation while strictly preserving the brand\'s spiritual and cultural depth.',
    challenge: 'Despite a highly engaged audience, repeat purchases were non-existent and lifecycle automation was missing. Generic broadcasts were the only strategy, resulting in stagnant growth.',
    challengeStats: [
      { label: 'Open rate', value: '18%' },
      { label: 'Conversion', value: '<1%' },
      { label: 'Flows live', value: '0' }
    ],
    gauges: [
      { pct: 41, max: 100, label: 'Email Open Rate', fromValue: '18%' },
      { pct: 7.8, max: 15, label: 'Click-Through Rate', fromValue: '2.3%' },
      { pct: 3.5, max: 6, label: 'Conversion Rate', fromValue: '0.9%' },
      { pct: 26, max: 40, label: 'Revenue via Email', fromValue: '9%' }
    ],
    strategies: [
      { iconName: 'Layout', title: 'Klaviyo Architecture', desc: 'Deep integration between Shopify and Klaviyo to capture granular behavioral data for precise targeting.' },
      { iconName: 'Zap', title: 'Behavioral Automation', desc: '15+ automated flows covering the entire lifecycle: from welcome paths to predictive win-back loops.' },
      { iconName: 'Clock', title: 'High-Performance Design', desc: 'Blending cultural storytelling with conversion-focused layouts to drive intent without sacrificing brand equity.' },
      { iconName: 'BarChart3', title: 'Experimentation Cadence', desc: 'Continuous A/B testing of offers, timing, and copy to ensure the engine scales with audience health.' }
    ],
    results: [
      { label: 'Open Rate', from: '18%', to: '41%', lift: '+128%' },
      { label: 'Click-Through Rate', from: '2.3%', to: '7.8%', lift: '+239%' },
      { label: 'Conversion Rate', from: '0.9%', to: '3.5%', lift: '+289%' },
      { label: 'Email Rev Share', from: '9%', to: '26%', lift: '+189%' }
    ],
    mandalaPct: 26,
    mandalaLabel: 'of total revenue<br>fueled by FuelMails',
    mandalaTitle: 'Scaling Retention',
    mandalaSub: 'Email is now the most profitable lever in the business.',
    mandalaDesc: 'By engineering systems that turn one-time buyers into lifetime collectors, we helped BSTC secure their revenue without relying on volatile ad algorithms.',
    testimonial: {
      quote: "FuelMails didn't just build our emails; they built a retention machine that understands our customers as deeply as we do.",
      author: "Marketing Director, BSTC"
    }
  },
  {
    id: 2,
    clientName: 'Global Health Advocacy',
    slug: 'global-health-lead-generation',
    title: 'Building a $30,000/mo donor engine from zero',
    subtitle: 'Health Advocacy Nonprofit',
    imageUrl: placeholders.caseStudies[1].banner,
    creativeUrl: placeholders.caseStudies[1].email,
    excerpt: 'Turning 5,600+ cold contacts into over $64,000 in immediate revenue and a structured grant pipeline.',
    industry: 'Nonprofit · Global Health',
    timeline: '12 weeks',
    stack: 'Apollo + LinkedIn + Email',
    lift: '$30k/mo MRR',
    overview: 'A global health advocacy organization needed to grow its donor and partner base within a specific niche where no existing prospect list or funding pipeline existed.',
    challenge: 'There was no donor or partner acquisition engine, no sourced list, no CRM structure, and no organized view of institutional grant opportunities.',
    challengeStats: [
      { label: 'Prospects', value: '0' },
      { label: 'Grant Funnel', value: 'None' },
      { label: 'System', value: 'Inherited' }
    ],
    gauges: [
      { pct: 85, max: 100, label: 'Prospect Database', fromValue: '0' },
      { pct: 64, max: 80, label: 'One-Time Revenue', fromValue: '$0' },
      { pct: 100, max: 100, label: 'New Recurring Revenue', fromValue: '$0' },
      { pct: 13, max: 20, label: 'New Partners Secured', fromValue: '0' }
    ],
    strategies: [
      { iconName: 'Target', title: 'Lead Sourcing', desc: 'Sourced 5,000+ individual donors and 600+ institutional partners from scratch.' },
      { iconName: 'Users', title: 'Multi-Channel Nurture', desc: 'Ran email and LinkedIn as complementary channels, reinforcing each other on the same contacts.' },
      { iconName: 'Workflow', title: 'Grant Funnel', desc: 'Built a tracker for grant opportunities by deadline, rolling, and closed status for structured visibility.' },
      { iconName: 'Zap', title: 'KOL Relationship', desc: 'Used targeted rapport building with key opinion leaders to build long-term institutional authority.' }
    ],
    results: [
      { label: 'Prospects Built', from: '0', to: '5,600+', lift: '+∞' },
      { label: 'One-Time Revenue', from: '$0', to: '$64k', lift: '+∞' },
      { label: 'Monthly Recurring', from: '$0', to: '$30k', lift: '+∞' },
      { label: 'Partners Secured', from: '0', to: '13', lift: '+∞' }
    ],
    mandalaPct: 100,
    mandalaLabel: 'new funding system<br>built from zero',
    mandalaTitle: 'Sustainable Growth',
    mandalaSub: 'A dual-sided engine for individual and institutional funding.',
    mandalaDesc: 'This covered both sides of funding growth: individual donor acquisition through multi-channel nurture, and institutional funding through a structured pipeline.',
    testimonial: {
      quote: "No paid media was used anywhere in this process; every dollar came from organic outreach and building a repeatable system.",
      author: "Development Lead, Global Health Org"
    }
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "FuelMails transformed our email strategy. The analytics are a game-changer, and our engagement has skyrocketed.",
    name: 'Sarah Johnson',
    title: 'CMO, TechSolutions Inc.',
    avatarUrl: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: 2,
    quote: "The template designer is so intuitive and powerful. We're creating beautiful, on-brand emails in minutes.",
    name: 'David Chen',
    title: 'Founder, The Design Hub',
    avatarUrl: 'https://picsum.photos/100/100?random=2',
  },
  {
    id: 3,
    quote: "Working with FuelMails felt like adding a high-octane growth team to our company overnight. Highly recommended.",
    name: 'Mark Thompson',
    title: 'Director of Growth, E-com Scale',
    avatarUrl: 'https://picsum.photos/100/100?random=3',
  },
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What kind of results can I expect from email marketing?',
    answer: "Email marketing consistently drives 25 to 40 percent of total revenue for ecommerce brands when done right.",
  },
  {
    id: 'faq-2',
    question: 'Do you only do email marketing?',
    answer: "No. We offer comprehensive Growth Marketing as a companion service to help you scale through sales development and experimentation.",
  },
  {
    id: 'faq-3',
    question: 'What is the difference between your email service and your growth marketing service?',
    answer: "Email marketing is a specific channel for retention. Growth marketing is a broader system that encompasses lead gen and full-funnel optimization.",
  },
  {
    id: 'faq-4',
    question: 'How long does it take to see results?',
    answer: "Most clients see a significant lift in revenue and engagement within the first 30-60 days of implementing our tailored retention systems.",
  },
  {
    id: 'faq-5',
    question: 'Do I need to sign a long-term contract?',
    answer: "We focus on building long-term growth partnerships, but we offer flexible engagement models that align with your business goals and specific scaling needs.",
  },
];

export const blogPosts: BlogPost[] = [
   {
    id: 1,
    slug: 'what-growth-marketing-actually-means',
    title: 'What Growth Marketing Actually Means (And Why Most Businesses Get It Wrong)',
    metaTitle: 'What Growth Marketing Actually Means | FuelMails',
    metaDescription: 'Understand the true definition of growth marketing and avoid common pitfalls.',
    imageUrl: placeholders.blog[0].url,
    excerpt: 'Growth marketing is the practice of using data and experimentation to improve every stage a customer moves through.',
    author: 'FuelMails',
    date: 'August 5, 2025',
    content: Blog1Content,
  },
  {
    id: 2,
    slug: 'the-growth-loop-acquisition-without-retention',
    title: 'The Growth Loop: Why Acquisition Without Retention Is a Leaky Bucket',
    metaTitle: 'The Growth Loop: Retention vs. Acquisition | FuelMails',
    metaDescription: 'Learn why retention is the non-negotiable key to sustainable growth.',
    imageUrl: placeholders.blog[1].url,
    excerpt: 'Customer acquisition cost has been rising across nearly every paid channel for years.',
    author: 'FuelMails',
    date: 'August 12, 2025',
    content: Blog2Content,
  },
  {
    id: 3,
    slug: 'how-to-run-growth-experiments-that-actually-move-revenue',
    title: 'How to Run Growth Experiments That Actually Move Revenue (Not Just Vanity Metrics)',
    metaTitle: 'How to Run Growth Experiments | FuelMails',
    metaDescription: 'A guide to running experiments that impact your bottom line, not just vanity metrics.',
    imageUrl: placeholders.blog[2].url,
    excerpt: 'Most teams describe what they do as testing, but very little of it qualifies as an actual experiment.',
    author: 'FuelMails',
    date: 'August 19, 2025',
    content: Blog3Content,
  },
  {
    id: 4,
    slug: 'why-email-marketing-still-outperforms-social-media-in-2025',
    title: 'Why Email Marketing Still Outperforms Social Media in 2025',
    metaTitle: 'Email Marketing vs. Social Media: 2025 Data-Backed Stats | FuelMails',
    metaDescription: 'Discover why email marketing delivers a higher ROI than social media in 2025.',
    imageUrl: placeholders.blog[3].url,
    excerpt: 'A single email can generate more revenue than hundreds of social media posts.',
    author: 'FuelMails',
    date: 'July 5, 2025',
    content: Blog4Content,
  },
  {
    id: 5,
    slug: 'why-email-marketing-is-essential-for-your-brand',
    title: 'Why Email Marketing is Essential for Your Brand',
    metaTitle: 'Why Email Marketing is Essential for Your Brand | FuelMails',
    metaDescription: 'Learn why email marketing is a must-have for any growing brand.',
    imageUrl: placeholders.blog[4].url,
    excerpt: 'Email marketing is one of the most reliable drivers of growth for modern businesses.',
    author: 'FuelMails',
    date: 'July 12, 2025',
    content: Blog5Content,
  },
  {
    id: 6,
    slug: 'what-to-expect-when-hiring-an-email-marketing-agency',
    title: 'What To Expect When Hiring An Email Marketing Agency',
    metaTitle: 'Hiring an Email Marketing Agency: What to Expect | FuelMails',
    metaDescription: 'Understand the process and results when partnering with an email agency.',
    imageUrl: placeholders.blog[5].url,
    excerpt: 'Hiring an email marketing agency is one of the smartest moves for a growing business.',
    author: 'FuelMails',
    date: 'July 20, 2025',
    content: Blog6Content,
  },
];
