import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function Protected({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === "loading") {
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

  // unconfigured oder signed-in: durchlassen (unconfigured = Demo-Modus)
  return <>{children}</>;
}
