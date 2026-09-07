import type { Stage } from "@/types/project";

interface StageVisual {
  label: string;
  color: string; // CSS var reference
  dot: string;
}

/**
 * Single source of truth for stage color mapping. Used by the kanban
 * column headers, card pills, and the detail panel status pill so the
 * color for a given stage is always identical across the app.
 */
export const STAGE_VISUALS: Record<Stage, StageVisual> = {
  pending: {
    label: "Pending",
    color: "var(--color-stage-pending)",
    dot: "bg-[var(--color-stage-pending)]",
  },
  in_progress: {
    label: "In Progress",
    color: "var(--color-stage-progress)",
    dot: "bg-[var(--color-stage-progress)]",
  },
  admin_approved: {
    label: "Admin Approved",
    color: "var(--color-stage-admin)",
    dot: "bg-[var(--color-stage-admin)]",
  },
  client_review: {
    label: "Client Review",
    color: "var(--color-stage-client)",
    dot: "bg-[var(--color-stage-client)]",
  },
  revision: {
    label: "Revision",
    color: "var(--color-stage-revision)",
    dot: "bg-[var(--color-stage-revision)]",
  },
  approved: {
    label: "Approved",
    color: "var(--color-stage-approved)",
    dot: "bg-[var(--color-stage-approved)]",
  },
};

/** The primary forward action for each stage, and the stage it leads to. */
export const STAGE_NEXT_ACTION: Partial<
  Record<Stage, { label: string; next: Stage }>
> = {
  pending: { label: "Start Processing", next: "in_progress" },
  in_progress: { label: "Submit for Review", next: "admin_approved" },
  admin_approved: { label: "Send to Client", next: "client_review" },
  client_review: { label: "Approve Project", next: "approved" },
  revision: { label: "Resubmit for Review", next: "admin_approved" },
};
