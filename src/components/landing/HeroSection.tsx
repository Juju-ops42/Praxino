import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  AudioLines,
  CheckCircle2,
  FileSignature,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { MarkerHighlight } from "@/components/ui/MarkerHighlight";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <BackgroundDecor />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-24 lg:grid-cols-[1.05fr_1.1fr] lg:gap-20 lg:px-10 lg:pb-36 lg:pt-32">
        <HeroCopy />
        <HeroBento />
      </div>
    </section>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-[820px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-15%,rgb(15_124_117/0.13),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-20 h-full bg-grid-soft opacity-30"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="pointer-events-none absolute -top-32 right-[-12%] -z-10 size-[640px] rounded-full bg-creme-100/60 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="pointer-events-none absolute -bottom-40 left-[-10%] -z-10 size-[520px] rounded-full bg-accent-100/50 blur-3xl"
      />
    </>
  );
}

function HeroCopy() {
  return (
    <div>
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-0/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-500 shadow-soft backdrop-blur-sm"
      >
        <span aria-hidden className="relative flex size-1.5">
          <span className="absolute inline-flex size-1.5 animate-ping rounded-full bg-accent-400/70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent-500" />
        </span>
        Pilotpraxen jetzt anfragen
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="mt-6 font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.035em] text-ink-900 sm:text-[3.4rem] lg:text-[4.2rem] text-balance"
      >
        Die Praxis-KI, die <MarkerHighlight>mitschreibt</MarkerHighlight> —
        <br className="hidden sm:block" />
        während du behandelst.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
        className="mt-7 max-w-xl text-lg leading-relaxed text-ink-500 text-pretty"
      >
        Praxino hilft Logopädie-, Ergo- und Physiotherapie-Praxen, Behandlungsdoku
        und Therapieberichte schneller, strukturierter und überprüfbar zu erstellen.
        Mit klarer menschlicher Freigabe durch die Therapeut:in.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <a
          href="#pilot"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 text-[0.95rem] font-medium text-surface-50 shadow-card transition-all duration-200 hover:-translate-y-px hover:bg-ink-800 hover:shadow-lift"
        >
          Pilotpraxis werden
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
        <a
          href="#produkt"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface-0 px-6 text-[0.95rem] font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-surface-100"
        >
          Produkt ansehen
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-500"
      >
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="size-4 text-accent-600" aria-hidden /> DE/EU-Hosting vorgesehen
        </span>
        <span className="text-ink-200" aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="size-4 text-accent-600" aria-hidden /> Therapeut:in entscheidet final
        </span>
        <span className="text-ink-200" aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="size-4 text-accent-600" aria-hidden /> Heilmittel-spezifisch trainiert
        </span>
      </motion.div>
    </div>
  );
}

/* ----------------------------------------------------------------- */

function HeroBento() {
  const reduce = useReducedMotion();
  const card = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-6 -inset-y-10 -z-10 rounded-[3rem] bg-gradient-to-br from-accent-100/55 via-surface-50 to-creme-50 blur-3xl"
      />

      <div className="relative grid grid-cols-6 grid-rows-[auto_auto] gap-3 sm:gap-4">
        <motion.div {...card(0.1)} className="col-span-6">
          <SessionCard />
        </motion.div>

        <motion.div {...card(0.22)} className="col-span-4">
          <DraftCard />
        </motion.div>

        <motion.div {...card(0.34)} className="col-span-2 flex">
          <StatCard />
        </motion.div>
      </div>
    </div>
  );
}

function SessionCard() {
  return (
    <article className="rounded-2xl border border-ink-100 bg-surface-0 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
            <AudioLines className="size-4" aria-hidden />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] uppercase tracking-wider text-ink-400">Aktuelle Sitzung</p>
            <p className="text-[13.5px] font-semibold text-ink-900">
              Pat. M. K. · Stimmstörung
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-600 ring-1 ring-rose-100">
          <span className="size-1.5 animate-pulse rounded-full bg-rose-500" />
          Aufnahme · 12:34
        </span>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-50 p-3 ring-1 ring-ink-100">
        <Waveform />
        <div className="text-[11px] leading-tight text-ink-500">
          <p className="font-medium text-ink-700">Live-Strukturierung aktiv</p>
          <p>Atemstütze, Resonanzaufbau erkannt</p>
        </div>
      </div>
    </article>
  );
}

function Waveform() {
  const bars = 28;
  const reduce = useReducedMotion();
  return (
    <div className="flex h-8 flex-1 items-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => {
        const base = 30 + ((i * 73) % 60);
        return (
          <motion.span
            key={i}
            aria-hidden
            initial={{ height: `${base * 0.5}%` }}
            animate={
              reduce
                ? { height: `${base}%` }
                : {
                    height: [`${base * 0.55}%`, `${base}%`, `${base * 0.7}%`, `${base}%`],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 1.6 + (i % 5) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.04,
                  }
            }
            className="w-[3px] rounded-full bg-accent-500/85"
          />
        );
      })}
    </div>
  );
}

function DraftCard() {
  const lines = [
    "Befund: Funktionelle Dysphonie, mittel.",
    "Therapieziel: Stimmgebung, tonale Stabilität.",
    "Verlauf: Atemstütze + Resonanzaufbau geübt; Compliance gut.",
    "Empfehlung: Verlängerung 10 Einheiten.",
  ];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-ink-900 p-5 text-surface-50 shadow-card">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-ink-200">
        <FileSignature className="size-3.5" aria-hidden />
        Berichtsentwurf
        <span className="ml-auto rounded-full bg-accent-500/20 px-2 py-0.5 text-[11px] text-accent-200">
          bereit zur Prüfung
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {lines.map((l, i) => (
          <TypingLine key={l} text={l} delay={0.6 + i * 0.55} />
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-2 pt-4 text-[11px] text-ink-300">
        <CheckCircle2 className="size-3.5 text-accent-300" aria-hidden />
        Du prüfst, korrigierst und gibst frei.
      </div>
    </article>
  );
}

function TypingLine({ text, delay }: { text: string; delay: number }) {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
    const start = window.setTimeout(() => {
      let i = 0;
      const id = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(id);
      }, 16);
    }, delay * 1000);
    return () => window.clearTimeout(start);
  }, [text, delay, reduce]);

  return (
    <li className="grid grid-cols-[14px_1fr] items-start gap-2 text-[13px] leading-relaxed text-ink-100">
      <span aria-hidden className="mt-2 size-1 rounded-full bg-accent-300/70" />
      <span className="font-mono text-[12.5px] tracking-tight">
        {text.slice(0, count)}
        {count < text.length ? (
          <span className="ml-0.5 inline-block h-[0.95em] w-[1.5px] animate-pulse bg-accent-300/80 align-middle" />
        ) : null}
      </span>
    </li>
  );
}

function StatCard() {
  return (
    <article className="flex h-full w-full flex-col justify-between rounded-2xl border border-ink-100 bg-surface-0 p-5 shadow-card">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
        <Clock className="size-3.5" aria-hidden />
        Doku-Zeit pro Sitzung
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="font-display text-[2.6rem] font-medium leading-none tracking-tight text-ink-900">
          12
        </span>
        <span className="text-sm text-ink-500">Min.</span>
      </div>
      <p className="mt-1 text-[11.5px] text-ink-400">
        statt <s className="text-ink-300">~30 Min.</s> wie bisher*
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-100">
        <motion.span
          initial={{ width: "100%" }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="block h-full rounded-full bg-accent-500"
        />
      </div>
      <p className="mt-2 text-[10px] text-ink-300">* internes Pilot-Ziel, indikativ.</p>
    </article>
  );
}
