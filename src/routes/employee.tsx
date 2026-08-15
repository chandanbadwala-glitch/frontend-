import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  MapPin,
  Sparkles,
  Star,
  Upload,
  UserRound,
} from "lucide-react";
import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cities } from "@/lib/hospitality-data";
import { usePlatform } from "@/lib/platform-store";

export const Route = createFileRoute("/employee")({
  head: () => ({
    meta: [
      { title: "Employee Dashboard — ChefConnect Pro" },
      {
        name: "description",
        content:
          "Complete your hospitality profile, upload documents and apply to verified restaurants, hotels and cafes — with zero spam calls.",
      },
      { property: "og:title", content: "Employee Dashboard — ChefConnect Pro" },
      { property: "og:description", content: "Apply to verified hospitality jobs. Admin handles every introduction." },
    ],
  }),
  component: EmployeePanel,
});

const nav = [
  { label: "Overview", value: "overview", icon: <LayoutDashboard className="size-4" /> },
  { label: "My profile", value: "profile", icon: <UserRound className="size-4" /> },
  { label: "Documents", value: "documents", icon: <FileText className="size-4" /> },
  { label: "Open jobs", value: "jobs", icon: <BriefcaseBusiness className="size-4" /> },
  { label: "Applications", value: "applications", icon: <Bookmark className="size-4" /> },
  { label: "Notifications", value: "alerts", icon: <Bell className="size-4" /> },
];

function EmployeePanel() {
  const [tab, setTab] = useState("overview");

  return (
    <DashboardShell role="Employee" account="Ramesh Iyer" plan="Free (always)" nav={nav} active={tab} onNavigate={setTab}>
      {tab === "overview" && <Overview onGo={setTab} />}
      {tab === "profile" && <ProfileForm />}
      {tab === "documents" && <Documents />}
      {tab === "jobs" && <Jobs />}
      {tab === "applications" && <Applications />}
      {tab === "alerts" && <Alerts />}
    </DashboardShell>
  );
}

function Overview({ onGo }: { onGo: (t: string) => void }) {
  const { applications, requests } = usePlatform();
  return (
    <>
      <div className="glass flex flex-wrap items-center justify-between gap-6 rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <span className="brand-gradient grid size-16 place-items-center rounded-3xl text-xl font-semibold text-primary-foreground">RI</span>
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
              Ramesh Iyer <BadgeCheck className="size-5 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground">
              Tandoor Chef · 11 years · <MapPin className="inline size-3.5" /> Mumbai
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge className="brand-gradient rounded-full text-[10px] text-primary-foreground">Gold badge</Badge>
              <Badge variant="secondary" className="rounded-full text-[10px]">Top rated</Badge>
              <Badge variant="secondary" className="rounded-full text-[10px]">Experienced</Badge>
            </div>
          </div>
        </div>
        <div className="min-w-56">
          <div className="flex justify-between text-xs text-muted-foreground"><span>Profile completion</span><span>82%</span></div>
          <Progress value={82} className="mt-2" />
          <Button size="sm" variant="secondary" className="mt-3 w-full rounded-full" onClick={() => onGo("profile")}>
            Complete profile
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="AI resume score" value="88 / 100" hint="Add cooking videos for +6" icon={<Sparkles className="size-4" />} />
        <StatCard label="Applications" value={String(applications.length)} hint="Admin tracked" icon={<BriefcaseBusiness className="size-4" />} />
        <StatCard label="Profile views" value="146" hint="By verified properties" icon={<UserRound className="size-4" />} />
        <StatCard label="Rating" value="4.9" hint="From 18 placements" icon={<Star className="size-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">AI recommended jobs</h2>
            <Button variant="ghost" size="sm" onClick={() => onGo("jobs")}>View all</Button>
          </div>
          <div className="mt-4 space-y-3">
            {requests?.slice(0, 3).map((j) => (
              <div key={j.id} className="glass-soft flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
                <div>
                  <p className="text-sm font-semibold">{j.role}</p>
                  <p className="text-xs text-muted-foreground">{j.restaurant?.name || String(j.restaurant)} · {j.city} · {j.salary}</p>
                </div>
                <Badge variant="secondary" className="rounded-full">94% match</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-6">
          <h2 className="text-sm font-semibold">AI skill suggestions</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="glass-soft rounded-xl p-3">Add <strong className="text-foreground">Food costing</strong> — 34% more manager roles.</li>
            <li className="glass-soft rounded-xl p-3">Add <strong className="text-foreground">HACCP hygiene</strong> — required by hotel chains.</li>
            <li className="glass-soft rounded-xl p-3">Upload a <strong className="text-foreground">live tandoor video</strong> to boost match score.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

function ProfileForm() {
  return (
    <form
      className="glass rounded-3xl p-6"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Profile updated", { description: "Admin will re-verify changed details." });
      }}
    >
      <h1 className="text-xl font-semibold">My profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Properties see your skills and experience — never your phone number or email.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Full name"><Input defaultValue="Ramesh Iyer" className="bg-secondary/50" /></Field>
        <Field label="Specialization"><Input defaultValue="Tandoor & Mughlai" className="bg-secondary/50" /></Field>
        <Field label="Qualification">
          <Select defaultValue="ITI">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Hotel Management", "ITI", "Diploma", "Graduate", "Post Graduate", "10th / 12th"].map((q) => (
                <SelectItem key={q} value={q}>{q}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Total experience"><Input defaultValue="11 years" className="bg-secondary/50" /></Field>
        <Field label="Cuisine expertise"><Input defaultValue="Mughlai, North Indian, Kebabs" className="bg-secondary/50" /></Field>
        <Field label="Skills"><Input defaultValue="Tandoor, Bulk cooking, Kitchen hygiene" className="bg-secondary/50" /></Field>
        <Field label="Current salary"><Input defaultValue="₹42,000" className="bg-secondary/50" /></Field>
        <Field label="Expected salary"><Input defaultValue="₹48,000" className="bg-secondary/50" /></Field>
        <Field label="Current employer"><Input defaultValue="Zaffran, Mumbai" className="bg-secondary/50" /></Field>
        <Field label="Previous employers"><Input defaultValue="Barbeque Nation, Copper Chimney" className="bg-secondary/50" /></Field>
        <Field label="Languages"><Input defaultValue="Hindi, Marathi, English" className="bg-secondary/50" /></Field>
        <Field label="Preferred city">
          <Select defaultValue="Mumbai">
            <SelectTrigger className="bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Awards & achievements" className="md:col-span-2">
          <Textarea rows={3} defaultValue="Best Kebab Chef, Mumbai Food Awards 2023" className="bg-secondary/50" />
        </Field>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <ToggleRow label="Available immediately" defaultChecked />
        <ToggleRow label="Open to relocation" />
      </div>
      <Button type="submit" className="brand-gradient mt-6 rounded-full text-primary-foreground">Save profile</Button>
    </form>
  );
}

const uploads = [
  { label: "Profile photo", state: "Uploaded" },
  { label: "Resume / CV", state: "Uploaded" },
  { label: "Aadhaar card", state: "Verified" },
  { label: "PAN card", state: "Pending" },
  { label: "Certificates", state: "Uploaded" },
  { label: "Cooking videos", state: "Missing" },
  { label: "Portfolio images", state: "Uploaded" },
  { label: "Experience letters", state: "Verified" },
];

function Documents() {
  return (
    <div className="glass rounded-3xl p-6">
      <h1 className="text-xl font-semibold">Documents & portfolio</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Verified documents unlock Gold and Premium badges, which double your shortlist rate.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {uploads.map((u) => (
          <div key={u.label} className="glass-soft rounded-2xl p-5 text-center">
            <Upload className="mx-auto size-5 text-primary" />
            <p className="mt-3 text-sm font-medium">{u.label}</p>
            <Badge
              variant={u.state === "Verified" ? "default" : "secondary"}
              className="mt-2 rounded-full text-[10px]"
            >
              {u.state}
            </Badge>
            <Button
              size="sm"
              variant="secondary"
              className="mt-3 w-full rounded-full"
              onClick={() => toast.success(`${u.label} sent for verification`)}
            >
              Upload
            </Button>
          </div>
        ))}
      </div>
      <div className="glass-soft mt-6 flex items-center gap-3 rounded-2xl p-4 text-sm">
        <Award className="size-5 text-accent" />
        Verification status: <Badge className="brand-gradient rounded-full text-primary-foreground">Gold verified</Badge>
      </div>
    </div>
  );
}

function Jobs() {
  const { requests, applyToJob } = usePlatform();
  const [city, setCity] = useState("All");
  const [immediate, setImmediate] = useState(false);
  const list = requests?.filter((j) => (city === "All" || j.city === city) && (!immediate || j.urgent)) || [];

  return (
    <div className="space-y-4">
      <div className="glass flex flex-wrap items-end justify-between gap-4 rounded-3xl p-5">
        <div>
          <h1 className="text-lg font-semibold">Open requirements</h1>
          <p className="text-xs text-muted-foreground">
            You can only click Apply — admin contacts the property on your behalf.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-40 bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All cities</SelectItem>
              {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <div className="glass-soft flex items-center gap-2 rounded-full px-3 py-2 text-xs">
            Urgent only <Switch checked={immediate} onCheckedChange={setImmediate} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((j) => (
          <div key={j.id} className="glass rounded-3xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  {j.role}
                  {j.urgent && <Badge className="brand-gradient rounded-full text-[10px] text-primary-foreground">Urgent</Badge>}
                </p>
                <p className="text-xs text-muted-foreground">{j.restaurant?.name || j.restaurant} · {j.restaurant?.type || "Restaurant"} · {j.city}</p>
              </div>
              <Badge variant="secondary" className="rounded-full text-[10px]">94% match</Badge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <Meta label="Salary" value={j.salary} />
              <Meta label="Shift" value={"Rotational"} />
              <Meta label="Vacancies" value={String(j.vacancies)} />
              <Meta label="Posted" value={j.createdAt} />
              <Meta label="Accommodation" value={"Provided"} />
              <Meta label="Food" value={"Included"} />
            </div>
            <div className="mt-5 flex gap-2">
              <Button
                className="brand-gradient flex-1 rounded-full text-primary-foreground"
                onClick={() => {
                  applyToJob({ employee: "Ramesh Iyer", jobTitle: j.role, restaurant: j.restaurant?.name || String(j.restaurant) });
                  toast.success("Applied via admin", { description: "Admin will contact you shortly." });
                }}
              >
                Apply
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full" aria-label="Save job" onClick={() => toast("Job saved")}>
                <Bookmark className="size-4" />
              </Button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">Owner contact details are never shown.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Applications() {
  const { applications } = usePlatform();
  return (
    <div className="glass rounded-3xl p-6">
      <h1 className="text-lg font-semibold">Application history</h1>
      <div className="mt-5 space-y-3">
        {applications.map((a) => (
          <div key={a.id} className="glass-soft flex flex-wrap items-center justify-between gap-3 rounded-2xl p-4">
            <div>
              <p className="text-sm font-semibold">{a.jobTitle}</p>
              <p className="text-xs text-muted-foreground">{a.restaurant} · applied {a.createdAt}</p>
            </div>
            <Badge variant={a.stage === "Connected" ? "default" : "secondary"} className="rounded-full">{a.stage}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function Alerts() {
  const { notifications } = usePlatform();
  const mine = notifications.filter((n) => n.audience === "employee" || n.audience === "admin");
  return (
    <div className="glass rounded-3xl p-6">
      <h1 className="text-lg font-semibold">Notifications</h1>
      <div className="mt-5 space-y-3">
        {mine.map((n) => (
          <div key={n.id} className="glass-soft rounded-2xl p-4">
            <p className="text-sm font-semibold">{n.title}</p>
            <p className="text-xs text-muted-foreground">{n.body}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
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