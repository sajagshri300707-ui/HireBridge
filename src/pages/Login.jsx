import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './Auth.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-glow top-left"></div>
        <div className="gradient-glow bottom-right"></div>
      </div>
      <div className="auth-container glass-panel animate-fade-up">
        <SignIn 
          path="/login"
          routing="path"
          signUpUrl="/signup/applicant"
        />
      </div>
    </div>
  );
};

export default Login;
