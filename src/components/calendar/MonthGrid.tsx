import type { Project } from "@/types/project";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface DayCell {
  date: number | null;
  isToday: boolean;
  count: number;
}

function buildMonthCells(projects: Project[], year: number, month: number): DayCell[] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // getDay(): 0 = Sunday. Shift so Monday is the first column.
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const activityByDay = new Map<number, number>();
  for (const project of projects) {
    const created = new Date(project.createdAt);
    if (created.getFullYear() === year && created.getMonth() === month) {
      const day = created.getDate();
      activityByDay.set(day, (activityByDay.get(day) ?? 0) + 1);
    }
  }

  const cells: DayCell[] = Array.from({ length: leadingBlanks }, () => ({
    date: null,
    isToday: false,
    count: 0,
  }));

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: day,
      isToday: isCurrentMonth && today.getDate() === day,
      count: activityByDay.get(day) ?? 0,
    });
  }

  return cells;
}

interface MonthGridProps {
  projects: Project[];
}

export function MonthGrid({ projects }: MonthGridProps) {
  const now = new Date();
  const cells = buildMonthCells(projects, now.getFullYear(), now.getMonth());
  const monthLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
        {monthLabel}
      </h2>

      <div className="grid grid-cols-7 gap-1.5">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="pb-1 text-center font-mono text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]"
          >
            {label}
          </span>
        ))}

        {cells.map((cell, i) =>
          cell.date === null ? (
            <span key={`blank_${i}`} />
          ) : (
            <div
              key={cell.date}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-[var(--radius)] border text-sm ${
                cell.isToday
                  ? "border-[var(--color-accent)] text-[var(--color-text)]"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)]"
              }`}
            >
              <span className="font-mono">{cell.date}</span>
              {cell.count > 0 && (
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
