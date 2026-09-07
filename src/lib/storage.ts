import type { Project } from "@/types/project";
import { buildSeedProjects } from "@/lib/mock-data";

const STORAGE_KEY = "yastudio:projects:v1";

/**
 * Reads projects from localStorage, seeding from mock data on first load.
 * Never throws — falls back to fresh seed data if storage is corrupted
 * or unavailable (e.g. private browsing, SSR).
 */
export function loadProjects(): Project[] {
  if (typeof window === "undefined") return buildSeedProjects();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = buildSeedProjects();
      saveProjects(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw) as Project[];
    if (!Array.isArray(parsed)) throw new Error("Corrupted project store");
    return parsed;
  } catch (error) {
    console.error("Failed to load projects from storage, reseeding.", error);
    const seeded = buildSeedProjects();
    saveProjects(seeded);
    return seeded;
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to persist projects to storage.", error);
  }
}

export function resetProjects(): Project[] {
  const seeded = buildSeedProjects();
  saveProjects(seeded);
  return seeded;
}
