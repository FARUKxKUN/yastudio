import { FileVideo } from "lucide-react";
import type { Deliverable, SourceFile } from "@/types/project";
import { formatFileSize, formatRelativeTime } from "@/lib/format";

interface FileListProps {
  label: string;
  files: (SourceFile | Deliverable)[];
  emptyLabel: string;
}

export function FileList({ label, files, emptyLabel }: FileListProps) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
        {label}
      </h3>
      {files.length === 0 ? (
        <p className="text-sm text-[var(--color-text-faint)]">{emptyLabel}</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-3 py-2"
            >
              <FileVideo
                className="h-4 w-4 shrink-0 text-[var(--color-text-faint)]"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-[var(--color-text)]">
                {file.name}
              </span>
              <span className="shrink-0 font-mono text-[11px] text-[var(--color-text-faint)]">
                {formatFileSize(file.sizeKb)}
              </span>
              <span className="shrink-0 font-mono text-[11px] text-[var(--color-text-faint)]">
                {formatRelativeTime(file.uploadedAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
