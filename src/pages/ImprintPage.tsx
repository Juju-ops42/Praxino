import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

export function ImprintPage() {
  useEffect(() => {
    document.title = "Impressum · Praxino";
  }, []);

  return (
    <PageShell>
      <Section tone="white" containerClassName="max-w-3xl py-20 lg:py-28">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          <ArrowLeft className="size-4" aria-hidden /> Zurück zur Startseite
        </Link>
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-ink-900 text-balance">
          Impressum
        </h1>
        <div
          role="note"
          className="mt-6 flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong className="font-semibold">Platzhalter.</strong> Dieses Impressum muss vor
            produktivem Betrieb juristisch geprüft und mit den finalen Angaben (Anschrift,
            Vertretung, Registereintrag, USt-IdNr.) versehen werden.
          </p>
        </div>

        <div className="mt-10 space-y-6 text-ink-700">
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink-900">Anbieter</h2>
            <p className="mt-2 leading-relaxed">
              Praxino UG (i. Gr.)<br />
              Anschrift folgt
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink-900">Kontakt</h2>
            <p className="mt-2 leading-relaxed">
              E-Mail:{" "}
              <a href="mailto:hello@praxino.de" className="underline">
                hello@praxino.de
              </a>
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink-900">Vertretungsberechtigte</h2>
            <p className="mt-2 leading-relaxed">Wird ergänzt.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink-900">Verantwortlich nach § 18 Abs. 2 MStV</h2>
            <p className="mt-2 leading-relaxed">Wird ergänzt.</p>
          </section>
        </div>
      </Section>
    </PageShell>
  );
}
