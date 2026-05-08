import { useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection";
import { WhyNowSection } from "@/components/landing/WhyNowSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { PricingSection } from "@/components/landing/PricingSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";

export function LandingPage() {
  useEffect(() => {
    document.title = "Praxino — Die Praxis-KI für Heilmittel";
  }, []);

  return (
    <PageShell>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductPreviewSection />
      <WhyNowSection />
      <PrivacySection />
      <PricingSection />
      <WaitlistSection />
    </PageShell>
  );
}
