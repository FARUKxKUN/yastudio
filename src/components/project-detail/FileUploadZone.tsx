"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";

interface FileUploadZoneProps {
  label: string;
  onFileSelected: (name: string, sizeKb: number) => void;
}

/**
 * No real storage backend — selecting a file just records its name and
 * size as a mock deliverable/source-file entry.
 */
export function FileUploadZone({ label, onFileSelected }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKb = Math.max(1, Math.round(file.size / 1024));
    onFileSelected(file.name, sizeKb);
    e.target.value = "";
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="focus-ring flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--color-border-strong)] px-4 py-6 text-center transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_5%,transparent)]"
      >
        <UploadCloud
          className="h-5 w-5 text-[var(--color-text-faint)]"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">
          Click to choose a file
        </span>
      </button>
    </div>
  );
}
