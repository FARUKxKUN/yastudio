import { formatCount } from "@/lib/format";

interface FilmstripProgressProps {
  label: string;
  value: number;
  total: number | "unlimited";
  accent?: string;
}

const MAX_TICKS = 20;

/**
 * Signature motif: deliverables/revisions progress rendered as a filmstrip
 * of sprocket ticks rather than a generic progress bar or circle.
 */
export function FilmstripProgress({ label, value, total, accent }: FilmstripProgressProps) {
  const color = accent ?? "var(--color-accent)";
  const tickCount = total === "unlimited" ? MAX_TICKS : Math.min(total, MAX_TICKS);
  const filledCount =
    total === "unlimited"
      ? Math.min(value, MAX_TICKS)
      : Math.round((value / Math.max(total, 1)) * tickCount);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          {label}
        </span>
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {formatCount(value, total)}
        </span>
      </div>
      <div
        className="flex items-center gap-[3px] rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-1.5"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={total === "unlimited" ? undefined : total}
        aria-label={label}
      >
        {Array.from({ length: tickCount }).map((_, i) => (
          <span
            key={i}
            className="h-4 flex-1 rounded-[2px] transition-colors duration-200"
            style={{
              backgroundColor: i < filledCount ? color : "var(--color-border-strong)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
