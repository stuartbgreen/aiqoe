"use client";

import { ReportFilesList } from "@/components/report-files-list";
import { ReportWizardLayout } from "@/components/report-wizard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { startClassificationAction } from "./actions";

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
  id: string;
  name: string;
  size: number;
  uploadedAt?: string;
  documentType?: string;
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
  const [filesError, setFilesError] = useState("");
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
            filesData.files.map(
              (f: {
                id: string;
                original_filename: string;
                document_type?: string;
                metadata?: { size?: number | null };
                created_at?: string;
              }) => ({
                id: f.id,
                name: f.original_filename,
                size: f.metadata?.size ?? 0,
                uploadedAt: f.created_at,
                documentType: f.document_type ?? "other",
              })
            )
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
    try {
      await startClassificationAction();
    } catch (err) {
      console.error("Failed to start classification:", err);
      setError("Failed to start classification");
    }
  };

  const handleFileDelete = async (file: UploadedFile) => {
    setFilesError("");

    const response = await fetch(`/api/reports/${reportId}/upload`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: file.id }),
    });
    const data = await response.json();

    if (!response.ok) {
      const message = data.error || "Failed to delete file";
      setFilesError(message);
      throw new Error(message);
    }

    setFiles((prev) => prev.filter((existing) => existing.id !== file.id));
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
                <ReportFilesList
                  files={files}
                  onDeleteFile={files.length ? handleFileDelete : undefined}
                  emptyMessage="No documents uploaded yet."
                />
                {filesError && (
                  <p className="mt-2 text-sm text-destructive">{filesError}</p>
                )}
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
              <Button onClick={handleComplete}>Start classify workflow</Button>
            </div>
          </CardContent>
        </Card>
      </ReportWizardLayout>
    </div>
  );
}
