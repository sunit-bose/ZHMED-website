import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function BrandBand() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-[#2E5A6E] text-white">
      {/* Decorative blobs in soft sky-blue */}
      <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-[#A8C5D6]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#A8C5D6]/10 blur-3xl pointer-events-none" />

      {/* Subtle ECG line */}
      <svg
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24 opacity-25 pointer-events-none"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 50 L240 50 L270 22 L300 78 L330 50 L520 50 L545 30 L570 70 L595 50 L1200 50"
          stroke="#A8C5D6"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-7 lg:py-9">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] tracking-[0.2em] uppercase font-bold text-[#A8C5D6] mb-5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Our promise to providers
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.1]">
              You bill it. We collect it.
              <br />
              <span className="text-[#A8C5D6]">No quiet write-offs.</span>
            </h2>
            <p className="mt-5 text-[15px] lg:text-base leading-relaxed text-white/80 max-w-2xl">
              From the first eligibility check to the last appeal, every claim is owned by a
              human on our team — not a queue. That&rsquo;s how we keep first-pass resolution
              above 98% and denials shrinking quarter over quarter.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => navigate("/book")}
              className="group inline-flex items-center justify-center h-12 px-6 rounded-md bg-white text-[#1E3D4A] font-display font-semibold text-[15px] hover:bg-[#E8F0F4] active:translate-y-px transition-all shadow-[0_15px_40px_-15px_rgba(0,0,0,0.5)]"
              data-testid="brand-band-cta"
            >
              Book a 30-minute audit
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
