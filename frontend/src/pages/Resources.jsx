import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { RESOURCES } from "@/constants/testIds";

export default function Resources() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/blog").then((r) => setPosts(r.data.posts || []));
  }, []);

  return (
    <div className="min-h-screen pt-28 lg:pt-36 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
            Resources
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Field notes from the revenue cycle.
          </h1>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed">
            Long-form guides, payer-by-payer breakdowns and the playbooks we actually use with our clients.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((p) => (
            <article
              key={p.id}
              data-testid={RESOURCES.card(p.slug)}
              onClick={() => navigate(`/resources/${p.slug}`)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-[#2E5A6E]/30 hover:shadow-[0_20px_40px_-25px_rgba(46,90,110,0.35)] transition"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img src={p.cover} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="px-2 py-1 rounded bg-[#E8F0F4] text-[#2E5A6E] font-semibold tracking-wide uppercase text-[10px]">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {p.published_at}</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#2E5A6E] transition">{p.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                <div className="mt-4 inline-flex items-center text-[13px] font-semibold text-[#2E5A6E]">
                  Read article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
