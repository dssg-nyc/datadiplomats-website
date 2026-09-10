import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Reveal, SectionMarker, SplitText } from './primitives';
import { CONTACT_EMAIL } from '../data/site';

const FOCUS_OPTIONS = [
  'Grant writing and funder reporting',
  'Program data and impact dashboards',
  'Donor outreach and stewardship',
  'Intake, case notes, and operations',
  'Staff training and an AI policy',
  'Honestly, not sure yet',
];

const BUDGET_OPTIONS = [
  'Under $500K',
  '$500K – $2M',
  '$2M – $10M',
  'Over $10M',
  'Prefer not to say',
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const bookingHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Booking a call — nonprofit AI membership',
)}&body=${encodeURIComponent(
  'Organization:\nYour role:\nWhat is eating your staff time:\nBest times to talk:\n',
)}`;

export const Join: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    focus: FOCUS_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState<'address' | 'message' | null>(null);

  const update = (key: keyof typeof form) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const subject = `Membership interest — ${form.organization || form.name}`;

  const message = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Organization: ${form.organization}`,
    `Role: ${form.role || '—'}`,
    `Where we need help first: ${form.focus}`,
    `Annual operating budget: ${form.budget}`,
    '',
    'Notes:',
    form.note || '—',
  ].join('\n');

  // The site is static, so sign-up hands off to email. Rather than firing a
  // mailto the instant someone submits, confirm first and let them choose
  // between their mail app and copying the details.
  const signupHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message)}`;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const copy = async (kind: 'address' | 'message') => {
    try {
      await navigator.clipboard.writeText(
        kind === 'address'
          ? CONTACT_EMAIL
          : `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${message}`,
      );
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2400);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section id="join" className="surface-navy relative overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-orange/20 blur-[120px]"
      />

      <div className="shell section-y relative">
        <SectionMarker index="06 — Join" label="Membership 2026" invert />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SplitText
              as="h2"
              text="Put your email in. We will do the rest."
              className="heading max-w-[16ch] text-white"
              stagger={0.04}
            />

            <Reveal delay={0.2}>
              <p className="lede mt-8 max-w-md text-white/75">
                Tell us who you are and where the week goes. You will hear back from
                a person — with a plain-language read on which pillar to start with
                and what it would take.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-12">
              <span className="eyebrow text-white/55">Or book a time directly</span>
              <a
                href={bookingHref}
                className="mt-4 block font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-[1.1] text-white transition-colors duration-300 hover:text-orange"
              >
                {CONTACT_EMAIL}
              </a>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a href={bookingHref} className="btn btn-white">
                  Book a 30-minute call
                </a>
                <button
                  type="button"
                  onClick={() => copy('address')}
                  className="btn btn-outline-invert"
                >
                  {copied === 'address' ? 'Copied' : 'Copy address'}
                </button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                  className="rounded-[var(--radius-xl)] border border-white/20 bg-white/5 p-8 sm:p-12"
                >
                  <span className="eyebrow text-orange">One step left</span>
                  <h3 className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[1.1] text-white">
                    Thanks, {form.name.split(' ')[0] || 'friend'}. Your note is ready
                    to send.
                  </h3>
                  <p className="meta mt-5 max-w-lg text-white/70">
                    We keep the sign-up as plain email so nothing about{' '}
                    {form.organization || 'your organization'} sits in a third-party
                    form. Open it in your mail app, or copy the message and send it
                    from wherever you read email.
                  </p>

                  <pre className="mt-7 max-h-52 overflow-auto whitespace-pre-wrap rounded-[var(--radius-md)] bg-navy-deep/40 p-5 text-[0.75rem] leading-relaxed text-white/70">
                    {`To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${message}`}
                  </pre>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    <a href={signupHref} className="btn btn-orange">
                      Open in my email app
                    </a>
                    <button
                      type="button"
                      onClick={() => copy('message')}
                      className="btn btn-outline-invert"
                    >
                      {copied === 'message' ? 'Copied' : 'Copy the message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="btn btn-outline-invert"
                    >
                      Edit details
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -14% 0px' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: EASE_OUT }}
                  className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
                >
                  <label className="block">
                    <span className="field-label field-label-invert">Your name</span>
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      placeholder="Maya Okonkwo"
                      value={form.name}
                      onChange={update('name')}
                      className="field field-invert"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label field-label-invert">Work email</span>
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      placeholder="maya@yourorg.org"
                      value={form.email}
                      onChange={update('email')}
                      className="field field-invert"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label field-label-invert">Organization</span>
                    <input
                      required
                      type="text"
                      autoComplete="organization"
                      placeholder="Community Food Advocates"
                      value={form.organization}
                      onChange={update('organization')}
                      className="field field-invert"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label field-label-invert">Your role</span>
                    <input
                      type="text"
                      placeholder="Development Director"
                      value={form.role}
                      onChange={update('role')}
                      className="field field-invert"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label field-label-invert">
                      Where you need help first
                    </span>
                    <select
                      value={form.focus}
                      onChange={update('focus')}
                      className="field field-invert"
                    >
                      {FOCUS_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="field-label field-label-invert">
                      Annual operating budget
                    </span>
                    <select
                      value={form.budget}
                      onChange={update('budget')}
                      className="field field-invert"
                    >
                      {BUDGET_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="field-label field-label-invert">
                      Anything you want us to know
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Two staff spend a week every quarter pulling numbers for our funders."
                      value={form.note}
                      onChange={update('note')}
                      className="field field-invert resize-none"
                    />
                  </label>

                  <div className="sm:col-span-2">
                    <button type="submit" className="btn btn-orange w-full sm:w-auto">
                      Send my details
                    </button>
                    <p className="eyebrow mt-5 text-white/55">
                      Goes straight to {CONTACT_EMAIL}. No newsletter blast, no sales
                      sequence — one reply from a human.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
