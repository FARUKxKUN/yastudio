import type { LucideIcon } from "lucide-react";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: string;
}

export function StatTile({ icon: Icon, label, value, accent }: StatTileProps) {
  return (
    <div className="flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          {label}
        </span>
        <Icon
          className="h-4 w-4"
          strokeWidth={1.75}
          style={{ color: accent ?? "var(--color-text-faint)" }}
          aria-hidden="true"
        />
      </div>
      <span className="font-mono text-3xl font-semibold text-[var(--color-text)]">{value}</span>
    </div>
  );
}
