"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, Trash2 } from "lucide-react";

export interface ReportFileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt?: string;
}

interface ReportFilesListProps {
  files: ReportFileItem[];
  onDeleteFile?: (file: ReportFileItem) => Promise<void>;
  disabled?: boolean;
  emptyMessage?: string;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

export function ReportFilesList({
  files,
  onDeleteFile,
  disabled,
  emptyMessage,
}: ReportFilesListProps) {
  const [selectedFile, setSelectedFile] = useState<ReportFileItem | null>(null);
  const [dialogError, setDialogError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (file: ReportFileItem) => {
    setDialogError("");
    setSelectedFile(file);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFile || !onDeleteFile) {
      return;
    }

    setIsDeleting(true);
    setDialogError("");
    try {
      await onDeleteFile(selectedFile);
      setIsDialogOpen(false);
      setSelectedFile(null);
    } catch (error) {
      setDialogError(
        error instanceof Error ? error.message : "Failed to delete file"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    if (isDeleting) return;
    setIsDialogOpen(open);
    if (!open) {
      setSelectedFile(null);
      setDialogError("");
    }
  };

  if (!files.length) {
    return emptyMessage ? (
      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
    ) : null;
  }

  return (
    <>
      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between rounded-lg border p-3"
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
            {onDeleteFile && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => handleDeleteClick(file)}
                disabled={
                  disabled ||
                  (isDeleting && selectedFile && selectedFile.id === file.id)
                }
                aria-label={`Delete ${file.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      {onDeleteFile && (
        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete File</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete &ldquo;{selectedFile?.name}&rdquo;? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {dialogError && (
              <p className="text-sm text-destructive">{dialogError}</p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogChange(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
