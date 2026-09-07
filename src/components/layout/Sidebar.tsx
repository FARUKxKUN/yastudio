"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  BarChart3,
  Images,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { CURRENT_USER } from "@/lib/current-user";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/stats", label: "My Stats", icon: BarChart3 },
  { href: "/dashboard/gallery", label: "Gallery", icon: Images },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-raised)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] bg-[var(--color-accent)] font-display text-sm font-bold text-[var(--color-accent-text)]">
          YA
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-[var(--color-text)]">
            YAStudio
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
            Edit Pipeline
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-5 py-4">
        <Avatar
          name={CURRENT_USER.name}
          initials={CURRENT_USER.initials}
          colorSeed={CURRENT_USER.colorSeed}
          size="md"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--color-text)]">
            {CURRENT_USER.name}
          </p>
          <p className="truncate font-mono text-[11px] text-[var(--color-text-faint)]">
            {CURRENT_USER.email}
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring flex cursor-pointer items-center gap-3 rounded-[var(--radius)] px-3 py-2.5 text-sm transition-all duration-200 ${
                isActive
                  ? "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border-strong)]"
                  : "border border-transparent text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {item.label}
              {isActive && (
                <span
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
