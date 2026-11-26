import Link from 'next/link';
import { ArrowRight, ShieldCheck, Wrench, Gauge } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import MachinerySection from '@/components/MachinerySection';

export const metadata = {
  title: 'Machinery & Equipment',
  description:
    'Tata Hitachi PC210 Excavator, Industrial Air Compressor, and Tipper Trucks operated by JVR Mining and Services in Hyderabad.',
};

const FLEET_STANDARDS = [
  {
    icon: Wrench,
    title: 'Preventive Field Readiness',
    description:
      'Routine inspection of hydraulics, undercarriages, pneumatic hoses, and tipping cylinders before site mobilization.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Site Operations',
    description:
      'Disciplined operating clearances, slope awareness, and coordinated loading zones for excavator and tipper movements.',
  },
  {
    icon: Gauge,
    title: 'Coordinated Cycle Output',
    description:
      'Matched excavator capacity and tipper dispatch planning to minimize idle time during bulk earthmoving shifts.',
  },
];

export default function MachineryPage() {
  return (
    <>
      <PageBanner
        eyebrow="Heavy Machinery Fleet"
        title="Our Machinery & Equipment"
        description="Purpose-built earthmoving, pneumatic support, and material haulage machinery for reliable site performance."
        breadcrumb="Machinery"
      />

      <MachinerySection showFullPageLink={false} />

      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {FLEET_STANDARDS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-7 rounded-sm bg-slate-50 border border-slate-200 space-y-3"
                >
                  <div className="w-11 h-11 rounded-sm bg-[#11171e] text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900">{item.title}</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-[#11171e] text-white p-8 sm:p-10 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold">Need Equipment Mobilized to Your Site?</h2>
              <p className="text-sm text-slate-300">
                Share your site location and schedule to discuss Tata Hitachi PC210, Air
                Compressor, or Tipper Truck requirements.
              </p>
            </div>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-sm transition-colors shrink-0"
            >
              Schedule Equipment
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
