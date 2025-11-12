import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col gap-6 items-center text-center py-16">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
        welcome to aiqoe
      </p>
      <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
        welcome to aiqoe
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        your ai due diligence copilot
      </p>
      <div className="mt-4">
        <Button asChild size="lg">
          <Link href="/reports/new">
            <Plus className="mr-2 h-5 w-5" />
            New Report
          </Link>
        </Button>
      </div>
    </div>
  );
}
