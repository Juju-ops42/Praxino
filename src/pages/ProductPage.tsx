import { useEffect, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  FileSignature,
  Layers,
  ShieldCheck,
  CalendarRange,
  Clock,
  ClipboardCheck,
  Stethoscope,
  Brain,
  Activity,
  Mic,
  Sparkles,
  ListChecks,
  Lock,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  MinusCircle,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ProductPage() {
  useEffect(() => {
    document.title = "Produkt · Praxino";
  }, []);

  return (
    <PageShell>
      <Hero />
      <PersonasSection />
      <FeaturesSection />
      <ComparisonSection />
      <ClosingCTA />
    </PageShell>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[560px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,rgb(15_124_117/0.13),transparent_60%)]"
      />
      <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-24">
        <Reveal>
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
          >
            <ArrowLeft className="size-4" aria-hidden /> Zurück
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <Eyebrow>Produkt im Detail</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.04] tracking-[-0.035em] text-ink-900 sm:text-[3.4rem] lg:text-[4rem] text-balance">
            Ein Werkzeug — drei Berufe, ein Ziel:{" "}
            <span className="text-accent-700">weniger Doku, mehr Therapie.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500 text-pretty">
            Praxino ist auf Logopädie, Ergo- und Physiotherapie zugeschnitten —
            mit der Verordnungslogik, dem Vokabular und den Berichtstypen, die
            in Heilmittel-Praxen tatsächlich gebraucht werden.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/#pilot"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 text-[0.95rem] font-medium text-surface-50 shadow-card transition-all hover:-translate-y-px hover:bg-ink-800"
            >
              Pilotpraxis werden
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/#produkt"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface-0 px-6 text-[0.95rem] font-medium text-ink-800 hover:border-ink-300 hover:bg-surface-100"
            >
              Live-Mockup ansehen
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------- Personas -------------------- */

interface Persona {
  name: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  scenario: string;
  bullets: string[];
  accent: "teal" | "creme" | "ink";
}

const personas: Persona[] = [
  {
    name: "Logopädie",
    icon: Stethoscope,
    scenario:
      "M. K. kommt mit funktioneller Dysphonie. Du übst Atemstütze und Resonanzaufbau. Praxino erkennt die Methodik aus dem Gespräch und ergänzt Verlauf + Empfehlung im Berichtsentwurf.",
    bullets: [
      "Stimm-, Sprech-, Sprach- und Schluckstörungen",
      "Therapieziele entlang Heilmittelkatalog Heilmittel",
      "ICD-10 (R, F, G) strukturiert erfasst",
    ],
    accent: "teal",
  },
  {
    name: "Ergotherapie",
    icon: Brain,
    scenario:
      "L. S. nach Schlaganfall. Feinmotorik-Training und ADL-Übungen. Praxino strukturiert die Sitzung entlang ICF-Domänen und schlägt einen Verlängerungsantrag vor — Therapeut:in prüft.",
    bullets: [
      "ICF-orientierte Verlaufs-Doku",
      "Heilmittelpositionsnummern automatisch zugeordnet",
      "Befund-, Verlängerungs- und MDK-Berichte",
    ],
    accent: "creme",
  },
  {
    name: "Physiotherapie",
    icon: Activity,
    scenario:
      "T. B. mit Schulter-Impingement. Manuelle Therapie + KGG. Praxino erkennt Übungsblöcke, dokumentiert Setzungen und Reps und liefert eine sauber gegliederte Verlaufsnotiz.",
    bullets: [
      "Manuelle Therapie, KG, KGG, Lymphdrainage",
      "Übungsblöcke mit Sätzen und Wiederholungen",
      "Eingeschränkte Funktionen + Therapieziel klar getrennt",
    ],
    accent: "ink",
  },
];

function PersonasSection() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="Drei Berufe, eine App"
          title="Praxino spricht die Sprache deines Berufs."
          description="Was wir verstehen, ist trainiert auf den Vokabular und die Verordnungslogik der jeweiligen Fachrichtung — nicht auf generische Krankenhaus-Doku."
        />
      </Reveal>
      <RevealStagger className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.08}>
        {personas.map((p) => (
          <RevealItem key={p.name}>
            <PersonaCard persona={p} />
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

function PersonaCard({ persona }: { persona: Persona }) {
  const accentClass: Record<Persona["accent"], string> = {
    teal: "bg-accent-50 text-accent-700 ring-accent-100",
    creme: "bg-creme-100 text-ink-800 ring-creme-200/60",
    ink: "bg-ink-900 text-creme-100 ring-ink-700",
  };
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-ink-100 bg-surface-50 p-7 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-0 hover:shadow-card">
      <span
        className={cn(
          "inline-grid size-12 place-items-center rounded-xl ring-1 transition-colors",
          accentClass[persona.accent],
        )}
      >
        <persona.icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-5 font-display text-xl font-medium tracking-tight text-ink-900">
        {persona.name}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{persona.scenario}</p>
      <ul className="mt-5 space-y-2 text-[13.5px] text-ink-700">
        {persona.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-600" aria-hidden />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* -------------------- Features -------------------- */

interface FeatureGroup {
  label: string;
  description: string;
  features: Array<{
    icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    title: string;
    body: string;
  }>;
}

const featureGroups: FeatureGroup[] = [
  {
    label: "In der Sitzung",
    description: "Was während der Behandlung passiert, ohne deinen Workflow zu unterbrechen.",
    features: [
      {
        icon: Mic,
        title: "Audio-Mitschrift",
        body: "Browser-Aufnahme mit Consent-Schritt. Audio wird verschlüsselt verarbeitet und nach Frist gelöscht.",
      },
      {
        icon: AudioLines,
        title: "Live-Strukturierung",
        body: "Therapeutische Methodik wird laufend erkannt — Atemstütze, KGG, Sensibilitätsübung etc.",
      },
      {
        icon: Sparkles,
        title: "Stichpunkt-Vorschlag",
        body: "Statt langem Fließtext: prüfbare Stichworte, die du in 30 Sekunden bestätigst.",
      },
      {
        icon: Clock,
        title: "Zeitsparend",
        body: "Pilot-Ziel: ~12 Min. Doku statt 30. Indikativ — Praxen variieren.",
      },
    ],
  },
  {
    label: "Berichte",
    description: "Aus Sitzung, Verordnung und Verlauf — strukturiert und freigabefähig.",
    features: [
      {
        icon: FileSignature,
        title: "4 Berichtstypen",
        body: "Therapie-, Verlängerungs-, Befund- und MDK-Berichte. Vorlagen folgen Heilmittelrichtlinie.",
      },
      {
        icon: ClipboardCheck,
        title: "Provenance pro Block",
        body: "Jede Aussage zeigt, woher sie kommt: Transkript-Span, Verordnung, Vorbericht.",
      },
      {
        icon: ListChecks,
        title: "Strukturierter Editor",
        body: "Befund · Therapieziel · Verlauf · Empfehlung — saubere Sektionen, klare Logik.",
      },
      {
        icon: Download,
        title: "Export PDF & Word",
        body: "Für deine Akte, dein PVS oder den Ausdruck — formatfertig.",
      },
    ],
  },
  {
    label: "Praxis & Datenschutz",
    description: "Was rundherum passieren muss, damit du Praxino sicher einsetzen kannst.",
    features: [
      {
        icon: CalendarRange,
        title: "Wochenüberblick",
        body: "Offene Berichte, anstehende Verlängerungen, Sitzungen pro Tag — auf einen Blick.",
      },
      {
        icon: Users,
        title: "Rollen & Rechte",
        body: "Owner, Therapeut:in, Hilfskraft, Admin — Zugriffe lassen sich pro Rolle steuern.",
      },
      {
        icon: ShieldCheck,
        title: "EU/DE-Hosting vorgesehen",
        body: "DPA/AVV-fähige Architektur. Datenexport jederzeit möglich. Praxis bleibt Eigentümer.",
      },
      {
        icon: Lock,
        title: "Auditierbar geplant",
        body: "Wer hat was wann gesehen, geändert, freigegeben — als Grundlage für Compliance.",
      },
    ],
  },
];

function FeaturesSection() {
  return (
    <Section tone="surface">
      <Reveal>
        <SectionHeading
          eyebrow="Was Praxino kann"
          title="Drei Bereiche. Zwölf Bausteine."
          description="Wir sammeln keine Features, um eine Liste zu füllen. Jeder Baustein ist mit Pilotpraxen sortiert und priorisiert."
        />
      </Reveal>

      <div className="mt-14 space-y-12">
        {featureGroups.map((g, gi) => (
          <Reveal key={g.label} delay={gi * 0.05}>
            <FeatureGroupBlock group={g} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FeatureGroupBlock({ group }: { group: FeatureGroup }) {
  return (
    <div>
      <div className="grid items-end gap-3 lg:grid-cols-[1fr_2fr] lg:gap-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-700">
            {group.label}
          </p>
          <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-ink-900 sm:text-3xl text-balance">
            {group.description}
          </h3>
        </div>
      </div>
      <RevealStagger className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
        {group.features.map((f) => (
          <RevealItem key={f.title}>
            <article className="group h-full rounded-2xl border border-ink-100 bg-surface-0 p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
              <span className="inline-grid size-10 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                <f.icon className="size-4" aria-hidden />
              </span>
              <h4 className="mt-4 text-[15px] font-semibold tracking-tight text-ink-900">
                {f.title}
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-500">{f.body}</p>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}

/* -------------------- Comparison -------------------- */

type Cell = "yes" | "no" | "partial";

interface Row {
  feature: string;
  status: [Cell, Cell, Cell];
  hint?: string;
}

const rows: Row[] = [
  { feature: "Versteht Heilmittel-Verordnungslogik", status: ["yes", "no", "no"] },
  { feature: "ICD-10 / ICF strukturiert erfasst", status: ["yes", "no", "partial"] },
  { feature: "Therapeut:in entscheidet final", status: ["yes", "yes", "partial"] },
  { feature: "EU-/DE-Hosting vorgesehen", status: ["yes", "yes", "no"] },
  { feature: "Berichtstypen: Therapie · Verlängerung · Befund · MDK", status: ["yes", "no", "no"] },
  { feature: "Audit-Log auf Änderungen", status: ["yes", "no", "no"] },
  { feature: "Audio-Begleitung der Sitzung", status: ["yes", "no", "partial"] },
  { feature: "Datenexport (PDF/Word) — kein Lock-in", status: ["yes", "yes", "partial"] },
];

function ComparisonSection() {
  return (
    <Section tone="white" id="vergleich">
      <Reveal>
        <SectionHeading
          eyebrow="Im Vergleich"
          title="Praxino, handschriftlich, oder generisches AI?"
          description="Drei Wege, Doku zu schreiben. Drei sehr unterschiedliche Ergebnisse."
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-3xl border border-ink-100 bg-surface-0 shadow-card">
          {/* Header */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-ink-100 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-500">
            <div className="px-5 py-4">Feature</div>
            <div className="border-l border-ink-100 bg-accent-50/50 px-5 py-4 text-accent-800">
              Praxino
            </div>
            <div className="border-l border-ink-100 px-5 py-4">Handschrift / PVS</div>
            <div className="border-l border-ink-100 px-5 py-4">Generisches AI</div>
          </div>
          {/* Rows */}
          <ul className="divide-y divide-ink-100">
            {rows.map((r) => (
              <li
                key={r.feature}
                className="grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center text-sm"
              >
                <div className="px-5 py-3.5 text-ink-800">{r.feature}</div>
                <CompareCell value={r.status[0]} highlight />
                <CompareCell value={r.status[1]} />
                <CompareCell value={r.status[2]} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <p className="mt-4 text-xs text-ink-400">
        Vergleich beruht auf typischen PVS-Funktionen und allgemeinen LLM-Tools. Konkrete
        Implementierungen einzelner Anbieter können abweichen — wir nennen bewusst keine Namen.
      </p>
    </Section>
  );
}

function CompareCell({ value, highlight }: { value: Cell; highlight?: boolean }) {
  const map = {
    yes: { icon: CheckCircle2, color: "text-accent-600", label: "Ja" },
    no: { icon: XCircle, color: "text-ink-300", label: "Nein" },
    partial: { icon: MinusCircle, color: "text-amber-600", label: "Teilweise" },
  } as const;
  const c = map[value];
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 border-l border-ink-100 px-5 py-3.5 text-[13px] text-ink-600",
        highlight && "bg-accent-50/30",
      )}
    >
      <c.icon className={cn("size-4", c.color)} aria-hidden />
      {c.label}
    </div>
  );
}

/* -------------------- Closing -------------------- */

function ClosingCTA() {
  return (
    <Section tone="ink">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-200">
            <Layers className="size-3.5" aria-hidden /> Pilot offen
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[2.2rem] font-medium leading-[1.1] tracking-[-0.02em] text-surface-50 sm:text-[2.8rem] text-balance"
          >
            Praxino macht aus 30 Minuten Bericht ein paar saubere Klicks.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-200">
            Wir suchen Praxen, die mit uns testen, was wirklich hilft.
            Kein Marketing-Sprech — echtes Werkzeug, echtes Feedback.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/#pilot"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-surface-0 px-6 text-[0.95rem] font-medium text-ink-900 transition-all hover:-translate-y-px hover:bg-surface-50"
            >
              Pilotpraxis werden
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              to="/team"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 text-[0.95rem] font-medium text-surface-50 hover:bg-white/[0.08]"
            >
              Über uns lesen
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
