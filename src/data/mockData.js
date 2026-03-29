// ─────────────────────────────────────────────
//  HireBridge — Mock / Demo Data Seed
// ─────────────────────────────────────────────

export const DEMO_JOBS = [
  {
    id: 'JOB-001',
    title: 'Senior Frontend Engineer',
    company: 'TechVision Corp',
    description:
      'Build cutting-edge React applications with a focus on performance and accessibility. You will work with a distributed team of 12 engineers.',
    requirements: ['React', 'TypeScript', 'CSS-in-JS', 'GraphQL', '3+ years experience'],
    salary: '$120,000 – $150,000',
    location: 'Remote / San Francisco',
    postedBy: 'demo-interviewer-1',
    createdAt: '2026-03-20T10:00:00Z',
    status: 'active',
    testQuestions: [
      {
        id: 'Q-001',
        text: 'Implement a debounce function in JavaScript.',
        difficulty: 'Medium',
        hiddenTests: [
          { input: 'debounce(fn, 300)', expected: 'function' },
          { input: 'called twice in 150ms', expected: 'called once' },
        ],
      },
      {
        id: 'Q-002',
        text: 'Write a React hook that syncs state with localStorage.',
        difficulty: 'Medium',
        hiddenTests: [],
      },
      {
        id: 'Q-003',
        text: 'Explain and implement virtual DOM reconciliation.',
        difficulty: 'Hard',
        hiddenTests: [],
      },
    ],
  },
  {
    id: 'JOB-002',
    title: 'Full Stack Developer',
    company: 'NovaBuild Solutions',
    description:
      'Join our fast-paced startup building next-gen SaaS tools. You\'ll own entire features from DB schema to UI.',
    requirements: ['Node.js', 'React', 'PostgreSQL', 'Docker', '2+ years experience'],
    salary: '$90,000 – $120,000',
    location: 'New York / Hybrid',
    postedBy: 'demo-interviewer-2',
    createdAt: '2026-03-22T14:00:00Z',
    status: 'active',
    testQuestions: [
      {
        id: 'Q-004',
        text: 'Design a REST API for a task management system.',
        difficulty: 'Medium',
        hiddenTests: [],
      },
      {
        id: 'Q-005',
        text: 'Implement rate limiting middleware in Express.',
        difficulty: 'Hard',
        hiddenTests: [],
      },
    ],
  },
  {
    id: 'JOB-003',
    title: 'ML Engineer',
    company: 'DeepKore AI',
    description:
      'Design and deploy production ML pipelines. You\'ll work on NLP and computer vision projects used by millions.',
    requirements: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'ML fundamentals'],
    salary: '$140,000 – $180,000',
    location: 'Remote',
    postedBy: 'demo-interviewer-1',
    createdAt: '2026-03-25T09:00:00Z',
    status: 'active',
    testQuestions: [
      {
        id: 'Q-006',
        text: 'Implement a simple neural network in Python without frameworks.',
        difficulty: 'Hard',
        hiddenTests: [],
      },
    ],
  },
];

export const DEMO_INTERVIEWS = [
  {
    id: 'INT-001',
    jobId: 'JOB-001',
    jobTitle: 'Senior Frontend Engineer',
    company: 'TechVision Corp',
    interviewerId: 'demo-interviewer-1',
    interviewerName: 'Sarah Chen',
    interviewerAvatar: 'SC',
    applicantId: 'demo-applicant',
    applicantName: 'Alex Rivera',
    applicantAvatar: 'AR',
    scheduledAt: '2026-03-30T14:00:00Z',
    duration: 60,
    status: 'scheduled',
    roomId: 'room-001',
    currentQuestionIndex: 0,
    notes: '',
  },
  {
    id: 'INT-002',
    jobId: 'JOB-002',
    jobTitle: 'Full Stack Developer',
    company: 'NovaBuild Solutions',
    interviewerId: 'demo-interviewer-2',
    interviewerName: 'Marcus Johnson',
    interviewerAvatar: 'MJ',
    applicantId: 'demo-applicant',
    applicantName: 'Alex Rivera',
    applicantAvatar: 'AR',
    scheduledAt: '2026-03-28T10:00:00Z',
    duration: 45,
    status: 'completed',
    roomId: 'room-002',
    currentQuestionIndex: 2,
    evaluation: {
      communication: 8,
      technical: 7,
      confidence: 9,
      custom: [],
      savedAt: '2026-03-28T11:00:00Z',
    },
  },
  {
    id: 'INT-003',
    jobId: 'JOB-003',
    jobTitle: 'ML Engineer',
    company: 'DeepKore AI',
    interviewerId: 'demo-interviewer-1',
    interviewerName: 'Sarah Chen',
    interviewerAvatar: 'SC',
    applicantId: 'demo-applicant-2',
    applicantName: 'Priya Nair',
    applicantAvatar: 'PN',
    scheduledAt: '2026-04-01T16:00:00Z',
    duration: 60,
    status: 'scheduled',
    roomId: 'room-003',
    currentQuestionIndex: 0,
    notes: '',
  },
];

export const DEMO_STATS_APPLICANT = {
  upcoming: 1,
  completed: 1,
  avgScore: 8.0,
  streak: 3,
};

export const DEMO_STATS_INTERVIEWER = {
  scheduled: 2,
  completed: 1,
  pendingEvaluations: 0,
  totalCandidates: 3,
};

export const DEMO_SCORECARDS = [
  {
    interviewId: 'INT-002',
    jobTitle: 'Full Stack Developer',
    company: 'NovaBuild Solutions',
    generatedAt: '2026-03-28T11:05:00Z',
    strengths: [
      'Excellent command of asynchronous JavaScript patterns',
      'Clear and concise communication during technical explanations',
      'Strong confidence when discussing system design trade-offs',
    ],
    improvements: [
      'Could deepen knowledge of database indexing strategies',
      'Practice explaining complex algorithms step-by-step',
    ],
    behavioral: [
      'Shows strong problem-solving under pressure',
      'Collaborative mindset — asked clarifying questions before coding',
      'Handles ambiguity well by breaking down the problem',
    ],
    skillBreakdown: {
      Communication: 80,
      'Technical Depth': 70,
      Confidence: 90,
      'Problem Solving': 75,
      Clarity: 85,
    },
  },
];

// AI follow-up questions fallback pool (used when Gemini is unavailable)
export const FALLBACK_FOLLOWUPS = {
  default: [
    "Can you walk me through the time complexity of your solution?",
    "How would you handle edge cases in this implementation?",
    "What would change if the input size were 100x larger?",
    "How would you test this function in production?",
    "Is there a more elegant way to solve this with modern JS features?",
    "How does this approach compare to an alternative you considered?",
    "What would happen if a concurrent request modified the data mid-execution?",
  ],
};
