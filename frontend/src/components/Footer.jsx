import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { BRAND } from "@/lib/api";

export default function Footer() {
  return (
    <footer className="bg-[#1E3D4A] text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={BRAND.logo}
                alt="ZH Medsolutions"
                className="h-12 w-12 rounded-md ring-1 ring-white/15"
              />
              <div>
                <div className="font-display font-bold text-white text-lg">
                  ZH Medsolutions
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase text-[#A8C5D6]">
                  Care · Coding · Cashflow
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-300/85 max-w-xs">
              End-to-end medical billing partner for US healthcare providers and hospitals — quietly powering healthier revenue cycles.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-white/10 transition">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-white/10 transition">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 grid place-items-center rounded-md bg-white/5 hover:bg-white/10 transition">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><a href="/#about" className="hover:text-white transition">About</a></li>
              <li><a href="/#services" className="hover:text-white transition">Services</a></li>
              <li><Link to="/resources" className="hover:text-white transition">Resources</Link></li>
              <li><a href="/#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>ERA Enrollment</li>
              <li>Credentialing</li>
              <li>Medical Coding</li>
              <li>Charge Entry</li>
              <li>Payment Posting</li>
              <li>AR & Denial Followup</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm tracking-wider uppercase">Reach us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-[#A8C5D6]" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-[#A8C5D6]" />
                <span>{BRAND.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-[#A8C5D6]" />
                <span>{BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} ZH Medsolutions. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>HIPAA-aligned workflows</span>
            <span>·</span>
            <span>US Healthcare Focused</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
