import { useEffect, useRef, useState } from "react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs";
import {
  Loader2, Upload, Download, Trash2, FileText, Calendar, Phone, Mail,
  Building2, ChevronRight, History, Save,
} from "lucide-react";
import { toast } from "sonner";
import { api, adminHeaders, getAdminToken } from "@/lib/api";
import {
  STATUSES, STATUS_GROUPS, STATUS_MAP, TONE_CLASSES,
  DOCUMENT_CATEGORIES, statusLabel,
} from "@/lib/pipeline";

const API_BASE = process.env.REACT_APP_BACKEND_URL + "/api";

function fmtDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  } catch { return iso; }
}

function fmtSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function StatusBadge({ status }) {
  const meta = STATUS_MAP[status];
  const tone = meta?.tone || "slate";
  return (
    <Badge className={`${TONE_CLASSES[tone]} border capitalize font-display font-semibold`}>
      {meta?.label || status}
    </Badge>
  );
}

export default function BookingDetailSheet({ booking, open, onOpenChange, onChanged }) {
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [docs, setDocs] = useState([]);
  const [fullBooking, setFullBooking] = useState(booking);

  const refresh = async () => {
    if (!booking) return;
    try {
      const [b, d] = await Promise.all([
        api.get(`/bookings/${booking.id}`, adminHeaders()),
        api.get(`/bookings/${booking.id}/documents`, adminHeaders()),
      ]);
      setFullBooking(b.data);
      setDocs(d.data.documents || []);
    } catch {
      toast.error("Could not load booking details.");
    }
  };

  useEffect(() => {
    if (open && booking) {
      setFullBooking(booking);
      setNewStatus("");
      setNote("");
      refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, booking?.id]);

  const submitStatus = async () => {
    if (!newStatus) {
      toast.error("Pick a new stage.");
      return;
    }
    if (newStatus === fullBooking?.status) {
      toast.info("That's already the current stage.");
      return;
    }
    setSaving(true);
    try {
      const r = await api.patch(`/bookings/${booking.id}/status`, { status: newStatus, note: note || null }, adminHeaders());
      toast.success(`Stage → ${statusLabel(newStatus)}`);
      setFullBooking((b) => ({ ...b, status: r.data.status, status_history: r.data.status_history }));
      setNewStatus("");
      setNote("");
      onChanged?.();
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not update stage.");
    } finally {
      setSaving(false);
    }
  };

  const history = (fullBooking?.status_history || []).slice().reverse();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-white p-0">
        {booking && fullBooking && (
          <>
            <SheetHeader className="px-6 pt-6 pb-4 border-b border-slate-200 bg-[#FAFCFD]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <SheetTitle className="font-display text-xl font-extrabold text-slate-900">
                    {fullBooking.full_name}
                  </SheetTitle>
                  <SheetDescription className="text-slate-500 text-sm mt-0.5">
                    {fullBooking.company || "Independent"}
                  </SheetDescription>
                </div>
                <StatusBadge status={fullBooking.status} />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[13px] text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-[#2E5A6E]" />
                  {fullBooking.date} · {fullBooking.time_slot} EST
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-[#2E5A6E]" />
                  <span className="capitalize">{fullBooking.service?.replace(/-/g, " ")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#2E5A6E]" />
                  <a href={`mailto:${fullBooking.email}`} className="hover:underline truncate">{fullBooking.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-[#2E5A6E]" />
                  <a href={`tel:${fullBooking.phone}`} className="hover:underline">{fullBooking.phone}</a>
                </div>
              </div>
              {fullBooking.notes && (
                <p className="mt-3 text-[13px] text-slate-600 bg-white border border-slate-200 rounded-md p-3 leading-snug">
                  <span className="font-semibold text-slate-800">Customer note: </span>
                  {fullBooking.notes}
                </p>
              )}
            </SheetHeader>

            <Tabs defaultValue="pipeline" className="px-6 py-5">
              <TabsList className="bg-slate-100 mb-5">
                <TabsTrigger value="pipeline" className="font-display">Pipeline</TabsTrigger>
                <TabsTrigger value="documents" className="font-display">
                  Documents <span className="ml-2 text-[10px] bg-[#2E5A6E] text-white rounded-full px-1.5 py-0.5">{docs.length}</span>
                </TabsTrigger>
              </TabsList>

              {/* PIPELINE TAB */}
              <TabsContent value="pipeline" className="space-y-6">
                {/* Update form */}
                <div className="bg-[#FAFCFD] border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="text-[12px] tracking-wider uppercase font-bold text-[#2E5A6E]">
                    Update stage
                  </div>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger data-testid="stage-select-trigger" className="h-10 bg-white">
                      <SelectValue placeholder="Move to next stage…" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_GROUPS).map(([group, items]) => (
                        <SelectGroup key={group}>
                          <SelectLabel className="text-[10px] uppercase tracking-widest text-slate-500">
                            {group}
                          </SelectLabel>
                          {items.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Add a quick note for this stage change (optional)…"
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="bg-white text-sm"
                  />
                  <Button
                    onClick={submitStatus}
                    disabled={saving}
                    className="brand-btn h-10 font-display font-semibold"
                    data-testid="stage-save-btn"
                  >
                    {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save stage change
                  </Button>
                </div>

                {/* Timeline */}
                <div>
                  <div className="flex items-center gap-2 text-[12px] tracking-wider uppercase font-bold text-[#2E5A6E] mb-4">
                    <History className="h-4 w-4" />
                    Status timeline
                  </div>
                  {history.length === 0 ? (
                    <p className="text-sm text-slate-400">No history yet.</p>
                  ) : (
                    <ol className="relative border-l-2 border-slate-200 ml-2 space-y-5">
                      {history.map((h, i) => (
                        <li key={i} className="ml-5">
                          <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-[#2E5A6E] ring-4 ring-white" />
                          <div className="flex flex-wrap items-center gap-2">
                            <StatusBadge status={h.status} />
                            {h.lag_days > 0 && (
                              <span className="text-[11px] tracking-wide uppercase font-semibold text-slate-500">
                                +{h.lag_days} {h.lag_days === 1 ? "day" : "days"} lag
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{fmtDate(h.at)}</div>
                          {h.note && (
                            <p className="mt-2 text-[13px] text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-2.5">
                              {h.note}
                            </p>
                          )}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </TabsContent>

              {/* DOCUMENTS TAB */}
              <TabsContent value="documents" className="space-y-5">
                {DOCUMENT_CATEGORIES.map((cat) => (
                  <DocumentCategoryBlock
                    key={cat.value}
                    bookingId={booking.id}
                    category={cat}
                    docs={docs.filter((d) => d.category === cat.value)}
                    onUploaded={refresh}
                    onDeleted={refresh}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DocumentCategoryBlock({ bookingId, category, docs, onUploaded, onDeleted }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [pendingNote, setPendingNote] = useState("");

  const pickFile = () => fileRef.current?.click();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Max 8 MB per file.");
      e.target.value = "";
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category.value);
      if (pendingNote) fd.append("note", pendingNote);
      await fetch(`${API_BASE}/bookings/${bookingId}/documents`, {
        method: "POST",
        headers: { "X-Admin-Token": getAdminToken() },
        body: fd,
      }).then(async (r) => {
        if (!r.ok) {
          const t = await r.json().catch(() => ({}));
          throw new Error(t.detail || `HTTP ${r.status}`);
        }
      });
      toast.success("Uploaded.");
      setPendingNote("");
      onUploaded?.();
    } catch (err) {
      toast.error(err.message || "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const downloadDoc = async (doc) => {
    try {
      const r = await api.get(`/documents/${doc.id}`, adminHeaders());
      const bin = atob(r.data.content_base64);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blob = new Blob([bytes], { type: r.data.content_type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = r.data.filename; a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Could not download.");
    }
  };

  const removeDoc = async (doc) => {
    if (!window.confirm(`Delete "${doc.filename}"?`)) return;
    try {
      await api.delete(`/documents/${doc.id}`, adminHeaders());
      toast.success("Deleted.");
      onDeleted?.();
    } catch {
      toast.error("Could not delete.");
    }
  };

  return (
    <div className="border border-slate-200 rounded-xl bg-white" data-testid={`doc-cat-${category.value}`}>
      <div className="px-4 py-3 border-b border-slate-100 flex items-start justify-between gap-3">
        <div>
          <div className="font-display font-bold text-slate-900 text-[14px]">{category.label}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">{category.helper}</div>
        </div>
        <span className="text-[10px] tracking-widest uppercase font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
          {docs.length}
        </span>
      </div>
      <div className="p-4 space-y-3">
        {docs.length === 0 && (
          <p className="text-[13px] text-slate-400 italic">No documents uploaded yet.</p>
        )}
        {docs.map((d) => (
          <div key={d.id} className="flex items-center gap-3 bg-[#FAFCFD] border border-slate-200 rounded-lg p-3">
            <div className="h-9 w-9 grid place-items-center rounded-md bg-[#E8F0F4] text-[#2E5A6E]">
              <FileText className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display font-semibold text-slate-900 text-[13px] truncate">
                {d.filename}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {fmtSize(d.size)} · {fmtDate(d.uploaded_at)}
                {d.note ? ` · ${d.note}` : ""}
              </div>
            </div>
            <button
              onClick={() => downloadDoc(d)}
              className="h-8 w-8 grid place-items-center rounded-md text-slate-500 hover:text-[#2E5A6E] hover:bg-white border border-slate-200"
              title="Download"
              data-testid={`doc-download-${d.id}`}
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeDoc(d)}
              className="h-8 w-8 grid place-items-center rounded-md text-slate-500 hover:text-red-600 hover:bg-white border border-slate-200"
              title="Delete"
              data-testid={`doc-delete-${d.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Optional note for this file"
            value={pendingNote}
            onChange={(e) => setPendingNote(e.target.value)}
            className="h-9 text-sm bg-white"
          />
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleFile}
            data-testid={`doc-file-input-${category.value}`}
          />
          <Button
            onClick={pickFile}
            disabled={uploading}
            variant="outline"
            className="h-9 border-[#2E5A6E]/30 text-[#2E5A6E] hover:bg-[#E8F0F4] font-display font-semibold whitespace-nowrap"
            data-testid={`doc-upload-${category.value}`}
          >
            {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
