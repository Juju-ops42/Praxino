import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Section } from "@/components/ui/Section";

export function PrivacyPage() {
  useEffect(() => {
    document.title = "Datenschutz · Praxino";
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
          Datenschutzerklärung
        </h1>
        <div
          role="note"
          className="mt-6 flex gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800"
        >
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <strong className="font-semibold">Platzhalter.</strong> Diese Datenschutzerklärung
            ist ein Platzhalter und muss vor produktivem Betrieb durch eine:n Anwält:in oder
            externe:n Datenschutzbeauftragte:n geprüft und finalisiert werden.
          </p>
        </div>

        <div className="prose prose-neutral mt-10 max-w-none text-ink-700">
          <h2 className="mt-10 text-xl font-semibold tracking-tight text-ink-900">1. Verantwortliche Stelle</h2>
          <p className="mt-2 leading-relaxed">
            Praxino UG (i. Gr.), Anschrift folgt. Kontakt:{" "}
            <a href="mailto:hello@praxino.de" className="underline">
              hello@praxino.de
            </a>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold tracking-tight text-ink-900">2. Verarbeitete Daten</h2>
          <p className="mt-2 leading-relaxed">
            Über das Kontakt- und Pilot-Formular erheben wir freiwillig angegebene Daten
            (Name, Praxisname, E-Mail, Fachrichtung, Teamgröße, Nachricht) zum Zweck der
            Kontaktaufnahme und Bewertung als Pilotpraxis.
          </p>

          <h2 className="mt-8 text-xl font-semibold tracking-tight text-ink-900">3. Hosting</h2>
          <p className="mt-2 leading-relaxed">
            Die Anwendung wird über Vercel (Edge / EU-Region geplant) ausgeliefert.
            Die Datenbank wird über Supabase betrieben (EU-Region geplant). Vor
            produktivem Einsatz mit Patientendaten werden AVV-Verträge und
            Auftragsverarbeitungsprozesse geschlossen.
          </p>

          <h2 className="mt-8 text-xl font-semibold tracking-tight text-ink-900">4. Rechte der Betroffenen</h2>
          <p className="mt-2 leading-relaxed">
            Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
            Verarbeitung, Datenübertragbarkeit, Widerspruch und Beschwerde bei einer
            Aufsichtsbehörde. Anfragen bitte an{" "}
            <a href="mailto:hello@praxino.de" className="underline">
              hello@praxino.de
            </a>
            .
          </p>

          <h2 className="mt-8 text-xl font-semibold tracking-tight text-ink-900">5. Änderungen</h2>
          <p className="mt-2 leading-relaxed">
            Diese Datenschutzerklärung wird angepasst, sobald Praxino weitere Funktionen wie
            Audio-Verarbeitung oder Patient:innen-Dokumentation produktiv anbietet. Bis
            dahin gilt: keine Verarbeitung von Patientendaten in dieser Phase.
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
