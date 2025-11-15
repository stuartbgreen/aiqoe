"use server";

import { classifyDocs } from "@/workflows/classify-docs";
import { start } from "workflow/api";

export async function startClassificationAction() {
  const run = await start(classifyDocs);

  // Return the readable stream to the client
  return new Response(run.readable, {
    headers: { "Content-Type": "text/plain" },
  })
}
