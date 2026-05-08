import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck, CheckCircle2, KeyRound } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { FieldShell, Input } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import { isEmail } from "@/lib/utils";

type Stage = "email" | "code-sent" | "verify";

export function LoginPage() {
  const auth = useAuth();
  const location = useLocation();
  const fromState = location.state as { from?: string } | null;
  const redirectTo = fromState?.from ?? "/app";

  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [otpError, setOtpError] = useState<string | undefined>();
  const [serverError, setServerError] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Login · Praxino";
  }, []);

  if (auth.status === "signed-in") {
    return <Navigate to={redirectTo} replace />;
  }

  const isUnconfigured = auth.status === "unconfigured";

  async function handleEmailSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(undefined);
    if (!isEmail(email)) {
      setEmailError("Bitte gültige E-Mail-Adresse eingeben.");
      return;
    }
    setEmailError(undefined);
    setBusy(true);
    const result = await auth.signInWithEmail(email.trim().toLowerCase(), {
      redirectTo: window.location.origin + redirectTo,
    });
    setBusy(false);
    if (!result.ok) {
      setServerError(result.errorMessage);
      return;
    }
    setStage("code-sent");
  }

  async function handleOtpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(undefined);
    if (token.trim().length < 6) {
      setOtpError("Der Code besteht aus 6 Ziffern.");
      return;
    }
    setOtpError(undefined);
    setBusy(true);
    const result = await auth.verifyEmailOtp(email.trim().toLowerCase(), token.trim());
    setBusy(false);
    if (!result.ok) {
      setServerError(result.errorMessage);
      return;
    }
    // Auth-State-Listener kümmert sich, Navigate via Redirect oben.
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — Form */}
      <div className="relative flex flex-col bg-surface-50 px-6 py-8 lg:px-16 lg:py-12">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
          >
            <ArrowLeft className="size-4" aria-hidden /> Zur Startseite
          </Link>
        </div>

        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-md py-12">
            <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl text-balance">
              Willkommen zurück.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
              Melde dich mit deiner E-Mail an. Wir schicken dir einen Magic Link
              und einen 6-stelligen Code — beides funktioniert.
            </p>

            {isUnconfigured ? (
              <div
                role="note"
                className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800"
              >
                <p className="font-medium">Auth ist lokal noch nicht konfiguriert.</p>
                <p className="mt-1 text-amber-700">
                  Setze <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px]">VITE_SUPABASE_URL</code>{" "}
                  und <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px]">VITE_SUPABASE_ANON_KEY</code>{" "}
                  in <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px]">.env.local</code>.
                </p>
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {stage === "email" ? (
                <motion.form
                  key="email"
                  onSubmit={handleEmailSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-8 space-y-5"
                  noValidate
                >
                  <FieldShell id="email" label="E-Mail" required error={emailError}>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@praxis.de"
                      invalid={Boolean(emailError)}
                      disabled={isUnconfigured}
                    />
                  </FieldShell>

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={busy}
                    disabled={isUnconfigured}
                  >
                    Magic Link senden
                    {!busy ? <ArrowRight className="size-4" aria-hidden /> : null}
                  </Button>

                  {serverError ? (
                    <p role="alert" className="text-sm text-rose-600">
                      {serverError}
                    </p>
                  ) : null}

                  <p className="text-xs text-ink-400">
                    Mit der Anmeldung akzeptierst du unsere{" "}
                    <Link to="/privacy" className="underline hover:text-ink-700">
                      Datenschutz-Hinweise
                    </Link>
                    .
                  </p>
                </motion.form>
              ) : null}

              {stage === "code-sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-8 space-y-5"
                >
                  <div className="flex items-start gap-3 rounded-xl border border-accent-100 bg-accent-50 p-4 text-sm text-accent-800">
                    <Mail className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden />
                    <div>
                      <p className="font-medium">E-Mail unterwegs an {email}.</p>
                      <p className="mt-1 text-accent-700">
                        Klick auf den Link in der Mail — oder gib hier den 6-stelligen Code ein.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setStage("verify")}
                  >
                    <KeyRound className="size-4" aria-hidden /> Code stattdessen eingeben
                  </Button>
                  <button
                    type="button"
                    onClick={() => setStage("email")}
                    className="text-sm text-ink-500 hover:text-ink-900"
                  >
                    Andere E-Mail verwenden
                  </button>
                </motion.div>
              ) : null}

              {stage === "verify" ? (
                <motion.form
                  key="verify"
                  onSubmit={handleOtpSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-8 space-y-5"
                  noValidate
                >
                  <FieldShell
                    id="otp"
                    label="6-stelliger Code"
                    hint={`Wir haben den Code an ${email} gesendet.`}
                    required
                    error={otpError}
                  >
                    <Input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={token}
                      onChange={(e) => setToken(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="123456"
                      className="text-center text-lg font-mono tracking-[0.4em]"
                      invalid={Boolean(otpError)}
                    />
                  </FieldShell>

                  <Button type="submit" size="lg" fullWidth loading={busy}>
                    Anmelden
                    {!busy ? <CheckCircle2 className="size-4" aria-hidden /> : null}
                  </Button>

                  {serverError ? (
                    <p role="alert" className="text-sm text-rose-600">
                      {serverError}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setStage("email")}
                    className="text-sm text-ink-500 hover:text-ink-900"
                  >
                    Zurück zur E-Mail-Eingabe
                  </button>
                </motion.form>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right — Visual */}
      <aside className="relative hidden overflow-hidden bg-ink-900 lg:block">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_30%,rgb(15_124_117/0.45),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_80%_80%,rgb(248_237_207/0.10),transparent_60%)]"
        />
        <div className="relative grid h-full place-items-center p-12 text-surface-50">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-ink-200 backdrop-blur">
              <ShieldCheck className="size-3.5" aria-hidden />
              Datenschutz · DE/EU-Hosting vorgesehen
            </div>
            <h2 className="mt-6 font-display text-[2.4rem] font-medium leading-[1.1] tracking-[-0.025em] text-balance">
              Praxino schreibt mit — du bleibst final verantwortlich.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-200">
              Patientendaten gehören der Praxis. Praxino verarbeitet im Auftrag,
              minimiert Datenflüsse und macht jede generierte Aussage prüfbar.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-ink-100">
              {[
                "Magic Link via Supabase Auth",
                "Session läuft sicher in deinem Browser",
                "Logout & Sitzungsentzug jederzeit möglich",
              ].map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-accent-300" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
