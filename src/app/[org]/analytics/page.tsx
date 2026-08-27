import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { getAnalytics, type Timeframe } from "@/lib/analytics";
import { AnalyticsView } from "./analytics-view";

export const metadata = { title: "Analytics — OpenGrep" };

export default async function AnalyticsPage({
  params,
  searchParams,
}: {
  params: Promise<{ org: string }>;
  searchParams: Promise<{ t?: string; repo?: string; author?: string; sev?: string }>;
}) {
  const { org: handle } = await params;
  const sp = await searchParams;
  const { org } = await requireOrg(handle);

  const timeframe = (["7", "30", "60", "90"].includes(sp.t ?? "") ? sp.t : "7") as Timeframe;

  const [data, repos, authorRows] = await Promise.all([
    getAnalytics(org.id, {
      timeframe,
      repoId: sp.repo,
      author: sp.author,
      severity: (sp.sev as "P0" | "P1" | "P2" | "all") ?? "all",
    }),
    db.repository.findMany({
      where: { orgId: org.id, enabled: true },
      orderBy: [{ owner: "asc" }, { name: "asc" }],
      select: { id: true, owner: true, name: true },
    }),
    db.pullRequest.findMany({
      where: { repo: { orgId: org.id } },
      distinct: ["author"],
      select: { author: true },
    }),
  ]);

  return (
    <AnalyticsView
      data={data}
      repos={repos.map((r) => ({ id: r.id, label: `${r.owner}/${r.name}` }))}
      authors={authorRows.map((a) => a.author).filter(Boolean)}
      timeframe={timeframe}
      selectedRepo={sp.repo}
      selectedAuthor={sp.author}
      orgName={org.name}
    />
  );
}
