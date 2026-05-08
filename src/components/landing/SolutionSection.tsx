import { Mic, Brain, FileSignature } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

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
      <Reveal>
        <SectionHeading
          eyebrow="So funktioniert Praxino"
          title="Aufnehmen. Verstehen. Berichten."
          description="Praxino ist kein Ersatz für Therapeut:innen. Es ist ein Werkzeug, das den Berg aus Dokumentation kleiner macht — überprüfbar, strukturiert und unter deiner Kontrolle."
        />
      </Reveal>

      <div className="relative mt-16">
        {/* Verbindende Linie nur auf Desktop */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-12 hidden h-12 w-full lg:block"
          viewBox="0 0 1200 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M120 40 C 320 -20, 520 80, 720 40 S 1080 40, 1080 40"
            stroke="url(#solutionGradient)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <defs>
            <linearGradient id="solutionGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f7c75" stopOpacity="0" />
              <stop offset="20%" stopColor="#0f7c75" stopOpacity="0.55" />
              <stop offset="80%" stopColor="#0f7c75" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0f7c75" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <RevealStagger className="grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <RevealItem key={s.n}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink-100 bg-surface-0 p-7 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <s.icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-[2.6rem] font-medium leading-none tracking-tight text-ink-100">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold tracking-tight text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{s.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>

      <Reveal delay={0.15}>
        <p className="mt-12 max-w-3xl rounded-2xl border border-ink-100 bg-surface-0 p-5 text-sm leading-relaxed text-ink-500 shadow-soft">
          <strong className="text-ink-800">Wichtig:</strong> Praxino schreibt nicht eigenmächtig
          medizinische Wahrheit. Praxino erstellt einen Vorschlag.{" "}
          <span className="text-ink-800">Therapeut:in prüft, korrigiert und signiert.</span>
        </p>
      </Reveal>
    </Section>
  );
}
