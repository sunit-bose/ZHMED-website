import { Check } from "lucide-react";

const points = [
  "100% US-healthcare focused team",
  "HIPAA-aligned secure data handling",
  "Works in Epic, athenahealth, eClinicalWorks, Kareo/Tebra, NextGen, Greenway, Practice Fusion + 30 more",
  "Daily, weekly and monthly KPI dashboards",
  "Certified medical coders (AAPC / AHIMA)",
  "Transparent, outcome-based pricing",
];

export default function About() {
  return (
    <section id="about" className="py-8 lg:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-[#E8F0F4]/60 rounded-3xl rotate-1"></div>
            <img
              src="https://images.unsplash.com/photo-1639154968821-6dbc3efb8d23?crop=entropy&cs=srgb&fm=jpg&w=1200"
              alt="Healthcare team collaborating"
              className="relative rounded-2xl w-full h-[480px] object-cover shadow-[0_30px_60px_-30px_rgba(46,90,110,0.4)]"
            />
            <div className="absolute -bottom-6 -right-6 bg-white border border-slate-200 rounded-xl p-5 shadow-lg max-w-[220px]">
              <div className="text-xs tracking-widest uppercase text-slate-500 mb-1">
                Recovered for clients
              </div>
              <div className="font-display text-2xl font-extrabold text-slate-900">
                $18.4M+
              </div>
              <div className="text-xs text-slate-500 mt-1">in 2024 alone</div>
            </div>
          </div>

          <div>
            <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
              About ZH Medsolutions
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              We&rsquo;re the operations partner your front-desk wishes you hired sooner.
            </h2>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed">
              Born to solve one painful problem: independent practices and hospital systems leak revenue through avoidable denials, delayed credentialing and slow AR follow-up. We bring discipline, dashboards and humans who actually answer the phone.
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="h-5 w-5 mt-0.5 rounded-full bg-[#E8F0F4] grid place-items-center flex-shrink-0">
                    <Check className="h-3 w-3 text-[#2E5A6E]" />
                  </span>
                  <span className="text-[15px] text-slate-700">{p}</span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-10 border-l-4 border-[#2E5A6E] pl-5 py-1">
              <p className="font-editorial italic text-xl text-slate-700">
                &ldquo;You care for your patients. We care for your revenue.&rdquo;
              </p>
              <div className="mt-2 text-xs tracking-widest uppercase text-[#2E5A6E] font-bold">
                — Our promise
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
