import { useNavigate } from "react-router-dom";
import { Building2, Stethoscope, ArrowRight, Check } from "lucide-react";

const PRACTICES = {
  title: "Independent Practices",
  icon: Stethoscope,
  pitch: "Solo & multi-provider practices, ambulatory clinics, urgent care.",
  points: [
    "Pay only for what you use — per-claim or % of collections",
    "1-on-1 dedicated account manager (no offshore-only queues)",
    "Specialty-specific coders (OBGYN, Ortho, PT, behavioral & more)",
    "Live KPI dashboard — your front desk sees what we see",
  ],
  cta: "I run an independent practice",
};

const HOSPITALS = {
  title: "Hospital Systems",
  icon: Building2,
  pitch: "Community hospitals, multi-state networks, specialty hospitals.",
  points: [
    "Scaled extended business office (EBO) team",
    "Dedicated denial taskforce + appeals war room",
    "Payer-by-payer SLA tracking with monthly executive review",
    "HIM coding audit support — DRG optimization on request",
  ],
  cta: "I run a hospital system",
};

function Column({ data }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 hover:border-[#2E5A6E]/30 hover:shadow-[0_20px_45px_-25px_rgba(46,90,110,0.3)] transition">
      <div className="flex items-center gap-3 mb-5">
        <div className="h-11 w-11 rounded-lg bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center">
          <data.icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
          {data.title}
        </h3>
      </div>
      <p className="text-[14.5px] text-slate-600 leading-relaxed">{data.pitch}</p>
      <ul className="mt-5 space-y-3">
        {data.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="h-5 w-5 mt-0.5 rounded-full bg-[#E8F0F4] grid place-items-center flex-shrink-0">
              <Check className="h-3 w-3 text-[#2E5A6E]" />
            </span>
            <span className="text-[14px] text-slate-700">{p}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate("/book")}
        className="mt-7 group inline-flex items-center text-[14px] font-display font-semibold text-[#2E5A6E] hover:text-[#1E3D4A]"
      >
        {data.cta}
        <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
}

export default function ForWhom() {
  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            Who We Work With
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Two engagement models.
            <br />
            <span className="text-slate-500">Built for two very different worlds.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          <Column data={PRACTICES} />
          <Column data={HOSPITALS} />
        </div>
      </div>
    </section>
  );
}
