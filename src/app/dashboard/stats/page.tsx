"use client";

import { useMemo } from "react";
import { FolderKanban, RotateCcw, CheckCircle2, TrendingUp } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { PEOPLE } from "@/lib/mock-data";
import { StatTile } from "@/components/stats/StatTile";
import { EditorLeaderboard } from "@/components/stats/EditorLeaderboard";

export default function StatsPage() {
  const { projects, isReady } = useProjects();

  const editors = useMemo(() => PEOPLE.filter((p) => p.role === "editor"), []);

  const summary = useMemo(() => {
    const active = projects.filter((p) => p.stage !== "approved").length;
    const inRevision = projects.filter((p) => p.stage === "revision").length;
    const approved = projects.filter((p) => p.stage === "approved").length;
    const totalRevisions = projects.reduce((sum, p) => sum + p.revisionsUsed, 0);
    const avgRevisions = projects.length === 0 ? "0.0" : (totalRevisions / projects.length).toFixed(1);
    return { active, inRevision, approved, avgRevisions };
  }, [projects]);

  if (!isReady) {
    return (
      <div className="flex h-full items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Loading stats...
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-text)]">My Stats</h1>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Pipeline throughput across {projects.length} projects
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile
          icon={FolderKanban}
          label="Active Projects"
          value={summary.active.toString().padStart(2, "0")}
          accent="var(--color-stage-progress)"
        />
        <StatTile
          icon={RotateCcw}
          label="In Revision"
          value={summary.inRevision.toString().padStart(2, "0")}
          accent="var(--color-stage-revision)"
        />
        <StatTile
          icon={CheckCircle2}
          label="Approved"
          value={summary.approved.toString().padStart(2, "0")}
          accent="var(--color-stage-approved)"
        />
        <StatTile
          icon={TrendingUp}
          label="Avg Revisions"
          value={summary.avgRevisions}
          accent="var(--color-accent)"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-faint)]">
          Editor Throughput
        </h2>
        <EditorLeaderboard editors={editors} projects={projects} />
      </div>
    </div>
  );
}
