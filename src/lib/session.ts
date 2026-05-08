import { isSupabaseConfigured, supabase } from "./supabase";

export type SessionStatus = "logged" | "draft" | "signed";

export interface TherapySession {
  id: string;
  practice_id: string;
  patient_id: string;
  created_by: string;
  occurred_at: string;
  duration_minutes: number;
  goal: string | null;
  summary: string | null;
  status: SessionStatus;
  created_at: string;
  updated_at: string;
}

export interface SessionWithPatient extends TherapySession {
  patient_initials: string | null;
  patient_indication: string | null;
}

export interface CreateSessionInput {
  practice_id: string;
  patient_id: string;
  occurred_at?: string;
  duration_minutes?: number;
  goal?: string | null;
  summary?: string | null;
  status?: SessionStatus;
}

export async function fetchPracticeSessions(
  practiceId: string,
  limit = 50,
): Promise<SessionWithPatient[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("sessions")
    .select("*, patient:patients(initials, indication)")
    .eq("practice_id", practiceId)
    .order("occurred_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  type Row = TherapySession & {
    patient: { initials: string | null; indication: string | null } | null;
  };
  return ((data ?? []) as unknown as Row[]).map((r) => ({
    ...r,
    patient_initials: r.patient?.initials ?? null,
    patient_indication: r.patient?.indication ?? null,
  }));
}

export async function fetchPatientSessions(
  patientId: string,
): Promise<TherapySession[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("patient_id", patientId)
    .order("occurred_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as TherapySession[];
}

export async function createSession(
  input: CreateSessionInput,
  createdBy: string,
): Promise<TherapySession> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }
  const { data, error } = await supabase
    .from("sessions")
    .insert({
      practice_id: input.practice_id,
      patient_id: input.patient_id,
      created_by: createdBy,
      occurred_at: input.occurred_at ?? new Date().toISOString(),
      duration_minutes: input.duration_minutes ?? 45,
      goal: input.goal?.trim() || null,
      summary: input.summary?.trim() || null,
      status: input.status ?? "logged",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as TherapySession;
}

export interface SessionNote {
  id: string;
  session_id: string;
  practice_id: string;
  created_by: string;
  content: string;
  kind: "observation" | "exercise" | "recommendation";
  created_at: string;
}

export async function fetchSessionNotes(sessionId: string): Promise<SessionNote[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("session_notes")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []) as SessionNote[];
}

export async function addSessionNote(
  input: {
    session_id: string;
    practice_id: string;
    content: string;
    kind?: SessionNote["kind"];
  },
  createdBy: string,
): Promise<SessionNote> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }
  const { data, error } = await supabase
    .from("session_notes")
    .insert({
      session_id: input.session_id,
      practice_id: input.practice_id,
      created_by: createdBy,
      content: input.content.trim(),
      kind: input.kind ?? "observation",
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as SessionNote;
}

/* ---------- Aggregate-Helpers für Today-Panel ---------- */

export interface SessionStats {
  today: number;
  thisWeek: number;
  signed: number;
}

export async function fetchPracticeSessionStats(
  practiceId: string,
): Promise<SessionStats> {
  if (!isSupabaseConfigured || !supabase) {
    return { today: 0, thisWeek: 0, signed: 0 };
  }
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  // Wochenanfang: Montag 00:00
  const dayOfWeek = (now.getDay() + 6) % 7; // Mon=0 ... Sun=6
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfDay.getDate() - dayOfWeek);

  const [todayRes, weekRes, signedRes] = await Promise.all([
    supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("practice_id", practiceId)
      .gte("occurred_at", startOfDay.toISOString())
      .lte("occurred_at", endOfDay.toISOString()),
    supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("practice_id", practiceId)
      .gte("occurred_at", startOfWeek.toISOString()),
    supabase
      .from("sessions")
      .select("*", { count: "exact", head: true })
      .eq("practice_id", practiceId)
      .eq("status", "signed"),
  ]);

  return {
    today: todayRes.count ?? 0,
    thisWeek: weekRes.count ?? 0,
    signed: signedRes.count ?? 0,
  };
}

export async function fetchTodaysSessions(
  practiceId: string,
): Promise<SessionWithPatient[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("sessions")
    .select("*, patient:patients(initials, indication)")
    .eq("practice_id", practiceId)
    .gte("occurred_at", startOfDay.toISOString())
    .lte("occurred_at", endOfDay.toISOString())
    .order("occurred_at", { ascending: true });
  if (error) throw error;
  type Row = TherapySession & {
    patient: { initials: string | null; indication: string | null } | null;
  };
  return ((data ?? []) as unknown as Row[]).map((r) => ({
    ...r,
    patient_initials: r.patient?.initials ?? null,
    patient_indication: r.patient?.indication ?? null,
  }));
}
