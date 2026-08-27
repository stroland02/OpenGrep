import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { PullRequestsView } from "./pull-requests-view";

export const metadata = { title: "Pull Requests — OpenGrep" };

export default async function PullRequestsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org } = await requireOrg(handle);

  const prs = await db.pullRequest.findMany({
    where: { repo: { orgId: org.id } },
    orderBy: { updatedAt: "desc" },
    include: {
      repo: true,
      reviews: {
        orderBy: { createdAt: "desc" },
        include: { comments: { orderBy: { severity: "asc" } } },
      },
    },
  });

  return (
    <PullRequestsView
      handle={handle}
      rows={prs.map((pr) => ({
        id: pr.id,
        number: pr.number,
        title: pr.title,
        repo: pr.repo.name,
        branch: pr.branch,
        status: pr.status,
        reviewCount: pr.reviews.filter((r) => r.status === "COMPLETED").length,
        updatedAt: pr.updatedAt.toISOString(),
        latest: pr.reviews[0]
          ? {
              summary: pr.reviews[0].summary,
              confidenceScore: pr.reviews[0].confidenceScore,
              sequenceDiagram: pr.reviews[0].sequenceDiagram,
              comments: pr.reviews[0].comments.map((c) => ({
                id: c.id,
                filePath: c.filePath,
                line: c.line,
                severity: c.severity,
                body: c.body,
                addressed: c.addressed,
                upvotes: c.upvotes,
                downvotes: c.downvotes,
              })),
            }
          : null,
      }))}
    />
  );
}
