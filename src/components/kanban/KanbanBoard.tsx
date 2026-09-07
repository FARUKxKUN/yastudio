"use client";

import type { Project, Stage } from "@/types/project";
import { STAGE_ORDER } from "@/types/project";
import { KanbanColumn } from "@/components/kanban/KanbanColumn";

interface KanbanBoardProps {
  projects: Project[];
  onOpen: (id: string) => void;
  onDrop: (id: string, stage: Stage) => void;
}

export function KanbanBoard({ projects, onOpen, onDrop }: KanbanBoardProps) {
  return (
    <div className="flex h-full gap-5 overflow-x-auto p-6">
      {STAGE_ORDER.map((stage) => (
        <KanbanColumn
          key={stage}
          stage={stage}
          projects={projects.filter((p) => p.stage === stage)}
          onOpen={onOpen}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}
