import React, { useState, useEffect, useRef } from 'react';
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
import PresentationSlideControls from './components/PresentationSlideControls';
import FuturisticAmbientGlow from './components/FuturisticAmbientGlow';
import { BackgroundOrganicBlobs } from './components/AbstractDecorations';

export const SLIDES = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
  { id: 'resume', label: 'Resume' },
];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Sync with URL hash
  useEffect(() => {
    const handleHash = () => {
      const rawHash = (window.location.hash || '').replace('#', '').toLowerCase();
      if (!rawHash) return;
      const idx = SLIDES.findIndex(
        (s) => s.id === rawHash || (rawHash === 'resume-page' && s.id === 'resume')
      );
      if (idx !== -1) {
        setCurrentSlideIndex(idx);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
    };
  }, []);

  const goToSlide = (index) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    setCurrentSlideIndex(clamped);
    const targetHash = `#${SLIDES[clamped].id}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  };

  const goToSlideById = (id) => {
    const idx = SLIDES.findIndex((s) => s.id === id);
    if (idx !== -1) {
      goToSlide(idx);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  };

  // Keyboard left and right arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || document.activeElement?.isContentEditable) {
        return;
      }
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  // Touch swipe gestures
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
        if (deltaX < 0) {
          goToNextSlide();
        } else {
          goToPrevSlide();
        }
      }
    }
  };

  return (
    <div className="portfolio-app presentation-app">
      {/* Background Decorative Blobs & Glowing Wells */}
      <BackgroundOrganicBlobs />
      <FuturisticAmbientGlow />

      {/* Sticky Top Navigation Bar */}
      <Navbar
        activeSlideId={SLIDES[currentSlideIndex].id}
        onNavigate={goToSlideById}
      />

      {/* Full-Screen Horizontal Slide Deck Viewport */}
      <main
        id="main-presentation"
        className="presentation-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="main"
      >
        <div
          className="presentation-track"
          style={{
            transform: `translateX(-${currentSlideIndex * 100}vw)`,
            transition: 'transform 0.52s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          {/* Slide 0: Home */}
          <section id="slide-home" className="presentation-slide" aria-label="Home Section">
            <Hero onNavigate={goToSlideById} onOpenResume={() => goToSlideById('resume')} />
          </section>

          {/* Slide 1: About */}
          <section id="slide-about" className="presentation-slide" aria-label="About Section">
            <About onNavigate={goToSlideById} />
          </section>

          {/* Slide 2: Skills */}
          <section id="slide-skills" className="presentation-slide" aria-label="Skills Section">
            <Skills onNavigate={goToSlideById} />
          </section>

          {/* Slide 3: Experience */}
          <section id="slide-experience" className="presentation-slide" aria-label="Experience Section">
            <Experience onNavigate={goToSlideById} />
          </section>

          {/* Slide 4: Projects */}
          <section id="slide-projects" className="presentation-slide" aria-label="Projects Section">
            <Projects onNavigate={goToSlideById} />
          </section>

          {/* Slide 5: Certifications */}
          <section id="slide-certifications" className="presentation-slide" aria-label="Certifications Section">
            <Certifications onNavigate={goToSlideById} />
          </section>

          {/* Slide 6: Achievements */}
          <section id="slide-achievements" className="presentation-slide" aria-label="Achievements Section">
            <Achievements onNavigate={goToSlideById} />
          </section>

          {/* Slide 7: Contact */}
          <section id="slide-contact" className="presentation-slide" aria-label="Contact Section">
            <Contact onOpenResume={() => goToSlideById('resume')} onNavigate={goToSlideById} />
          </section>

          {/* Slide 8: Resume */}
          <section id="slide-resume" className="presentation-slide" aria-label="Resume Section">
            <ResumePage onNavigate={goToSlideById} />
          </section>
        </div>
      </main>

      {/* Floating Presentation Deck Controls (Left/Right Arrows & Bottom Dots) */}
      <PresentationSlideControls
        slides={SLIDES}
        currentIndex={currentSlideIndex}
        onSelectSlide={goToSlide}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
      />
    </div>
  );
}
