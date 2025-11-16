import { AppLayout } from "@/components/app-layout";
import { Hero } from "@/components/hero";
import { ReportsList } from "@/components/reports-list";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch reports if user is authenticated
  let reports = [];
  if (user) {
    const { data } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    reports = data || [];
  }

  return (
    <AppLayout>
      <div className="flex flex-col max-w-5xl p-5 w-full mx-auto">
        <Hero />

        {user && (
          <div className="space-y-6 mt-12">
            <h2 className="text-2xl font-semibold">Your Reports</h2>
            <ReportsList reports={reports} />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
