import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured: boolean = Boolean(url && anonKey);

/**
 * Supabase Client. `null`, wenn die ENV-Variablen noch nicht gesetzt sind —
 * die App soll dann nicht crashen, sondern Mock-Pfade nehmen.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
      global: {
        headers: {
          "x-application-name": "praxino-web",
        },
      },
    })
  : null;
