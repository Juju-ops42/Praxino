import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Produkt", href: "/#produkt" },
  { label: "Datenschutz", href: "/#datenschutz" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Pilot", href: "/#pilot" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

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
            href="/#pilot"
            className="hidden h-10 items-center rounded-lg bg-ink-900 px-4 text-sm font-medium text-surface-50 shadow-soft transition-colors hover:bg-ink-800 md:inline-flex"
          >
            Pilotpraxis werden
          </a>
          <button
            type="button"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-grid size-10 place-items-center rounded-lg border border-ink-200 bg-surface-0 text-ink-700 hover:bg-surface-100 md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ink-100 bg-surface-50 md:hidden"
        >
          <nav
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3"
            aria-label="Mobile Navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink-700 hover:bg-surface-100"
              >
                {item.label}
              </a>
            ))}
            <NavLink
              to="/app"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-3 text-base font-medium",
                  isActive ? "bg-surface-100 text-ink-900" : "text-ink-700 hover:bg-surface-100",
                )
              }
            >
              App
            </NavLink>
            <div className="mt-2 grid gap-2 px-1 pb-2">
              <Link
                to="/app"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-ink-200 bg-surface-0 px-4 text-sm font-medium text-ink-800"
              >
                Login
              </Link>
              <a
                href="/#pilot"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-ink-900 px-4 text-sm font-medium text-surface-50"
              >
                Pilotpraxis werden
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
