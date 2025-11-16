import Link from "next/link";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/30 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-garamond font-semibold tracking-tight hover:opacity-80 transition-opacity">
              Arvus
            </Link>
            <p className="text-sm text-muted-foreground">
              AI for Financial Due Diligence
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#demo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Schedule Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#private-equity" className="text-muted-foreground hover:text-foreground transition-colors">
                  Private Equity
                </Link>
              </li>
              <li>
                <Link href="#transaction-advisory" className="text-muted-foreground hover:text-foreground transition-colors">
                  Transaction Advisory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Arvus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}