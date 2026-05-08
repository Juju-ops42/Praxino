import { ArrowRight, ShieldCheck, AudioLines, FileSignature, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-50">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgb(15_124_117/0.10),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-full bg-grid-soft opacity-40"
      />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:pb-32 lg:pt-28">
        <div>
          <Eyebrow>Vertikale KI für Heilmittel</Eyebrow>
          <h1 className="mt-6 font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.6rem] text-balance">
            Die Praxis-KI, die mitschreibt — während du behandelst.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500 text-pretty">
            Praxino hilft Logopädie-, Ergo- und Physiotherapie-Praxen, Behandlungsdoku
            und Therapieberichte schneller, strukturierter und überprüfbar zu erstellen — mit klarer
            menschlicher Freigabe durch die Therapeut:in.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#pilot"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 text-[0.95rem] font-medium text-surface-50 shadow-card transition-colors hover:bg-ink-800"
            >
              Pilotpraxis werden
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#produkt"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-surface-0 px-6 text-[0.95rem] font-medium text-ink-800 transition-colors hover:border-ink-300 hover:bg-surface-100"
            >
              Produkt ansehen
            </a>
          </div>
          <p className="mt-7 text-sm text-ink-400">
            Für Heilmittel-Praxen in Deutschland. DSGVO-orientiert.
            Therapeut:in bleibt final verantwortlich.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <Badge tone="accent">
              <ShieldCheck className="size-3.5" aria-hidden /> DE/EU-Hosting vorgesehen
            </Badge>
            <Badge tone="creme">
              <Sparkles className="size-3.5" aria-hidden /> Therapeutisch trainierbar
            </Badge>
            <Badge tone="neutral">Logopädie · Ergo · Physio</Badge>
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-x-8 -inset-y-12 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent-100/60 via-surface-50 to-creme-50 blur-2xl"
      />
      <div className="relative rounded-3xl border border-ink-100 bg-surface-0 p-3 shadow-lift">
        {/* browser chrome */}
        <div className="flex items-center justify-between rounded-2xl bg-ink-900 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-400/80" />
            <span className="size-2.5 rounded-full bg-amber-300/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="rounded-full bg-ink-700/70 px-3 py-1 text-[11px] text-ink-200">
            app.praxino.de · Sitzung läuft
          </div>
          <span className="size-5 rounded-full bg-ink-700/60" />
        </div>

        <div className="mt-3 grid grid-cols-[200px_1fr] gap-3">
          {/* sidebar */}
          <aside className="rounded-2xl bg-surface-50 p-3">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Heute
            </p>
            <ul className="mt-2 space-y-1.5">
              {[
                { ini: "M.K.", note: "10:00 · Stimme", active: true },
                { ini: "L.S.", note: "10:45 · Aphasie" },
                { ini: "T.B.", note: "11:30 · Artikulation" },
                { ini: "F.R.", note: "13:15 · Schlucken" },
              ].map((p) => (
                <li
                  key={p.ini}
                  className={
                    "flex items-center gap-2 rounded-lg px-2 py-2 text-xs " +
                    (p.active
                      ? "bg-surface-0 ring-1 ring-ink-100 shadow-soft"
                      : "text-ink-500")
                  }
                >
                  <span className="grid size-7 place-items-center rounded-full bg-accent-100 text-[10px] font-semibold text-accent-700">
                    {p.ini}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-medium text-ink-800">Pat. {p.ini}</span>
                    <span className="block text-[11px] text-ink-400">{p.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          {/* content */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-surface-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-ink-400">
                    Aktuelle Sitzung
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-ink-900">
                    Pat. M. K. · Stimmstörung · Therapieziel: tonale Stabilität
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-600 ring-1 ring-rose-100">
                  <span className="size-1.5 animate-pulse rounded-full bg-rose-500" />
                  Aufnahme läuft · 12:34
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-surface-0 p-3 ring-1 ring-ink-100">
                <span className="grid size-9 place-items-center rounded-lg bg-accent-500 text-white">
                  <AudioLines className="size-4" aria-hidden />
                </span>
                <div className="flex-1">
                  <div className="flex h-7 items-center gap-1">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <span
                        key={i}
                        style={{ height: `${20 + ((i * 53) % 60)}%` }}
                        className="w-[3px] rounded-full bg-accent-400/70"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-ink-400">Live-Strukturierung aktiv</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium uppercase tracking-wider text-ink-400">
                  Live-Doku · Vorschlag
                </p>
                <span className="text-[10px] text-ink-400">prüfen & freigeben</span>
              </div>
              <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-ink-700">
                <li>· Atemstütze und Resonanzaufbau geübt.</li>
                <li>· Akzentmethode mit kontrolliertem Stimmeinsatz.</li>
                <li>· Patient zeigt Fortschritte in tonaler Stabilität.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-ink-900 p-4 text-surface-50">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-ink-200">
                  <FileSignature className="size-3.5" aria-hidden /> Berichtsentwurf
                </p>
                <span className="rounded-full bg-accent-500/20 px-2 py-0.5 text-[11px] text-accent-200">
                  bereit zur Prüfung
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-100">
                Befund · Therapieziel · Verlauf · Empfehlung — strukturiert nach Verordnungslogik.
                Du prüfst, korrigierst und gibst frei.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
