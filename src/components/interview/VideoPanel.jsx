import React, { useEffect, useRef, useState } from 'react';
import { useInterview } from '../../context/InterviewContext';
import './InterviewRoom.css';

const VideoPanel = ({ role }) => {
  const { micOn, setMicOn, cameraOn, setCameraOn, isScreenSharing, setIsScreenSharing } = useInterview();
  const localVideoRef = useRef(null);
  const screenShareRef = useRef(null);
  const streamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const [cameraError, setCameraError] = useState(false);
  const [remoteSimulated, setRemoteSimulated] = useState(false);

  // Simulate remote user joining after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setRemoteSimulated(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch {
        setCameraError(true);
      }
    };
    startCamera();
    return () => streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  const toggleMic = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((t) => (t.enabled = !micOn));
    }
    setMicOn(!micOn);
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((t) => (t.enabled = !cameraOn));
    }
    setCameraOn(!cameraOn);
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
      if (screenShareRef.current) screenShareRef.current.srcObject = null;
      setIsScreenSharing(false);
    } else {
      try {
        const screen = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = screen;
        if (screenShareRef.current) screenShareRef.current.srcObject = screen;
        screen.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          if (screenShareRef.current) screenShareRef.current.srcObject = null;
        };
        setIsScreenSharing(true);
      } catch { /* User cancelled */ }
    }
  };

  return (
    <div className="video-panel">
      {/* Remote / other user */}
      <div className="video-remote">
        {remoteSimulated ? (
          <div className="remote-avatar-placeholder">
            <div className="remote-avatar">
              {role === 'interviewer' ? 'AR' : 'SC'}
            </div>
            <div className="remote-name">
              {role === 'interviewer' ? 'Alex Rivera (Applicant)' : 'Sarah Chen (Interviewer)'}
            </div>
            <div className="connected-badge">🟢 Connected</div>
          </div>
        ) : (
          <div className="waiting-state">
            <div className="waiting-spinner" />
            <p>Waiting for other participant...</p>
          </div>
        )}
      </div>

      {/* Local video */}
      <div className={`video-local-wrapper ${!cameraOn ? 'camera-off' : ''}`}>
        {cameraError || !cameraOn ? (
          <div className="camera-off-placeholder">
            <span>🎥</span>
            <span>Camera {cameraError ? 'unavailable' : 'off'}</span>
          </div>
        ) : (
          <video ref={localVideoRef} autoPlay muted playsInline className="video-local" />
        )}
        <div className="local-label">You</div>
        {!micOn && <div className="muted-indicator">🔇</div>}
      </div>

      {/* Screen share preview for interviewer */}
      {isScreenSharing && role === 'interviewer' && (
        <div className="screen-share-preview">
          <div className="screen-share-badge">📺 Screen Share Active</div>
          <video ref={screenShareRef} autoPlay muted playsInline className="screen-share-video" />
        </div>
      )}

      {isScreenSharing && role === 'applicant' && (
        <div className="screen-share-preview">
          <div className="screen-share-badge">📺 Sharing Screen</div>
          <video ref={screenShareRef} autoPlay muted playsInline className="screen-share-video" />
        </div>
      )}
    </div>
  );
};

export default VideoPanel;
