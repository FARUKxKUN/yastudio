"use client";

import type { Project } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { formatCount, formatRelativeTime } from "@/lib/format";
import { StagePill } from "@/components/ui/StagePill";
import { Avatar } from "@/components/ui/Avatar";

interface ListViewProps {
  projects: Project[];
  onOpen: (id: string) => void;
}

export function ListView({ projects, onOpen }: ListViewProps) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--color-border)]">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg-raised)] text-left font-mono text-[11px] uppercase tracking-wide text-[var(--color-text-faint)]">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Editor</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Deliverables</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const client = getPerson(project.clientId);
              const editor = getPerson(project.editorId);
              return (
                <tr
                  key={project.id}
                  onClick={() => onOpen(project.id)}
                  className="cursor-pointer border-b border-[var(--color-border)] transition-colors duration-200 last:border-0 hover:bg-[var(--color-surface-hover)]"
                >
                  <td className="max-w-[260px] truncate px-4 py-3 font-medium text-[var(--color-text)]">
                    {project.title}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{client?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    {editor ? (
                      <div className="flex items-center gap-2">
                        <Avatar name={editor.name} initials={editor.initials} colorSeed={editor.colorSeed} />
                        <span className="text-[var(--color-text-muted)]">{editor.name}</span>
                      </div>
                    ) : (
                      <span className="text-[var(--color-text-faint)]">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StagePill stage={project.stage} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-muted)]">
                    {formatCount(project.deliverables.length, project.deliverablesTotal)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text-faint)]">
                    {formatRelativeTime(project.createdAt)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
