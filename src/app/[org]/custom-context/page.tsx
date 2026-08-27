import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { CustomContextView } from "./custom-context-view";

export const metadata = { title: "Custom Context — OpenGrep" };

export default async function CustomContextPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org } = await requireOrg(handle);

  const [contexts, repos] = await Promise.all([
    db.customContext.findMany({
      where: { orgId: org.id },
      orderBy: { updatedAt: "desc" },
      include: {
        repo: true,
        files: { include: { repo: true } },
        comments: true,
      },
    }),
    db.repository.findMany({
      where: { orgId: org.id, enabled: true },
      orderBy: { name: "asc" },
      select: { id: true, owner: true, name: true },
    }),
  ]);

  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  return (
    <CustomContextView
      handle={handle}
      orgName={org.name}
      repos={repos.map((r) => ({ id: r.id, label: `${r.owner}/${r.name}`, short: r.name }))}
      rows={contexts.map((c) => {
        const used = c.comments;
        const addressed = used.filter((x) => x.addressed).length;
        const up = used.reduce((n, x) => n + x.upvotes, 0);
        const down = used.reduce((n, x) => n + x.downvotes, 0);

        return {
          id: c.id,
          type: c.type as "RULE" | "PATTERN",
          description: c.description,
          pattern: c.pattern,
          filePattern: c.filePattern,
          scope: c.repo ? c.repo.name : org.name,
          scopeIsOrg: !c.repo,
          repoId: c.repoId,
          active: c.active,
          updatedAt: c.updatedAt.toISOString(),
          fileCount: c.files.length,
          files: c.files.map((f) => ({
            path: f.path,
            sourceRepo: `${f.repo.owner}/${f.repo.name}`,
          })),
          metrics: {
            usageCount: used.length,
            acceptanceRate: used.length ? Math.round((addressed / used.length) * 100) : 0,
            usesThisMonth: used.filter((x) => x.createdAt >= monthStart).length,
            upvoteRatio: up + down ? Math.round((up / (up + down)) * 100) : 0,
            downvoteRatio: up + down ? Math.round((down / (up + down)) * 100) : 0,
          },
        };
      })}
    />
  );
}
