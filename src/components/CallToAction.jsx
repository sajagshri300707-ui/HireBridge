import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-container glass-panel animate-fade-up">
        <h2 className="cta-title">Ready to Transform Your Hiring?</h2>
        <p className="cta-subtitle">Join thousands of organizations using HireBridge to make smarter, faster, and fairer hiring decisions.</p>
        
        <div className="cta-actions">
           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
             <Link to="/signup/applicant">
               <button className="primary-btn glow-red cta-pulse-large" style={{ margin: 0 }}>
                 Sign Up as Applicant
               </button>
             </Link>
             <Link to="/signup/interviewer">
               <button className="primary-btn" style={{ margin: 0, backgroundColor: 'var(--accent-purple-start)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}>
                 Sign Up as Interviewer
               </button>
             </Link>
           </div>
          <p className="login-text">
            Already have an account? <Link to="/login" className="login-link text-gradient">Log In</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
