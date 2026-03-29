import React, { useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import { generateFollowUp } from '../../utils/gemini';
import './InterviewRoom.css';

const QuestionPanel = ({ questions = [], role }) => {
  const {
    currentQuestionIndex, setCurrentQuestionIndex,
    followUpHistory, addFollowUp,
    isGeneratingFollowUp, setIsGeneratingFollowUp,
    candidateAnswers,
  } = useInterview();

  const [showFollowUp, setShowFollowUp] = useState(false);
  const currentQ = questions[currentQuestionIndex];

  const handleFollowUp = async () => {
    if (!currentQ) return;
    setIsGeneratingFollowUp(true);
    const answer = candidateAnswers[currentQuestionIndex] || '';
    const followUp = await generateFollowUp(currentQ.text, answer);
    addFollowUp(followUp);
    setIsGeneratingFollowUp(false);
    setShowFollowUp(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFollowUp(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFollowUp(false);
    }
  };

  if (!currentQ) {
    return (
      <div className="question-panel">
        <div className="question-empty">No questions configured for this interview</div>
      </div>
    );
  }

  return (
    <div className="question-panel">
      <div className="question-panel-inner">
        {/* Progress */}
        <div className="question-progress">
          {questions.map((_, i) => (
            <button
              key={i}
              className={`progress-dot ${i === currentQuestionIndex ? 'progress-dot--active' : i < currentQuestionIndex ? 'progress-dot--done' : ''}`}
              onClick={() => setCurrentQuestionIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question body */}
        <div className="question-body">
          <div className="question-meta">
            <span className="question-num">Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="question-diff" data-diff={currentQ.difficulty}>{currentQ.difficulty}</span>
          </div>
          <p className="question-text">{currentQ.text}</p>
        </div>

        {/* Follow-up display */}
        {followUpHistory.length > 0 && showFollowUp && (
          <div className="followup-section">
            <div className="followup-label">🤖 AI Follow-up</div>
            <p className="followup-text">{followUpHistory[followUpHistory.length - 1]}</p>
          </div>
        )}

        {/* Actions */}
        <div className="question-actions">
          <button
            className="q-nav-btn"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            ← Prev
          </button>

          {role === 'interviewer' && (
            <button
              className="followup-btn"
              onClick={handleFollowUp}
              disabled={isGeneratingFollowUp}
            >
              {isGeneratingFollowUp ? (
                <><span className="run-spinner" /> Generating...</>
              ) : (
                '🤖 AI Follow-up'
              )}
            </button>
          )}

          <button
            className="q-nav-btn q-nav-btn--next"
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPanel;
