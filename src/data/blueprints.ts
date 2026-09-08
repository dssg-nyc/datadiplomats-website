import { SectorBlueprint } from '../types';

export const SECTOR_BLUEPRINTS: SectorBlueprint[] = [
  {
    sector: 'Food Relief & Basic Needs',
    icon: 'Utensils',
    defaultPainPoint: 'surplus-logistics',
    painPoints: [
      {
        id: 'surplus-logistics',
        title: 'Perishable Food Surplus Ingestion & Dynamic Routing',
        typicalBottleneck: 'Manual dispatch calls, perishable goods spoiling in transit, inefficient van routes.',
        suggestedModel: 'Claude 3.7 Sonnet Multimodal + Mixed-Integer Linear Programming Solver',
        estimatedTimeSaved: '22 hrs / week per coordinator',
        architectureType: 'Vision Intake + Constraint Solver Agent',
        components: [
          'Multimodal Grocery Receipt / Pallet Vision Parser',
          'NYC Traffic & Parking Congestion API Integrator',
          'Dynamic Cold-Storage Inventory Allocator',
          'Bilingual Driver Push Notification SMS Gateway'
        ],
        privacyTier: 'Tier 1: Minimal PII, zero training retention',
        implementationWeeks: 8,
        impactMetric: '+35% fresh food delivered before expiration'
      },
      {
        id: 'pantry-intake',
        title: 'Multilingual Dignified Client Intake & Benefits Matching',
        typicalBottleneck: 'Paper intake forms, long lines in the cold, miscommunication in non-English dialects.',
        suggestedModel: 'Grounded Conversational Agent + Translation Layer',
        estimatedTimeSaved: '15 hrs / week per pantry site',
        architectureType: 'Conversational Intake + SNAP/WIC Eligibility Matcher',
        components: [
          'Voice & WhatsApp Intake in 12 languages',
          'Local Benefits Database Retrieval Engine',
          'Air-gapped PII Encrypted Identity Vault',
          'Appointment Booking & QR Ticket Generator'
        ],
        privacyTier: 'Tier 3: High sensitivity client identity (Air-gapped)',
        implementationWeeks: 6,
        impactMetric: 'Zero waiting lines, 100% language access'
      }
    ]
  },
  {
    sector: 'Legal Aid & Tenant Defense',
    icon: 'Scale',
    defaultPainPoint: 'eviction-defense',
    painPoints: [
      {
        id: 'eviction-defense',
        title: 'Eviction Defense Legal Dossier & Precedent Synthesizer',
        typicalBottleneck: 'Hundreds of pages of leases, DHCR rent histories, and court summonses reviewed manually.',
        suggestedModel: 'Frontier Reasoning Model with Pinpoint Grounded RAG',
        estimatedTimeSaved: '28 hrs / attorney / month',
        architectureType: 'Air-gapped Legal OCR + Housing Court Precedent RAG',
        components: [
          'Court Notice & Lease OCR Engine',
          'NYC Housing Maintenance Code Knowledge Graph',
          'Automated Defective Condition Citation Generator',
          'Bilingual Pro Se Tenant Defense Brief Assembler'
        ],
        privacyTier: 'Tier 3: Strict Attorney-Client Privilege Safeguards',
        implementationWeeks: 10,
        impactMetric: '3.8x more tenants represented with same staff'
      },
      {
        id: 'asylum-support',
        title: 'Humanitarian Immigration Document Triage & Declaration Drafter',
        typicalBottleneck: 'Translating hundreds of foreign identity documents, police reports, and country conditions.',
        suggestedModel: 'Multilingual Document Understanding Engine',
        estimatedTimeSaved: '32 hrs per asylum dossier',
        architectureType: 'Cross-lingual Evidence Synthesizer + Timeline Builder',
        components: [
          'Multi-format Foreign Document Classifier',
          'State Department Country Conditions Index',
          'Chronological Persecution Timeline Generator',
          'Supervising Attorney Quality Checklist'
        ],
        privacyTier: 'Tier 3: Extreme Vulnerability Protections',
        implementationWeeks: 10,
        impactMetric: 'Cut asylum brief drafting lag by 65%'
      }
    ]
  },
  {
    sector: 'Philanthropy & Grant Operations',
    icon: 'HeartHandshake',
    defaultPainPoint: 'grant-proposals',
    painPoints: [
      {
        id: 'grant-proposals',
        title: 'Audited Factual Grant Writer & Donor Rubric Aligning Copilot',
        typicalBottleneck: 'Copying and pasting between old proposals, spreadsheets, and endless customized foundation portals.',
        suggestedModel: 'Frontier LLM with Verified Fact-Grounding Engine',
        estimatedTimeSaved: '40 hrs per federal RFP submission',
        architectureType: 'Organizational Memory Vault + Rubric Deconstruction Engine',
        components: [
          'Audited Impact Data & Financial Vault',
          'Foundation RFP Rubric Breakdown Matrix',
          'Fact-Checking Assertion Verifier with Exact Citations',
          'Multi-Format Export (Grants.gov, Word, PDF)'
        ],
        privacyTier: 'Tier 2: Proprietary Financials & Strategy',
        implementationWeeks: 6,
        impactMetric: '+45% grant submission throughput; zero metric errors'
      },
      {
        id: 'impact-reporting',
        title: 'Automated Real-Time Programmatic Impact Reporting',
        typicalBottleneck: 'Scattered monthly program surveys, Excel files, and last-minute donor report scrambles.',
        suggestedModel: 'Data Synthesis & Narrative Generation Pipeline',
        estimatedTimeSaved: '18 hrs / month per program manager',
        architectureType: 'ETL Pipeline + Narrative Impact Synthesizer',
        components: [
          'Survey & CRM Data Ingestion Connector',
          'Quantitative Metric Aggregator with Anomaly Checks',
          'Human-Centered Qualitative Story Generator',
          'Interactive Donor Dashboard Generator'
        ],
        privacyTier: 'Tier 2: Aggregate Program Telemetry',
        implementationWeeks: 6,
        impactMetric: '100% on-time donor reporting with verified metrics'
      }
    ]
  },
  {
    sector: 'Public Health & Crisis Services',
    icon: 'Activity',
    defaultPainPoint: 'crisis-triage',
    painPoints: [
      {
        id: 'crisis-triage',
        title: 'Emergency Help-Seeker Navigation & Resource Dispatch',
        typicalBottleneck: 'High volume of helpline calls, outdated resource directory, caller fatigue.',
        suggestedModel: 'Empathetic Conversational Agent with Clinical Safety Guardrails',
        estimatedTimeSaved: '8 min per caller intake',
        architectureType: 'Conversational Triage + Live Verified Bed/Clinic Directory',
        components: [
          'Warm Multilingual Voice & Chat Interface',
          'Clinical Escalation Trigger (Immediate Warm Handover)',
          'Real-time Shelter & Clinic Bed Availability Index',
          'Trauma-Informed Response Guardrails'
        ],
        privacyTier: 'Tier 3: HIPAA-Compliant Ephemeral Gateway',
        implementationWeeks: 8,
        impactMetric: '99.9% urgent case escalation rate; 0 lost callers'
      }
    ]
  },
  {
    sector: 'Climate & Environmental Justice',
    icon: 'Leaf',
    defaultPainPoint: 'environmental-screen',
    painPoints: [
      {
        id: 'environmental-screen',
        title: 'Hyperlocal Environmental Burden & Air Quality Synthesizer',
        typicalBottleneck: 'Combining complex EPA sensor feeds, demographic maps, and zoning data for advocacy campaigns.',
        suggestedModel: 'Geospatial Multimodal AI + Environmental Policy Model',
        estimatedTimeSaved: '25 hrs per policy brief',
        architectureType: 'Spatial Data Fusion + Policy Brief Generator',
        components: [
          'EPA Sensor & Satellite Raster Processor',
          'Census Demographic Overlay Engine',
          'Visual Map Generator for City Council Hearings',
          'Community Testimony Summarizer'
        ],
        privacyTier: 'Tier 1: Public Civic Data with Strict Accuracy',
        implementationWeeks: 8,
        impactMetric: 'Evidence-based testimony for 12 local clean air bills'
      }
    ]
  }
];
