import { Images } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

export default function GalleryPage() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Gallery</h1>
      <EmptyState
        icon={Images}
        title="Gallery is coming soon"
        description="Approved deliverables will be browsable here as a visual archive."
      />
    </div>
  );
}
