import { isSupabaseConfigured, supabase } from "./supabase";
import type { PilotWaitlistEntry, PilotWaitlistInsertResult } from "@/types";

interface SupabaseLikeError {
  code?: string;
  message?: string;
  details?: string;
}

function isSupabaseError(value: unknown): value is SupabaseLikeError {
  return typeof value === "object" && value !== null && "message" in value;
}

/**
 * Mappt Supabase-Fehler auf nutzbare deutsche Meldungen.
 * Liefert nie `Object.toString()` oder rohe SQL-Fehler an die UI durch.
 */
export function mapWaitlistError(err: unknown): string {
  if (isSupabaseError(err)) {
    const code = err.code ?? "";
    const msg = err.message ?? "";

    // Doppelte E-Mail (nur wenn UNIQUE-Index ergänzt wird; aktuell nicht)
    if (code === "23505") {
      return "Diese E-Mail ist bereits eingetragen. Wir melden uns.";
    }
    // RLS / Berechtigung
    if (code === "42501" || msg.toLowerCase().includes("row-level security")) {
      return "Speichern aktuell nicht erlaubt. Bitte später erneut versuchen.";
    }
    // Netz / Timeout
    if (msg.toLowerCase().includes("failed to fetch") || msg.toLowerCase().includes("network")) {
      return "Verbindung zum Server fehlgeschlagen. Bitte Internetverbindung prüfen.";
    }
    // Bad Gateway / 5xx
    if (code.startsWith("PGRST") || msg.includes("503") || msg.includes("502")) {
      return "Unser Backend ist gerade kurz nicht erreichbar. Bitte gleich nochmal probieren.";
    }
    if (msg) return msg;
  }
  if (err instanceof Error) return err.message;
  return "Es gab ein Problem beim Speichern. Bitte später erneut versuchen.";
}

export async function submitPilotWaitlist(
  payload: PilotWaitlistEntry,
): Promise<PilotWaitlistInsertResult> {
  if (!isSupabaseConfigured || !supabase) {
    // Mock-Pfad — Supabase noch nicht konfiguriert.
    // eslint-disable-next-line no-console
    console.info("[Praxino] Supabase nicht konfiguriert — Mock-Submit:", payload);
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, mocked: true };
  }

  try {
    const { error } = await supabase.from("pilot_waitlist").insert({
      name: payload.name,
      practice_name: payload.practiceName ?? null,
      email: payload.email,
      discipline: payload.discipline,
      team_size: payload.teamSize,
      message: payload.message ?? null,
      source: "landingpage",
    });
    if (error) {
      return { ok: false, mocked: false, errorMessage: mapWaitlistError(error) };
    }
    return { ok: true, mocked: false };
  } catch (err) {
    return { ok: false, mocked: false, errorMessage: mapWaitlistError(err) };
  }
}
