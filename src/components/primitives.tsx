import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Fade-and-rise on first entry into the viewport. The default 18% margin means
 * a section has already committed to being on screen before it animates, which
 * keeps fast scrolling from firing every reveal at once.
 */
export const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'p';
}> = ({ children, delay = 0, y = 22, className = '', as = 'div' }) => {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -18% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
};

/**
 * Headline reveal: each word rides up from behind its own mask, staggered.
 */
export const SplitText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  accent?: string;
}> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  as: Tag = 'h2',
  accent,
}) => {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const accentWords = accent ? accent.split(' ') : [];
  const accentStart = accent ? words.length - accentWords.length : -1;

  if (reduced) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={accentStart >= 0 && i >= accentStart ? 'text-tomato' : undefined}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <motion.span
            className={`inline-block ${
              accentStart >= 0 && i >= accentStart ? 'text-tomato' : ''
            }`}
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{
              duration: 0.95,
              delay: delay + i * stagger,
              ease: EASE_OUT,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
};

/** Counts up to `value` the first time it scrolls into view. */
export const Counter: React.FC<{
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}> = ({ value, suffix = '', prefix = '', duration = 1.6, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  // Wait until the numeral is properly on screen, otherwise the count finishes
  // while it is still sliding up from the fold and reads as a static number.
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const reduced = useReducedMotion();
  // Counting from zero to a single digit is noise, not motion.
  const animatable = value >= 10;
  const [display, setDisplay] = useState(reduced || !animatable ? value : 0);

  useEffect(() => {
    if (!inView || reduced || !animatable) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // Ease-out cubic so the number decelerates into its final value.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, animatable, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

/** Infinite horizontal ticker. The track is duplicated so the loop is seamless. */
export const Marquee: React.FC<{
  items: string[];
  duration?: number;
  separator?: string;
  className?: string;
}> = ({ items, duration = 42, separator = '/', className = '' }) => {
  const group = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="eyebrow !text-[0.8125rem]">{item}</span>
          <span
            aria-hidden
            className="mx-6 font-mono text-[0.8125rem] text-tomato/70 sm:mx-9"
          >
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div
        className="marquee-track flex w-max"
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {group}
        {group}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bone to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bone to-transparent" />
    </div>
  );
};

/** Section chrome: hairline, index numeral, eyebrow. */
export const SectionMarker: React.FC<{ index: string; label: string }> = ({
  index,
  label,
}) => (
  <Reveal className="flex items-baseline justify-between gap-6 pb-10 sm:pb-14">
    <span className="numeral">{index}</span>
    <span className="eyebrow text-right">{label}</span>
  </Reveal>
);

/** Thin scroll-progress rule pinned to the top of the viewport. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-60 h-px origin-left bg-tomato"
      style={{ scaleX }}
      aria-hidden
    />
  );
};

/** Slow parallax drift for decorative layers. */
export function useParallax(
  target: React.RefObject<HTMLElement | null>,
  distance = 80,
): MotionValue<number> {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start end', 'end start'],
  });
  const still = useMotionValue(0);
  const drift = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return reduced ? still : drift;
}
