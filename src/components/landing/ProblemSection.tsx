import { Clock, FileWarning, Moon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const problems = [
  {
    icon: Clock,
    title: "45 Minuten Therapie. 30 Minuten Bericht.",
    body: "Doku frisst Behandlungszeit. Kolleg:innen sitzen abends noch über Berichten, statt Feierabend zu haben.",
  },
  {
    icon: FileWarning,
    title: "Verordnung, ICD-10, ICF, Heilmittelkatalog.",
    body: "Dokumentationspflichten werden komplexer. Verlängerungsanträge und MDK-Stellungnahmen müssen sitzen.",
  },
  {
    icon: Moon,
    title: "Personalmangel trifft Bürokratie.",
    body: "Praxen verlieren Zeit für Patient:innen — und Therapeut:innen die Energie für ihre eigene Arbeit.",
  },
];

export function ProblemSection() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Das Problem"
        title="Heilmittel-Praxen behandeln tagsüber — und dokumentieren abends."
        description="Berichte, Verlängerungen, Befunde, Verordnungslogik. Doku ist heute der heimliche zweite Beruf in der Praxis."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {problems.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-ink-100 bg-surface-50 p-7 shadow-soft"
          >
            <span className="inline-grid size-11 place-items-center rounded-xl bg-ink-900 text-accent-200">
              <p.icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900">
              {p.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{p.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
