import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Counter, Reveal, SplitText } from './primitives';
import { GAP_STAT } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const Bar: React.FC<{ percent: number; tone: 'muted' | 'accent' }> = ({
  percent,
  tone,
}) => {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-px w-full bg-bone/20">
      <motion.div
        className={`absolute inset-y-0 left-0 origin-left ${
          tone === 'accent' ? 'bg-tomato' : 'bg-bone/70'
        }`}
        style={{ width: `${percent}%` }}
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 1.5, ease: EASE_OUT }}
      />
    </div>
  );
};

const Stat: React.FC<{
  value: number;
  label: string;
  note: string;
  tone: 'muted' | 'accent';
  delay?: number;
}> = ({ value, label, note, tone, delay = 0 }) => (
  <div className="flex flex-col gap-6">
    <Reveal delay={delay}>
      <div
        className={`flex items-start leading-none tracking-[-0.04em] ${
          tone === 'accent' ? 'text-tomato' : 'text-bone'
        }`}
      >
        <span className="text-[clamp(5rem,17vw,14rem)] leading-[0.8]">
          <Counter value={value} duration={1.9} />
        </span>
        <span className="mt-[0.35em] font-mono text-[clamp(1.25rem,2.4vw,2rem)] tracking-normal">
          %
        </span>
      </div>
    </Reveal>

    <Bar percent={value} tone={tone} />

    <Reveal delay={delay + 0.1} className="max-w-md">
      <p
        className={`subheading ${tone === 'accent' ? 'text-bone' : 'text-bone/80'}`}
      >
        {label}
      </p>
      <p className="mono-label mt-4 text-bone/45">{note}</p>
    </Reveal>
  </div>
);

export const Gap: React.FC = () => (
  <section id="gap" className="relative bg-ink text-bone">
    <div className="shell section-y">
      <Reveal className="flex items-baseline justify-between gap-6 pb-14 sm:pb-20">
        <span className="numeral text-bone/40">01 — Where the sector is</span>
        <span className="eyebrow text-bone/40">{GAP_STAT.eyebrow}</span>
      </Reveal>

      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <Stat
          value={GAP_STAT.adoption}
          label={GAP_STAT.adoptionLabel}
          note={GAP_STAT.adoptionNote}
          tone="muted"
        />
        <Stat
          value={GAP_STAT.value}
          label={GAP_STAT.valueLabel}
          note={GAP_STAT.valueNote}
          tone="accent"
          delay={0.12}
        />
      </div>

      <div className="mt-24 border-t border-bone/15 pt-14 sm:mt-32">
        <SplitText
          as="h2"
          text={GAP_STAT.closing}
          className="heading max-w-[26ch] text-bone"
          stagger={0.028}
        />
      </div>
    </div>
  </section>
);
