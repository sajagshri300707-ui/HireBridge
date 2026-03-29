import React from 'react';
import './Dashboard.css';

const StatsCard = ({ icon, label, value, color = 'purple', delay = 0 }) => {
  const colorMap = {
    purple: { bg: 'rgba(124, 58, 237, 0.12)', border: 'rgba(124, 58, 237, 0.3)', glow: 'rgba(124,58,237,0.2)' },
    blue:   { bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', glow: 'rgba(59,130,246,0.2)' },
    green:  { bg: 'rgba(34, 197, 94, 0.12)',  border: 'rgba(34, 197, 94, 0.3)',  glow: 'rgba(34,197,94,0.2)' },
    amber:  { bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)', glow: 'rgba(251,191,36,0.2)' },
    red:    { bg: 'rgba(239, 68, 68, 0.12)',  border: 'rgba(239, 68, 68, 0.3)',  glow: 'rgba(239,68,68,0.2)' },
  };
  const c = colorMap[color] || colorMap.purple;

  return (
    <div
      className="stats-card animate-fade-up"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: `0 4px 24px ${c.glow}`,
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="stats-icon">{icon}</div>
      <div className="stats-value">{value}</div>
      <div className="stats-label">{label}</div>
    </div>
  );
};

export default StatsCard;
