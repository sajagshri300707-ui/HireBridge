import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        <div className="about-content animate-slide-left">
          <h2>Transforming How <br/><span className="text-gradient">Interviews Are Conducted</span></h2>
          <div className="about-text">
            <p>HireBridge was created with the vision of transforming how interviews are conducted in the modern digital world. Traditional interview processes often lack structure, consistency, and proper evaluation methods. This leads to inefficient hiring decisions and missed opportunities for both organizations and candidates.</p>
            <p>Our goal is to bridge the gap between interviewers and candidates through seamless interaction and advanced tools. We believe that every candidate deserves a fair and well-organized evaluation process. At the same time, interviewers need systems that simplify their workflow and enhance decision-making.</p>
            <p>By integrating real-time evaluation and automated reporting, we eliminate unnecessary manual effort. Our platform embraces innovation by incorporating AI-driven insights, ensuring that decisions are not only fast but also informed and reliable. HireBridge is not just a tool, but a step toward smarter and more efficient hiring practices.</p>
          </div>
        </div>

        <div className="about-visual animate-fade-up delay-200">
           {/* Pure CSS Visual construct to match the SaaS Theme */}
           <div className="glass-panel 3d-card-wrapper">
             <div className="abstract-shape shape-1"></div>
             <div className="abstract-shape shape-2"></div>
             <div className="abstract-shape shape-3"></div>
             <div className="glass-overlay">
                <h3>Built for the Future of Recruitment</h3>
                <p>Scaling alongside growing organizations to redefine hiring impact.</p>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;
