"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReportWizardLayout } from "@/components/report-wizard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const STEPS = [
  { number: 1, title: "Report Name", description: "Name your report" },
  { number: 2, title: "Upload Documents", description: "Add financial docs" },
  { number: 3, title: "Review Classification", description: "Verify data" },
];

export default function NewReportPage() {
  const [reportName, setReportName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!reportName.trim()) {
      setError("Please enter a report name");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: reportName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create report");
      }

      // Navigate to step 2 (upload documents)
      router.push(`/reports/${data.report.id}/upload`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-start justify-center py-12">
      <ReportWizardLayout currentStep={1} steps={STEPS}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Report</CardTitle>
            <CardDescription>
              Give your report a descriptive name to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  type="text"
                  placeholder="e.g., Q4 2024 Financial Review"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Continue"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </ReportWizardLayout>
    </div>
  );
}
