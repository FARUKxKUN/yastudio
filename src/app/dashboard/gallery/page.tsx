"use client";

import { useMemo } from "react";
import { Images } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { EmptyState } from "@/components/ui/EmptyState";
import { GalleryCard } from "@/components/gallery/GalleryCard";

export default function GalleryPage() {
  const { projects, isReady } = useProjects();

  const approved = useMemo(
    () => projects.filter((p) => p.stage === "approved"),
    [projects]
  );

  if (!isReady) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Loading gallery...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Gallery</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          {approved.length} approved deliverable{approved.length === 1 ? "" : "s"}
        </p>
      </div>

      {approved.length === 0 ? (
        <EmptyState
          icon={Images}
          title="No approved deliverables yet"
          description="Approved projects will appear here as a visual archive."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {approved.map((project) => (
            <GalleryCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
