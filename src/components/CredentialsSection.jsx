'use client';

import { useState } from 'react';
import {
  Building2,
  User,
  ShieldCheck,
  Landmark,
  Calendar,
  IndianRupee,
  MapPin,
  FileText,
  ExternalLink,
  AlertCircle,
  X,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { COMPANY_INFO } from '@/data/company';

const CREDENTIAL_CARDS = [
  {
    label: 'Company Name',
    value: COMPANY_INFO.officialName,
    icon: Building2,
  },
  {
    label: 'Proprietor',
    value: COMPANY_INFO.proprietor,
    icon: User,
  },
  {
    label: 'Registration Category',
    value: COMPANY_INFO.registration.category,
    icon: ShieldCheck,
  },
  {
    label: 'Registration Authority',
    value: COMPANY_INFO.registration.authorityShort,
    subvalue: 'Executive Engineer, Public Health Division, Ranga Reddy',
    icon: Landmark,
  },
  {
    label: 'Registration Date',
    value: COMPANY_INFO.registration.orderDate,
    icon: Calendar,
  },
  {
    label: 'Tender Eligibility',
    value: COMPANY_INFO.registration.tenderEligibility,
    icon: IndianRupee,
  },
  {
    label: 'Location',
    value: `${COMPANY_INFO.address.cityState}.`,
    icon: MapPin,
  },
];

export default function CredentialsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkingPdf, setCheckingPdf] = useState(false);

  const handleViewCertificate = async () => {
    setCheckingPdf(true);
    try {
      const res = await fetch(COMPANY_INFO.registration.certificatePdfPath, {
        method: 'HEAD',
      });
      if (res.ok) {
        window.open(COMPANY_INFO.registration.certificatePdfPath, '_blank', 'noopener,noreferrer');
      } else {
        setModalOpen(true);
      }
    } catch {
      setModalOpen(true);
    } finally {
      setCheckingPdf(false);
    }
  };

  return (
    <section
      id="credentials"
      className="py-16 sm:py-20 lg:py-28 bg-industrial-grid text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <SectionHeading
            eyebrow="Official Contractor Profile"
            title="Our Company Credentials"
            subtitle="Registered contractor details recorded from the supplied registration certificate."
            theme="dark"
          />

          <button
            type="button"
            onClick={handleViewCertificate}
            disabled={checkingPdf}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-slate-950 font-extrabold text-sm px-6 py-4 rounded-sm transition-all duration-200 shadow-lg shadow-amber-500/15 shrink-0 cursor-pointer"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            {checkingPdf ? 'Opening Certificate...' : 'View Registration Certificate'}
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Credentials Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CREDENTIAL_CARDS.map((card, index) => {
            const Icon = card.icon;
            const isLastWide = index === CREDENTIAL_CARDS.length - 1;
            return (
              <div
                key={card.label}
                className={`bg-[#171e26] border border-slate-800 hover:border-amber-500/60 rounded-sm p-6 transition-all duration-200 flex flex-col justify-between ${
                  isLastWide ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    {card.label}
                  </span>
                  <div className="p-2 rounded-sm bg-slate-900 border border-slate-800 text-amber-400">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {card.value}
                  </p>
                  {card.subvalue && (
                    <p className="text-xs text-slate-400 mt-1.5">{card.subvalue}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Disclaimer */}
        <div className="mt-8 p-4 sm:p-5 rounded-sm bg-[#121820] border border-slate-800 flex items-start gap-3.5 text-sm text-slate-300">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong className="text-white font-semibold">Verification Notice: </strong>
            {COMPANY_INFO.registration.disclaimer}
          </p>
        </div>
      </div>

      {/* Modal when original PDF file has not yet been placed into public/documents/ */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
        >
          <div className="bg-[#171e26] border border-slate-700 rounded-sm max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 text-slate-200 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Original Document Link
                </p>
                <h3 id="cert-modal-title" className="text-xl font-bold text-white mt-1">
                  Government Registration Certificate PDF
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-sm text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close certificate dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-slate-300">
              <p>
                This button is configured to open the original uploaded government registration
                certificate PDF directly from:
              </p>
              <code className="block px-3 py-2 bg-[#0e1318] border border-slate-800 rounded-sm text-amber-400 text-xs break-all">
                public/documents/jvr-registration-certificate.pdf
              </code>
              <p>
                No synthetic or recreated certificate has been generated so the authentic government
                document remains unaltered. Once the original PDF is placed at that path, clicking{' '}
                <strong className="text-white">View Registration Certificate</strong> will open it
                automatically.
              </p>
            </div>

            <div className="bg-[#0e1318] border border-slate-800 rounded-sm p-4 space-y-1.5 text-xs text-slate-300">
              <p>
                <span className="text-slate-400">Company:</span>{' '}
                <strong className="text-white">{COMPANY_INFO.officialName}</strong>
              </p>
              <p>
                <span className="text-slate-400">Proprietor:</span>{' '}
                <strong className="text-white">{COMPANY_INFO.proprietor}</strong>
              </p>
              <p>
                <span className="text-slate-400">Category:</span>{' '}
                <strong className="text-white">{COMPANY_INFO.registration.category}</strong>
              </p>
              <p>
                <span className="text-slate-400">Authority:</span>{' '}
                <strong className="text-white">{COMPANY_INFO.registration.authorityFull}</strong>
              </p>
              <p>
                <span className="text-slate-400">Order Date:</span>{' '}
                <strong className="text-white">{COMPANY_INFO.registration.orderDate}</strong>
              </p>
              <p>
                <span className="text-slate-400">Eligibility:</span>{' '}
                <strong className="text-white">
                  {COMPANY_INFO.registration.tenderEligibility}
                </strong>
              </p>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
