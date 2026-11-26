import Link from 'next/link';
import { ArrowRight, CheckCircle2, Wrench } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import ServicesSection from '@/components/ServicesSection';
import DynamicIcon from '@/components/DynamicIcon';
import { SERVICES } from '@/data/services';

export const metadata = {
  title: 'Our Services',
  description:
    'Explore JVR Mining and Services: Earth Cutting & Excavation, Soil Filling & Backfilling, Land Leveling & Grading, Tata Hitachi PC210 Excavator, Air Compressor, and Tipper & Dumper Services.',
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Service Portfolio"
        title="Our Professional Services"
        description="Comprehensive earth cutting, excavation, soil filling, land leveling, and heavy machinery operations for civil construction and land development."
        breadcrumb="Services"
      />

      <ServicesSection showFullPageLink={false} />

      {/* Detailed Service Breakdown */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Detailed Scope
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Operational Specifications &amp; Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-7 rounded-sm bg-slate-50 border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-3">
                      <div className="p-2.5 rounded-sm bg-[#11171e] text-amber-400">
                        <DynamicIcon name={service.icon} className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900">{service.title}</h3>
                    </div>
                    <span className="text-xs font-black text-slate-400">{service.number}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{service.fullDescription}</p>

                  <ul className="space-y-2 pt-1">
                    {service.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Wrench className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                    {service.pairedEquipment}
                  </span>
                  <Link
                    href={`/contact/?service=${encodeURIComponent(service.shortTitle)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700"
                  >
                    Request Quote
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
