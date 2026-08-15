import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Building2, ChefHat, Mail, ShieldCheck, UserRound } from "lucide-react";
import { API_URL } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ChefConnect Pro" },
      {
        name: "description",
        content:
          "Owner, employee and admin sign in for ChefConnect Pro, with OTP and email verification for hospitality staffing accounts.",
      },
      { property: "og:title", content: "Sign in — ChefConnect Pro" },
      { property: "og:description", content: "Separate secure logins for restaurant owners, hospitality staff and admins." },
    ],
  }),
  component: AuthPage,
});

type Step = "login" | "signup" | "forgot" | "otp" | "email" | "pending";

const roles = [
  { value: "owner", label: "Owner", icon: Building2, to: "/owner" as const, blurb: "Post requirements and request verified staff." },
  { value: "employee", label: "Employee", icon: UserRound, to: "/employee" as const, blurb: "Build your profile and apply to properties." },
  { value: "admin", label: "Admin", icon: ShieldCheck, to: "/admin" as const, blurb: "Verify, moderate and connect both sides." },
];

function AuthPage() {
  const [role, setRole] = useState("owner");
  const [step, setStep] = useState<Step>("login");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const active = roles.find((r) => r.value === role)!;

  return (
    <div className="aurora grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between p-12 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="brand-gradient grid size-9 place-items-center rounded-xl text-primary-foreground">
            <ChefHat className="size-5" />
          </span>
          <span className="font-display font-semibold">ChefConnect Pro</span>
        </Link>
        <div>
          <h1 className="max-w-md text-4xl font-semibold leading-tight">
            The hiring desk that <span className="brand-text">protects both sides</span>.
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            Owners never see candidate phone numbers. Candidates never get spam calls. Admin verifies
            documents, matches skills and makes the introduction.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">Aadhaar & PAN verified</Badge>
            <Badge variant="secondary" className="rounded-full">FSSAI & GST checks</Badge>
            <Badge variant="secondary" className="rounded-full">AI match scoring</Badge>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ChefConnect Pro</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="glass w-full max-w-md rounded-3xl p-7">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
              <Link to="/"><ArrowLeft className="mr-1.5 size-4" /> Home</Link>
            </Button>
            <ThemeToggle />
          </div>

          <Tabs value={role} onValueChange={setRole} className="mt-4">
            <TabsList className="grid w-full grid-cols-3 rounded-xl">
              {roles.map((r) => (
                <TabsTrigger key={r.value} value={r.value} className="rounded-lg text-xs">
                  <r.icon className="mr-1.5 size-3.5" /> {r.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <p className="mt-3 text-xs text-muted-foreground">{active.blurb}</p>

          {step === "login" && (
            <form
              className="mt-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                const password = (e.target as any).password.value;
                try {
                  const res = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                  });
                  const data = await res.json();
                  if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = active.to;
                  } else {
                    toast.error(data.msg || "Login failed");
                  }
                } catch(err) {
                  toast.error("Could not connect to backend");
                }
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@property.com" required className="bg-secondary/50" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" required className="bg-secondary/50" />
              </div>
              <button type="button" onClick={() => setStep("forgot")} className="text-xs text-primary">
                Forgot password?
              </button>
              <Button type="submit" className="brand-gradient w-full rounded-xl text-primary-foreground">
                Continue as {active.label}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                New here?{" "}
                <button type="button" className="text-primary" onClick={() => setStep("signup")}>
                  Create an account
                </button>
              </p>
            </form>
          )}

          {step === "signup" && (
            <form
              className="mt-6 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const name = (e.target as any).name.value;
                const email = (e.target as any).semail.value;
                const password = (e.target as any).spassword.value;
                
                try {
                  const res = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password, role })
                  });
                  const data = await res.json();
                  if (res.status === 201) {
                    setStep("pending");
                  } else if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = active.to;
                  } else {
                    toast.error(data.msg || "Registration failed");
                  }
                } catch(err) {
                  toast.error("Could not connect to backend");
                }
              }}
            >
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Rahul Kapoor" required className="bg-secondary/50" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="semail">Email</Label>
                <Input id="semail" type="email" placeholder="you@property.com" required className="bg-secondary/50" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sphone">Phone</Label>
                <Input id="sphone" placeholder="+91 98765 43210" className="bg-secondary/50" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spassword">Password</Label>
                <Input id="spassword" type="password" placeholder="Min 8 characters" required className="bg-secondary/50" />
              </div>
              <Button type="submit" className="brand-gradient w-full rounded-xl text-primary-foreground">
                Create {active.label} account
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Already registered?{" "}
                <button type="button" className="text-primary" onClick={() => setStep("login")}>Sign in</button>
              </p>
            </form>
          )}

          {step === "forgot" && (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Reset link sent", { description: "Check your inbox for the password reset link." });
                setStep("login");
              }}
            >
              <p className="text-sm text-muted-foreground">
                Enter your registered email and we'll send a secure reset link.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="femail">Email</Label>
                <Input id="femail" type="email" required placeholder="you@property.com" className="bg-secondary/50" />
              </div>
              <Button type="submit" className="brand-gradient w-full rounded-xl text-primary-foreground">
                Send reset link
              </Button>
              <button type="button" className="w-full text-center text-xs text-primary" onClick={() => setStep("login")}>
                Back to sign in
              </button>
            </form>
          )}

          {step === "otp" && (
            <div className="mt-6 space-y-5">
              <div>
                <h2 className="text-lg font-semibold">Verify OTP</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We sent a 6-digit code to your registered mobile number.
                </p>
              </div>
              <div className="flex gap-2">
                {otp.map((digit, i) => (
                  <Input
                    key={i}
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    aria-label={`OTP digit ${i + 1}`}
                    onChange={(e) => {
                      const next = [...otp];
                      next[i] = e.target.value.replace(/\D/g, "");
                      setOtp(next);
                    }}
                    className="h-12 bg-secondary/50 text-center text-lg"
                  />
                ))}
              </div>
              <Button asChild className="brand-gradient w-full rounded-xl text-primary-foreground">
                <Link to={active.to}>Verify & enter {active.label} panel</Link>
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Didn't get it? <button className="text-primary" onClick={() => toast("OTP resent")}>Resend code</button>
              </p>
            </div>
          )}

          {step === "email" && (
            <div className="mt-6 space-y-5 text-center">
              <span className="brand-gradient mx-auto grid size-14 place-items-center rounded-2xl text-primary-foreground">
                <Mail className="size-6" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">Verify your email</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We've sent a confirmation link to your inbox. Verify it to unlock your {active.label.toLowerCase()} dashboard.
                </p>
              </div>
              <Button asChild className="brand-gradient w-full rounded-xl text-primary-foreground">
                <Link to={active.to}>I've verified — continue</Link>
              </Button>
              <button className="text-xs text-primary" onClick={() => toast("Verification email resent")}>
                Resend verification email
              </button>
            </div>
          )}

          {step === "pending" && (
            <div className="mt-6 space-y-5 text-center">
              <span className="brand-gradient mx-auto grid size-14 place-items-center rounded-2xl text-primary-foreground">
                <ShieldCheck className="size-6" />
              </span>
              <div>
                <h2 className="text-lg font-semibold">Account Pending Approval</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your registration was successful! For security, our admin team must verify and approve your account before you can log in.
                </p>
              </div>
              <Button onClick={() => setStep("login")} className="brand-gradient w-full rounded-xl text-primary-foreground">
                Back to Sign in
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}