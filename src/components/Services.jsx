import React from 'react';
import './Services.css';
import dashboardBg from '../assets/dashboard-bg.png';

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="section-header animate-fade-up">
        <h2>Unmatched Hiring <span className="text-gradient">Services</span></h2>
        <p>HireBridge provides a range of services designed to support organizations at every stage of the hiring process.</p>
      </div>

      <div className="services-content">
        <div className="services-list">
          <div className="service-item animate-fade-up delay-100">
            <div className="service-icon glow-purple">01</div>
            <div>
              <h3>Interview Hosting</h3>
              <p>Seamless virtual interviews with stable and user-friendly interfaces. Organizations can conduct interviews without relying on multiple disconnected tools.</p>
            </div>
          </div>
          
          <div className="service-item animate-fade-up delay-200">
            <div className="service-icon glow-purple">02</div>
            <div>
              <h3>Structured Evaluation</h3>
              <p>Assess candidates effectively with organized systems. Each evaluation is recorded and organized for easy access and comparison across interviewers.</p>
            </div>
          </div>

          <div className="service-item animate-fade-up delay-300">
            <div className="service-icon glow-purple">03</div>
            <div>
              <h3>Automated Reporting & Tracking</h3>
              <p>Generates comprehensive summaries immediately after each interview. We provide performance tracking tools to monitor outcomes and trends over time for better alignment.</p>
            </div>
          </div>
        </div>

        <div className="services-visual animate-fade-up delay-400">
          <img src={dashboardBg} alt="Dashboard Abstract UI" className="glass-panel float-img" />
        </div>
      </div>
    </section>
  );
};

export default Services;
