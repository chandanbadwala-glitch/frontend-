import { Link } from "@tanstack/react-router";
import { Bell, LogOut, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { usePlatform } from "@/lib/platform-store";

type NavItem = { label: string; value: string; icon: ReactNode };

export function DashboardShell({
  role,
  account,
  plan,
  nav,
  active,
  onNavigate,
  children,
}: {
  role: string;
  account: string;
  plan: string;
  nav: NavItem[];
  active: string;
  onNavigate: (value: string) => void;
  children: ReactNode;
}) {
  const { notifications } = usePlatform();

  return (
    <div className="aurora min-h-screen">
      <div className="mx-auto flex w-[min(1400px,96vw)] gap-6 py-6">
        <aside className="glass sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-3xl p-4 lg:flex">
          <Link to="/" className="flex items-center gap-2 px-2 py-3">
            <img src="/logo.png" alt="Gajraj Rozgar" className="h-10 w-auto rounded-lg object-contain" />
            <span className="font-display text-sm font-semibold">Gajraj Rozgar</span>
          </Link>

          <nav className="mt-4 flex-1 space-y-1">
            {nav.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  active === item.value
                    ? "brand-gradient text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="glass-soft rounded-2xl p-3">
            <p className="text-xs text-muted-foreground">{role} plan</p>
            <p className="mt-1 text-sm font-semibold">{plan}</p>
            <Button size="sm" variant="secondary" className="mt-3 w-full rounded-lg">Manage plan</Button>
          </div>
          <Button asChild variant="ghost" size="sm" className="mt-2 justify-start text-muted-foreground">
            <Link to="/"><LogOut className="mr-2 size-4" /> Sign out</Link>
          </Button>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <header className="glass flex flex-wrap items-center gap-3 rounded-3xl p-3">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search staff, requirements, cities…" className="border-0 bg-secondary/60 pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full">{role}</Badge>
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
                <Bell className="size-4" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-accent" />
              </Button>
              <div className="hidden items-center gap-2 pl-2 sm:flex">
                <span className="brand-gradient grid size-9 place-items-center rounded-full text-xs font-semibold text-primary-foreground">
                  {account.slice(0, 2).toUpperCase()}
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-medium">{account}</p>
                  <p className="text-xs text-muted-foreground">{notifications.length} updates</p>
                </div>
              </div>
            </div>
          </header>

          <div className="lg:hidden">
            <div className="glass flex gap-1 overflow-x-auto rounded-2xl p-2">
              {nav.map((item) => (
                <button
                  key={item.value}
                  onClick={() => onNavigate(item.value)}
                  className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs ${
                    active === item.value ? "brand-gradient text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rise-in space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}