"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ReportWizardLayout } from "@/components/report-wizard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";

const STEPS = [
  { number: 1, title: "Report Name", description: "Name your report" },
  { number: 2, title: "Upload Documents", description: "Add financial docs" },
  { number: 3, title: "Review Classification", description: "Verify data" },
];

interface Report {
  id: string;
  name: string;
  current_step: number;
  created_at: string;
}

interface UploadedFile {
  name: string;
  size: number;
}

export default function ReviewClassificationPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = use(params);
  const [report, setReport] = useState<Report | null>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load report details
        const reportResponse = await fetch(`/api/reports/${reportId}`);
        if (!reportResponse.ok) {
          throw new Error("Report not found");
        }
        const reportData = await reportResponse.json();
        setReport(reportData.report);

        // Load uploaded files
        const filesResponse = await fetch(`/api/reports/${reportId}/upload`);
        if (filesResponse.ok) {
          const filesData = await filesResponse.json();
          setFiles(
            filesData.files.map((f: { name: string; metadata?: { size?: number } }) => ({
              name: f.name,
              size: f.metadata?.size || 0,
            }))
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [reportId]);

  const handleComplete = async () => {
    // In the future, this will trigger classification processing
    // For now, just redirect to home or a success page
    try {
      await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_step: 3 }),
      });
      router.push("/");
    } catch (err) {
      setError("Failed to complete");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || "Report not found"}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/")}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-start justify-center py-12">
        <ReportWizardLayout currentStep={3} steps={STEPS}>
          <Card>
            <CardHeader>
              <CardTitle>Review Classification</CardTitle>
              <CardDescription>
                Review your report details before processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Summary */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Report Name
                  </h3>
                  <p className="text-lg font-semibold">{report.name}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Uploaded Documents ({files.length})
                  </h3>
                  <div className="space-y-2">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 border rounded-lg"
                      >
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Classification and analysis features will be available in the
                    next update. For now, your documents have been securely
                    uploaded and saved.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/reports/${reportId}/upload`)}
                >
                  Back to Upload
                </Button>
                <Button onClick={handleComplete}>Complete</Button>
              </div>
            </CardContent>
          </Card>
        </ReportWizardLayout>
    </div>
  );
}
