'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ChevronRight, Layout, Zap, Clock, BarChart3, Target, Users, Workflow, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import type { CaseStudy } from '@/lib/types';

// Icon mapping to handle serialization boundary between server and client components
const IconMap = {
  Layout,
  Zap,
  Clock,
  BarChart3,
  Target,
  Users,
  Workflow,
};

// --- Sub-components for Animations ---

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay } 
        },
      }}
    >
      {children}
    </motion.div>
  );
};

const Gauge = ({ pct, max, label, fromValue, delay = 0 }: { pct: number; max: number; label: string; fromValue: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const circumference = 52 * 2 * Math.PI;
  const offset = circumference - (Math.min(pct / max, 1) * circumference);

  useEffect(() => {
    if (inView) {
      const end = pct;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(end * eased);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, pct]);

  return (
    <div ref={ref} className="gauge-card">
      <div className="gauge-wrap">
        <svg viewBox="0 0 120 120">
          <circle className="gauge-track" cx="60" cy="60" r="52"></circle>
          <motion.circle
            className="gauge-fill"
            cx="60"
            cy="60"
            r="52"
            stroke="url(#g1)"
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.6, ease: [0.16, 0.84, 0.32, 1], delay }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="gauge-center">
          <div className="gauge-num">
            {pct % 1 !== 0 ? count.toFixed(1) : Math.round(count)}
            {label.includes('Rate') || label.includes('Lift') || label.includes('Recurring') ? '%' : ''}
            {label.includes('MRR') || label.includes('Revenue') ? '$' : ''}
          </div>
        </div>
      </div>
      <div className="gauge-label">{label}</div>
      <div className="gauge-before">baseline <span>{fromValue}</span></div>
    </div>
  );
};

const Mandala = ({ pct, label }: { pct: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const circumference = 80 * 2 * Math.PI;
  const offset = circumference - (pct / 100 * circumference);

  useEffect(() => {
    if (inView) {
      const end = pct;
      const duration = 1800;
      const startTime = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(end * eased);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, pct]);

  return (
    <div ref={ref} className="mandala-wrap">
      <svg viewBox="0 0 180 180">
        <circle className="mandala-ring" cx="90" cy="90" r="86" stroke="rgba(108,124,240,0.2)"></circle>
        <circle className="mandala-ring" cx="90" cy="90" r="70" stroke="rgba(108,124,240,0.2)"></circle>
        <motion.circle
          className="mandala-fill"
          cx="90"
          cy="90"
          r="80"
          stroke="url(#g1)"
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.8, ease: [0.16, 0.84, 0.32, 1] }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="mandala-center">
        <div className="mandala-num">{Math.round(count)}%</div>
        <div className="mandala-sub" dangerouslySetInnerHTML={{ __html: label }} />
      </div>
    </div>
  );
};

export function CaseStudyUI({ study }: { study: CaseStudy }) {
  return (
    <div className="cs-body">
      <style jsx global>{`
        :root {
          --bg: #08080d;
          --bg-soft: #0f0f14;
          --surface: #14141a;
          --surface-2: #1a1a21;
          --line: rgba(255, 255, 255, 0.08);
          --text: #f8fafc;
          --text-dim: #94a3b8;
          --text-faint: #475569;
          --accent: #6c7cf0;
          --accent-glow: rgba(108, 124, 240, 0.5);
          --accent-dim: rgba(108, 124, 240, 0.15);
        }

        .cs-body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        .display, h1, h2, h3, h4 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .eyebrow::before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent-glow);
        }

        .hero {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 140px 0 60px;
          position: relative;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.25;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--accent), transparent 70%);
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, #a5b4fc, transparent 70%);
          bottom: -150px;
          left: -150px;
        }

        .grad {
          background: linear-gradient(135deg, #f8fafc, var(--accent));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
          text-shadow: 0 0 30px rgba(108, 124, 240, 0.4);
        }

        .meta-item .k {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 6px;
        }

        .section {
          padding: 100px 0;
          position: relative;
        }

        .rule {
          border-top: 1px solid var(--line);
        }

        .gauge-card {
          background: var(--bg-soft);
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 32px 24px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gauge-card:hover {
          border-color: var(--accent);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -20px rgba(108, 124, 240, 0.2);
        }

        .gauge-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          margin-bottom: 20px;
        }

        .gauge-wrap svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .gauge-track {
          fill: none;
          stroke: var(--line);
          stroke-width: 9;
        }

        .gauge-fill {
          fill: none;
          stroke-width: 9;
          stroke-linecap: round;
        }

        .gauge-center {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .gauge-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 26px;
          font-weight: 800;
        }

        .gauge-label {
          font-size: 13px;
          color: var(--text-dim);
          font-weight: 500;
          margin-top: 6px;
        }

        .gauge-before {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--text-faint);
          margin-top: 12px;
        }

        .gauge-before span {
          color: var(--text-dim);
        }

        .strategy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--line);
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
        }

        @media (min-width: 700px) {
          .strategy-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .strategy-card {
          background: var(--bg-soft);
          padding: 40px 36px;
          transition: background 0.3s ease;
        }

        .strategy-card:hover {
          background: var(--surface);
        }

        .strategy-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent-dim);
          border: 1px solid rgba(108, 124, 240, 0.2);
          margin-bottom: 22px;
          color: var(--accent);
        }

        .result-card {
          background: var(--bg-soft);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 28px 24px;
          transition: all 0.3s ease;
        }

        .result-card:hover {
          border-color: var(--accent);
        }

        .result-to {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 800;
          color: var(--accent);
          text-shadow: 0 0 20px rgba(108, 124, 240, 0.3);
        }

        .mandala-wrap {
          position: relative;
          width: 300px;
          height: 300px;
          margin: 0 auto;
        }

        .mandala-wrap svg {
          width: 100%;
          height: 100%;
        }

        .mandala-ring {
          fill: none;
          stroke-width: 1.5;
        }

        .mandala-fill {
          fill: none;
          stroke-width: 16;
          stroke-linecap: round;
          transform-origin: center;
          transform: rotate(-90deg);
        }

        .mandala-center {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .mandala-num {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 56px;
          font-weight: 800;
          color: var(--text);
          text-shadow: 0 0 30px var(--accent-glow);
        }

        .takeaway {
          position: relative;
          border-radius: 32px;
          border: 1px solid var(--line);
          background: linear-gradient(135deg, var(--surface), var(--bg-soft));
          padding: 80px 56px;
          overflow: hidden;
          text-align: center;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 40px;
          border-radius: 100px;
          font-weight: 800;
          font-size: 16px;
          color: #fff;
          background: var(--accent);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 30px -10px rgba(108, 124, 240, 0.5);
        }

        .cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 20px 50px -15px rgba(108, 124, 240, 0.7);
        }
      `}</style>

      {/* FONTS INJECT */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* HEADER */}
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            animate={{ x: [0, 40], y: [0, -30], scale: [1, 1.1] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            className="blob blob-1" 
          />
          <motion.div 
            animate={{ x: [0, -30], y: [0, 40], scale: [1, 1.05] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 2 }}
            className="blob blob-2" 
          />
        </div>
        <div className="wrap relative z-10">
          <Reveal><div className="eyebrow">Client Case Study · Retention Systems</div></Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-[16px] my-[32px] text-[16px] text-[var(--text-dim)] font-medium">
              <span>{study.clientName}</span>
              <span className="w-px h-4 bg-[var(--line)]"></span>
              <span>{study.subtitle}</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-[clamp(40px,6.8vw,80px)] leading-[1.02] mb-[30px] max-w-[920px]">
              {study.title.includes(study.lift) ? (
                <>
                   {study.title.split(study.lift)[0]}<span className="grad">{study.lift}</span>{study.title.split(study.lift)[1]}
                </>
              ) : (
                study.title
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-[19px] text-[var(--text-dim)] max-w-[620px] mb-[48px] font-medium leading-relaxed">
              {study.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-[40px] pt-[40px] border-t border-[var(--line)]">
              <div className="meta-item">
                <div className="k">Industry</div>
                <div className="v text-[16px] font-bold">{study.industry}</div>
              </div>
              <div className="meta-item">
                <div className="k">Timeline</div>
                <div className="v text-[16px] font-bold">{study.timeline}</div>
              </div>
              <div className="meta-item">
                <div className="k">Stack</div>
                <div className="v text-[16px] font-bold">{study.stack}</div>
              </div>
              <div className="meta-item">
                <div className="k">Impact Lift</div>
                <div className="v text-[16px] font-bold text-[var(--accent)]">{study.lift}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OVERVIEW / CHALLENGE */}
      <section className="section rule">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[80px]">
            <Reveal>
              <div className="col">
                <h3 className="mono text-[14px] uppercase tracking-[0.1em] text-[var(--accent)] font-bold mb-[18px]">Client Overview</h3>
                <p className="text-[var(--text-dim)] text-[17px] font-medium leading-relaxed">{study.overview}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="col">
                <h3 className="mono text-[14px] uppercase tracking-[0.1em] text-[var(--accent)] font-bold mb-[18px]">The Challenge</h3>
                <p className="text-[var(--text-dim)] text-[17px] font-medium leading-relaxed">{study.challenge}</p>
                <div className="flex gap-[12px] flex-wrap mt-[24px]">
                  {study.challengeStats.map((stat, i) => (
                    <div key={i} className="mono text-[12px] px-4 py-[8px] border border-[var(--line)] rounded-full text-[var(--text-dim)] font-bold">
                      {stat.label} <b className="text-[var(--accent)]">{stat.value}</b>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* GAUGES */}
      <section className="section rule">
        <div className="wrap">
          <Reveal>
            <div className="mb-[64px] max-w-[700px]">
              <div className="eyebrow">The Performance Delta</div>
              <h2 className="text-[clamp(32px,4vw,48px)] mt-4 leading-[1.1]">Infrastructure rebuild results in explosive growth.</h2>
              <p className="text-[var(--text-dim)] text-[18px] mt-6 font-medium">We optimized every core metric by focusing on high-intent behaviors and system-driven execution.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {study.gauges.map((gauge, i) => (
              <Gauge key={i} pct={gauge.pct} max={gauge.max} label={gauge.label} fromValue={gauge.fromValue} delay={0.1 * i} />
            ))}
          </div>

          <svg width="0" height="0">
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a5b4fc"></stop>
                <stop offset="100%" stopColor="#6c7cf0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="section rule">
        <div className="wrap">
          <Reveal>
            <div className="mb-[64px] max-w-[700px]">
              <div className="eyebrow">Strategy & Execution</div>
              <h2 className="text-[clamp(32px,4vw,48px)] mt-4 leading-[1.1]">Engineered for long-term momentum.</h2>
              <p className="text-[var(--text-dim)] text-[18px] mt-6 font-medium">A systematic approach to building a growth machine that works 24/7 without manual intervention.</p>
            </div>
          </Reveal>

          <div className="strategy-grid">
            {study.strategies.map((strat, i) => {
              const Icon = IconMap[strat.iconName as keyof typeof IconMap] || HelpCircle;
              return (
                <div key={i} className="strategy-card">
                  <div className="strategy-icon"><Icon className="w-6 h-6" /></div>
                  <h4 className="text-xl">{strat.title}</h4>
                  <p className="text-[15px] font-medium leading-relaxed text-muted-foreground mt-2">{strat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS GRID */}
      <section className="section rule">
        <div className="wrap">
          <Reveal>
            <div className="mb-[64px] max-w-[700px]">
              <div className="eyebrow">The Outcome</div>
              <h2 className="text-[clamp(32px,4vw,48px)] mt-4 leading-[1.1]">Consistent revenue momentum.</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-[20px]">
            {study.results.map((res, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="result-card">
                  <div className="mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-faint)] mb-4 font-bold">{res.label}</div>
                  <div className="flex items-baseline gap-[12px]">
                    <span className="mono text-[16px] text-[var(--text-faint)] line-through">{res.from}</span>
                    <span className="text-[var(--accent)] font-bold">→</span>
                    <span className="result-to">{res.to}</span>
                  </div>
                  <div className="mt-[16px] text-[13px] text-[var(--text-dim)] font-bold">
                    <b className="text-[#818cf8]">{res.lift}</b> Lift
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVENUE MANDALA */}
      <section className="section rule">
        <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center">
          <Mandala pct={study.mandalaPct} label={study.mandalaLabel} />
          <Reveal delay={0.1}>
            <div className="revenue-copy">
              <h3 className="mono text-[14px] uppercase tracking-[0.1em] text-[var(--accent)] mb-[18px] font-bold">{study.mandalaTitle}</h3>
              <h2 className="text-[clamp(28px,3.5vw,36px)] mb-6 leading-tight">{study.mandalaSub}</h2>
              <p className="text-[var(--text-dim)] text-[17px] font-medium leading-relaxed">{study.mandalaDesc}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TAKEAWAY */}
      <section className="section rule">
        <div className="wrap">
          <Reveal>
            <div className="takeaway">
              <span className="text-6xl text-[var(--accent)] opacity-20 font-serif leading-none block mb-4">“</span>
              <p className="quote text-[clamp(22px,3vw,32px)] font-bold leading-[1.3] text-white italic">
                {study.testimonial.quote.includes(study.lift) ? (
                  <>
                    {study.testimonial.quote.split(study.lift)[0]}<span className="grad">{study.lift}</span>{study.testimonial.quote.split(study.lift)[1]}
                  </>
                ) : (
                  study.testimonial.quote
                )}
              </p>
              <p className="text-[var(--text-dim)] mt-8 font-bold text-sm uppercase tracking-widest">— {study.testimonial.author}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-24 sm:py-32" id="cta">
        <div className="wrap text-center">
          <Reveal><div className="eyebrow justify-center">Start Your Success Story</div></Reveal>
          <Reveal delay={0.1}><h2 className="text-[clamp(32px,5vw,56px)] max-w-[800px] mx-auto mt-6 mb-8 uppercase leading-[1.1]">Ready to Fuel Your <span className="grad">Momentum?</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-[var(--text-dim)] text-[18px] mb-12 max-w-2xl mx-auto font-medium">Let's audit your current program and identify exactly where you're leaving revenue on the table.</p></Reveal>
          <Reveal delay={0.3}>
            <Link href="/#schedule" className="cta-btn group">
              Book Your Free Audit <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      
    </div>
  );
}
