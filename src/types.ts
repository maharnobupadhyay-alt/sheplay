export type PageId =
  | 'home'
  | 'dashboard'
  | 'explore'
  | 'details'
  | 'history'
  | 'sponsorship'
  | 'beginners';

export type DistanceCategory = '3K' | '5K' | '10K' | '21K' | '42K';

export type ExperienceLevel = 'Beginner-Friendly' | 'Intermediate' | 'Competitive';

export type FeeBracket = 'Free' | 'Under ₹500' | '₹500–₹1500' | 'Above ₹1500';

export interface RaceCategoryOption {
  distance: DistanceCategory;
  label: string;
  startTime: string;
  cutoff: string;
  feeInr: number;
  timingChip: boolean;
  minimumAge: number;
}

export interface PrizeTier {
  category: string;
  first: string;
  second: string;
  third: string;
}

export interface MarathonEvent {
  id: string;
  name: string;
  city: string;
  state: string;
  venue: string;
  dateDisplay: string;
  month: string;
  registrationDeadline: string;
  distances: DistanceCategory[];
  experienceLevels: ExperienceLevel[];
  isBeginnerRecommended: boolean;
  feeBracket: FeeBracket;
  startingFeeLabel: string;
  minFeeInr: number;
  imageUrl: string;
  summary: string;
  courseTerrain: string;
  supportHighlights: string[];
  categories: RaceCategoryOption[];
  prizeMoney: PrizeTier[];
  eligibility: string[];
  requiredDocuments: string[];
  registrationSteps: {
    step: number;
    title: string;
    detail: string;
  }[];
  bibPickupInfo: string;
  expectedParticipants: number;
}

export interface HistoricalEdition {
  id: string;
  eventName: string;
  city: string;
  year: number;
  date: string;
  featuredDistance: string;
  winnerName: string;
  winnerClubOrCity: string;
  winningTime: string;
  runnerUpName: string;
  runnerUpTime: string;
  thirdPlaceName: string;
  thirdPlaceTime: string;
  totalWomenParticipants: number;
  firstTimeFinishersPct: number;
  highlightNote: string;
}

export interface SampleSponsor {
  id: string;
  name: string;
  tier: 'Title Sponsor' | 'Hydration Partner' | 'Apparel Partner';
  sector: string;
  contributionSummary: string;
  supportedEvents: string;
  websiteLabel: string;
}

export interface SponsorshipTierPackage {
  id: string;
  tierName: string;
  targetAudience: string;
  sampleContribution: string;
  runnerReach: string;
  deliverables: string[];
}

export interface BeginnerWeekPlan {
  week: number;
  title: string;
  focus: string;
  sessionsPerWeek: number;
  weeklyGoalKm: string;
  tasks: {
    id: string;
    label: string;
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
