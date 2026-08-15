import { Link } from "@tanstack/react-router";


export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 py-12">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Gajraj Rozgar" className="h-10 w-auto rounded-lg object-contain" />
            <span className="font-display font-semibold">Gajraj Rozgar</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Admin-mediated hospitality staffing. Verified kitchens, verified people, no brokers in between.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Platform</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/owner">Owner panel</Link></li>
            <li><Link to="/employee">Employee panel</Link></li>
            <li><Link to="/admin">Admin console</Link></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Roles we staff</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Chefs, Tandoor & Continental</li>
            <li>Captains, Stewards, Waiters</li>
            <li>Baristas & Bartenders</li>
            <li>Housekeeping & Managers</li>
          </ul>
        </div>
        <div id="contact">
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>hiring@chefconnect.pro</li>
            <li>Admin desk: 10 AM – 9 PM IST</li>
            <li>Andheri East, Mumbai 400069</li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 w-[min(1200px,92vw)] text-xs text-muted-foreground">
        © {new Date().getFullYear()} ChefConnect Pro. All communication between properties and candidates is moderated by our admin desk.
      </p>
    </footer>
  );
}