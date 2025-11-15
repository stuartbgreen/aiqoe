"use server";

import { classifyDocs } from "@/workflows/classify-docs";
import { start } from "workflow/api";

export async function startClassificationAction() {
  await start(classifyDocs);
}
