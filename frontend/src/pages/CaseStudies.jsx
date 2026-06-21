import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft, ArrowRight, TrendingUp, Sparkles } from "lucide-react";

export function CaseStudies() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/case-studies").then((r) => setItems(r.data.items || []));
  }, []);
  return (
    <div className="min-h-screen pt-28 lg:pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Case Studies
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Outcomes you can measure in dollars.
          </h1>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed">
            Anonymized engagement snapshots showing exactly what changes within 30, 60 and 90 days
            of partnering with ZH Medsolutions. Real client names available on request under NDA.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c) => (
            <article
              key={c.id}
              onClick={() => navigate(`/case-studies/${c.slug}`)}
              data-testid={`case-card-${c.slug}`}
              className="group cursor-pointer bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#2E5A6E]/30 hover:shadow-[0_20px_40px_-25px_rgba(46,90,110,0.35)] transition"
            >
              <div className="p-6 border-b border-slate-100 bg-[#FAFCFD]">
                <span className="inline-block px-2 py-1 rounded bg-[#E8F0F4] text-[#2E5A6E] font-semibold tracking-wide uppercase text-[10px]">
                  {c.specialty}
                </span>
                <h3 className="mt-3 font-display font-bold text-slate-900 text-lg leading-snug">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{c.summary}</p>
              </div>
              <div className="p-6 grid grid-cols-3 gap-3">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-xl font-extrabold text-[#2E5A6E]">{m.value}</div>
                    <div className="text-[10px] tracking-wider uppercase text-slate-500 mt-0.5 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-5 inline-flex items-center text-[13px] font-semibold text-[#2E5A6E]">
                Read full story <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 bg-[#E8F0F4]/60 border border-[#2E5A6E]/15 rounded-2xl p-8 lg:p-10 text-center">
          <TrendingUp className="h-8 w-8 mx-auto text-[#2E5A6E] mb-4" />
          <h3 className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-slate-900">
            Want to see what we&rsquo;d do for your numbers?
          </h3>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Book a free 30-minute revenue cycle audit. We&rsquo;ll review your aging AR, denial trends and payer mix — and tell you straight if we can move the needle.
          </p>
          <button
            onClick={() => navigate("/book")}
            className="mt-6 brand-btn h-11 px-6 rounded-md font-display font-semibold"
          >
            Book a free audit
          </button>
        </div>
      </div>
    </div>
  );
}

export function CaseStudyDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/case-studies/${slug}`).then((r) => setItem(r.data)).catch(() => setErr(true));
  }, [slug]);

  if (err) {
    return (
      <div className="min-h-screen pt-36 pb-24 text-center">
        <p className="text-slate-500">Case study not found.</p>
        <button onClick={() => navigate("/case-studies")} className="mt-4 text-[#2E5A6E] font-semibold">← All case studies</button>
      </div>
    );
  }
  if (!item) return <div className="min-h-screen pt-36 pb-24 text-center text-slate-400">Loading…</div>;

  return (
    <div className="min-h-screen pt-28 lg:pt-32 pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={() => navigate("/case-studies")} className="inline-flex items-center text-sm text-[#2E5A6E] font-semibold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> All case studies
        </button>
        <span className="inline-block px-2 py-1 rounded bg-[#E8F0F4] text-[#2E5A6E] font-semibold tracking-wide uppercase text-[10px] mb-5">
          {item.specialty}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          {item.title}
        </h1>
        <p className="mt-5 text-slate-600 text-lg leading-relaxed">{item.summary}</p>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {item.metrics.map((m) => (
            <div key={m.label} className="bg-[#FAFCFD] border border-slate-200 rounded-xl p-5">
              <div className="font-display text-2xl lg:text-3xl font-extrabold text-[#2E5A6E]">{m.value}</div>
              <div className="text-[11px] tracking-wider uppercase text-slate-500 mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          {item.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-xl font-extrabold text-slate-900 mb-3">{s.heading}</h2>
              <p className="text-slate-700 leading-[1.75] font-editorial text-lg">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-14 bg-[#1E3D4A] text-white rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl lg:text-2xl font-extrabold mb-3">
            Could this be your story too?
          </h3>
          <p className="text-white/85 max-w-md mx-auto text-sm">
            We&rsquo;ll audit your aging AR, denial trends and payer mix — and tell you what we&rsquo;d do in the first 30 days.
          </p>
          <button
            onClick={() => navigate("/book")}
            className="mt-6 inline-flex items-center bg-white text-[#1E3D4A] h-11 px-6 rounded-md font-display font-semibold hover:bg-[#E8F0F4]"
          >
            Book a free audit
          </button>
        </div>
      </div>
    </div>
  );
}
