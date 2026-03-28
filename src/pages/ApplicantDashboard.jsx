import React from 'react';
import { UserButton } from '@clerk/clerk-react';

const ApplicantDashboard = () => {
  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2>Hire<span className="text-gradient">Bridge</span> | Applicant</h2>
        <UserButton afterSignOutUrl="/" />
      </header>
      
      <div className="glass-panel" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '16px' }}>Welcome, Applicant!</h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          This is your mock dashboard. Once fully implemented, you'll be able to view your upcoming interview schedules, track the status of your applications, and access preparation materials right here.
        </p>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
