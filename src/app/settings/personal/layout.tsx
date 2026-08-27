import Link from "next/link";
import { ChevronLeft, BookOpen, Gift } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { PersonalRail } from "./personal-rail";
import { SupportBubble } from "@/components/app-shell";

export default async function PersonalSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  const firstOrg = user.memberships.find((m) => m.status === "ACTIVE")?.org;

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex h-[62px] items-center justify-between border-b border-line bg-surface px-6">
        <Link
          href={firstOrg ? `/${firstOrg.handle}/analytics` : "/"}
          className="inline-flex items-center gap-1.5 text-[15px] text-ink-muted hover:text-ink"
        >
          <ChevronLeft className="size-4" />
          Back
        </Link>
        <p className="text-[16px] font-semibold text-ink">Personal Settings</p>
        <div className="flex items-center gap-1">
          <span className="rounded p-2 text-ink-muted">
            <BookOpen className="size-5" />
          </span>
          <span className="rounded p-2 text-ink-muted">
            <Gift className="size-5" />
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1300px] px-6 py-8">
        <div className="mb-6">
          <h1 className="text-[32px] font-semibold tracking-tight text-ink">
            Personal Settings
          </h1>
          <p className="mt-1 text-[15px] text-ink-muted">
            Manage your profile, preferences, and integrations.
          </p>
        </div>

        <div className="flex gap-10">
          <PersonalRail />
          <div className="min-w-0 flex-1 pb-20">{children}</div>
        </div>
      </main>

      <SupportBubble />
    </div>
  );
}
