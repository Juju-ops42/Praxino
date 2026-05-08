import { Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ImprintPage } from "@/pages/ImprintPage";
import { AppHomePage } from "@/pages/AppHomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Protected } from "@/components/Protected";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
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
  );
}
