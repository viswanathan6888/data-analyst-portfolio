import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

export default function App() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <div className="portfolio-app">
      {/* Ambient Radial Glass Orbs & Grid in Background */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb-1" />
        <div className="ambient-orb-2" />
        <div className="ambient-orb-3" />
        <div className="ambient-grid" />
      </div>

      {/* Main Navigation Bar */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content" role="main">
        {/* Section 1: Home — Data Analyst | AI Developer */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* Section 2: About Me */}
        <About />

        {/* Section 3: Skills */}
        <Skills />

        {/* Section 4: Work Experience */}
        <Experience />

        {/* Section 5: Projects */}
        <Projects />

        {/* Section 6: Contact section */}
        <Contact onOpenResume={() => setResumeModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Control */}
      <BackToTop />

      {/* Modal View for Resume if triggered via Navbar / Hero / Contact */}
      {resumeModalOpen && (
        <ResumeSection
          isModal={true}
          onClose={() => setResumeModalOpen(false)}
        />
      )}
    </div>
  );
}
