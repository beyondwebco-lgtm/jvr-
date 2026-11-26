import Link from 'next/link';
import { CheckCircle2, ArrowRight, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';
import RevealOnScroll from './RevealOnScroll';
import { MACHINERY } from '@/data/machinery';

export default function MachinerySection({ showFullPageLink = true }) {
  return (
    <section
      id="machinery"
      className="py-16 sm:py-20 lg:py-28 bg-industrial-grid text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="Fleet & Heavy Equipment"
            title="Our Machinery & Equipment"
            subtitle="Reliable earthmoving, pneumatic support, and bulk material haulage assets operated for safe and steady site execution."
            theme="dark"
          />
          {showFullPageLink && (
            <Link
              href="/machinery/"
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors shrink-0"
            >
              Explore Equipment Specifications
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Large Industrial Machinery Showcases */}
        <div className="space-y-8 sm:space-y-10">
          {MACHINERY.map((item, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <RevealOnScroll key={item.id} delay={idx * 80}>
                <div
                  id={item.id}
                  className="group bg-[#171e26] border border-slate-800 hover:border-amber-500/50 rounded-sm overflow-hidden shadow-xl transition-all duration-500 grid grid-cols-1 md:grid-cols-12"
                >
                  {/* Machinery Photograph */}
                  <div
                    className={`md:col-span-5 lg:col-span-6 relative aspect-[16/10] md:aspect-auto md:min-h-[340px] bg-slate-900 overflow-hidden ${
                      isReversed ? 'md:order-2' : ''
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#171e26]/80 via-transparent to-transparent md:hidden"
                    aria-hidden="true"
                  />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-[#0e1318]/90 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm border border-amber-500/40">
                    <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                    0{idx + 1} / Heavy Fleet
                  </span>
                </div>

                {/* Machinery Specifications & Capabilities */}
                <div
                  className={`md:col-span-7 lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
                    isReversed ? 'md:order-1' : ''
                  }`}
                >
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
                      {item.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-slate-300 text-base leading-relaxed">{item.summary}</p>

                    <div className="pt-2 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Operational Capabilities
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-start gap-2 text-sm text-slate-200"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-400">{item.deploymentNote}</p>
                    <Link
                      href={`/contact/?service=${encodeURIComponent(item.name)}`}
                      className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-sm transition-colors shrink-0"
                    >
                      Book Equipment
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
