"use client";

import type { DragEvent } from "react";
import { useState } from "react";
import type { Project, Stage } from "@/types/project";
import { STAGE_VISUALS } from "@/lib/stage-config";
import { ProjectCard } from "@/components/kanban/ProjectCard";

interface KanbanColumnProps {
  stage: Stage;
  projects: Project[];
  onOpen: (id: string) => void;
  onDrop: (id: string, stage: Stage) => void;
}

export function KanbanColumn({ stage, projects, onOpen, onDrop }: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const visual = STAGE_VISUALS[stage];

  function handleDragStart(e: DragEvent<HTMLButtonElement>, id: string) {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onDrop(id, stage);
  }

  return (
    <div className="flex h-full w-80 shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: visual.color }}
            aria-hidden="true"
          />
          <h2 className="font-display text-sm font-semibold text-[var(--color-text)]">
            {visual.label}
          </h2>
        </div>
        <span className="rounded-[var(--radius)] bg-[var(--color-surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-text-muted)]">
          {projects.length}
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto rounded-[var(--radius)] border border-dashed p-2 transition-colors duration-200 ${
          isDragOver
            ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_6%,transparent)]"
            : "border-transparent"
        }`}
      >
        {projects.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-[var(--radius)] border border-dashed border-[var(--color-border)] py-10 text-center font-mono text-[11px] text-[var(--color-text-faint)]">
            No projects
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpen}
              onDragStart={handleDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
}
