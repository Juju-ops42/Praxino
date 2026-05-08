import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { LandingPage } from "@/pages/LandingPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ImprintPage } from "@/pages/ImprintPage";
import { TeamPage } from "@/pages/TeamPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Protected } from "@/components/Protected";

// Lazy-load schwere Routes (App-Workspace, Login). Hält den initial Bundle klein.
const AppHomePage = lazy(() =>
  import("@/pages/AppHomePage").then((m) => ({ default: m.AppHomePage })),
);
const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface-50 text-ink-500">
      <Loader2 className="size-5 animate-spin" aria-hidden />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/imprint" element={<ImprintPage />} />
        <Route
          path="/app"
          element={
            <Protected>
              <AppHomePage />
            </Protected>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
