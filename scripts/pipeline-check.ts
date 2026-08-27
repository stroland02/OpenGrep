/**
 * End-to-end check of the review pipeline against the real database:
 * pull request -> diff -> engine -> stored review + comments -> analytics.
 */
import { PrismaClient } from "@prisma/client";
import { HeuristicReviewEngine } from "../src/lib/review-engine";
import { diffForPullRequest } from "../src/lib/sample-diffs";

const db = new PrismaClient();

async function main() {
  const org = await db.organization.findUnique({ where: { handle: "content-mobbin" } });
  if (!org) throw new Error("seed missing");

  const pr = await db.pullRequest.findFirst({
    where: { repo: { orgId: org.id } },
    include: { reviews: true },
  });
  if (!pr) throw new Error("no pull request");

  const before = pr.reviews.length;
  console.log(`PR #${pr.number} "${pr.title}" — ${before} reviews before`);

  const settings = await db.codeReviewSettings.findUnique({ where: { orgId: org.id } });
  const contexts = await db.customContext.findMany({ where: { orgId: org.id, active: true } });

  const result = await new HeuristicReviewEngine().reviewPullRequest({
    title: pr.title,
    branch: pr.branch,
    author: pr.author,
    files: diffForPullRequest(pr.id),
    strictness: (settings?.strictness ?? "MEDIUM") as "LOW" | "MEDIUM" | "HIGH",
    contexts: contexts.map((c) => ({
      id: c.id,
      description: c.description,
      filePattern: c.filePattern,
    })),
  });

  console.log(`engine produced ${result.findings.length} findings at strictness ${settings?.strictness}`);

  const review = await db.review.create({
    data: {
      pullRequestId: pr.id,
      status: "COMPLETED",
      summary: result.summary,
      confidenceScore: result.confidenceScore,
      sequenceDiagram: result.sequenceDiagram,
      comments: {
        create: result.findings.map((f) => ({
          filePath: f.filePath,
          line: f.line,
          severity: f.severity,
          body: f.body,
          rule: f.rule,
          contextId: f.contextId ?? null,
        })),
      },
    },
    include: { comments: true },
  });

  const after = await db.review.count({ where: { pullRequestId: pr.id } });
  console.log(`stored review ${review.id} with ${review.comments.length} comments`);
  console.log(`reviews: ${before} -> ${after}`);

  const attributed = review.comments.filter((c) => c.contextId).length;
  console.log(`comments attributed to a custom context: ${attributed}`);

  // Roll it back so the seed stays as shipped.
  await db.review.delete({ where: { id: review.id } });
  console.log(`rolled back; reviews back to ${await db.review.count({ where: { pullRequestId: pr.id } })}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
