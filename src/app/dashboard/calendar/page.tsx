import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CalendarPage() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Calendar</h1>
      <EmptyState
        icon={Calendar}
        title="Calendar is coming soon"
        description="Delivery deadlines and shoot dates will be scheduled here."
      />
    </div>
  );
}
