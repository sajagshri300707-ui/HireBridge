import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './Auth.css';

const SignupInterviewer = () => {
  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-glow top-left" style={{ animationDelay: '1s' }}></div>
        <div className="gradient-glow bottom-right" style={{ animationDelay: '3s' }}></div>
      </div>
      <div className="auth-container glass-panel animate-fade-up">
        <SignUp 
          path="/signup/interviewer"
          routing="path"
          signInUrl="/login"
          fallbackRedirectUrl="/interviewer-dashboard"
        />
      </div>
    </div>
  );
};

export default SignupInterviewer;
