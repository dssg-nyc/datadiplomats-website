import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal, SplitText } from './primitives';
import { PAIN_POINTS } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Reality: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const reduced = useReducedMotion();

  return (
    <section id="reality" className="relative bg-bone">
      <div className="shell section-y">
        <Reveal className="flex items-baseline justify-between gap-6 pb-14 sm:pb-20">
          <span className="numeral">02 — The week you actually have</span>
          <span className="eyebrow">Sound familiar</span>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SplitText
                as="h2"
                text="None of this is a technology problem yet."
                className="heading max-w-[16ch]"
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
                  className="btn btn-ghost mt-10"
                >
                  See what membership covers
                </button>
              </Reveal>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {PAIN_POINTS.map((point, i) => (
              <motion.li
                key={point.index}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="group border-t border-cola/12 py-7 last:border-b last:border-cola/12"
              >
                <div className="flex gap-5 sm:gap-8">
                  <span className="numeral mt-1.5 shrink-0">{point.index}</span>
                  <div>
                    <p className="subheading text-cola transition-colors duration-300 group-hover:text-tomato">
                      “{point.quote}”
                    </p>
                    <p className="mono-label mt-3.5 max-w-xl text-cola/55">
                      {point.detail}
                    </p>
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
