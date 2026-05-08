import { Mic, Brain, FileSignature, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  {
    n: "01",
    icon: Mic,
    title: "Aufnehmen",
    body:
      "Therapeut:in startet eine Sitzung im Browser. Praxino hört im Hintergrund mit — ohne den Workflow zu unterbrechen.",
  },
  {
    n: "02",
    icon: Brain,
    title: "Verstehen",
    body:
      "Praxino strukturiert Inhalte entlang therapeutischer Fachsprache, ICD-10, ICF, Therapieziel und Verordnungslogik.",
  },
  {
    n: "03",
    icon: FileSignature,
    title: "Berichten",
    body:
      "Aus Sitzung, Verordnung und Verlauf entsteht ein überprüfbarer Berichtsentwurf — Therapeut:in prüft, korrigiert und gibt frei.",
  },
];

export function SolutionSection() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="So funktioniert Praxino"
        title="Aufnehmen. Verstehen. Berichten."
        description="Praxino ist kein Ersatz für Therapeut:innen. Es ist ein Werkzeug, das den Berg aus Dokumentation kleiner macht — überprüfbar, strukturiert und unter deiner Kontrolle."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {steps.map((s, i) => (
          <article
            key={s.n}
            className="relative overflow-hidden rounded-2xl border border-ink-100 bg-surface-0 p-7 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-grid size-11 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                <s.icon className="size-5" aria-hidden />
              </span>
              <span className="font-display text-3xl font-semibold tracking-tight text-ink-200">
                {s.n}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-ink-900">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{s.body}</p>
            {i < steps.length - 1 ? (
              <ArrowRight
                aria-hidden
                className="absolute right-5 top-1/2 hidden size-5 -translate-y-1/2 text-ink-200 lg:block"
              />
            ) : null}
          </article>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-500">
        <strong className="text-ink-800">Wichtig:</strong> Praxino schreibt nicht eigenmächtig medizinische
        Wahrheit. Praxino erstellt einen Vorschlag. Therapeut:in prüft, korrigiert und signiert.
      </p>
    </Section>
  );
}
