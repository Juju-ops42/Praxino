import { isSupabaseConfigured, supabase } from "./supabase";
import type { Discipline, TeamSize } from "@/types";

export interface Practice {
  id: string;
  name: string;
  discipline: Discipline | string;
  team_size: TeamSize | string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePracticeInput {
  ownerId: string;
  name: string;
  discipline: Discipline;
  teamSize?: TeamSize;
}

/**
 * Legt eine Praxis an und macht den/die anlegende(n) Nutzer:in zur owner-Mitgliedschaft.
 * Wirft, wenn Supabase nicht konfiguriert ist — Caller muss isSupabaseConfigured prüfen.
 */
export async function createPracticeWithMembership(
  input: CreatePracticeInput,
): Promise<Practice> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase ist nicht konfiguriert.");
  }
  const { data, error } = await supabase
    .from("practices")
    .insert({
      owner_id: input.ownerId,
      name: input.name,
      discipline: input.discipline,
      team_size: input.teamSize ?? null,
    })
    .select("*")
    .single();
  if (error) throw error;

  const practice = data as Practice;

  const { error: mErr } = await supabase.from("memberships").insert({
    user_id: input.ownerId,
    practice_id: practice.id,
    role: "owner",
  });
  if (mErr) throw mErr;

  return practice;
}

export async function fetchUserPractices(userId: string): Promise<Practice[]> {
  if (!isSupabaseConfigured || !supabase) return [];
  const { data, error } = await supabase
    .from("memberships")
    .select("practice:practices(*)")
    .eq("user_id", userId);
  if (error) throw error;
  return ((data ?? []) as unknown as Array<{ practice: Practice | null }>)
    .map((m) => m.practice)
    .filter((p): p is Practice => Boolean(p));
}
