import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { RepositoriesView } from "./repositories-view";

export const metadata = { title: "Repositories — OpenGrep" };

export default async function RepositoriesPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org } = await requireOrg(handle);

  const repos = await db.repository.findMany({
    where: { orgId: org.id },
    orderBy: [{ name: "asc" }],
    include: {
      pullRequests: {
        include: { reviews: { include: { comments: true } } },
      },
    },
  });

  // The metrics table shows only enabled repositories; disabled ones vanish
  // from it entirely and live in the Repo Settings modal (frames 46-50).
  const rows = repos
    .filter((r) => r.enabled)
    .map((r) => {
      const reviews = r.pullRequests.flatMap((pr) =>
        pr.reviews.filter((rev) => rev.status === "COMPLETED"),
      );
      const comments = reviews.flatMap((rev) => rev.comments);
      const merged = r.pullRequests.filter((pr) => pr.mergedAt);
      const mergeHours = merged.map(
        (pr) => (pr.mergedAt!.getTime() - pr.createdAt.getTime()) / 3_600_000,
      );
      const up = comments.reduce((n, c) => n + c.upvotes, 0);
      const down = comments.reduce((n, c) => n + c.downvotes, 0);

      return {
        id: r.id,
        label: `${r.owner}/${r.name}`,
        reviews: reviews.length,
        bugs: comments.filter((c) => c.severity === "P0").length,
        mergeHours: mergeHours.length
          ? mergeHours.reduce((a, b) => a + b, 0) / mergeHours.length
          : null,
        voteRatio: up + down ? Math.round((up / (up + down)) * 100) : null,
        prs: r.pullRequests.map((pr) => ({
          number: pr.number,
          title: pr.title,
          createdAt: pr.createdAt.toISOString(),
          updatedAt: pr.updatedAt.toISOString(),
          status: pr.status,
        })),
      };
    });

  const all = repos.map((r) => ({
    id: r.id,
    label: `${r.owner}/${r.name}`,
    enabled: r.enabled,
  }));

  return <RepositoriesView handle={handle} rows={rows} all={all} />;
}
