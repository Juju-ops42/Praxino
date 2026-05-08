import { ShieldCheck, Server, KeyRound, ScrollText, UserCheck, Lock } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

const principles = [
  {
    icon: ShieldCheck,
    title: "Datenschutz by design",
    body: "Datenflüsse werden bewusst minimiert. Nur was nötig ist, wird verarbeitet.",
  },
  {
    icon: Server,
    title: "EU-/DE-Hosting vorgesehen",
    body: "Architektur ist auf europäische Hosting-Anbieter mit DPA/AVV-fähiger Verarbeitung ausgelegt.",
  },
  {
    icon: UserCheck,
    title: "Therapeut:in entscheidet final",
    body: "Kein Bericht verlässt die Praxis ohne menschliche Prüfung und Freigabe.",
  },
  {
    icon: KeyRound,
    title: "Rollen- und Rechtekonzept",
    body: "Praxis, Therapeut:in, Hilfskräfte — Zugriffsrollen sind in der Architektur vorbereitet.",
  },
  {
    icon: ScrollText,
    title: "Auditierbare Verarbeitung geplant",
    body: "Wer hat was wann gesehen, geändert, freigegeben — als Grundlage für Compliance.",
  },
  {
    icon: Lock,
    title: "Patientendaten gehören der Praxis",
    body: "Praxino verarbeitet im Auftrag, nicht als Eigentümer. Datenexport bleibt jederzeit möglich.",
  },
];

export function PrivacySection() {
  const reduce = useReducedMotion();
  return (
    <Section tone="ink" id="datenschutz">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-200">
              <span aria-hidden className="size-1.5 rounded-full bg-accent-300" />
              Datenschutz & Sicherheit
            </span>
            <h2 className="mt-5 font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.03em] text-surface-50 sm:text-[2.8rem] lg:text-[3.2rem] text-balance">
              Vertrauen entsteht durch Architektur, nicht durch Marketing.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-200 text-pretty">
              Praxino wird mit Datenschutz im Kern gedacht. Wir machen keine vorschnellen
              Zertifizierungs-Claims — sondern beschreiben, was wir bauen und wohin wir es bringen.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="relative grid size-12 place-items-center rounded-xl bg-accent-500/10 text-accent-200 ring-1 ring-accent-500/20">
                <Lock className="size-5" aria-hidden />
                {!reduce ? (
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-xl ring-2 ring-accent-300/40"
                    animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
              </div>
              <div>
                <p className="text-sm font-medium text-surface-50">
                  Patientendaten gehören der Praxis.
                </p>
                <p className="text-xs text-ink-300">
                  Auftragsverarbeitung mit klaren Grenzen. Export jederzeit möglich.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <RevealStagger className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
          {principles.map((p) => (
            <RevealItem key={p.title}>
              <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-accent-500/30">
                <span className="inline-grid size-10 place-items-center rounded-lg bg-accent-500/15 text-accent-200">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-surface-50">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-200">{p.body}</p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-12 max-w-3xl text-sm leading-relaxed text-ink-300">
          <strong className="text-surface-50">Hinweis:</strong> Praxino ist heute in einer
          frühen Phase. Aussagen wie „vollständig DSGVO-konform" oder Zertifizierungen
          (ISO 27001, C5, TI) sind aktuell <strong className="text-surface-50">nicht</strong>{" "}
          zugesichert. Wir kommunizieren transparent, was umgesetzt ist und was Zielarchitektur ist.
        </p>
      </Reveal>
    </Section>
  );
}
