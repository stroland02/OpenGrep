import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { CodeReviewSettingsView } from "./settings-view";

export const metadata = { title: "Code Review Settings — OpenGrep" };

export default async function CodeReviewSettingsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org } = await requireOrg(handle);

  const settings =
    (await db.codeReviewSettings.findUnique({ where: { orgId: org.id } })) ??
    (await db.codeReviewSettings.create({ data: { orgId: org.id } }));

  return (
    <CodeReviewSettingsView
      handle={handle}
      settings={{
        strictness: settings.strictness,
        autoReviewOnNewCommits: settings.autoReviewOnNewCommits,
        reviewDraftPullRequests: settings.reviewDraftPullRequests,
        fileChangeLimit: settings.fileChangeLimit,
        updateOriginalSummary: settings.updateOriginalSummary,
        blocks: settings.blocks,
        customInstructions: settings.customInstructions,
        commentHeader: settings.commentHeader,
        filters: settings.filters,
        codingAgents: settings.codingAgents,
        statusChecks: settings.statusChecks,
        autoEnableNewRepos: settings.autoEnableNewRepos,
      }}
    />
  );
}
