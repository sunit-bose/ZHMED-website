import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CalendarDays } from "lucide-react";
import { api } from "@/lib/api";
import { RESOURCES } from "@/constants/testIds";

export default function BlogPreview() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/blog").then((r) => setPosts(r.data.posts?.slice(0, 3) || []));
  }, []);

  return (
    <section className="py-14 lg:py-20 bg-[#E8F0F4]/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
              Resources & Insights
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Field notes from the revenue cycle.
            </h2>
          </div>
          <button
            onClick={() => navigate("/resources")}
            className="brand-outline-btn h-11 px-5 rounded-md font-display font-semibold text-sm inline-flex items-center self-start"
          >
            All Resources <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {posts.map((p) => (
            <article
              key={p.id}
              data-testid={RESOURCES.card(p.slug)}
              onClick={() => navigate(`/resources/${p.slug}`)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-[#2E5A6E]/30 hover:shadow-[0_20px_40px_-25px_rgba(46,90,110,0.35)] transition"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="px-2 py-1 rounded bg-[#E8F0F4] text-[#2E5A6E] font-semibold tracking-wide uppercase text-[10px]">
                    {p.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> {p.published_at}
                  </span>
                  <span>·</span>
                  <span>{p.read_time}</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#2E5A6E] transition">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
