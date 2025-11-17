import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingCTA() {
  return (
    <section className="w-full border-t border-border/30">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center text-center space-y-8 max-w-xl mx-auto">
          <h2 className="font-garamond text-4xl md:text-5xl">
            See what Arvus can do with your deal data
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Schedule a demo to learn how Arvus reduces manual data and reporting work for your team.
          </p>
          <Button asChild size="lg" className="h-12">
            <Link href="https://calendly.com/arvusai/30min" target="_blank" rel="noopener noreferrer">
              Schedule demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
