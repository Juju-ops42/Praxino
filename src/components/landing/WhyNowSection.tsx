import { Brain, Building2, Activity, UserCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const reasons = [
  {
    icon: Brain,
    title: "KI versteht Fachsprache.",
    body: "Sprachmodelle sind heute gut genug für medizinisch-therapeutische Kontexte — wenn man sie sorgfältig kalibriert.",
  },
  {
    icon: Building2,
    title: "Praxen sind digitaler.",
    body: "PVS, Online-Terminierung, e-Rezept — Praxen erwarten Werkzeuge, die ihren Alltag wirklich beschleunigen.",
  },
  {
    icon: Activity,
    title: "Bürokratie wächst.",
    body: "Verordnungslogik, Verlängerungslogik, MDK — die Anforderungen an saubere Doku werden nicht weniger.",
  },
  {
    icon: UserCheck,
    title: "Fachkräfte sind knapp.",
    body: "Jede Stunde, die du zurückgewinnst, ist eine Stunde für Patient:innen — nicht für Formulare.",
  },
];

export function WhyNowSection() {
  return (
    <Section tone="creme">
      <Reveal>
        <SectionHeading
          eyebrow="Warum jetzt"
          title="Der Zeitpunkt ist gut. Praxen brauchen Werkzeuge, die im Workflow helfen."
          description="Praxino ist nicht für die Buzzword-Bingo-Liste — sondern für eine konkrete, alltagstaugliche Verbesserung."
        />
      </Reveal>
      <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {reasons.map((r) => (
          <RevealItem key={r.title}>
            <article className="group h-full rounded-2xl border border-ink-100 bg-surface-0 p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card">
              <span className="inline-grid size-11 place-items-center rounded-xl bg-creme-100 text-ink-800 transition-colors group-hover:bg-ink-900 group-hover:text-creme-100">
                <r.icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight text-ink-900">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}
