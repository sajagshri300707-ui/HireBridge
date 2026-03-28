import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './Auth.css';

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-glow top-left"></div>
        <div className="gradient-glow bottom-right"></div>
      </div>
      <div className="auth-container glass-panel animate-fade-up">
        {/* Render standard Clerk SignUp without routing paths to simplify issues */}
        <SignUp />
      </div>
    </div>
  );
};

export default Signup;
