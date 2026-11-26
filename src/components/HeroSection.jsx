import Link from 'next/link';
import { ArrowRight, PhoneCall, ShieldCheck, MapPin, FileCheck2 } from 'lucide-react';
import { COMPANY_INFO } from '@/data/company';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4.5rem)] md:min-h-[calc(100vh-7rem)] flex flex-col justify-between bg-[#0b1015] text-white overflow-hidden"
    >
      {/* Full-bleed Excavator Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-excavator.webp"
          alt="Tata Hitachi PC210 style hydraulic excavator operating at a large earth excavation site"
          className="w-full h-full object-cover object-center scale-[1.01]"
          fetchPriority="high"
        />
        {/* Multi-layered industrial dark gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#090d12]/95 via-[#0b1016]/85 to-[#0b1016]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-[#090d12]/45"
          aria-hidden="true"
        />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-12 pb-10 sm:pt-18 sm:pb-14 lg:pt-24 lg:pb-18 flex-1 flex items-center">
        <div className="max-w-3xl space-y-5 sm:space-y-6">
          {/* Eyebrow Brand Tag */}
          <div className="animate-fade-up inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm bg-amber-500/15 border border-amber-500/40 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" aria-hidden="true" />
            <span className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-amber-400">
              {COMPANY_INFO.branding}
            </span>
          </div>

          {/* Primary Heading */}
          <div className="space-y-2.5 sm:space-y-3 animate-fade-up-delay-1">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] uppercase">
              {COMPANY_INFO.shortUpperName}
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-amber-400 leading-snug">
              {COMPANY_INFO.supportingHeading}
            </p>
          </div>

          {/* Description & Tagline */}
          <div className="space-y-2.5 sm:space-y-3 animate-fade-up-delay-2 border-l-4 border-amber-500 pl-4 sm:pl-5 py-1">
            <p className="text-sm sm:text-lg text-slate-200 leading-relaxed">
              {COMPANY_INFO.heroDescription}
            </p>
            <p className="text-xs sm:text-base font-semibold italic text-slate-300">
              &ldquo;{COMPANY_INFO.tagline}&rdquo;
            </p>
          </div>

          {/* Hero Action Buttons */}
          <div className="animate-fade-up-delay-3 pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-sm transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-sm backdrop-blur-xs transition-all duration-200"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Corporate Fact Strip (Strictly Verified Facts Only) */}
      <div className="relative z-10 bg-[#0d131a]/90 backdrop-blur-md border-t border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="flex items-center gap-3.5 md:pr-4">
            <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Contractor Registration
              </p>
              <p className="text-sm font-bold text-white">{COMPANY_INFO.registration.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-3.5 md:pt-0 md:px-6">
            <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
              <FileCheck2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Tender Eligibility (Per Certificate)
              </p>
              <p className="text-sm font-bold text-white">
                {COMPANY_INFO.registration.tenderEligibility}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-3.5 md:pt-0 md:pl-6">
            <div className="p-2.5 rounded-sm bg-amber-500/15 text-amber-400 shrink-0">
              <MapPin className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                Base of Operations
              </p>
              <p className="text-sm font-bold text-white">{COMPANY_INFO.address.cityState}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
