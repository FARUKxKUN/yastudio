import type { Project } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { formatRelativeTime, formatTimecodeLabel } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";

interface ThreadRowProps {
  project: Project;
}

export function ThreadRow({ project }: ThreadRowProps) {
  const lastComment = project.comments[project.comments.length - 1];
  const author = getPerson(lastComment.authorId);
  const openCount = project.comments.filter((c) => !c.resolved).length;

  const participantIds = Array.from(
    new Set(
      [project.clientId, project.editorId, ...project.comments.map((c) => c.authorId)].filter(
        (id): id is string => Boolean(id)
      )
    )
  );

  return (
    <div className="flex items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-[var(--color-surface-hover)]">
      <div className="flex shrink-0 -space-x-2">
        {participantIds.slice(0, 3).map((id) => {
          const person = getPerson(id);
          if (!person) return null;
          return (
            <Avatar
              key={id}
              name={person.name}
              initials={person.initials}
              colorSeed={person.colorSeed}
            />
          );
        })}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-[var(--color-text)]">{project.title}</p>
          {openCount > 0 && (
            <span
              className="shrink-0 rounded-[var(--radius)] border px-1.5 py-0.5 font-mono text-[10px]"
              style={{
                borderColor: "var(--color-stage-revision)",
                color: "var(--color-stage-revision)",
              }}
            >
              {openCount} open
            </span>
          )}
        </div>
        <p className="truncate text-xs text-[var(--color-text-muted)]">
          <span className="font-mono text-[var(--color-text-faint)]">
            {formatTimecodeLabel(lastComment.timecode)}
          </span>{" "}
          {author?.name ?? "Unknown"}: {lastComment.text}
        </p>
      </div>

      <span className="shrink-0 font-mono text-[10px] text-[var(--color-text-faint)]">
        {formatRelativeTime(lastComment.createdAt)}
      </span>
    </div>
  );
}
