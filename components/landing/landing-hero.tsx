"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingHero() {
  return (
    <section className="w-full py-32 md:py-40 lg:py-52 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-8 max-w-3xl">
            <h1 className="font-garamond text-5xl md:text-6xl lg:text-7xl">
              AI-powered due diligence for M&A teams
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Arvus helps private equity and transaction advisory firms automate repetitive data cleanup and reporting tasks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button asChild size="lg" className="h-12">
              <Link href="#demo">Schedule demo</Link>
            </Button>
            {/* <Button asChild size="lg" variant="outline" className="h-12">
              <Link href="#learn-more">Learn More</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
}