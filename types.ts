export type SubjectStatus = 'improving' | 'declining' | 'stable';

export interface TopicPerformance {
  topic: string;
  score: number; // percentage
  total: number;
}

export interface Assignment {
  id: string;
  title: string;
  date: string;
  score: number;
  total: number;
  type: 'Test' | 'Quiz' | 'Homework';
}

export interface SubjectData {
  id: string;
  name: string;
  currentScore: number;
  classAverage: number;
  trend: number[]; // Last 6 scores for graph
  status: SubjectStatus;
  strengths: string[];
  struggles: string[];
  teacherComment: string;
  aiInsight: string;
  topics: TopicPerformance[];
  recentAssignments: Assignment[];
  predictedScore?: number;
  resources: {
    title: string;
    type: 'Video' | 'Practice' | 'Worksheet';
    link: string;
  }[];
}

export interface Update {
  id: string;
  date: string;
  teacherName: string;
  subject: string;
  message: string;
  score?: string; // e.g. "18/20"
  type: 'academic' | 'general' | 'behavior';
  isRead: boolean;
}

export interface StudentProfile {
  name: string;
  class: string;
  section: string;
  rollNo: string;
}

export type ViewState = 'dashboard' | 'subjects' | 'updates' | 'insights' | 'subject-detail';

export interface LanguageContextType {
  lang: 'en' | 'ml';
  toggleLang: () => void;
  t: (key: string) => string;
}