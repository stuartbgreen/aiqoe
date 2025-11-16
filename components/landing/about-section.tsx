export function AboutSection() {
  return (
    <section id="learn-more" className="w-full py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="font-garamond text-3xl md:text-5xl font-semibold tracking-tight">
            Built for Private Equity
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Arvus brings intelligent automation to financial due diligence,
            helping private equity and transaction advisory firms move faster
            with greater confidence. Our platform is designed to scale expertise
            across your entire organization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-5 p-6 rounded-xl bg-card/30 border border-border/30 hover:border-border/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="font-garamond text-xl font-semibold">Accelerate Due Diligence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Reduce weeks of manual work to days with AI-powered document analysis
              and data extraction.
            </p>
          </div>

          <div className="space-y-5 p-6 rounded-xl bg-card/30 border border-border/30 hover:border-border/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-garamond text-xl font-semibold">Enterprise-Grade Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              Your data stays secure with enterprise-level encryption and compliance standards.
            </p>
          </div>

          <div className="space-y-5 p-6 rounded-xl bg-card/30 border border-border/30 hover:border-border/50 transition-colors">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="font-garamond text-xl font-semibold">Tailored to Your Process</h3>
            <p className="text-muted-foreground leading-relaxed">
              Custom automation built specifically for your firm's unique due diligence workflow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
