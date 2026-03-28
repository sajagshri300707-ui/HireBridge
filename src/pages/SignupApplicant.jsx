import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './Auth.css';

const SignupApplicant = () => {
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
          fallbackRedirectUrl="/applicant-dashboard"
        />
      </div>
    </div>
  );
};

export default SignupApplicant;
