/**
 * Core data model for YAStudio.
 * All state is treated as immutable — helpers in lib/ return new objects,
 * never mutate these in place.
 */

export type Stage =
  | "pending"
  | "in_progress"
  | "admin_approved"
  | "client_review"
  | "revision"
  | "approved";

export const STAGE_ORDER: Stage[] = [
  "pending",
  "in_progress",
  "admin_approved",
  "client_review",
  "revision",
  "approved",
];

export const STAGE_LABEL: Record<Stage, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  admin_approved: "Admin Approved",
  client_review: "Client Review",
  revision: "Revision",
  approved: "Approved",
};

export type PersonRole = "admin" | "editor" | "client";

export interface Person {
  id: string;
  name: string;
  role: PersonRole;
  initials: string;
  colorSeed: number; // deterministic avatar hue, 0-11
  email?: string;
}

export interface SourceFile {
  id: string;
  name: string;
  sizeKb: number;
  uploadedAt: string; // ISO timestamp
}

export interface Deliverable {
  id: string;
  name: string;
  sizeKb: number;
  uploadedAt: string; // ISO timestamp
}

export interface RevisionComment {
  id: string;
  authorId: string;
  authorRole: PersonRole;
  timecode: string; // "00:42" style, tied to a moment in the video
  text: string;
  createdAt: string; // ISO timestamp
  resolved: boolean;
}

export interface VideoScript {
  type: "text" | "link" | "file";
  content: string; // text body, URL, or file name depending on type
  sizeKb?: number; // only present when type is "file"
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  editorId: string | null;
  stage: Stage;
  instructions: string;
  script: VideoScript | null;
  sourceFiles: SourceFile[];
  deliverables: Deliverable[];
  deliverablesTotal: number | "unlimited";
  revisionsUsed: number;
  revisionsMax: number | "unlimited";
  comments: RevisionComment[];
  createdAt: string; // ISO timestamp
}
