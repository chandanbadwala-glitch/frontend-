import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="glass mx-auto mt-4 flex w-[min(1200px,94vw)] items-center justify-between rounded-2xl px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Gajraj Rozgar" className="h-10 w-auto rounded-lg object-contain" />
          <span className="font-display text-base font-semibold tracking-tight">
            Gajraj <span className="brand-text">Rozgar</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="brand-gradient rounded-full text-primary-foreground">
            <Link to="/auth">Get started</Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {open && (
        <div className="glass mx-auto mt-2 flex w-[min(1200px,94vw)] flex-col gap-3 rounded-2xl p-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}