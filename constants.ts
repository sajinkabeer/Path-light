import { SubjectData, StudentProfile, Update } from './types';

export const STUDENT_PROFILE: StudentProfile = {
  name: "Arjun",
  class: "9",
  section: "A",
  rollNo: "24"
};

export const SUBJECTS_DATA: SubjectData[] = [
  {
    id: 'math',
    name: 'Mathematics',
    currentScore: 78,
    classAverage: 72,
    trend: [65, 68, 72, 75, 76, 78],
    status: 'improving',
    strengths: ['Algebra (85%)', 'Geometry (82%)'],
    struggles: ['Word Problems (65%)', 'Statistics (68%)'],
    teacherComment: "Arjun is showing consistent improvement. Needs to focus on application-based problems.",
    aiInsight: "Arjun's math performance has improved 15% this month. Continue current study routine.",
    predictedScore: 82,
    topics: [
      { topic: 'Algebra', score: 85, total: 100 },
      { topic: 'Geometry', score: 82, total: 100 },
      { topic: 'Number Systems', score: 75, total: 100 },
      { topic: 'Statistics', score: 68, total: 100 },
      { topic: 'Word Problems', score: 65, total: 100 },
    ],
    recentAssignments: [
      { id: 'm1', title: 'Algebra Unit Test', date: '2023-10-15', score: 18, total: 20, type: 'Test' },
      { id: 'm2', title: 'Geometry Quiz', date: '2023-10-10', score: 8, total: 10, type: 'Quiz' },
      { id: 'm3', title: 'Weekly Homework', date: '2023-10-05', score: 9, total: 10, type: 'Homework' },
    ],
    resources: [
      { title: "Practice fractions: Khan Academy", type: "Practice", link: "#" },
      { title: "Algebra Video Explanation", type: "Video", link: "#" },
      { title: "Word Problems Worksheet", type: "Worksheet", link: "#" }
    ]
  },
  {
    id: 'science',
    name: 'Science',
    currentScore: 68,
    classAverage: 75,
    trend: [75, 72, 70, 68, 67, 68],
    status: 'declining',
    strengths: ['Biology (78%)'],
    struggles: ['Physics (62%)', 'Chemistry (65%)'],
    teacherComment: "Arjun seems distracted lately. Please ensure regular study schedule for Science.",
    aiInsight: "Declining trend detected. Recommend scheduling 30 mins extra daily for Physics.",
    predictedScore: 65,
    topics: [
      { topic: 'Biology', score: 78, total: 100 },
      { topic: 'Chemistry', score: 65, total: 100 },
      { topic: 'Physics', score: 62, total: 100 },
      { topic: 'Lab Work', score: 70, total: 100 },
    ],
    recentAssignments: [
      { id: 's1', title: 'Physics Laws of Motion', date: '2023-10-12', score: 12, total: 25, type: 'Test' },
      { id: 's2', title: 'Chemistry Lab Report', date: '2023-10-08', score: 14, total: 20, type: 'Homework' },
    ],
    resources: [
      { title: "Laws of Motion - Interactive", type: "Practice", link: "#" },
      { title: "Chemistry Basics PDF", type: "Worksheet", link: "#" }
    ]
  },
  {
    id: 'english',
    name: 'English',
    currentScore: 85,
    classAverage: 78,
    trend: [80, 82, 84, 83, 85, 85],
    status: 'stable',
    strengths: ['Writing (88%)', 'Reading Comp (87%)'],
    struggles: ['Grammar (80%)'],
    teacherComment: "Excellent progress in creative writing!",
    aiInsight: "Strong performance maintained. Encourage reading more varied genres to boost vocabulary.",
    topics: [
      { topic: 'Creative Writing', score: 88, total: 100 },
      { topic: 'Reading Comp', score: 87, total: 100 },
      { topic: 'Grammar', score: 80, total: 100 },
      { topic: 'Literature', score: 85, total: 100 },
    ],
    recentAssignments: [
      { id: 'e1', title: 'Essay: Digital India', date: '2023-10-14', score: 19, total: 20, type: 'Homework' },
      { id: 'e2', title: 'Grammar Quiz', date: '2023-10-02', score: 16, total: 20, type: 'Quiz' },
    ],
    resources: [
      { title: "Advanced Grammar Guide", type: "Worksheet", link: "#" }
    ]
  }
];

export const UPDATES_DATA: Update[] = [
  {
    id: 'u1',
    date: '2023-10-15',
    teacherName: 'Mrs. Varghese',
    subject: 'Math',
    message: 'Scored 18/20 on Algebra quiz. Great improvement!',
    score: '18/20',
    type: 'academic',
    isRead: false
  },
  {
    id: 'u2',
    date: '2023-10-12',
    teacherName: 'Mr. Raju',
    subject: 'Science',
    message: 'Low performance in Physics chapter test. Please review Laws of Motion.',
    score: '12/25',
    type: 'academic',
    isRead: false
  },
  {
    id: 'u3',
    date: '2023-10-14',
    teacherName: 'Mr. Rajesh',
    subject: 'English',
    message: "Submitted excellent essay on 'Digital India'.",
    score: '19/20',
    type: 'academic',
    isRead: true
  },
  {
    id: 'u4',
    date: '2023-10-10',
    teacherName: 'Mrs. Varghese',
    subject: 'Math',
    message: 'Homework completion has been irregular this week.',
    type: 'behavior',
    isRead: true
  },
  {
    id: 'u5',
    date: '2023-10-05',
    teacherName: 'Admin',
    subject: 'General',
    message: 'Parent-teacher meeting scheduled for next Friday.',
    type: 'general',
    isRead: true
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    subjects: "Subjects",
    insights: "Insights",
    updates: "Updates",
    overview: "Overview",
    currentScore: "Current Score",
    classAverage: "Class Average",
    strengths: "Strengths",
    struggles: "Needs Focus",
    viewDetails: "View Details",
    recentUpdates: "Recent Updates",
    predictedScore: "Predicted Final Score",
    recommendations: "Recommendations",
    topicBreakdown: "Topic Breakdown",
    messageTeacher: "Message Teacher",
    resources: "Recommended Resources",
    upcoming: "Upcoming",
    trend: "Performance Trend"
  },
  ml: {
    dashboard: "ഡാഷ്ബോർഡ്",
    subjects: "വിഷയങ്ങൾ",
    insights: "ഉൾക്കാഴ്ചകൾ",
    updates: "അറിയിപ്പുകൾ",
    overview: "അവലോകനം",
    currentScore: "നിലവിലെ സ്കോർ",
    classAverage: "ക്ലാസ് ശരാശരി",
    strengths: "കരുത്തുറ്റ വശങ്ങൾ",
    struggles: "ശ്രദ്ധിക്കേണ്ടവ",
    viewDetails: "വിശദാംശങ്ങൾ കാണുക",
    recentUpdates: "സമീപകാല അറിയിപ്പുകൾ",
    predictedScore: "പ്രവചിച്ച സ്കോർ",
    recommendations: "നിർദ്ദേശങ്ങൾ",
    topicBreakdown: "വിഷയ വിശകലനം",
    messageTeacher: "അധ്യാപകന് സന്ദേശം അയക്കൂ",
    resources: "സഹായകമായ ഉറവിടങ്ങൾ",
    upcoming: "അടുത്തത്",
    trend: "പ്രകടനത്തിന്റെ ഗതി"
  }
};