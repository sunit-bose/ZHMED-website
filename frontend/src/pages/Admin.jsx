import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Lock, LogOut, MoreHorizontal, Calendar, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { api, getAdminToken, setAdminToken, clearAdminToken, adminHeaders } from "@/lib/api";
import { ADMIN } from "@/constants/testIds";

export default function Admin() {
  const [authed, setAuthed] = useState(!!getAdminToken());
  const [tokenInput, setTokenInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  const fetchAll = async () => {
    try {
      const [b, c, n] = await Promise.all([
        api.get("/bookings", adminHeaders()),
        api.get("/contact", adminHeaders()),
        api.get("/newsletter", adminHeaders()),
      ]);
      setBookings(b.data.bookings || []);
      setContacts(c.data.messages || []);
      setSubscribers(n.data.subscribers || []);
    } catch (err) {
      if (err?.response?.status === 401) {
        clearAdminToken();
        setAuthed(false);
        toast.error("Session expired — please log in again.");
      }
    }
  };

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed]);

  const login = async () => {
    try {
      await api.post("/admin/verify", { token: tokenInput });
      setAdminToken(tokenInput);
      setAuthed(true);
      toast.success("Welcome back.");
    } catch {
      toast.error("Invalid token.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/bookings/${id}/status?status=${status}`, null, adminHeaders());
      toast.success(`Marked ${status}`);
      fetchAll();
    } catch {
      toast.error("Could not update status.");
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#FAFCFD] px-6 pt-20">
        <div data-testid={ADMIN.loginForm} className="bg-white border border-slate-200 rounded-2xl p-8 w-full max-w-md shadow-[0_30px_60px_-30px_rgba(46,90,110,0.3)]">
          <div className="h-12 w-12 grid place-items-center bg-[#E8F0F4] rounded-xl text-[#2E5A6E] mb-5">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900">Admin access</h2>
          <p className="text-sm text-slate-500 mt-1">Enter the admin token to view bookings & contact submissions.</p>
          <Input
            data-testid={ADMIN.tokenInput}
            type="password"
            placeholder="Admin token"
            className="h-11 mt-6"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          <Button
            data-testid={ADMIN.loginBtn}
            onClick={login}
            className="brand-btn w-full h-11 mt-3 font-display font-semibold"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  const statusTone = (s) => ({
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-emerald-100 text-emerald-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-700",
  })[s] || "bg-slate-100 text-slate-700";

  return (
    <div className="min-h-screen pt-28 lg:pt-32 pb-24 bg-[#FAFCFD]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <div className="text-[12px] tracking-[0.22em] uppercase font-bold text-[#2E5A6E] mb-2">Admin Dashboard</div>
            <h1 className="font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Bookings & Inquiries
            </h1>
          </div>
          <Button
            data-testid={ADMIN.logoutBtn}
            variant="outline"
            onClick={() => { clearAdminToken(); setAuthed(false); }}
            className="border-slate-300"
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>

        <div className="grid sm:grid-cols-4 gap-5 mb-8">
          <StatCard label="Total bookings" value={bookings.length} icon={Calendar} />
          <StatCard label="Pending" value={bookings.filter((b) => b.status === "pending").length} icon={Calendar} tone="amber" />
          <StatCard label="Contact messages" value={contacts.length} icon={Mail} tone="blue" />
          <StatCard label="Newsletter subs" value={subscribers.length} icon={Send} tone="green" />
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger data-testid={ADMIN.bookingsTab} value="bookings" className="font-display">Bookings</TabsTrigger>
            <TabsTrigger data-testid={ADMIN.contactsTab} value="contacts" className="font-display">Contact messages</TabsTrigger>
            <TabsTrigger data-testid="admin-tab-newsletter" value="newsletter" className="font-display">Newsletter</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-5">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center text-slate-400 py-10">No bookings yet</TableCell></TableRow>
                  ) : bookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell>
                        <div className="font-display font-semibold">{b.date}</div>
                        <div className="text-xs text-slate-500">{b.time_slot} EST</div>
                      </TableCell>
                      <TableCell className="capitalize">{b.service}</TableCell>
                      <TableCell>
                        <div className="font-medium">{b.full_name}</div>
                        {b.company && <div className="text-xs text-slate-500">{b.company}</div>}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{b.email}</div>
                        <div className="text-xs text-slate-500">{b.phone}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusTone(b.status)} border-0 capitalize`}>{b.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Update status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => updateStatus(b.id, "confirmed")}>Confirm</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(b.id, "completed")}>Mark completed</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateStatus(b.id, "cancelled")} className="text-red-600">Cancel</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="mt-5">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center text-slate-400 py-10">No messages yet</TableCell></TableRow>
                  ) : contacts.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="text-xs text-slate-500 whitespace-nowrap">{c.created_at?.slice(0, 16).replace("T", " ")}</TableCell>
                      <TableCell>
                        <div className="font-medium">{c.name}</div>
                        {c.company && <div className="text-xs text-slate-500">{c.company}</div>}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{c.email}</div>
                        {c.phone && <div className="text-xs text-slate-500">{c.phone}</div>}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="text-sm text-slate-700 line-clamp-3">{c.message}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="newsletter" className="mt-5">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.length === 0 ? (
                    <TableRow><TableCell colSpan={2} className="text-center text-slate-400 py-10">No subscribers yet</TableCell></TableRow>
                  ) : subscribers.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="text-xs text-slate-500 whitespace-nowrap">{s.created_at?.slice(0, 16).replace("T", " ")}</TableCell>
                      <TableCell className="font-medium">{s.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, tone }) {
  const tones = {
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
      <div className={`h-11 w-11 rounded-lg grid place-items-center ${tones[tone] || "bg-[#E8F0F4] text-[#2E5A6E]"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-[11px] tracking-widest uppercase font-bold text-slate-500">{label}</div>
        <div className="font-display text-2xl font-extrabold text-slate-900">{value}</div>
      </div>
    </div>
  );
}
