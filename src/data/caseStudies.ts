import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'food-rescue-logistics',
    title: 'NYC Surplus Food Rescue & Cold-Chain Dispatch Agent',
    client: 'Metro Hunger Relief Coalition (NYC)',
    tagline: 'Transforming perishable food surplus intake into zero-latency route optimization for 180+ soup kitchens.',
    category: 'Food Security',
    impactSummary: 'Eliminated 84% of dispatch coordination lag and recovered 310,000 extra meals per month.',
    metrics: [
      { label: 'Dispatch Latency', value: '-84%', sublabel: 'From 4.5 hrs to 42 mins' },
      { label: 'Monthly Surplus Saved', value: '+310k', sublabel: 'Meals recovered' },
      { label: 'Cold-Chain Spoilage', value: '0.4%', sublabel: 'Down from 11.2%' },
      { label: 'Volunteer Route Efficiency', value: '+42%', sublabel: 'Mileage optimized' }
    ],
    challenge: '1.4 million pounds of fresh produce, dairy, and prepared meals were discarded weekly due to unpredictable donor schedules, fluctuating truck capacity, and manual telephone dispatch workflows across the five boroughs.',
    solution: 'Engineered an autonomous multi-modal dispatch system powered by frontier vision parsing (for grocery manifest photos) and real-time linear optimization agents that match perishable loads with nearest cold-storage pantries within 15 minutes of donor logging.',
    results: [
      'Automated intake parsing from grocery receipts, pallet photos, and donor emails with 99.1% accuracy',
      'Dynamic re-routing for 35 refrigerated vans avoiding NYC traffic bottlenecks and double-park congestion',
      'Real-time automated SMS confirmations in 6 languages for pantry managers',
      'Saved over $620,000 annually in avoided third-party commercial routing software licenses'
    ],
    techStack: [
      'Claude 3.7 Sonnet Multimodal Vision',
      'Python / FastAPI',
      'NYC OpenData Traffic Feeds',
      'PostgreSQL / PostGIS',
      'Zero-PII Data Gateway'
    ],
    ethicalSafeguards: [
      'No volunteer or beneficiary personal identity data is stored or fed into public training corpuses',
      'Equitable distribution algorithm balances supply to historically underserved census tracts',
      'Human-in-the-loop manual override for any unverified allergen declarations'
    ],
    quote: {
      text: "Data Diplomats didn't give us a generic tech tool; they engineered an intelligence engine built for the messy reality of New York streets. We are feeding thousands more families every week.",
      author: 'Elena Rodriguez',
      role: 'Chief Operating Officer',
      organization: 'Metro Hunger Relief Coalition'
    },
    architectureSteps: [
      {
        title: 'Multimodal Surplus Ingestion',
        description: 'Pantry donors snap photo of surplus pallets or forward invoice; vision models extract item counts, perishability timestamps, and storage needs.',
        badge: 'Step 1: Vision Ingestion'
      },
      {
        title: 'Geospatial Need Matching',
        description: 'Linear optimization solver queries real-time pantry inventory deficits and travel-time matrices.',
        badge: 'Step 2: Constraint Solver'
      },
      {
        title: 'Autonomous Dispatch & Verification',
        description: 'Generates Turn-by-turn routes for drivers and sends bilingual push alerts to receiving kitchen captains.',
        badge: 'Step 3: Dispatch & Confirmation'
      }
    ]
  },
  {
    id: 'housing-justice-assistant',
    title: 'Bilingual Eviction Prevention & Tenant Rights Legal Dossier Synthesizer',
    client: 'New York Legal Aid & Housing Justice Alliance',
    tagline: 'Empowering pro bono legal teams to synthesize 50-page housing court filings in minutes, preserving tenant tenure.',
    category: 'Legal Aid',
    impactSummary: 'Accelerated case defense prep time by 78%, enabling representation for 2,400 additional tenants.',
    metrics: [
      { label: 'Intake Prep Time', value: '-78%', sublabel: 'Down from 3.5 days to 45 mins' },
      { label: 'Additional Tenants Defended', value: '+2,400', sublabel: 'Per annum' },
      { label: 'Citation Accuracy', value: '99.8%', sublabel: 'Verified NYC Housing Code' },
      { label: 'Language Coverage', value: '14', sublabel: 'Dialects & languages supported' }
    ],
    challenge: 'Over 45,000 eviction notices are served annually in NYC courts. Legal aid attorneys were drowning in handwritten lease documents, housing authority correspondence, and rent history logs, limiting each attorney to only a fraction of desperate families needing defense.',
    solution: 'Built a specialized Grounded Retrieval-Augmented Generation (RAG) system with air-gapped OCR. The system indexes NYC Housing Maintenance Codes, rent stabilization records (DHCR), and building violation histories to assemble comprehensive defense briefs and emergency stay petitions.',
    results: [
      'Instant extraction of illegal rent overcharges and unaddressed class-C building violations',
      'Automated translation and draft response generation in Spanish, Mandarin, Cantonese, Bengali, Haitian Creole, and Russian',
      'Cross-checks every legal claim against actual Housing Court precedent with exact paragraph-level pin-cites',
      'Prevented wrongful evictions for 89.4% of assisted tenant households in 2025–2026'
    ],
    techStack: [
      'Frontier Reasoning LLM',
      'Pinecone Vector Embeddings',
      'NYC Housing Court Precedent Archive',
      'Air-gapped OCR Pipeline',
      'Strict PII Redaction Proxy'
    ],
    ethicalSafeguards: [
      'Tenant identifiers, social security numbers, and salary stubs are scrubbed before inference',
      'Strict lawyer-in-the-loop: system drafts petitions as advisory recommendations only; attorney review is mandatory',
      'Model temperature set to 0.0 with deterministic citation verifier preventing hallucinations'
    ],
    quote: {
      text: "In housing court, speed is justice. Data Diplomats leveled the playing field between institutional landlords and vulnerable working families.",
      author: 'Marcus Sterling, Esq.',
      role: 'Managing Director of Housing Advocacy',
      organization: 'NYC Justice Legal Collective'
    },
    architectureSteps: [
      {
        title: 'Secure PII Scrubbing & Multi-Doc OCR',
        description: 'Uploaded leases, rent receipts, and court summonses pass through an air-gapped PII scrubbing layer.',
        badge: 'Step 1: Privacy Defense'
      },
      {
        title: 'NYC DHCR & Code Indexing',
        description: 'System cross-references property registration history with open HPD code violations.',
        badge: 'Step 2: Legal Knowledge Graph'
      },
      {
        title: 'Defense Memorandum Generation',
        description: 'Produces structured court-ready answers with highlighted statutory defenses and counter-claims.',
        badge: 'Step 3: Attorney Briefing'
      }
    ]
  },
  {
    id: 'disaster-humanitarian-dispatch',
    title: 'Multimodal Disaster Damage Assessment & Humanitarian Relief Dispatch',
    client: 'Global Resilience & Disaster Relief Corps',
    tagline: 'Synthesizing satellite radar, drone feeds, and localized social channels into actionable relief deployment maps.',
    category: 'Emergency Aid',
    impactSummary: 'Cut first-responder search-and-rescue response time from 36 hours to under 6 hours.',
    metrics: [
      { label: 'Initial Triage Speed', value: '6x', sublabel: 'Faster response allocation' },
      { label: 'Satellite Synthesis', value: '12 min', sublabel: 'From orbit pass to map' },
      { label: 'False Alarm Reduction', value: '-65%', sublabel: 'Verified distress signals' },
      { label: 'Water / Medical Deployed', value: '450 Tons', sublabel: 'Delivered in first 72h' }
    ],
    challenge: 'When catastrophic hurricanes, floods, or earthquakes strike, field coordinators face fragmented, contradictory emergency calls in dozens of local dialects, while satellite imagery is too dense for manual inspection under critical time pressure.',
    solution: 'Designed an edge-deployable multimodal emergency intelligence grid that fuses satellite synthetic aperture radar (SAR), low-bandwidth SMS distress beacons, and civic incident feeds into a real-time humanitarian situational awareness dashboard.',
    results: [
      'Automated structural damage grading (Destroyed, Major, Minor, Accessible) for 12,000+ buildings within 4 hours of post-storm satellite pass',
      'Multi-dialect voice transcription over low-bandwidth satcom links',
      'Dynamic supply chain allocation for clean water, insulin cold-packs, and portable generator kits'
    ],
    techStack: [
      'Multimodal Geospatial AI',
      'Whisper Low-Bandwidth Audio Models',
      'Copernicus Satellite Imagery API',
      'Offline-First Progressive Web Grid'
    ],
    ethicalSafeguards: [
      'Strict adherence to UN OCHA humanitarian data responsibility protocols',
      'No surveillance or military dual-use: models optimized exclusively for life-safety and emergency aid',
      'Open-source geospatial connectors released to civic disaster response commons'
    ],
    quote: {
      text: "When bridges wash out and phone towers fall, minutes mean lives. Data Diplomats' AI system gave our field teams eyes through the fog of disaster.",
      author: 'Dr. Amina Touré',
      role: 'Director of Rapid Crisis Operations',
      organization: 'Global Resilience Relief'
    },
    architectureSteps: [
      {
        title: 'Geospatial Radar & Optical Fusion',
        description: 'Real-time diffing of pre- and post-disaster satellite imagery identifies blocked arteries and collapsed roofs.',
        badge: 'Step 1: Remote Sensing'
      },
      {
        title: 'Crowdsourced Beacon Triangulation',
        description: 'NLP classifiers parse low-bandwidth SMS and WhatsApp distress calls for medical triage keywords.',
        badge: 'Step 2: Distress Triage'
      },
      {
        title: 'Resource Route Simulation',
        description: 'Calculates navigable relief routes considering flood depths and bridge integrity.',
        badge: 'Step 3: Rescue Dispatch'
      }
    ]
  },
  {
    id: 'grant-impact-copilot',
    title: 'Grounded Institutional Grant & Factual Impact Copilot',
    client: 'Foundation for Climate & Environmental Equity',
    tagline: 'Translating complex field data into high-converting, factually grounded grant proposals in 1/4 the time.',
    category: 'Fundraising',
    impactSummary: 'Unlocked $14.2M in federal and philanthropic grant funding while freeing 70% of staff research time.',
    metrics: [
      { label: 'Funding Secured', value: '$14.2M', sublabel: 'In 2025–2026 cycles' },
      { label: 'RFP Draft Time', value: '-70%', sublabel: 'From 60 hrs to 18 hrs' },
      { label: 'Factual Grounding', value: '100%', sublabel: 'Zero hallucinated metrics' },
      { label: 'Win Rate Increase', value: '+38%', sublabel: 'Higher acceptance score' }
    ],
    challenge: 'Non-profit grant writers spend hundreds of hours manually formatting repetitive 80-page RFPs, matching dense federal rubrics with scattered field surveys, budget spreadsheets, and annual reports.',
    solution: 'Implemented an organizational memory intelligence layer that indexes 10+ years of audited financial statements, past winning proposals, and live field metrics to draft comprehensive, rubric-aligned grant submissions.',
    results: [
      'Generates fully sourced proposal drafts with exact ledger references for every financial figure and programmatic claim',
      'Automated alignment analysis against donor RFP scoring rubrics with gap-filling suggestions',
      'Seamless compliance reporting and quarterly milestone summaries generated with one click'
    ],
    techStack: [
      'Claude 3.7 Sonnet',
      'Semantic Chunking Engine',
      'Financial Ledger Auditor',
      'Secure Local Document Vault'
    ],
    ethicalSafeguards: [
      'Hard constraint: every programmatic statistic must link back to an audited primary data source',
      'No fabrication of beneficiary stories or unauthorized donor quotes',
      'Encrypted client workspace with absolute isolation from multi-tenant cloud storage'
    ],
    quote: {
      text: "As a lean non-profit, we competed against major universities and secured multi-million dollar grants because our proposals were backed by bulletproof data.",
      author: 'David Chen',
      role: 'Executive Director',
      organization: 'Climate & Environmental Equity Fund'
    },
    architectureSteps: [
      {
        title: 'Institutional Memory Vault',
        description: 'Securely ingests 10 years of programmatic reports, budget spreadsheets, and field surveys into a vector vault.',
        badge: 'Step 1: Document Vault'
      },
      {
        title: 'RFP Rubric Parser',
        description: 'Breaks down federal or foundation requirements into 40+ atomic scoring criteria.',
        badge: 'Step 2: Rubric Parsing'
      },
      {
        title: 'Grounded Generation & Fact Checking',
        description: 'Synthesizes prose while enforcing strict cross-referencing against primary financial and impact records.',
        badge: 'Step 3: Verified Drafting'
      }
    ]
  },
  {
    id: 'community-health-outreach',
    title: 'Culturally-Adapted Maternal & Pediatric Preventive Health Outreach Synthesizer',
    client: 'South Bronx Community Health Network',
    tagline: 'Closing maternal health disparities with proactive, empathetic, multilingual outreach agents.',
    category: 'Public Health',
    impactSummary: 'Increased postpartum appointment attendance by 47% and identified 320+ high-risk clinical alerts early.',
    metrics: [
      { label: 'Follow-Up Attendance', value: '+47%', sublabel: 'Postnatal visits kept' },
      { label: 'Early Risk Detection', value: '320+', sublabel: 'Critical interventions' },
      { label: 'Patient Engagement', value: '91%', sublabel: 'Active response rate' },
      { label: 'Language Adaptability', value: '9', sublabel: 'Dialects with cultural nuance' }
    ],
    challenge: 'High rates of maternal complications in under-resourced urban neighborhoods due to missed postpartum checkups, language barriers, and lack of accessible follow-up support between clinic visits.',
    solution: 'Deployed an empathetic, culturally adapted SMS and voice follow-up system that checks in with new mothers, understands colloquial health expressions in Spanish, French, and Garifuna, and escalates potential warning signs directly to nurse coordinators.',
    results: [
      'Zero maternal fatalities among 1,800 monitored high-risk cohort participants',
      'Immediate alert dispatch to clinical triage team whenever symptoms like hypertension or severe mood changes are detected',
      'Over 90% positive patient sentiment ratings for accessibility and dignity'
    ],
    techStack: [
      'Frontier Conversational LLM',
      'HIPAA-Compliant Secure Gateway',
      'Clinical Triage Decision Trees',
      'Telephony & SMS API Integration'
    ],
    ethicalSafeguards: [
      'Full HIPAA and SOC 2 Type II compliance with zero persistent cloud chat logs',
      'Strict clinical guardrails: AI NEVER diagnoses or prescribes; it only triages and connects patients to human doctors',
      'Co-designed with community doulas and mothers to ensure respect, empathy, and cultural humility'
    ],
    quote: {
      text: "This technology gave our clinical team superpower ears. Mothers who felt invisible now have continuous, loving care at their fingertips.",
      author: 'Dr. Nia Williams, MD',
      role: 'Chief Medical Officer',
      organization: 'South Bronx Community Health Network'
    },
    architectureSteps: [
      {
        title: 'Culturally-Attuned Conversational Check-in',
        description: 'Sends timely, warm check-ins tailored to mother’s delivery date and language preference.',
        badge: 'Step 1: Patient Outreach'
      },
      {
        title: 'Clinical Symptom Triage Matrix',
        description: 'Analyzes responses against validated maternal warning sign protocols (e.g. ACOG standards).',
        badge: 'Step 2: Safety Screening'
      },
      {
        title: 'Escalation to On-Duty Nurse',
        description: 'Instantly alerts human medical team with patient history and recommended priority level.',
        badge: 'Step 3: Clinical Dispatch'
      }
    ]
  }
];
