import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const supabase = await createClient();
  const { reportId } = await params;

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all document records so we can clean up storage
    const { data: documents, error: documentsError } = await supabase
      .from("report_documents")
      .select("storage_path")
      .eq("report_id", reportId);

    if (documentsError) {
      console.error("Error fetching report documents:", documentsError);
      return NextResponse.json(
        { error: "Failed to delete report files" },
        { status: 500 }
      );
    }

    const storagePaths = documents?.map((doc) => doc.storage_path) ?? [];

    if (storagePaths.length) {
      await supabase.storage.from("report-documents").remove(storagePaths);
    }

    // Delete the report from the database (RLS will ensure user owns it)
    const { error: deleteError } = await supabase
      .from("reports")
      .delete()
      .eq("id", reportId)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Error deleting report:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete report" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Report deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
