import type { Person, Project } from "@/types/project";
import { Avatar } from "@/components/ui/Avatar";

interface EditorStats {
  editor: Person;
  assigned: number;
  approved: number;
  inRevision: number;
  avgRevisions: string;
}

function buildEditorStats(editors: Person[], projects: Project[]): EditorStats[] {
  return editors
    .map((editor) => {
      const assignedProjects = projects.filter((p) => p.editorId === editor.id);
      const approved = assignedProjects.filter((p) => p.stage === "approved").length;
      const inRevision = assignedProjects.filter((p) => p.stage === "revision").length;
      const totalRevisions = assignedProjects.reduce((sum, p) => sum + p.revisionsUsed, 0);
      const avgRevisions =
        assignedProjects.length === 0
          ? "0.0"
          : (totalRevisions / assignedProjects.length).toFixed(1);

      return {
        editor,
        assigned: assignedProjects.length,
        approved,
        inRevision,
        avgRevisions,
      };
    })
    .sort((a, b) => b.assigned - a.assigned);
}

interface EditorLeaderboardProps {
  editors: Person[];
  projects: Project[];
}

export function EditorLeaderboard({ editors, projects }: EditorLeaderboardProps) {
  const rows = buildEditorStats(editors, projects);

  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--color-border)]">
      <div className="grid grid-cols-[1fr_repeat(4,88px)] gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-raised)] px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Editor
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Assigned
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Approved
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Revision
        </span>
        <span className="text-right font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Avg Rev.
        </span>
      </div>

      {rows.map(({ editor, assigned, approved, inRevision, avgRevisions }) => (
        <div
          key={editor.id}
          className="grid grid-cols-[1fr_repeat(4,88px)] items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 last:border-b-0"
        >
          <div className="flex items-center gap-2.5">
            <Avatar name={editor.name} initials={editor.initials} colorSeed={editor.colorSeed} />
            <span className="truncate text-sm text-[var(--color-text)]">{editor.name}</span>
          </div>
          <span className="text-right font-mono text-sm text-[var(--color-text-muted)]">
            {assigned}
          </span>
          <span
            className="text-right font-mono text-sm"
            style={{ color: "var(--color-stage-approved)" }}
          >
            {approved}
          </span>
          <span
            className="text-right font-mono text-sm"
            style={{ color: inRevision > 0 ? "var(--color-stage-revision)" : "var(--color-text-faint)" }}
          >
            {inRevision}
          </span>
          <span className="text-right font-mono text-sm text-[var(--color-text-muted)]">
            {avgRevisions}
          </span>
        </div>
      ))}
    </div>
  );
}
