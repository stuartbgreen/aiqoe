"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ReportWizardLayoutProps {
  currentStep: number;
  steps: Step[];
  children: React.ReactNode;
}

export function ReportWizardLayout({
  currentStep,
  steps,
  children,
}: ReportWizardLayoutProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      {/* Step Indicators */}
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between mb-12">
          {steps.map((step, stepIdx) => (
            <li
              key={step.number}
              className={cn(
                "relative flex-1",
                stepIdx !== steps.length - 1 && "pr-8 sm:pr-20"
              )}
            >
              {/* Connector Line */}
              {stepIdx !== steps.length - 1 && (
                <div
                  className="absolute top-4 left-0 -ml-px mt-0.5 h-0.5 w-full"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-full w-full",
                      step.number < currentStep
                        ? "bg-primary"
                        : "bg-muted-foreground/20"
                    )}
                  />
                </div>
              )}

              {/* Step Circle */}
              <div className="group relative flex flex-col items-center">
                <span className="flex h-9 items-center">
                  <span
                    className={cn(
                      "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold",
                      step.number < currentStep &&
                        "border-primary bg-primary text-primary-foreground",
                      step.number === currentStep &&
                        "border-primary bg-background text-primary",
                      step.number > currentStep &&
                        "border-muted-foreground/20 bg-background text-muted-foreground"
                    )}
                  >
                    {step.number < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </span>
                </span>
                <span className="mt-2 text-center">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      step.number === currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </span>
                  <span
                    className={cn(
                      "hidden sm:block text-xs mt-1",
                      step.number === currentStep
                        ? "text-muted-foreground"
                        : "text-muted-foreground/60"
                    )}
                  >
                    {step.description}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Content Area */}
      <div className="mt-8">{children}</div>
    </div>
  );
}
