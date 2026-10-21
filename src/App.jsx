import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ResumePage from './components/ResumePage';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { BackgroundOrganicBlobs, WaveDivider, FooterWaveDivider } from './components/AbstractDecorations';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'resume'

  useEffect(() => {
    const handleLocationChange = () => {
      const hash = (window.location.hash || '').toLowerCase();
      if (hash === '#resume' || hash === '#/resume' || hash === '#resume-page') {
        setCurrentPage('resume');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigate = (page, sectionId = null) => {
    if (page === 'resume') {
      setCurrentPage('resume');
      window.location.hash = '#resume';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (sectionId && sectionId !== 'home') {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else {
        window.location.hash = '#home';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="portfolio-app">
      {/* Organic Multicolored Abstract Blobs in Background */}
      <BackgroundOrganicBlobs />

      {/* Main Sticky Navigation Bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      {currentPage === 'resume' ? (
        <main id="main-content" role="main">
          <ResumePage onNavigate={handleNavigate} />
        </main>
      ) : (
        <main id="main-content" role="main">
          {/* Section 1: Home — Data Analyst | AI Developer | Aspiring Data Scientist */}
          <Hero onOpenResume={() => handleNavigate('resume')} />

          {/* Wave Divider into About */}
          <WaveDivider variant="coral-purple" />

          {/* Section 2: About Me */}
          <About />

          {/* Section 3: Skills (6 Categorized Resume Groups) */}
          <Skills />

          {/* Flowing Wave into Experience */}
          <WaveDivider variant="teal-yellow" />

          {/* Section 4: Experience (5 Internships + 5 Company Projects) */}
          <Experience />

          {/* Wave into Projects */}
          <WaveDivider variant="default" flip={true} />

          {/* Section 5: Projects (All 10 Resume Projects with Mockups & Modals) */}
          <Projects />

          {/* Wave into Certifications & Achievements */}
          <WaveDivider variant="coral-purple" />

          {/* Section 6: Certifications (4 Verified Credentials) */}
          <Certifications />

          {/* Section 7: Key Achievements (Symposium, 3D Graphics, Webinars) */}
          <Achievements />

          {/* Wave into Contact */}
          <WaveDivider variant="teal-yellow" flip={true} />

          {/* Section 8: Contact Section */}
          <Contact onOpenResume={() => handleNavigate('resume')} />
        </main>
      )}

      {/* Organic Wave Transition into Dark Navy Footer */}
      <FooterWaveDivider />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Back to Top Control */}
      <BackToTop />
    </div>
  );
}
