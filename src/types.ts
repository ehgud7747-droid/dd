export type NavView = 'dashboard' | 'competency-diagnosis' | 'project-timeline' | 'ai-report' | 'settings';

export interface UserProfile {
  id: string;
  name: string;
  operatorId: string;
  role: string;
  readinessPercentage: number;
  targetCompany: string;
  targetRole: string;
  overallGpa: number;
  totalCredits: number;
  majorGpa: number;
}

export interface TimelineItem {
  id: string;
  title: string;
  category: 'license' | 'project' | 'academic' | 'exam';
  status: 'completed' | 'in_progress' | 'scheduled' | 'passed';
  date: string;
  description: string;
  tags?: string[];
  progressPercentage?: number;
  badgeText?: string;
}

export interface CompetencyScore {
  id: string;
  title: string;
  weight: number; // percentage, e.g., 30
  rating: number; // 1 - 5
  description: string;
  keywords: string;
  metric?: string;
  iconName: string;
}

export interface Artifact {
  id: string;
  code: string;
  title: string;
  fileName: string;
  fileType: 'dwg' | 'stp' | 'pdf' | 'cert';
  verified: boolean;
  matchCompetency: string;
  date: string;
}

export interface STARReportDraft {
  situation: string;
  task: string;
  action: string;
  result: string;
  meta: {
    readiness: string;
    tokensUsed: number;
    model: string;
    tone: string;
  };
}

export interface SWOTAnalysis {
  strengths: string;
  weaknesses: string;
  opportunities: string;
  threats: string;
  actionableInsight: string;
}
