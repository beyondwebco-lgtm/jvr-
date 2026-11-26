import SectionHeading from './SectionHeading';
import DynamicIcon from './DynamicIcon';
import { WHY_CHOOSE_ITEMS } from '@/data/company';

export default function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Our Strengths"
            title="Why Choose JVR?"
            subtitle="Built on registered civil contracting credentials, disciplined machinery operations, and responsive project coordination."
            align="center"
            theme="light"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group p-7 rounded-sm bg-slate-50 hover:bg-[#11171e] border border-slate-200 hover:border-amber-500 transition-all duration-300 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-sm bg-amber-500/15 group-hover:bg-amber-500 text-amber-600 group-hover:text-slate-950 flex items-center justify-center transition-colors duration-300">
                <DynamicIcon name={item.icon} className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-sm text-slate-600 group-hover:text-slate-300 leading-relaxed transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
