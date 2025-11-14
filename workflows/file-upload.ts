import { createAdminClient } from "@/lib/supabase/admin";

type FileUploadWorkflowInput = {
  reportId: string;
  storagePath: string;
  originalFilename: string;
  documentType: string;
  metadata: Record<string, unknown>;
};

type ReportDocumentRecord = {
  id: string;
  report_id: string;
  storage_path: string;
  original_filename: string;
  document_type: string;
  metadata: Record<string, unknown> | null;
  created_at?: string;
};

export async function handleFileUpload(payload: FileUploadWorkflowInput) {
  "use workflow";

  console.log("Handling file upload workflow for report:", payload.reportId);

  const document = await createReportDocument(payload);
  const updatedDocument = await updateDocumentMetadata(
    document.id,
    payload.metadata,
  );

  return { document: updatedDocument };
}

async function createReportDocument(payload: FileUploadWorkflowInput) {
  "use step";

  console.log("Creating report document record in database");

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("report_documents")
    .insert({
      report_id: payload.reportId,
      storage_path: payload.storagePath,
      original_filename: payload.originalFilename,
      document_type: payload.documentType,
      metadata: payload.metadata,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(
      error?.message ?? "Failed to create report document record",
    );
  }

  return data as ReportDocumentRecord;
}

async function updateDocumentMetadata(
  documentId: string,
  baseMetadata: Record<string, unknown>,
) {
  "use step";

  const supabase = createAdminClient();
  const metadata = {
    ...baseMetadata,
    type: "Excel",
    summary: "hello world",
  };

  const { data, error } = await supabase
    .from("report_documents")
    .update({
      metadata,
    })
    .eq("id", documentId)
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update metadata");
  }

  return data as ReportDocumentRecord;
}
