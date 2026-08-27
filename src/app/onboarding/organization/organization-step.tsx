"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FieldLabel, Input } from "@/components/ui";
import { OnboardingCard, OnboardingShell } from "@/components/onboarding";
import { cn } from "@/lib/utils";
import { createOnboardingOrg } from "../actions";

const SIZES = ["JUST ME", "2-10", "11-50", "51-200", "201-1000", "1000+"];

export function OrganizationStep({
  seed,
}: {
  seed: { name: string; handle: string; website: string };
}) {
  const router = useRouter();
  const [name, setName] = React.useState(seed.name);
  const [handle, setHandle] = React.useState(seed.handle);
  const [website, setWebsite] = React.useState(seed.website);
  const [size, setSize] = React.useState("JUST ME");
  const [busy, setBusy] = React.useState(false);

  return (
    <OnboardingShell
      back="/onboarding"
      nextDisabled={!name.trim() || !handle.trim()}
      busy={busy}
      onNext={async () => {
        setBusy(true);
        const { handle: created } = await createOnboardingOrg({
          name,
          handle,
          website,
          companySize: size,
        });
        router.push(`/onboarding/survey?org=${created}`);
      }}
    >
      <OnboardingCard
        title="Create Your Organization"
        subtitle="Set up your team's workspace in OpenGrep."
      >
        <div className="space-y-5">
          <div>
            <FieldLabel required>Organization name</FieldLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <FieldLabel required>Handle</FieldLabel>
            <div className="flex h-11 items-center rounded-[8px] border border-line bg-surface">
              <span className="pl-3 text-[15px] text-ink-faint">opengrep.dev/</span>
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="h-full flex-1 bg-transparent pr-3 text-[15px] text-ink outline-none"
              />
            </div>
          </div>

          <div>
            <FieldLabel>Company website</FieldLabel>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>

          <div>
            <FieldLabel>Company size</FieldLabel>
            <div className="grid grid-cols-3 gap-2.5">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "mono-status rounded-[8px] border py-2.5 transition-colors",
                    size === s
                      ? "border-brand bg-[#d6f5e4] text-ink"
                      : "border-line bg-surface text-ink-muted hover:bg-surface-muted",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </OnboardingCard>
    </OnboardingShell>
  );
}
