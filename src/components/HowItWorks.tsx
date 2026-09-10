import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Reveal, SectionMarker, SplitText } from './primitives';
import { HOW_IT_WORKS, PRINCIPLES } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const HowItWorks: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%'],
  });
  // The rule draws itself across the three steps as the section passes through.
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how" className="bg-white">
      <div className="shell section-y">
        <SectionMarker
          index="04 — Getting started"
          label="Three steps, no discovery invoice"
        />

        <SplitText
          as="h2"
          text="From a first email to a working capability."
          className="heading max-w-[20ch] text-navy"
          stagger={0.035}
        />

        <div ref={ref} className="mt-16 sm:mt-24">
          <div className="relative h-1 w-full rounded-full bg-slate-100">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full"
              style={
                reduced
                  ? { scaleX: 1, backgroundImage: 'var(--gradient-secondary)' }
                  : { scaleX, backgroundImage: 'var(--gradient-secondary)' }
              }
              aria-hidden
            />
          </div>

          <ol className="grid gap-12 pt-10 sm:grid-cols-3 sm:gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.li
                key={step.index}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -18% 0px' }}
                transition={{ duration: 0.75, delay: i * 0.12, ease: EASE_OUT }}
                className="sm:pr-6"
              >
                <span className="numeral">{step.index}</span>
                <h3 className="mt-6 font-display text-[clamp(1.375rem,2vw,1.75rem)] leading-[1.12] text-navy">
                  {step.title}
                </h3>
                <p className="meta mt-4">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-24 border-t border-slate-200 pt-14 sm:mt-32">
          <Reveal>
            <span className="eyebrow">The standing commitments</span>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.1} className="sm:pr-6">
                <h3 className="subheading max-w-[18ch] text-navy">
                  {principle.title}
                </h3>
                <p className="meta mt-4">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
