"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";

/**
 * Disconnecting drops the provider and everything derived from it — repos,
 * their pull requests and reviews all cascade. Irreversible, which is why the
 * UI gates it behind a confirmation dialog.
 */
export async function disconnectProvider(handle: string, providerId: string) {
  const { org } = await requireOrg(handle);
  await db.codeProvider.deleteMany({ where: { id: providerId, orgId: org.id } });
  revalidatePath(`/${handle}/code-providers`);
  revalidatePath(`/${handle}/repositories`);
}

/**
 * Connecting a provider. With no OAuth app registered there is nothing to call
 * out to, so this creates the connection and a representative repository set
 * rather than pretending a handshake happened.
 */
export async function connectProvider(handle: string, type: "GITHUB" | "GITLAB") {
  const { org } = await requireOrg(handle);

  const existing = await db.codeProvider.findFirst({ where: { orgId: org.id, type } });
  if (existing) return;

  const accountName = type === "GITHUB" ? "samleemobbin-dot" : "samleemobbin";
  const provider = await db.codeProvider.create({
    data: { orgId: org.id, type, accountName, teamCount: 1, lastSyncAt: new Date() },
  });

  const names = [
    "astrowind-lp",
    "docs",
    "doggy-stickers",
    "landingpage",
    "laravel",
    "mini-landing-page",
    "newlandingpage",
    "odyssey",
    "openreact-lp",
    "payload-website-starter",
    "tailwind-lp",
  ];

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
      update: { providerId: provider.id, enabled: true },
    });
  }

  revalidatePath(`/${handle}/code-providers`);
  revalidatePath(`/${handle}/repositories`);
}

export async function syncProvider(handle: string, providerId: string) {
  const { org } = await requireOrg(handle);
  await db.codeProvider.updateMany({
    where: { id: providerId, orgId: org.id },
    data: { lastSyncAt: new Date() },
  });
  revalidatePath(`/${handle}/code-providers`);
}
