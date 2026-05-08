import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown, LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const navItems = [
  { label: "Produkt", href: "/produkt" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "FAQ", href: "/#faq" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/#pricing" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const isSignedIn = auth.status === "signed-in";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-200",
        scrolled
          ? "border-b border-ink-100 bg-surface-50/90 shadow-soft backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-surface-100 hover:text-ink-900"
            >
              {item.label}
            </a>
          ))}
          <NavLink
            to="/app"
            className={({ isActive }) =>
              cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-100",
                isActive ? "text-ink-900" : "text-ink-600 hover:text-ink-900",
              )
            }
          >
            App
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <UserMenu />
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg border border-ink-200 bg-surface-0 px-3.5 py-2 text-sm font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-surface-100 sm:inline-flex"
              >
                Login
              </Link>
              <a
                href="/#pilot"
                className="group hidden h-10 items-center gap-1.5 rounded-lg bg-ink-900 px-4 text-sm font-medium text-surface-50 shadow-soft transition-all hover:-translate-y-px hover:bg-ink-800 hover:shadow-card md:inline-flex"
              >
                Pilotpraxis werden
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </>
          )}
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
              {isSignedIn ? (
                <button
                  type="button"
                  onClick={() => void auth.signOut()}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-ink-200 bg-surface-0 px-4 text-sm font-medium text-ink-800"
                >
                  <LogOut className="size-4" aria-hidden /> Abmelden
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
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
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function UserMenu() {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const email = auth.user?.email ?? "";
  const initials =
    email
      .split("@")[0]
      .split(/[._-]/)
      .map((p) => p[0]?.toUpperCase())
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "P";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-ink-200 bg-surface-0 px-2.5 text-sm font-medium text-ink-800 hover:border-ink-300 hover:bg-surface-100"
      >
        <span className="grid size-7 place-items-center rounded-md bg-accent-500 text-[11px] font-semibold text-white">
          {initials}
        </span>
        <span className="hidden max-w-[140px] truncate text-[13px] sm:block">{email}</span>
        <ChevronDown className="size-3.5 text-ink-400" aria-hidden />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-ink-100 bg-surface-0 shadow-card"
        >
          <div className="border-b border-ink-100 px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-ink-400">Angemeldet als</p>
            <p className="mt-0.5 truncate text-sm font-medium text-ink-900">{email}</p>
          </div>
          <Link
            to="/app"
            role="menuitem"
            className="block px-4 py-2.5 text-sm text-ink-700 hover:bg-surface-100"
          >
            Zur App
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => void auth.signOut()}
            className="flex w-full items-center gap-2 border-t border-ink-100 px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50"
          >
            <LogOut className="size-4" aria-hidden /> Abmelden
          </button>
        </div>
      ) : null}
    </div>
  );
}
