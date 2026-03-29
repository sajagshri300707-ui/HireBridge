import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { generateScorecard } from '../utils/gemini';
import { getScorecardByInterview, saveScorecard, getEvaluationByInterview } from '../utils/storage';
import { DEMO_SCORECARDS } from '../data/mockData';
import './AIScorecard.css';

const SkillBar = ({ label, value, delay }) => (
  <div className="skill-bar-row" style={{ animationDelay: `${delay}ms` }}>
    <div className="skill-bar-label">{label}</div>
    <div className="skill-bar-track">
      <div
        className="skill-bar-fill"
        style={{ '--target': `${value}%`, animationDelay: `${delay + 200}ms` }}
      />
    </div>
    <div className="skill-bar-pct">{value}%</div>
  </div>
);

const AIScorecard = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { role, getVisibleInterviews } = useAuth();
  const [card, setCard] = useState(null);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const interviews = getVisibleInterviews();
    const iv = interviews.find((i) => i.id === interviewId);
    setInterview(iv);

    // Check for existing scorecard
    const existing = getScorecardByInterview(interviewId);
    if (existing) {
      setCard(existing);
      setLoading(false);
      return;
    }

    // Check demo scorecards
    const demo = DEMO_SCORECARDS.find((s) => s.interviewId === interviewId);
    if (demo) {
      setCard(demo);
      setLoading(false);
      return;
    }

    // Generate new one
    const generate = async () => {
      setGenerating(true);
      const evaluation = getEvaluationByInterview(interviewId);
      const generated = await generateScorecard({
        jobTitle: iv?.jobTitle || 'Software Engineer',
        questions: iv?.testQuestions || [],
        candidateAnswers: [],
        evaluation,
      });
      const card = {
        interviewId,
        ...generated,
        generatedAt: new Date().toISOString(),
      };
      saveScorecard(card);
      setCard(card);
      setGenerating(false);
      setLoading(false);
    };

    generate();
  }, [interviewId, getVisibleInterviews]);

  const backPath = role === 'interviewer' ? '/interviewer-dashboard' : '/applicant-dashboard';

  if (loading || generating) {
    return (
      <div className="scorecard-loading">
        <div className="scorecard-loading-inner">
          <div className="scorecard-spinner" />
          <h2>Generating AI Report...</h2>
          <p>Analyzing your interview performance with Gemini AI</p>
          <div className="loading-dots">
            <span /><span /><span />
          </div>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="scorecard-loading">
        <h2>Report not available</h2>
        <button onClick={() => navigate(backPath)}>Go back</button>
      </div>
    );
  }

  return (
    <div className="scorecard-page">
      {/* Header */}
      <header className="scorecard-header">
        <div className="scorecard-header-inner">
          <button className="back-btn" onClick={() => navigate(backPath)}>
            ← Back to Dashboard
          </button>
          <div className="scorecard-title-row">
            <h1>
              AI Performance Report
              {interview && <span className="scorecard-job-tag">{interview.jobTitle}</span>}
            </h1>
            <div className="ai-badge">✨ Powered by Gemini AI</div>
          </div>
          {interview && (
            <p className="scorecard-meta">
              {interview.company} • {new Date(interview.scheduledAt || card.generatedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
          )}
        </div>
      </header>

      <div className="scorecard-body">
        {/* Skill Breakdown */}
        <section className="scorecard-section">
          <div className="section-title-row">
            <div className="section-icon">📊</div>
            <h2>Skill Breakdown</h2>
          </div>
          <div className="skill-bars">
            {Object.entries(card.skillBreakdown || {}).map(([label, value], i) => (
              <SkillBar key={label} label={label} value={value} delay={i * 80} />
            ))}
          </div>
        </section>

        <div className="scorecard-columns">
          {/* Strengths */}
          <section className="scorecard-section scorecard-section--strengths">
            <div className="section-title-row">
              <div className="section-icon">💪</div>
              <h2>Strengths</h2>
            </div>
            <ul className="insight-list">
              {(card.strengths || []).map((s, i) => (
                <li key={i} className="insight-item insight-item--strength animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <span className="insight-dot insight-dot--green" />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Improvements */}
          <section className="scorecard-section scorecard-section--improve">
            <div className="section-title-row">
              <div className="section-icon">🎯</div>
              <h2>Areas to Improve</h2>
            </div>
            <ul className="insight-list">
              {(card.improvements || []).map((s, i) => (
                <li key={i} className="insight-item insight-item--improve animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <span className="insight-dot insight-dot--amber" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Behavioral */}
        <section className="scorecard-section">
          <div className="section-title-row">
            <div className="section-icon">🧠</div>
            <h2>Behavioral Insights</h2>
          </div>
          <div className="behavioral-grid">
            {(card.behavioral || []).map((b, i) => (
              <div key={i} className="behavioral-card animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="behavioral-index">{i + 1}</div>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NOTE: No numeric score shown to applicant */}
        {role === 'interviewer' && card.skillBreakdown && (
          <section className="scorecard-section scorecard-section--interviewer-only">
            <div className="section-title-row">
              <div className="section-icon">🔒</div>
              <h2>Evaluation Summary <span className="interviewer-only-tag">Interviewer Only</span></h2>
            </div>
            <div className="eval-summary-grid">
              {Object.entries(card.skillBreakdown).map(([k, v]) => (
                <div key={k} className="eval-summary-pill">
                  <div className="eval-summary-label">{k}</div>
                  <div className="eval-summary-val">{v}%</div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="scorecard-footer-note">
          <p>🤖 This report was generated by Google Gemini AI based on interview performance signals. It is for guidance only and should be used alongside human judgment.</p>
        </div>
      </div>
    </div>
  );
};

export default AIScorecard;
