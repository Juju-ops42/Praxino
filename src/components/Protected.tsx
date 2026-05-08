import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface ProtectedProps {
  children: ReactNode;
  /**
   * Wenn true: redirect zu /onboarding falls signed-in aber noch nicht onboarded.
   * Default true. Onboarding-Page selbst setzt es auf false, damit kein Loop entsteht.
   */
  requireOnboarded?: boolean;
}

export function Protected({ children, requireOnboarded = true }: ProtectedProps) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === "loading" || auth.profileLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface-50 text-ink-500">
        <Loader2 className="size-5 animate-spin" aria-hidden />
      </div>
    );
  }

  if (auth.status === "signed-out") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  // unconfigured = Demo-Modus → durchlassen, kein Onboarding-Check
  if (auth.status === "unconfigured") {
    return <>{children}</>;
  }

  // signed-in: prüfen, ob bereits onboarded
  if (requireOnboarded && !auth.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}
