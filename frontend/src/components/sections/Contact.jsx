import { useState } from "react";
import { Mail, Phone, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api, BRAND } from "@/lib/api";
import { CONTACT } from "@/constants/testIds";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and a short message.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      toast.success("Thanks — we'll be in touch within one business day.");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not send message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-4">
              Get In Touch
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Let&rsquo;s look at your numbers together.
            </h2>
            <p className="mt-5 text-slate-600 text-lg leading-relaxed">
              Share a few details and we&rsquo;ll respond within one business day with a free
              revenue-cycle assessment.
            </p>

            <div className="mt-10 space-y-5">
              <ContactRow icon={Mail} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} />
              <ContactRow icon={Phone} label="Phone" value={BRAND.phone} href={`tel:${BRAND.phone.replace(/\s/g, "")}`} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={submit}
              data-testid={CONTACT.form}
              className="bg-[#FAFCFD] border border-slate-200 rounded-2xl p-7 lg:p-9"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name *">
                  <Input
                    data-testid={CONTACT.name}
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Dr. Jane Doe"
                    className="h-11"
                  />
                </Field>
                <Field label="Work email *">
                  <Input
                    data-testid={CONTACT.email}
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="jane@clinic.com"
                    className="h-11"
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    data-testid={CONTACT.phone}
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+1 555 010 0420"
                    className="h-11"
                  />
                </Field>
                <Field label="Practice / Hospital">
                  <Input
                    data-testid={CONTACT.company}
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Sunrise Family Health"
                    className="h-11"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <Field label="How can we help? *">
                  <Textarea
                    data-testid={CONTACT.message}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="A line about your specialty, PM/EHR, and what's hurting most..."
                    rows={5}
                  />
                </Field>
              </div>
              <Button
                data-testid={CONTACT.submit}
                type="submit"
                disabled={submitting}
                className="brand-btn mt-6 h-12 px-6 rounded-md font-display font-semibold"
              >
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-[12px] tracking-wider uppercase font-semibold text-slate-700">
        {label}
      </Label>
      {children}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="h-11 w-11 rounded-lg bg-[#E8F0F4] grid place-items-center text-[#2E5A6E] flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[11px] tracking-widest uppercase font-bold text-slate-500">{label}</div>
        <div className="font-display font-semibold text-slate-900 mt-0.5">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80">{content}</a> : content;
}
