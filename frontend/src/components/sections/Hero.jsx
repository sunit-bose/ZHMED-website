import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, Activity, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME } from "@/constants/testIds";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden hero-gradient">
      <div className="absolute inset-0 hero-grid pointer-events-none" />
      <div className="absolute inset-0 heart-pulse-bg pointer-events-none opacity-70" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2E5A6E]/15 bg-white/70 backdrop-blur text-[12px] tracking-[0.18em] uppercase text-[#2E5A6E] font-semibold mb-7">
              <Sparkles className="h-3.5 w-3.5" />
              End-to-End US Medical Billing
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.05] font-extrabold tracking-tight text-slate-900">
              You care for your <span className="text-[#2E5A6E]">patients</span>.
              <br />
              We care for your <span className="relative inline-block">
                <span className="relative z-10">revenue</span>
                <span className="absolute left-0 right-0 bottom-1 h-3 bg-[#A8C5D6]/60 -z-0 rounded-sm"></span>
              </span>.
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed">
              ZH Medsolutions is the quiet partner behind healthier US clinics and hospitals — from ERA enrollment and credentialing to denials, appeals and credit balance resolution.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Button
                data-testid={HOME.bookCta}
                onClick={() => navigate("/book")}
                className="brand-btn h-12 px-6 rounded-md font-display font-semibold text-[15px]"
              >
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                data-testid={HOME.servicesCta}
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                }
                variant="outline"
                className="h-12 px-6 rounded-md font-display font-semibold text-[15px] border-[#2E5A6E]/25 text-[#2E5A6E] hover:bg-[#E8F0F4]"
              >
                Explore Services
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-xl">
              <Stat value="98%" label="Clean claim rate" />
              <Stat value="< 30" label="Days in AR" />
              <Stat value="40%" label="Faster denials TAT" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#A8C5D6]/30 to-transparent rounded-3xl blur-2xl"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-[0_30px_60px_-30px_rgba(46,90,110,0.35)] p-6 lg:p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-[#2E5A6E]">
                    <Activity className="h-5 w-5" />
                    <span className="font-display font-semibold">RCM Snapshot</span>
                  </div>
                  <span className="text-[11px] tracking-widest uppercase text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">live</span>
                </div>
                <Row label="Avg Days in AR" value="27 days" tone="green" />
                <Row label="Denial Rate" value="3.4%" tone="green" />
                <Row label="First-Pass Resolution" value="94.6%" tone="green" />
                <Row label="Credentialing TAT" value="51 days" tone="blue" />
                <Row label="ERA Posting SLA" value="< 24h" tone="blue" last />
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#2E5A6E]" />
                  HIPAA-aligned · SOC 2 ready workflows
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl lg:text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-[12px] tracking-wider uppercase text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function Row({ label, value, tone, last }) {
  const dot = tone === "green" ? "bg-emerald-500" : "bg-[#3B728C]";
  return (
    <div className={`flex items-center justify-between py-3 ${last ? "" : "border-b border-slate-100"}`}>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="font-display font-semibold text-slate-900 text-sm">{value}</div>
    </div>
  );
}
