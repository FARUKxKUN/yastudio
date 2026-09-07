interface AvatarProps {
  name: string;
  initials: string;
  colorSeed: number;
  size?: "sm" | "md";
}

/** Palette avoids purple/violet per the brand's banned-color list. */
const AVATAR_HUES = [
  "#d4a13d",
  "#4a9d94",
  "#4d7fc4",
  "#d9682f",
  "#5a9e5e",
  "#c46d8f",
  "#7a8a9a",
  "#b8862f",
  "#3f9e8a",
  "#6b8fc4",
  "#c4562f",
  "#8a9e5a",
];

export function Avatar({ name, initials, colorSeed, size = "sm" }: AvatarProps) {
  const bg = AVATAR_HUES[colorSeed % AVATAR_HUES.length];
  const dimension = size === "sm" ? "h-6 w-6 text-[10px]" : "h-9 w-9 text-xs";

  return (
    <span
      className={`inline-flex ${dimension} shrink-0 items-center justify-center rounded-[var(--radius)] font-mono font-semibold text-[#0c0a08]`}
      style={{ backgroundColor: bg }}
      title={name}
      role="img"
      aria-label={name}
    >
      {initials}
    </span>
  );
}
