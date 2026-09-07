"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { VideoScript } from "@/types/project";

const TRUNCATE_LENGTH = 220;

interface TextBlockProps {
  label: string;
  content: string;
}

export function TextBlock({ label, content }: TextBlockProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = content.length > TRUNCATE_LENGTH;
  const shown = expanded || !isLong ? content : `${content.slice(0, TRUNCATE_LENGTH)}...`;

  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
        {label}
      </h3>
      <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--color-text-muted)]">
        {shown}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="focus-ring w-fit cursor-pointer font-mono text-xs font-medium text-[var(--color-accent)] transition-colors duration-200 hover:text-[var(--color-accent-hover)]"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </section>
  );
}

export function ScriptBlock({ script }: { script: VideoScript | null }) {
  if (!script) {
    return (
      <section className="flex flex-col gap-2">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Video Script
        </h3>
        <p className="text-sm text-[var(--color-text-faint)]">No script provided.</p>
      </section>
    );
  }

  if (script.type === "link") {
    return (
      <section className="flex flex-col gap-2">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Video Script
        </h3>
        <a
          href={script.content}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-[var(--radius)] border border-[var(--color-border-strong)] px-3 py-1.5 text-sm text-[var(--color-text)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)]"
        >
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          Open script document
        </a>
      </section>
    );
  }

  return <TextBlock label="Video Script" content={script.content} />;
}
