"use client";

import type { DragEvent } from "react";
import { User, Circle } from "lucide-react";
import type { Project } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
  onDragStart: (e: DragEvent<HTMLButtonElement>, id: string) => void;
}

export function ProjectCard({ project, onOpen, onDragStart }: ProjectCardProps) {
  const client = getPerson(project.clientId);
  const editor = getPerson(project.editorId);

  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => onDragStart(e, project.id)}
      onClick={() => onOpen(project.id)}
      className="focus-ring group flex w-full cursor-grab flex-col gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-left transition-all duration-200 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] active:cursor-grabbing"
    >
      <h3 className="font-display text-sm font-semibold leading-snug text-[var(--color-text)] line-clamp-2">
        {project.title}
      </h3>

      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
        <Circle
          className="h-2 w-2 fill-current text-[var(--color-text-faint)]"
          aria-hidden="true"
        />
        <span className="truncate">{client?.name ?? "Unknown client"}</span>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        {editor ? (
          <div className="flex items-center gap-2">
            <Avatar name={editor.name} initials={editor.initials} colorSeed={editor.colorSeed} />
            <span className="truncate text-xs text-[var(--color-text-muted)]">{editor.name}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-faint)]">
            <User className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
            <span>Unassigned</span>
          </div>
        )}
        <span className="font-mono text-[10px] text-[var(--color-text-faint)]">
          {formatRelativeTime(project.createdAt)}
        </span>
      </div>
    </button>
  );
}
