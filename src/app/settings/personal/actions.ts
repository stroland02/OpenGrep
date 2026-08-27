"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser, destroySession } from "@/lib/auth";

export async function updateProfile(input: { name?: string; weeklyDigest?: boolean }) {
  const user = await requireUser();
  await db.user.update({ where: { id: user.id }, data: input });
  revalidatePath("/settings/personal");
}

export async function updateReviewPrefs(input: {
  showAiFixPrompts?: boolean;
  personalSummary?: boolean;
  personalSummaryOpen?: boolean;
  personalIssuesTable?: boolean;
}) {
  const user = await requireUser();
  await db.user.update({ where: { id: user.id }, data: input });
  revalidatePath("/settings/personal/review");
}

export async function linkAccount(provider: "GITHUB" | "GITLAB") {
  const user = await requireUser();

  // No OAuth app is registered, so this records the link rather than
  // performing a handshake. Personal review settings unlock either way.
  await db.linkedAccount.upsert({
    where: { userId_provider: { userId: user.id, provider } },
    create: {
      userId: user.id,
      provider,
      handle: user.email.split("@")[0],
    },
    update: {},
  });

  revalidatePath("/settings/personal");
  revalidatePath("/settings/personal/review");
}

export async function unlinkAccount(provider: string) {
  const user = await requireUser();
  await db.linkedAccount.deleteMany({ where: { userId: user.id, provider } });
  revalidatePath("/settings/personal");
}

export async function configureIntegration(name: string) {
  const user = await requireUser();
  const current = await db.personalIntegration.findFirst({
    where: { userId: user.id, name },
  });

  await db.personalIntegration.upsert({
    where: { userId_name: { userId: user.id, name } },
    create: { userId: user.id, name, status: "CONNECTED" },
    update: { status: current?.status === "CONNECTED" ? "NOT_CONFIGURED" : "CONNECTED" },
  });

  revalidatePath("/settings/personal");
}

/**
 * Deletion is gated on leaving every organization first — the Danger Zone copy
 * switches once that gate is satisfied (frames 121 vs 124).
 */
export async function deleteAccount(phrase: string) {
  const user = await requireUser();
  if (phrase !== "DELETE") {
    return { ok: false as const, error: "Type DELETE to confirm." };
  }

  const memberships = await db.membership.count({
    where: { userId: user.id, status: "ACTIVE" },
  });
  if (memberships > 0) {
    return {
      ok: false as const,
      error: "You must leave or delete all organizations before deleting your account.",
    };
  }

  await destroySession();
  await db.user.delete({ where: { id: user.id } });
  return { ok: true as const };
}

export async function leaveOrganization(membershipId: string) {
  const user = await requireUser();
  await db.membership.deleteMany({ where: { id: membershipId, userId: user.id } });
  revalidatePath("/settings/personal");
}
