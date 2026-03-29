import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import {
  getRole, setRole as persistRole,
  getShowDemo, setShowDemo as persistShowDemo,
  getInterviews, getJobs, hasRealData,
} from '../utils/storage';
import { DEMO_INTERVIEWS, DEMO_JOBS, DEMO_STATS_APPLICANT, DEMO_STATS_INTERVIEWER } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [role, setRoleState] = useState(null);
  const [showDemo, setShowDemoState] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      const storedRole = getRole();
      setRoleState(storedRole);
      setShowDemoState(getShowDemo());
      setIsReady(true);
    }
  }, [isLoaded]);

  const setRole = useCallback((newRole) => {
    persistRole(newRole);
    setRoleState(newRole);
  }, []);

  const toggleShowDemo = useCallback(() => {
    const next = !showDemo;
    persistShowDemo(next);
    setShowDemoState(next);
  }, [showDemo]);

  // ── Merge real + demo data based on toggle ─
  const getVisibleInterviews = useCallback(() => {
    const real = getInterviews();
    if (showDemo && (!hasRealData() || real.length === 0)) {
      return DEMO_INTERVIEWS;
    }
    if (showDemo && hasRealData()) {
      // Merge — deduplicate by id
      const realIds = new Set(real.map((i) => i.id));
      const demoFiltered = DEMO_INTERVIEWS.filter((d) => !realIds.has(d.id));
      return [...real, ...demoFiltered];
    }
    return real;
  }, [showDemo]);

  const getVisibleJobs = useCallback(() => {
    const real = getJobs();
    if (showDemo && (!hasRealData() || real.length === 0)) {
      return DEMO_JOBS;
    }
    if (showDemo && hasRealData()) {
      const realIds = new Set(real.map((j) => j.id));
      const demoFiltered = DEMO_JOBS.filter((d) => !realIds.has(d.id));
      return [...real, ...demoFiltered];
    }
    return real;
  }, [showDemo]);

  const getStats = useCallback(() => {
    const interviews = getVisibleInterviews();
    if (role === 'applicant') {
      const upcoming = interviews.filter((i) => i.status === 'scheduled').length;
      const completed = interviews.filter((i) => i.status === 'completed').length;
      const scores = interviews
        .filter((i) => i.evaluation)
        .map((i) => {
          const e = i.evaluation;
          return (e.communication + e.technical + e.confidence) / 3;
        });
      const avgScore = scores.length
        ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
        : '—';
      return { upcoming, completed, avgScore };
    }
    // interviewer
    const scheduled = interviews.filter((i) => i.status === 'scheduled').length;
    const completed = interviews.filter((i) => i.status === 'completed').length;
    const pendingEvaluations = interviews.filter(
      (i) => i.status === 'completed' && !i.evaluation
    ).length;
    const totalCandidates = new Set(interviews.map((i) => i.applicantId)).size;
    return { scheduled, completed, pendingEvaluations, totalCandidates };
  }, [role, getVisibleInterviews]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        isReady,
        role,
        setRole,
        showDemo,
        toggleShowDemo,
        hasRealData: hasRealData(),
        getVisibleInterviews,
        getVisibleJobs,
        getStats,
        demoStats: role === 'applicant' ? DEMO_STATS_APPLICANT : DEMO_STATS_INTERVIEWER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
