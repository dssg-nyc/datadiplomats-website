import { ApproachStep, EthicalPillar, TeamMember } from '../types';

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'Mission & Bottleneck Diagnosis',
    subtitle: 'Identifying high-leverage opportunities, not AI for AI’s sake.',
    description: 'We embed with your non-profit leadership and frontline teams to map your operational friction points. We evaluate where frontier reasoning models can achieve 5x–10x leverage on your core mission—whether in intake processing, legal synthesis, food distribution, or donor intelligence.',
    deliverables: [
      'Operational Bottleneck & Friction Audit',
      'AI Feasibility & Return-on-Mission Matrix',
      'Data Readiness & Legacy System Architecture Review',
      'Phase 1 Technical & Ethical Scoping Document'
    ],
    timeframe: 'Weeks 1 – 2',
    iconName: 'Compass'
  },
  {
    number: '02',
    title: 'Custom System Architecture & Ethical Guardrails',
    subtitle: 'Bespoke engineering with zero beneficiary data exposure.',
    description: 'We architect production-grade systems tailored to your specific workflows, APIs, and field constraints. Every system is built on our Zero-Data-Retention substrate with strict air-gapped PII scrubbing, domain-specific retrieval indexes, and human-in-the-loop oversight.',
    deliverables: [
      'Air-gapped PII Scrubbing & Gateway Layer',
      'Domain Knowledge Embeddings & Vector Vault',
      'Custom Agentic Workflows & Multi-Modal Pipelines',
      'Deterministic Citation & Verification Harness'
    ],
    timeframe: 'Weeks 3 – 6',
    iconName: 'Cpu'
  },
  {
    number: '03',
    title: 'Field Validation & Human-in-the-Loop Red Teaming',
    subtitle: 'Rigorous testing against real-world civic complexity.',
    description: 'Before full deployment, we test systems side-by-side with your frontline caseworkers, attorneys, or coordinators. We stress-test for demographic bias, dialect comprehension, edge cases, and ensure staff confidence through intuitive interfaces.',
    deliverables: [
      'Frontline Staff Shadowing & Usability Sessions',
      'Demographic & Algorithmic Bias Red-Team Report',
      'Accuracy & Factual Grounding Benchmark (>99% Target)',
      'Emergency Fallback & Human Override Protocols'
    ],
    timeframe: 'Weeks 7 – 9',
    iconName: 'ShieldCheck'
  },
  {
    number: '04',
    title: 'Production Deployment & Capacity Handover',
    subtitle: 'Building institutional capability, not vendor dependency.',
    description: 'We launch into production with telemetry dashboards, automated cost controls (to protect non-profit budgets), and comprehensive training for your in-house teams so you own and operate the technology forever.',
    deliverables: [
      'Production Deployment with High-Availability SLAs',
      'Cost Guardrails & Token Budget Optimizers',
      'Comprehensive Staff Training & Knowledge Base',
      'Ongoing Pro Bono Technical Advisory & Model Updates'
    ],
    timeframe: 'Weeks 10 – 12',
    iconName: 'Rocket'
  }
];

export const ETHICAL_PILLARS: EthicalPillar[] = [
  {
    title: 'Beneficiary Data Sovereignty',
    principle: 'Zero training on vulnerable community data.',
    implementation: 'We mandate zero-data retention APIs. Beneficiary names, medical notes, immigration statuses, and financial records never enter model training corpuses or multi-tenant clouds.',
    badge: 'Zero-Retention Architecture'
  },
  {
    title: 'Human-in-the-Loop by Design',
    principle: 'AI augments human empathy, never replaces human judgment.',
    implementation: 'In high-stakes decisions (such as legal aid, housing eligibility, emergency cash grants, or medical triage), AI provides synthesized evidence and recommendations, but humans retain final authority.',
    badge: 'Human Oversight Protocol'
  },
  {
    title: 'Algorithmic Equity & Cultural Humility',
    principle: 'Pre-deployment red-teaming for demographic equity.',
    implementation: 'All models are evaluated for dialect bias, multilingual nuance, and historical disparities before going live. We reject systems that reinforce socioeconomic biases.',
    badge: 'Equitable Evaluation'
  },
  {
    title: 'Subsidized & Open-Source Commons',
    principle: 'Democratizing frontier technology for social good.',
    implementation: 'We provide heavily subsidized and pro bono engineering services, while open-sourcing non-proprietary civic connectors, data cleaners, and benchmarks for the non-profit sector.',
    badge: 'Civic Commons'
  }
];

export const TRUST_STATS = [
  { value: '500,000+', label: 'Vulnerable Lives Impacted', change: 'Across NYC & Global NGOs' },
  { value: '78%', label: 'Average Administrative Time Cut', change: 'Redirected to frontline care' },
  { value: '100%', label: 'Zero-Data-Retention Compliance', change: 'Beneficiary privacy guarantee' },
  { value: '$18.5M+', label: 'Nonprofit Value & Funding Unlocked', change: 'In direct grants & cost savings' }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. Julian Vance',
    role: 'Co-Founder & Executive Director',
    bio: 'Former Applied AI Lead at frontier research labs and civic technologist. Passionate about bringing world-class AI engineering to frontline charities.',
    formerOrg: 'Ex-Frontier AI Lab & NYC DSSG',
    focusArea: 'Enterprise AI Strategy & Governance'
  },
  {
    name: 'Soraya Al-Mansoor',
    role: 'Chief Technology Officer',
    bio: 'Distributed systems architect with 12+ years building low-latency, privacy-preserving infrastructure for humanitarian logistics and global aid.',
    formerOrg: 'Ex-Google Cloud & UN OCHA Tech',
    focusArea: 'Grounded RAG & Privacy Gateways'
  },
  {
    name: 'Marcus Sterling, JD',
    role: 'Head of Civic Impact & Ethics',
    bio: 'Former civil rights attorney and data justice fellow. Specializes in algorithmic auditing, legal aid tech, and tenant protection workflows.',
    formerOrg: 'NYC Legal Aid Society & Columbia Law',
    focusArea: 'Algorithmic Fairness & Legal Systems'
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Applied Solutions',
    bio: 'Product engineer specializing in LLM evaluation, multimodal computer vision for disaster relief, and human-in-the-loop caseworker interfaces.',
    formerOrg: 'Ex-Anthropic Applied & Data.org',
    focusArea: 'Multimodal Vision & Caseworker Tools'
  }
];

export const FAQS = [
  {
    question: 'How is Data Diplomats different from standard tech consultants or SaaS vendors?',
    answer: 'Standard software vendors sell rigid, generic subscriptions that don’t fit non-profit budgets or messy civic realities. Generic consultants lack deep frontier AI engineering capabilities. Data Diplomats is modeled directly after elite enterprise AI firms like Ode: we deploy seasoned frontier AI engineers to build custom, production-grade intelligence engines designed specifically for the ethical, legal, and operational constraints of 501(c)(3) organizations.'
  },
  {
    question: 'How do you ensure beneficiary data is safe and not used to train AI models?',
    answer: 'We enforce enterprise zero-data-retention agreements with frontier foundation model providers. All incoming documents pass through our local, air-gapped PII redaction layer that strips names, addresses, SSNs, and identifiable markers before inference. No non-profit data is ever stored on third-party servers or used for model training.'
  },
  {
    question: 'What is the typical cost structure for non-profit organizations?',
    answer: 'As a 501(c)(3) organization backed by philanthropic partners and civic tech grants, our services are delivered on a subsidized, sliding-scale, or fully pro bono basis depending on organizational budget size and community impact potential.'
  },
  {
    question: 'How long does a typical implementation take?',
    answer: 'Our average engagement takes 8 to 12 weeks from initial bottleneck audit to full production deployment, complete with staff training and automated governance telemetry.'
  }
];
