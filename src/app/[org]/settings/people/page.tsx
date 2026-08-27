import { requireOrg } from "@/lib/auth";
import { db } from "@/lib/db";
import { PeopleTab } from "./people-tab";

export const metadata = { title: "People — OpenGrep" };

export default async function PeoplePage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org, user, role } = await requireOrg(handle);

  const members = await db.membership.findMany({
    where: { orgId: org.id },
    orderBy: [{ status: "asc" }, { createdAt: "asc" }],
  });

  return (
    <PeopleTab
      handle={handle}
      isAdmin={role === "ADMIN"}
      members={members.map((m) => ({
        id: m.id,
        email: m.email,
        role: m.role as "ADMIN" | "MEMBER",
        status: m.status as "ACTIVE" | "PENDING",
        isYou: m.userId === user.id,
      }))}
    />
  );
}
