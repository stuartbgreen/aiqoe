import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHero } from "@/components/landing/landing-hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <LandingHeader />
      <LandingHero />
      {/* <AboutSection />
      <DemoSection /> */}
      <LandingFooter />
    </main>
  );
}