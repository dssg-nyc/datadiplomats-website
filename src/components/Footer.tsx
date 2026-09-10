import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { Reveal } from './primitives';
import { CONTACT_EMAIL, ORG } from '../data/site';

const COLUMNS = [
  {
    heading: 'Membership',
    links: [
      { label: 'The gap', id: 'gap' },
      { label: 'Your week', id: 'reality' },
      { label: 'Four pillars', id: 'membership' },
      { label: 'How it works', id: 'how' },
    ],
  },
  {
    heading: 'Getting in',
    links: [
      { label: 'Join', id: 'join' },
      { label: 'Questions', id: 'faq' },
    ],
  },
];

export const Footer: React.FC = () => (
  <footer className="relative overflow-hidden bg-slate-900 text-white">
    <div className="shell py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Logo invert size={34} />
          <p className="meta mt-6 max-w-xs text-white/60">
            {ORG.legal} — a 501(c)(3) putting frontier AI to work inside the
            organizations that hold {ORG.city} together.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-draw mt-6 inline-block text-sm font-medium text-orange"
          >
            {CONTACT_EMAIL}
          </a>
        </Reveal>

        {COLUMNS.map((column, i) => (
          <Reveal key={column.heading} delay={0.08 * (i + 1)} className="lg:col-span-2">
            <nav>
              <span className="eyebrow text-white/50">{column.heading}</span>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(link.id)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }
                      className="link-draw cursor-pointer text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        ))}

        <Reveal delay={0.24} className="lg:col-span-3">
          <span className="eyebrow text-white/50">Say hello</span>
          <p className="meta mt-5 text-white/65">
            Email us with your organization, your role, and the work that eats your
            week. You get a reply from a person.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              'Booking a call — nonprofit AI membership',
            )}`}
            className="btn btn-outline-invert mt-6"
          >
            Book a call
          </a>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="eyebrow text-white/40">
          © {new Date().getFullYear()} {ORG.legal}. All rights reserved.
        </span>
        <span className="eyebrow text-white/40">{ORG.tagline}</span>
      </div>
    </div>

    {/* Oversized wordmark, cropped by the bottom of the page. */}
    <div className="relative h-[9.5vw] overflow-hidden">
      <motion.span
        aria-hidden
        initial={{ y: '22%', opacity: 0 }}
        whileInView={{ y: '-8%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="block w-full select-none whitespace-nowrap text-center font-display text-[13vw] leading-none tracking-[-0.02em] text-white/10"
      >
        Data Diplomats
      </motion.span>
    </div>
  </footer>
);
