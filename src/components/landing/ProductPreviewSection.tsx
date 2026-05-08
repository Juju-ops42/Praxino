import { useState, type ComponentType } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  AudioLines,
  ClipboardCheck,
  FileText,
  CheckCircle2,
  ListTodo,
  CalendarRange,
  Inbox,
  ChartLine,
  Mic,
  FileSignature,
  LayoutDashboard,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type TabId = "session" | "report" | "dashboard";

const tabs: Array<{
  id: TabId;
  label: string;
  hint: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}> = [
  { id: "session", label: "Live-Sitzung", hint: "während du behandelst", icon: Mic },
  { id: "report", label: "Bericht generieren", hint: "Vorlage wählen, Entwurf prüfen", icon: FileSignature },
  { id: "dashboard", label: "Praxis-Dashboard", hint: "Wochenüberblick", icon: LayoutDashboard },
];

export function ProductPreviewSection() {
  const [tab, setTab] = useState<TabId>("session");
  const reduce = useReducedMotion();

  return (
    <Section tone="white" id="produkt">
      <Reveal>
        <SectionHeading
          eyebrow="Produkt-Vorschau"
          title="Drei Workflows, eine ruhige Oberfläche."
          description="Praxino setzt nicht oben drauf — es passt sich dem Praxisalltag an. Wechsle zwischen Live-Sitzung, Berichtserstellung und Praxis-Übersicht."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center gap-2 rounded-2xl border border-ink-100 bg-surface-50 p-2 shadow-soft sm:inline-flex">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                aria-pressed={active}
                className={cn(
                  "relative inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  active ? "text-ink-900" : "text-ink-500 hover:text-ink-800",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="tabPill"
                    className="absolute inset-0 -z-10 rounded-xl bg-surface-0 shadow-soft ring-1 ring-ink-100"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                ) : null}
                <t.icon className="size-4" aria-hidden />
                {t.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 overflow-hidden rounded-3xl border border-ink-100 bg-surface-50 p-4 shadow-card lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "session" ? <LiveSessionPanel /> : null}
              {tab === "report" ? <ReportPanel /> : null}
              {tab === "dashboard" ? <DashboardPanel /> : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mt-6 text-sm text-ink-400">
          Mockups dienen der Veranschaulichung. Keine echten Patientendaten — nur Initialen
          und plausible Demo-Inhalte.
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------- Panels ---------- */

function LiveSessionPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl bg-surface-0 p-5 ring-1 ring-ink-100">
        <div className="flex items-center justify-between">
          <span className="font-medium text-ink-900">Pat. M. K.</span>
          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-600 ring-1 ring-rose-100">
            <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-rose-500" />
            Aufnahme · 12:34
          </span>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Field label="Indikation" value="Stimmstörung" />
          <Field label="ICD-10" value="R49.0" mono />
          <Field label="Heilmittel" value="Stimmtherapie" />
          <Field label="Therapieziel" value="Tonale Stabilität" />
        </dl>
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-surface-50 p-3 ring-1 ring-ink-100">
          <span className="grid size-9 place-items-center rounded-lg bg-accent-500 text-white">
            <AudioLines className="size-4" aria-hidden />
          </span>
          <div className="text-[12px] leading-tight text-ink-500">
            <p className="font-medium text-ink-800">Live-Strukturierung aktiv</p>
            <p>Erkannt: Atemstütze, Resonanzaufbau, Akzentmethode</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-ink-900 p-5 text-surface-50">
        <p className="text-[11px] uppercase tracking-wider text-ink-200">Live-Doku · Vorschlag</p>
        <ul className="mt-3 space-y-2 text-[14px] leading-relaxed text-ink-100">
          <li>· Atemstütze in halbem Sitz mit kontrollierter Phonation geübt.</li>
          <li>· Resonanzaufbau über Nasalierungsübungen, mit gutem Erfolg.</li>
          <li>· Akzentmethode auf Wortebene; tonale Stabilität verbessert.</li>
          <li>· Compliance gut, Patient zeigt Eigenmotivation.</li>
        </ul>
        <div className="mt-5 flex items-center gap-2 text-[12px] text-ink-300">
          <CheckCircle2 className="size-4 text-accent-300" aria-hidden />
          Du entscheidest final über jeden Eintrag.
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wider text-ink-400">{label}</dt>
      <dd className={cn("mt-0.5 text-[13.5px] text-ink-800", mono && "font-mono")}>{value}</dd>
    </div>
  );
}

function ReportPanel() {
  const templates = [
    { id: "therapie", label: "Therapiebericht" },
    { id: "verlaengerung", label: "Verlängerungsantrag" },
    { id: "befund", label: "Befundbericht" },
    { id: "mdk", label: "MDK-Stellungnahme" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1fr]">
      <div className="rounded-2xl bg-surface-0 p-5 ring-1 ring-ink-100">
        <p className="text-[11px] uppercase tracking-wider text-ink-400">Vorlage wählen</p>
        <ul className="mt-3 grid gap-1.5">
          {templates.map((t, i) => (
            <li
              key={t.id}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-[14px] transition-colors",
                i === 0
                  ? "bg-accent-50 text-accent-800 ring-1 ring-accent-100"
                  : "bg-surface-50 text-ink-600 ring-1 ring-ink-100 hover:bg-surface-100",
              )}
            >
              <FileText className="size-4" aria-hidden />
              {t.label}
              {i === 0 ? (
                <CheckCircle2 className="ml-auto size-4 text-accent-600" aria-hidden />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-surface-0 p-5 ring-1 ring-ink-100">
        <p className="text-[11px] uppercase tracking-wider text-ink-400">Entwurf · Therapiebericht</p>
        <dl className="mt-4 space-y-3 text-[14px] leading-relaxed">
          {[
            { k: "Befund", v: "Funktionelle Dysphonie, mittelgradig." },
            { k: "Therapieziel", v: "Verbesserung tonaler Stabilität, Reduktion Heiserkeit." },
            { k: "Verlauf", v: "Atemstütze und Resonanzaufbau geübt; Compliance gut." },
            { k: "Empfehlung", v: "Verlängerung 10 Einheiten empfohlen." },
          ].map((row) => (
            <div key={row.k} className="grid grid-cols-[100px_1fr] gap-3">
              <dt className="text-ink-400">{row.k}</dt>
              <dd className="text-ink-800">{row.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex items-center gap-2 text-[12px] text-ink-500">
          <ClipboardCheck className="size-4 text-accent-600" aria-hidden />
          Du editierst, signierst und exportierst — als PDF oder Word.
        </div>
      </div>
    </div>
  );
}

function DashboardPanel() {
  const stats = [
    { label: "Offene Berichte", value: "7", icon: Inbox },
    { label: "Sitzungen diese Woche", value: "42", icon: CalendarRange },
    { label: "Noch zu prüfen", value: "3", icon: ListTodo },
    { label: "Export bereit", value: "12", icon: ChartLine },
  ];
  const queue = [
    { ini: "M.K.", what: "Verlängerungsantrag", state: "Entwurf", warn: true },
    { ini: "L.S.", what: "Therapiebericht Q3", state: "Bereit", warn: false },
    { ini: "T.B.", what: "Befundbericht", state: "Geprüft", warn: false },
    { ini: "F.R.", what: "MDK-Stellungnahme", state: "Bereit", warn: false },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-surface-0 p-4 ring-1 ring-ink-100">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
                <s.icon className="size-3.5" aria-hidden />
                {s.label}
              </div>
              <p className="mt-1.5 font-display text-3xl font-medium tracking-tight text-ink-900">
                {s.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-ink-900 p-4 text-[12.5px] leading-relaxed text-ink-100">
          Strukturierte Wochensicht — wer braucht heute Aufmerksamkeit, welcher Bericht ist
          überfällig, welche Verlängerung steht an.
        </div>
      </div>
      <div className="rounded-2xl bg-surface-0 p-5 ring-1 ring-ink-100">
        <p className="text-[11px] uppercase tracking-wider text-ink-400">Berichts-Queue</p>
        <ul className="mt-3 divide-y divide-ink-100">
          {queue.map((q) => (
            <li key={q.ini} className="flex items-center gap-3 py-3 text-sm">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-100 text-[11px] font-semibold text-accent-700">
                {q.ini}
              </span>
              <span className="flex-1 text-ink-800">{q.what}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] ring-1",
                  q.warn
                    ? "bg-amber-50 text-amber-700 ring-amber-100"
                    : "bg-emerald-50 text-emerald-700 ring-emerald-100",
                )}
              >
                {q.state}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
