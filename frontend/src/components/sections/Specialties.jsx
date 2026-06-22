import { useNavigate } from "react-router-dom";
import {
  HeartPulse, Bone, Scissors, FlaskConical, Brain, Stethoscope, ArrowRight,
} from "lucide-react";

const GROUPS = [
  {
    icon: HeartPulse,
    label: "Primary & Internal",
    items: ["Internal Medicine", "Cardiology", "Endocrinology", "Nephrology", "Pediatrics", "FQHC"],
  },
  {
    icon: Scissors,
    label: "Surgical & Procedural",
    items: ["Orthopedics", "Surgical", "Urology", "Pain Management", "OBGYN"],
  },
  {
    icon: FlaskConical,
    label: "Diagnostics & Labs",
    items: ["Radiology", "Independent Reference Labs", "Sleep Medicine"],
  },
  {
    icon: Brain,
    label: "Specialty & Wellness",
    items: ["Oncology", "Behavioral Health", "Physical Therapy", "Podiatry", "Dermatology", "Gastroenterology"],
  },
];

const TOTAL = GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function Specialties() {
  const navigate = useNavigate();
  return (
    <section className="py-8 lg:py-10 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: heading + stat */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <Stethoscope className="h-3.5 w-3.5" />
              Specialties We Serve
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[40px] font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              {TOTAL}+ specialties.
              <br />
              <span className="text-slate-500">One playbook tuned to each.</span>
            </h2>

            <div className="mt-7 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-display text-4xl font-extrabold text-[#2E5A6E] leading-none">
                  {TOTAL}+
                </span>
                <span className="text-[11px] tracking-wider uppercase text-slate-500 mt-1">
                  Specialties
                </span>
              </div>
              <div className="h-12 w-px bg-slate-200" />
              <div className="flex flex-col">
                <span className="font-display text-4xl font-extrabold text-[#2E5A6E] leading-none">
                  4
                </span>
                <span className="text-[11px] tracking-wider uppercase text-slate-500 mt-1">
                  Care families
                </span>
              </div>
            </div>

            <p className="mt-6 text-slate-600 text-[14.5px] leading-relaxed">
              Don&rsquo;t see yours? We onboard a new specialty every month — share a few details and we&rsquo;ll confirm fit on the call.
            </p>

            <button
              onClick={() => navigate("/book")}
              className="mt-5 group inline-flex items-center text-[14px] font-display font-semibold text-[#2E5A6E] hover:text-[#1E3D4A]"
              data-testid="specialties-book"
            >
              Confirm fit for my specialty
              <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right: categorised cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {GROUPS.map((g) => (
              <div
                key={g.label}
                className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-[#2E5A6E]/30 hover:shadow-[0_18px_40px_-25px_rgba(46,90,110,0.3)] transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center group-hover:bg-[#2E5A6E] group-hover:text-white transition-colors">
                    <g.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-display text-[15px] font-bold text-slate-900 mb-3">
                  {g.label}
                </h3>
                <ul className="grid grid-cols-1 gap-1.5">
                  {g.items.map((s) => (
                    <li
                      key={s}
                      className="text-[13px] text-slate-700 flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#2E5A6E]/50" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
