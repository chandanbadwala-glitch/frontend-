import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BadgeCheck,
  Building2,
  IndianRupee,
  LayoutDashboard,
  Link2,
  MessageSquare,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  hiringTrend,
  popularSkills,
  topCities,
} from "@/lib/hospitality-data";
import { usePlatform } from "@/lib/platform-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — ChefConnect Pro" },
      {
        name: "description",
        content:
          "Verify properties and staff, review hiring requests, connect owners with employees and track revenue across the ChefConnect Pro network.",
      },
      { property: "og:title", content: "Admin Console — ChefConnect Pro" },
      { property: "og:description", content: "Verification, moderation and matchmaking for the hospitality network." },
    ],
  }),
  component: AdminPanel,
});

const nav = [
  { label: "Super dashboard", value: "overview", icon: <LayoutDashboard className="size-4" /> },
  { label: "Hiring requests", value: "requests", icon: <Link2 className="size-4" /> },
  { label: "Verification", value: "verify", icon: <ShieldCheck className="size-4" /> },
  { label: "Users", value: "users", icon: <Users className="size-4" /> },
  { label: "Payments", value: "payments", icon: <IndianRupee className="size-4" /> },
  { label: "Messages", value: "messages", icon: <MessageSquare className="size-4" /> },
  { label: "Masters", value: "masters", icon: <Settings2 className="size-4" /> },
];

function AdminPanel() {
  const [tab, setTab] = useState("overview");
  return (
    <DashboardShell role="Admin" account="Hiring Desk" plan="Super admin" nav={nav} active={tab} onNavigate={setTab}>
      {tab === "overview" && <Overview />}
      {tab === "requests" && <Requests />}
      {tab === "verify" && <Verification />}
      {tab === "users" && <UsersTable />}
      {tab === "payments" && <Payments />}
      {tab === "messages" && <Messages />}
      {tab === "masters" && <Masters />}
    </DashboardShell>
  );
}

function Overview() {
  const { requests, stats } = usePlatform();
  const pending = requests.filter((r) => r.stage !== "Connected").length;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total restaurants" value={stats?.totalRestaurants || "..."} hint="86 added this month" icon={<Building2 className="size-4" />} />
        <StatCard label="Total employees" value={stats?.totalEmployees || "..."} hint="1,204 immediately available" icon={<Users className="size-4" />} />
        <StatCard label="Pending requests" value={String(pending)} hint="SLA 4 hours" icon={<Link2 className="size-4" />} />
        <StatCard label="Pending verification" value="0" hint="Docs awaiting review" icon={<ShieldCheck className="size-4" />} />
        <StatCard label="Live jobs" value="742" hint="128 urgent" icon={<Activity className="size-4" />} />
        <StatCard label="Successful hiring" value="24,806" hint="+314 this month" icon={<BadgeCheck className="size-4" />} />
        <StatCard label="Revenue (MTD)" value="₹28.4L" hint="Subscriptions + commission" icon={<IndianRupee className="size-4" />} />
        <StatCard label="Active subscriptions" value="683" hint="41% Professional" icon={<IndianRupee className="size-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold">Requests vs placements</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hiringTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Area type="monotone" dataKey="requests" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="placements" stroke="var(--accent)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <h2 className="text-sm font-semibold">Top cities by hires</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCities}>
                <CartesianGrid strokeOpacity={0.1} vertical={false} />
                <XAxis dataKey="city" stroke="var(--muted-foreground)" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    color: "var(--popover-foreground)",
                  }}
                />
                <Bar dataKey="hires" fill="var(--primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <h2 className="text-sm font-semibold">Recent activity</h2>
          <ul className="mt-4 space-y-3">
            {/* Real activity feed to be implemented */}
            <p className="text-xs text-muted-foreground">No recent activity.</p>
          </ul>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="text-sm font-semibold">Most demanded skills</h2>
          <div className="mt-4 space-y-4">
            {popularSkills.map((s) => (
              <div key={s.skill}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{s.skill}</span>
                  <span>{s.demand}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-secondary">
                  <div className="brand-gradient h-full rounded-full" style={{ width: `${s.demand}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Average placed salary: ₹41,300 · Avg. time to hire: 9 days</p>
        </div>
      </div>
    </>
  );
}

function Requests() {
  const { requests, advanceRequest } = usePlatform();
  return (
    <div className="glass rounded-3xl p-6">
      <h1 className="text-lg font-semibold">Hiring requests & connections</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Only admin can move a request forward. Owners and employees never see each other's contact details.
      </p>
      <div className="mt-5 space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="glass-soft rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  {r.vacancies} × {r.role} — {r.restaurant}
                  {r.urgent && <Badge className="brand-gradient rounded-full text-[10px] text-primary-foreground">Urgent</Badge>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {r.city} · {r.salary} · raised {r.createdAt}
                  {r.candidate ? ` · candidate: ${r.candidate}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={r.stage === "Connected" ? "default" : "secondary"} className="rounded-full">{r.stage}</Badge>
                <Button
                  size="sm"
                  className="brand-gradient rounded-full text-primary-foreground"
                  disabled={r.stage === "Connected"}
                  onClick={() => {
                    advanceRequest(r.id);
                    toast.success("Request moved forward", { description: `${r.restaurant} · ${r.role}` });
                  }}
                >
                  {r.stage === "Employee accepted" ? "Connect both" : "Advance"}
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["New request", "Admin reviewing", "Candidate contacted", "Employee accepted", "Connected"].map((s) => (
                <span
                  key={s}
                  className={`rounded-full px-2.5 py-1 text-[10px] ${
                    s === r.stage ? "brand-gradient text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Verification() {
  const { pendingUsers, approveUser } = usePlatform();

  return (
    <div className="glass rounded-3xl p-6">
      <h1 className="text-lg font-semibold">Pending User Approvals</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Review newly registered owners and employees. They cannot access their dashboards until approved.
      </p>
      
      {pendingUsers.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border/50 p-12 text-center text-sm text-muted-foreground">
          No pending users at the moment.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {pendingUsers.map((user) => (
            <div key={user.id} className="glass-soft flex items-center justify-between rounded-2xl p-4">
              <div>
                <h3 className="font-medium text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email} • Role: <span className="capitalize">{user.role}</span></p>
              </div>
              <Button 
                onClick={() => {
                  approveUser(user.id);
                  toast.success(`${user.name} approved successfully`);
                }}
                className="brand-gradient rounded-full text-primary-foreground"
              >
                Approve User
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UsersTable() {
  const { employees } = usePlatform();
  const [q, setQ] = useState("");
  const rows = employees?.filter((e) => e.name?.toLowerCase().includes(q.toLowerCase())) || [];
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Employee accounts</h1>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search users…" className="w-56 bg-secondary/50" />
      </div>
      <div className="mt-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Exp.</TableHead>
              <TableHead>Badge</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell className="text-muted-foreground">{e.role}</TableCell>
                <TableCell className="text-muted-foreground">{e.city}</TableCell>
                <TableCell>{e.experience} yrs</TableCell>
                <TableCell><Badge variant="secondary" className="rounded-full text-[10px]">{e.badge}</Badge></TableCell>
                <TableCell>
                  <Badge variant={e.verified ? "default" : "secondary"} className="rounded-full text-[10px]">
                    {e.verified ? "Verified" : "Unverified"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" onClick={() => toast(`${e.name} suspended`)}>Suspend</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const invoices = [
  { id: "INV-2291", party: "Spice Terrace", type: "Placement commission", amount: "₹18,000", status: "Paid" },
  { id: "INV-2290", party: "The Amber Palace", type: "Enterprise subscription", amount: "₹1,20,000", status: "Paid" },
  { id: "INV-2288", party: "Copper Bean Cafe", type: "Basic subscription", amount: "₹1,999", status: "Pending" },
  { id: "INV-2285", party: "Maison Noir", type: "Placement commission", amount: "₹24,000", status: "Overdue" },
];

function Payments() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Revenue (MTD)" value="₹28.4L" hint="GST invoices auto-issued" />
        <StatCard label="Commission earned" value="₹9.7L" hint="Avg. 6.2% per placement" />
        <StatCard label="Wallet balance" value="₹1.2L" hint="Refundable credits" />
      </div>
      <div className="glass rounded-3xl p-6">
        <h1 className="text-lg font-semibold">Invoices</h1>
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.id}</TableCell>
                  <TableCell className="text-muted-foreground">{i.party}</TableCell>
                  <TableCell className="text-muted-foreground">{i.type}</TableCell>
                  <TableCell>{i.amount}</TableCell>
                  <TableCell>
                    <Badge variant={i.status === "Paid" ? "default" : "secondary"} className="rounded-full text-[10px]">
                      {i.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => toast.success(`${i.id} GST invoice generated`)}>
                      Generate GST
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

const threads = [
  { name: "Rahul Kapoor", side: "Owner", last: "Can you send two more tandoor profiles?", time: "3 min ago" },
  { name: "Ramesh Iyer", side: "Employee", last: "I can join from 1st. Accommodation needed.", time: "22 min ago" },
  { name: "Farah Sheikh", side: "Owner", last: "Banquet season starts next week.", time: "1h ago" },
  { name: "Priya Sharma", side: "Employee", last: "Accepted the Copper Bean offer, thank you!", time: "Yesterday" },
];

function Messages() {
  const [active, setActive] = useState(0);
  const thread = threads[active]!;
  return (
    <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
      <div className="glass rounded-3xl p-4">
        <h1 className="px-2 text-sm font-semibold">Moderated chats</h1>
        <p className="mt-1 px-2 text-[11px] text-muted-foreground">Admin ↔ Owner and Admin ↔ Employee only.</p>
        <div className="mt-3 space-y-1">
          {threads.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`w-full rounded-2xl p-3 text-left transition-colors ${
                i === active ? "bg-secondary" : "hover:bg-secondary/60"
              }`}
            >
              <p className="flex items-center justify-between text-sm font-medium">
                {t.name}
                <Badge variant="secondary" className="rounded-full text-[10px]">{t.side}</Badge>
              </p>
              <p className="truncate text-xs text-muted-foreground">{t.last}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="glass flex min-h-[420px] flex-col rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{thread.name}</p>
            <p className="text-xs text-muted-foreground">{thread.side} · last active {thread.time}</p>
          </div>
          <Badge variant="secondary" className="rounded-full">Moderated</Badge>
        </div>
        <div className="mt-6 flex-1 space-y-3">
          <div className="glass-soft max-w-[75%] rounded-2xl p-3 text-sm">{thread.last}</div>
          <div className="brand-gradient ml-auto max-w-[75%] rounded-2xl p-3 text-sm text-primary-foreground">
            Noted. Sharing three verified profiles within the hour — I'll confirm availability first.
          </div>
        </div>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent");
          }}
        >
          <Input placeholder="Write a message…" className="bg-secondary/50" />
          <Button type="submit" className="brand-gradient rounded-full text-primary-foreground">Send</Button>
        </form>
      </div>
    </div>
  );
}

const masters = [
  { title: "Categories", items: ["Kitchen", "Service", "Beverage", "Bakery", "Housekeeping", "Management"] },
  { title: "Skills", items: ["Tandoor", "Continental", "Mixology", "Latte art", "Dim sum", "Costing"] },
  { title: "Cities", items: ["Mumbai", "Delhi", "Bengaluru", "Pune", "Jaipur", "Goa"] },
  { title: "Plans & coupons", items: ["Free", "Basic", "Professional", "Enterprise", "SEASON25", "HOTEL10"] },
];

function Masters() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {masters.map((m) => (
        <div key={m.title} className="glass rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">{m.title}</h2>
            <Button size="sm" variant="secondary" className="rounded-full" onClick={() => toast.success(`${m.title} entry added`)}>
              Add
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {m.items.map((i) => (
              <Badge key={i} variant="secondary" className="rounded-full">{i}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}