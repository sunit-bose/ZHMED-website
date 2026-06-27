import { useEffect, useState, useRef } from "react";
import { MessageCircle, X, Send, Loader2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api, BRAND } from "@/lib/api";
import { toast } from "sonner";

// Business hours: Mon-Sun 9 AM - 6 PM ET
function isBusinessHoursET() {
  // Convert "now" into ET wall-clock time
  const now = new Date();
  // toLocaleString returns ET-rendered string; reparse to get ET-shifted Date
  const etString = now.toLocaleString("en-US", { timeZone: "America/New_York", hour12: false });
  const et = new Date(etString);
  const h = et.getHours();
  return h >= 9 && h < 18;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(isBusinessHoursET());
  const [step, setStep] = useState("intro"); // intro | form | sent | leave-message
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const lastUserMsg = useRef("");

  // Recheck online status periodically
  useEffect(() => {
    const t = setInterval(() => setOnline(isBusinessHoursET()), 60_000);
    return () => clearInterval(t);
  }, []);

  const send = async () => {
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message.");
      return;
    }
    setSending(true);
    try {
      await api.post("/contact", {
        name: form.name,
        email: form.email,
        message: `[Live Chat] ${form.message}`,
      });
      lastUserMsg.current = form.message;
      setStep("sent");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send.");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", message: "" });
    setStep(online ? "form" : "leave-message");
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => {
          setOpen(true);
          setStep(online ? "form" : "leave-message");
        }}
        aria-label="Open chat"
        data-testid="livechat-open"
        className={`fixed bottom-5 right-5 z-40 group h-14 w-14 rounded-full grid place-items-center bg-[#2E5A6E] text-white shadow-[0_15px_35px_-10px_rgba(46,90,110,0.55)] hover:bg-[#1E3D4A] active:scale-95 transition-transform ${
          open ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className={`absolute inline-flex h-full w-full rounded-full ${online ? "bg-emerald-400 animate-ping opacity-75" : ""}`} />
          <span className={`relative inline-flex rounded-full h-3.5 w-3.5 border-2 border-white ${online ? "bg-emerald-500" : "bg-slate-400"}`} />
        </span>
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <div
        data-testid="livechat-window"
        className={`fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[380px] bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#2E5A6E] text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display font-extrabold text-[15px] flex items-center gap-2">
                ZH Medsolutions
                <span className={`inline-flex items-center gap-1 text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full ${online ? "bg-emerald-500/25 text-emerald-100" : "bg-white/10 text-white/70"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-emerald-400" : "bg-slate-300"}`} />
                  {online ? "Online" : "Offline"}
                </span>
              </div>
              <div className="text-[12px] text-white/75 mt-0.5">
                {online ? "Typical reply in under 2 hours" : "We're closed — leave a message"}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded-md" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 max-h-[480px] overflow-y-auto bg-[#FAFCFD]">
          {/* Welcome message bubble */}
          <div className="flex items-start gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-full bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center font-display font-bold text-xs flex-shrink-0">
              ZH
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-[13.5px] text-slate-700 leading-snug">
              {online ? (
                <>Hi! 👋 I&rsquo;m here to help. Drop your name, email and a quick note about your practice — someone from our team will jump in shortly.</>
              ) : (
                <>Thanks for stopping by! We&rsquo;re currently <span className="font-semibold">offline</span> (business hours: Mon-Sun 9 AM - 6 PM ET). Leave us a message and we&rsquo;ll respond first thing.</>
              )}
            </div>
          </div>

          {step === "sent" ? (
            <>
              <div className="flex items-start gap-2.5 mb-3 justify-end">
                <div className="bg-[#2E5A6E] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-[13.5px] leading-snug">
                  {lastUserMsg.current}
                </div>
              </div>
              <div className="flex items-start gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-full bg-[#E8F0F4] text-[#2E5A6E] grid place-items-center font-display font-bold text-xs flex-shrink-0">
                  ZH
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] text-[13.5px] text-slate-700 leading-snug">
                  Got it — we&rsquo;ll reply to <span className="font-semibold">{form.email}</span> within one business day. For urgent items, call <a href={`tel:${BRAND.phone}`} className="text-[#2E5A6E] underline font-semibold">{BRAND.phone}</a>.
                </div>
              </div>
              <button
                onClick={reset}
                className="text-[13px] text-[#2E5A6E] font-display font-semibold hover:underline"
              >
                Send another message →
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <Input
                placeholder="Your name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-10 bg-white"
                data-testid="livechat-name"
              />
              <Input
                placeholder="Work email *"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-10 bg-white"
                data-testid="livechat-email"
              />
              <Textarea
                placeholder={online ? "How can we help?" : "Leave a message for first thing tomorrow…"}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-white text-sm"
                data-testid="livechat-message"
              />
              <Button
                onClick={send}
                disabled={sending}
                className="brand-btn h-10 w-full font-display font-semibold"
                data-testid="livechat-send"
              >
                {sending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                {online ? "Send" : "Leave message"}
              </Button>
              {!online && (
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-2">
                  <Clock className="h-3 w-3" />
                  Replies typically within 1 business day
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
