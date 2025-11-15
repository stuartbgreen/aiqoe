/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { createAdminClient } from "@/lib/supabase/admin";
import { getWritable } from 'workflow';

type ReportDocumentRecord = {
  id: string;
  report_id: string;
  storage_path: string;
  original_filename: string;
  document_type: string;
  metadata: Record<string, unknown> | null;
  created_at?: string;
};


async function writeProgress(message: string) {
  "use step";
  // Steps can write to the run's default stream
  const writable = getWritable<string>(); 
  const writer = writable.getWriter();
  await writer.write(message);
  writer.releaseLock();
}

export async function classifyDocs() {
 "use workflow"; 

 console.log("Classifying docs");

//  const docs = await fetchDocs();

//  for (const doc of docs) {
//    console.log(`Document ${doc.original_filename} classified as test`);
//  }

  await writeProgress("Starting task...");
  await writeProgress("Processing data...");
  await writeProgress("Task complete!");
  await closeStreams();
}

async function closeStreams() {
  "use step";
  await getWritable<string>().close();
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