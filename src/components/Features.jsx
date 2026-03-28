import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="section-header animate-fade-up">
        <h2>Comprehensive Tools for <span className="text-gradient">Smarter Hiring</span></h2>
        <p>HireBridge offers a comprehensive set of features designed to simplify and enhance the hiring process.</p>
      </div>

      <div className="features-grid">
        <div className="feature-block animate-fade-up delay-100">
          <h3>Structured Interview Flows</h3>
          <p>Our platform introduces structured interview flows that ensure every candidate is evaluated fairly and consistently. Interviewers can follow predefined stages, reducing confusion and maintaining focus throughout the session.</p>
        </div>

        <div className="feature-block animate-fade-up delay-200">
          <h3>Real-Time Evaluation System</h3>
          <p>The real-time evaluation system allows interviewers to rate candidates instantly across multiple parameters. This eliminates the need for post-interview recollection and improves decision accuracy.</p>
        </div>

        <div className="feature-block animate-fade-up delay-300">
          <h3>Collaborative Panels</h3>
          <p>HireBridge supports collaborative interview panels, enabling multiple interviewers to join and assess simultaneously. Each interviewer can provide independent feedback, which is then aggregated into a unified evaluation.</p>
        </div>

        <div className="feature-block animate-fade-up delay-400">
          <h3>AI-Powered Assistance</h3>
          <p>The platform integrates AI-powered assistance to guide interviewers with smart suggestions and insights. This helps in asking better questions and identifying gaps in candidate responses.</p>
        </div>

        <div className="feature-block animate-fade-up delay-100">
          <h3>Automated Report Generation</h3>
          <p>Automated report generation transforms raw interview data into structured summaries within seconds. These reports include scores, feedback, and actionable insights for decision-making.</p>
        </div>

        <div className="feature-block animate-fade-up delay-200">
          <h3>Seamless & Secure Experience</h3>
          <p>The system ensures a seamless user experience with an intuitive and responsive interface. Security and reliability are prioritized to maintain data integrity and confidentiality.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
