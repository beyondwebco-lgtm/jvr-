'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { GALLERY_ITEMS } from '@/data/gallery';

export default function GallerySection() {
  const scrollRef = useRef(null);
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

  const scrollToCard = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('[data-gallery-card]');
    const target = cards[index];
    if (!target) return;
    container.scrollTo({
      left: target.offsetLeft - container.offsetLeft,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  }, []);

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
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('[data-gallery-card]'));
    if (!cards.length) return;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft - container.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(scrollCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  };

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-concrete-grid border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Site Operations"
            title="Our Work Gallery"
            subtitle="Scroll or tap the arrows to browse real site excavation, rock cutting, and earthwork photographs."
            theme="light"
          />

          {/* Tap Scroll Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => scrollByStep('prev')}
              className="inline-flex items-center justify-center p-3 rounded-sm bg-white border border-slate-300 hover:bg-[#11171e] hover:text-amber-400 hover:border-[#11171e] text-slate-800 shadow-xs transition-colors cursor-pointer"
              aria-label="Scroll gallery left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep('next')}
              className="inline-flex items-center justify-center p-3 rounded-sm bg-white border border-slate-300 hover:bg-[#11171e] hover:text-amber-400 hover:border-[#11171e] text-slate-800 shadow-xs transition-colors cursor-pointer"
              aria-label="Scroll gallery right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Mode Track */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-5 [scrollbar-width:thin] [scrollbar-color:#f59e0b_#e2e8f0]"
          >
            {GALLERY_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                data-gallery-card
                onClick={() => setLightboxIndex(idx)}
                className="group relative shrink-0 w-[88%] sm:w-[70%] md:w-[56%] lg:w-[48%] snap-start text-left bg-slate-900 rounded-sm overflow-hidden border border-slate-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Subtle bottom gradient for caption readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"
                  aria-hidden="true"
                />

                <div className="absolute top-4 right-4 p-2.5 rounded-sm bg-black/60 text-white opacity-90 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
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
            ))}
          </div>

          {/* Slide Dots & Counter */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {GALLERY_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Scroll to ${item.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {activeIndex + 1} / {GALLERY_ITEMS.length} &bull; Scroll, tap arrows, or tap photo
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-sm bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {GALLERY_ITEMS.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full space-y-4">
            <div className="relative rounded-sm overflow-hidden border border-slate-700 bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full max-h-[78vh] object-contain mx-auto"
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
