'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import JvrLogo from './JvrLogo';
import { COMPANY_INFO, NAV_LINKS } from '@/data/company';

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/' || pathname === '';
    return pathname?.startsWith(href.replace(/\/$/, ''));
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* Corporate Top Strip (Tablet & Desktop) */}
      <div className="hidden md:block bg-[#0e1318] border-b border-slate-800 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-6 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              {COMPANY_INFO.registration.category}
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-400 truncate">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" aria-hidden="true" />
              Shaikpet, Film Nagar, {COMPANY_INFO.address.cityState}
            </span>
          </div>
          <div className="flex items-center gap-4 lg:gap-5 text-slate-400 shrink-0">
            <span>
              Proprietor:{' '}
              <strong className="text-slate-200 font-semibold">{COMPANY_INFO.proprietor}</strong>
            </span>
            <span className="hidden xl:inline text-slate-600">|</span>
            <span className="hidden xl:inline text-slate-300">{COMPANY_INFO.branding}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-18 sm:h-20 lg:h-22 flex items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded shrink-0"
          aria-label="JVR Mining and Services Home"
        >
          <JvrLogo theme="light" size="md" className="!h-12 sm:!h-14 lg:!h-16" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-bold tracking-wide transition-colors duration-200 group ${
                  active ? 'text-orange-600' : 'text-slate-800 hover:text-orange-600'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-3.5 right-3.5 bottom-0.5 h-0.5 bg-orange-500 transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 bg-[#11171e] hover:bg-orange-500 text-white hover:text-slate-950 font-bold text-sm px-5 py-2.5 rounded-sm transition-all duration-200 shadow-sm"
          >
            Request Quote
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-sm text-slate-800 hover:text-orange-600 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-5 space-y-2 shadow-2xl max-h-[calc(100vh-4.5rem)] overflow-y-auto animate-drawer-in">
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-sm text-sm font-bold tracking-wide transition-colors ${
                    active
                      ? 'bg-orange-50 text-orange-600 border-l-2 border-orange-500'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-orange-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 mt-3 border-t border-slate-200 flex flex-col gap-3">
            <div className="text-xs text-slate-600 px-2 space-y-1">
              <p className="text-orange-600 font-semibold">{COMPANY_INFO.registration.category}</p>
              <p>Proprietor: {COMPANY_INFO.proprietor}</p>
            </div>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-5 py-3 rounded-sm transition-colors"
            >
              Request Earthwork Enquiry
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
