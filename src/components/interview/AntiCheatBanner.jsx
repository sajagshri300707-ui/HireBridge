import React, { useState, useCallback } from 'react';
import useAntiCheat from '../../hooks/useAntiCheat';
import './InterviewRoom.css';

const VIOLATION_LABELS = {
  tab_switch: 'Tab switching detected',
  copy_attempt: 'Copy attempt blocked',
  paste_attempt: 'Paste attempt blocked',
  right_click: 'Right-click disabled',
  devtools_attempt: 'DevTools access blocked',
};

const AntiCheatBanner = ({ roomId, active = true }) => {
  const [banners, setBanners] = useState([]);
  const [totalViolations, setTotalViolations] = useState(0);

  const handleViolation = useCallback((type) => {
    const id = Date.now();
    const message = VIOLATION_LABELS[type] || 'Suspicious activity detected';
    setBanners((prev) => [...prev, { id, message, type }]);
    setTotalViolations((n) => n + 1);
    setTimeout(() => setBanners((prev) => prev.filter((b) => b.id !== id)), 4000);
  }, []);

  useAntiCheat(roomId, handleViolation, active);

  if (!active) return null;

  return (
    <>
      {/* Floating violation banners */}
      <div className="anticheat-banners">
        {banners.map((b) => (
          <div key={b.id} className="anticheat-banner animate-fade-up">
            <span className="anticheat-icon">⚠️</span>
            <span>{b.message}</span>
          </div>
        ))}
      </div>

      {/* Persistent violation counter */}
      {totalViolations > 0 && (
        <div className="violation-counter">
          <span className="violation-dot" />
          {totalViolations} violation{totalViolations !== 1 ? 's' : ''} logged
        </div>
      )}
    </>
  );
};

export default AntiCheatBanner;
