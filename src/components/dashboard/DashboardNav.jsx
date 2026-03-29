import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

const NAV_APPLICANT = [
  { path: '/applicant-dashboard', label: 'Overview', icon: '🏠' },
  { path: '/applicant-dashboard/interviews', label: 'My Interviews', icon: '📅' },
  { path: '/applicant-dashboard/jobs', label: 'Find Jobs', icon: '🔍' },
  { path: '/applicant-dashboard/scorecards', label: 'My Reports', icon: '📊' },
];

const NAV_INTERVIEWER = [
  { path: '/interviewer-dashboard', label: 'Overview', icon: '🏠' },
  { path: '/interviewer-dashboard/interviews', label: 'Interviews', icon: '📅' },
  { path: '/interviewer-dashboard/create-job', label: 'Post a Job', icon: '➕' },
  { path: '/interviewer-dashboard/evaluations', label: 'Evaluations', icon: '📋' },
];

const DashboardNav = () => {
  const { role, showDemo, toggleShowDemo, hasRealData } = useAuth();
  const location = useLocation();
  const navItems = role === 'interviewer' ? NAV_INTERVIEWER : NAV_APPLICANT;

  return (
    <aside className="dash-sidebar">
      <div className="dash-logo">
        Hire<span className="text-gradient">Bridge</span>
      </div>

      <div className="dash-role-badge">
        {role === 'interviewer' ? '🎙️ Interviewer' : '👤 Applicant'}
      </div>

      <nav className="dash-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`dash-nav-item ${isActive ? 'dash-nav-item--active' : ''}`}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="dash-demo-toggle">
        <span className="demo-toggle-label">
          <span className="demo-dot" style={{ background: showDemo ? '#a855f7' : '#3f3f46' }} />
          Demo Data
        </span>
        <button
          className={`toggle-switch ${showDemo ? 'toggle-switch--on' : ''}`}
          onClick={toggleShowDemo}
          title={showDemo ? 'Hide demo data' : 'Show demo data'}
        >
          <span className="toggle-thumb" />
        </button>
      </div>

      <div className="dash-sidebar-footer">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
};

export default DashboardNav;
