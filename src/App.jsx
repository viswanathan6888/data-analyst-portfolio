import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ResumeSection from './components/ResumeSection';

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

      {/* Main Sticky Navigation Bar */}
      <Navbar onOpenResume={() => setResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main id="main-content" role="main">
        {/* Section 1: Home — Data Analyst | AI Developer | Aspiring Data Scientist */}
        <Hero onOpenResume={() => setResumeModalOpen(true)} />

        {/* Section 2: About Me */}
        <About />

        {/* Section 3: Skills (6 Categorized Resume Groups) */}
        <Skills />

        {/* Section 4: Experience (5 Internships + 5 Company Projects) */}
        <Experience />

        {/* Section 5: Projects (All 10 Resume Projects with Mockups & Modals) */}
        <Projects />

        {/* Section 6: Certifications (4 Verified Credentials) */}
        <Certifications />

        {/* Section 7: Key Achievements (Symposium, 3D Graphics, Webinars) */}
        <Achievements />

        {/* Section 8: Contact Section */}
        <Contact onOpenResume={() => setResumeModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Control */}
      <BackToTop />

      {/* Modal View for Resume when triggered via Hero / Navbar / Contact */}
      {resumeModalOpen && (
        <ResumeSection
          isModal={true}
          onClose={() => setResumeModalOpen(false)}
        />
      )}
    </div>
  );
}
