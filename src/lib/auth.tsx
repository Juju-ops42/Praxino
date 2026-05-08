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

type AuthStatus = "loading" | "signed-in" | "signed-out" | "unconfigured";

interface AuthState {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
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
}

const AuthContext = createContext<AuthContextValue | null>(null);

const initial: AuthState = {
  status: isSupabaseConfigured ? "loading" : "unconfigured",
  user: null,
  session: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initial);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setState({
        status: data.session ? "signed-in" : "signed-out",
        user: data.session?.user ?? null,
        session: data.session,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState({
        status: session ? "signed-in" : "signed-out",
        user: session?.user ?? null,
        session,
      });
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithEmail = useCallback<AuthContextValue["signInWithEmail"]>(
    async (email, options) => {
      if (!supabase) {
        return {
          ok: false,
          errorMessage: "Auth ist nicht konfiguriert (VITE_SUPABASE_URL / ANON_KEY fehlen).",
        };
      }
      const redirectTo =
        options?.redirectTo ??
        `${window.location.origin}/app`;
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

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, signInWithEmail, verifyEmailOtp, signOut }),
    [state, signInWithEmail, verifyEmailOtp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth muss innerhalb von <AuthProvider> verwendet werden.");
  return ctx;
}

function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("rate limit")) return "Zu viele Versuche. Bitte gleich erneut probieren.";
  if (m.includes("invalid")) return "Code oder E-Mail nicht gültig.";
  if (m.includes("expired")) return "Code ist abgelaufen. Bitte neuen anfordern.";
  if (m.includes("network") || m.includes("failed to fetch"))
    return "Verbindung fehlgeschlagen. Bitte Internetverbindung prüfen.";
  return message || "Anmeldung fehlgeschlagen.";
}
