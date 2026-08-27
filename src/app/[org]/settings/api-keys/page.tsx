import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { ApiKeysTab } from "./api-keys-tab";

export const metadata = { title: "API Keys — OpenGrep" };

export default async function ApiKeysPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org, role } = await requireOrg(handle);

  const keys = await db.apiKey.findMany({
    where: { orgId: org.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ApiKeysTab
      handle={handle}
      isAdmin={role === "ADMIN"}
      keys={keys.map((k) => ({
        id: k.id,
        name: k.name,
        prefix: k.prefix,
        createdAt: k.createdAt.toISOString(),
      }))}
    />
  );
}
