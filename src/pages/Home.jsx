import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import Features from '../components/Features';
import About from '../components/About';
import Services from '../components/Services';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

function Home() {
  useEffect(() => {
    // Intersection Observer to trigger scroll animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-slide-left');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Carousel />
        <Features />
        <About />
        <Services />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

export default Home;
