import { useEffect } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { ProductPreviewSection } from "@/components/landing/ProductPreviewSection";
import { WhyNowSection } from "@/components/landing/WhyNowSection";
import { PrivacySection } from "@/components/landing/PrivacySection";
import { PricingSection } from "@/components/landing/PricingSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { StoryTeaserSection } from "@/components/landing/StoryTeaserSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";

export function LandingPage() {
  useEffect(() => {
    document.title = "Praxino — Die Praxis-KI für Heilmittel";
  }, []);

  return (
    <PageShell>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <SolutionSection />
      <ProductPreviewSection />
      <WhyNowSection />
      <PrivacySection />
      <RoadmapSection />
      <PricingSection />
      <FaqSection />
      <StoryTeaserSection />
      <WaitlistSection />
    </PageShell>
  );
}
