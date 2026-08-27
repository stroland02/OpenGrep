"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";

export type SettingsPatch = Partial<{
  strictness: string;
  autoReviewOnNewCommits: boolean;
  reviewDraftPullRequests: boolean;
  fileChangeLimit: number;
  updateOriginalSummary: boolean;
  blocks: string;
  customInstructions: string;
  commentHeader: string;
  filters: string;
  codingAgents: string;
  statusChecks: boolean;
  autoEnableNewRepos: boolean;
}>;

export async function saveReviewSettings(handle: string, patch: SettingsPatch) {
  const { org } = await requireOrg(handle);

  await db.codeReviewSettings.upsert({
    where: { orgId: org.id },
    create: { orgId: org.id, ...patch },
    update: patch,
  });

  revalidatePath(`/${handle}/code-review-settings`);
}
