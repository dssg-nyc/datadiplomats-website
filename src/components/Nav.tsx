import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { Logo } from './Logo';
import { CONTACT_EMAIL } from '../data/site';

const LINKS = [
  { id: 'gap', label: 'The gap' },
  { id: 'reality', label: 'Your week' },
  { id: 'membership', label: 'Membership' },
  { id: 'how', label: 'How it works' },
  { id: 'join', label: 'Join' },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Nav: React.FC = () => {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(current > 24);
    // Give the page back to the reader on the way down, return the nav on the way up.
    setHidden(current > 560 && current > previous && !menuOpen);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            condensed
              ? 'border-b border-slate-200 bg-white/90 shadow-brand-sm backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <div className="shell flex items-center justify-between py-4">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer"
              aria-label="Back to top"
            >
              <Logo />
            </button>

            <nav className="hidden items-center gap-8 lg:flex">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className="eyebrow link-draw cursor-pointer transition-colors hover:text-navy"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  'Booking a call — nonprofit AI membership',
                )}`}
                className="btn btn-outline hidden sm:inline-flex"
              >
                Book a call
              </a>
              <button
                type="button"
                onClick={() => scrollTo('join')}
                className="btn btn-orange"
              >
                Join
              </button>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="ml-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-md)] border border-slate-200 lg:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <span className="flex flex-col gap-[5px]">
                  <span
                    className={`block h-px w-4 bg-navy transition-transform duration-300 ${
                      menuOpen ? 'translate-y-[3px] rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`block h-px w-4 bg-navy transition-transform duration-300 ${
                      menuOpen ? '-translate-y-[3px] -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[70px] z-40 border-b border-slate-200 bg-white/97 shadow-brand-md backdrop-blur-xl lg:hidden"
          >
            <nav className="shell flex flex-col py-4">
              {LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    scrollTo(link.id);
                  }}
                  className="subheading cursor-pointer border-b border-slate-100 py-4 text-left last:border-b-0"
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                  'Booking a call — nonprofit AI membership',
                )}`}
                className="btn btn-outline mt-5"
              >
                Book a call · {CONTACT_EMAIL}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
