export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  tagline: string;
  category: 'Food Security' | 'Legal Aid' | 'Emergency Aid' | 'Fundraising' | 'Public Health' | 'Environmental Justice';
  impactSummary: string;
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  ethicalSafeguards: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
    organization: string;
  };
  architectureSteps: {
    title: string;
    description: string;
    badge: string;
  }[];
}

export interface ApproachStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeframe: string;
  iconName: string;
}

export interface EthicalPillar {
  title: string;
  principle: string;
  implementation: string;
  badge: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  formerOrg: string;
  focusArea: string;
}

export interface SectorBlueprint {
  sector: string;
  icon: string;
  defaultPainPoint: string;
  painPoints: {
    id: string;
    title: string;
    typicalBottleneck: string;
    suggestedModel: string;
    estimatedTimeSaved: string;
    architectureType: string;
    components: string[];
    privacyTier: string;
    implementationWeeks: number;
    impactMetric: string;
  }[];
}
