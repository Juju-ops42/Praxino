import { isSupabaseConfigured, supabase } from "./supabase";

export type PatientStatus = "active" | "paused" | "archived";

export interface Patient {
  id: string;
  practice_id: string;
  created_by: string;
  initials: string;
  year_of_birth: number | null;
  indication: string | null;
  icd10: string | null;
  status: PatientStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreatePatientInput {
  practice_id: string;
  initials: string;
  year_of_birth?: number | null;
  indication?: string | null;
  icd10?: string | null;
  status?: PatientStatus;
  notes?: string | null;
}

export async function fetchPatients(practiceId: string): Promise<Patient[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("practice_id", practiceId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Patient[];
}

export async function createPatient(
  input: CreatePatientInput,
  createdBy: string,
): Promise<Patient> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }
  const { data, error } = await supabase
    .from("patients")
    .insert({
      practice_id: input.practice_id,
      created_by: createdBy,
      initials: input.initials.trim(),
      year_of_birth: input.year_of_birth ?? null,
      indication: input.indication?.trim() || null,
      icd10: input.icd10?.trim() || null,
      status: input.status ?? "active",
      notes: input.notes?.trim() || null,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Patient;
}

export async function updatePatientStatus(
  id: string,
  status: PatientStatus,
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase
    .from("patients")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}
