"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { PersonRole, RevisionComment } from "@/types/project";
import { getPerson } from "@/lib/mock-data";
import { formatRelativeTime, formatTimecodeLabel, nowTimecode } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CURRENT_USER } from "@/lib/current-user";

const ROLE_LABEL: Record<PersonRole, string> = {
  admin: "Admin",
  editor: "Editor",
  client: "Client",
};

interface RevisionThreadProps {
  comments: RevisionComment[];
  onAddComment: (text: string) => void;
  onToggleResolved: (commentId: string) => void;
}

export function RevisionThread({ comments, onAddComment, onToggleResolved }: RevisionThreadProps) {
  const [draft, setDraft] = useState("");
  const openCount = comments.filter((c) => !c.resolved).length;

  function handleSubmit() {
    const text = draft.trim();
    if (!text) return;
    onAddComment(text);
    setDraft("");
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Revision Comments
        </h3>
        {comments.length > 0 && (
          <span className="rounded-[var(--radius)] bg-[color-mix(in_srgb,var(--color-stage-revision)_16%,transparent)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-stage-revision)]">
            {openCount} open
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2.5">
        {comments.map((comment) => {
          const author = getPerson(comment.authorId);
          return (
            <li
              key={comment.id}
              className={`flex gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3 ${
                comment.resolved ? "opacity-60" : ""
              }`}
            >
              {author && (
                <Avatar name={author.name} initials={author.initials} colorSeed={author.colorSeed} />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {author?.name ?? "Unknown"}
                  </span>
                  <span className="rounded-[var(--radius)] border border-[var(--color-border-strong)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[var(--color-text-faint)]">
                    {ROLE_LABEL[comment.authorRole]}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-accent)]">
                    {formatTimecodeLabel(comment.timecode)}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--color-text-faint)]">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p
                  className={`mt-1 text-sm leading-relaxed text-[var(--color-text-muted)] ${
                    comment.resolved ? "line-through decoration-[var(--color-text-faint)]" : ""
                  }`}
                >
                  {comment.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onToggleResolved(comment.id)}
                aria-pressed={comment.resolved}
                aria-label={comment.resolved ? "Mark comment unresolved" : "Mark comment resolved"}
                className={`focus-ring flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius)] border transition-colors duration-200 ${
                  comment.resolved
                    ? "border-[var(--color-stage-approved)] bg-[var(--color-stage-approved)] text-[#0c0a08]"
                    : "border-[var(--color-border-strong)] text-transparent hover:border-[var(--color-stage-approved)]"
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-3">
        <div className="flex items-center gap-2">
          <Avatar name={CURRENT_USER.name} initials={CURRENT_USER.initials} colorSeed={CURRENT_USER.colorSeed} />
          <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
            {formatTimecodeLabel(nowTimecode())} · commenting as Admin
          </span>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Leave a timestamped note..."
          rows={2}
          className="focus-ring w-full resize-none rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]"
        />
        <Button
          variant="primary"
          className="self-end"
          onClick={handleSubmit}
          disabled={!draft.trim()}
        >
          Add comment
        </Button>
      </div>
    </section>
  );
}
