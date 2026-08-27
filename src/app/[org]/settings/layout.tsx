import { SettingsRail } from "./settings-rail";

/**
 * Unlike the Code Review Settings rail, this one is a real router — each item
 * is its own route (frames 92-97).
 */
export default async function OrgSettingsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ org: string }>;
}) {
  const { org: handle } = await params;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-[30px] font-semibold tracking-tight text-ink">
          Organization Settings
        </h1>
        <p className="mt-1 text-[15px] text-ink-muted">
          Manage your organization&apos;s configuration and preferences.
        </p>
      </div>

      <div className="flex gap-10">
        <SettingsRail handle={handle} />
        <div className="min-w-0 flex-1 pb-20">{children}</div>
      </div>
    </>
  );
}
