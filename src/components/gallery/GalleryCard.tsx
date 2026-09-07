import { Play } from "lucide-react";
import type { Project } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { formatRelativeTime, formatCount } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";

const TICK_COUNT = 14;

interface GalleryCardProps {
  project: Project;
}

export function GalleryCard({ project }: GalleryCardProps) {
  const client = getPerson(project.clientId);
  const editor = getPerson(project.editorId);

  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors duration-200 hover:border-[var(--color-border-strong)]">
      <div className="relative flex aspect-video items-center justify-center bg-[var(--color-bg-raised)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)]">
          <Play className="h-4 w-4 translate-x-[1px] text-[var(--color-text-muted)]" fill="currentColor" aria-hidden="true" />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex gap-[2px] p-1.5">
          {Array.from({ length: TICK_COUNT }).map((_, i) => (
            <span key={i} className="h-1.5 flex-1 rounded-[1px] bg-[var(--color-border-strong)]" />
          ))}
        </div>
        <span
          className="absolute right-2 top-2 rounded-[var(--radius)] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
          style={{
            borderColor: "var(--color-stage-approved)",
            color: "var(--color-stage-approved)",
            backgroundColor: "color-mix(in srgb, var(--color-stage-approved) 12%, var(--color-bg))",
          }}
        >
          Approved
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-sm font-semibold leading-snug text-[var(--color-text)] line-clamp-2">
          {project.title}
        </h3>
        <p className="truncate text-xs text-[var(--color-text-muted)]">
          {client?.name ?? "Unknown client"}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-[var(--color-border)] pt-3">
          {editor ? (
            <div className="flex items-center gap-2">
              <Avatar name={editor.name} initials={editor.initials} colorSeed={editor.colorSeed} />
              <span className="truncate text-xs text-[var(--color-text-muted)]">{editor.name}</span>
            </div>
          ) : (
            <span className="text-xs text-[var(--color-text-faint)]">Unassigned</span>
          )}
          <span className="font-mono text-[10px] text-[var(--color-text-faint)]">
            {formatCount(project.deliverables.length, project.deliverablesTotal)}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--color-text-faint)]">
          {formatRelativeTime(project.createdAt)}
        </span>
      </div>
    </div>
  );
}
