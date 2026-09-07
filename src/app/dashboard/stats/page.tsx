import { BarChart3 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function StatsPage() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">My Stats</h1>
      <EmptyState
        icon={BarChart3}
        title="Stats are coming soon"
        description="Turnaround time, revision rate, and throughput per editor will live here."
      />
    </div>
  );
}
