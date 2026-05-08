import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, Mail, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Faq {
  q: string;
  a: string;
}

const faqs: Faq[] = [
  {
    q: "Hört Praxino während der Sitzung dauerhaft mit?",
    a: "Nein. Praxino startet die Aufnahme erst, wenn Therapeut:in sie aktiv beginnt — und stoppt sie auch aktiv. Vor jeder Aufnahme gibt es einen Consent-Schritt. Audio wird verschlüsselt verarbeitet und nach einer konfigurierbaren Frist automatisch gelöscht.",
  },
  {
    q: "Wo werden Patientendaten gespeichert?",
    a: "EU-/Deutschland-Hosting ist vorgesehen (Postgres + Storage in EU-Region). Datenflüsse sind bewusst minimiert. Praxen behalten Eigentum an ihren Daten — Export ist jederzeit möglich. Vor produktivem Einsatz mit echten Patientendaten finalisieren wir AVV/DPA-Verträge.",
  },
  {
    q: "Brauche ich eine Einwilligung der Patient:innen?",
    a: "Ja. Audio-Aufnahmen für Doku-Zwecke benötigen eine schriftliche oder dokumentierte Einwilligung der Patient:in. Praxino stellt Vorlagen bereit, die du an dein Praxis-Setting anpassen kannst. Die Einwilligung wird im Audit-Log mitgeführt.",
  },
  {
    q: "Stellt Praxino medizinische Diagnosen?",
    a: "Nein. Praxino schreibt keine medizinische Wahrheit. Es erstellt einen strukturierten Vorschlag aus Sitzung, Verordnung und Verlauf. Therapeut:in prüft, korrigiert und gibt frei. Jeder Berichtsblock zeigt, woraus er entstanden ist.",
  },
  {
    q: "Wie integriert sich Praxino in unser PVS (Theorg, Buchner, Starke Praxis)?",
    a: "Im aktuellen Pilot-Schritt arbeitet Praxino eigenständig — Berichte exportierst du als PDF/Word. PVS-Anbindungen sind ab Phase 10 geplant; konkrete Schnittstellen evaluieren wir mit den Pilotpraxen, die das wirklich brauchen.",
  },
  {
    q: "Was passiert, wenn die KI etwas falsch verstanden hat?",
    a: "Du editierst den Bericht direkt im Editor. Jeder geänderte Block wird versioniert. Wir nutzen Korrekturen anonymisiert, um die Vorlagen für deine Praxis besser zu machen — niemals als Trainingsdaten für andere Praxen ohne explizite Zustimmung.",
  },
  {
    q: "Welche Berichtstypen werden unterstützt?",
    a: "Therapiebericht, Verlängerungsantrag, Befundbericht und MDK-Stellungnahme. Vorlagen orientieren sich an der Heilmittelrichtlinie und gängiger Verordnungslogik. Eigene Praxis-Vorlagen können hinterlegt werden.",
  },
  {
    q: "Was passiert mit meinen Daten, wenn ich kündige?",
    a: "Du bekommst einen vollständigen Datenexport (Patient:innen, Sitzungen, Berichte) im Standard-Format. Anschließend werden alle Daten — inklusive Backups — innerhalb der vereinbarten Frist gelöscht. Kein Lock-in.",
  },
];

export function FaqSection() {
  return (
    <Section tone="white" id="faq">
      <Reveal>
        <SectionHeading
          eyebrow="Häufige Fragen"
          title="Was Praxen vor dem Pilot wissen wollen."
          description="Wenn deine Frage nicht dabei ist, schreib uns. Wir antworten persönlich."
          align="left"
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <div className="rounded-3xl border border-ink-100 bg-surface-50 p-7 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
              Frage offen?
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink-900">
              Wir antworten persönlich — keine Hotline.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              Schreib uns eine Mail oder buch ein 20-minütiges Gespräch.
              Wir hören gerne, was deine Praxis wirklich braucht.
            </p>
            <a
              href="mailto:hello@praxino.de"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:underline"
            >
              <Mail className="size-4 text-accent-600" aria-hidden /> hello@praxino.de
            </a>
            <a
              href="#pilot"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink-900 underline-offset-4 hover:underline"
            >
              <MessageCircle className="size-4 text-accent-600" aria-hidden /> Pilotpraxis werden
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="divide-y divide-ink-100 rounded-3xl border border-ink-100 bg-surface-0 shadow-soft">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} faq={f} defaultOpen={i === 0} />
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

function FaqItem({ faq, defaultOpen = false }: { faq: Faq; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduce = useReducedMotion();

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-50"
      >
        <span className="flex-1 text-[15.5px] font-medium tracking-tight text-ink-900">
          {faq.q}
        </span>
        <motion.span
          aria-hidden
          animate={reduce ? undefined : { rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full border transition-colors",
            open
              ? "border-ink-900 bg-ink-900 text-surface-50"
              : "border-ink-200 bg-surface-0 text-ink-500",
          )}
        >
          <Plus className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-[14.5px] leading-relaxed text-ink-600">
              {faq.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </li>
  );
}
