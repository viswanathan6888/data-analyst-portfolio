import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

/**
 * SectionCarousel
 * Reusable, responsive horizontal content carousel for portfolio sections.
 * Features:
 * - Circular, vertically-centered Left & Right arrow buttons with hover effects.
 * - Smooth CSS transform page sliding.
 * - Responsive items per view (desktop, tablet, mobile).
 * - Mobile touch swipe gestures.
 * - Page progress dots and counter badge.
 * - Strict boundary enforcement (disabled states on first & last page).
 */
export default function SectionCarousel({
  items = [],
  renderItem,
  itemsPerPage = { desktop: 3, tablet: 2, mobile: 1 },
  ariaLabel = 'Content Carousel',
  carouselId = 'section-carousel',
  gap = '1.25rem',
  showPagination = true
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(itemsPerPage.desktop || 3);

  // Responsive calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(itemsPerPage.mobile || 1);
      } else if (width < 992) {
        setItemsPerView(itemsPerPage.tablet || 2);
      } else {
        setItemsPerView(itemsPerPage.desktop || 3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerView));

  // Reset to valid page if view changes
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [totalPages, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;

      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
  };

  // Divide items into pages
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerView) {
    pages.push(items.slice(i, i + itemsPerView));
  }

  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;
  const hasMultiplePages = totalPages > 1;

  return (
    <div
      className="section-carousel-root"
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="section-carousel-container">
        {/* Left Arrow Button */}
        {hasMultiplePages && (
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={`section-carousel-arrow carousel-arrow-left ${isFirst ? 'is-disabled' : ''}`}
            aria-label="Previous items"
            title="Previous Items"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Carousel Content Viewport */}
        <div className="section-carousel-viewport">
          <div
            className="section-carousel-track"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
              transition: 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            {pages.map((pageItems, pageIdx) => (
              <div
                key={`page-${pageIdx}`}
                className="section-carousel-page"
                style={{
                  gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
                  gap
                }}
              >
                {pageItems.map((item, itemIdx) => (
                  <div
                    key={item.id || `item-${pageIdx}-${itemIdx}`}
                    className="section-carousel-card-wrap"
                  >
                    {renderItem ? renderItem(item, pageIdx * itemsPerView + itemIdx) : item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        {hasMultiplePages && (
          <button
            type="button"
            onClick={handleNext}
            disabled={isLast}
            className={`section-carousel-arrow carousel-arrow-right ${isLast ? 'is-disabled' : ''}`}
            aria-label="Next items"
            title="Next Items"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {/* Pagination Controls & Dots */}
      {showPagination && hasMultiplePages && (
        <div className="section-carousel-pagination" aria-label="Carousel pagination">
          <div className="carousel-dots-row" role="tablist">
            {pages.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                role="tab"
                aria-selected={currentPage === idx}
                onClick={() => setCurrentPage(idx)}
                className={`carousel-pagination-dot ${currentPage === idx ? 'dot-active' : ''}`}
                aria-label={`Go to page ${idx + 1}`}
                title={`Page ${idx + 1} of ${totalPages}`}
              />
            ))}
          </div>
          <span className="carousel-counter-badge">
            {currentPage + 1} / {totalPages} ({items.length} items)
          </span>
        </div>
      )}
    </div>
  );
}
