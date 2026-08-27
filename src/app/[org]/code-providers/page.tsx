import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { CodeProvidersView } from "./code-providers-view";

export const metadata = { title: "Code Providers — OpenGrep" };

export default async function CodeProvidersPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org } = await requireOrg(handle);

  const providers = await db.codeProvider.findMany({
    where: { orgId: org.id },
    include: { _count: { select: { repositories: true } } },
  });

  return (
    <CodeProvidersView
      handle={handle}
      providers={providers.map((p) => ({
        id: p.id,
        type: p.type as "GITHUB" | "GITLAB",
        accountName: p.accountName,
        teamCount: p.teamCount,
        repoCount: p._count.repositories,
        lastSyncAt: p.lastSyncAt?.toISOString() ?? null,
      }))}
    />
  );
}
