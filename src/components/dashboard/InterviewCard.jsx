import React from 'react';
import './Dashboard.css';

const STATUS_CONFIG = {
  scheduled: { label: 'Scheduled', color: '#60a5fa', bg: 'rgba(59,130,246,0.12)' },
  live:      { label: 'Live',      color: '#4ade80', bg: 'rgba(34,197,94,0.12)' },
  completed: { label: 'Completed', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  cancelled: { label: 'Cancelled', color: '#f87171', bg: 'rgba(239,68,68,0.12)' },
};

const InterviewCard = ({ interview, role, onAction }) => {
  const status = STATUS_CONFIG[interview.status] || STATUS_CONFIG.scheduled;
  const date = new Date(interview.scheduledAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });

  const isCompleted = interview.status === 'completed';
  const actionLabel = role === 'interviewer'
    ? (isCompleted ? 'View Evaluation' : 'Start Interview')
    : (isCompleted ? 'View Report' : 'Join Interview');

  return (
    <div className="interview-card animate-fade-up">
      <div className="interview-card-header">
        <div>
          <h3 className="interview-card-title">{interview.jobTitle}</h3>
          <p className="interview-card-company">{interview.company}</p>
        </div>
        <span
          className="status-badge"
          style={{ color: status.color, background: status.bg, borderColor: `${status.color}40` }}
        >
          {status.label === 'Live' && <span className="live-dot" />}
          {status.label}
        </span>
      </div>

      <div className="interview-card-meta">
        <div className="meta-item">
          <span className="meta-icon">📅</span>
          {formattedDate} • {formattedTime}
        </div>
        <div className="meta-item">
          <span className="meta-icon">⏱️</span>
          {interview.duration} min
        </div>
        <div className="meta-item">
          <span className="meta-icon">🆔</span>
          {interview.id}
        </div>
      </div>

      <div className="interview-card-participants">
        <div className="participant">
          <span className="participant-avatar">{interview.interviewerAvatar}</span>
          <span className="participant-name">{interview.interviewerName}</span>
          <span className="participant-role-tag">Interviewer</span>
        </div>
        <span className="participant-divider">vs</span>
        <div className="participant">
          <span className="participant-avatar applicant-avatar">{interview.applicantAvatar}</span>
          <span className="participant-name">{interview.applicantName}</span>
          <span className="participant-role-tag">Applicant</span>
        </div>
      </div>

      {interview.evaluation && (
        <div className="interview-card-scores">
          {[
            { label: 'Comm', val: interview.evaluation.communication },
            { label: 'Tech', val: interview.evaluation.technical },
            { label: 'Conf', val: interview.evaluation.confidence },
          ].map(({ label, val }) => (
            <div key={label} className="score-pill">
              <span className="score-pill-label">{label}</span>
              <span className="score-pill-value">{val}/10</span>
            </div>
          ))}
        </div>
      )}

      {!isCompleted && (
        <button
          className="interview-action-btn"
          onClick={() => onAction(interview)}
        >
          {actionLabel}
        </button>
      )}

      {isCompleted && (
        <button
          className="interview-action-btn interview-action-btn--ghost"
          onClick={() => onAction(interview)}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default InterviewCard;
