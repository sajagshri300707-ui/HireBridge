import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardNav from '../components/dashboard/DashboardNav';
import StatsCard from '../components/dashboard/StatsCard';
import InterviewCard from '../components/dashboard/InterviewCard';
import EmptyState from '../components/dashboard/EmptyState';
import OTPModal from '../components/modals/OTPModal';
import '../components/dashboard/Dashboard.css';

// ── Overview Page ─────────────────────────────
const ApplicantOverview = ({ onJoinInterview }) => {
  const { getVisibleInterviews, getStats, showDemo } = useAuth();
  const interviews = getVisibleInterviews();
  const stats = getStats();
  const upcoming = interviews.filter((i) => i.status === 'scheduled');
  const completed = interviews.filter((i) => i.status === 'completed');

  return (
    <>
      <div className="page-header">
        <h1>👋 Welcome Back</h1>
        <p>Here's an overview of your interview activity</p>
        {showDemo && <div className="demo-banner">✨ Demo data enabled — toggle off in sidebar</div>}
      </div>

      <div className="stats-grid">
        <StatsCard icon="📅" label="Upcoming Interviews" value={stats.upcoming} color="blue" delay={0} />
        <StatsCard icon="✅" label="Completed" value={stats.completed} color="green" delay={100} />
        <StatsCard icon="⭐" label="Avg Score" value={stats.avgScore} color="amber" delay={200} />
        <StatsCard icon="🔥" label="Active Streak" value="3 days" color="red" delay={300} />
      </div>

      {upcoming.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <div className="section-header">
            <h2 className="section-title">Upcoming Interviews</h2>
            <span className="section-count">{upcoming.length}</span>
          </div>
          <div className="interviews-grid">
            {upcoming.map((iv) => (
              <InterviewCard
                key={iv.id}
                interview={iv}
                role="applicant"
                onAction={onJoinInterview}
              />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <div className="section-header">
            <h2 className="section-title">Completed Interviews</h2>
            <span className="section-count">{completed.length}</span>
          </div>
          <div className="interviews-grid">
            {completed.map((iv) => (
              <InterviewCard
                key={iv.id}
                interview={iv}
                role="applicant"
                onAction={onJoinInterview}
              />
            ))}
          </div>
        </section>
      )}

      {interviews.length === 0 && (
        <EmptyState
          icon="📭"
          title="No interviews assigned yet"
          message="Search for a job using a Job ID provided by your interviewer to get started."
        />
      )}
    </>
  );
};

// ── Interviews Listing ────────────────────────
const ApplicantInterviews = ({ onJoinInterview }) => {
  const { getVisibleInterviews } = useAuth();
  const interviews = getVisibleInterviews();
  return (
    <>
      <div className="page-header">
        <h1>My Interviews</h1>
        <p>All your scheduled and completed interview sessions</p>
      </div>
      {interviews.length === 0 ? (
        <EmptyState icon="📅" title="No interviews yet" message="Your assigned interviews will appear here." />
      ) : (
        <div className="interviews-grid">
          {interviews.map((iv) => (
            <InterviewCard key={iv.id} interview={iv} role="applicant" onAction={onJoinInterview} />
          ))}
        </div>
      )}
    </>
  );
};

// ── Job Search ────────────────────────────────
const JobSearchPage = () => {
  const { getVisibleJobs } = useAuth();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState('');
  const [found, setFound] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const allJobs = getVisibleJobs();

  const handleSearch = () => {
    const job = allJobs.find((j) => j.id.toLowerCase() === searchId.trim().toLowerCase());
    if (job) { setFound(job); setNotFound(false); }
    else { setFound(null); setNotFound(true); }
  };

  return (
    <>
      <div className="page-header">
        <h1>🔍 Find a Job</h1>
        <p>Enter a Job ID provided by your interviewer to view details and apply</p>
      </div>

      <div className="job-search-bar">
        <input
          type="text"
          value={searchId}
          onChange={(e) => { setSearchId(e.target.value); setNotFound(false); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter Job ID (e.g. JOB-001)"
          className="job-search-input"
        />
        <button className="job-search-btn" onClick={handleSearch}>Search</button>
      </div>

      {notFound && (
        <p className="job-not-found">❌ No job found with ID "{searchId}". Double-check the ID with your interviewer.</p>
      )}

      {found && (
        <div className="job-detail-card">
          <div className="job-detail-header">
            <div>
              <h2>{found.title}</h2>
              <p className="job-company">{found.company}</p>
            </div>
            <span className="job-id-tag">{found.id}</span>
          </div>
          <p className="job-description">{found.description}</p>
          <div className="job-meta-row">
            <span>📍 {found.location}</span>
            <span>💰 {found.salary}</span>
          </div>
          <div className="job-requirements">
            {found.requirements?.map((r) => <span key={r} className="req-tag">{r}</span>)}
          </div>
          <div className="job-questions-preview">
            <p className="job-section-label">Interview Questions ({found.testQuestions?.length || 0})</p>
            {found.testQuestions?.map((q, i) => (
              <div key={q.id} className="question-preview">
                <span className="q-num">Q{i + 1}</span>
                <span className="q-text">{q.text}</span>
                <span className="q-diff" data-diff={q.difficulty}>{q.difficulty}</span>
              </div>
            ))}
          </div>
          <button className="job-apply-btn" onClick={() => navigate('/applicant-dashboard')}>
            Request Interview Session
          </button>
        </div>
      )}

      {!found && !notFound && (
        <>
          <p className="job-browse-label">Browse Available Positions</p>
          <div className="jobs-browse-grid">
            {allJobs.map((j) => (
              <div key={j.id} className="job-browse-card" onClick={() => { setSearchId(j.id); setFound(j); }}>
                <div className="job-browse-title">{j.title}</div>
                <div className="job-browse-company">{j.company}</div>
                <div className="job-browse-id">{j.id}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

// ── Scorecards ────────────────────────────────
const ApplicantScorecards = () => {
  const navigate = useNavigate();
  const { getVisibleInterviews } = useAuth();
  const completed = getVisibleInterviews().filter((i) => i.status === 'completed');

  return (
    <>
      <div className="page-header">
        <h1>📊 My Reports</h1>
        <p>AI-generated performance insights from your interviews</p>
      </div>
      {completed.length === 0 ? (
        <EmptyState icon="📈" title="No reports yet" message="Complete an interview to receive your AI scorecard." />
      ) : (
        <div className="interviews-grid">
          {completed.map((iv) => (
            <div key={iv.id} className="scorecard-summary-card" onClick={() => navigate(`/scorecard/${iv.id}`)}>
              <div className="scorecard-job">{iv.jobTitle}</div>
              <div className="scorecard-company">{iv.company}</div>
              <div className="scorecard-date">{new Date(iv.scheduledAt).toLocaleDateString()}</div>
              <button className="scorecard-view-btn">View AI Report →</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ── Root Page ─────────────────────────────────
const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const [otpModal, setOtpModal] = useState({ open: false, interview: null });

  const handleJoinInterview = (interview) => {
    if (interview.status === 'completed') {
      navigate(`/scorecard/${interview.id}`);
      return;
    }
    setOtpModal({ open: true, interview });
  };

  const handleOtpVerified = () => {
    setOtpModal({ open: false, interview: null });
    if (otpModal.interview) {
      navigate(`/interview-room/${otpModal.interview.id}`);
    }
  };

  return (
    <div className="dash-layout">
      <DashboardNav />
      <main className="dash-main">
        <Routes>
          <Route index element={<ApplicantOverview onJoinInterview={handleJoinInterview} />} />
          <Route path="interviews" element={<ApplicantInterviews onJoinInterview={handleJoinInterview} />} />
          <Route path="jobs" element={<JobSearchPage />} />
          <Route path="scorecards" element={<ApplicantScorecards />} />
        </Routes>
      </main>

      <OTPModal
        isOpen={otpModal.open}
        onClose={() => setOtpModal({ open: false, interview: null })}
        onVerify={handleOtpVerified}
        candidateName={otpModal.interview?.applicantName}
      />
    </div>
  );
};

export default ApplicantDashboard;
