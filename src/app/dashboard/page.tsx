"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, List as ListIcon } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ListView } from "@/components/kanban/ListView";

type ViewMode = "board" | "list";

export default function DashboardPage() {
  const { projects, isReady, moveStage } = useProjects();
  const router = useRouter();

  const [view, setView] = useState<ViewMode>("board");

  const openProject = (id: string) => router.push(`/dashboard/project/${id}`);

  if (!isReady) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Loading pipeline...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-4">
        <div>
          <h1 className="font-display text-xl font-semibold text-[var(--color-text)]">
            Production Board
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
            {projects.length} active projects
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-[var(--radius)] border border-[var(--color-border)] p-1">
          <button
            type="button"
            onClick={() => setView("board")}
            aria-pressed={view === "board"}
            className={`focus-ring flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius)-2px)] px-3 py-1.5 text-sm transition-colors duration-200 ${
              view === "board"
                ? "bg-[var(--color-surface)] text-[var(--color-text)]"
                : "text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]"
            }`}
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Board
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={`focus-ring flex cursor-pointer items-center gap-2 rounded-[calc(var(--radius)-2px)] px-3 py-1.5 text-sm transition-colors duration-200 ${
              view === "list"
                ? "bg-[var(--color-surface)] text-[var(--color-text)]"
                : "text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]"
            }`}
          >
            <ListIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            List
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        {view === "board" ? (
          <KanbanBoard projects={projects} onOpen={openProject} onDrop={moveStage} />
        ) : (
          <ListView projects={projects} onOpen={openProject} />
        )}
      </div>
    </div>
  );
}
