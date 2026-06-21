import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail, Phone, Linkedin, Twitter, Facebook, ArrowRight, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { api, BRAND } from "@/lib/api";

const COMPANY_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/resources" },
  { label: "Contact Us", href: "/#contact" },
];

const LEGAL_LINKS = ["Privacy Policy", "Terms and Conditions", "Site Map"];

function softLink(e, href, label) {
  if (href === "soon") {
    e.preventDefault();
    toast.info(`${label} — coming soon`);
  }
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/newsletter", { email });
      toast.success("Subscribed — thanks!");
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not subscribe.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#1E3D4A] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={BRAND.logo}
                alt="ZH Medsolutions"
                className="h-12 w-12 rounded-md ring-1 ring-white/15"
              />
              <div>
                <div className="font-display font-bold text-white text-lg leading-tight">
                  ZH Medsolutions
                </div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-[#A8C5D6]">
                  Care · Coding · Cashflow
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300/85">
              End-to-end medical billing partner for US healthcare providers and hospitals — quietly powering healthier revenue cycles.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-[#A8C5D6] flex-shrink-0" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-[#A8C5D6] flex-shrink-0" />
                <span>{BRAND.phone}</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-white mb-5 text-sm tracking-wider uppercase">Company</h4>
            <ul className="space-y-3 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  {l.href === "soon" ? (
                    <button
                      onClick={(e) => softLink(e, l.href, l.label)}
                      className="text-left hover:text-white transition"
                    >
                      {l.label}
                    </button>
                  ) : l.href.startsWith("/#") ? (
                    <a href={l.href} className="hover:text-white transition">{l.label}</a>
                  ) : (
                    <Link to={l.href} className="hover:text-white transition">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social */}
          <div className="lg:col-span-5">
            <h4 className="font-display font-semibold text-white mb-3 text-base leading-snug">
              Subscribe to our newsletter and be the first to know about our updates.
            </h4>
            <form onSubmit={subscribe} className="mt-5">
              <div className="flex items-center gap-2 bg-white/5 border border-white/15 rounded-full pr-1.5 pl-5 py-1 focus-within:border-[#A8C5D6] transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address *"
                  data-testid="newsletter-email"
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-slate-400 py-2"
                />
                <button
                  type="submit"
                  data-testid="newsletter-submit"
                  disabled={submitting}
                  className="h-9 w-9 grid place-items-center rounded-full bg-[#A8C5D6] text-[#1E3D4A] hover:bg-white transition-colors disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">We respect your inbox. No spam, unsubscribe any time.</p>
            </form>

            <div className="mt-9">
              <h5 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Connect with us</h5>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="LinkedIn" onClick={(e) => softLink(e, "soon", "LinkedIn page")} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-[#A8C5D6] hover:text-[#1E3D4A] transition">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" aria-label="X / Twitter" onClick={(e) => softLink(e, "soon", "X page")} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-[#A8C5D6] hover:text-[#1E3D4A] transition">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Facebook" onClick={(e) => softLink(e, "soon", "Facebook page")} className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-[#A8C5D6] hover:text-[#1E3D4A] transition">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} ZH Medsolutions. All rights reserved.</div>
          <div className="flex items-center gap-4">
            {LEGAL_LINKS.map((l, i) => (
              <span key={l} className="flex items-center gap-4">
                <button
                  onClick={(e) => softLink(e, "soon", l)}
                  className="hover:text-white transition"
                >
                  {l}
                </button>
                {i < LEGAL_LINKS.length - 1 && <span className="text-white/20">|</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
