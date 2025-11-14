"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LucideIcon } from "lucide-react";
import {
  File,
  FileArchive,
  FileAudio2,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Presentation,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export interface ReportFileItem {
  id: string;
  name: string;
  size: number;
  uploadedAt?: string;
  documentType?: string;
}

interface ReportFilesListProps {
  files: ReportFileItem[];
  onDeleteFile?: (file: ReportFileItem) => Promise<void>;
  disabled?: boolean;
  emptyMessage?: string;
}

type IconConfig = {
  icon: LucideIcon;
  label: string;
  className: string;
};

const DEFAULT_ICON: IconConfig = {
  icon: File,
  label: "Document",
  className: "text-muted-foreground",
};

const FILE_TYPE_ICONS: Record<string, IconConfig> = {
  pdf: { icon: FileText, label: "PDF", className: "text-red-600" },
  word: { icon: FileText, label: "Word", className: "text-sky-600" },
  text: { icon: FileText, label: "Text", className: "text-muted-foreground" },
  excel: {
    icon: FileSpreadsheet,
    label: "Excel",
    className: "text-emerald-600",
  },
  csv: {
    icon: FileSpreadsheet,
    label: "Spreadsheet",
    className: "text-emerald-600",
  },
  powerpoint: {
    icon: Presentation,
    label: "Presentation",
    className: "text-orange-500",
  },
  image: { icon: FileImage, label: "Image", className: "text-amber-500" },
  audio: { icon: FileAudio2, label: "Audio", className: "text-purple-500" },
  video: { icon: FileVideo, label: "Video", className: "text-indigo-500" },
  archive: { icon: FileArchive, label: "Archive", className: "text-orange-600" },
  code: { icon: FileCode, label: "Code", className: "text-blue-500" },
};

const getIconConfig = (type?: string) => {
  if (!type) return DEFAULT_ICON;
  const normalized = type.toLowerCase();
  return FILE_TYPE_ICONS[normalized] ?? DEFAULT_ICON;
};

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
        {files.map((file) => {
          const iconConfig = getIconConfig(file.documentType);
          const IconComponent = iconConfig.icon;

          return (
            <div
              key={file.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <IconComponent
                  className={`h-5 w-5 ${iconConfig.className}`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {iconConfig.label} • {formatFileSize(file.size)}
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
                    (isDeleting && selectedFile && selectedFile.id === file.id) || undefined
                  }
                  aria-label={`Delete ${file.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
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
