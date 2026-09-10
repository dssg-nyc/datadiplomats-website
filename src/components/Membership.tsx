import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Reveal, SplitText } from './primitives';
import { BENEFITS, CONTACT_EMAIL } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Membership: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <section id="membership" className="relative bg-bone">
      <div className="shell section-y">
        <Reveal className="flex items-baseline justify-between gap-6 pb-14 sm:pb-20">
          <span className="numeral">03 — What membership gives you</span>
          <span className="eyebrow">Four pillars</span>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Sticky index: tracks whichever pillar is on screen. */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SplitText
                as="h2"
                text="Training, people, data, tools."
                className="heading max-w-[12ch]"
                stagger={0.05}
              />
              <Reveal delay={0.18}>
                <p className="lede mt-8 max-w-sm">
                  One membership, four things your organization cannot buy
                  separately at a price that makes sense.
                </p>
              </Reveal>

              <nav className="mt-12 hidden lg:block">
                {BENEFITS.map((benefit, i) => (
                  <div
                    key={benefit.index}
                    className="flex items-center gap-4 border-t border-cola/12 py-4 last:border-b last:border-cola/12"
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500 ${
                        active === i ? 'bg-tomato' : 'bg-cola/20'
                      }`}
                    />
                    <span className="numeral">{benefit.index}</span>
                    <span
                      className={`mono-label transition-colors duration-500 ${
                        active === i ? 'text-cola' : 'text-cola/40'
                      }`}
                    >
                      {benefit.title}
                    </span>
                  </div>
                ))}
              </nav>

              <Reveal delay={0.24}>
                <button type="button" onClick={onJoin} className="btn btn-solid mt-10">
                  Join the membership
                </button>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-8">
            {BENEFITS.map((benefit, i) => (
              <motion.article
                key={benefit.index}
                onViewportEnter={() => setActive(i)}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -14% 0px' }}
                transition={{ duration: 0.85, ease: EASE_OUT }}
                style={{ backgroundColor: benefit.surface }}
                className="rounded-lg p-7 sm:p-10 lg:p-12"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="numeral text-cola/50">{benefit.index}</span>
                  <span className="eyebrow text-right text-cola/55">
                    {benefit.kicker}
                  </span>
                </div>

                <h3 className="mt-8 text-[clamp(1.75rem,3.4vw,3rem)] leading-[0.98] tracking-[-0.03em]">
                  {benefit.title}
                </h3>

                <p className="lede mt-5 max-w-2xl text-cola/75">{benefit.summary}</p>

                <ul className="mt-9">
                  {benefit.points.map((point, j) => (
                    <motion.li
                      key={point}
                      initial={reduced ? { opacity: 0 } : { opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                      transition={{
                        duration: 0.6,
                        delay: 0.08 * j,
                        ease: EASE_OUT,
                      }}
                      className="flex items-start gap-4 border-t border-cola/15 py-4 last:border-b last:border-cola/15"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.55em] h-px w-4 shrink-0 bg-tomato"
                      />
                      <span className="mono-label text-cola/80">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            ))}

            <Reveal className="mt-4">
              <p className="mono-label text-cola/55">
                Not sure which pillar you need first? Say so in an email to{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    'Which pillar should we start with?',
                  )}`}
                  className="link-draw text-tomato"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                and we will tell you honestly.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
