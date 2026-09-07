/**
 * Formatting helpers for the HUD-style metadata display (mono typeface).
 */

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diffMs < minute) return "just now";
  if (diffMs < hour) {
    const m = Math.floor(diffMs / minute);
    return `about ${m} minute${m === 1 ? "" : "s"} ago`;
  }
  if (diffMs < day) {
    const h = Math.floor(diffMs / hour);
    return `about ${h} hour${h === 1 ? "" : "s"} ago`;
  }
  const d = Math.floor(diffMs / day);
  if (d < 30) return `${d} day${d === 1 ? "" : "s"} ago`;
  const months = Math.floor(d / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

export function formatFileSize(sizeKb: number): string {
  if (sizeKb < 1024) return `${sizeKb.toFixed(0)} KB`;
  return `${(sizeKb / 1024).toFixed(1)} MB`;
}

export function formatCount(value: number, total: number | "unlimited"): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  if (total === "unlimited") return `${pad(value)}/∞`;
  return `${pad(value)}/${pad(total)}`;
}

export function formatTimecodeLabel(timecode: string): string {
  return `[${timecode}]`;
}

/** Deterministic pseudo-random timecode-looking id for new comments. */
export function nowTimecode(): string {
  const totalSeconds = Math.floor((Date.now() / 1000) % 3600);
  const mm = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export function generateId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
