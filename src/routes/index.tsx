import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";
import heroImage from "@/assets/hero-kitchen.jpg";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { faqs, hiringSteps, plans, testimonials } from "@/lib/hospitality-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChefConnect Pro — AI Hospitality Staffing, Admin Verified" },
      {
        name: "description",
        content:
          "Hire verified chefs, baristas, captains and housekeeping staff for restaurants, hotels and cafes. Every connection is made by our admin desk — no brokers, no spam.",
      },
      { property: "og:title", content: "ChefConnect Pro — AI Hospitality Staffing" },
      {
        property: "og:description",
        content: "10,000+ verified hospitality professionals across 500+ cities, connected by our admin desk.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="aurora min-h-screen overflow-x-hidden">
      <SiteHeader />

      <section className="mx-auto grid w-[min(1200px,92vw)] items-center gap-12 pt-16 pb-8 lg:grid-cols-2 lg:pt-24">
        <div className="rise-in">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            <Sparkles className="mr-1.5 size-3.5 text-accent" /> AI matching · Admin verified
          </Badge>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            Hospitality hiring, <span className="brand-text">handled by humans</span> who know kitchens.
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Restaurants post requirements. Chefs, baristas, captains and housekeeping staff apply. Our admin
            desk verifies both sides and makes the introduction — owners and candidates never exchange
            contact details directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="brand-gradient rounded-full px-6 text-primary-foreground">
              <Link to="/owner">
                <Building2 className="mr-2 size-4" /> I need staff
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-6">
              <Link to="/employee">
                <UserRound className="mr-2 size-4" /> I'm looking for work
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Aadhaar, PAN, FSSAI & GST checked before any introduction.
          </div>
        </div>

        <div className="relative">
          <div className="glass overflow-hidden rounded-[2rem] p-2">
            <img
              src={heroImage}
              alt="Chef brigade plating dishes in a premium hotel kitchen"
              width={1600}
              height={1104}
              className="h-[380px] w-full rounded-[1.6rem] object-cover sm:h-[460px]"
            />
          </div>
          <div className="glass float-slow absolute -bottom-6 left-4 w-56 rounded-2xl p-4 sm:left-8">
            <p className="text-xs text-muted-foreground">Admin shortlist ready</p>
            <p className="mt-1 text-sm font-semibold">3 tandoor chefs · Mumbai</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-primary">
              <BadgeCheck className="size-3.5" /> All documents verified
            </div>
          </div>
          <div className="glass absolute -right-2 top-8 hidden w-44 rounded-2xl p-4 sm:block">
            <p className="text-xs text-muted-foreground">AI match score</p>
            <p className="brand-text mt-1 font-display text-3xl font-semibold">96%</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 w-[min(1200px,92vw)]">
        <div className="glass grid gap-6 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="brand-text font-display text-3xl font-semibold sm:text-4xl">10,000+</p>
            <p className="mt-1 text-sm text-muted-foreground">Verified Employees</p>
          </div>
          <div>
            <p className="brand-text font-display text-3xl font-semibold sm:text-4xl">1,500+</p>
            <p className="mt-1 text-sm text-muted-foreground">Restaurants & Hotels</p>
          </div>
          <div>
            <p className="brand-text font-display text-3xl font-semibold sm:text-4xl">500+</p>
            <p className="mt-1 text-sm text-muted-foreground">Cities Covered</p>
          </div>
          <div>
            <p className="brand-text font-display text-3xl font-semibold sm:text-4xl">24,800+</p>
            <p className="mt-1 text-sm text-muted-foreground">Successful Placements</p>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto mt-28 w-[min(1200px,92vw)]">
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
          One rule: every connection goes through admin.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Owners only click <strong className="text-foreground">Request Staff</strong>. Candidates only click{" "}
          <strong className="text-foreground">Apply</strong>. Everything in between is our job.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {hiringSteps.map((step, i) => (
            <div key={step.title} className="glass rounded-2xl p-5">
              <span className="brand-gradient grid size-8 place-items-center rounded-lg text-sm font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-sm font-semibold">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </section>



      <section id="pricing" className="mx-auto mt-28 w-[min(1200px,92vw)]">
        <h2 className="text-3xl font-semibold sm:text-4xl">Plans for single kitchens to hotel groups</h2>
        <p className="mt-3 text-muted-foreground">Candidates never pay. Properties pay for reach and admin priority.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`glass flex flex-col rounded-3xl p-6 ${p.highlight ? "glow ring-1 ring-primary/40" : ""}`}
            >
              {p.highlight && <Badge className="brand-gradient mb-3 w-fit rounded-full text-primary-foreground">Most popular</Badge>}
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="mt-3 font-display text-3xl font-semibold">{p.price}</p>
              <p className="text-xs text-muted-foreground">{p.period}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted-foreground">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}</li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-6 rounded-full ${p.highlight ? "brand-gradient text-primary-foreground" : ""}`}
                variant={p.highlight ? "default" : "secondary"}
              >
                <Link to="/auth">Choose {p.name}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section id="stories" className="mx-auto mt-28 w-[min(1200px,92vw)]">
        <h2 className="text-3xl font-semibold sm:text-4xl">Success stories from the floor</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="glass rounded-3xl p-6">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-5 text-xs text-muted-foreground">
                <span className="block font-semibold text-foreground">{t.name}</span>
                {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto mt-28 w-[min(900px,92vw)]">
        <h2 className="text-3xl font-semibold sm:text-4xl">Questions, answered</h2>
        <Accordion type="single" collapsible className="glass mt-8 rounded-3xl px-6 py-2">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="mx-auto mt-28 w-[min(1200px,92vw)]">
        <div className="glass glow flex flex-col items-center gap-6 rounded-[2rem] p-12 text-center">
          <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
            Staff your next season without a single cold call
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Join 1,500+ properties and 10,000+ hospitality professionals already hiring through our admin desk.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="brand-gradient rounded-full px-6 text-primary-foreground">
              <Link to="/auth">Create free account</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full px-6">
              <Link to="/admin">View admin console</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
