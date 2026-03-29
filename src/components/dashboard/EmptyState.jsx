import React from 'react';
import './Dashboard.css';

const EmptyState = ({ icon = '📭', title = 'Nothing here yet', message, action }) => (
  <div className="empty-state">
    <div className="empty-icon">{icon}</div>
    <h3 className="empty-title">{title}</h3>
    {message && <p className="empty-message">{message}</p>}
    {action && (
      <button className="empty-action-btn" onClick={action.onClick}>
        {action.label}
      </button>
    )}
  </div>
);

export default EmptyState;
