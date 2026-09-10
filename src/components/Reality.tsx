import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal, SectionMarker, SplitText } from './primitives';
import { PAIN_POINTS } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Reality: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const reduced = useReducedMotion();

  return (
    <section id="reality" className="relative bg-white">
      <div className="shell section-y">
        <SectionMarker index="02 — The week you actually have" label="Sound familiar" />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SplitText
                as="h2"
                text="None of this is a technology problem yet."
                className="heading max-w-[16ch] text-navy"
                stagger={0.04}
              />
              <Reveal delay={0.2}>
                <p className="lede mt-8 max-w-md">
                  We have sat in these meetings. Before anyone says the word model,
                  here is what is actually in the way — and every one of these is
                  something membership is built to absorb.
                </p>
                <button
                  type="button"
                  onClick={onJoin}
                  className="btn btn-outline mt-10"
                >
                  See what membership covers
                </button>
              </Reveal>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {PAIN_POINTS.map((point) => (
              <motion.li
                key={point.index}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="group border-t border-slate-200 py-7 last:border-b last:border-slate-200"
              >
                <div className="flex gap-5 sm:gap-8">
                  <span className="numeral mt-2 shrink-0">{point.index}</span>
                  <div>
                    <p className="subheading text-navy transition-colors duration-300 group-hover:text-orange">
                      “{point.quote}”
                    </p>
                    <p className="meta mt-3 max-w-xl">{point.detail}</p>
                  </div>
                </div>
              </motion.li>
            ))}
            <li className="sr-only">
              {PAIN_POINTS.length} recurring constraints named by nonprofit staff.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
