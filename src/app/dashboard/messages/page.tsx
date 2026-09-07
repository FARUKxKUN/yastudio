"use client";

import { useMemo } from "react";
import { MessageSquare } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { EmptyState } from "@/components/ui/EmptyState";
import { ThreadRow } from "@/components/messages/ThreadRow";

export default function MessagesPage() {
  const { projects, isReady } = useProjects();

  const threads = useMemo(
    () =>
      projects
        .filter((p) => p.comments.length > 0)
        .sort((a, b) => {
          const aLast = a.comments[a.comments.length - 1].createdAt;
          const bLast = b.comments[b.comments.length - 1].createdAt;
          return new Date(bLast).getTime() - new Date(aLast).getTime();
        }),
    [projects]
  );

  if (!isReady) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Loading messages...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">Messages</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Revision threads across {threads.length} project{threads.length === 1 ? "" : "s"}
        </p>
      </div>

      {threads.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No conversations yet"
          description="Revision comment threads will surface here as clients and editors weigh in."
        />
      ) : (
        <div className="flex flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)]">
          {threads.map((project) => (
            <ThreadRow key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
