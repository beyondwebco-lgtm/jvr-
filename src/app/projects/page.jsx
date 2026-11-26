import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Compass,
  FileCheck2,
  HardHat,
  Info,
  Layers,
  Route,
  Truck,
} from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import CredentialsSection from '@/components/CredentialsSection';
import { COMPANY_INFO } from '@/data/company';

export const metadata = {
  title: 'Projects & Execution Capabilities',
  description:
    'Explore JVR Mining and Services project execution capabilities, Class V Civil Contractor eligibility up to ₹50 Lakhs, and earthwork workflow.',
};

const CAPABILITY_SECTORS = [
  {
    icon: Building2,
    title: 'Building & Foundation Excavation',
    description:
      'Bulk cellar cutting, footing trench excavation, and coordinated surplus earth removal for residential and commercial construction sites.',
  },
  {
    icon: Compass,
    title: 'Plot & Land Development Grading',
    description:
      'Site clearing, uneven terrain cutting, soil filling, and precision leveling to prepare layouts and open plots for development.',
  },
  {
    icon: Route,
    title: 'Infrastructure & Roadbed Earthwork',
    description:
      'Sub-grade earth cutting, embankment soil filling, and utility trench excavation supporting civil and public infrastructure works.',
  },
  {
    icon: Layers,
    title: 'Low-Lying Area Filling & Backfilling',
    description:
      'Controlled soil supply transport via tipper trucks, spreading, and structural backfilling around retaining walls and plinths.',
  },
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Site Inspection & Scope Review',
    detail: 'Assessing soil conditions, site access, cut/fill levels, and haulage distances.',
  },
  {
    step: '02',
    title: 'Equipment & Fleet Allocation',
    detail: 'Assigning Tata Hitachi PC210 excavator, air compressor, and tipper resources.',
  },
  {
    step: '03',
    title: 'Controlled Earthwork Execution',
    detail: 'Systematic cutting, excavation, filling, or grading with safety supervision.',
  },
  {
    step: '04',
    title: 'Site Handover & Readiness',
    detail: 'Final level checks and cleared working surface ready for subsequent civil stages.',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Execution Readiness"
        title="Projects &amp; Capabilities"
        description="Earthwork and civil contracting readiness backed by Class V (Civil) Contractor registration and dedicated heavy machinery operations."
        breadcrumb="Projects"
      />

      {/* Project Sectors & Tender Readiness */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="p-5 rounded-sm bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-sm text-slate-700">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong className="text-slate-900">Transparent Project Record Policy:</strong>{' '}
              In accordance with verified documentation standards, JVR Mining and Services does not
              list unverified historical project counts or third-party photographs as completed JVR
              works. Below are our active execution scopes and registered tender eligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CAPABILITY_SECTORS.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={sector.title}
                    className="p-6 rounded-sm bg-slate-50 border border-slate-200 hover:border-amber-500 transition-colors space-y-3"
                  >
                    <div className="w-11 h-11 rounded-sm bg-[#11171e] text-amber-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h2 className="text-lg font-extrabold text-slate-900">{sector.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{sector.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Registered Tender Scope Card */}
            <div className="bg-[#11171e] text-white p-7 rounded-sm border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  Registered Tender Scope
                </div>
                <h2 className="text-2xl font-extrabold leading-snug">
                  {COMPANY_INFO.registration.category}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Registered under the {COMPANY_INFO.registration.authorityFull} (Order Date:{' '}
                  {COMPANY_INFO.registration.orderDate}).
                </p>
                <div className="p-4 rounded-sm bg-[#0b1015] border border-slate-800 space-y-1">
                  <span className="text-xs uppercase tracking-wider text-slate-400 block">
                    Tender Eligibility
                  </span>
                  <span className="text-xl font-black text-amber-400">
                    {COMPANY_INFO.registration.tenderEligibility}
                  </span>
                </div>
              </div>

              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-5 py-3.5 rounded-sm transition-colors"
              >
                Discuss a Project Tender
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 4-Step Execution Workflow */}
          <div className="pt-4 space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Standard Site Execution Workflow
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WORKFLOW_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="p-6 rounded-sm bg-slate-50 border border-slate-200 space-y-2.5"
                >
                  <span className="text-xs font-black tracking-widest text-amber-600">
                    STEP {item.step}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CredentialsSection />
    </>
  );
}
