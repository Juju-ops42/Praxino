import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "./supabase";
import { fetchProfile, type Profile } from "./profile";

type AuthStatus = "loading" | "signed-in" | "signed-out" | "unconfigured";

interface AuthState {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  /** true wenn Profil geladen wurde und onboarded_at gesetzt ist */
  isOnboarded: boolean;
  /** true während Profil-Daten initial geladen werden */
  profileLoading: boolean;
}

interface AuthContextValue extends AuthState {
  signInWithEmail: (
    email: string,
    options?: { redirectTo?: string },
  ) => Promise<{ ok: boolean; errorMessage?: string }>;
  verifyEmailOtp: (
    email: string,
    token: string,
  ) => Promise<{ ok: boolean; errorMessage?: string }>;
  signOut: () => Promise<void>;
  /** Lädt Profil neu (z. B. nach Onboarding-Submit). */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const initial: AuthState = {
  status: isSupabaseConfigured ? "loading" : "unconfigured",
  user: null,
  session: null,
  profile: null,
  isOnboarded: false,
  profileLoading: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initial);

  const loadProfile = useCallback(async (user: User | null) => {
    if (!user) {
      setState((s) => ({
        ...s,
        profile: null,
        isOnboarded: false,
        profileLoading: false,
      }));
      return;
    }
    setState((s) => ({ ...s, profileLoading: true }));
    const profile = await fetchProfile(user.id);
    setState((s) => ({
      ...s,
      profile,
      isOnboarded: Boolean(profile?.onboarded_at),
      profileLoading: false,
    }));
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;

    void (async () => {
      const { data } = await supabase!.auth.getSession();
      if (!mounted) return;
      const session = data.session;
      setState((s) => ({
        ...s,
        status: session ? "signed-in" : "signed-out",
        user: session?.user ?? null,
        session,
      }));
      if (session?.user) await loadProfile(session.user);
    })();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState((s) => ({
        ...s,
        status: session ? "signed-in" : "signed-out",
        user: session?.user ?? null,
        session,
      }));
      void loadProfile(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signInWithEmail = useCallback<AuthContextValue["signInWithEmail"]>(
    async (email, options) => {
      if (!supabase) {
        return {
          ok: false,
          errorMessage:
            "Auth ist nicht konfiguriert (VITE_SUPABASE_URL / ANON_KEY fehlen).",
        };
      }
      const redirectTo = options?.redirectTo ?? `${window.location.origin}/app`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
          shouldCreateUser: true,
        },
      });
      if (error) return { ok: false, errorMessage: mapAuthError(error.message) };
      return { ok: true };
    },
    [],
  );

  const verifyEmailOtp = useCallback<AuthContextValue["verifyEmailOtp"]>(
    async (email, token) => {
      if (!supabase) {
        return {
          ok: false,
          errorMessage: "Auth ist nicht konfiguriert.",
        };
      }
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });
      if (error) return { ok: false, errorMessage: mapAuthError(error.message) };
      return { ok: true };
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  const refreshProfile = useCallback(async () => {
    await loadProfile(state.user);
  }, [loadProfile, state.user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signInWithEmail,
      verifyEmailOtp,
      signOut,
      refreshProfile,
    }),
    [state, signInWithEmail, verifyEmailOtp, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx)
    throw new Error("useAuth muss innerhalb von <AuthProvider> verwendet werden.");
  return ctx;
}

function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("rate limit"))
    return "Zu viele Versuche. Bitte gleich erneut probieren.";
  if (m.includes("invalid")) return "Code oder E-Mail nicht gültig.";
  if (m.includes("expired")) return "Code ist abgelaufen. Bitte neuen anfordern.";
  if (m.includes("network") || m.includes("failed to fetch"))
    return "Verbindung fehlgeschlagen. Bitte Internetverbindung prüfen.";
  return message || "Anmeldung fehlgeschlagen.";
}
