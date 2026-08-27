"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";

export async function setRepoEnabled(
  handle: string,
  repoIds: string[],
  enabled: boolean,
) {
  const { org } = await requireOrg(handle);

  // Scope the update by orgId as well as id — an id from another tenant must
  // not be actionable just because it was posted.
  await db.repository.updateMany({
    where: { id: { in: repoIds }, orgId: org.id },
    data: { enabled },
  });

  revalidatePath(`/${handle}/repositories`);
}

export async function setAllReposEnabled(handle: string, enabled: boolean) {
  const { org } = await requireOrg(handle);
  await db.repository.updateMany({ where: { orgId: org.id }, data: { enabled } });
  revalidatePath(`/${handle}/repositories`);
}
