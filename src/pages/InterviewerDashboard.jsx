import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardNav from '../components/dashboard/DashboardNav';
import StatsCard from '../components/dashboard/StatsCard';
import InterviewCard from '../components/dashboard/InterviewCard';
import EmptyState from '../components/dashboard/EmptyState';
import CodeVerifyModal from '../components/modals/CodeVerifyModal';
import '../components/dashboard/Dashboard.css';
import './JobForm.css';

// ── Overview ──────────────────────────────────
const InterviewerOverview = ({ onStartInterview }) => {
  const { getVisibleInterviews, getStats, showDemo } = useAuth();
  const interviews = getVisibleInterviews();
  const stats = getStats();
  const scheduled = interviews.filter((i) => i.status === 'scheduled');
  const completed = interviews.filter((i) => i.status === 'completed');

  return (
    <>
      <div className="page-header">
        <h1>🎙️ Interviewer Dashboard</h1>
        <p>Manage your interview sessions and candidate evaluations</p>
        {showDemo && <div className="demo-banner">✨ Demo data — toggle off in sidebar for real data only</div>}
      </div>

      <div className="stats-grid">
        <StatsCard icon="📅" label="Scheduled" value={stats.scheduled} color="blue" delay={0} />
        <StatsCard icon="✅" label="Completed" value={stats.completed} color="green" delay={100} />
        <StatsCard icon="⏳" label="Pending Eval" value={stats.pendingEvaluations} color="amber" delay={200} />
        <StatsCard icon="👥" label="Total Candidates" value={stats.totalCandidates} color="purple" delay={300} />
      </div>

      {scheduled.length > 0 && (
        <section style={{ marginBottom: 40 }}>
          <div className="section-header">
            <h2 className="section-title">Upcoming Sessions</h2>
            <span className="section-count">{scheduled.length}</span>
          </div>
          <div className="interviews-grid">
            {scheduled.map((iv) => (
              <InterviewCard key={iv.id} interview={iv} role="interviewer" onAction={onStartInterview} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <div className="section-header">
            <h2 className="section-title">Completed Sessions</h2>
            <span className="section-count">{completed.length}</span>
          </div>
          <div className="interviews-grid">
            {completed.map((iv) => (
              <InterviewCard key={iv.id} interview={iv} role="interviewer" onAction={onStartInterview} />
            ))}
          </div>
        </section>
      )}

      {interviews.length === 0 && (
        <EmptyState
          icon="📭"
          title="No interviews assigned"
          message="Create a job posting and assign candidates to begin conducting interviews."
        />
      )}
    </>
  );
};

// ── Interview List ────────────────────────────
const InterviewerInterviews = ({ onStartInterview }) => {
  const { getVisibleInterviews } = useAuth();
  const interviews = getVisibleInterviews();
  return (
    <>
      <div className="page-header">
        <h1>All Interviews</h1>
        <p>View and manage all assigned interview sessions</p>
      </div>
      {interviews.length === 0 ? (
        <EmptyState icon="📅" title="No interviews yet" />
      ) : (
        <div className="interviews-grid">
          {interviews.map((iv) => (
            <InterviewCard key={iv.id} interview={iv} role="interviewer" onAction={onStartInterview} />
          ))}
        </div>
      )}
    </>
  );
};

// ── Create Job ────────────────────────────────
const CreateJobPage = () => {
  const { markRealData } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', company: '', description: '', location: '', salary: '',
    requirements: '',
  });
  const [questions, setQuestions] = useState([{ text: '', difficulty: 'Medium' }]);
  const [saved, setSaved] = useState(false);
  const [jobId, setJobId] = useState('');

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { text: '', difficulty: 'Medium' }]);
  };

  const handleSave = () => {
    if (!form.title || !form.company) return;
    const id = `JOB-${Date.now().toString().slice(-6)}`;
    const job = {
      id,
      ...form,
      requirements: form.requirements.split(',').map((r) => r.trim()).filter(Boolean),
      testQuestions: questions.filter((q) => q.text).map((q, i) => ({
        id: `Q-${id}-${i}`,
        ...q,
        hiddenTests: [],
      })),
      postedBy: 'current-user',
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    // Save to storage
    import('../utils/storage').then(({ saveJob }) => saveJob(job));
    setJobId(id);
    setSaved(true);
  };

  if (saved) {
    return (
      <div className="job-saved-success">
        <div className="success-icon">🎉</div>
        <h2>Job Posted Successfully!</h2>
        <p>Share this Job ID with candidates:</p>
        <div className="job-id-display">{jobId}</div>
        <button className="empty-action-btn" onClick={() => { setSaved(false); setForm({ title:'',company:'',description:'',location:'',salary:'',requirements:'' }); setQuestions([{ text:'', difficulty:'Medium' }]); }}>
          Post Another Job
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>➕ Post a Job</h1>
        <p>Create a new job posting and assign interview questions</p>
      </div>
      <div className="job-form">
        <div className="form-row">
          <div className="form-group">
            <label>Job Title *</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Frontend Engineer" />
          </div>
          <div className="form-group">
            <label>Company *</label>
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. TechCorp Inc." />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Describe the role and responsibilities..." />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Remote / New York" />
          </div>
          <div className="form-group">
            <label>Salary Range</label>
            <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="e.g. $80,000 – $120,000" />
          </div>
        </div>
        <div className="form-group">
          <label>Requirements (comma-separated)</label>
          <input value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} placeholder="React, TypeScript, Node.js, 3+ years" />
        </div>

        <div className="questions-section">
          <div className="section-header">
            <h3 className="section-title">Interview Questions</h3>
            <button className="add-question-btn" onClick={handleAddQuestion}>+ Add Question</button>
          </div>
          {questions.map((q, i) => (
            <div key={i} className="question-form-row">
              <span className="q-num-badge">Q{i + 1}</span>
              <input
                value={q.text}
                onChange={(e) => {
                  const next = [...questions];
                  next[i] = { ...next[i], text: e.target.value };
                  setQuestions(next);
                }}
                placeholder="Enter your interview question..."
                className="question-input"
              />
              <select
                value={q.difficulty}
                onChange={(e) => {
                  const next = [...questions];
                  next[i] = { ...next[i], difficulty: e.target.value };
                  setQuestions(next);
                }}
                className="difficulty-select"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          ))}
        </div>

        <button className="job-submit-btn" onClick={handleSave}>Post Job →</button>
      </div>
    </>
  );
};

// ── Evaluations Summary ───────────────────────
const EvaluationsPage = () => {
  const navigate = useNavigate();
  const { getVisibleInterviews } = useAuth();
  const completed = getVisibleInterviews().filter((i) => i.status === 'completed');

  return (
    <>
      <div className="page-header">
        <h1>📋 Evaluations</h1>
        <p>Review and submit candidate evaluation scores</p>
      </div>
      {completed.length === 0 ? (
        <EmptyState icon="📋" title="No completed interviews" message="Evaluations will appear here after interviews are completed." />
      ) : (
        <div className="interviews-grid">
          {completed.map((iv) => (
            <div key={iv.id} className="interview-card animate-fade-up">
              <div className="interview-card-title">{iv.applicantName}</div>
              <div className="interview-card-company">{iv.jobTitle} at {iv.company}</div>
              {iv.evaluation ? (
                <div className="interview-card-scores">
                  {[
                    { label: 'Comm', val: iv.evaluation.communication },
                    { label: 'Tech', val: iv.evaluation.technical },
                    { label: 'Conf', val: iv.evaluation.confidence },
                  ].map(({ label, val }) => (
                    <div key={label} className="score-pill">
                      <span className="score-pill-label">{label}</span>
                      <span className="score-pill-value">{val}/10</span>
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  className="interview-action-btn"
                  onClick={() => navigate(`/interview-room/${iv.id}`)}
                >
                  Submit Evaluation
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ── Root ──────────────────────────────────────
const InterviewerDashboard = () => {
  const navigate = useNavigate();
  const [codeModal, setCodeModal] = useState({ open: false, interview: null });

  const handleStartInterview = (interview) => {
    if (interview.status === 'completed') {
      navigate(`/scorecard/${interview.id}`);
      return;
    }
    setCodeModal({ open: true, interview });
  };

  const handleCodeVerified = () => {
    setCodeModal({ open: false, interview: null });
    if (codeModal.interview) {
      navigate(`/interview-room/${codeModal.interview.id}`);
    }
  };

  return (
    <div className="dash-layout">
      <DashboardNav />
      <main className="dash-main">
        <Routes>
          <Route index element={<InterviewerOverview onStartInterview={handleStartInterview} />} />
          <Route path="interviews" element={<InterviewerInterviews onStartInterview={handleStartInterview} />} />
          <Route path="create-job" element={<CreateJobPage />} />
          <Route path="evaluations" element={<EvaluationsPage />} />
        </Routes>
      </main>

      <CodeVerifyModal
        isOpen={codeModal.open}
        onClose={() => setCodeModal({ open: false, interview: null })}
        onVerify={handleCodeVerified}
      />
    </div>
  );
};

export default InterviewerDashboard;
