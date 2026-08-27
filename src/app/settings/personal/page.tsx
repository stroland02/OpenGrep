import { requireUser } from "@/lib/auth";
import { AccountSettings } from "./account-settings";

export const metadata = { title: "Account Settings — OpenGrep" };

export default async function PersonalAccountPage() {
  const user = await requireUser();

  return (
    <AccountSettings
      user={{
        name: user.name,
        email: user.email,
        weeklyDigest: user.weeklyDigest,
      }}
      orgs={user.memberships
        .filter((m) => m.status === "ACTIVE")
        .map((m) => ({ membershipId: m.id, name: m.org.name, role: m.role }))}
      linked={user.linkedAccounts.map((a) => ({
        provider: a.provider,
        handle: a.handle,
      }))}
      integrations={user.integrations.map((i) => ({ name: i.name, status: i.status }))}
    />
  );
}
