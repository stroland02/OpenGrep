import { requireOrg } from "@/lib/auth";
import { OrganizationTab } from "./organization-tab";

export const metadata = { title: "Organization Settings — OpenGrep" };

export default async function OrganizationSettingsPage({
  params,
}: {
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { org, role } = await requireOrg(handle);

  return (
    <OrganizationTab
      handle={handle}
      isAdmin={role === "ADMIN"}
      org={{
        name: org.name,
        handle: org.handle,
        telemetryEnabled: org.telemetryEnabled,
        featureTipsEnabled: org.featureTipsEnabled,
      }}
    />
  );
}
