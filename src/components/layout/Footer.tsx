import { Link } from "react-router-dom";
import { Logo } from "@/components/ui/Logo";

const productLinks = [
  { label: "Pilot werden", href: "/#pilot" },
  { label: "Produkt-Vorschau", href: "/#produkt" },
  { label: "Datenschutz-Konzept", href: "/#datenschutz" },
];

const companyLinks = [
  { label: "Team", to: "/team" },
  { label: "Datenschutz", to: "/privacy" },
  { label: "Impressum", to: "/imprint" },
];

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-surface-0">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
            Praxino ist die Praxis-KI für Heilmittel — gebaut für Logopädie-, Ergo- und Physiotherapie-Praxen
            in Deutschland. Therapeut:in prüft und gibt final frei.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Produkt</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ink-700 hover:text-ink-900">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Rechtliches</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ink-700 hover:text-ink-900">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Kontakt</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href="mailto:hello@praxino.de" className="text-ink-700 hover:text-ink-900">
                hello@praxino.de
              </a>
            </li>
            <li className="text-ink-500">Made in Germany</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-100">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-ink-400 sm:flex-row sm:items-center lg:px-10">
          <p>© {new Date().getFullYear()} Praxino. Alle Rechte vorbehalten.</p>
          <p>Praxis-KI für Heilmittel · DSGVO-orientierte Architektur · DE/EU-Hosting vorgesehen</p>
        </div>
      </div>
    </footer>
  );
}
