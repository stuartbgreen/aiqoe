import { classifyDocs } from "@/workflows/classify-docs";
import { start } from "workflow/api";

export async function GET() {
  const run = await start(classifyDocs);

  return Response.json({
    message: 'Workflow started',
    runId: run.runId
  });
}
