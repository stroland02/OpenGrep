/**
 * Analytics types and pure helpers.
 *
 * Kept separate from `analytics.ts` because the dashboard's client component
 * needs these, and `analytics.ts` is server-only (it touches the database).
 */

export type Timeframe = "7" | "30" | "60" | "90";

export const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  // The menu and the applied chip disagree on casing in the reference product
  // ("Last 60 days" vs "Last 60 Days"). Reproduced deliberately.
  "7": "Last 7 days",
  "30": "Last 30 days",
  "60": "Last 60 days",
  "90": "Last 90 days",
};

export const APPLIED_LABELS: Record<Timeframe, string> = {
  "7": "This week",
  "30": "Last 30 Days",
  "60": "Last 60 Days",
  "90": "Last 90 Days",
};

export interface AnalyticsFilters {
  timeframe: Timeframe;
  repoId?: string;
  author?: string;
  severity?: "P0" | "P1" | "P2" | "all";
}

export interface Bucket {
  label: string;
  reviews: number;
  bugs: number;
  addressed: number; // percent
  mergeHours: number | null;
  upvoteRatio: number;
}

export interface Leader {
  name: string;
  value: string;
}

export interface AnalyticsData {
  totalReviews: number;
  avgMergeTime: string;
  addressedRate: number;
  addressedCount: number;
  criticalBugs: number;
  criticalBugRepos: number;
  buckets: Bucket[];
  topReposByReviews: Leader[];
  reposWithMostBugs: Leader[];
  topReposByAddressed: Leader[];
  topReposByMergeTime: Leader[];
  mostUpvotedComments: Leader[];
  upvotePct: number;
  downvotePct: number;
}

/** Rows for the Export button, which downloads the current view as CSV. */
export function analyticsToCsv(data: AnalyticsData): string {
  const head = ["date", "reviews", "critical_bugs", "addressed_rate", "avg_merge_hours"];
  const rows = data.buckets.map((b) => [
    b.label,
    b.reviews,
    b.bugs,
    `${Math.round(b.addressed)}%`,
    b.mergeHours === null ? "" : b.mergeHours.toFixed(1),
  ]);
  return [head, ...rows].map((r) => r.join(",")).join("\n");
}
