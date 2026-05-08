import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, AudioLines, FileSignature, Settings, Construction } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const cards = [
  {
    icon: Users,
    title: "Patient:innen",
    body: "Strukturierte Stammdaten, Verordnungen, Verlauf — gebaut für Heilmittel-Workflows.",
  },
  {
    icon: AudioLines,
    title: "Sitzungen",
    body: "Live-Sitzung mit Audio-Begleitung und vorgeschlagener Doku, später mit Transkription.",
  },
  {
    icon: FileSignature,
    title: "Berichte",
    body: "Therapiebericht, Verlängerungsantrag, Befundbericht, MDK — alle prüfbar und editierbar.",
  },
  {
    icon: Settings,
    title: "Einstellungen",
    body: "Praxis, Team, Vorlagen, Rollen und Rechte. Datenschutzkonzept im Hintergrund.",
  },
];

export function AppPlaceholderPage() {
  useEffect(() => {
    document.title = "Praxino App · in Vorbereitung";
  }, []);

  return (
    <PageShell>
      <Section tone="surface" containerClassName="py-20 lg:py-28">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft className="size-4" aria-hidden /> Zurück zur Landingpage
        </Link>
        <div className="mt-8 max-w-3xl">
          <Badge tone="creme">
            <Construction className="size-3.5" aria-hidden /> In Vorbereitung
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl text-balance">
            Praxino App
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-500 text-pretty">
            Hier entsteht die Arbeitsoberfläche für Sitzungen, Patient:innen, Berichte und
            Praxis-Dokumentation. Wir bauen Praxino zusammen mit Pilotpraxen — Schritt für
            Schritt, ohne medizinische Kurzschlüsse.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-ink-100 bg-surface-0 p-6 shadow-soft"
            >
              <span className="inline-grid size-10 place-items-center rounded-lg bg-ink-900 text-accent-200">
                <c.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-ink-900">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-ink-100 bg-surface-0 p-8 shadow-soft lg:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-ink-900">
            Was Praxino noch nicht macht
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-500">
            Praxino verarbeitet aktuell noch keine Patientendaten produktiv, führt keine
            medizinischen Diagnosen durch und ist nicht an PVS-Systeme angebunden. Diese
            Funktionen werden gemeinsam mit Pilotpraxen entlang einer klaren Datenschutz-
            Roadmap entwickelt.
          </p>
          <Link
            to="/#pilot"
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-900 px-5 text-sm font-medium text-surface-50 transition-colors hover:bg-ink-800"
          >
            Pilotpraxis werden
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
