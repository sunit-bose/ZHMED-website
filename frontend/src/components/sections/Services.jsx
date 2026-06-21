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
    <section id="services" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            Our Capabilities
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Twelve revenue-cycle disciplines.
            <br />
            <span className="text-slate-500">One quiet, accountable partner.</span>
          </h2>
          <p className="mt-3 text-slate-600 text-[15px] leading-relaxed max-w-2xl">
            Pick a single service or hand us your full revenue cycle. We plug into your existing PM / EHR — no migrations, no surprises.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {services.map((s) => {
            const Icon = ICONS[s.icon] || FileCheck2;
            return (
              <div
                key={s.id}
                data-testid={`service-card-${s.id}`}
                className="service-card group bg-white border border-slate-200 rounded-lg p-4 cursor-pointer"
                onClick={() => navigate(`/book?service=${s.id}`)}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-md bg-[#E8F0F4] grid place-items-center text-[#2E5A6E] group-hover:bg-[#2E5A6E] group-hover:text-white transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-bold text-slate-900 leading-snug">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-snug text-slate-600 line-clamp-2">
                      {s.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
