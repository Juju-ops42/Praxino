import {
  AudioLines,
  ClipboardCheck,
  FileText,
  CheckCircle2,
  ListTodo,
  CalendarRange,
  Inbox,
  ChartLine,
} from "lucide-react";
import type { ReactNode } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export function ProductPreviewSection() {
  return (
    <Section tone="white" id="produkt">
      <SectionHeading
        eyebrow="Produkt-Vorschau"
        title="Drei Workflows, eine ruhige Oberfläche."
        description="Praxino setzt nicht oben drauf — es passt sich dem Praxisalltag an. Live-Sitzung, Berichtserstellung und Praxis-Übersicht laufen in einer aufgeräumten Arbeitsfläche."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        <LiveSessionMockup />
        <ReportGeneratorMockup />
        <PracticeDashboardMockup />
      </div>
    </Section>
  );
}

function MockupShell({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-surface-50 p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <Badge tone="accent">{badge}</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">{title}</h3>
      <p className="mt-1 text-sm text-ink-500">{subtitle}</p>
      <div className="mt-5 flex-1 rounded-xl bg-surface-0 p-4 ring-1 ring-ink-100">
        {children}
      </div>
    </article>
  );
}

function LiveSessionMockup() {
  return (
    <MockupShell
      badge="01 · Live-Sitzung"
      title="Während du behandelst, schreibt Praxino mit."
      subtitle="Audio strukturiert, Stichworte erkannt, Doku-Vorschlag laufend aktualisiert."
    >
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-ink-900">Pat. M. K.</span>
          <span className="text-[11px] text-ink-400">Stimmstörung · ICD-10 R49.0</span>
        </div>
        <div className="rounded-lg bg-surface-50 p-3 ring-1 ring-ink-100">
          <p className="text-[11px] uppercase tracking-wider text-ink-400">Therapieziel</p>
          <p className="mt-1 text-[13px] text-ink-700">Verbesserung der Stimmgebung</p>
        </div>
        <div className="rounded-lg bg-ink-900 p-3 text-surface-50">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-ink-200">
            <span className="flex items-center gap-2">
              <AudioLines className="size-3.5" aria-hidden /> Live-Doku
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-rose-400" />
              läuft
            </span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-100">
            Übungen: Atemstütze, Resonanzaufbau, Akzentmethode. Patient zeigt
            Fortschritte in tonaler Stabilität.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-ink-500">
          <CheckCircle2 className="size-4 text-accent-600" aria-hidden />
          Therapeut:in entscheidet final über jeden Eintrag.
        </div>
      </div>
    </MockupShell>
  );
}

function ReportGeneratorMockup() {
  const templates = [
    "Therapiebericht",
    "Verlängerungsantrag",
    "Befundbericht",
    "MDK-Stellungnahme",
  ];
  return (
    <MockupShell
      badge="02 · Bericht generieren"
      title="Aus Sitzung, Verordnung und Verlauf — ein Entwurf."
      subtitle="Vorlagen für die häufigsten Berichtstypen. Strukturiert, prüfbar, editierbar."
    >
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-400">Vorlage wählen</p>
          <ul className="mt-2 grid grid-cols-2 gap-1.5">
            {templates.map((t, i) => (
              <li
                key={t}
                className={
                  "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] " +
                  (i === 0
                    ? "bg-accent-50 text-accent-700 ring-1 ring-accent-100"
                    : "bg-surface-50 text-ink-600 ring-1 ring-ink-100")
                }
              >
                <FileText className="size-3.5" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-surface-50 p-3 ring-1 ring-ink-100">
          <ul className="space-y-2 text-[13px] text-ink-700">
            <li className="flex gap-2">
              <span className="text-ink-400">Befund</span>
              <span className="flex-1 truncate">Funktionelle Dysphonie, mittel</span>
            </li>
            <li className="flex gap-2">
              <span className="text-ink-400">Therapieziel</span>
              <span className="flex-1 truncate">Tonale Stabilität verbessern</span>
            </li>
            <li className="flex gap-2">
              <span className="text-ink-400">Verlauf</span>
              <span className="flex-1 truncate">Gute Compliance, Fortschritt sichtbar</span>
            </li>
            <li className="flex gap-2">
              <span className="text-ink-400">Empfehlung</span>
              <span className="flex-1 truncate">Verlängerung 10 Einheiten empfohlen</span>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-ink-500">
          <ClipboardCheck className="size-4 text-accent-600" aria-hidden />
          Du editierst, signierst und exportierst den finalen Bericht.
        </div>
      </div>
    </MockupShell>
  );
}

function PracticeDashboardMockup() {
  const stats = [
    { label: "Offene Berichte", value: "7", icon: Inbox },
    { label: "Sitzungen diese Woche", value: "42", icon: CalendarRange },
    { label: "Noch zu prüfen", value: "3", icon: ListTodo },
    { label: "Export bereit", value: "12", icon: ChartLine },
  ];
  return (
    <MockupShell
      badge="03 · Praxis-Dashboard"
      title="Die Praxis sieht, was zu tun ist — auf einen Blick."
      subtitle="Status pro Patient:in, offene Berichte, Wochenüberblick."
    >
      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg bg-surface-50 p-3 ring-1 ring-ink-100"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
              <s.icon className="size-3.5" aria-hidden />
              {s.label}
            </div>
            <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink-900">
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-ink-900 p-3 text-[12px] leading-relaxed text-ink-100">
        Strukturierte Wochensicht — wer braucht heute Aufmerksamkeit, welcher Bericht ist überfällig,
        welche Verlängerung steht an.
      </div>
    </MockupShell>
  );
}
