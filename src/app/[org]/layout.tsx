import { requireOrg, listOrgs } from "@/lib/auth";
import { AppHeader, TabNav, TrialBanner, SupportBubble } from "@/components/app-shell";

export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;
  const { user, org, role } = await requireOrg(handle);
  const orgs = await listOrgs(user.id);

  const shellOrg = {
    id: org.id,
    name: org.name,
    handle: org.handle,
    trialEndsAt: org.trialEndsAt.toISOString(),
  };

  return (
    <div className="min-h-screen bg-canvas">
      <TrialBanner org={shellOrg} />
      <AppHeader
        org={shellOrg}
        orgs={orgs.map((o) => ({
          id: o.id,
          name: o.name,
          handle: o.handle,
          trialEndsAt: o.trialEndsAt.toISOString(),
        }))}
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
        }}
        role={role}
      />
      <TabNav handle={org.handle} />
      <main className="mx-auto w-full max-w-[1520px] px-6 py-8">{children}</main>
      <SupportBubble />
    </div>
  );
}
