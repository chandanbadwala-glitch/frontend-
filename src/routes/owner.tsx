import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cities, jobCategories } from "@/lib/hospitality-data";
import { usePlatform } from "@/lib/platform-store";

export const Route = createFileRoute("/owner")({
  head: () => ({
    meta: [
      { title: "Owner Dashboard — ChefConnect Pro" },
      {
        name: "description",
        content:
          "Manage your properties, post staff requirements and request verified hospitality staff through the ChefConnect Pro admin desk.",
      },
      { property: "og:title", content: "Owner Dashboard — ChefConnect Pro" },
      { property: "og:description", content: "Post requirements and request verified hospitality staff." },
    ],
  }),
  component: OwnerPanel,
});

const nav = [
  { label: "Overview", value: "overview", icon: <LayoutDashboard className="size-4" /> },
  { label: "My properties", value: "property", icon: <Building2 className="size-4" /> },
  { label: "Requirements", value: "requirement", icon: <ClipboardList className="size-4" /> },
  { label: "Find staff", value: "search", icon: <Search className="size-4" /> },
  { label: "My requests", value: "requests", icon: <Users className="size-4" /> },
];

function OwnerPanel() {
  const [tab, setTab] = useState("overview");
  const { requests, requestStaff, restaurants } = usePlatform();

  return (
    <DashboardShell
      role="Owner"
      account="Rahul Kapoor"
      plan="Professional"
      nav={nav}
      active={tab}
      onNavigate={setTab}
    >
      {tab === "overview" && <Overview requests={requests.length} restaurants={restaurants} onGo={setTab} />}
      {tab === "property" && <AddProperty />}
      {tab === "requirement" && <RequirementForm onSubmitted={() => setTab("requests")} />}
      {tab === "search" && <StaffSearch onRequest={requestStaff} />}
      {tab === "requests" && <MyRequests />}
    </DashboardShell>
  );
}

function Overview({ requests, restaurants, onGo }: { requests: number; restaurants: any[]; onGo: (t: string) => void }) {
  return (
    <>
      <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
        <div>
          <h1 className="text-2xl font-semibold">Good evening, Rahul</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {restaurants?.length || 0} properties · {requests || 0} live requirements · admin desk responding in ~4 hours
          </p>
        </div>
        <Button className="brand-gradient rounded-full text-primary-foreground" onClick={() => onGo("requirement")}>
          <Sparkles className="mr-2 size-4" /> Post a requirement
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live requirements" value={String(requests)} hint="2 marked urgent" icon={<ClipboardList className="size-4" />} />
        <StatCard label="Staff requests" value={String(requests)} hint="Handled by admin desk" icon={<Users className="size-4" />} />
        <StatCard label="Profiles viewed" value="164" hint="Unlimited on Professional" icon={<Search className="size-4" />} />
        <StatCard label="Placements closed" value="12" hint="Avg. joining in 9 days" icon={<BadgeCheck className="size-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold">Your properties</h2>
          <div className="mt-4 space-y-3">
            {restaurants?.map((r) => (
              <div key={r.id} className="glass-soft flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.type} · {r.city} · {r.cuisine}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={r.status === "Verified" ? "default" : "secondary"} className="rounded-full">
                    {r.status || 'Verified'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{r.openRoles || 0} open roles</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="text-sm font-semibold">Plan usage</h2>
          <div className="mt-5 space-y-5 text-sm">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Requirements</span><span>7 / 25</span></div>
              <Progress value={28} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Urgent badges</span><span>2 / 5</span></div>
              <Progress value={40} className="mt-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Team seats</span><span>3 / 10</span></div>
              <Progress value={30} className="mt-2" />
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Renews 12 Sep · GST invoice emailed automatically.
          </p>
        </div>
      </div>
    </>
  );
}

function AddProperty() {
  return (
    <form
      className="glass rounded-3xl p-6"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Property submitted for verification", {
          description: "Admin will verify FSSAI / GST documents within 24 hours.",
        });
      }}
    >
      <h1 className="text-xl font-semibold">Add a property</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Verification unlocks staff requests. GST and FSSAI are optional but speed up approval.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Restaurant / hotel name"><Input required placeholder="Spice Terrace" className="bg-secondary/50" /></Field>
        <Field label="Property type">
          <Select defaultValue="Restaurant">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Restaurant", "Cafe", "Hotel", "Cloud Kitchen", "Banquet", "Bakery"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="City">
          <Select defaultValue="Mumbai">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Owner name"><Input placeholder="Rahul Kapoor" className="bg-secondary/50" /></Field>
        <Field label="Full address" className="md:col-span-2">
          <Input placeholder="Plot 22, Andheri East, Mumbai 400069" className="bg-secondary/50" />
        </Field>
        <Field label="Google Maps link" className="md:col-span-2">
          <Input placeholder="https://maps.google.com/…" className="bg-secondary/50" />
        </Field>
        <Field label="Cuisine"><Input placeholder="North Indian, Mughlai" className="bg-secondary/50" /></Field>
        <Field label="Opening hours"><Input placeholder="11:00 AM – 1:00 AM" className="bg-secondary/50" /></Field>
        <Field label="GST number (optional)"><Input placeholder="27ABCDE1234F1Z5" className="bg-secondary/50" /></Field>
        <Field label="FSSAI licence (optional)"><Input placeholder="11522998000123" className="bg-secondary/50" /></Field>
        <Field label="Description" className="md:col-span-2">
          <Textarea rows={4} placeholder="120-cover rooftop restaurant with live tandoor and bar." className="bg-secondary/50" />
        </Field>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Logo", "Photos & gallery", "Videos"].map((u) => (
          <div key={u} className="glass-soft rounded-2xl border-dashed p-5 text-center">
            <p className="text-sm font-medium">{u}</p>
            <p className="mt-1 text-xs text-muted-foreground">Drag & drop or browse</p>
            <Button type="button" variant="secondary" size="sm" className="mt-3 rounded-full">Upload</Button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          Verification status: <Badge variant="secondary" className="rounded-full">Pending documents</Badge>
        </p>
        <Button type="submit" className="brand-gradient rounded-full text-primary-foreground">Submit for verification</Button>
      </div>
    </form>
  );
}

function RequirementForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { requestStaff } = usePlatform();
  const [urgent, setUrgent] = useState(true);
  const [role, setRole] = useState("Tandoor Chef");
  const [city, setCity] = useState("Mumbai");
  const [vacancies, setVacancies] = useState(2);

  return (
    <form
      className="glass rounded-3xl p-6"
      onSubmit={(e) => {
        e.preventDefault();
        requestStaff({
          restaurant: "Spice Terrace",
          role,
          city,
          vacancies,
          salary: "₹45,000 – ₹55,000",
          urgent,
        });
        toast.success("Requirement sent to admin desk", {
          description: "Candidates are never contacted by you directly — admin will shortlist and introduce.",
        });
        onSubmitted();
      }}
    >
      <h1 className="text-xl font-semibold">Staff requirement</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your requirement goes to the admin desk, not to candidates. No contact details are exchanged.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Job title"><Input value={role} onChange={(e) => setRole(e.target.value)} className="bg-secondary/50" /></Field>
        <Field label="Category">
          <Select defaultValue="Kitchen">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="City">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Experience required"><Input placeholder="5 – 10 years" className="bg-secondary/50" /></Field>
        <Field label="Salary range"><Input placeholder="₹45,000 – ₹55,000" className="bg-secondary/50" /></Field>
        <Field label="Duty hours"><Input placeholder="10 hours · split shift" className="bg-secondary/50" /></Field>
        <Field label="Shift">
          <Select defaultValue="Evening">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{["Morning", "Evening", "Night", "Rotational", "Split"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Weekly off"><Input placeholder="1 day rotational" className="bg-secondary/50" /></Field>
        <Field label="Gender preference">
          <Select defaultValue="Any">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{["Any", "Male", "Female"].map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Age range"><Input placeholder="24 – 45" className="bg-secondary/50" /></Field>
        <Field label="Languages"><Input placeholder="Hindi, English" className="bg-secondary/50" /></Field>
        <Field label="Skills required" className="md:col-span-2">
          <Input placeholder="Tandoor, Mughlai, Kebabs, bulk cooking" className="bg-secondary/50" />
        </Field>
        <Field label="Benefits" className="md:col-span-2">
          <Textarea rows={3} placeholder="PF, ESI, uniform, annual bonus, staff meals" className="bg-secondary/50" />
        </Field>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="glass-soft rounded-2xl p-4">
          <Label className="text-xs text-muted-foreground">Vacancies: {vacancies}</Label>
          <Slider value={[vacancies]} min={1} max={20} step={1} onValueChange={(v) => setVacancies(v[0] ?? 1)} className="mt-3" />
        </div>
        <div className="space-y-3">
          <ToggleRow label="Accommodation provided" defaultChecked />
          <ToggleRow label="Food included" defaultChecked />
          <ToggleRow label="Immediate joining" />
          <div className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3">
            <span className="text-sm">Urgent hiring badge</span>
            <Switch checked={urgent} onCheckedChange={setUrgent} />
          </div>
        </div>
      </div>

      <Button type="submit" className="brand-gradient mt-6 w-full rounded-full text-primary-foreground sm:w-auto">
        Request staff from admin
      </Button>
    </form>
  );
}

function StaffSearch({ onRequest }: { onRequest: ReturnType<typeof usePlatform>["requestStaff"] }) {
  const { employees } = usePlatform();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("All");
  const [minExp, setMinExp] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [immediate, setImmediate] = useState(false);

  const results = useMemo(
    () =>
      employees?.filter((e) => {
        const q = query.toLowerCase();
        return (
          (!q || e.name?.toLowerCase().includes(q) || e.role?.toLowerCase().includes(q) || e.skills?.some((s) => s.toLowerCase().includes(q))) &&
          (category === "All" || e.category === category) &&
          (city === "All" || e.city === city) &&
          (e.experience || 0) >= minExp &&
          (!verifiedOnly || e.verified) &&
          (!immediate || e.availability === "Immediate")
        );
      }),
    [query, category, city, minExp, verifiedOnly, immediate, employees],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="glass h-fit rounded-3xl p-5">
        <h2 className="text-sm font-semibold">Advanced filters</h2>
        <div className="mt-4 space-y-4">
          <Field label="Keyword / skill"><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tandoor, latte art…" className="bg-secondary/50" /></Field>
          <Field label="Category">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All categories</SelectItem>
                {jobCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="City">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All cities</SelectItem>
                {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <div>
            <Label className="text-xs text-muted-foreground">Minimum experience: {minExp} yrs</Label>
            <Slider value={[minExp]} min={0} max={15} step={1} onValueChange={(v) => setMinExp(v[0] ?? 0)} className="mt-3" />
          </div>
          <div className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3">
            <span className="text-sm">Verified only</span>
            <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
          </div>
          <div className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3">
            <span className="text-sm">Available immediately</span>
            <Switch checked={immediate} onCheckedChange={setImmediate} />
          </div>
        </div>
      </aside>

      <div className="space-y-4">
        <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-3xl p-5">
          <div>
            <h1 className="text-lg font-semibold">{results.length} verified candidates</h1>
            <p className="text-xs text-muted-foreground">
              Contact details are hidden by policy — use “Request Hiring” and admin takes over.
            </p>
          </div>
          <Badge variant="secondary" className="rounded-full"><Sparkles className="mr-1.5 size-3.5 text-accent" /> AI ranked</Badge>
        </div>

        {results.length === 0 && (
          <div className="glass rounded-3xl p-12 text-center">
            <p className="font-semibold">No candidates match these filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Try widening experience or clearing the city filter.</p>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((e) => (
            <div key={e.id} className="glass flex flex-col rounded-3xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="brand-gradient grid size-12 place-items-center rounded-2xl font-semibold text-primary-foreground">
                    {e.initials}
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold">
                      {e.name}
                      {e.verified && <BadgeCheck className="size-4 text-primary" />}
                    </p>
                    <p className="text-xs text-muted-foreground">{e.role} · {e.city}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="rounded-full text-[10px]">{e.badge}</Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <Meta label="Experience" value={`${e.experience} yrs`} />
                <Meta label="Expected" value={`₹${e.expectedSalary.toLocaleString("en-IN")}`} />
                <Meta label="Availability" value={e.availability} />
                <Meta label="Qualification" value={e.qualification} />
                <Meta label="Current status" value={e.status} />
                <Meta label="AI match" value={`${e.matchScore}%`} />
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {e.skills.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full text-[10px]">{s}</Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-accent"><Star className="size-3.5 fill-current" /> {e.rating}</span>
                <span className="text-xs text-muted-foreground">{e.languages.join(", ")}</span>
              </div>

              <Button
                className="brand-gradient mt-5 rounded-full text-primary-foreground"
                onClick={() => {
                  onRequest({
                    restaurant: "Spice Terrace",
                    role: e.role,
                    city: e.city,
                    vacancies: 1,
                    salary: `₹${e.expectedSalary.toLocaleString("en-IN")}`,
                    urgent: false,
                    candidate: e.name,
                  });
                  toast.success("Hiring request sent to admin", {
                    description: `Admin will contact ${e.name} and confirm availability.`,
                  });
                }}
              >
                Request hiring
              </Button>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                Phone, email and WhatsApp are never shared.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MyRequests() {
  const { requests } = usePlatform();
  return (
    <div className="glass rounded-3xl p-6">
      <h1 className="text-lg font-semibold">Staff requests</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tracked by the admin desk. You'll be introduced once the candidate accepts.
      </p>
      <div className="mt-5 space-y-3">
        {requests.map((r) => (
          <div key={r.id} className="glass-soft flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                {r.vacancies} × {r.role}
                {r.urgent && <Badge className="brand-gradient rounded-full text-[10px] text-primary-foreground">Urgent</Badge>}
              </p>
              <p className="text-xs text-muted-foreground">
                {r.restaurant} · {r.city} · {r.salary} · {r.createdAt}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {r.candidate && <span className="text-xs text-muted-foreground">Candidate: {r.candidate}</span>}
              <Badge variant={r.stage === "Connected" ? "default" : "secondary"} className="rounded-full">{r.stage}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ToggleRow({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="glass-soft flex items-center justify-between rounded-2xl px-4 py-3">
      <span className="text-sm">{label}</span>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="text-xs font-medium">{value}</p>
    </div>
  );
}