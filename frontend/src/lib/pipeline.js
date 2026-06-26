// Stage / status metadata used across admin
export const STATUSES = [
  // Call lifecycle
  { value: "pending", label: "Pending", group: "Call lifecycle", tone: "amber" },
  { value: "confirmed", label: "Confirmed", group: "Call lifecycle", tone: "emerald" },
  { value: "completed", label: "Call Completed", group: "Call lifecycle", tone: "blue" },
  { value: "cancelled", label: "Cancelled", group: "Call lifecycle", tone: "red" },
  // Pricing
  { value: "pricing_initiated", label: "Pricing Initiated", group: "Pricing", tone: "indigo" },
  { value: "pricing_discussion_open", label: "Pricing Discussion Open", group: "Pricing", tone: "indigo" },
  { value: "pricing_discussion_closed", label: "Pricing Discussion Closed", group: "Pricing", tone: "indigo" },
  // Deal pipeline
  { value: "deal_creation_pending", label: "Deal Creation Pending", group: "Deal pipeline", tone: "violet" },
  { value: "deal_created", label: "Deal Created", group: "Deal pipeline", tone: "violet" },
  { value: "deal_sent_to_customer", label: "Deal Sent to Customer", group: "Deal pipeline", tone: "violet" },
  { value: "deal_under_re_evaluation", label: "Deal Under Re-evaluation", group: "Deal pipeline", tone: "orange" },
  { value: "deal_re_shared", label: "Deal Re-shared", group: "Deal pipeline", tone: "violet" },
  { value: "deal_signed", label: "Deal Signed", group: "Deal pipeline", tone: "emerald" },
  // Closed
  { value: "closed", label: "Closed / Onboarded", group: "Final", tone: "blue" },
];

export const STATUS_MAP = Object.fromEntries(STATUSES.map((s) => [s.value, s]));

export const STATUS_GROUPS = STATUSES.reduce((acc, s) => {
  (acc[s.group] = acc[s.group] || []).push(s);
  return acc;
}, {});

export const TONE_CLASSES = {
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  red: "bg-red-100 text-red-700 border-red-200",
  indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
  violet: "bg-violet-100 text-violet-800 border-violet-200",
  orange: "bg-orange-100 text-orange-800 border-orange-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

export const DOCUMENT_CATEGORIES = [
  { value: "pricing", label: "Pricing copies", helper: "Quote sheets, pricing proposals" },
  { value: "initial_deal", label: "Initial deal copies", helper: "First draft contracts / SOWs" },
  { value: "re_evaluated_deal", label: "Re-evaluated deal copies", helper: "Revised drafts after feedback" },
  { value: "final_deal", label: "Final deal copies", helper: "Signed agreements / executed contracts" },
];

export function statusLabel(value) {
  return STATUS_MAP[value]?.label || value;
}
