import "server-only";
import { db } from "./db";
import { axisDate } from "./utils";
import type { AnalyticsData, AnalyticsFilters, Bucket, Leader } from "./analytics-shared";

export * from "./analytics-shared";

export async function getAnalytics(
  orgId: string,
  filters: AnalyticsFilters,
): Promise<AnalyticsData> {
  const days = Number(filters.timeframe);
  const since = new Date();
  since.setHours(0, 0, 0, 0);
  since.setDate(since.getDate() - (days - 1));

  const repos = await db.repository.findMany({
    where: { orgId, enabled: true, ...(filters.repoId ? { id: filters.repoId } : {}) },
    include: {
      pullRequests: {
        where: filters.author ? { author: filters.author } : undefined,
        include: { reviews: { include: { comments: true } } },
      },
    },
  });

  // Flatten to the two grains the dashboard actually reports on: completed
  // reviews, and the comments those reviews produced.
  const reviews = repos.flatMap((r) =>
    r.pullRequests.flatMap((pr) =>
      pr.reviews
        .filter((rev) => rev.status === "COMPLETED" && rev.createdAt >= since)
        .map((rev) => ({ repo: r, pr, review: rev })),
    ),
  );

  const comments = reviews.flatMap(({ repo, review }) =>
    review.comments.map((c) => ({ repo, comment: c, at: review.createdAt })),
  );

  const severityFiltered =
    filters.severity && filters.severity !== "all"
      ? comments.filter((c) => c.comment.severity === filters.severity)
      : comments;

  // Critical == P0. The KPI counts them; the chart plots them per day.
  const critical = severityFiltered.filter((c) => c.comment.severity === "P0");

  const buckets: Bucket[] = [];
  for (let i = 0; i < days; i++) {
    const start = new Date(since);
    start.setDate(start.getDate() + i);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const inDay = reviews.filter(
      ({ review }) => review.createdAt >= start && review.createdAt < end,
    );
    const dayComments = severityFiltered.filter((c) => c.at >= start && c.at < end);
    const dayCritical = critical.filter((c) => c.at >= start && c.at < end);

    const merged = inDay
      .map(({ pr }) => pr)
      .filter((pr) => pr.mergedAt)
      .map((pr) => (pr.mergedAt!.getTime() - pr.createdAt.getTime()) / 3_600_000);

    const addressedInDay = dayComments.filter((c) => c.comment.addressed).length;
    const up = dayComments.reduce((n, c) => n + c.comment.upvotes, 0);
    const down = dayComments.reduce((n, c) => n + c.comment.downvotes, 0);

    buckets.push({
      label: axisDate(start),
      reviews: inDay.length,
      bugs: dayCritical.length,
      addressed: dayComments.length ? (addressedInDay / dayComments.length) * 100 : 0,
      mergeHours: merged.length ? merged.reduce((a, b) => a + b, 0) / merged.length : null,
      upvoteRatio: up + down ? (up / (up + down)) * 100 : 0,
    });
  }

  const mergeSamples = reviews
    .map(({ pr }) => pr)
    .filter((pr) => pr.mergedAt)
    .map((pr) => (pr.mergedAt!.getTime() - pr.createdAt.getTime()) / 3_600_000);

  const addressedTotal = severityFiltered.filter((c) => c.comment.addressed).length;
  const upTotal = comments.reduce((n, c) => n + c.comment.upvotes, 0);
  const downTotal = comments.reduce((n, c) => n + c.comment.downvotes, 0);

  const byRepo = <T,>(
    source: { repo: { owner: string; name: string } }[],
    format: (n: number) => string,
    pick?: (items: T[]) => number,
  ): Leader[] => {
    const counts = new Map<string, number>();
    for (const item of source) {
      const key = `${item.repo.owner}/${item.repo.name}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    void pick;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, n]) => ({ name, value: format(n) }));
  };

  // Addressed rate per repo needs a ratio, not a count, so it is built directly.
  const addressedByRepo = new Map<string, { total: number; done: number }>();
  for (const c of severityFiltered) {
    const key = `${c.repo.owner}/${c.repo.name}`;
    const row = addressedByRepo.get(key) ?? { total: 0, done: 0 };
    row.total += 1;
    if (c.comment.addressed) row.done += 1;
    addressedByRepo.set(key, row);
  }

  const mergeByRepo = new Map<string, number[]>();
  for (const { repo, pr } of reviews) {
    if (!pr.mergedAt) continue;
    const key = `${repo.owner}/${repo.name}`;
    const hours = (pr.mergedAt.getTime() - pr.createdAt.getTime()) / 3_600_000;
    mergeByRepo.set(key, [...(mergeByRepo.get(key) ?? []), hours]);
  }

  return {
    totalReviews: reviews.length,
    avgMergeTime: mergeSamples.length
      ? formatHours(mergeSamples.reduce((a, b) => a + b, 0) / mergeSamples.length)
      : "-",
    addressedRate: severityFiltered.length
      ? Math.round((addressedTotal / severityFiltered.length) * 100)
      : 0,
    addressedCount: addressedTotal,
    criticalBugs: critical.length,
    criticalBugRepos: new Set(critical.map((c) => `${c.repo.owner}/${c.repo.name}`)).size,
    buckets,
    topReposByReviews: byRepo(reviews, (n) => String(n)),
    reposWithMostBugs: byRepo(critical, (n) => String(n)),
    topReposByAddressed: [...addressedByRepo.entries()]
      .map(([name, r]) => ({
        name,
        value: `${r.total ? Math.round((r.done / r.total) * 100) : 0}%`,
        sort: r.total ? r.done / r.total : 0,
      }))
      .sort((a, b) => b.sort - a.sort)
      .slice(0, 5)
      .map(({ name, value }) => ({ name, value })),
    topReposByMergeTime: [...mergeByRepo.entries()]
      .map(([name, hs]) => ({
        name,
        avg: hs.reduce((a, b) => a + b, 0) / hs.length,
      }))
      .sort((a, b) => a.avg - b.avg)
      .slice(0, 5)
      .map(({ name, avg }) => ({ name, value: formatHours(avg) })),
    mostUpvotedComments: comments
      .filter((c) => c.comment.upvotes > 0)
      .sort((a, b) => b.comment.upvotes - a.comment.upvotes)
      .slice(0, 5)
      .map((c) => ({
        name: `${c.comment.filePath}:${c.comment.line}`,
        value: String(c.comment.upvotes),
      })),
    upvotePct: upTotal + downTotal ? Math.round((upTotal / (upTotal + downTotal)) * 100) : 0,
    downvotePct:
      upTotal + downTotal ? Math.round((downTotal / (upTotal + downTotal)) * 100) : 0,
  };
}

function formatHours(h: number): string {
  const d = h / 24;
  return d >= 1 ? `${d.toFixed(1)}d` : `${Math.round(h)}h`;
}
