import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Heart,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * ⚠ STORY-SKELETT — Platzhalter.
 * Bitte echte Vornamen, Hintergründe und Zitate einfügen, sobald
 * Founder-Setup geklärt ist.
 */
type Founder = {
  initials: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  accent: "teal" | "creme" | "ink";
};

const founders: Founder[] = [
  {
    initials: "JW",
    name: "Julian Wiebke",
    role: "Product · Co-Founder",
    bio: "Verantwortlich für Produkt, Design und Engineering. Baut seit Jahren Werkzeuge, mit denen Profis schneller und sauberer arbeiten. Bio wird ergänzt.",
    quote:
      "Praxino soll sich nicht wie ein KI-Tool anfühlen — sondern wie eine Kollegin, die mitschreibt.",
    accent: "ink",
  },
  {
    initials: "DM",
    name: "Damian Mos",
    role: "Operations · Co-Founder",
    bio: "Sorgt dafür, dass aus einer Idee eine Praxis-taugliche Software wird — vom ersten Pilot-Onboarding bis zum täglichen Betrieb. Bio wird ergänzt.",
    quote:
      "Operations heißt: dafür sorgen, dass jede Praxis Praxino am Tag 1 produktiv nutzen kann.",
    accent: "teal",
  },
  {
    initials: "DM",
    name: "Dominic Mikowitsch",
    role: "Sales · Co-Founder",
    bio: "Spricht täglich mit Praxen, die zu viel Zeit mit Doku verbringen — und übersetzt zwischen Therapie-Alltag und Produkt. Bio wird ergänzt.",
    quote:
      "Wir verkaufen nicht Software. Wir geben Therapeut:innen ihre Abende zurück.",
    accent: "creme",
  },
];

export function TeamPage() {
  useEffect(() => {
    document.title = "Unsere Geschichte · Praxino";
  }, []);

  return (
    <PageShell>
      <PlaceholderBanner />
      <Hero />
      <StoryBlock />
      <FounderGrid />
      <Manifesto />
      <ClosingCTA />
    </PageShell>
  );
}

/* ------------------------------------------------------------------ */

function PlaceholderBanner() {
  return (
    <div className="border-b border-creme-200 bg-creme-50">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-3 px-6 py-3 text-[13px] text-ink-700 lg:px-10">
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
        <p>
          <strong className="font-semibold">Bios in Arbeit.</strong> Die
          Co-Founder-Namen stimmen — die Bios und Zitate werden noch ersetzt
          (in <code className="rounded bg-creme-100 px-1 py-0.5 text-[12px]">src/pages/TeamPage.tsx → founders</code>).
        </p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[520px] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgb(15_124_117/0.12),transparent_60%)]"
      />
      <div className="mx-auto w-full max-w-3xl px-6 pb-14 pt-20 text-center lg:pt-24">
        <Reveal>
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
          >
            <ArrowLeft className="size-4" aria-hidden /> Zur Startseite
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <Eyebrow>Unsere Geschichte</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.05] tracking-[-0.035em] text-ink-900 sm:text-[3.4rem] lg:text-[4rem] text-balance">
            Drei Freunde.<br />Eine Küche.<br />Eine Frage.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500 text-pretty">
            Wie aus einem Sonntag-Abend, einem Glas Wein und einer Therapeutin,
            die zu lange nach Berichten geseufzt hat, ein Werkzeug für
            Heilmittel-Praxen wurde.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StoryBlock() {
  const paragraphs: Array<{ kicker?: string; body: string }> = [
    {
      kicker: "Sonntag-Abend, Küche, ein Glas Wein.",
      body: `Eine befreundete Therapeutin hatte gerade den vierten Therapiebericht des Wochenendes geschrieben. „Ich verbringe mehr Zeit mit Doku als mit Patient:innen", sagte sie. „Und niemand baut etwas, das das wirklich ändert." Wir nickten. Und stellten die falsche Frage: Warum nicht?`,
    },
    {
      body:
        "Aus diesem Abend wurde ein Notizbuch voller Skizzen, dann ein Prototyp, dann Pilotgespräche mit Praxen in Hamburg, Köln und München. Wir haben mitgeschrieben — bei Logopäd:innen, Ergo- und Physiotherapeut:innen — wie sich Doku in echt anfühlt: hektisch, wiederholend, ermüdend.",
    },
    {
      kicker: "Das war der Moment, als Praxino zu mehr als einer Idee wurde.",
      body:
        "Wir wollten kein generisches AI-Tool bauen, das alles und nichts kann. Wir wollten ein Werkzeug für Heilmittel — eines, das Verordnungen, ICD-10, ICF und Therapieziele wirklich versteht. Eines, bei dem Therapeut:in am Ende prüft und unterschreibt. Praxino ist genau das. Nicht mehr, nicht weniger.",
    },
  ];

  return (
    <Section tone="white">
      <div className="mx-auto max-w-3xl">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className={cn("mb-10", i === paragraphs.length - 1 && "mb-0")}>
              {p.kicker ? (
                <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-accent-700">
                  {p.kicker}
                </p>
              ) : null}
              <p
                className={cn(
                  "text-pretty text-lg leading-[1.75] text-ink-700",
                  p.kicker ? "mt-3" : "",
                )}
              >
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FounderGrid() {
  return (
    <Section tone="surface">
      <Reveal>
        <div className="max-w-3xl">
          <Eyebrow>Wer wir sind</Eyebrow>
          <h2 className="mt-5 font-display text-[2.2rem] font-medium leading-[1.1] tracking-[-0.025em] text-ink-900 sm:text-[2.6rem] text-balance">
            Drei Co-Founder. Product, Operations, Sales.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-500">
            Wir kennen uns seit Jahren, streiten gerne, und sind uns einig in einem:
            Therapeut:innen verdienen Werkzeuge, die mit ihrem Beruf mitdenken —
            nicht gegen ihn.
          </p>
        </div>
      </Reveal>

      <RevealStagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.08}>
        {founders.map((f) => (
          <RevealItem key={f.name}>
            <FounderCard founder={f} />
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

function FounderCard({ founder }: { founder: Founder }) {
  const accentBg: Record<Founder["accent"], string> = {
    teal: "bg-accent-50 text-accent-700 ring-accent-100",
    creme: "bg-creme-100 text-ink-800 ring-creme-200/60",
    ink: "bg-ink-900 text-creme-100 ring-ink-700",
  };

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-ink-100 bg-surface-0 p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-card">
      <div className="flex items-center gap-4">
        <motion.span
          aria-hidden
          whileHover={{ rotate: -4 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
          className={cn(
            "grid size-16 place-items-center rounded-2xl text-base font-semibold ring-1",
            accentBg[founder.accent],
          )}
        >
          {founder.initials}
        </motion.span>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-medium tracking-tight text-ink-900">
            {founder.name}
          </h3>
          <p className="mt-0.5 text-[13px] text-ink-500">{founder.role}</p>
        </div>
      </div>

      <p className="mt-6 text-[14.5px] leading-relaxed text-ink-700">{founder.bio}</p>

      <blockquote className="mt-6 rounded-2xl bg-surface-50 p-5 ring-1 ring-ink-100">
        <Quote className="size-4 text-accent-500" aria-hidden />
        <p className="mt-2 text-[14px] italic leading-relaxed text-ink-700 text-pretty">
          „{founder.quote}"
        </p>
      </blockquote>
    </article>
  );
}

function Manifesto() {
  const principles = [
    {
      title: "Werkzeug, nicht Wahrheitsmaschine.",
      body: "Praxino schreibt Vorschläge. Therapeut:in entscheidet. Immer.",
    },
    {
      title: "Heilmittel-spezifisch.",
      body: "Wir verstehen Verordnungslogik. Generisches AI ist hier nicht das richtige Tool.",
    },
    {
      title: "Datenschutz vor Marketing.",
      body: "Wir behaupten nicht, was wir nicht halten können. Architektur first, Claims später.",
    },
    {
      title: "Pilotpraxen sind Mitautoren.",
      body: "Praxisalltag schlägt jede Hypothese am Whiteboard.",
    },
  ];
  return (
    <Section tone="ink">
      <Reveal>
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-200">
            <Heart className="size-3.5" aria-hidden /> Was uns antreibt
          </span>
          <h2 className="mt-5 font-display text-[2.2rem] font-medium leading-[1.1] tracking-[-0.025em] text-surface-50 sm:text-[2.6rem] text-balance">
            Vier Sätze, an die wir uns erinnern, wenn etwas schwierig wird.
          </h2>
        </div>
      </Reveal>
      <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2" stagger={0.08}>
        {principles.map((p, i) => (
          <RevealItem key={p.title}>
            <article className="flex h-full gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500/15 font-display text-sm font-semibold text-accent-200">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-[1.05rem] font-semibold tracking-tight text-surface-50">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-200">{p.body}</p>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
    </Section>
  );
}

function ClosingCTA() {
  return (
    <Section tone="creme">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Sparkles className="mx-auto size-6 text-accent-600" aria-hidden />
          <h2 className="mt-5 font-display text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.4rem] text-balance">
            Wir suchen nicht nur Pilotpraxen. Wir suchen Verbündete.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
            Wenn du Therapeut:in bist, eine Praxis führst, oder einfach jemand
            kennst, dem dieses Werkzeug das Leben leichter machen würde —
            schreib uns.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/#pilot"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 text-[0.95rem] font-medium text-surface-50 shadow-card transition-all hover:-translate-y-px hover:bg-ink-800"
            >
              Pilotpraxis werden
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="mailto:hello@praxino.de"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface-0 px-6 text-[0.95rem] font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-surface-100"
            >
              hello@praxino.de
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
