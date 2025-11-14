import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
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
    // Verify the report belongs to the user
    const { data: report, error: reportError } = await supabase
      .from("reports")
      .select("id")
      .eq("id", reportId)
      .eq("user_id", user.id)
      .single();

    if (reportError || !report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create a unique file path: userId/reportId/input/filename
    const filePath = `${user.id}/${reportId}/input/${file.name}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("report-documents")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    const metadata = {
      size: file.size,
      mime_type: file.type || null,
      last_modified: file.lastModified ?? null,
    };

    const { data: document, error: documentError } = await supabase
      .from("report_documents")
      .insert({
        report_id: reportId,
        storage_path: uploadData.path,
        original_filename: file.name,
        document_type: file.type || "application/octet-stream",
        metadata,
      })
      .select()
      .single();

    if (documentError || !document) {
      console.error("Error recording document:", documentError);
      await supabase.storage.from("report-documents").remove([filePath]);
      return NextResponse.json(
        { error: "Failed to record uploaded document" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        document,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(
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
    // Verify the report belongs to the user
    const { data: report, error: reportError } = await supabase
      .from("reports")
      .select("id")
      .eq("id", reportId)
      .eq("user_id", user.id)
      .single();

    if (reportError || !report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const { data: documents, error: documentsError } = await supabase
      .from("report_documents")
      .select("id, storage_path, original_filename, document_type, metadata, created_at")
      .eq("report_id", reportId)
      .order("created_at", { ascending: true });

    if (documentsError) {
      console.error("Error fetching report documents:", documentsError);
      return NextResponse.json(
        { error: "Failed to list files" },
        { status: 500 }
      );
    }

    return NextResponse.json({ files: documents || [] }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const supabase = await createClient();
  const { reportId } = await params;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const adminSupabase = createAdminClient();
    const body = await request.json();
    const { documentId } = body;

    if (!documentId || typeof documentId !== "string") {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const { data: report, error: reportError } = await supabase
      .from("reports")
      .select("id")
      .eq("id", reportId)
      .eq("user_id", user.id)
      .single();

    if (reportError || !report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const { data: document, error: documentError } = await adminSupabase
      .from("report_documents")
      .select("*")
      .eq("id", documentId)
      .eq("report_id", reportId)
      .single();

    if (documentError || !document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const { error: deleteError } = await adminSupabase
      .from("report_documents")
      .delete()
      .eq("id", documentId)
      .eq("report_id", reportId);

    if (deleteError) {
      console.error("Error deleting document record:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete document" },
        { status: 500 }
      );
    }

    if (document.storage_path) {
      const { error: storageError } = await adminSupabase.storage
        .from("report-documents")
        .remove([document.storage_path]);

      if (storageError) {
        console.error("Error deleting file from storage:", storageError);

        const { error: rollbackError } = await adminSupabase
          .from("report_documents")
          .insert({
            ...document,
            id: document.id,
          });

        if (rollbackError) {
          console.error(
            "Failed to restore document after storage delete failure:",
            rollbackError
          );
        }

        return NextResponse.json(
          { error: "Failed to delete file from storage" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
