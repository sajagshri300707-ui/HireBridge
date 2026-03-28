import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="logo">
          Hire<span className="text-gradient">Bridge</span>
        </a>
        
        <ul className="nav-links">
          <li><a href="/#home">Home</a></li>
          <li><a href="/#features">Features</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#services">Services</a></li>
        </ul>

        <div className="nav-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" className="nav-login-btn text-gradient" style={{ fontWeight: 600 }}>Log In</Link>
          <Link to="/signup/applicant">
            <button style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }} className="nav-signup-btn">
              Applicant Sign Up
            </button>
          </Link>
          <Link to="/signup/interviewer">
            <button style={{ background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(168, 85, 247, 0.3)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }} className="nav-signup-btn">
              Interviewer Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
