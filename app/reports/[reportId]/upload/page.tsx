"use client";

import { ReportFilesList } from "@/components/report-files-list";
import { ReportWizardLayout } from "@/components/report-wizard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

const STEPS = [
  { number: 1, title: "Report Name", description: "Name your report" },
  { number: 2, title: "Upload Documents", description: "Add financial docs" },
  { number: 3, title: "Review Classification", description: "Verify data" },
];

const RECOMMENDED_DOCS = [
  "3 years audited financial statements (income, balance sheet, cash flows)",
  "General ledger or trial balance detail",
  "Revenue recognition policies/contracts",
  "Non-GAAP reconciliations",
  "Management notes on one-time items",
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  documentType?: string;
}

export default function UploadDocumentsPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = use(params);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUploadedFiles = useCallback(async () => {
    const filesResponse = await fetch(`/api/reports/${reportId}/upload`);

    if (!filesResponse.ok) {
      const data = await filesResponse.json().catch(() => ({}));
      throw new Error(data.error || "Failed to load document list");
    }

    const data = await filesResponse.json();
    setUploadedFiles(
      data.files.map(
        (f: {
          id: string;
          original_filename: string;
          document_type?: string;
          metadata?: { size?: number | null };
          created_at: string;
        }) => ({
          id: f.id,
          name: f.original_filename,
          size: f.metadata?.size ?? 0,
          uploadedAt: f.created_at,
          documentType: f.document_type ?? "other",
        })
      )
    );
  }, [reportId]);

  useEffect(() => {
    // Fetch existing files and verify report
    const loadData = async () => {
      try {
        // Verify report exists
        const reportResponse = await fetch(`/api/reports/${reportId}`);
        if (!reportResponse.ok) {
          throw new Error("Report not found");
        }

        await fetchUploadedFiles();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [reportId, fetchUploadedFiles]);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError("");
    setIsUploading(true);

    try {
      let uploadedAny = false;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`/api/reports/${reportId}/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to upload file");
        }

        uploadedAny = true;
      }

      if (uploadedAny) {
        await fetchUploadedFiles();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDeleteFile: any = async (file: UploadedFile) => {
    setError("");

    const response = await fetch(`/api/reports/${reportId}/upload`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId: file.id }),
    });
    const data = await response.json();

    if (!response.ok) {
      const message = data.error || "Failed to delete file";
      setError(message);
      throw new Error(message);
    }

    setUploadedFiles((prev) => prev.filter((existing) => existing.id !== file.id));
  };

  const handleContinue = async () => {
    // Update report step and navigate to review
    try {
      await fetch(`/api/reports/${reportId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current_step: 3 }),
      });
      router.push(`/reports/${reportId}/review`);
    } catch (err) {
      console.error("Failed to update report step:", err);
      setError("Failed to continue");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-start justify-center py-12">
      <ReportWizardLayout currentStep={2} steps={STEPS}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload your financial documents to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recommended Documents */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Recommended Documents:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {RECOMMENDED_DOCS.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              </div>

              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                  }`}
              >
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports PDF, Excel, CSV, and common document formats
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                  disabled={isUploading}
                />
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUploading}
                    asChild
                  >
                    <span className="cursor-pointer">
                      {isUploading ? "Uploading..." : "Select Files"}
                    </span>
                  </Button>
                </label>
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Uploaded Files ({uploadedFiles.length})
                  </h3>
                  <ReportFilesList
                    files={uploadedFiles}
                    onDeleteFile={handleDeleteFile}
                    disabled={isUploading}
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleContinue}
                  disabled={uploadedFiles.length === 0}
                >
                  Continue to Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ReportWizardLayout>
    </div>
  );
}
