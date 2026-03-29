// ─────────────────────────────────────────────
//  HireBridge — localStorage Storage Utilities
// ─────────────────────────────────────────────

const KEYS = {
  ROLE: 'hirebridge_role',
  JOBS: 'hirebridge_jobs',
  INTERVIEWS: 'hirebridge_interviews',
  EVALUATIONS: 'hirebridge_evaluations',
  SCORECARDS: 'hirebridge_scorecards',
  HAS_REAL_DATA: 'hirebridge_has_real_data',
  SHOW_DEMO: 'hirebridge_show_demo',
  VIOLATIONS: 'hirebridge_violations',
};

// ── Role ─────────────────────────────────────
export const getRole = () => localStorage.getItem(KEYS.ROLE) || null;
export const setRole = (role) => localStorage.setItem(KEYS.ROLE, role);
export const clearRole = () => localStorage.removeItem(KEYS.ROLE);

// ── Jobs ─────────────────────────────────────
export const getJobs = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.JOBS) || '[]');
  } catch { return []; }
};

export const saveJob = (job) => {
  const jobs = getJobs();
  const existing = jobs.findIndex((j) => j.id === job.id);
  if (existing >= 0) jobs[existing] = job;
  else jobs.push(job);
  localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
  markRealData();
};

export const getJobById = (id) => getJobs().find((j) => j.id === id) || null;

// ── Interviews ────────────────────────────────
export const getInterviews = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.INTERVIEWS) || '[]');
  } catch { return []; }
};

export const saveInterview = (interview) => {
  const list = getInterviews();
  const idx = list.findIndex((i) => i.id === interview.id);
  if (idx >= 0) list[idx] = interview;
  else list.push(interview);
  localStorage.setItem(KEYS.INTERVIEWS, JSON.stringify(list));
  markRealData();
};

export const getInterviewById = (id) =>
  getInterviews().find((i) => i.id === id) || null;

// ── Evaluations ──────────────────────────────
export const getEvaluations = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.EVALUATIONS) || '[]');
  } catch { return []; }
};

export const saveEvaluation = (evaluation) => {
  const SCORE_THRESHOLD = 5;
  const avg =
    (evaluation.communication + evaluation.technical + evaluation.confidence) / 3;

  const list = getEvaluations();
  const idx = list.findIndex((e) => e.interviewId === evaluation.interviewId);
  if (idx >= 0) list[idx] = evaluation;
  else list.push(evaluation);
  localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(list));

  // Only persist the full interview record if score is above threshold
  if (avg >= SCORE_THRESHOLD) {
    const interview = getInterviewById(evaluation.interviewId);
    if (interview) {
      saveInterview({ ...interview, status: 'completed', evaluation });
    }
  }
};

export const getEvaluationByInterview = (interviewId) =>
  getEvaluations().find((e) => e.interviewId === interviewId) || null;

// ── Scorecards ────────────────────────────────
export const getScorecards = () => {
  try {
    return JSON.parse(localStorage.getItem(KEYS.SCORECARDS) || '[]');
  } catch { return []; }
};

export const saveScorecard = (card) => {
  const list = getScorecards();
  const idx = list.findIndex((c) => c.interviewId === card.interviewId);
  if (idx >= 0) list[idx] = card;
  else list.push(card);
  localStorage.setItem(KEYS.SCORECARDS, JSON.stringify(list));
};

export const getScorecardByInterview = (interviewId) =>
  getScorecards().find((c) => c.interviewId === interviewId) || null;

// ── Demo data management ─────────────────────
export const hasRealData = () =>
  localStorage.getItem(KEYS.HAS_REAL_DATA) === 'true';

export const markRealData = () =>
  localStorage.setItem(KEYS.HAS_REAL_DATA, 'true');

export const getShowDemo = () => {
  const val = localStorage.getItem(KEYS.SHOW_DEMO);
  // Default: show demo if no real data, or if user explicitly enabled
  if (val === null) return !hasRealData();
  return val === 'true';
};

export const setShowDemo = (val) =>
  localStorage.setItem(KEYS.SHOW_DEMO, String(val));

// ── Anti-cheat violations ────────────────────
export const getViolations = (roomId) => {
  try {
    const all = JSON.parse(localStorage.getItem(KEYS.VIOLATIONS) || '{}');
    return all[roomId] || [];
  } catch { return []; }
};

export const logViolation = (roomId, type) => {
  try {
    const all = JSON.parse(localStorage.getItem(KEYS.VIOLATIONS) || '{}');
    if (!all[roomId]) all[roomId] = [];
    all[roomId].push({ type, timestamp: new Date().toISOString() });
    localStorage.setItem(KEYS.VIOLATIONS, JSON.stringify(all));
  } catch { /* silent */ }
};

export { KEYS };
