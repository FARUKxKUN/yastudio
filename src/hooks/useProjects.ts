"use client";

import { useCallback, useEffect, useState } from "react";
import type { Project, RevisionComment, Stage } from "@/types/project";
import { loadProjects, saveProjects } from "@/lib/storage";
import { generateId, nowTimecode } from "@/lib/format";

interface NewFileInput {
  name: string;
  sizeKb: number;
}

/**
 * Central client-side state for all project data. Backed by localStorage.
 * Every mutation returns a brand new projects array — no in-place edits.
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after mount to avoid a server/client
    // hydration mismatch (the server always renders the "loading" state).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProjects(loadProjects());
    setIsReady(true);
  }, []);

  const commit = useCallback((next: Project[]) => {
    setProjects(next);
    saveProjects(next);
  }, []);

  const updateProject = useCallback(
    (id: string, updater: (project: Project) => Project) => {
      setProjects((prev) => {
        const next = prev.map((p) => (p.id === id ? updater(p) : p));
        saveProjects(next);
        return next;
      });
    },
    []
  );

  const moveStage = useCallback(
    (id: string, stage: Stage) => {
      updateProject(id, (p) => ({ ...p, stage }));
    },
    [updateProject]
  );

  const assignEditor = useCallback(
    (id: string, editorId: string | null) => {
      updateProject(id, (p) => ({ ...p, editorId }));
    },
    [updateProject]
  );

  const addSourceFile = useCallback(
    (id: string, file: NewFileInput) => {
      updateProject(id, (p) => ({
        ...p,
        sourceFiles: [
          ...p.sourceFiles,
          {
            id: generateId("sf"),
            name: file.name,
            sizeKb: file.sizeKb,
            uploadedAt: new Date().toISOString(),
          },
        ],
      }));
    },
    [updateProject]
  );

  const addDeliverable = useCallback(
    (id: string, file: NewFileInput) => {
      updateProject(id, (p) => ({
        ...p,
        deliverables: [
          ...p.deliverables,
          {
            id: generateId("dv"),
            name: file.name,
            sizeKb: file.sizeKb,
            uploadedAt: new Date().toISOString(),
          },
        ],
      }));
    },
    [updateProject]
  );

  const addComment = useCallback(
    (
      id: string,
      input: Pick<RevisionComment, "authorId" | "authorRole" | "text"> & {
        timecode?: string;
      }
    ) => {
      updateProject(id, (p) => ({
        ...p,
        comments: [
          ...p.comments,
          {
            id: generateId("c"),
            authorId: input.authorId,
            authorRole: input.authorRole,
            timecode: input.timecode ?? nowTimecode(),
            text: input.text,
            createdAt: new Date().toISOString(),
            resolved: false,
          },
        ],
      }));
    },
    [updateProject]
  );

  const toggleCommentResolved = useCallback(
    (projectId: string, commentId: string) => {
      updateProject(projectId, (p) => ({
        ...p,
        comments: p.comments.map((c) =>
          c.id === commentId ? { ...c, resolved: !c.resolved } : c
        ),
      }));
    },
    [updateProject]
  );

  return {
    projects,
    isReady,
    commit,
    moveStage,
    assignEditor,
    addSourceFile,
    addDeliverable,
    addComment,
    toggleCommentResolved,
  };
}
