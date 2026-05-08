import { Route, Routes } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ImprintPage } from "@/pages/ImprintPage";
import { AppPlaceholderPage } from "@/pages/AppPlaceholderPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/imprint" element={<ImprintPage />} />
      <Route path="/app" element={<AppPlaceholderPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
