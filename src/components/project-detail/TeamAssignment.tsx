"use client";

import { UserCircle2 } from "lucide-react";
import { PEOPLE, getPerson } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CURRENT_USER } from "@/lib/current-user";

interface TeamAssignmentProps {
  editorId: string | null;
  onAssign: (editorId: string | null) => void;
}

const EDITORS = PEOPLE.filter((p) => p.role === "editor");

export function TeamAssignment({ editorId, onAssign }: TeamAssignmentProps) {
  const editor = getPerson(editorId);

  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
        Assigned Team
      </h3>

      {editor ? (
        <div className="flex items-center gap-2 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2">
          <Avatar name={editor.name} initials={editor.initials} colorSeed={editor.colorSeed} size="md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--color-text)]">{editor.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">
              Editor
            </p>
          </div>
          <Button variant="ghost" onClick={() => onAssign(null)}>
            Unassign
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--color-border-strong)] px-3 py-2 text-[var(--color-text-faint)]">
            <UserCircle2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-sm">Unassigned</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => onAssign(CURRENT_USER.id)}>
              Assign myself
            </Button>
            <select
              className="focus-ring cursor-pointer rounded-[var(--radius)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)]"
              value=""
              onChange={(e) => e.target.value && onAssign(e.target.value)}
              aria-label="Assign an editor"
            >
              <option value="" disabled>
                Assign an editor...
              </option>
              {EDITORS.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </section>
  );
}
