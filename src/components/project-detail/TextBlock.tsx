"use client";

import { useState } from "react";

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
