import type { Stage } from "@/types/project";
import { STAGE_VISUALS } from "@/lib/stage-config";

interface StagePillProps {
  stage: Stage;
  count?: number;
}

export function StagePill({ stage, count }: StagePillProps) {
  const visual = STAGE_VISUALS[stage];
  return (
    <span
      className="inline-flex items-center gap-2 rounded-[var(--radius)] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide"
      style={{
        borderColor: visual.color,
        color: visual.color,
        backgroundColor: `color-mix(in srgb, ${visual.color} 12%, transparent)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: visual.color }}
        aria-hidden="true"
      />
      {visual.label}
      {typeof count === "number" && (
        <span className="text-[var(--color-text-faint)]">{count}</span>
      )}
    </span>
  );
}
