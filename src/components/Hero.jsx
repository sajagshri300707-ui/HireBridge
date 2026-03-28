import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="gradient-glow top-left"></div>
        <div className="gradient-glow bottom-right"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="hero-title animate-fade-up">
          Revolutionizing Hiring, <br />
          <span className="text-gradient">One Interview at a Time</span>
        </h1>
        
        <p className="hero-subtitle animate-fade-up delay-200">
          HireBridge empowers organizations with structured interviews, real-time evaluation, and smarter hiring decisions.
        </p>

        <div className="hero-cta-wrapper animate-fade-up delay-400">
           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
             <Link to="/signup/applicant">
               <button className="primary-btn glow-red cta-pulse" style={{ margin: 0 }}>
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

      <div className="hero-visual animate-fade-up delay-400">
        <img src={heroBg} alt="Abstract 3D SaaS Visual" className="floating-img glass-panel" />
      </div>
    </section>
  );
};

export default Hero;
