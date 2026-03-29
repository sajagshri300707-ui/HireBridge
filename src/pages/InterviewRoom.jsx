import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { InterviewProvider, useInterview } from '../context/InterviewContext';
import VideoPanel from '../components/interview/VideoPanel';
import CodeEditor from '../components/interview/CodeEditor';
import QuestionPanel from '../components/interview/QuestionPanel';
import ControlBar from '../components/interview/ControlBar';
import EvaluationPanel from '../components/interview/EvaluationPanel';
import AntiCheatBanner from '../components/interview/AntiCheatBanner';
import '../components/interview/InterviewRoom.css';

// Inner component that uses InterviewContext
const InterviewRoomInner = ({ interview, role }) => {
  const { startTimer, currentQuestionIndex } = useInterview();

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const questions = interview?.jobId
    ? (interview.testQuestions || [])
    : [];

  return (
    <div className="interview-root">
      {/* Anti-cheat — only for applicants */}
      <AntiCheatBanner
        roomId={interview?.id || 'room'}
        active={role === 'applicant'}
      />

      {/* Top: Question panel */}
      <QuestionPanel questions={questions} role={role} />

      {/* Middle: video + code + eval */}
      <div className="interview-content">
        <VideoPanel role={role} />
        <CodeEditor questionIndex={currentQuestionIndex} />
        {role === 'interviewer' && (
          <EvaluationPanel
            interviewId={interview?.id}
            onSaved={() => {}}
          />
        )}
      </div>

      {/* Bottom: controls */}
      <ControlBar role={role} interviewId={interview?.id} />
    </div>
  );
};

// Loader wrapper
const InterviewRoom = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { role, getVisibleInterviews, getVisibleJobs } = useAuth();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interviews = getVisibleInterviews();
    const found = interviews.find((i) => i.id === interviewId);

    if (found) {
      // Attach test questions from the job
      const jobs = getVisibleJobs();
      const job = jobs.find((j) => j.id === found.jobId);
      setInterview({ ...found, testQuestions: job?.testQuestions || [] });
    } else {
      // Handle direct navigation without a valid interview — create a demo one
      setInterview({
        id: interviewId || 'room-demo',
        jobTitle: 'Demo Interview',
        jobId: 'JOB-001',
        testQuestions: [
          { id: 'q1', text: 'Implement a debounce function in JavaScript.', difficulty: 'Medium' },
          { id: 'q2', text: 'Write a React hook that syncs state with localStorage.', difficulty: 'Medium' },
        ],
      });
    }
    setLoading(false);
  }, [interviewId, getVisibleInterviews, getVisibleJobs]);

  if (loading) {
    return (
      <div className="interview-root" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div className="interview-loading">
          <div className="interview-loading-spinner" />
          <p>Loading interview room...</p>
        </div>
      </div>
    );
  }

  return (
    <InterviewProvider>
      <InterviewRoomInner interview={interview} role={role || 'applicant'} />
    </InterviewProvider>
  );
};

export default InterviewRoom;
