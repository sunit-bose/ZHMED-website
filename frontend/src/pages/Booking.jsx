import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2, ArrowLeft, ArrowRight, Loader2, Clock, CalendarCheck2 } from "lucide-react";
import { api } from "@/lib/api";
import { BOOKING } from "@/constants/testIds";

const STEPS = ["Service", "Date", "Time", "Details", "Done"];

function to12h(t) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 || 12;
  return `${hh}:${m.toString().padStart(2, "0")} ${ampm}`;
}

export default function Booking() {
  const [services, setServices] = useState([]);
  const [step, setStep] = useState(0);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState(params.get("service") || "");
  const [date, setDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slot, setSlot] = useState("");
  const [details, setDetails] = useState({ full_name: "", email: "", phone: "", company: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  useEffect(() => {
    api.get("/services").then((r) => setServices(r.data.services || []));
  }, []);

  // Skip to date step if service is preselected via URL
  useEffect(() => {
    if (selectedService && step === 0) setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!date) return;
    const ds = format(date, "yyyy-MM-dd");
    setLoadingSlots(true);
    api.get(`/bookings/availability?date_str=${ds}`)
      .then((r) => setSlots(r.data.slots || []))
      .finally(() => setLoadingSlots(false));
  }, [date]);

  const serviceObj = useMemo(
    () => services.find((s) => s.id === selectedService) || null,
    [services, selectedService]
  );

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!date;
    if (step === 2) return !!slot;
    if (step === 3) return details.full_name && details.email && details.phone;
    return false;
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        service: selectedService,
        full_name: details.full_name,
        email: details.email,
        phone: details.phone,
        company: details.company,
        notes: details.notes,
        date: format(date, "yyyy-MM-dd"),
        time_slot: slot,
      };
      const r = await api.post("/bookings", payload);
      setBookingResult(r.data);
      setStep(4);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not book. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid={BOOKING.page} className="min-h-screen pt-28 lg:pt-36 pb-24 bg-[#FAFCFD]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-3">
            Book a Consultation
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            30 minutes. One honest conversation.
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We&rsquo;ll walk through your current bottlenecks and share what we&rsquo;d do in the first 30 days.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 sm:gap-3">
              <div className={`step-dot ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-xs sm:text-sm font-display font-semibold ${i === step ? "text-[#2E5A6E]" : "text-slate-500"}`}>{s}</span>
              {i < STEPS.length - 1 && <div className="w-6 sm:w-10 h-px bg-slate-300" />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_-30px_rgba(46,90,110,0.25)]">
          {/* Step 0 - Service */}
          {step === 0 && (
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">Which service brings you in?</h3>
              <p className="text-sm text-slate-500 mb-6">Pick one — we&rsquo;ll cover related areas in the call.</p>
              <div data-testid={BOOKING.serviceSelect} className="grid sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <button
                    key={s.id}
                    data-testid={BOOKING.serviceItem(s.id)}
                    onClick={() => setSelectedService(s.id)}
                    className={`text-left p-4 rounded-xl border transition ${
                      selectedService === s.id
                        ? "border-[#2E5A6E] bg-[#E8F0F4]"
                        : "border-slate-200 hover:border-[#2E5A6E]/40"
                    }`}
                  >
                    <div className="font-display font-semibold text-slate-900">{s.name}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-2">{s.description}</div>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedService("general")}
                  className={`text-left p-4 rounded-xl border transition ${
                    selectedService === "general"
                      ? "border-[#2E5A6E] bg-[#E8F0F4]"
                      : "border-slate-200 hover:border-[#2E5A6E]/40"
                  }`}
                >
                  <div className="font-display font-semibold text-slate-900">General / Full RCM</div>
                  <div className="text-xs text-slate-500 mt-1">Not sure yet — let&rsquo;s talk through everything.</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 1 - Date */}
          {step === 1 && (
            <div className="flex flex-col items-center">
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">Pick a date</h3>
              <p className="text-sm text-slate-500 mb-6">All times shown in EST. Available 7 days a week.</p>
              <div data-testid={BOOKING.calendar} className="rounded-xl border border-slate-200 bg-white p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setSlot(""); }}
                  disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                  className="rounded-md"
                />
              </div>
            </div>
          )}

          {/* Step 2 - Time */}
          {step === 2 && (
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">Pick a time</h3>
              <p className="text-sm text-slate-500 mb-6">
                <Clock className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                Business hours: 9:00 AM – 6:00 PM EST · {date && format(date, "EEEE, MMM d")}
              </p>
              {loadingSlots ? (
                <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-[#2E5A6E]" /></div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      data-testid={BOOKING.slot(s.time)}
                      onClick={() => s.available && setSlot(s.time)}
                      disabled={!s.available}
                      className={`px-2 py-2.5 rounded-md border text-sm font-display font-semibold transition ${
                        slot === s.time
                          ? "bg-[#2E5A6E] text-white border-[#2E5A6E]"
                          : s.available
                          ? "border-slate-200 text-slate-700 hover:border-[#2E5A6E] hover:text-[#2E5A6E]"
                          : "border-slate-100 text-slate-300 line-through cursor-not-allowed"
                      }`}
                    >
                      {to12h(s.time)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3 - Details */}
          {step === 3 && (
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-1">A few details</h3>
              <p className="text-sm text-slate-500 mb-6">We&rsquo;ll send a confirmation to your email.</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name *">
                  <Input data-testid={BOOKING.fullName} className="h-11" value={details.full_name} onChange={(e) => setDetails({ ...details, full_name: e.target.value })} />
                </Field>
                <Field label="Work email *">
                  <Input data-testid={BOOKING.email} type="email" className="h-11" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                </Field>
                <Field label="Phone *">
                  <Input data-testid={BOOKING.phone} className="h-11" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
                </Field>
                <Field label="Practice / Hospital">
                  <Input data-testid={BOOKING.company} className="h-11" value={details.company} onChange={(e) => setDetails({ ...details, company: e.target.value })} />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="Anything to brief us on?">
                  <Textarea data-testid={BOOKING.notes} rows={4} value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })} placeholder="Specialty, EHR/PM, key pain points..." />
                </Field>
              </div>

              <div className="mt-6 p-4 bg-[#E8F0F4]/60 border border-[#2E5A6E]/15 rounded-lg flex items-start gap-3">
                <CalendarCheck2 className="h-5 w-5 text-[#2E5A6E] mt-0.5" />
                <div className="text-sm text-slate-700">
                  <span className="font-display font-semibold">{serviceObj?.name || "General"}</span> · {date && format(date, "EEEE, MMM d, yyyy")} · {to12h(slot)} EST
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Done */}
          {step === 4 && bookingResult && (
            <div data-testid={BOOKING.successCard} className="text-center py-6">
              <div className="h-16 w-16 mx-auto bg-emerald-50 grid place-items-center rounded-full mb-5">
                <CheckCircle2 className="h-9 w-9 text-emerald-600" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-2">You&rsquo;re booked!</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                A confirmation has been recorded. We&rsquo;ll reach out at <span className="font-semibold">{bookingResult.email}</span> shortly to share the call link.
              </p>
              <div className="mt-6 inline-block text-left bg-[#FAFCFD] border border-slate-200 rounded-xl p-5">
                <Detail label="Reference" value={bookingResult.id.slice(0, 8).toUpperCase()} />
                <Detail label="Service" value={serviceObj?.name || bookingResult.service} />
                <Detail label="Date" value={format(date, "EEEE, MMM d, yyyy")} />
                <Detail label="Time" value={`${to12h(slot)} EST`} last />
              </div>
              <div className="mt-7">
                <Button onClick={() => navigate("/")} className="brand-btn h-11 px-6 rounded-md font-display font-semibold">Back to home</Button>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          {step < 4 && (
            <div className="mt-10 flex items-center justify-between">
              <Button
                data-testid={BOOKING.backBtn}
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-slate-600"
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              {step < 3 ? (
                <Button
                  data-testid={BOOKING.nextBtn}
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="brand-btn h-11 px-6 rounded-md font-display font-semibold"
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  data-testid={BOOKING.submit}
                  onClick={submit}
                  disabled={!canNext() || submitting}
                  className="brand-btn h-11 px-6 rounded-md font-display font-semibold"
                >
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Confirm booking
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-[12px] tracking-wider uppercase font-semibold text-slate-700">{label}</Label>
      {children}
    </div>
  );
}

function Detail({ label, value, last }) {
  return (
    <div className={`flex items-center justify-between gap-12 py-2 ${last ? "" : "border-b border-slate-100"}`}>
      <span className="text-[11px] tracking-widest uppercase font-bold text-slate-500">{label}</span>
      <span className="font-display font-semibold text-slate-900">{value}</span>
    </div>
  );
}
