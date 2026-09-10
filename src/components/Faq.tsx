import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal, SplitText } from './primitives';
import { FAQS } from '../data/site';

export const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bone">
      <div className="shell section-y">
        <Reveal className="flex items-baseline justify-between gap-6 pb-14 sm:pb-20">
          <span className="numeral">05 — Before you ask</span>
          <span className="eyebrow">Straight answers</span>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SplitText
              as="h2"
              text="The questions every ED asks us."
              className="heading max-w-[14ch] lg:sticky lg:top-32"
              stagger={0.045}
            />
          </div>

          <dl className="lg:col-span-8">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={faq.question} delay={i * 0.05}>
                  <div className="border-t border-cola/12 last:border-b last:border-cola/12">
                    <dt>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-start justify-between gap-8 py-7 text-left"
                      >
                        <span className="subheading max-w-[32ch] transition-colors duration-300 hover:text-tomato">
                          {faq.question}
                        </span>
                        <span
                          aria-hidden
                          className="relative mt-3 h-3 w-3 shrink-0"
                        >
                          <span className="absolute top-1/2 left-0 h-px w-3 bg-cola/60" />
                          <span
                            className={`absolute top-1/2 left-0 h-px w-3 bg-cola/60 transition-transform duration-400 ${
                              isOpen ? 'rotate-0' : 'rotate-90'
                            }`}
                          />
                        </span>
                      </button>
                    </dt>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.dd
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mono-label max-w-2xl pb-8 text-cola/60">
                            {faq.answer}
                          </p>
                        </motion.dd>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};
