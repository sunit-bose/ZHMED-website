import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowRight, Check, Stethoscope, ShieldAlert, FileCheck2, Wallet,
  TrendingDown, Building2, ArrowLeft,
} from "lucide-react";
import { api, BRAND } from "@/lib/api";

const COMMON_PAYERS = [
  "UnitedHealthcare", "Aetna", "Cigna", "Humana", "Medicare", "Medicaid MCOs", "Anthem BCBS",
];

const SPECIALTIES = {
  "orthopedics": {
    name: "Orthopedics",
    h1: "Medical billing built for orthopedic practices.",
    intro: "From multi-modifier surgical claims to ortho-specific authorization workflows, ZH has billed in your world. We&rsquo;ve recovered $1.2M+ in aged AR for a single Texas ortho group in 90 days.",
    denials: [
      "Missing or incorrect modifiers (-51, -59, -RT/LT)",
      "DME billing rejections and ortho appliance authorizations",
      "Bundling and global period denials",
      "Pre-auth requirements for MRI / advanced imaging",
    ],
    services: ["Surgical coding (CPC, CCS)", "DME billing", "Authorization management", "Modifier audits", "Aged AR follow-up", "Denial management"],
    metric: { value: "$1.2M", label: "Recovered in 90 days (TX ortho group)" },
  },
  "behavioral-health": {
    name: "Behavioral Health",
    h1: "Behavioral health billing without the credentialing nightmare.",
    intro: "Behavioral health onboarding is famously slow — we built a 60-day fast-track checklist that credentialed 14 clinicians in under two months, protecting $890K of revenue.",
    denials: [
      "Authorization expirations on extended therapy",
      "Time-based code denials (90837 vs 90834)",
      "Medicaid MCO billing nuances",
      "Telehealth modifier and POS confusion",
    ],
    services: ["Provider credentialing", "Authorization tracking", "Time-based coding QA", "Medicaid MCO billing", "Telehealth billing", "Denial follow-up"],
    metric: { value: "14", label: "Clinicians credentialed in 60 days" },
  },
  "obgyn": {
    name: "OBGYN",
    h1: "OBGYN billing — global maternity, gyn surgery, and everything in between.",
    intro: "Global maternity packages, antepartum / postpartum splits, gyn surgery and IUD insertion claims all behave differently. We bill them properly the first time.",
    denials: [
      "Global maternity vs itemized billing confusion",
      "IUD and LARC supply code denials",
      "Bundling on surgical / diagnostic same-day services",
      "Newborn coverage transition issues",
    ],
    services: ["Global maternity billing", "Gyn surgery coding", "LARC supply billing", "Authorization for advanced imaging", "Coding QA"],
    metric: { value: "99.1%", label: "Coding accuracy after our audit" },
  },
  "cardiology": {
    name: "Cardiology",
    h1: "Cardiology billing — from EKGs to interventional cath labs.",
    intro: "Cardiology denials cluster around medical necessity, prior auth and modifier issues. We took a 5-physician practice from 84% first-pass to 98.7% in 60 days.",
    denials: [
      "Medical necessity denials on advanced imaging",
      "Modifier confusion on E&M + procedures same day",
      "Prior auth requirements for stress tests / nuclear studies",
      "Bundling on cath lab interventional codes",
    ],
    services: ["Interventional cardiology coding", "Diagnostic imaging billing", "Medical necessity appeals", "Authorization management", "Charge audit"],
    metric: { value: "98.7%", label: "First-pass resolution achieved" },
  },
  "fqhc": {
    name: "FQHC",
    h1: "FQHC billing — wellness visits, CCM and HRSA-compliant claims.",
    intro: "FQHCs leak revenue from undercoded E&M, missed CCM opportunities, and HRSA audit flags. Our certified FQHC coders moved one Midwest FQHC from 92% to 99.1% accuracy.",
    denials: [
      "E&M undercoding and missed CCM 99490 / 99491",
      "Wellness visit (G0438 / G0439) confusion",
      "PPS rate billing errors",
      "Sliding-fee schedule reporting issues",
    ],
    services: ["FQHC PPS billing", "Wellness visit coding", "Chronic Care Management billing", "HRSA audit support", "Quality metrics reporting"],
    metric: { value: "11.4%", label: "Increase in net collections" },
  },
  "physical-therapy": {
    name: "Physical Therapy",
    h1: "PT billing — units, modifiers and authorization control.",
    intro: "PT practices burn cash on auth denials and unit-of-service mistakes. We bring clean billing discipline and weekly authorization tracking.",
    denials: [
      "Authorization expiration mid-treatment plan",
      "8-minute rule unit counting errors",
      "Modifier 59 / X-modifier denials",
      "Plan of care recertification timing",
    ],
    services: ["Therapy authorization management", "8-minute rule audit", "Coding QA", "Plan of care tracking", "Aged AR follow-up"],
    metric: { value: "60%", label: "Reduction in auth denials" },
  },
  "internal-medicine": {
    name: "Internal Medicine",
    h1: "Internal medicine billing — high-volume, low-margin done right.",
    intro: "Volume-heavy internal medicine practices lose 5-figures monthly to undercoded E&M, missed CCM and incorrect preventive coding. We protect every revenue lever.",
    denials: [
      "E&M downcoding and 2021 guideline confusion",
      "Preventive vs problem-oriented visit splits",
      "CCM and TCM billing rule misses",
      "Welcome to Medicare (G0402) coding gaps",
    ],
    services: ["E&M coding QA", "Preventive visit coding", "CCM / TCM billing", "Aged AR follow-up", "Charge audit"],
    metric: { value: "8.6%", label: "Average revenue lift" },
  },
};

export default function SpecialtyPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);
  const data = SPECIALTIES[slug];

  useEffect(() => {
    if (data) {
      document.title = `${data.name} Billing Services | ZH Medsolutions`;
    }
    return () => { document.title = "ZH Medsolutions"; };
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen pt-36 pb-24 text-center bg-white">
        <p className="text-slate-500">Specialty page not found.</p>
        <Link to="/" className="mt-4 inline-block text-[#2E5A6E] font-semibold hover:underline">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-28 pb-20 bg-white" data-testid={`specialty-page-${slug}`}>
      {/* Hero */}
      <section className="hero-gradient py-12 lg:py-16 border-b border-slate-200/70">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-sm text-[#2E5A6E] font-semibold mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1.5" /> All specialties
          </Link>
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <Stethoscope className="h-3.5 w-3.5" />
            Billing for {data.name}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[52px] font-extrabold tracking-tight text-slate-900 leading-[1.05]">
            {data.h1}
          </h1>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: data.intro }} />
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(`/book?service=general`)}
              className="brand-btn h-12 px-6 rounded-md font-display font-semibold inline-flex items-center"
              data-testid="specialty-cta-book"
            >
              Book a free {data.name.toLowerCase()} audit
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <a
              href="#contact"
              className="h-12 px-6 inline-flex items-center justify-center rounded-md border border-[#2E5A6E]/25 text-[#2E5A6E] font-display font-semibold hover:bg-[#E8F0F4]"
            >
              Talk to our {data.name.toLowerCase()} team
            </a>
          </div>
        </div>
      </section>

      {/* Highlight metric */}
      <section className="py-8 border-b border-slate-200/70">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#2E5A6E]">
            {data.metric.value}
          </div>
          <div className="text-[12px] tracking-widest uppercase font-bold text-slate-500 mt-2">
            {data.metric.label}
          </div>
        </div>
      </section>

      {/* Two-column: denials we fix + services we offer */}
      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <ShieldAlert className="h-3.5 w-3.5" />
              Denials We Fix Daily
            </div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 mb-5">
              The {data.name.toLowerCase()}-specific patterns we know cold.
            </h2>
            <ul className="space-y-3">
              {data.denials.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="h-6 w-6 mt-0.5 rounded-full bg-red-50 text-red-600 grid place-items-center flex-shrink-0">
                    <TrendingDown className="h-3 w-3" />
                  </span>
                  <span className="text-[15px] text-slate-700 leading-snug">{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <FileCheck2 className="h-3.5 w-3.5" />
              Services Tuned For You
            </div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 mb-5">
              From coding to credit balance — covered.
            </h2>
            <ul className="space-y-3">
              {data.services.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span className="h-6 w-6 mt-0.5 rounded-full bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center flex-shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-[15px] text-slate-700 leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Payers strip */}
      <section className="py-8 bg-[#FAFCFD] border-y border-slate-200/70">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <Building2 className="h-3.5 w-3.5" />
            Payers we negotiate with daily
          </div>
          <div className="flex flex-wrap gap-2">
            {COMMON_PAYERS.map((p) => (
              <span
                key={p}
                className="inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-slate-200 text-[#1E3D4A] text-[13px] font-display font-semibold"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <Wallet className="h-3.5 w-3.5" />
            Free audit
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
            See what we&rsquo;d do for your {data.name.toLowerCase()} practice.
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            One 30-minute call. We&rsquo;ll review your aging AR, denial trends and payer mix — and tell you straight if we can move the needle.
          </p>
          <button
            onClick={() => navigate("/book")}
            disabled={posting}
            className="brand-btn mt-6 h-12 px-7 rounded-md font-display font-semibold inline-flex items-center"
            data-testid="specialty-final-cta"
          >
            Book a free audit for {data.name.toLowerCase()}
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

export const SPECIALTY_SLUGS = Object.keys(SPECIALTIES);
