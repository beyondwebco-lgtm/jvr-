import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function PageBanner({ eyebrow, title, description, breadcrumb }) {
  return (
    <section className="relative bg-industrial-grid text-white border-b border-slate-800 py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#090d12]/90 via-[#0e1318]/85 to-amber-500/5 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-3 sm:space-y-4">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
          <span className="text-amber-400">{breadcrumb || title}</span>
        </nav>

        {eyebrow && (
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-0.5 bg-amber-500 inline-block" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {eyebrow}
            </span>
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          {title}
        </h1>

        {description && (
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
