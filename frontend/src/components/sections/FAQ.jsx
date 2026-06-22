import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What exactly does ZH Medsolutions do?",
    a: "We're an end-to-end medical billing and revenue cycle management partner for US healthcare providers and hospitals. We cover everything from eligibility verification and credentialing on the front end, through coding, charge entry and payment posting, all the way to AR follow-up, denial management, appeals and credit balance resolution.",
  },
  {
    q: "How quickly can you onboard my practice or hospital?",
    a: "A typical onboarding takes 2–4 weeks: secure data exchange and BAAs in week 1, dedicated account manager + SLA/KPI alignment in week 2, parallel-run + cleanup in weeks 3–4. You'll see live KPIs from day one.",
  },
  {
    q: "Do you work with my existing PM / EHR system?",
    a: "Yes — we're PM/EHR agnostic. We work directly in your existing systems (Athena, eClinicalWorks, Epic, NextGen, Kareo, AdvancedMD, Practice Fusion, and 30+ others). No migrations, no re-platforming.",
  },
  {
    q: "How do you handle HIPAA and patient data security?",
    a: "All data handling is HIPAA-aligned with signed BAAs, role-based access controls, encrypted data transfer, and SOC 2-ready workflows. Our coders, AR specialists, and account managers are individually trained and audited for compliance.",
  },
  {
    q: "What's your pricing model?",
    a: "We offer two transparent models: (1) percentage of net collections — common for full-RCM engagements, and (2) per-claim or per-FTE pricing for narrower scopes like coding-only or aged AR. No long-term lock-ins; we earn each renewal.",
  },
  {
    q: "Do you serve solo practitioners and large hospital systems?",
    a: "Both. Our smallest clients are 1-provider practices; our largest engagements span multi-state hospital networks. We scale the dedicated team to match your volume and complexity.",
  },
  {
    q: "Can you take over just one piece, like aged AR or credentialing?",
    a: "Absolutely. Many clients start with a single painful area — usually aged AR, denial management, or credentialing — and expand from there once they see results. No all-or-nothing pressure.",
  },
  {
    q: "How will I see what's happening day-to-day?",
    a: "You get a dedicated account manager, daily / weekly / monthly KPI dashboards, monthly business reviews against agreed SLAs, and an inbox that gets answered within one business day. Total transparency.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-10 lg:py-14 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Things we&rsquo;re asked on every discovery call.
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-slate-200 last:border-b-0"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-left font-display font-semibold text-slate-900 hover:no-underline hover:text-[#2E5A6E] py-5 text-[15px]">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-[14.5px] pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
