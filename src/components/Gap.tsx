import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Counter, Reveal, SectionMarker, SplitText } from './primitives';
import { GAP_STAT } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const Bar: React.FC<{ percent: number; tone: 'muted' | 'accent' }> = ({
  percent,
  tone,
}) => {
  const reduced = useReducedMotion();

  return (
    <div className="relative h-1.5 w-full rounded-full bg-white/12">
      <motion.div
        className="absolute inset-y-0 left-0 origin-left rounded-full"
        style={{
          width: `${percent}%`,
          backgroundImage:
            tone === 'accent' ? 'var(--gradient-secondary)' : undefined,
          backgroundColor: tone === 'accent' ? undefined : 'rgba(255,255,255,0.75)',
        }}
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
        className={`font-display flex items-baseline leading-none ${
          tone === 'accent' ? 'text-orange' : 'text-white'
        }`}
      >
        <span className="text-[clamp(5rem,16vw,13rem)] leading-[0.82] tracking-[-0.02em]">
          <Counter value={value} duration={1.9} />
        </span>
        <span className="ml-1 text-[clamp(1.5rem,3vw,2.75rem)]">%</span>
      </div>
    </Reveal>

    <Bar percent={value} tone={tone} />

    <Reveal delay={delay + 0.1} className="max-w-md">
      <p className={`subheading ${tone === 'accent' ? 'text-white' : 'text-white/85'}`}>
        {label}
      </p>
      <p className="meta mt-4 text-white/55">{note}</p>
    </Reveal>
  </div>
);

export const Gap: React.FC = () => (
  <section id="gap" className="surface-navy relative">
    <div className="shell section-y">
      <SectionMarker index="01 — Where the sector is" label={GAP_STAT.eyebrow} invert />

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

      <div className="mt-24 border-t border-white/20 pt-14 sm:mt-32">
        <SplitText
          as="h2"
          text={GAP_STAT.closing}
          className="heading max-w-[26ch] text-white"
          stagger={0.028}
        />
      </div>
    </div>
  </section>
);
