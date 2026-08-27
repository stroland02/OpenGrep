import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { IntegrationsView } from "./integrations-view";

export const metadata = { title: "Integrations — OpenGrep" };

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org } = await requireOrg(handle);

  const settings = await db.codeReviewSettings.findUnique({ where: { orgId: org.id } });
  let agents: string[] = [];
  try {
    agents = JSON.parse(settings?.codingAgents ?? "[]");
  } catch {
    agents = [];
  }

  return <IntegrationsView handle={handle} agents={agents} />;
}
