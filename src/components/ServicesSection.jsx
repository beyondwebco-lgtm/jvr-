'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, X, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import DynamicIcon from './DynamicIcon';
import { SERVICES } from '@/data/services';

export default function ServicesSection({ showFullPageLink = true }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 lg:py-28 bg-concrete-grid border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeading
            eyebrow="What We Deliver"
            title="Our Professional Services"
            subtitle="Specialized earthwork, excavation, grading, and heavy machinery support tailored for civil construction and land development projects."
            theme="light"
          />
          {showFullPageLink && (
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors shrink-0"
            >
              View Detailed Service Scope
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* 6 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="group bg-white border border-slate-200 hover:border-amber-500 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Service Image */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute top-4 left-4 bg-[#0e1318]/90 text-amber-400 text-xs font-black tracking-widest px-3 py-1 rounded-sm border border-amber-500/40">
                  {service.number}
                </span>
                <div className="absolute bottom-4 left-4 p-2.5 rounded-sm bg-amber-500 text-slate-950 shadow-md">
                  <DynamicIcon name={service.icon} className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                  >
                    Learn More
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </button>
                  <Link
                    href={`/contact/?service=${encodeURIComponent(service.shortTitle)}`}
                    className="text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          <div className="bg-white border border-slate-200 rounded-sm max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="relative h-56 sm:h-64 bg-slate-900">
              <img
                src={selectedService.image}
                alt={selectedService.imageAlt}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-sm bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  Service {selectedService.number}
                </span>
                <h3 id="service-modal-title" className="text-2xl font-extrabold text-white mt-1">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <p className="text-slate-600 leading-relaxed">{selectedService.fullDescription}</p>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Key Capabilities
                </h4>
                <ul className="space-y-2">
                  {selectedService.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2
                        className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-sm bg-slate-50 border border-slate-200 flex items-center gap-3 text-sm">
                <Wrench className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="text-slate-900">Equipment Pairing:</strong>{' '}
                  <span className="text-slate-700">{selectedService.pairedEquipment}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-sm cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href={`/contact/?service=${encodeURIComponent(selectedService.shortTitle)}`}
                  onClick={() => setSelectedService(null)}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-6 py-2.5 rounded-sm transition-colors"
                >
                  Request Service Enquiry
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
