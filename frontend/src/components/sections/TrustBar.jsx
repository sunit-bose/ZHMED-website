import { ShieldCheck, Lock, Award, FileCheck2, UserCheck, FileSignature } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "HIPAA-Aligned", sub: "Signed BAAs" },
  { icon: Lock, label: "SOC 2 Ready", sub: "Workflows & controls" },
  { icon: UserCheck, label: "AAPC / AHIMA", sub: "Certified coders" },
  { icon: FileCheck2, label: "PHI Encrypted", sub: "In transit & at rest" },
  { icon: FileSignature, label: "Role-based access", sub: "Least-privilege model" },
  { icon: Award, label: "100% US-focused", sub: "Healthcare only" },
];

export default function TrustBar() {
  return (
    <section className="py-9 lg:py-12 bg-[#1E3D4A]/[0.03] border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-[11px] tracking-[0.25em] uppercase font-bold text-[#2E5A6E] mb-2">
            Built on Trust
          </div>
          <h3 className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
            Compliance &amp; standards we operate under.
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map((b) => (
            <div
              key={b.label}
              className="bg-white border border-slate-200 rounded-lg px-4 py-4 flex flex-col items-center text-center hover:border-[#2E5A6E]/30 transition"
            >
              <div className="h-10 w-10 rounded-md bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center mb-3">
                <b.icon className="h-5 w-5" />
              </div>
              <div className="font-display font-bold text-[13px] text-slate-900 leading-tight">
                {b.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{b.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
