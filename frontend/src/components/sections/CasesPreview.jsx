import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { api } from "@/lib/api";

export default function CasesPreview() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/case-studies").then((r) => setItems(r.data.items || []));
  }, []);

  return (
    <section className="py-8 lg:py-10 bg-[#FAFCFD]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Case Studies
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Outcomes you can measure in dollars.
            </h2>
            <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
              Anonymized engagement snapshots showing exactly what changes within 30, 60 and 90 days of partnering with ZH Medsolutions.
            </p>
          </div>
          <button
            onClick={() => navigate("/case-studies")}
            className="brand-outline-btn h-11 px-5 rounded-md font-display font-semibold text-sm inline-flex items-center self-start"
            data-testid="cases-view-all"
          >
            View all cases <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c) => (
            <article
              key={c.id}
              onClick={() => navigate(`/case-studies/${c.slug}`)}
              data-testid={`case-preview-${c.slug}`}
              className="group cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#2E5A6E]/30 hover:shadow-[0_20px_40px_-25px_rgba(46,90,110,0.35)] transition"
            >
              <div className="p-5 border-b border-slate-100 bg-[#FAFCFD]">
                <span className="inline-block px-2 py-1 rounded bg-[#E8F0F4] text-[#2E5A6E] font-semibold tracking-wide uppercase text-[10px]">
                  {c.specialty}
                </span>
                <h3 className="mt-3 font-display font-bold text-slate-900 text-[15px] leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 text-[13px] text-slate-600 line-clamp-2">{c.summary}</p>
              </div>
              <div className="p-5 grid grid-cols-3 gap-3">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-lg font-extrabold text-[#2E5A6E]">{m.value}</div>
                    <div className="text-[10px] tracking-wider uppercase text-slate-500 mt-0.5 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
