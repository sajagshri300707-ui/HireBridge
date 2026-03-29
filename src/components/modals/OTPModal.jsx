import React, { useState, useRef, useEffect } from 'react';
import './Modal.css';

const OTPModal = ({ isOpen, onClose, onVerify, candidateName }) => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '']);
      setError('');
      setCountdown(60);
      setCanResend(false);
      startCountdown();
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
    return () => clearInterval(timerRef.current);
  }, [isOpen]);

  const startCountdown = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setDigits(['', '', '', '']);
    setError('');
    startCountdown();
    inputRefs.current[0]?.focus();
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError('');
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const next = [...digits];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    inputRefs.current[Math.min(text.length, 3)]?.focus();
  };

  const handleVerify = () => {
    const otp = digits.join('');
    if (otp.length < 4) {
      setError('Please enter all 4 digits');
      return;
    }
    if (otp === '1111') {
      onVerify();
    } else {
      setError('Invalid OTP. Please try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setDigits(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-box ${shake ? 'modal-shake' : ''}`}>
        <div className="modal-icon">📧</div>
        <h2 className="modal-title">Verify Your Identity</h2>
        <p className="modal-subtitle">
          OTP sent to your registered email
          {candidateName && <strong> ({candidateName})</strong>}
        </p>

        <div className="otp-inputs" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`otp-digit ${d ? 'otp-digit--filled' : ''}`}
            />
          ))}
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="otp-timer">
          {canResend ? (
            <button className="otp-resend-btn" onClick={handleResend}>
              Resend OTP
            </button>
          ) : (
            <span>
              Resend in <strong>{countdown}s</strong>
            </span>
          )}
        </div>

        <button className="modal-primary-btn" onClick={handleVerify}>
          Verify &amp; Join Interview
        </button>
        <button className="modal-secondary-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OTPModal;
