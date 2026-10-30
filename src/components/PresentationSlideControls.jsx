import React from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

export default function PresentationSlideControls({
  slides,
  currentIndex,
  onSelectSlide,
  onPrev,
  onNext
}) {
  const currentSlide = slides[currentIndex] || slides[0];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  const prevSlideLabel = !isFirst ? slides[currentIndex - 1]?.label : null;
  const nextSlideLabel = !isLast ? slides[currentIndex + 1]?.label : null;

  return (
    <>
      {/* Vertically-Centered Left (Previous) Navigation Arrow */}
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className={`deck-arrow-btn deck-arrow-prev ${isFirst ? 'is-disabled' : ''}`}
        aria-label={isFirst ? 'First section reached' : `Go to previous section: ${prevSlideLabel}`}
        title={isFirst ? 'First section' : `Previous: ${prevSlideLabel} (← Left Arrow)`}
      >
        <ChevronLeft size={26} className="deck-arrow-icon" />
        {!isFirst && (
          <span className="deck-arrow-tooltip" aria-hidden="true">
            &larr; {prevSlideLabel}
          </span>
        )}
      </button>

      {/* Vertically-Centered Right (Next) Navigation Arrow */}
      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        className={`deck-arrow-btn deck-arrow-next ${isLast ? 'is-disabled' : ''}`}
        aria-label={isLast ? 'Last section reached' : `Go to next section: ${nextSlideLabel}`}
        title={isLast ? 'Last section' : `Next: ${nextSlideLabel} (→ Right Arrow)`}
      >
        <ChevronRight size={26} className="deck-arrow-icon" />
        {!isLast && (
          <span className="deck-arrow-tooltip" aria-hidden="true">
            {nextSlideLabel} &rarr;
          </span>
        )}
      </button>

      {/* Floating Bottom Presentation Bar & Interactive Dots */}
      <nav className="deck-bottom-bar glass-card" aria-label="Slide Deck Progress & Controls">
        {/* Slide Counter & Label */}
        <div className="deck-badge-counter">
          <span className="counter-num counter-current">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <span className="counter-sep">/</span>
          <span className="counter-num counter-total">
            {String(slides.length).padStart(2, '0')}
          </span>
          <span className="counter-slide-title">
            &bull; {currentSlide.label}
          </span>
        </div>

        {/* 9 Interactive Slide Dots */}
        <div className="deck-dots-track" role="tablist" aria-label="Slide navigation dots">
          {slides.map((s, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSlide(idx)}
                className={`deck-dot ${isActive ? 'deck-dot-active' : ''}`}
                aria-label={`Slide ${idx + 1}: ${s.label}`}
                title={`Go to ${s.label} (${idx + 1}/${slides.length})`}
              >
                <span className="deck-dot-inner" />
              </button>
            );
          })}
        </div>

        {/* Keyboard Shortcut Hints for Desktop Users */}
        <div className="deck-key-hints" aria-hidden="true" title="Use Keyboard Arrow Keys to Navigate">
          <span className="key-cap">&larr;</span>
          <span className="key-label">or</span>
          <span className="key-cap">&rarr;</span>
        </div>
      </nav>
    </>
  );
}
