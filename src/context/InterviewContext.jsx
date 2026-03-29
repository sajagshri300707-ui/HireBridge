import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateAnswers, setCandidateAnswers] = useState([]);
  const [followUpHistory, setFollowUpHistory] = useState([]);
  const [violations, setViolations] = useState([]);
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Controls
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    setIsTimerRunning(true);
    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTimerRunning(false);
  }, []);

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const addViolation = useCallback((type) => {
    setViolations((prev) => [...prev, { type, timestamp: new Date().toISOString() }]);
  }, []);

  const saveAnswer = useCallback((questionIndex, code) => {
    setCandidateAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = code;
      return next;
    });
  }, []);

  const addFollowUp = useCallback((question) => {
    setFollowUpHistory((prev) => [...prev, question]);
  }, []);

  const reset = useCallback(() => {
    stopTimer();
    setCurrentQuestionIndex(0);
    setCandidateAnswers([]);
    setFollowUpHistory([]);
    setViolations([]);
    setElapsedSeconds(0);
    setIsTimerRunning(false);
    setMicOn(true);
    setCameraOn(true);
    setIsScreenSharing(false);
  }, [stopTimer]);

  return (
    <InterviewContext.Provider
      value={{
        currentQuestionIndex, setCurrentQuestionIndex,
        candidateAnswers, saveAnswer,
        followUpHistory, addFollowUp,
        violations, addViolation,
        isGeneratingFollowUp, setIsGeneratingFollowUp,
        elapsedSeconds, formatTime, startTimer, stopTimer, isTimerRunning,
        micOn, setMicOn,
        cameraOn, setCameraOn,
        isScreenSharing, setIsScreenSharing,
        reset,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error('useInterview must be used inside InterviewProvider');
  return ctx;
};

export default InterviewContext;
