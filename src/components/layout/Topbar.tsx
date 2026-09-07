"use client";

import { useState } from "react";
import { Bell, Sun, Moon, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { CURRENT_USER } from "@/lib/current-user";

const NOTIFICATION_COUNT = 3;

export function Topbar() {
  const [isLight, setIsLight] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-raised)] px-6">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent)]"
          aria-hidden="true"
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Live pipeline
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="focus-ring relative cursor-pointer rounded-[var(--radius)] p-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          aria-label={`Notifications, ${NOTIFICATION_COUNT} unread`}
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          {NOTIFICATION_COUNT > 0 && (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 font-mono text-[9px] font-bold text-[var(--color-accent-text)]">
              {NOTIFICATION_COUNT}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsLight((v) => !v)}
          className="focus-ring cursor-pointer rounded-[var(--radius)] p-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          aria-label="Toggle theme"
          aria-pressed={isLight}
        >
          {isLight ? (
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>

        <div className="mx-2 h-6 w-px bg-[var(--color-border)]" aria-hidden="true" />

        <Avatar
          name={CURRENT_USER.name}
          initials={CURRENT_USER.initials}
          colorSeed={CURRENT_USER.colorSeed}
        />
        <span className="hidden text-sm text-[var(--color-text)] sm:inline">
          {CURRENT_USER.name}
        </span>

        <button
          type="button"
          className="focus-ring cursor-pointer rounded-[var(--radius)] p-2 text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-accent)]"
          aria-label="Sign out"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
