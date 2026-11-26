import Link from 'next/link';
import { MapPin, User, ShieldCheck, ArrowRight, Globe, Share2 } from 'lucide-react';
import JvrLogo from './JvrLogo';
import { COMPANY_INFO } from '@/data/company';
import { SERVICES } from '@/data/services';

export default function Footer() {
  const socialEntries = [
    { label: 'LinkedIn', href: COMPANY_INFO.socialLinks.linkedin },
    { label: 'Instagram', href: COMPANY_INFO.socialLinks.instagram },
    { label: 'Facebook', href: COMPANY_INFO.socialLinks.facebook },
    { label: 'YouTube', href: COMPANY_INFO.socialLinks.youtube },
  ];

  return (
    <footer className="bg-[#090d11] text-slate-300 border-t border-slate-800">
      {/* Subtle industrial top accent strip */}
      <div className="h-1.5 w-full industrial-accent-bar" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-5">
            <JvrLogo theme="dark" size="lg" />
            <p className="text-sm text-amber-400 font-semibold leading-relaxed">
              &ldquo;{COMPANY_INFO.tagline}&rdquo;
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              {COMPANY_INFO.branding} — delivering reliable earth cutting, excavation, soil
              filling, land leveling, and heavy machinery services in Hyderabad, Telangana.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
              <span>{COMPANY_INFO.registration.category}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-amber-500 inline-block" aria-hidden="true" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about/' },
                { label: 'Services', href: '/services/' },
                { label: 'Machinery', href: '/machinery/' },
                { label: 'Projects & Capabilities', href: '/projects/' },
                { label: 'Gallery', href: '/gallery/' },
                { label: 'Contact Us', href: '/contact/' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" aria-hidden="true" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-amber-500 inline-block" aria-hidden="true" />
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/#${service.id}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors block"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Address */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-amber-500 inline-block" aria-hidden="true" />
              Contact Information
            </h3>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-amber-500 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500 block">
                    Proprietor
                  </span>
                  <span className="text-slate-200 font-medium">{COMPANY_INFO.proprietor}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {COMPANY_INFO.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-slate-500 block mb-2.5">
                Social & Updates
              </span>
              <div className="flex flex-wrap gap-2">
                {socialEntries.map((social) =>
                  social.href ? (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-amber-500 hover:text-slate-950 border border-slate-800 rounded-sm transition-colors"
                    >
                      <Share2 className="w-3 h-3" aria-hidden="true" />
                      {social.label}
                    </a>
                  ) : (
                    <Link
                      key={social.label}
                      href="/contact/"
                      title={`${social.label} link pending update`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900/70 text-slate-400 hover:text-amber-400 border border-slate-800 rounded-sm transition-colors"
                    >
                      <Globe className="w-3 h-3" aria-hidden="true" />
                      {social.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-800/90 bg-[#06090c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {COMPANY_INFO.copyrightYear} {COMPANY_INFO.officialName}. All Rights Reserved.
          </p>
          <p className="text-center sm:text-right">
            {COMPANY_INFO.shortUpperName} &bull; {COMPANY_INFO.address.cityState}
          </p>
        </div>
      </div>
    </footer>
  );
}
