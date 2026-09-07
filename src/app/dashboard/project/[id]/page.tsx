"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { FolderX } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { CURRENT_USER } from "@/lib/current-user";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectDetailView } from "@/components/project-detail/ProjectDetailView";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const {
    projects,
    isReady,
    moveStage,
    assignEditor,
    setScript,
    addSourceFile,
    addDeliverable,
    addComment,
    toggleCommentResolved,
  } = useProjects();

  const project = useMemo(
    () => projects.find((p) => p.id === params.id) ?? null,
    [projects, params.id]
  );

  const goBack = () => router.push("/dashboard");

  if (!isReady) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Loading project...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full flex-col gap-6 p-8">
        <EmptyState
          icon={FolderX}
          title="Project not found"
          description="It may have been removed, or the link is out of date."
        />
      </div>
    );
  }

  return (
    <ProjectDetailView
      project={project}
      onBack={goBack}
      onAssignEditor={(editorId) => assignEditor(project.id, editorId)}
      onSetScript={(script) => setScript(project.id, script)}
      onAddSourceFile={(name, sizeKb) => addSourceFile(project.id, { name, sizeKb })}
      onAddDeliverable={(name, sizeKb) => addDeliverable(project.id, { name, sizeKb })}
      onAddComment={(text) =>
        addComment(project.id, {
          authorId: CURRENT_USER.id,
          authorRole: "admin",
          text,
        })
      }
      onToggleResolved={(commentId) => toggleCommentResolved(project.id, commentId)}
      onMoveStage={(stage) => moveStage(project.id, stage)}
      onRequestRevision={() => moveStage(project.id, "revision")}
    />
  );
}
