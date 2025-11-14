import { createAdminClient } from "@/lib/supabase/admin";

type FileUploadWorkflowInput = {
  reportId: string;
  storagePath: string;
  originalFilename: string;
  documentType: string;
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

  await createReportDocument(payload);
}

async function createReportDocument(payload: FileUploadWorkflowInput) {
  "use step";

  console.log("Creating report document record in database");

  const normalizedDocumentType = normalizeDocumentType(
    payload.documentType,
    payload.originalFilename,
  );

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("report_documents")
    .insert({
      report_id: payload.reportId,
      storage_path: payload.storagePath,
      original_filename: payload.originalFilename,
      document_type: normalizedDocumentType
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

const MIME_TYPE_TO_CATEGORY: Record<string, string> = {
  "application/pdf": "pdf",
  "application/msword": "word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "word",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template":
    "word",
  "application/vnd.ms-word.document.macroenabled.12": "word",
  "application/vnd.ms-word.template.macroenabled.12": "word",
  "application/rtf": "word",
  "application/vnd.oasis.opendocument.text": "word",
  "application/vnd.apple.pages": "word",
  "application/vnd.ms-excel": "excel",
  "application/vnd.ms-excel.sheet.macroenabled.12": "excel",
  "application/vnd.ms-excel.template.macroenabled.12": "excel",
  "application/vnd.ms-excel.addin.macroenabled.12": "excel",
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": "excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template":
    "excel",
  "application/vnd.oasis.opendocument.spreadsheet": "excel",
  "application/vnd.apple.numbers": "excel",
  "text/csv": "csv",
  "text/tab-separated-values": "csv",
  "application/vnd.ms-powerpoint": "powerpoint",
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": "powerpoint",
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": "powerpoint",
  "application/vnd.ms-powerpoint.template.macroenabled.12": "powerpoint",
  "application/vnd.ms-powerpoint.addin.macroenabled.12": "powerpoint",
  "application/vnd.ms-powerpoint.slide.macroenabled.12": "powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    "powerpoint",
  "application/vnd.oasis.opendocument.presentation": "powerpoint",
  "application/vnd.apple.keynote": "powerpoint",
  "text/plain": "text",
  "text/markdown": "text",
  "application/json": "code",
  "application/javascript": "code",
  "text/javascript": "code",
  "application/xml": "code",
  "text/xml": "code",
  "text/html": "code",
  "text/css": "code",
  "application/zip": "archive",
  "application/x-zip-compressed": "archive",
  "application/x-7z-compressed": "archive",
  "application/x-rar-compressed": "archive",
  "application/vnd.rar": "archive",
  "application/x-tar": "archive",
  "application/gzip": "archive",
  "application/x-bzip2": "archive",
};

const EXTENSION_TO_CATEGORY: Record<string, string> = {
  pdf: "pdf",
  doc: "word",
  docx: "word",
  dotx: "word",
  rtf: "word",
  odt: "word",
  pages: "word",
  txt: "text",
  md: "text",
  markdown: "text",
  csv: "csv",
  tsv: "csv",
  xls: "excel",
  xlsx: "excel",
  xlsm: "excel",
  xlsb: "excel",
  xltx: "excel",
  xltm: "excel",
  xlam: "excel",
  numbers: "excel",
  ods: "excel",
  ppt: "powerpoint",
  pptx: "powerpoint",
  pptm: "powerpoint",
  pps: "powerpoint",
  ppsx: "powerpoint",
  pot: "powerpoint",
  potx: "powerpoint",
  potm: "powerpoint",
  odp: "powerpoint",
  sldx: "powerpoint",
  sldm: "powerpoint",
  key: "powerpoint",
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  svg: "image",
  heic: "image",
  heif: "image",
  webp: "image",
  bmp: "image",
  tiff: "image",
  tif: "image",
  psd: "image",
  ai: "image",
  eps: "image",
  json: "code",
  xml: "code",
  html: "code",
  js: "code",
  ts: "code",
  jsx: "code",
  tsx: "code",
  css: "code",
  zip: "archive",
  rar: "archive",
  "7z": "archive",
  tar: "archive",
  gz: "archive",
  tgz: "archive",
  bz2: "archive",
  zipx: "archive",
};

function normalizeDocumentType(
  documentType: string,
  originalFilename?: string,
) {
  const fallback = "other";
  const normalizedMime = documentType?.toLowerCase().trim();

  if (normalizedMime) {
    if (MIME_TYPE_TO_CATEGORY[normalizedMime]) {
      return MIME_TYPE_TO_CATEGORY[normalizedMime];
    }

    if (normalizedMime.startsWith("image/")) {
      return "image";
    }

    if (normalizedMime.startsWith("text/") && normalizedMime !== "text/csv") {
      return "text";
    }

    if (normalizedMime.startsWith("audio/")) {
      return "audio";
    }

    if (normalizedMime.startsWith("video/")) {
      return "video";
    }
  }

  const extension =
    originalFilename?.split(".").pop()?.toLowerCase().trim() ?? "";

  if (extension && EXTENSION_TO_CATEGORY[extension]) {
    return EXTENSION_TO_CATEGORY[extension];
  }

  return fallback;
}
