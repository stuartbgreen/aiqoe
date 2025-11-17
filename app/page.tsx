import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingTrustBadges } from "@/components/landing/landing-trust-badges";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <LandingHeader />
      <LandingHero />
      {/* <AboutSection />
      <DemoSection /> */}
      <LandingTrustBadges />
      {/* <LandingCTA /> */}
      <LandingFooter />
    </main>
  );
}