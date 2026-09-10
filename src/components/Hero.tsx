import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Marquee, SplitText } from './primitives';
import { CONTACT_EMAIL, SECTORS } from '../data/site';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // The hero recedes as the first section arrives, rather than simply scrolling off.
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden pt-24"
    >
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: blobY }}
        className="pointer-events-none absolute -right-32 -top-24 h-[42rem] w-[42rem] rounded-full bg-tea/70 blur-[90px]"
      />
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: blobY }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-lilac/60 blur-[100px]"
      />

      <motion.div
        style={reduced ? undefined : { opacity, y: lift }}
        className="shell relative flex grow flex-col pb-10"
      >
        {/* Meta row sits high on the page; the headline anchors to the fold. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-tomato" />
            <span className="eyebrow">501(c)(3) · New York City</span>
          </span>
          <span className="eyebrow leading-relaxed sm:text-right">
            Membership open for the 2026 cohort
            <br />
            <span className="text-tomato">90% use AI. 10% see the value.</span>
          </span>
        </motion.div>

        <h1 className="display mt-auto max-w-[22ch] pt-16">
          <SplitText
            as="span"
            text="The AI membership"
            className="block"
            delay={0.1}
            stagger={0.055}
          />
          <SplitText
            as="span"
            text="for nonprofits."
            className="block text-cola/45"
            delay={0.26}
            stagger={0.055}
          />
        </h1>

        <div className="mt-12 grid gap-10 border-t border-cola/12 pt-10 lg:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
            className="lede lg:col-span-6 lg:col-start-1"
          >
            Ninety percent of nonprofit teams already use AI. Ten percent can show
            what it changed. We close that gap with hands-on workshops, roughly 500
            vetted technologists, an Impact Unit that makes your data fundable, and
            free privacy-first tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE_OUT }}
            className="flex flex-col items-start gap-4 lg:col-span-5 lg:col-start-8 lg:items-end"
          >
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={onJoin} className="btn btn-solid">
                Join the membership
              </button>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  'Booking a call — nonprofit AI membership',
                )}&body=${encodeURIComponent(
                  'Organization:\nWhat is eating our staff time:\nBest times to talk:\n',
                )}`}
                className="btn btn-ghost"
              >
                Book a call
              </a>
            </div>
            <span className="eyebrow">
              Or write to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="link-draw text-tomato">
                {CONTACT_EMAIL}
              </a>
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="relative border-y border-cola/12 py-4"
      >
        <Marquee items={SECTORS} duration={54} />
      </motion.div>
    </section>
  );
};
