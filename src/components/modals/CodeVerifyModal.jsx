import React, { useState, useRef, useEffect } from 'react';
import './Modal.css';

const CodeVerifyModal = ({ isOpen, onClose, onVerify }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (!code) {
      setError('Please enter your interviewer code');
      return;
    }
    if (code === '123456') {
      onVerify();
    } else {
      setError('Invalid interviewer code. Please try again.');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setCode('');
        inputRef.current?.focus();
      }, 600);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleVerify();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-box ${shake ? 'modal-shake' : ''}`}>
        <div className="modal-icon">🔐</div>
        <h2 className="modal-title">Interviewer Verification</h2>
        <p className="modal-subtitle">
          Enter your unique interviewer access code to start the session
        </p>

        <div className="code-input-wrapper">
          <input
            ref={inputRef}
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder="••••••"
            className="code-input"
            autoComplete="off"
            maxLength={6}
          />
        </div>

        {error && <p className="modal-error">{error}</p>}

        <button className="modal-primary-btn" onClick={handleVerify}>
          Verify &amp; Start Interview
        </button>
        <button className="modal-secondary-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CodeVerifyModal;
