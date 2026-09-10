import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Reveal, SplitText } from './primitives';
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
    <section id="how" className="bg-bone">
      <div className="shell section-y">
        <Reveal className="flex items-baseline justify-between gap-6 pb-14 sm:pb-20">
          <span className="numeral">04 — Getting started</span>
          <span className="eyebrow">Three steps, no discovery invoice</span>
        </Reveal>

        <SplitText
          as="h2"
          text="From a first email to a working capability."
          className="heading max-w-[20ch]"
          stagger={0.035}
        />

        <div ref={ref} className="mt-16 sm:mt-24">
          <div className="relative h-px w-full bg-cola/12">
            <motion.div
              className="absolute inset-y-0 left-0 w-full origin-left bg-tomato"
              style={reduced ? { scaleX: 1 } : { scaleX }}
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
                <h3 className="mt-6 text-[clamp(1.375rem,2.1vw,1.875rem)] leading-[1.05] tracking-[-0.025em]">
                  {step.title}
                </h3>
                <p className="mono-label mt-4 text-cola/60">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-24 border-t border-cola/12 pt-14 sm:mt-32">
          <Reveal>
            <span className="eyebrow">The standing commitments</span>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.1} className="sm:pr-6">
                <h3 className="subheading max-w-[18ch]">{principle.title}</h3>
                <p className="mono-label mt-4 text-cola/60">{principle.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
