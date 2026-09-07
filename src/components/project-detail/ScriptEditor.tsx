"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ExternalLink, FileText, PenLine, Trash2, UploadCloud } from "lucide-react";
import type { VideoScript } from "@/types/project";
import { formatFileSize } from "@/lib/format";
import { Button } from "@/components/ui/Button";

const TRUNCATE_LENGTH = 220;

interface ScriptEditorProps {
  script: VideoScript | null;
  onChange: (script: VideoScript | null) => void;
}

type EditMode = "closed" | "text";

/**
 * The client's script can arrive three ways: pasted straight in as text,
 * uploaded as a document (no parsing, just recorded as a file), or as an
 * external link left over from older projects. Only text and file are
 * offered as new-entry modes; link stays supported for display only.
 */
export function ScriptEditor({ script, onChange }: ScriptEditorProps) {
  const [mode, setMode] = useState<EditMode>("closed");
  const [draft, setDraft] = useState(script?.type === "text" ? script.content : "");
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function startTextEdit() {
    setDraft(script?.type === "text" ? script.content : "");
    setMode("text");
  }

  function saveText() {
    const trimmed = draft.trim();
    if (trimmed.length === 0) return;
    onChange({ type: "text", content: trimmed });
    setMode("closed");
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = Math.max(1, Math.round(file.size / 1024));
    onChange({ type: "file", content: file.name, sizeKb });
    e.target.value = "";
  }

  const header = (
    <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
      Video Script
    </h3>
  );

  if (mode === "text") {
    return (
      <section className="flex flex-col gap-2">
        {header}
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Paste or write the script here..."
          rows={8}
          className="focus-ring w-full resize-y rounded-[var(--radius)] border border-[var(--color-border-strong)] bg-[var(--color-bg-raised)] px-3 py-2.5 text-sm leading-relaxed text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]"
        />
        <div className="flex items-center gap-2">
          <Button variant="primary" onClick={saveText} disabled={draft.trim().length === 0}>
            Save Script
          </Button>
          <Button variant="ghost" onClick={() => setMode("closed")}>
            Cancel
          </Button>
        </div>
      </section>
    );
  }

  if (!script) {
    return (
      <section className="flex flex-col gap-2">
        {header}
        <p className="text-sm text-[var(--color-text-faint)]">No script provided yet.</p>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            aria-hidden="true"
            tabIndex={-1}
          />
          <Button variant="secondary" icon={<PenLine className="h-4 w-4" />} onClick={startTextEdit}>
            Write Text
          </Button>
          <Button
            variant="secondary"
            icon={<UploadCloud className="h-4 w-4" />}
            onClick={() => inputRef.current?.click()}
          >
            Upload File
          </Button>
        </div>
      </section>
    );
  }

  const isLongText = script.type === "text" && script.content.length > TRUNCATE_LENGTH;
  const shownText =
    script.type === "text"
      ? expanded || !isLongText
        ? script.content
        : `${script.content.slice(0, TRUNCATE_LENGTH)}...`
      : "";

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        {header}
        <div className="flex items-center gap-1">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            aria-hidden="true"
            tabIndex={-1}
          />
          <button
            type="button"
            onClick={startTextEdit}
            aria-label="Replace script with text"
            className="focus-ring cursor-pointer rounded-[var(--radius)] p-1.5 text-[var(--color-text-faint)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          >
            <PenLine className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label="Replace script with a file"
            className="focus-ring cursor-pointer rounded-[var(--radius)] p-1.5 text-[var(--color-text-faint)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          >
            <UploadCloud className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Remove script"
            className="focus-ring cursor-pointer rounded-[var(--radius)] p-1.5 text-[var(--color-text-faint)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-accent)]"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {script.type === "link" && (
        <a
          href={script.content}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-[var(--color-border-strong)] px-3 py-1.5 text-sm text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)]"
        >
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          Open script document
        </a>
      )}

      {script.type === "file" && (
        <div className="flex w-fit items-center gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2">
          <FileText className="h-4 w-4 shrink-0 text-[var(--color-text-faint)]" strokeWidth={1.75} aria-hidden="true" />
          <span className="text-sm text-[var(--color-text)]">{script.content}</span>
          {typeof script.sizeKb === "number" && (
            <span className="font-mono text-[11px] text-[var(--color-text-faint)]">
              {formatFileSize(script.sizeKb)}
            </span>
          )}
        </div>
      )}

      {script.type === "text" && (
        <>
          <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-muted)]">
            {shownText}
          </p>
          {isLongText && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="focus-ring w-fit cursor-pointer font-mono text-xs font-medium text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-accent-hover)]"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </>
      )}
    </section>
  );
}
