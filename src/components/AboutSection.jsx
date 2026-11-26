import Link from 'next/link';
import { ArrowRight, Building2, UserCheck, FileBadge, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import RevealOnScroll from './RevealOnScroll';
import { COMPANY_INFO } from '@/data/company';

export default function AboutSection({ compact = false }) {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Construction Site Visual */}
          <RevealOnScroll className="lg:col-span-6 relative">
            <div className="group relative rounded-sm overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
              <img
                src="/images/about-site.webp"
                alt="Civil earthwork and land development construction site"
                className="w-full h-[260px] sm:h-[380px] lg:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                  {COMPANY_INFO.branding}
                </p>
                <p className="text-xs sm:text-base font-semibold text-slate-100">
                  Structured earth cutting, excavation, filling &amp; grading operations
                </p>
              </div>
            </div>

            {/* Offset Corner Industrial Badge (Desktop) / Compact Strip (Tablet & Mobile) */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:right-4 bg-[#11171e] text-white p-4 sm:p-5 rounded-sm shadow-xl border-l-4 border-amber-500 lg:max-w-xs">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold block">
                  Proprietor
                </span>
                <p className="text-base sm:text-lg font-extrabold text-white">{COMPANY_INFO.proprietor}</p>
                <p className="text-xs text-slate-400">
                  {COMPANY_INFO.registration.category} &bull; {COMPANY_INFO.address.cityState}
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right Column: Corporate Introduction */}
          <RevealOnScroll delay={120} className="lg:col-span-6 space-y-6">
            <SectionHeading
              eyebrow="About Our Company"
              title="About JVR Mining and Services"
              theme="light"
            />

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">JVR Mining and Services</strong> is
                an earthwork and infrastructure services company based in Hyderabad, Telangana.
              </p>
              <p>
                The company specializes in earth cutting, excavation, soil filling, land leveling,
                and heavy machinery operations.
              </p>
              <p>
                JVR focuses on providing reliable earthwork solutions for construction, land
                development, and infrastructure-related requirements.
              </p>
              <p>
                The company is registered as a{' '}
                <strong className="text-slate-900 font-semibold">
                  Class V (Civil) Contractor
                </strong>{' '}
                under the Public Health Division, Ranga Reddy, Government of Telangana, as recorded
                in the supplied registration certificate.
              </p>
            </div>

            {/* Key Corporate Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Proprietor
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {COMPANY_INFO.proprietor}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 flex items-start gap-3">
                <FileBadge className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Registration
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {COMPANY_INFO.registration.category}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Issuing Authority
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {COMPANY_INFO.registration.authorityShort}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Location
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    Shaikpet, Film Nagar, Hyderabad
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic">
              Note: {COMPANY_INFO.registration.disclaimer}
            </p>

            {compact && (
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-2 bg-[#11171e] hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-sm px-6 py-3.5 rounded-sm transition-colors duration-200"
                >
                  Read Company Profile
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#credentials"
                  className="inline-flex items-center gap-2 border border-slate-300 hover:border-amber-500 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-sm transition-colors duration-200"
                >
                  View Credentials
                </Link>
              </div>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
