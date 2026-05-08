import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Users,
  AudioLines,
  FileSignature,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Inbox,
  CalendarRange,
  ChartLine,
  Sparkles,
  Mic,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FieldShell, Input, Select } from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { fetchUserPractices, type Practice } from "@/lib/practice";
import {
  createPatient,
  fetchPatients,
  type Patient,
  type PatientStatus,
} from "@/lib/patient";
import {
  createSession,
  fetchPatientSessions,
  fetchPracticeSessions,
  fetchPracticeSessionStats,
  fetchTodaysSessions,
  type SessionStats,
  type SessionStatus,
  type SessionWithPatient,
  type TherapySession,
} from "@/lib/session";
import { cn } from "@/lib/utils";
import { AlertTriangle, Loader2, X } from "lucide-react";

interface NavSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
    icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
    badge?: string;
  }>;
}

const navSections: NavSection[] = [
  {
    label: "Workspace",
    items: [
      { id: "today", label: "Heute", icon: LayoutDashboard },
      { id: "patients", label: "Patient:innen", icon: Users },
      { id: "sessions", label: "Sitzungen", icon: AudioLines },
      { id: "reports", label: "Berichte", icon: FileSignature, badge: "3" },
    ],
  },
  {
    label: "Praxis",
    items: [{ id: "settings", label: "Einstellungen", icon: Settings }],
  },
];

export function AppHomePage() {
  const auth = useAuth();
  const [active, setActive] = useState("today");

  useEffect(() => {
    document.title = "Praxino · Workspace";
  }, []);

  const email = auth.user?.email ?? "demo@praxino.de";
  const initials =
    email
      .split("@")[0]
      .split(/[._-]/)
      .map((p) => p[0]?.toUpperCase())
      .filter(Boolean)
      .slice(0, 2)
      .join("") || "P";

  return (
    <div className="grid min-h-screen grid-cols-1 bg-surface-50 lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-ink-100 bg-surface-0 lg:flex">
        <div className="flex h-16 items-center border-b border-ink-100 px-5">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="App-Navigation">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <p className="px-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                {section.label}
              </p>
              <ul className="mt-2 space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.id === active;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-ink-900 text-surface-50"
                            : "text-ink-600 hover:bg-surface-100 hover:text-ink-900",
                        )}
                      >
                        <item.icon className="size-4" aria-hidden />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge ? (
                          <span
                            className={cn(
                              "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                              isActive
                                ? "bg-accent-500 text-white"
                                : "bg-accent-100 text-accent-700",
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-ink-100 p-3">
          <div className="flex items-center gap-2.5 rounded-lg p-2">
            <span className="grid size-8 place-items-center rounded-md bg-accent-500 text-[11px] font-semibold text-white">
              {initials}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-[13px] font-medium text-ink-900">{email}</p>
              <p className="truncate text-[11px] text-ink-400">Praxis · Demo</p>
            </div>
            <button
              type="button"
              onClick={() => void auth.signOut()}
              aria-label="Abmelden"
              className="grid size-8 place-items-center rounded-md text-ink-500 hover:bg-surface-100 hover:text-rose-600"
            >
              <LogOut className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <Topbar active={active} onChange={setActive} />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8"
          >
            {active === "today" ? <TodayPanel /> : null}
            {active === "patients" ? <PatientsPanel /> : null}
            {active === "sessions" ? <SessionsPanel /> : null}
            {active === "reports" ? <ReportsPanel /> : null}
            {active === "settings" ? <SettingsPanel /> : null}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

/* -------------------- Topbar -------------------- */

const labels: Record<string, string> = {
  today: "Heute",
  patients: "Patient:innen",
  sessions: "Sitzungen",
  reports: "Berichte",
  settings: "Einstellungen",
};

function Topbar({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const tabs = [
    { id: "today", label: "Heute", icon: LayoutDashboard },
    { id: "patients", label: "Patient:innen", icon: Users },
    { id: "sessions", label: "Sitzungen", icon: AudioLines },
    { id: "reports", label: "Berichte", icon: FileSignature },
    { id: "settings", label: "Einstellungen", icon: Settings },
  ];
  return (
    <div className="sticky top-0 z-20 border-b border-ink-100 bg-surface-50/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-ink-400 hover:text-ink-700">
            Praxino
          </Link>
          <ChevronRight className="size-3.5 text-ink-300" aria-hidden />
          <span className="font-medium text-ink-900">{labels[active]}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled
            title="Audio-MVP folgt in Phase 6"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-ink-200 bg-surface-0 px-3 text-sm font-medium text-ink-400 sm:inline-flex"
          >
            <Mic className="size-4" aria-hidden /> Sitzung starten
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink-900 px-3 text-sm font-medium text-surface-50 transition-colors hover:bg-ink-800"
          >
            <Plus className="size-4" aria-hidden /> Neu
          </button>
        </div>
      </div>
      {/* Mobile horizontal nav */}
      <nav
        className="-mb-px flex gap-1 overflow-x-auto border-t border-ink-100 px-3 pb-2 pt-2 lg:hidden"
        aria-label="App-Navigation Mobile"
      >
        {tabs.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium",
                isActive
                  ? "bg-ink-900 text-surface-50"
                  : "text-ink-500 hover:bg-surface-100 hover:text-ink-800",
              )}
            >
              <t.icon className="size-3.5" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* -------------------- Panels -------------------- */

function PanelHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-2xl text-[15px] text-ink-500">{description}</p>
        ) : null}
      </div>
      {actions}
    </header>
  );
}

function TodayPanel() {
  const auth = useAuth();
  const demoMode = !isSupabaseConfigured;
  const [stats, setStats] = useState<SessionStats>({ today: 0, thisWeek: 0, signed: 0 });
  const [todayList, setTodayList] = useState<SessionWithPatient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (demoMode || !auth.user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const practices = await fetchUserPractices(auth.user.id);
        const first = practices[0];
        if (!first) return;
        const [s, sessions] = await Promise.all([
          fetchPracticeSessionStats(first.id),
          fetchTodaysSessions(first.id),
        ]);
        if (cancelled) return;
        setStats(s);
        setTodayList(sessions);
      } catch {
        // fail silent — Today-Panel ist kein blocker
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [auth.user, demoMode]);

  const statTiles = demoMode
    ? [
        { label: "Sitzungen heute", value: "8", icon: AudioLines },
        { label: "Offene Berichte", value: "3", icon: Inbox },
        { label: "Diese Woche", value: "42", icon: CalendarRange },
        { label: "Bereit zum Export", value: "12", icon: ChartLine },
      ]
    : [
        { label: "Sitzungen heute", value: String(stats.today), icon: AudioLines },
        { label: "Offene Berichte", value: "—", icon: Inbox },
        { label: "Diese Woche", value: String(stats.thisWeek), icon: CalendarRange },
        { label: "Freigegeben gesamt", value: String(stats.signed), icon: ChartLine },
      ];

  const upcoming = demoMode
    ? DEMO_UPCOMING
    : todayList.map((s) => ({
        ini: s.patient_initials ?? "—",
        indikation: s.patient_indication ?? "Sitzung",
        time: formatTime(s.occurred_at),
        duration: `${s.duration_minutes} Min.`,
      }));

  const queue = [
    { ini: "M.K.", what: "Verlängerungsantrag", state: "Entwurf", warn: true },
    { ini: "L.S.", what: "Therapiebericht Q3", state: "Bereit", warn: false },
    { ini: "T.B.", what: "Befundbericht", state: "Geprüft", warn: false },
    { ini: "F.R.", what: "MDK-Stellungnahme", state: "Bereit", warn: false },
  ];

  return (
    <div className="space-y-8">
      <PanelHeader
        title="Guten Morgen 👋"
        description="Hier ist dein Tag in einer Übersicht. Noch ist keine echte KI-Pipeline aktiv — du siehst eine Demo-Ansicht des kommenden Workspace."
      />

      <PilotBanner />

      <section>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statTiles.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-100 bg-surface-0 p-4 shadow-soft"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400">
                <s.icon className="size-3.5" aria-hidden />
                {s.label}
              </div>
              <p className="mt-1.5 font-display text-3xl font-medium tracking-tight text-ink-900">
                {loading && !demoMode ? (
                  <Loader2 className="size-5 animate-spin text-ink-300" aria-hidden />
                ) : (
                  s.value
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card title="Heutige Sitzungen" eyebrow="Termine">
          {loading && !demoMode ? (
            <PanelLoading />
          ) : upcoming.length === 0 ? (
            <p className="py-6 text-center text-[13px] text-ink-500">
              Heute sind noch keine Sitzungen geloggt.
            </p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {upcoming.map((u, i) => (
                <li
                  key={u.ini + u.time + i}
                  className="flex items-center gap-4 py-3"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-accent-100 text-[11px] font-semibold text-accent-700">
                    {u.ini}
                  </span>
                  <div className="flex-1">
                    <p className="text-[13.5px] font-medium text-ink-900">
                      Pat. {u.ini}
                    </p>
                    <p className="text-[12px] text-ink-500">{u.indikation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-medium text-ink-800">{u.time}</p>
                    <p className="text-[11px] text-ink-400">{u.duration}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card title="Berichts-Queue" eyebrow="To-Do">
          <ul className="divide-y divide-ink-100">
            {queue.map((q) => (
              <li key={q.ini + q.what} className="flex items-center gap-3 py-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-100 text-[11px] font-semibold text-accent-700">
                  {q.ini}
                </span>
                <p className="flex-1 text-sm text-ink-800">{q.what}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[11px] ring-1",
                    q.warn
                      ? "bg-amber-50 text-amber-700 ring-amber-100"
                      : "bg-emerald-50 text-emerald-700 ring-emerald-100",
                  )}
                >
                  {q.state}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}

function PatientsPanel() {
  const auth = useAuth();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Patient | DemoPatient | null>(null);
  const demoMode = !isSupabaseConfigured;

  const refresh = async (practiceId: string) => {
    try {
      setError(undefined);
      const list = await fetchPatients(practiceId);
      setPatients(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Laden.");
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (demoMode || !auth.user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const list = await fetchUserPractices(auth.user.id);
        if (cancelled) return;
        const first = list[0] ?? null;
        setPractice(first);
        if (first) await refresh(first.id);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Praxis konnte nicht geladen werden.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [auth.user, demoMode]);

  if (selected) {
    return (
      <PatientDetailView
        patient={selected}
        practiceId={practice?.id ?? null}
        userId={auth.user?.id ?? null}
        demoMode={demoMode}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <PanelHeader
        title="Patient:innen"
        description="Pseudonymisierte Übersicht. Initialen + Geburtsjahr genügen für die Anzeige — Klarnamen liegen außerhalb der App."
        actions={
          <Button
            type="button"
            onClick={() => setCreateOpen((v) => !v)}
            disabled={demoMode || !practice}
          >
            {createOpen ? <X className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            {createOpen ? "Abbrechen" : "Neue:r Patient:in"}
          </Button>
        }
      />

      {demoMode ? (
        <DemoBanner />
      ) : !practice && !loading ? (
        <NoPracticeState />
      ) : null}

      {createOpen && practice && auth.user ? (
        <CreatePatientForm
          practiceId={practice.id}
          userId={auth.user.id}
          onCancel={() => setCreateOpen(false)}
          onCreated={async () => {
            setCreateOpen(false);
            await refresh(practice.id);
          }}
        />
      ) : null}

      {loading ? (
        <PanelLoading />
      ) : (
        <PatientsTable
          patients={demoMode ? DEMO_PATIENTS : patients}
          onSelect={setSelected}
        />
      )}

      {error ? (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      ) : null}

      {demoMode ? (
        <p className="text-xs text-ink-400">
          Demo-Daten — keine echten Patientendaten. Sobald Supabase konfiguriert
          ist und du onboarded bist, siehst du echte Datensätze deiner Praxis.
        </p>
      ) : null}
    </div>
  );
}

/* ----------- Patient Detail (Sub-View innerhalb PatientsPanel) ----------- */

function PatientDetailView({
  patient,
  practiceId,
  userId,
  demoMode,
  onBack,
}: {
  patient: Patient | DemoPatient;
  practiceId: string | null;
  userId: string | null;
  demoMode: boolean;
  onBack: () => void;
}) {
  const [sessions, setSessions] = useState<TherapySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const isRealPatient = !demoMode && "practice_id" in patient;
  const realPatient = isRealPatient ? (patient as Patient) : null;

  const refresh = async () => {
    if (!realPatient) return;
    try {
      setError(undefined);
      const list = await fetchPatientSessions(realPatient.id);
      setSessions(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sitzungen konnten nicht geladen werden.");
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!realPatient) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const list = await fetchPatientSessions(realPatient.id);
        if (!cancelled) setSessions(list);
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Sitzungen konnten nicht geladen werden.",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [realPatient?.id]);

  return (
    <div className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-900"
      >
        ← Zurück zur Patient:innen-Liste
      </button>

      <header className="rounded-3xl border border-ink-100 bg-surface-0 p-7 shadow-soft">
        <div className="flex flex-wrap items-start gap-5">
          <span className="grid size-14 place-items-center rounded-2xl bg-accent-100 text-base font-semibold text-accent-700 ring-1 ring-accent-200/60">
            {patient.initials}
          </span>
          <div className="flex-1">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink-900">
              Pat. {patient.initials}
            </h2>
            <p className="mt-1 text-[14px] text-ink-500">
              {patient.indication ?? "Keine Indikation hinterlegt"}
              {patient.icd10 ? ` · ICD-10 ${patient.icd10}` : ""}
              {patient.year_of_birth ? ` · geb. ${patient.year_of_birth}` : ""}
            </p>
            <div className="mt-3">
              <PatientStatusBadge status={patient.status} />
            </div>
          </div>
          <Button
            type="button"
            disabled={demoMode || !realPatient || !practiceId || !userId}
            onClick={() => setCreateOpen((v) => !v)}
          >
            {createOpen ? <X className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            {createOpen ? "Abbrechen" : "Sitzung loggen"}
          </Button>
        </div>
      </header>

      {createOpen && realPatient && practiceId && userId ? (
        <CreateSessionForPatient
          patientId={realPatient.id}
          practiceId={practiceId}
          userId={userId}
          onCancel={() => setCreateOpen(false)}
          onCreated={async () => {
            setCreateOpen(false);
            await refresh();
          }}
        />
      ) : null}

      <section>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
          Verlauf
        </h3>
        {loading ? (
          <div className="mt-3"><PanelLoading /></div>
        ) : demoMode ? (
          <DemoSessionsForPatient patient={patient} />
        ) : sessions.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-ink-200 bg-surface-0 p-8 text-center">
            <p className="text-[14px] text-ink-700">Noch keine Sitzungen geloggt.</p>
            <p className="mt-1 text-[12px] text-ink-500">
              Klick „Sitzung loggen" und halte Therapieziel + Verlauf fest.
            </p>
          </div>
        ) : (
          <ul className="mt-3 grid gap-3">
            {sessions.map((s) => (
              <li
                key={s.id}
                className="rounded-2xl border border-ink-100 bg-surface-0 p-4 shadow-soft"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[13px] font-medium text-ink-800">
                    {formatSessionDate(s.occurred_at)} · {s.duration_minutes} Min.
                  </p>
                  <SessionStatusBadge status={s.status} />
                </div>
                {s.goal ? (
                  <p className="mt-2 text-[13.5px] text-ink-700">
                    <span className="text-ink-400">Ziel:</span> {s.goal}
                  </p>
                ) : null}
                {s.summary ? (
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600">
                    {s.summary}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
        {error ? (
          <p role="alert" className="mt-3 text-sm text-rose-600">
            {error}
          </p>
        ) : null}
      </section>
    </div>
  );
}

function CreateSessionForPatient({
  patientId,
  practiceId,
  userId,
  onCancel,
  onCreated,
}: {
  patientId: string;
  practiceId: string;
  userId: string;
  onCancel: () => void;
  onCreated: () => void | Promise<void>;
}) {
  const [duration, setDuration] = useState("45");
  const [goal, setGoal] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<SessionStatus>("logged");
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  async function submit() {
    setBusy(true);
    setErrorMsg(undefined);
    try {
      const dur = Number.parseInt(duration, 10);
      await createSession(
        {
          practice_id: practiceId,
          patient_id: patientId,
          duration_minutes: Number.isFinite(dur) ? dur : 45,
          goal,
          summary,
          status,
        },
        userId,
      );
      await onCreated();
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Sitzung konnte nicht angelegt werden.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="rounded-2xl border border-ink-100 bg-surface-0 p-6 shadow-soft"
    >
      <p className="text-[11px] uppercase tracking-wider text-ink-400">
        Sitzung loggen
      </p>
      <h3 className="mt-1 text-base font-semibold tracking-tight text-ink-900">
        Therapieziel + Verlauf festhalten
      </h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FieldShell id="dur2" label="Dauer" hint="Minuten">
          <Input
            id="dur2"
            inputMode="numeric"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value.replace(/[^0-9]/g, "") || "0")
            }
            maxLength={3}
          />
        </FieldShell>
        <FieldShell id="status2" label="Status">
          <Select
            id="status2"
            value={status}
            onChange={(e) => setStatus(e.target.value as SessionStatus)}
          >
            <option value="logged">Geloggt</option>
            <option value="draft">Entwurf</option>
            <option value="signed">Freigegeben</option>
          </Select>
        </FieldShell>
        <div className="sm:col-span-2 lg:col-span-1">
          <FieldShell id="goal2" label="Therapieziel" hint="Optional">
            <Input
              id="goal2"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="tonale Stabilität"
            />
          </FieldShell>
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <FieldShell id="sum2" label="Verlauf / Notiz" hint="Stichworte reichen">
            <Input
              id="sum2"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Atemübungen, Compliance gut, Fortschritt sichtbar"
            />
          </FieldShell>
        </div>
      </div>

      {errorMsg ? (
        <p role="alert" className="mt-4 text-sm text-rose-600">
          {errorMsg}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
          Abbrechen
        </Button>
        <Button type="submit" loading={busy}>
          Speichern
        </Button>
      </div>
    </form>
  );
}

function DemoSessionsForPatient({ patient }: { patient: DemoPatient | Patient }) {
  const matching = DEMO_SESSIONS.filter(
    (s) => s.patient_initials === patient.initials,
  );
  if (matching.length === 0) {
    return (
      <div className="mt-3 rounded-2xl border border-dashed border-ink-200 bg-surface-0 p-8 text-center text-[13px] text-ink-500">
        Demo-Modus: für diese:n Patient:in liegen keine Beispiel-Sitzungen.
      </div>
    );
  }
  return (
    <ul className="mt-3 grid gap-3">
      {matching.map((s) => (
        <li
          key={s.id}
          className="rounded-2xl border border-ink-100 bg-surface-0 p-4 shadow-soft"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-[13px] font-medium text-ink-800">
              {formatSessionDate(s.occurred_at)} · {s.duration_minutes} Min.
            </p>
            <SessionStatusBadge status={s.status} />
          </div>
          {s.goal ? (
            <p className="mt-2 text-[13.5px] text-ink-700">
              <span className="text-ink-400">Ziel:</span> {s.goal}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

interface DemoPatient {
  id: string;
  initials: string;
  indication: string | null;
  icd10: string | null;
  status: PatientStatus;
  year_of_birth: number | null;
}

const DEMO_PATIENTS: DemoPatient[] = [
  { id: "1", initials: "M.K.", indication: "Stimmstörung", icd10: "R49.0", status: "active", year_of_birth: 1962 },
  { id: "2", initials: "L.S.", indication: "Aphasie nach Schlaganfall", icd10: "R47.0", status: "active", year_of_birth: 1955 },
  { id: "3", initials: "T.B.", indication: "Artikulationsstörung", icd10: "F80.0", status: "active", year_of_birth: 2018 },
  { id: "4", initials: "F.R.", indication: "Schluckstörung", icd10: "R13.10", status: "paused", year_of_birth: 1948 },
  { id: "5", initials: "S.W.", indication: "Stottern", icd10: "F98.5", status: "active", year_of_birth: 2014 },
];

function PatientsTable({
  patients,
  onSelect,
}: {
  patients: Array<Patient | DemoPatient>;
  onSelect: (p: Patient | DemoPatient) => void;
}) {
  if (patients.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 bg-surface-0 p-10 text-center">
        <p className="font-display text-lg text-ink-700">Noch keine Patient:innen.</p>
        <p className="mt-1.5 text-sm text-ink-500">
          Lege deine erste Patient:in an — Initialen und Geburtsjahr reichen.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-100 bg-surface-0 shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-surface-50 text-left text-[11px] uppercase tracking-wider text-ink-400">
          <tr>
            <th className="px-5 py-3 font-medium">Initialen</th>
            <th className="px-5 py-3 font-medium">Geb.</th>
            <th className="px-5 py-3 font-medium">Indikation</th>
            <th className="px-5 py-3 font-medium">ICD-10</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3" aria-label="Aktion" />
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {patients.map((p) => (
            <tr
              key={p.id}
              onClick={() => onSelect(p)}
              className="cursor-pointer transition-colors hover:bg-surface-50"
            >
              <td className="px-5 py-3.5">
                <span className="grid size-8 place-items-center rounded-full bg-accent-100 text-[11px] font-semibold text-accent-700">
                  {p.initials}
                </span>
              </td>
              <td className="px-5 py-3.5 font-mono text-[12px] text-ink-500">
                {p.year_of_birth ?? "—"}
              </td>
              <td className="px-5 py-3.5 text-ink-800">{p.indication ?? "—"}</td>
              <td className="px-5 py-3.5 font-mono text-[12px] text-ink-500">
                {p.icd10 ?? "—"}
              </td>
              <td className="px-5 py-3.5">
                <PatientStatusBadge status={p.status} />
              </td>
              <td className="px-5 py-3.5 text-right">
                <ChevronRight className="ml-auto size-4 text-ink-300" aria-hidden />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PatientStatusBadge({ status }: { status: PatientStatus }) {
  const map: Record<PatientStatus, { label: string; cls: string }> = {
    active: { label: "Aktiv", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    paused: { label: "Pausiert", cls: "bg-amber-50 text-amber-700 ring-amber-100" },
    archived: { label: "Archiviert", cls: "bg-ink-50 text-ink-500 ring-ink-100" },
  };
  const m = map[status];
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[11px] ring-1", m.cls)}>
      {m.label}
    </span>
  );
}

function CreatePatientForm({
  practiceId,
  userId,
  onCancel,
  onCreated,
}: {
  practiceId: string;
  userId: string;
  onCancel: () => void;
  onCreated: () => void | Promise<void>;
}) {
  const [initials, setInitials] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [indication, setIndication] = useState("");
  const [icd10, setIcd10] = useState("");
  const [status, setStatus] = useState<PatientStatus>("active");
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  async function submit() {
    if (!initials.trim()) {
      setErrorMsg("Initialen fehlen.");
      return;
    }
    setBusy(true);
    setErrorMsg(undefined);
    try {
      const yob = yearOfBirth.trim() ? Number.parseInt(yearOfBirth, 10) : null;
      await createPatient(
        {
          practice_id: practiceId,
          initials: initials.trim(),
          year_of_birth: Number.isFinite(yob) ? yob : null,
          indication,
          icd10,
          status,
        },
        userId,
      );
      await onCreated();
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Anlegen fehlgeschlagen. Bitte erneut versuchen.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="rounded-2xl border border-ink-100 bg-surface-0 p-6 shadow-soft"
    >
      <p className="text-[11px] uppercase tracking-wider text-ink-400">Neue Patient:in</p>
      <h3 className="mt-1 text-base font-semibold tracking-tight text-ink-900">
        Initialen, Indikation, Status
      </h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FieldShell id="ini" label="Initialen" required>
          <Input
            id="ini"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            placeholder="M.K."
            maxLength={10}
          />
        </FieldShell>
        <FieldShell id="yob" label="Geburtsjahr" hint="Optional">
          <Input
            id="yob"
            inputMode="numeric"
            value={yearOfBirth}
            onChange={(e) => setYearOfBirth(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="1962"
            maxLength={4}
          />
        </FieldShell>
        <FieldShell id="status" label="Status">
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as PatientStatus)}
          >
            <option value="active">Aktiv</option>
            <option value="paused">Pausiert</option>
            <option value="archived">Archiviert</option>
          </Select>
        </FieldShell>
        <FieldShell id="indication" label="Indikation" hint="Klartext">
          <Input
            id="indication"
            value={indication}
            onChange={(e) => setIndication(e.target.value)}
            placeholder="Stimmstörung"
          />
        </FieldShell>
        <FieldShell id="icd" label="ICD-10" hint="Optional">
          <Input
            id="icd"
            value={icd10}
            onChange={(e) => setIcd10(e.target.value)}
            placeholder="R49.0"
            maxLength={10}
          />
        </FieldShell>
      </div>

      {errorMsg ? (
        <p role="alert" className="mt-4 text-sm text-rose-600">
          {errorMsg}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
          Abbrechen
        </Button>
        <Button type="submit" loading={busy}>
          Anlegen
        </Button>
      </div>
    </form>
  );
}

function PanelLoading() {
  return (
    <div className="grid place-items-center rounded-2xl border border-ink-100 bg-surface-0 p-10">
      <Loader2 className="size-5 animate-spin text-ink-400" aria-hidden />
    </div>
  );
}

function DemoBanner() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        <p className="font-medium">Demo-Modus.</p>
        <p className="mt-1 text-amber-700">
          Supabase ist nicht konfiguriert — du siehst Beispieldaten. Setze{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px]">VITE_SUPABASE_URL</code>{" "}
          und <code className="rounded bg-amber-100 px-1 py-0.5 text-[12px]">VITE_SUPABASE_ANON_KEY</code>,
          dann werden echte Datensätze deiner Praxis geladen.
        </p>
      </div>
    </div>
  );
}

function NoPracticeState() {
  return (
    <div className="rounded-3xl border border-dashed border-ink-200 bg-surface-0 p-10 text-center">
      <p className="font-display text-lg text-ink-700">Keine Praxis verknüpft.</p>
      <p className="mt-1.5 text-sm text-ink-500">
        Schließ das Onboarding ab oder kontaktiere uns unter hello@praxino.de.
      </p>
    </div>
  );
}

function SessionsPanel() {
  const auth = useAuth();
  const [practice, setPractice] = useState<Practice | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<SessionWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [createOpen, setCreateOpen] = useState(false);
  const demoMode = !isSupabaseConfigured;

  const refreshSessions = async (practiceId: string) => {
    try {
      setError(undefined);
      const list = await fetchPracticeSessions(practiceId);
      setSessions(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Laden.");
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (demoMode || !auth.user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const list = await fetchUserPractices(auth.user.id);
        if (cancelled) return;
        const first = list[0] ?? null;
        setPractice(first);
        if (first) {
          const [pList] = await Promise.all([fetchPatients(first.id)]);
          if (!cancelled) {
            setPatients(pList);
            await refreshSessions(first.id);
          }
        }
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Daten konnten nicht geladen werden.",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [auth.user, demoMode]);

  return (
    <div className="space-y-8">
      <PanelHeader
        title="Sitzungen"
        description="Heute Sitzung loggen, Therapieziel + Verlauf festhalten. Audio-Live-Doku folgt in Phase 6."
        actions={
          <Button
            type="button"
            onClick={() => setCreateOpen((v) => !v)}
            disabled={demoMode || !practice || patients.length === 0}
          >
            {createOpen ? <X className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
            {createOpen ? "Abbrechen" : "Sitzung anlegen"}
          </Button>
        }
      />

      {demoMode ? <DemoBanner /> : null}
      {!demoMode && !loading && !practice ? <NoPracticeState /> : null}
      {!demoMode && !loading && practice && patients.length === 0 ? (
        <NoPatientsState />
      ) : null}

      {createOpen && practice && auth.user ? (
        <CreateSessionForm
          practiceId={practice.id}
          userId={auth.user.id}
          patients={patients}
          onCancel={() => setCreateOpen(false)}
          onCreated={async () => {
            setCreateOpen(false);
            await refreshSessions(practice.id);
          }}
        />
      ) : null}

      {loading ? (
        <PanelLoading />
      ) : (
        <SessionsList sessions={demoMode ? DEMO_SESSIONS : sessions} />
      )}

      {error ? (
        <p role="alert" className="text-sm text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface DemoSession {
  id: string;
  occurred_at: string;
  duration_minutes: number;
  goal: string | null;
  status: SessionStatus;
  patient_initials: string;
  patient_indication: string | null;
}

const DEMO_SESSIONS: DemoSession[] = [
  {
    id: "s1",
    occurred_at: new Date(Date.now() - 2 * 3600_000).toISOString(),
    duration_minutes: 45,
    goal: "Tonale Stabilität",
    status: "logged",
    patient_initials: "M.K.",
    patient_indication: "Stimmstörung",
  },
  {
    id: "s2",
    occurred_at: new Date(Date.now() - 26 * 3600_000).toISOString(),
    duration_minutes: 45,
    goal: "Wortfindung verbessern",
    status: "draft",
    patient_initials: "L.S.",
    patient_indication: "Aphasie",
  },
  {
    id: "s3",
    occurred_at: new Date(Date.now() - 50 * 3600_000).toISOString(),
    duration_minutes: 30,
    goal: "S-Laut",
    status: "signed",
    patient_initials: "T.B.",
    patient_indication: "Artikulation",
  },
];

function SessionsList({
  sessions,
}: {
  sessions: Array<SessionWithPatient | DemoSession>;
}) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 bg-surface-0 p-10 text-center">
        <p className="font-display text-lg text-ink-700">Noch keine Sitzungen.</p>
        <p className="mt-1.5 text-sm text-ink-500">
          Klick „Sitzung anlegen" und logg deine erste Behandlung — Therapieziel
          + Verlauf reichen für den Anfang.
        </p>
      </div>
    );
  }
  return (
    <ul className="grid gap-3">
      {sessions.map((s) => (
        <SessionRow key={s.id} session={s} />
      ))}
    </ul>
  );
}

function SessionRow({
  session,
}: {
  session: SessionWithPatient | DemoSession;
}) {
  const initials = "patient_initials" in session ? session.patient_initials : null;
  const indication =
    "patient_indication" in session ? session.patient_indication : null;
  return (
    <li className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 rounded-2xl border border-ink-100 bg-surface-0 p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <span className="grid size-10 place-items-center rounded-full bg-accent-100 text-[12px] font-semibold text-accent-700">
        {initials ?? "?"}
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-ink-900">
          {indication ?? "Sitzung"}
          {session.goal ? (
            <span className="ml-2 text-ink-400">· {session.goal}</span>
          ) : null}
        </p>
        <p className="text-[12px] text-ink-500">
          {formatSessionDate(session.occurred_at)} · {session.duration_minutes} Min.
        </p>
      </div>
      <SessionStatusBadge status={session.status} />
      <ChevronRight className="size-4 text-ink-300" aria-hidden />
    </li>
  );
}

function formatSessionDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
}

function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const map: Record<SessionStatus, { label: string; cls: string }> = {
    logged: { label: "Geloggt", cls: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    draft: { label: "Entwurf", cls: "bg-amber-50 text-amber-700 ring-amber-100" },
    signed: { label: "Freigegeben", cls: "bg-accent-50 text-accent-700 ring-accent-100" },
  };
  const m = map[status];
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[11px] ring-1", m.cls)}>
      {m.label}
    </span>
  );
}

function CreateSessionForm({
  practiceId,
  userId,
  patients,
  onCancel,
  onCreated,
}: {
  practiceId: string;
  userId: string;
  patients: Patient[];
  onCancel: () => void;
  onCreated: () => void | Promise<void>;
}) {
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "");
  const [duration, setDuration] = useState("45");
  const [goal, setGoal] = useState("");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<SessionStatus>("logged");
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  async function submit() {
    if (!patientId) {
      setErrorMsg("Bitte Patient:in wählen.");
      return;
    }
    setBusy(true);
    setErrorMsg(undefined);
    try {
      const dur = Number.parseInt(duration, 10);
      await createSession(
        {
          practice_id: practiceId,
          patient_id: patientId,
          duration_minutes: Number.isFinite(dur) ? dur : 45,
          goal,
          summary,
          status,
        },
        userId,
      );
      await onCreated();
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Sitzung konnte nicht angelegt werden.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      className="rounded-2xl border border-ink-100 bg-surface-0 p-6 shadow-soft"
    >
      <p className="text-[11px] uppercase tracking-wider text-ink-400">Sitzung anlegen</p>
      <h3 className="mt-1 text-base font-semibold tracking-tight text-ink-900">
        Wer · wie lange · was war das Ziel
      </h3>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <FieldShell id="patient" label="Patient:in" required>
          <Select
            id="patient"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.initials}
                {p.indication ? ` · ${p.indication}` : ""}
              </option>
            ))}
          </Select>
        </FieldShell>
        <FieldShell id="dur" label="Dauer" hint="Minuten">
          <Input
            id="dur"
            inputMode="numeric"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value.replace(/[^0-9]/g, "") || "0")
            }
            maxLength={3}
          />
        </FieldShell>
        <FieldShell id="status" label="Status">
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as SessionStatus)}
          >
            <option value="logged">Geloggt</option>
            <option value="draft">Entwurf</option>
            <option value="signed">Freigegeben</option>
          </Select>
        </FieldShell>
        <div className="sm:col-span-2 lg:col-span-3">
          <FieldShell id="goal" label="Therapieziel" hint="Optional, kurz">
            <Input
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="z. B. tonale Stabilität, Wortfindung, Atemstütze"
            />
          </FieldShell>
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <FieldShell id="summary" label="Verlauf / Notiz" hint="Stichworte reichen">
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Atemübungen, Compliance gut, Fortschritt sichtbar"
            />
          </FieldShell>
        </div>
      </div>

      {errorMsg ? (
        <p role="alert" className="mt-4 text-sm text-rose-600">
          {errorMsg}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
          Abbrechen
        </Button>
        <Button type="submit" loading={busy}>
          Anlegen
        </Button>
      </div>
    </form>
  );
}

function NoPatientsState() {
  return (
    <div className="rounded-3xl border border-dashed border-ink-200 bg-surface-0 p-10 text-center">
      <p className="font-display text-lg text-ink-700">
        Noch keine Patient:innen angelegt.
      </p>
      <p className="mt-1.5 text-sm text-ink-500">
        Wechsel auf den Tab „Patient:innen" und leg die erste Person an —
        danach kannst du Sitzungen loggen.
      </p>
    </div>
  );
}

function ReportsPanel() {
  const reports = [
    { ini: "M.K.", type: "Verlängerungsantrag", state: "Entwurf", date: "2026-05-08" },
    { ini: "L.S.", type: "Therapiebericht", state: "Bereit", date: "2026-05-07" },
    { ini: "T.B.", type: "Befundbericht", state: "Geprüft", date: "2026-05-06" },
    { ini: "F.R.", type: "MDK-Stellungnahme", state: "Bereit", date: "2026-05-05" },
  ];
  return (
    <div className="space-y-8">
      <PanelHeader
        title="Berichte"
        description="Therapie-, Verlängerungs-, Befund- und MDK-Berichte. Strukturiert, prüfbar, freigabefähig."
      />
      <ul className="grid gap-3">
        {reports.map((r) => (
          <li
            key={r.ini + r.type + r.date}
            className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-surface-0 p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
              <FileSignature className="size-5" aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-[14.5px] font-medium text-ink-900">{r.type}</p>
              <p className="text-[12px] text-ink-500">
                Pat. {r.ini} · {r.date}
              </p>
            </div>
            <Badge tone={r.state === "Entwurf" ? "warning" : "success"}>{r.state}</Badge>
            <ChevronRight className="size-4 text-ink-300" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-8">
      <PanelHeader
        title="Einstellungen"
        description="Praxis, Team, Vorlagen, Rollen. Volle Verwaltung folgt in Phase 4."
      />
      <Card title="Praxis" eyebrow="Stammdaten">
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          {[
            ["Praxisname", "Demo-Praxis"],
            ["E-Mail", "demo@praxino.de"],
            ["Plan", "Pilot — kostenlos"],
            ["Region", "EU / DE"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-surface-50 p-3 ring-1 ring-ink-100">
              <dt className="text-[11px] uppercase tracking-wider text-ink-400">{k}</dt>
              <dd className="mt-0.5 text-[13.5px] text-ink-800">{v}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <Card title="Datenschutz" eyebrow="Compliance">
        <p className="text-sm leading-relaxed text-ink-500">
          AVV/DPA-Prozess wird vor produktivem Einsatz mit Patientendaten finalisiert.
          Audit-Log, Löschkonzept und Rollen-Rechte sind in der Architektur vorbereitet.
        </p>
        <Link
          to="/privacy"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:text-accent-800"
        >
          Datenschutz-Hinweise <ChevronRight className="size-4" aria-hidden />
        </Link>
      </Card>
    </div>
  );
}

/* -------------------- Sub-primitives -------------------- */

function Card({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-ink-100 bg-surface-0 p-5 shadow-soft">
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-wider text-ink-400">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-base font-semibold tracking-tight text-ink-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function PilotBanner() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-accent-100 bg-accent-50/60 p-5 text-accent-900">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-500 text-white">
        <Sparkles className="size-5" aria-hidden />
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium">Du bist im Pilot-Workspace.</p>
        <p className="mt-1 text-sm text-accent-800">
          Diese Ansicht ist eine Vorschau. Live-Sitzung mit Audio, KI-Doku und
          Berichts-Generator folgen in Phase 6 + 7 — sobald das Datenschutzkonzept finalisiert ist.
        </p>
      </div>
      <ShieldCheck className="hidden size-5 shrink-0 text-accent-600 sm:block" aria-hidden />
    </div>
  );
}


const DEMO_UPCOMING = [
  { ini: "M.K.", indikation: "Stimmstörung", time: "10:00", duration: "45 Min." },
  { ini: "L.S.", indikation: "Aphasie", time: "10:45", duration: "45 Min." },
  { ini: "T.B.", indikation: "Artikulation", time: "11:30", duration: "30 Min." },
  { ini: "F.R.", indikation: "Schluckstörung", time: "13:15", duration: "60 Min." },
];

function formatTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
