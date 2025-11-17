"use client";

import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="w-full border-b border-border/30 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <nav className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        {/* Logo - Left */}
        <Link href="/" className="text-4xl font-garamond font-semibold">
          Arvus
        </Link>

        {/* Menu Links - Center */}
        {/* <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-8">
          <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Platform
          </Link>
          <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Solutions
          </Link>
          <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Security
          </Link>
        </div> */}

        {/* Login - Right */}
        <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          Login
        </Link>
      </nav>
    </header>
  );
}
