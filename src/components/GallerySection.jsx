'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Expand, X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import RevealOnScroll from './RevealOnScroll';
import { GALLERY_ITEMS } from '@/data/gallery';

export default function GallerySection() {
  const scrollRef = useRef(null);
  const animFrameRef = useRef(null);
  const programmaticScrollRef = useRef(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const cancelAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    programmaticScrollRef.current = false;
  }, []);

  useEffect(() => cancelAnimation, [cancelAnimation]);

  const scrollToCard = useCallback(
    (index) => {
      const container = scrollRef.current;
      if (!container) return;
      const cards = container.querySelectorAll('[data-gallery-card]');
      const target = cards[index];
      if (!target) return;

      cancelAnimation();

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const targetLeft = Math.max(
        0,
        Math.min(target.offsetLeft - container.offsetLeft, maxScrollLeft)
      );
      const startLeft = container.scrollLeft;
      const distance = targetLeft - startLeft;

      setActiveIndex(index);

      if (Math.abs(distance) < 2) return;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        container.scrollLeft = targetLeft;
        return;
      }

      programmaticScrollRef.current = true;
      const duration = 560;
      const startTime = performance.now();

      const easeInOutCubic = (t) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        container.scrollLeft = startLeft + distance * easeInOutCubic(progress);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          animFrameRef.current = null;
          programmaticScrollRef.current = false;
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    },
    [cancelAnimation]
  );

  const scrollByStep = useCallback(
    (direction) => {
      const nextIdx =
        direction === 'next'
          ? (activeIndex + 1) % GALLERY_ITEMS.length
          : (activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      scrollToCard(nextIdx);
    },
    [activeIndex, scrollToCard]
  );

  const handleScroll = () => {
    if (programmaticScrollRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('[data-gallery-card]'));
    if (!cards.length) return;

    const currentLeft = container.scrollLeft;
    let closestIdx = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const dist = Math.abs(currentLeft - cardLeft);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  };

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-20 lg:py-28 bg-concrete-grid border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <SectionHeading
            eyebrow="Site Operations"
            title="Our Work Gallery"
            subtitle="Use the arrow buttons or scroll horizontally to browse site excavation, rock cutting, and earthwork photographs."
            theme="light"
          />

          {/* Top Previous / Next Tap Buttons */}
          <div className="grid grid-cols-2 sm:flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={() => scrollByStep('prev')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-white border border-slate-300 hover:bg-[#11171e] hover:text-amber-400 hover:border-[#11171e] text-slate-800 text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-300 cursor-pointer"
              aria-label="Previous image"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Prev
            </button>
            <button
              type="button"
              onClick={() => scrollByStep('next')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-sm bg-[#11171e] border border-[#11171e] hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-all duration-300 cursor-pointer"
              aria-label="Next image"
            >
              Next
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Mode Track with Left/Right Overlay Arrow Buttons */}
        <RevealOnScroll className="relative group/track">
          {/* Left Floating Arrow Button */}
          <button
            type="button"
            onClick={() => scrollByStep('prev')}
            className="absolute left-2 sm:left-4 top-[42%] -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0e1318]/85 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/25 shadow-xl backdrop-blur-xs flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Previous gallery image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Floating Arrow Button */}
          <button
            type="button"
            onClick={() => scrollByStep('next')}
            className="absolute right-2 sm:right-4 top-[42%] -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0e1318]/85 hover:bg-amber-500 text-white hover:text-slate-950 border border-white/25 shadow-xl backdrop-blur-xs flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Next gallery image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={cancelAnimation}
            onWheel={cancelAnimation}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-proximity pb-5 [scrollbar-width:thin] [scrollbar-color:#f59e0b_#e2e8f0]"
          >
            {GALLERY_ITEMS.map((item, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-gallery-card
                  onClick={() => setLightboxIndex(idx)}
                  className={`group relative shrink-0 w-[86%] sm:w-[62%] md:w-[48%] lg:w-[46%] snap-start text-left bg-slate-900 rounded-sm overflow-hidden border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                    isCurrent
                      ? 'border-amber-500/80 shadow-xl opacity-100'
                      : 'border-slate-200 hover:border-amber-500 shadow-md opacity-95 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  {/* Subtle bottom gradient for caption readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <div className="absolute top-4 right-4 p-2.5 rounded-sm bg-black/60 text-white opacity-90 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <Expand className="w-4 h-4" aria-hidden="true" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                    <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Slide Dots & Counter */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Scroll to ${item.title}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {activeIndex + 1} / {GALLERY_ITEMS.length} &bull; Tap arrows or click photo to zoom
            </span>
          </div>
        </RevealOnScroll>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xs flex items-center justify-center p-4 animate-modal-in"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 rounded-sm bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors duration-300 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {GALLERY_ITEMS.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full sm:rounded-sm bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full sm:rounded-sm bg-slate-900/85 hover:bg-amber-500 hover:text-slate-950 text-white border border-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full space-y-4">
            <div className="relative rounded-sm overflow-hidden border border-slate-700 bg-black">
              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full max-h-[78vh] object-contain mx-auto animate-image-fade"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white px-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {activeItem.category}
                </span>
                <h3 className="text-lg font-bold mt-0.5">{activeItem.title}</h3>
                <p className="text-sm text-slate-300">{activeItem.caption}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
