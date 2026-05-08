import { Clock, FileWarning, Moon, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

export function ProblemSection() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="Das Problem"
          title="Heilmittel-Praxen behandeln tagsüber — und dokumentieren abends."
          description="Berichte, Verlängerungen, Befunde, Verordnungslogik. Doku ist heute der heimliche zweite Beruf in der Praxis."
        />
      </Reveal>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <TimeBar />
        <RevealStagger className="grid gap-3">
          <ProblemCard
            icon={Clock}
            title="45 Minuten Therapie. 30 Minuten Bericht."
            body="Doku frisst Behandlungszeit. Kolleg:innen sitzen abends noch über Berichten, statt Feierabend zu haben."
          />
          <ProblemCard
            icon={FileWarning}
            title="Verordnungslogik wird komplexer."
            body="ICD-10, ICF, Heilmittelkatalog. MDK-Stellungnahmen müssen sitzen — sonst kommt der Antrag zurück."
          />
          <ProblemCard
            icon={Moon}
            title="Personalmangel + Bürokratie."
            body="Praxen verlieren Zeit für Patient:innen — und Therapeut:innen die Energie für ihre eigene Arbeit."
          />
        </RevealStagger>
      </div>
    </Section>
  );
}

function ProblemCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <RevealItem>
      <article className="group flex items-start gap-4 rounded-2xl border border-ink-100 bg-surface-50 p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-0 hover:shadow-card">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink-900 text-accent-200 transition-colors group-hover:bg-accent-500 group-hover:text-white">
          <Icon className="size-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-[1.05rem] font-semibold tracking-tight text-ink-900">
            {title}
          </h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-500">{body}</p>
        </div>
        <ChevronRight
          aria-hidden
          className="ml-auto mt-2 hidden size-4 shrink-0 text-ink-200 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-ink-400 sm:block"
        />
      </article>
    </RevealItem>
  );
}

function TimeBar() {
  const reduce = useReducedMotion();
  return (
    <Reveal>
      <div className="rounded-3xl border border-ink-100 bg-surface-50 p-7 shadow-soft lg:p-9">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-400">
            Eine 45-Minuten-Sitzung
          </h3>
          <span className="text-xs text-ink-400">heute · grob geschätzt</span>
        </div>

        <div className="mt-6 space-y-5">
          <Lane
            label="Therapie · Patient:in im Raum"
            tone="accent"
            valueLabel="45 Min."
            percent={60}
            delay={0.1}
            reduce={reduce}
          />
          <Lane
            label="Doku · Bericht · Verlängerungslogik"
            tone="warning"
            valueLabel="≈ 30 Min."
            percent={40}
            delay={0.25}
            reduce={reduce}
          />
        </div>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {[
            { label: "Doku-Quote", value: "≈ 40%" },
            { label: "Pro Woche", value: "≈ 6 h" },
            { label: "Pro Jahr", value: "≈ 270 h" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-surface-0 p-3 ring-1 ring-ink-100 text-center"
            >
              <p className="font-display text-xl font-medium tracking-tight text-ink-900">
                {s.value}
              </p>
              <p className="mt-0.5 text-[10.5px] uppercase tracking-wider text-ink-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-ink-400">
          Indikative Werte — Praxen variieren stark. Fachliteratur und Pilot-Gespräche
          legen einen Doku-Anteil von 30–45 % nahe.
        </p>
      </div>
    </Reveal>
  );
}

function Lane({
  label,
  tone,
  valueLabel,
  percent,
  delay,
  reduce,
}: {
  label: string;
  tone: "accent" | "warning";
  valueLabel: string;
  percent: number;
  delay: number;
  reduce: boolean | null;
}) {
  const fillClass = tone === "accent" ? "bg-accent-500" : "bg-amber-500";
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-ink-700">{label}</span>
        <span className="font-mono text-[12px] text-ink-500">{valueLabel}</span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-surface-100">
        <motion.span
          initial={reduce ? false : { width: 0 }}
          whileInView={reduce ? undefined : { width: `${percent}%` }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay,
          }}
          className={`block h-full rounded-full ${fillClass}`}
        />
      </div>
    </div>
  );
}
