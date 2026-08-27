"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { getReviewEngine } from "@/lib/review-engine";
import { diffForPullRequest } from "@/lib/sample-diffs";

/**
 * Re-runs OpenGrep against the selected pull requests.
 *
 * Status walks COMPLETED -> PENDING -> COMPLETED, and each run appends a new
 * review rather than replacing the previous one, so `# REVIEWS` counts passes
 * (frames 68-71).
 */
export async function rerunReviews(handle: string, pullRequestIds: string[]) {
  const { org } = await requireOrg(handle);

  const prs = await db.pullRequest.findMany({
    where: { id: { in: pullRequestIds }, repo: { orgId: org.id } },
  });
  if (prs.length === 0) return;

  await db.pullRequest.updateMany({
    where: { id: { in: prs.map((p) => p.id) } },
    data: { status: "PENDING" },
  });
  revalidatePath(`/${handle}/pull-requests`);

  const settings = await db.codeReviewSettings.findUnique({ where: { orgId: org.id } });
  const contexts = await db.customContext.findMany({
    where: { orgId: org.id, active: true },
  });

  const filters: { subject: string; operator: string; values: string[] }[] = JSON.parse(
    settings?.filters ?? "[]",
  );

  const engine = getReviewEngine();

  for (const pr of prs) {
    // Author filters are honoured here, not in the engine — they decide whether
    // a review runs at all, which is a policy question, not a model one.
    const excluded = filters.some(
      (f) =>
        f.subject === "Authors" &&
        f.operator === "Exclude" &&
        f.values.includes(pr.author),
    );

    if (excluded) {
      await db.pullRequest.update({
        where: { id: pr.id },
        data: { status: "COMPLETED" },
      });
      continue;
    }

    const result = await engine.reviewPullRequest({
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

    await db.review.create({
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
    });

    await db.pullRequest.update({
      where: { id: pr.id },
      data: { status: "COMPLETED" },
    });
  }

  revalidatePath(`/${handle}/pull-requests`);
  revalidatePath(`/${handle}/analytics`);
}

/** Upvote / downvote on a review comment, feeding the ratio metrics. */
export async function voteOnComment(
  handle: string,
  commentId: string,
  direction: "up" | "down",
) {
  const { org } = await requireOrg(handle);

  const comment = await db.reviewComment.findFirst({
    where: { id: commentId, review: { pullRequest: { repo: { orgId: org.id } } } },
  });
  if (!comment) return;

  await db.reviewComment.update({
    where: { id: commentId },
    data:
      direction === "up"
        ? { upvotes: { increment: 1 } }
        : { downvotes: { increment: 1 } },
  });

  revalidatePath(`/${handle}/pull-requests`);
}

export async function toggleAddressed(handle: string, commentId: string) {
  const { org } = await requireOrg(handle);

  const comment = await db.reviewComment.findFirst({
    where: { id: commentId, review: { pullRequest: { repo: { orgId: org.id } } } },
  });
  if (!comment) return;

  await db.reviewComment.update({
    where: { id: commentId },
    data: { addressed: !comment.addressed },
  });

  revalidatePath(`/${handle}/pull-requests`);
}
