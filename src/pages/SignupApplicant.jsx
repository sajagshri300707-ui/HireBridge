import React, { useEffect } from 'react';
import { SignUp } from '@clerk/clerk-react';
import { setRole } from '../utils/storage';
import './Auth.css';

const SignupApplicant = () => {
  useEffect(() => {
    setRole('applicant');
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-glow top-left"></div>
        <div className="gradient-glow bottom-right"></div>
      </div>
      <div className="auth-container glass-panel animate-fade-up">
        <SignUp 
          path="/signup/applicant"
          routing="path"
          signInUrl="/login"
          forceRedirectUrl="/applicant-dashboard"
        />
      </div>
    </div>
  );
};

export default SignupApplicant;

