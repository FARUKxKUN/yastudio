"use client";

import { useEffect } from "react";
import { X, CheckCircle2, RotateCcw } from "lucide-react";
import type { Project } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { STAGE_NEXT_ACTION } from "@/lib/stage-config";
import { formatRelativeTime } from "@/lib/format";
import { StagePill } from "@/components/ui/StagePill";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { TextBlock, ScriptBlock } from "@/components/project-detail/TextBlock";
import { FileList } from "@/components/project-detail/FileList";
import { FileUploadZone } from "@/components/project-detail/FileUploadZone";
import { FilmstripProgress } from "@/components/project-detail/FilmstripProgress";
import { TeamAssignment } from "@/components/project-detail/TeamAssignment";
import { RevisionThread } from "@/components/project-detail/RevisionThread";

interface ProjectPanelProps {
  project: Project;
  onClose: () => void;
  onAssignEditor: (editorId: string | null) => void;
  onAddSourceFile: (name: string, sizeKb: number) => void;
  onAddDeliverable: (name: string, sizeKb: number) => void;
  onAddComment: (text: string) => void;
  onToggleResolved: (commentId: string) => void;
  onMoveStage: (nextStage: Project["stage"]) => void;
  onRequestRevision: () => void;
}

export function ProjectPanel({
  project,
  onClose,
  onAssignEditor,
  onAddSourceFile,
  onAddDeliverable,
  onAddComment,
  onToggleResolved,
  onMoveStage,
  onRequestRevision,
}: ProjectPanelProps) {
  const client = getPerson(project.clientId);
  const nextAction = STAGE_NEXT_ACTION[project.stage];

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const hasDeliverables = project.deliverables.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close project panel"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-[2px]"
      />

      <aside className="relative flex h-full w-full max-w-2xl flex-col border-l border-[var(--color-border)] bg-[var(--color-bg)] shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-6 py-5">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <StagePill stage={project.stage} />
              <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
                Created {formatRelativeTime(project.createdAt)}
              </span>
            </div>
            <h2 className="font-display text-xl font-semibold leading-snug text-[var(--color-text)]">
              {project.title}
            </h2>
            {client && (
              <div className="mt-2 flex items-center gap-2">
                <Avatar name={client.name} initials={client.initials} colorSeed={client.colorSeed} />
                <span className="text-sm text-[var(--color-text-muted)]">{client.name}</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="focus-ring cursor-pointer rounded-[var(--radius)] p-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-6 py-6">
          <TextBlock label="Client Instructions" content={project.instructions} />
          <ScriptBlock script={project.script} />
          <FileList label="Source Files From Client" files={project.sourceFiles} emptyLabel="No source files uploaded yet." />

          {project.stage === "pending" && (
            <FileUploadZone label="Drop client source files here" onFileSelected={onAddSourceFile} />
          )}

          <TeamAssignment editorId={project.editorId} onAssign={onAssignEditor} />

          <FilmstripProgress
            label="Deliverables"
            value={project.deliverables.length}
            total={project.deliverablesTotal}
          />
          <FileList label="Deliverables" files={project.deliverables} emptyLabel="No deliverables uploaded yet." />

          {(project.stage === "in_progress" || project.stage === "revision") && (
            <FileUploadZone
              label="Upload the exported cut"
              onFileSelected={onAddDeliverable}
            />
          )}

          <FilmstripProgress
            label="Revisions Used"
            value={project.revisionsUsed}
            total={project.revisionsMax}
            accent="var(--color-stage-revision)"
          />

          {(project.stage === "revision" ||
            project.comments.length > 0 ||
            project.stage === "client_review") && (
            <RevisionThread
              comments={project.comments}
              onAddComment={onAddComment}
              onToggleResolved={onToggleResolved}
            />
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] px-6 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
            ID {project.id}
          </span>
          <div className="flex items-center gap-2">
            {project.stage === "client_review" && (
              <Button variant="secondary" icon={<RotateCcw className="h-4 w-4" />} onClick={onRequestRevision}>
                Request Revision
              </Button>
            )}
            {nextAction && (
              <Button
                variant="primary"
                icon={<CheckCircle2 className="h-4 w-4" />}
                disabled={project.stage === "in_progress" && !hasDeliverables}
                onClick={() => onMoveStage(nextAction.next)}
              >
                {nextAction.label}
              </Button>
            )}
            {project.stage === "approved" && (
              <span className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--color-stage-approved)] px-3 py-2 font-mono text-xs text-[var(--color-stage-approved)]">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Approved by client
              </span>
            )}
          </div>
        </footer>
      </aside>
    </div>
  );
}
