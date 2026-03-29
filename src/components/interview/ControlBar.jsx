import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../../context/InterviewContext';
import './InterviewRoom.css';

const ControlBar = ({ role, interviewId }) => {
  const navigate = useNavigate();
  const {
    micOn, setMicOn,
    cameraOn, setCameraOn,
    isScreenSharing, setIsScreenSharing,
    elapsedSeconds, formatTime,
  } = useInterview();

  const handleLeave = () => {
    if (window.confirm('Are you sure you want to leave the interview?')) {
      if (role === 'applicant') navigate('/applicant-dashboard');
      else navigate(`/scorecard/${interviewId}`);
    }
  };

  return (
    <div className="control-bar">
      {/* Timer */}
      <div className="control-timer">
        <span className="timer-icon">⏱</span>
        <span className="timer-display">{formatTime(elapsedSeconds)}</span>
      </div>

      {/* Controls */}
      <div className="control-buttons">
        <button
          className={`ctrl-btn ${!micOn ? 'ctrl-btn--off' : ''}`}
          onClick={() => setMicOn(!micOn)}
          title={micOn ? 'Mute' : 'Unmute'}
        >
          <span className="ctrl-icon">{micOn ? '🎙️' : '🔇'}</span>
          <span className="ctrl-label">{micOn ? 'Mute' : 'Unmuted'}</span>
        </button>

        <button
          className={`ctrl-btn ${!cameraOn ? 'ctrl-btn--off' : ''}`}
          onClick={() => setCameraOn(!cameraOn)}
          title={cameraOn ? 'Turn off camera' : 'Turn on camera'}
        >
          <span className="ctrl-icon">{cameraOn ? '📹' : '📷'}</span>
          <span className="ctrl-label">{cameraOn ? 'Camera' : 'Camera Off'}</span>
        </button>

        {role === 'applicant' && (
          <button
            className={`ctrl-btn ${isScreenSharing ? 'ctrl-btn--active-share' : ''}`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            title="Share Screen"
          >
            <span className="ctrl-icon">📺</span>
            <span className="ctrl-label">{isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
          </button>
        )}
      </div>

      {/* Leave */}
      <button className="leave-btn" onClick={handleLeave}>
        <span>📴</span> Leave
      </button>
    </div>
  );
};

export default ControlBar;
