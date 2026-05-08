import { ShieldCheck, Server, KeyRound, ScrollText, UserCheck, Lock } from "lucide-react";
import { Section } from "@/components/ui/Section";

const principles = [
  {
    icon: ShieldCheck,
    title: "Datenschutz by design",
    body: "Datenflüsse werden bewusst minimiert. Nur was nötig ist, wird verarbeitet.",
  },
  {
    icon: Server,
    title: "EU-/Deutschland-Hosting vorgesehen",
    body: "Die Architektur ist auf europäische Hosting-Anbieter mit DPA/AVV-fähiger Verarbeitung ausgelegt.",
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
  return (
    <Section tone="ink" id="datenschutz">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-200">
          <span aria-hidden className="size-1.5 rounded-full bg-accent-300" />
          Datenschutz & Sicherheit
        </span>
        <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-surface-50 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1] text-balance">
          Vertrauen entsteht durch Architektur, nicht durch Marketing.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-200 text-pretty">
          Praxino wird mit Datenschutz im Kern gedacht. Wir machen keine vorschnellen
          Zertifizierungs-Claims — sondern beschreiben, was wir bauen und wohin wir es bringen.
        </p>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <span className="inline-grid size-10 place-items-center rounded-lg bg-accent-500/15 text-accent-200">
              <p.icon className="size-5" aria-hidden />
            </span>
            <h3 className="mt-4 text-base font-semibold tracking-tight text-surface-50">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-200">{p.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-200">
        Hinweis: Praxino ist heute in einer frühen Phase. Aussagen wie „vollständig DSGVO-konform"
        oder Zertifizierungen (ISO 27001, C5, TI) sind aktuell{" "}
        <strong className="text-surface-50">nicht</strong> zugesichert. Wir kommunizieren transparent,
        was umgesetzt ist und was Zielarchitektur ist.
      </p>
    </Section>
  );
}
