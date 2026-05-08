import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FieldShell, Input, Select, Textarea } from "@/components/ui/Input";
import { isEmail } from "@/lib/utils";
import { submitPilotWaitlist } from "@/lib/waitlist";
import type { Discipline, PilotWaitlistEntry, TeamSize } from "@/types";

type FormState = {
  name: string;
  practiceName: string;
  email: string;
  discipline: Discipline | "";
  teamSize: TeamSize | "";
  message: string;
};

const initialState: FormState = {
  name: "",
  practiceName: "",
  email: "",
  discipline: "",
  teamSize: "",
  message: "",
};

type SubmitState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; mocked: boolean }
  | { kind: "error"; message: string };

export function WaitlistSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submit, setSubmit] = useState<SubmitState>({ kind: "idle" });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Bitte Name angeben.";
    if (!form.email.trim()) next.email = "E-Mail-Adresse fehlt.";
    else if (!isEmail(form.email)) next.email = "Diese E-Mail sieht nicht gültig aus.";
    if (!form.discipline) next.discipline = "Bitte Fachrichtung wählen.";
    if (!form.teamSize) next.teamSize = "Bitte Teamgröße wählen.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmit({ kind: "loading" });

    const payload: PilotWaitlistEntry = {
      name: form.name.trim(),
      practiceName: form.practiceName.trim() || undefined,
      email: form.email.trim().toLowerCase(),
      discipline: form.discipline as Discipline,
      teamSize: form.teamSize as TeamSize,
      message: form.message.trim() || undefined,
    };

    const result = await submitPilotWaitlist(payload);
    if (result.ok) {
      setSubmit({ kind: "success", mocked: result.mocked });
      setForm(initialState);
    } else {
      setSubmit({
        kind: "error",
        message:
          result.errorMessage ??
          "Es gab ein Problem beim Speichern. Bitte später erneut versuchen.",
      });
    }
  }

  return (
    <Section tone="surface" id="pilot">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Pilotpraxen gesucht"
            title="Wir suchen Praxen, die Praxino mitgestalten wollen."
            description="Du willst weniger Zeit mit Berichten verbringen — und uns helfen, Praxino praxisnah zu bauen? Trag dich ein. Wir melden uns persönlich."
          />
          <ul className="mt-8 space-y-3.5 text-[15px]">
            {[
              "Vergünstigte Pilot-Konditionen",
              "Direkter Draht zum Produktteam",
              "Mitgestaltung von Workflows und Vorlagen",
              "Frühzeitiger Zugang zu neuen Funktionen",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-ink-700">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
          <a
            href="mailto:hello@praxino.de"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-ink-900"
          >
            <Mail className="size-4" aria-hidden /> hello@praxino.de
          </a>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl border border-ink-100 bg-surface-0 p-8 shadow-card lg:p-10"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldShell id="name" label="Name" required error={errors.name}>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={form.name}
                placeholder="Vor- und Nachname"
                invalid={Boolean(errors.name)}
                onChange={(e) => update("name", e.target.value)}
              />
            </FieldShell>
            <FieldShell id="practiceName" label="Praxisname" hint="Optional">
              <Input
                id="practiceName"
                name="practiceName"
                autoComplete="organization"
                value={form.practiceName}
                placeholder="z. B. Logopädie am Markt"
                onChange={(e) => update("practiceName", e.target.value)}
              />
            </FieldShell>
            <FieldShell id="email" label="E-Mail" required error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={form.email}
                placeholder="name@praxis.de"
                invalid={Boolean(errors.email)}
                onChange={(e) => update("email", e.target.value)}
              />
            </FieldShell>
            <FieldShell id="discipline" label="Fachrichtung" required error={errors.discipline}>
              <Select
                id="discipline"
                name="discipline"
                value={form.discipline}
                invalid={Boolean(errors.discipline)}
                onChange={(e) => update("discipline", e.target.value as Discipline)}
              >
                <option value="" disabled>
                  Bitte wählen
                </option>
                <option value="logopaedie">Logopädie</option>
                <option value="ergotherapie">Ergotherapie</option>
                <option value="physiotherapie">Physiotherapie</option>
                <option value="andere">Andere Fachrichtung</option>
              </Select>
            </FieldShell>
            <FieldShell id="teamSize" label="Teamgröße" required error={errors.teamSize}>
              <Select
                id="teamSize"
                name="teamSize"
                value={form.teamSize}
                invalid={Boolean(errors.teamSize)}
                onChange={(e) => update("teamSize", e.target.value as TeamSize)}
              >
                <option value="" disabled>
                  Bitte wählen
                </option>
                <option value="1">1 Therapeut:in</option>
                <option value="2-5">2–5</option>
                <option value="6-15">6–15</option>
                <option value="16+">16+</option>
              </Select>
            </FieldShell>
            <div className="sm:col-span-2">
              <FieldShell
                id="message"
                label="Nachricht"
                hint="Optional — was würde dir am meisten helfen?"
              >
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  placeholder="Worauf legt ihr in der Praxis besonders Wert?"
                  onChange={(e) => update("message", e.target.value)}
                />
              </FieldShell>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={submit.kind === "loading"}
              fullWidth
            >
              Pilotplatz anfragen
              {submit.kind !== "loading" ? <ArrowRight className="size-4" aria-hidden /> : null}
            </Button>

            {submit.kind === "success" ? (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-accent-100 bg-accent-50 p-4 text-sm text-accent-800"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden />
                <div>
                  <p className="font-medium">Danke! Wir melden uns persönlich.</p>
                  <p className="mt-1 text-accent-700">
                    {submit.mocked
                      ? "Hinweis: Supabase ist lokal noch nicht konfiguriert — die Anfrage wurde nicht gespeichert."
                      : "Wir kommen innerhalb weniger Werktage auf dich zu."}
                  </p>
                </div>
              </div>
            ) : null}

            {submit.kind === "error" ? (
              <div
                role="alert"
                className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700"
              >
                {submit.message}
              </div>
            ) : null}

            <p className="text-xs leading-relaxed text-ink-400">
              Mit Absenden willigst du ein, dass wir dich zu Praxino kontaktieren.
              Es entstehen keine Kosten. Du kannst der Verarbeitung jederzeit widersprechen.
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
