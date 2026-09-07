"use client";

import { ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import type { Project, VideoScript } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { STAGE_NEXT_ACTION } from "@/lib/stage-config";
import { formatRelativeTime, formatCount } from "@/lib/format";
import { StagePill } from "@/components/ui/StagePill";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { TextBlock } from "@/components/project-detail/TextBlock";
import { ScriptEditor } from "@/components/project-detail/ScriptEditor";
import { FileList } from "@/components/project-detail/FileList";
import { FileUploadZone } from "@/components/project-detail/FileUploadZone";
import { FilmstripProgress } from "@/components/project-detail/FilmstripProgress";
import { TeamAssignment } from "@/components/project-detail/TeamAssignment";
import { RevisionThread } from "@/components/project-detail/RevisionThread";

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onAssignEditor: (editorId: string | null) => void;
  onSetScript: (script: VideoScript | null) => void;
  onAddSourceFile: (name: string, sizeKb: number) => void;
  onAddDeliverable: (name: string, sizeKb: number) => void;
  onAddComment: (text: string) => void;
  onToggleResolved: (commentId: string) => void;
  onMoveStage: (nextStage: Project["stage"]) => void;
  onRequestRevision: () => void;
}

export function ProjectDetailView({
  project,
  onBack,
  onAssignEditor,
  onSetScript,
  onAddSourceFile,
  onAddDeliverable,
  onAddComment,
  onToggleResolved,
  onMoveStage,
  onRequestRevision,
}: ProjectDetailViewProps) {
  const client = getPerson(project.clientId);
  const nextAction = STAGE_NEXT_ACTION[project.stage];
  const hasDeliverables = project.deliverables.length > 0;

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] px-8 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to projects"
            className="focus-ring flex cursor-pointer items-center gap-2 rounded-[var(--radius)] border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Projects
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
            ID {project.id}
          </span>
        </div>
        <StagePill stage={project.stage} />
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-8 py-8 lg:grid-cols-[1fr_340px]">
          <div className="flex min-w-0 flex-col gap-8">
            <div>
              <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
                Created {formatRelativeTime(project.createdAt)}
              </span>
              <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-[var(--color-text)]">
                {project.title}
              </h1>
              {client && (
                <div className="mt-3 flex items-center gap-2">
                  <Avatar
                    name={client.name}
                    initials={client.initials}
                    colorSeed={client.colorSeed}
                    size="md"
                  />
                  <span className="text-sm text-[var(--color-text-muted)]">{client.name}</span>
                </div>
              )}
            </div>

            <TextBlock label="Client Instructions" content={project.instructions} />
            <ScriptEditor script={project.script} onChange={onSetScript} />

            <FileList
              label="Source Files From Client"
              files={project.sourceFiles}
              emptyLabel="No source files uploaded yet."
            />
            {project.stage === "pending" && (
              <FileUploadZone label="Drop client source files here" onFileSelected={onAddSourceFile} />
            )}

            <FileList
              label="Deliverables"
              files={project.deliverables}
              emptyLabel="No deliverables uploaded yet."
            />
            {(project.stage === "in_progress" || project.stage === "revision") && (
              <FileUploadZone label="Upload the exported cut" onFileSelected={onAddDeliverable} />
            )}

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

          <aside className="flex flex-col gap-6 lg:sticky lg:top-0 lg:self-start">
            <TeamAssignment editorId={project.editorId} onAssign={onAssignEditor} />

            <FilmstripProgress
              label="Deliverables"
              value={project.deliverables.length}
              total={project.deliverablesTotal}
            />
            <FilmstripProgress
              label="Revisions Used"
              value={project.revisionsUsed}
              total={project.revisionsMax}
              accent="var(--color-stage-revision)"
            />

            <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-faint)]">Deliverables</span>
                <span className="text-[var(--color-text-muted)]">
                  {formatCount(project.deliverables.length, project.deliverablesTotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-faint)]">Revisions</span>
                <span className="text-[var(--color-text-muted)]">
                  {formatCount(project.revisionsUsed, project.revisionsMax)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text-faint)]">Created</span>
                <span className="text-[var(--color-text-muted)]">
                  {formatRelativeTime(project.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {project.stage === "client_review" && (
                <Button
                  variant="secondary"
                  icon={<RotateCcw className="h-4 w-4" />}
                  onClick={onRequestRevision}
                >
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
                <span className="inline-flex items-center justify-center gap-2 rounded-[var(--radius)] border border-[var(--color-stage-approved)] px-3 py-2 font-mono text-xs text-[var(--color-stage-approved)]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Approved by client
                </span>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
