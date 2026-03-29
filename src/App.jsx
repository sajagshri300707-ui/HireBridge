import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { setRole as persistRole } from './utils/storage';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const SignupApplicant = lazy(() => import('./pages/SignupApplicant'));
const SignupInterviewer = lazy(() => import('./pages/SignupInterviewer'));
const ApplicantDashboard = lazy(() => import('./pages/ApplicantDashboard'));
const InterviewerDashboard = lazy(() => import('./pages/InterviewerDashboard'));
const InterviewRoom = lazy(() => import('./pages/InterviewRoom'));
const AIScorecard = lazy(() => import('./pages/AIScorecard'));

const PageLoader = () => (
  <div style={{
    minHeight: '100vh', background: '#08080f',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', gap: '16px', color: '#71717a'
  }}>
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      border: '3px solid rgba(124,58,237,0.2)', borderTopColor: '#7c3aed',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/signup/applicant/*" element={<SignupApplicant />} />
        <Route path="/signup/interviewer/*" element={<SignupInterviewer />} />
        <Route path="/applicant-dashboard/*" element={<ApplicantDashboard />} />
        <Route path="/interviewer-dashboard/*" element={<InterviewerDashboard />} />
        <Route path="/interview-room/:interviewId" element={<InterviewRoom />} />
        <Route path="/scorecard/:interviewId" element={<AIScorecard />} />
      </Routes>
    </Suspense>
  );
}

export default App;

