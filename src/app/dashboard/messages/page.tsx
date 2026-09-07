import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function MessagesPage() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Messages</h1>
      <EmptyState
        icon={MessageSquare}
        title="Messages are coming soon"
        description="Direct client and editor threads outside of revision comments will live here."
      />
    </div>
  );
}
