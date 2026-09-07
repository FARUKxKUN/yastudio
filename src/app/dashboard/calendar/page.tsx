"use client";

import { useMemo } from "react";
import { useProjects } from "@/hooks/useProjects";
import { getPerson } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/format";
import { StagePill } from "@/components/ui/StagePill";
import { MonthGrid } from "@/components/calendar/MonthGrid";

export default function CalendarPage() {
  const { projects, isReady } = useProjects();

  const agenda = useMemo(
    () =>
      [...projects].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [projects]
  );

  if (!isReady) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Loading calendar...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Calendar</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Activity by submission date
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
        <MonthGrid projects={projects} />

        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
            Agenda
          </h2>
          <div className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)]">
            {agenda.map((project) => {
              const client = getPerson(project.clientId);
              return (
                <div
                  key={project.id}
                  className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[var(--color-text)]">
                      {project.title}
                    </p>
                    <p className="truncate text-xs text-[var(--color-text-muted)]">
                      {client?.name ?? "Unknown client"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <StagePill stage={project.stage} />
                    <span className="font-mono text-[10px] text-[var(--color-text-faint)]">
                      {formatRelativeTime(project.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
