"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="w-full border-b border-border/30 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-garamond font-semibold tracking-tight hover:opacity-80 transition-opacity">
          Arvus
        </Link>

        <Button asChild variant="default" className="px-6">
          <Link href="#demo">Schedule Demo</Link>
        </Button>
      </nav>
    </header>
  );
}
