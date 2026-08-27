"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { getReviewEngine } from "@/lib/review-engine";

export async function createContext(
  handle: string,
  input: {
    type: "RULE" | "PATTERN";
    description: string;
    pattern?: string;
    repoId?: string;
    filePattern: string;
  },
) {
  const { org } = await requireOrg(handle);

  await db.customContext.create({
    data: {
      orgId: org.id,
      type: input.type,
      description: input.description,
      pattern: input.pattern ?? null,
      repoId: input.repoId || null,
      filePattern: input.filePattern || "auto",
      active: true,
    },
  });

  revalidatePath(`/${handle}/custom-context`);
}

export async function updateContext(
  handle: string,
  id: string,
  input: { description?: string; pattern?: string; filePattern?: string; active?: boolean },
) {
  const { org } = await requireOrg(handle);

  await db.customContext.updateMany({
    where: { id, orgId: org.id },
    data: input,
  });

  revalidatePath(`/${handle}/custom-context`);
}

/** Bulk deactivate is a soft toggle — rows stay in the list (frames 61-62). */
export async function setContextsActive(handle: string, ids: string[], active: boolean) {
  const { org } = await requireOrg(handle);
  await db.customContext.updateMany({
    where: { id: { in: ids }, orgId: org.id },
    data: { active },
  });
  revalidatePath(`/${handle}/custom-context`);
}

export async function deleteContexts(handle: string, ids: string[]) {
  const { org } = await requireOrg(handle);
  await db.customContext.deleteMany({ where: { id: { in: ids }, orgId: org.id } });
  revalidatePath(`/${handle}/custom-context`);
}

/**
 * The "Optimize" action. In the reference product this calls an LLM and can
 * fail loudly — frame 60 captures a raw 401 from its proxy surfacing to the
 * user. Here it runs through the same engine seam as everything else.
 */
export async function optimizeRule(handle: string, text: string) {
  await requireOrg(handle);
  try {
    return { ok: true as const, text: await getReviewEngine().optimizeRule(text) };
  } catch (e) {
    return {
      ok: false as const,
      error: e instanceof Error ? e.message : "Failed to generate rule.",
    };
  }
}
