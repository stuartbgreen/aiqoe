"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ReportWizardLayout } from "@/components/report-wizard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle2, Loader2 } from "lucide-react";

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
  name: string;
  size: number;
  uploadedAt: string;
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

  useEffect(() => {
    // Fetch existing files and verify report
    const loadData = async () => {
      try {
        // Verify report exists
        const reportResponse = await fetch(`/api/reports/${reportId}`);
        if (!reportResponse.ok) {
          throw new Error("Report not found");
        }

        // Load existing files
        const filesResponse = await fetch(`/api/reports/${reportId}/upload`);
        if (filesResponse.ok) {
          const data = await filesResponse.json();
          setUploadedFiles(
            data.files.map((f: { name: string; metadata?: { size?: number }; created_at: string }) => ({
              name: f.name,
              size: f.metadata?.size || 0,
              uploadedAt: f.created_at,
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

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError("");
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`/api/reports/${reportId}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to upload file");
        }

        setUploadedFiles((prev) => [
          ...prev,
          {
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString(),
          },
        ]);
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
      setError("Failed to continue");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
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
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
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
                    <div className="space-y-2">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
