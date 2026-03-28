import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignupApplicant from './pages/SignupApplicant';
import SignupInterviewer from './pages/SignupInterviewer';
import ApplicantDashboard from './pages/ApplicantDashboard';
import InterviewerDashboard from './pages/InterviewerDashboard';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Guarantee scroll reset on route change
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/signup/applicant/*" element={<SignupApplicant />} />
      <Route path="/signup/interviewer/*" element={<SignupInterviewer />} />
      <Route path="/applicant-dashboard/*" element={<ApplicantDashboard />} />
      <Route path="/interviewer-dashboard/*" element={<InterviewerDashboard />} />
    </Routes>
  );
}

export default App;
