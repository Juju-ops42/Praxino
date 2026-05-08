import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building2,
  User,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { FieldShell, Input, Select } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import {
  ensureProfile,
  fetchProfile,
  markOnboarded,
  updateProfile,
} from "@/lib/profile";
import { createPracticeWithMembership } from "@/lib/practice";
import type { Discipline, TeamSize } from "@/types";
import { cn } from "@/lib/utils";

type Step = 0 | 1 | 2;

interface FormState {
  firstName: string;
  lastName: string;
  practiceName: string;
  discipline: Discipline | "";
  teamSize: TeamSize | "";
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  practiceName: "",
  discipline: "",
  teamSize: "",
};

export function OnboardingPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();
  const [alreadyOnboarded, setAlreadyOnboarded] = useState(false);
  const [boot, setBoot] = useState(true);

  useEffect(() => {
    document.title = "Willkommen · Praxino";
  }, []);

  useEffect(() => {
    if (auth.status !== "signed-in" || !auth.user) {
      setBoot(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const profile = await fetchProfile(auth.user!.id);
      if (cancelled) return;
      if (profile?.onboarded_at) {
        setAlreadyOnboarded(true);
      } else if (profile?.full_name) {
        const [first = "", ...rest] = profile.full_name.split(" ");
        setForm((f) => ({
          ...f,
          firstName: first,
          lastName: rest.join(" "),
        }));
      }
      setBoot(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [auth.status, auth.user]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
    setServerError(undefined);
  }

  function validateStep(s: Step): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (s === 0) {
      if (!form.firstName.trim()) next.firstName = "Bitte Vorname angeben.";
      if (!form.lastName.trim()) next.lastName = "Bitte Nachname angeben.";
    }
    if (s === 1) {
      if (!form.practiceName.trim()) next.practiceName = "Praxisname fehlt.";
      if (!form.discipline) next.discipline = "Fachrichtung wählen.";
      if (!form.teamSize) next.teamSize = "Teamgröße wählen.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext(e?: FormEvent) {
    e?.preventDefault();
    if (!validateStep(step)) return;
    if (step < 2) setStep((s) => (s + 1) as Step);
  }

  async function handleFinish() {
    if (!validateStep(1)) return;
    if (!auth.user) return;

    setBusy(true);
    setServerError(undefined);

    try {
      await ensureProfile({
        id: auth.user.id,
        email: auth.user.email ?? null,
        full_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      });
      await updateProfile(auth.user.id, {
        full_name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      });
      await createPracticeWithMembership({
        ownerId: auth.user.id,
        name: form.practiceName.trim(),
        discipline: form.discipline as Discipline,
        teamSize: form.teamSize as TeamSize,
      });
      await markOnboarded(auth.user.id);
      setStep(2);
      window.setTimeout(() => navigate("/app", { replace: true }), 1400);
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Onboarding fehlgeschlagen. Bitte später erneut versuchen.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (auth.status === "loading" || boot) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-50 text-ink-500">
        <span className="size-5 animate-spin rounded-full border-2 border-ink-300 border-r-transparent" />
      </div>
    );
  }
  if (auth.status === "signed-out") {
    return <Navigate to="/login" replace state={{ from: "/onboarding" }} />;
  }
  if (auth.status === "unconfigured") {
    return <Navigate to="/login" replace />;
  }
  if (alreadyOnboarded) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface-50">
      <header className="flex h-16 items-center justify-between border-b border-ink-100 bg-surface-50/85 px-6 backdrop-blur lg:px-10">
        <Logo />
        <button
          type="button"
          onClick={() => void auth.signOut()}
          className="text-sm font-medium text-ink-500 hover:text-ink-900"
        >
          Abmelden
        </button>
      </header>

      <main className="flex flex-1 items-start justify-center px-6 py-10 lg:py-16">
        <div className="w-full max-w-xl">
          <Stepper step={step} />

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.section
                key="step0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionHeader
                  icon={User}
                  eyebrow="Schritt 1 von 2"
                  title="Willkommen bei Praxino. Wie heißt du?"
                  description="Damit Praxino deine Berichte in deinem Namen ausstellen kann."
                />
                <form onSubmit={handleNext} className="mt-8 space-y-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FieldShell
                      id="firstName"
                      label="Vorname"
                      required
                      error={errors.firstName}
                    >
                      <Input
                        id="firstName"
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                        invalid={Boolean(errors.firstName)}
                        placeholder="Maria"
                      />
                    </FieldShell>
                    <FieldShell
                      id="lastName"
                      label="Nachname"
                      required
                      error={errors.lastName}
                    >
                      <Input
                        id="lastName"
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                        invalid={Boolean(errors.lastName)}
                        placeholder="Schneider"
                      />
                    </FieldShell>
                  </div>
                  <Button type="submit" size="lg" fullWidth>
                    Weiter
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </form>
              </motion.section>
            ) : null}

            {step === 1 ? (
              <motion.section
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionHeader
                  icon={Building2}
                  eyebrow="Schritt 2 von 2"
                  title="Erzähl uns kurz von deiner Praxis."
                  description="Wir richten deinen Workspace ein. Du kannst alles später ändern."
                />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleFinish();
                  }}
                  className="mt-8 space-y-5"
                  noValidate
                >
                  <FieldShell
                    id="practiceName"
                    label="Praxisname"
                    required
                    error={errors.practiceName}
                  >
                    <Input
                      id="practiceName"
                      autoComplete="organization"
                      value={form.practiceName}
                      onChange={(e) => update("practiceName", e.target.value)}
                      invalid={Boolean(errors.practiceName)}
                      placeholder="Logopädie am Markt"
                    />
                  </FieldShell>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FieldShell
                      id="discipline"
                      label="Fachrichtung"
                      required
                      error={errors.discipline}
                    >
                      <Select
                        id="discipline"
                        value={form.discipline}
                        invalid={Boolean(errors.discipline)}
                        onChange={(e) =>
                          update("discipline", e.target.value as Discipline)
                        }
                      >
                        <option value="" disabled>
                          Bitte wählen
                        </option>
                        <option value="logopaedie">Logopädie</option>
                        <option value="ergotherapie">Ergotherapie</option>
                        <option value="physiotherapie">Physiotherapie</option>
                        <option value="andere">Andere</option>
                      </Select>
                    </FieldShell>
                    <FieldShell
                      id="teamSize"
                      label="Teamgröße"
                      required
                      error={errors.teamSize}
                    >
                      <Select
                        id="teamSize"
                        value={form.teamSize}
                        invalid={Boolean(errors.teamSize)}
                        onChange={(e) =>
                          update("teamSize", e.target.value as TeamSize)
                        }
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
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-surface-0 p-4 text-[13px] text-ink-500">
                    <ShieldCheck
                      className="mt-0.5 size-4 shrink-0 text-accent-600"
                      aria-hidden
                    />
                    <p>
                      Wir verarbeiten diese Stammdaten nur, um deinen Workspace
                      einzurichten — keine Patientendaten, keine Audio-Aufnahmen
                      bisher.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(0)}
                      disabled={busy}
                    >
                      <ArrowLeft className="size-4" aria-hidden />
                      Zurück
                    </Button>
                    <Button type="submit" size="lg" loading={busy} fullWidth>
                      Workspace erstellen
                      {!busy ? (
                        <ArrowRight className="size-4" aria-hidden />
                      ) : null}
                    </Button>
                  </div>

                  {serverError ? (
                    <p role="alert" className="text-sm text-rose-600">
                      {serverError}
                    </p>
                  ) : null}
                </form>
              </motion.section>
            ) : null}

            {step === 2 ? (
              <motion.section
                key="step2"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <span className="mx-auto inline-grid size-16 place-items-center rounded-2xl bg-accent-500 text-white shadow-lift">
                  <CheckCircle2 className="size-7" aria-hidden />
                </span>
                <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl text-balance">
                  Alles bereit, {form.firstName || "willkommen"} 👋
                </h1>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-500">
                  Dein Workspace ist eingerichtet. Wir bringen dich gleich rein.
                </p>
                <div className="mx-auto mt-8 inline-flex items-center gap-2 text-sm text-ink-500">
                  <Sparkles className="size-4 text-accent-600" aria-hidden />
                  Praxino wird geöffnet …
                </div>
              </motion.section>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const total = 2;
  return (
    <div className="mb-10 flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={i} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-colors",
                done
                  ? "bg-accent-500 text-white"
                  : active
                    ? "bg-ink-900 text-surface-50"
                    : "bg-surface-100 text-ink-400",
              )}
            >
              {done ? <CheckCircle2 className="size-4" aria-hidden /> : i + 1}
            </span>
            <div className="h-px flex-1 bg-ink-100" />
          </div>
        );
      })}
      <span className="text-[11px] uppercase tracking-wider text-ink-400">
        {Math.min(step + 1, total)} / {total}
      </span>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: typeof User;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-surface-0 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-500">
        <Icon className="size-3.5 text-accent-600" aria-hidden />
        {eyebrow}
      </span>
      <h1 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-ink-900 sm:text-[2.4rem] text-balance">
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
