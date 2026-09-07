import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-[var(--radius)] border border-dashed border-[var(--color-border-strong)] px-8 py-16 text-center">
      <Icon className="h-8 w-8 text-[var(--color-text-faint)]" strokeWidth={1.5} aria-hidden="true" />
      <h2 className="font-display text-lg font-semibold text-[var(--color-text)]">{title}</h2>
      {description && (
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">{description}</p>
      )}
    </div>
  );
}
