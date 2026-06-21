import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import { api } from "@/lib/api";

export default function ResourceDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/blog/${slug}`).then((r) => setPost(r.data)).catch(() => setErr(true));
  }, [slug]);

  if (err) {
    return (
      <div className="min-h-screen pt-36 pb-24 text-center">
        <p className="text-slate-500">Post not found.</p>
        <button onClick={() => navigate("/resources")} className="mt-4 text-[#2E5A6E] font-semibold">← Back to resources</button>
      </div>
    );
  }

  if (!post) {
    return <div className="min-h-screen pt-36 pb-24 text-center text-slate-400">Loading…</div>;
  }

  return (
    <article className="min-h-screen pt-28 lg:pt-36 pb-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={() => navigate("/resources")} className="inline-flex items-center text-sm text-[#2E5A6E] font-semibold mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> All resources
        </button>
        <span className="inline-block px-2 py-1 rounded bg-[#E8F0F4] text-[#2E5A6E] font-semibold tracking-wide uppercase text-[10px] mb-5">
          {post.category}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
          {post.title}
        </h1>
        <div className="mt-5 flex items-center gap-5 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {post.published_at}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.read_time}</span>
        </div>
        <img src={post.cover} alt={post.title} className="mt-10 w-full h-[400px] object-cover rounded-2xl" />
        <div className="mt-10 font-editorial text-lg leading-[1.75] text-slate-700 whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </article>
  );
}
