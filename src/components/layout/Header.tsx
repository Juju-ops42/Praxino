import { Link, NavLink } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Produkt", href: "#produkt" },
  { label: "Datenschutz", href: "#datenschutz" },
  { label: "Pilot", href: "#pilot" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100/70 bg-surface-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition-colors hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
          <NavLink
            to="/app"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors",
                isActive ? "text-ink-900" : "text-ink-600 hover:text-ink-900",
              )
            }
          >
            App
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/app"
            className="hidden rounded-lg border border-ink-200 bg-surface-0 px-3.5 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-surface-100 sm:inline-flex"
          >
            Login
          </Link>
          <a
            href="#pilot"
            className="inline-flex h-10 items-center rounded-lg bg-ink-900 px-4 text-sm font-medium text-surface-50 shadow-soft transition-colors hover:bg-ink-800"
          >
            Pilotpraxis werden
          </a>
        </div>
      </div>
    </header>
  );
}
