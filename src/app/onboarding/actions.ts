"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { slugify, uniqueHandle, isReservedHandle } from "@/lib/org";

export async function saveName(name: string) {
  const user = await requireUser();
  await db.user.update({ where: { id: user.id }, data: { name: name.trim() } });
  revalidatePath("/onboarding");
}

export async function createOnboardingOrg(input: {
  name: string;
  handle: string;
  website: string;
  companySize: string;
}) {
  const user = await requireUser();

  const handle = isReservedHandle(slugify(input.handle))
    ? await uniqueHandle(slugify(input.name))
    : await uniqueHandle(slugify(input.handle));

  const org = await db.organization.create({
    data: {
      name: input.name.trim(),
      handle,
      website: input.website.trim() || null,
      companySize: input.companySize,
      trialEndsAt: new Date(Date.now() + 14 * 86_400_000),
      reviewSettings: { create: {} },
      memberships: {
        create: { userId: user.id, email: user.email, role: "ADMIN", status: "ACTIVE" },
      },
    },
  });

  return { handle: org.handle };
}

export async function saveSurvey(challenges: string[], heardAboutUs: string) {
  const user = await requireUser();
  await db.user.update({
    where: { id: user.id },
    data: { challenges: JSON.stringify(challenges), heardAboutUs },
  });
}

/**
 * Enables the chosen repositories and creates the provider connection. With no
 * GitHub App installed there is nothing to call, so this records the selection
 * and moves on rather than simulating a handshake.
 */
export async function enableRepositories(orgHandle: string, names: string[]) {
  const user = await requireUser();

  const org = await db.organization.findUnique({ where: { handle: orgHandle } });
  if (!org) return;

  const membership = await db.membership.findFirst({
    where: { orgId: org.id, userId: user.id, status: "ACTIVE" },
  });
  if (!membership) return;

  const accountName = "samleemobbin-dot";
  const provider = await db.codeProvider.upsert({
    where: { orgId_type: { orgId: org.id, type: "GITHUB" } },
    create: {
      orgId: org.id,
      type: "GITHUB",
      accountName,
      teamCount: 1,
      lastSyncAt: new Date(),
    },
    update: { lastSyncAt: new Date() },
  });

  for (const name of names) {
    await db.repository.upsert({
      where: { orgId_owner_name: { orgId: org.id, owner: accountName, name } },
      create: {
        orgId: org.id,
        providerId: provider.id,
        owner: accountName,
        name,
        defaultBranch: "main",
        enabled: true,
      },
      update: { enabled: true },
    });
  }

  // Instruction files discovered during indexing become pattern contexts.
  const newlanding = await db.repository.findFirst({
    where: { orgId: org.id, name: "newlandingpage" },
  });
  if (newlanding) {
    const exists = await db.customContext.findFirst({
      where: { orgId: org.id, type: "PATTERN" },
    });
    if (!exists) {
      await db.customContext.create({
        data: {
          orgId: org.id,
          type: "PATTERN",
          description: "Agents.md files",
          pattern: "**/[Aa][Gg][Ee][Nn][Tt][Ss].md",
          repoId: newlanding.id,
          filePattern: "auto",
          files: { create: { path: "AGENTS.md", repoId: newlanding.id } },
        },
      });
    }
  }

  revalidatePath(`/${orgHandle}/repositories`);
}

export async function saveReviewConfig(
  orgHandle: string,
  input: {
    strictness?: string;
    autoReviewOnNewCommits?: boolean;
    updateOriginalSummary?: boolean;
    blocks?: string;
    codingAgents?: string;
  },
) {
  await requireUser();
  const org = await db.organization.findUnique({ where: { handle: orgHandle } });
  if (!org) return;

  await db.codeReviewSettings.upsert({
    where: { orgId: org.id },
    create: { orgId: org.id, ...input },
    update: input,
  });
}

export async function inviteDuringOnboarding(orgHandle: string, emails: string[], role: string) {
  await requireUser();
  const org = await db.organization.findUnique({ where: { handle: orgHandle } });
  if (!org) return 0;

  let queued = 0;
  for (const raw of emails) {
    const email = raw.trim().toLowerCase();
    if (!email) continue;

    const existing = await db.membership.findFirst({ where: { orgId: org.id, email } });
    if (existing) continue;

    const user = await db.user.findUnique({ where: { email } });
    await db.membership.create({
      data: {
        orgId: org.id,
        email,
        userId: user?.id ?? null,
        role: role === "ADMIN" ? "ADMIN" : "MEMBER",
        status: "PENDING",
      },
    });
    queued++;
  }

  return queued;
}

export async function completeOnboarding() {
  const user = await requireUser();
  await db.user.update({ where: { id: user.id }, data: { onboardedAt: new Date() } });
}
