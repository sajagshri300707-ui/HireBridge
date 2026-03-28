import React, { useState, useRef } from 'react';
import './Carousel.css';

const slides = [
  {
    title: "Structured Interviews",
    description: "Conduct interviews with a clear, guided structure that ensures consistency across candidates. Eliminate unorganized conversations and focus on relevant evaluation criteria. Improve hiring quality by standardizing every stage of the interview process."
  },
  {
    title: "Real-Time Evaluation",
    description: "Evaluate candidates instantly during the interview with structured scoring tools. Capture feedback while it’s fresh, eliminating the need to recall details later. Make faster, more confident hiring decisions with live insights."
  },
  {
    title: "AI Assistance",
    description: "Receive intelligent suggestions for follow-up questions based on candidate responses. Identify weak or incomplete answers with real-time AI analysis. Enhance interviewer performance with smart guidance throughout the process."
  },
  {
    title: "Instant Reports",
    description: "Automatically generate detailed interview summaries immediately after completion. Consolidate scores, feedback, and observations into one structured report. Share hiring decisions quickly with your team using ready-to-use insights."
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
       const cardWidth = scrollRef.current.children[0].clientWidth;
       scrollRef.current.scrollTo({
         left: index * (cardWidth + 24), // cardWidth + gap
         behavior: 'smooth'
       });
       setCurrentIndex(index);
    }
  };

  const handleScroll = (e) => {
    if(!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0].clientWidth;
    const scrollPosition = e.target.scrollLeft;
    const activeIndex = Math.round(scrollPosition / cardWidth);
    setCurrentIndex(activeIndex);
  };

  return (
    <section className="carousel-section" id="features-preview">
      <div className="carousel-header">
        <h2>Features at a Glance</h2>
        <p>Explore what makes HireBridge the ultimate hiring platform.</p>
      </div>

      <div className="carousel-container glass-panel">
        <div 
          className="carousel-track" 
          ref={scrollRef} 
          onScroll={handleScroll}
        >
          {slides.map((slide, index) => (
            <div className="carousel-card glass-panel" key={index}>
              <div className="card-glow"></div>
              <h3 className="card-title text-gradient">{slide.title}</h3>
              <p className="card-desc">{slide.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`dot ${currentIndex === index ? 'active glow-purple' : ''}`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
