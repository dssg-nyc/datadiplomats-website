export const CONTACT_EMAIL = 'dssgnyc@gmail.com';

export const ORG = {
  name: 'Data Diplomats',
  legal: 'Data Diplomats for Social Good',
  city: 'New York City',
  tagline: 'The AI membership for nonprofits.',
};

/** Sector words for the ticker under the hero. */
export const SECTORS = [
  'Food banks',
  'Legal aid',
  'Housing & shelter',
  'Youth development',
  'Immigrant services',
  'Community health',
  'Workforce development',
  'Arts & culture',
  'Environmental justice',
  'Reentry programs',
  'Senior services',
  'Family foundations',
];

/**
 * The framing statistic for the whole page: adoption is near-universal,
 * measurable results are not.
 */
export const GAP_STAT = {
  eyebrow: 'The adoption gap',
  adoption: 90,
  adoptionLabel: 'of nonprofit teams already use AI somewhere in their work',
  adoptionNote:
    'Usually a free chatbot, opened in a personal browser tab, with no policy behind it.',
  value: 10,
  valueLabel: 'can point to what it changed on the bottom line',
  valueNote:
    'No hours given back, no dollars raised, nothing a program officer would accept as evidence.',
  closing:
    'Adoption was never the hard part. Turning it into hours, dollars, and outcomes your funders recognize is.',
};

export type PainPoint = {
  index: string;
  quote: string;
  detail: string;
};

/** Written in the language a development director or ED actually uses. */
export const PAIN_POINTS: PainPoint[] = [
  {
    index: '01',
    quote: 'Everyone here is doing three jobs.',
    detail:
      'Your program manager is also the data person, the Salesforce admin, and the one who formats the board deck at 11pm.',
  },
  {
    index: '02',
    quote: 'There is no line item for this.',
    detail:
      'Restricted grants fund program delivery, not infrastructure. Ask for technology and you are asking a funder to raise your overhead ratio.',
  },
  {
    index: '03',
    quote: 'Staff are already pasting client notes into a chatbot.',
    detail:
      'Shadow AI is here whether you have a policy or not, and the confidential intake details going into it are the ones you promised to protect.',
  },
  {
    index: '04',
    quote: 'We rewrite the same narrative eleven times a year.',
    detail:
      'Every LOI, renewal, and quarterly report asks for the same story in a different word count, on a different portal, with a different logic model.',
  },
  {
    index: '05',
    quote: 'Our data lives in four places and agrees in none.',
    detail:
      'Paper intake forms, an Excel tracker, a CRM nobody was trained on, and the attendance sheets in a program director’s inbox.',
  },
  {
    index: '06',
    quote: 'Funders want outcomes, and we have anecdotes.',
    detail:
      'The site visit is in six weeks and pulling a clean number for served, retained, and referred takes two staff a full week.',
  },
  {
    index: '07',
    quote: 'We are stuck in pilot purgatory.',
    detail:
      'A drawer full of donated licenses, three abandoned pilots, and a vendor demo that was really a sales call in a webinar costume.',
  },
  {
    index: '08',
    quote: 'The consultants quoted us corporate rates.',
    detail:
      'Two hundred and fifty an hour, a discovery phase, and a slide deck handed off to a team with no one to implement it.',
  },
  {
    index: '09',
    quote: 'When someone leaves, the knowledge leaves.',
    detail:
      'Turnover and burnout mean the only person who knew how the reporting workbook worked is now at another org.',
  },
  {
    index: '10',
    quote: 'The board asked about our AI strategy.',
    detail:
      'One trustee read an article, another is worried about risk, and nobody on staff has the standing to answer either of them.',
  },
  {
    index: '11',
    quote: 'Donor communications are always the thing that slips.',
    detail:
      'Acknowledgements go out late, segmentation never happens, and lapsed donors quietly stay lapsed.',
  },
  {
    index: '12',
    quote: 'We do not have an IT department.',
    detail:
      'You have one person who is good with computers and never signed up to be the accidental sysadmin.',
  },
];

export type Benefit = {
  index: string;
  kicker: string;
  title: string;
  summary: string;
  points: string[];
  surface: string;
};

/** The four pillars of membership. */
export const BENEFITS: Benefit[] = [
  {
    index: '01',
    kicker: 'Build the skill in-house',
    title: 'Hands-on AI workshops',
    summary:
      'We run hands-on Claude Code and agentic AI bootcamps that build your team’s automation skills — with member discounts and completion certificates included.',
    points: [
      'Working sessions, not webinars: your staff leave with something running',
      'Claude Code and agentic workflow bootcamps for non-engineers',
      'Member pricing on every cohort, plus seats for volunteers and interns',
      'Completion certificates your staff can put in front of a funder or a hiring manager',
    ],
    surface: 'var(--color-tea)',
  },
  {
    index: '02',
    kicker: 'Borrow the capacity you cannot hire',
    title: 'Access our volunteer network',
    summary:
      'Tap a network of roughly 500 vetted IT, AI, and data professionals for pro bono consulting, dedicated office hours, and hands-on project support.',
    points: [
      '~500 vetted technologists across IT, AI, data engineering, and analytics',
      'Pro bono consulting scoped to your actual bottleneck, not a discovery phase',
      'Standing office hours for the questions too small to justify a contract',
      'Hands-on project support that ships, then hands over documentation',
    ],
    surface: 'var(--color-pale)',
  },
  {
    index: '03',
    kicker: 'Make your data fundable',
    title: 'The Impact Unit',
    summary:
      'Our Impact Unit turns your program data into grant-ready dashboards and compelling donor stories, backed by dedicated analytics support.',
    points: [
      'Grant-ready dashboards built to survive a site visit and a board meeting',
      'Donor stories grounded in your own numbers, not adjectives',
      'Dedicated analytics support that knows what a logic model is',
      'Reporting you can reuse across every funder instead of rebuilding each cycle',
    ],
    surface: 'var(--color-lilac)',
  },
  {
    index: '04',
    kicker: 'Stop paying per seat',
    title: 'Free access to our AI tool suite',
    summary:
      'Free, privacy-focused access to our in-house AI tools, built to streamline grant writing, donor outreach, and day-to-day nonprofit operations.',
    points: [
      'Grant writing support trained on the shape of real applications',
      'Donor outreach and stewardship drafting that sounds like your organization',
      'Everyday operations help: intake, meeting notes, program documentation',
      'Privacy-first by default — client data is not training data, ever',
    ],
    surface: 'color-mix(in srgb, var(--color-slate-blue) 22%, var(--color-bone))',
  },
];

export type GlanceStat = {
  value: number;
  label: string;
  note: string;
  prefix?: string;
  suffix?: string;
};

export const AT_A_GLANCE: GlanceStat[] = [
  { value: 500, suffix: '+', label: 'Vetted volunteer technologists', note: 'IT, AI, data, analytics' },
  { value: 4, suffix: '', label: 'Pillars in every membership', note: 'Training, people, data, tools' },
  { value: 0, prefix: '$', label: 'Cost for the AI tool suite', note: 'Included with membership' },
  { value: 1, suffix: ':1', label: 'Office hours with a practitioner', note: 'Standing, not one-off' },
];

export const HOW_IT_WORKS = [
  {
    index: '01',
    title: 'Tell us where the week goes',
    body: 'A short call about the work that eats your staff time — reporting, intake, grant narratives, donor follow-up. No discovery phase, no invoice.',
  },
  {
    index: '02',
    title: 'We match you to the membership',
    body: 'You leave with a plain-language plan: which workshop cohort, which volunteers, what the Impact Unit would build first, which tools to turn on.',
  },
  {
    index: '03',
    title: 'Your team builds, we stay',
    body: 'Staff train, volunteers ship alongside them, dashboards go live, and office hours keep running after launch so the capability stays with you.',
  },
];

export const PRINCIPLES = [
  {
    title: 'Client data is not training data',
    body: 'Beneficiary names, case notes, immigration status, and health details never become training material. Privacy-first is the default, not an upgrade tier.',
  },
  {
    title: 'Capacity, not dependency',
    body: 'We are not a vendor you rent forever. Every engagement ends with your staff able to run, change, and explain the thing that was built.',
  },
  {
    title: 'Humans keep the judgment',
    body: 'AI drafts, summarizes, and surfaces. Decisions about a person’s housing, benefits, or care stay with the people accountable for them.',
  },
];

export const FAQS = [
  {
    question: 'What does membership actually cost?',
    answer:
      'Membership is priced on a sliding scale against your operating budget, and the AI tool suite is included at no cost. Workshops carry member discounts. Small, community-based organizations are the point of this — tell us your budget and we will tell you the tier.',
  },
  {
    question: 'We have no technical staff. Is this still for us?',
    answer:
      'That is the common case. The workshops are built for program and development staff rather than engineers, and the volunteer network exists precisely so that you do not have to hire an AI team to get an AI capability.',
  },
  {
    question: 'How do you protect the data of the people we serve?',
    answer:
      'Our tools run privacy-first: no training on your data, minimum necessary collection, and identifying details stripped before anything reaches a model. We will also help you write the staff AI policy you probably do not have yet.',
  },
  {
    question: 'How is this different from a consultant or a donated software license?',
    answer:
      'A consultant hands off a deck. A donated license hands off a login. Membership hands off a trained team, people who will sit with them, dashboards funders accept, and tools that cost you nothing to keep using.',
  },
  {
    question: 'How fast can we start?',
    answer:
      'Office hours and the tool suite open as soon as you join. Workshop cohorts run on a rolling basis, and the Impact Unit typically has a first dashboard in front of your board within one reporting cycle.',
  },
];
