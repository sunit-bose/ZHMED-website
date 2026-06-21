import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileCheck2, BadgeCheck, Code2, ClipboardEdit, Wallet, AlertTriangle,
  PhoneCall, ShieldAlert, Mailbox, Receipt, Gavel, TrendingDown, ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api";

const ICONS = {
  FileCheck2, BadgeCheck, Code2, ClipboardEdit, Wallet, AlertTriangle,
  PhoneCall, ShieldAlert, Mailbox, Receipt, Gavel, TrendingDown,
};

export default function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/services").then((r) => setServices(r.data.services || []));
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
            Our Capabilities
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Twelve revenue-cycle disciplines.
            <br />
            <span className="text-slate-500">One quiet, accountable partner.</span>
          </h2>
          <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-2xl">
            Pick a single service or hand us your full revenue cycle. We plug into your existing PM / EHR — no migrations, no surprises.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = ICONS[s.icon] || FileCheck2;
            return (
              <div
                key={s.id}
                data-testid={`service-card-${s.id}`}
                className="service-card group bg-white border border-slate-200 rounded-xl p-7 cursor-pointer"
                onClick={() => navigate(`/book?service=${s.id}`)}
              >
                <div className="h-12 w-12 rounded-xl bg-[#E8F0F4] grid place-items-center text-[#2E5A6E] mb-5 group-hover:bg-[#2E5A6E] group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {s.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.description}</p>
                <div className="mt-5 inline-flex items-center text-[13px] font-semibold text-[#2E5A6E] opacity-0 group-hover:opacity-100 transition-opacity">
                  Book this service <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
