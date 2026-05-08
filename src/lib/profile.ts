import { isSupabaseConfigured, supabase } from "./supabase";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  onboarded_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error) {
    // eslint-disable-next-line no-console
    console.warn("[Praxino] fetchProfile error", error);
    return null;
  }
  return (data as Profile | null) ?? null;
}

export async function ensureProfile(input: {
  id: string;
  email: string | null;
  full_name?: string | null;
}): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase.from("profiles").upsert({
    id: input.id,
    email: input.email,
    full_name: input.full_name ?? null,
  });
  if (error) throw error;
}

export async function updateProfile(
  userId: string,
  patch: Partial<Pick<Profile, "full_name" | "email">>,
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase
    .from("profiles")
    .update(patch)
    .eq("id", userId);
  if (error) throw error;
}

export async function markOnboarded(userId: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  const { error } = await supabase
    .from("profiles")
    .update({ onboarded_at: new Date().toISOString() })
    .eq("id", userId);
  if (error) throw error;
}
