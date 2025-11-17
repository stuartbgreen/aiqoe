import { Database, Lock, Shield } from "lucide-react";

export function LandingTrustBadges() {
  return (
    <section className="w-full border-t border-border/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-8 text-center md:text-left">
          Enterprise-grade data security
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">SOC 2 Type II certified</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Independent attestation of our security controls.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5">
              <Database className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">No training on your data</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your deal data is never used to train shared AI models.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/5">
              <Lock className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-sm">Encrypted end to end</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All data encrypted in transit and at rest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
