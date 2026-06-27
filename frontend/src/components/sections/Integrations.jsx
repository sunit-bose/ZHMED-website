import { useNavigate } from "react-router-dom";
import { Cpu, ShieldCheck, Layers, ArrowRight } from "lucide-react";

const PLATFORMS = [
  "Epic", "athenahealth", "eClinicalWorks", "Kareo / Tebra", "Greenway",
  "NextGen", "Practice Fusion", "AdvancedMD", "DrChrono", "Allscripts",
];

const PAYERS = [
  "UnitedHealthcare", "Aetna", "Cigna", "Humana", "CMS / Medicare",
  "Medicaid Managed Care", "Anthem BCBS", "Kaiser", "Tricare", "WellCare",
];

export default function Integrations() {
  const navigate = useNavigate();
  return (
    <section className="py-8 lg:py-10 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Platforms */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <Layers className="h-3.5 w-3.5" />
              Platforms We Work In
            </div>
            <h3 className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
              PM / EHR systems we&rsquo;ve billed in.
            </h3>
            <p className="mt-2 text-slate-600 text-[14.5px] leading-relaxed">
              No migrations, no re-platforming. We log into your existing system and work right alongside your team.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#FAFCFD] border border-slate-200 text-[#1E3D4A] text-[13px] font-display font-semibold"
                >
                  <Cpu className="h-3 w-3 mr-1.5 text-[#2E5A6E]" />
                  {p}
                </span>
              ))}
              <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-dashed border-[#2E5A6E]/30 text-[#2E5A6E] text-[13px] font-display font-semibold">
                + 30 more on request
              </span>
            </div>
          </div>

          {/* Payers */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <ShieldCheck className="h-3.5 w-3.5" />
              Payers We Negotiate With Daily
            </div>
            <h3 className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
              Payer-specific playbooks, not generic appeals.
            </h3>
            <p className="mt-2 text-slate-600 text-[14.5px] leading-relaxed">
              Each payer has its own denial patterns, escalation paths and authorization quirks. We&rsquo;ve mapped them all.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {PAYERS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#E8F0F4]/70 border border-[#2E5A6E]/10 text-[#1E3D4A] text-[13px] font-display font-semibold"
                >
                  {p}
                </span>
              ))}
              <span className="inline-flex items-center px-3 py-1.5 rounded-md border border-dashed border-[#2E5A6E]/30 text-[#2E5A6E] text-[13px] font-display font-semibold">
                + Regional BCBS &amp; commercial plans
              </span>
            </div>
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <button
            onClick={() => navigate("/book")}
            className="group inline-flex items-center text-[14px] font-display font-semibold text-[#2E5A6E] hover:text-[#1E3D4A]"
            data-testid="integrations-book"
          >
            Confirm fit for your stack
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
