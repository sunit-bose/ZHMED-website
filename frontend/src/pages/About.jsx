import { useNavigate } from "react-router-dom";
import { ArrowRight, Award, Users, Calendar, MapPin, HeartPulse } from "lucide-react";
import { BRAND } from "@/lib/api";

const TIMELINE = [
  { year: "2014", title: "Spark", body: "Founders begin AR follow-up work for a small Florida cardiology group — recovering $740K in 90 days. The model becomes the playbook." },
  { year: "2017", title: "Specialty expansion", body: "Service lines expand into orthopedics, FQHCs and behavioral health. Coders certify across AAPC and AHIMA tracks." },
  { year: "2020", title: "Pandemic surge", body: "Onboarded 22 new practices in a single quarter as telehealth billing complexity exploded. Internal denial intelligence layer is built." },
  { year: "2023", title: "Hospital systems", body: "First multi-state hospital network engagement. Extended Business Office (EBO) team scales to 60+ specialists." },
  { year: "2026", title: "Today", body: "End-to-end RCM partner across 20+ specialties, processing claims for clinics and hospital systems coast to coast." },
];

const LEADERS = [
  {
    name: "Zahin Hossain",
    role: "Founder & CEO",
    bio: "14+ years across denial management, payer relations and RCM operations. Previously led AR for a multi-state cardiology network. AAPC-certified. Lives in Tampa, FL.",
  },
  {
    name: "Head of Operations",
    role: "VP, Revenue Cycle",
    bio: "20 years in US medical billing operations. Stood up offshore + onshore hybrid teams for two top-10 RCM firms before joining ZH. CPC + CPMA certified.",
  },
  {
    name: "Head of Coding",
    role: "Director, Coding & Compliance",
    bio: "AHIMA-certified RHIT with deep coding leadership across FQHC, orthopedic and surgical specialties. Built coding QA loops processing 1M+ charts annually.",
  },
  {
    name: "Head of Credentialing",
    role: "Director, Provider Enrollment",
    bio: "12 years credentialing across Medicare, Medicaid and the top 50 commercial payers. Built the 60-day fast-track checklist ZH still uses today.",
  },
];

const VALUES = [
  { title: "Humans first", body: "Every claim has a human owner — not a queue. AMs answer the phone." },
  { title: "Transparent by default", body: "Daily KPI dashboards in your inbox. No black-box reporting." },
  { title: "US-healthcare only", body: "We don't dabble in other verticals. This is all we do." },
  { title: "Outcome over output", body: "We get paid when you collect — incentives stay aligned." },
];

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-3xl lg:text-4xl font-extrabold text-[#2E5A6E]">{value}</div>
      <div className="text-[11px] tracking-widest uppercase font-bold text-slate-500 mt-1">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-20 bg-white" data-testid="about-page">
      {/* Hero */}
      <section className="hero-gradient py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
            <HeartPulse className="h-3.5 w-3.5" />
            About ZH Medsolutions
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            Founded by people who actually <span className="text-[#2E5A6E]">worked the queues.</span>
          </h1>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            ZH Medsolutions started in 2014 when two US-billing veterans stopped working denials for someone else and started building a partner they wished they had been hired by.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b border-slate-200/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <Stat value="11+" label="Years in US RCM" />
          <Stat value="150+" label="Provider organizations" />
          <Stat value="20+" label="Specialties served" />
          <Stat value="$18.4M+" label="Recovered for clients in 2024" />
        </div>
      </section>

      {/* Story */}
      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 mb-5">
            The foundation story.
          </h2>
          <div className="space-y-5 text-slate-700 leading-[1.8] text-[16px] font-editorial">
            <p>
              In 2014, a small Florida cardiology group was losing nearly $740K to aged AR and unresolved denials. Their internal billing team — two great people overwhelmed by 90+ buckets — couldn&rsquo;t catch up. A consultant came in for a 90-day engagement. By day 92, the cardiologists had their money back.
            </p>
            <p>
              That consultant became our founder. ZH Medsolutions was incorporated soon after — built on a simple belief: <span className="font-display font-semibold text-slate-900">most US practices don&rsquo;t need fancier software. They need disciplined humans who care, equipped with the right playbooks.</span>
            </p>
            <p>
              Twelve years on, we look the same on the inside as we did then: a small group of obsessive RCM operators backed by certified coders, AR specialists, credentialing veterans and a denial intelligence layer we&rsquo;ve refined across millions of claims. The only thing that&rsquo;s changed is the scale — and the number of providers who can finally focus on patients instead of payers.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10 lg:py-14 bg-[#FAFCFD] border-y border-slate-200/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <Calendar className="h-3.5 w-3.5" />
            Milestones
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 mb-8">
            A decade of compounded discipline.
          </h2>
          <ol className="relative border-l-2 border-[#2E5A6E]/20 ml-2 space-y-7">
            {TIMELINE.map((t) => (
              <li key={t.year} className="ml-6">
                <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-[#2E5A6E] ring-4 ring-white" />
                <div className="font-display font-extrabold text-[#2E5A6E] text-sm tracking-widest">
                  {t.year}
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg mt-1">{t.title}</h3>
                <p className="text-slate-600 mt-1 leading-relaxed text-[15px]">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <Users className="h-3.5 w-3.5" />
            Leadership
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
            People behind every clean claim.
          </h2>
          <p className="text-slate-600 max-w-2xl mb-9 text-[15px] leading-relaxed">
            Veterans of US revenue cycle operations — every one of them has actually worked the queue.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LEADERS.map((p) => (
              <div
                key={p.name}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#2E5A6E]/30 hover:shadow-[0_18px_40px_-25px_rgba(46,90,110,0.3)] transition"
              >
                <div className="h-14 w-14 rounded-full bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center font-display font-extrabold text-lg mb-4">
                  {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="font-display font-bold text-slate-900 text-[15px]">{p.name}</div>
                <div className="text-[12px] tracking-wider uppercase font-semibold text-[#2E5A6E] mt-0.5">
                  {p.role}
                </div>
                <p className="mt-3 text-[13px] text-slate-600 leading-snug">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 lg:py-14 bg-[#1E3D4A] text-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#A8C5D6] mb-3">
            <Award className="h-3.5 w-3.5" />
            How we operate
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight mb-8">
            Four non-negotiables.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="font-display font-bold text-white text-[16px]">{v.title}</div>
                <p className="mt-2 text-white/75 text-[13.5px] leading-snug">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <MapPin className="h-3.5 w-3.5" />
            Get to know us
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
            One call. One honest look at your numbers.
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            We&rsquo;ll review your aging AR, denial trends and payer mix — and tell you straight if we can move the needle.
          </p>
          <button
            onClick={() => navigate("/book")}
            className="brand-btn mt-6 h-12 px-7 rounded-md font-display font-semibold inline-flex items-center"
          >
            Book a free 30-minute audit
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          <p className="mt-3 text-[12px] text-slate-500">
            Or email <a href={`mailto:${BRAND.email}`} className="text-[#2E5A6E] font-semibold hover:underline">{BRAND.email}</a> · {BRAND.phone}
          </p>
        </div>
      </section>
    </div>
  );
}
