import { isSupabaseConfigured, supabase } from "./supabase";

export type ReportType = "therapie" | "verlaengerung" | "befund" | "mdk";
export type ReportStatus = "draft" | "in_review" | "signed" | "exported";

export interface Report {
  id: string;
  practice_id: string;
  patient_id: string;
  session_id: string | null;
  created_by: string;
  type: ReportType;
  title: string;
  status: ReportStatus;
  content: Record<string, unknown>;
  version: number;
  signed_at: string | null;
  signed_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReportWithPatient extends Report {
  patient_initials: string | null;
}

export interface CreateReportInput {
  practice_id: string;
  patient_id: string;
  session_id?: string | null;
  type: ReportType;
  title: string;
  status?: ReportStatus;
  content?: Record<string, unknown>;
}

export const REPORT_TYPE_LABEL: Record<ReportType, string> = {
  therapie: "Therapiebericht",
  verlaengerung: "Verlängerungsantrag",
  befund: "Befundbericht",
  mdk: "MDK-Stellungnahme",
};

export const REPORT_STATUS_LABEL: Record<ReportStatus, string> = {
  draft: "Entwurf",
  in_review: "In Prüfung",
  signed: "Freigegeben",
  exported: "Exportiert",
};

export async function fetchPracticeReports(
  practiceId: string,
  limit = 50,
): Promise<ReportWithPatient[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("reports")
    .select("*, patient:patients(initials)")
    .eq("practice_id", practiceId)
    .order("updated_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  type Row = Report & { patient: { initials: string | null } | null };
  return ((data ?? []) as unknown as Row[]).map((r) => ({
    ...r,
    patient_initials: r.patient?.initials ?? null,
  }));
}

export async function countOpenReports(practiceId: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;
  const { count, error } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("practice_id", practiceId)
    .in("status", ["draft", "in_review"]);
  if (error) throw error;
  return count ?? 0;
}

export async function createReport(
  input: CreateReportInput,
  createdBy: string,
): Promise<Report> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }
  const { data, error } = await supabase
    .from("reports")
    .insert({
      practice_id: input.practice_id,
      patient_id: input.patient_id,
      session_id: input.session_id ?? null,
      created_by: createdBy,
      type: input.type,
      title: input.title.trim(),
      status: input.status ?? "draft",
      content: input.content ?? {},
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Report;
}

export async function updateReportStatus(
  id: string,
  status: ReportStatus,
  userId?: string,
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const patch: Record<string, unknown> = { status };
  if (status === "signed") {
    patch.signed_at = new Date().toISOString();
    if (userId) patch.signed_by = userId;
  }
  const { error } = await supabase.from("reports").update(patch).eq("id", id);
  if (error) throw error;
}
