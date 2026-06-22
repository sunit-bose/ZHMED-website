import { ScanSearch, Headphones, FileSearch, Rocket } from "lucide-react";

const steps = [
  { icon: ScanSearch, title: "Discovery", desc: "We audit your current denials, AR aging, payer mix and PM/EHR setup — no obligation." },
  { icon: Headphones, title: "Onboarding", desc: "Secure data exchange, dedicated account manager, KPIs and SLAs locked in writing." },
  { icon: FileSearch, title: "Daily Operations", desc: "Coding, charge entry, posting, AR & denial work loops with daily quality reviews." },
  { icon: Rocket, title: "Optimisation", desc: "Root-cause analytics feed back to your front desk and coders — denials shrink quarter over quarter." },
];

export default function Process() {
  return (
    <section className="py-10 lg:py-14 bg-[#FAFCFD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
            How We Work
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            A predictable, auditable engagement model.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative bg-white border border-slate-200 rounded-xl p-7 hover:border-[#2E5A6E]/30 transition"
            >
              <div className="absolute -top-3 left-7 px-2 py-0.5 rounded text-[10px] tracking-[0.2em] uppercase font-bold bg-[#2E5A6E] text-white">
                Step {i + 1}
              </div>
              <div className="h-11 w-11 rounded-lg bg-[#E8F0F4] grid place-items-center text-[#2E5A6E] mb-5 mt-2">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
