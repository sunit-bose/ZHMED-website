import { TrendingDown, Clock, FileWarning, BadgeAlert } from "lucide-react";

const PAINS = [
  {
    icon: TrendingDown,
    title: "Denial rates climbing every quarter",
    detail: "Repeat denials hide root causes. We tag every CARC/RARC and feed fixes back to your front desk and coders.",
  },
  {
    icon: Clock,
    title: "AR over 90 days choking cashflow",
    detail: "Old AR collection rates drop below 15%. Our payer-specific cadences typically rescue 30-40% of aged AR in the first 90 days.",
  },
  {
    icon: FileWarning,
    title: "Coding backlog or under-coding",
    detail: "AAPC/AHIMA-certified coders work in your PM/EHR with daily quality reviews — same-day charge entry SLAs.",
  },
  {
    icon: BadgeAlert,
    title: "Credentialing delays bleeding revenue",
    detail: "Every uncredentialed week = lost claims. Our 60-day onboarding checklist gets new providers billing fast.",
  },
];

export default function PainPoints() {
  return (
    <section className="py-8 lg:py-10 bg-[#FAFCFD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            Sound Familiar?
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            The four leaks costing US providers the most.
          </h2>
          <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
            If any of these are happening at your practice or hospital, you&rsquo;re leaving money on the table every single week.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PAINS.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#2E5A6E]/25 hover:shadow-[0_18px_40px_-22px_rgba(46,90,110,0.3)] transition"
            >
              <div className="h-10 w-10 rounded-lg bg-red-50 text-red-600 grid place-items-center mb-4">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-[15px] font-bold text-slate-900 leading-snug mb-2">
                {p.title}
              </h3>
              <p className="text-[13px] leading-snug text-slate-600">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
