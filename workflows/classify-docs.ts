/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAdminClient } from "@/lib/supabase/admin";


type ReportDocumentRecord = {
  id: string;
  report_id: string;
  storage_path: string;
  original_filename: string;
  document_type: string;
  metadata: Record<string, unknown> | null;
  created_at?: string;
};

export async function classifyDocs() {
 "use workflow"; 

 console.log("Classifying docs");

 const docs = await fetchDocs();

 for (const doc of docs) {
   console.log(`Document ${doc.original_filename} classified as test`);
 }
}

async function fetchDocs() {
  "use step"; 

  console.log(`Fetching documents to classify`);

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("report_documents").select("*");

  if (error || !data) {
    throw new Error(
      error?.message ?? "Failed to fetch documents",
    );
  }

  return data as ReportDocumentRecord[];
}