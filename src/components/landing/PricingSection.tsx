import { Check, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";

interface Plan {
  name: string;
  audience: string;
  price: string;
  unit: string;
  features: string[];
  highlight?: boolean;
}

const plans: Plan[] = [
  {
    name: "Solo",
    audience: "Für Einzelpraxen",
    price: "ab 89 €",
    unit: "/ Therapeut:in / Monat",
    features: [
      "1 Therapeut:in",
      "Unbegrenzte Sitzungen",
      "Therapie- & Befundberichte",
      "Verlängerungsanträge",
      "DE/EU-Hosting (geplant)",
    ],
  },
  {
    name: "Praxis",
    audience: "Für Teams ab 2 Personen",
    price: "ab 69 €",
    unit: "/ Therapeut:in / Monat",
    highlight: true,
    features: [
      "Mehrere Therapeut:innen",
      "Praxis-Dashboard",
      "Rollen- & Rechtekonzept",
      "Doku-Standards der Praxis",
      "Priorisierter Pilot-Support",
    ],
  },
  {
    name: "Klinik / Träger",
    audience: "Für MVZ, Kliniken, Träger",
    price: "Individuell",
    unit: "Auf Anfrage",
    features: [
      "Mandantenfähigkeit",
      "Erweiterte Compliance-Anforderungen",
      "AVV / DPA-Prozesse",
      "Onboarding pro Standort",
      "SLA / Support nach Bedarf",
    ],
  },
];

export function PricingSection() {
  return (
    <Section tone="white" id="pricing">
      <Reveal>
        <SectionHeading
          eyebrow="Geplantes Pilot-Modell"
          title="Faire Preise. Transparent kommuniziert."
          description="Praxino ist heute in der Pilotphase. Die folgenden Pakete zeigen das geplante Preismodell. Pilotpraxen profitieren von vergünstigten Konditionen und engem Austausch mit dem Team."
        />
      </Reveal>
      <RevealStagger className="mt-14 grid gap-5 lg:grid-cols-3" stagger={0.07}>
        {plans.map((p) => (
          <RevealItem key={p.name} className={p.highlight ? "lg:-translate-y-3" : undefined}>
            <article
              className={
                "group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card " +
                (p.highlight
                  ? "border-2 border-accent-300 bg-surface-0 ring-1 ring-accent-100/60"
                  : "border border-ink-100 bg-surface-50")
              }
            >
              {p.highlight ? (
                <>
                  <span className="absolute -top-3 left-7">
                    <Badge tone="accent">
                      <Sparkles className="size-3" aria-hidden />
                      Empfohlen für Pilot
                    </Badge>
                  </span>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-32 -right-24 size-72 rounded-full bg-accent-200/40 blur-3xl"
                  />
                </>
              ) : null}
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-ink-500">{p.audience}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-medium tracking-[-0.02em] text-ink-900">
                  {p.price}
                </span>
                <span className="text-sm text-ink-400">{p.unit}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                    <span
                      className={
                        "mt-0.5 grid size-4 shrink-0 place-items-center rounded-full " +
                        (p.highlight
                          ? "bg-accent-500 text-white"
                          : "bg-accent-50 text-accent-700 ring-1 ring-accent-100")
                      }
                    >
                      <Check className="size-2.5" strokeWidth={3} aria-hidden />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#pilot"
                className={
                  "mt-8 inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition-all hover:-translate-y-px " +
                  (p.highlight
                    ? "bg-ink-900 text-surface-50 hover:bg-ink-800"
                    : "border border-ink-200 bg-surface-0 text-ink-800 hover:border-ink-300 hover:bg-surface-100")
                }
              >
                Pilotplatz anfragen
              </a>
            </article>
          </RevealItem>
        ))}
      </RevealStagger>
      <p className="mt-8 text-xs text-ink-400">
        * Preise sind geplant und nicht final. Änderungen vor Marktstart vorbehalten.
      </p>
    </Section>
  );
}
