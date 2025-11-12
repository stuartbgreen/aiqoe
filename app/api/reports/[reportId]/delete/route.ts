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
    // First, delete all files from storage for this report
    const folderPath = `${user.id}/${reportId}`;

    // List all files in the report folder
    const { data: files } = await supabase.storage
      .from("report-documents")
      .list(folderPath, {
        limit: 1000,
        offset: 0,
      });

    // Delete all files if any exist
    if (files && files.length > 0) {
      const filePaths = files.map((file) => `${folderPath}/${file.name}`);
      await supabase.storage
        .from("report-documents")
        .remove(filePaths);
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
