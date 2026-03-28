import React from 'react';
import { UserButton } from '@clerk/clerk-react';

const InterviewerDashboard = () => {
  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2>Hire<span className="text-gradient">Bridge</span> | Interviewer</h2>
        <UserButton afterSignOutUrl="/" />
      </header>
      
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
        <h1 style={{ marginBottom: '16px' }}>Welcome, Interviewer!</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          This is your mock dashboard. From here, you'll be able to review candidate profiles, access structured evaluation sheets, submit real-time feedback, and manage your upcoming interview panels.
        </p>
      </div>
    </div>
  );
};

export default InterviewerDashboard;
