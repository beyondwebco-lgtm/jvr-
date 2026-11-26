'use client';

import { useState, useEffect, useCallback } from 'react';
import { Expand, X, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '@/data/gallery';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [filteredItems.length]);

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

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-concrete-grid border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Operations Showcase"
            title="Our Work Gallery"
            subtitle="Visual overview of our core earthwork operations and heavy machinery capabilities."
            theme="light"
          />
        </div>

        {/* Honest Transparency Banner */}
        <div className="mb-8 p-4 rounded-sm bg-white border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-600">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            The photographs displayed below are representative visuals illustrating JVR Mining and
            Services&apos; operational scope and equipment categories. Actual company project site
            photographs will replace these placeholders as documented site imagery is added.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Gallery categories">
          {GALLERY_CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setActiveCategory(category);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-sm border transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#11171e] text-amber-400 border-[#11171e] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-amber-500 hover:text-slate-950'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Responsive Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              className="group relative text-left bg-slate-900 rounded-sm overflow-hidden border border-slate-200 hover:border-amber-500 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
                aria-hidden="true"
              />

              <div className="absolute top-3 right-3 p-2 rounded-sm bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="w-4 h-4" aria-hidden="true" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold leading-snug text-white">{item.title}</h3>
              </div>
            </button>
          ))}
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

          {filteredItems.length > 1 && (
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

          <div className="max-w-4xl w-full space-y-4">
            <div className="relative rounded-sm overflow-hidden border border-slate-700 bg-black">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full max-h-[75vh] object-contain mx-auto"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white px-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {activeItem.category} &bull; Representative Visual
                </span>
                <h3 className="text-lg font-bold mt-0.5">{activeItem.title}</h3>
                <p className="text-sm text-slate-300">{activeItem.caption}</p>
              </div>
              <span className="text-xs text-slate-400 shrink-0">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
