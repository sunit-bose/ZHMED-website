import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";

const SPECIALTIES = [
  "OBGYN", "Oncology", "Behavioral Health", "Orthopedics",
  "Physical Therapy", "FQHC", "Radiology", "Pain Management",
  "Internal Medicine", "Cardiology", "Urology", "Endocrinology",
  "Podiatry", "Sleep Medicine", "Surgical", "Pediatrics",
  "Dermatology", "Gastroenterology", "Nephrology", "Independent Labs",
];

export default function Specialties() {
  const navigate = useNavigate();
  return (
    <section className="py-14 lg:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <Stethoscope className="h-3.5 w-3.5" />
              Specialties We Serve
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              20+ specialties.{" "}
              <span className="text-slate-500">One billing playbook tuned for each.</span>
            </h2>
            <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
              Don&rsquo;t see yours? We onboard new specialties every month — share your details and we&rsquo;ll confirm fit on the discovery call.
            </p>
          </div>
          <button
            onClick={() => navigate("/book")}
            className="brand-outline-btn h-11 px-5 rounded-md font-display font-semibold text-sm self-start"
            data-testid="specialties-book"
          >
            Confirm fit for my specialty
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {SPECIALTIES.map((s) => (
            <span
              key={s}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#E8F0F4]/70 hover:bg-[#2E5A6E] hover:text-white text-[#1E3D4A] text-sm font-display font-semibold border border-[#2E5A6E]/10 transition-colors cursor-default"
            >
              {s}
            </span>
          ))}
          <span className="inline-flex items-center px-4 py-2 rounded-full text-[#2E5A6E] text-sm font-display font-semibold border border-dashed border-[#2E5A6E]/30">
            + Many more on request
          </span>
        </div>
      </div>
    </section>
  );
}
