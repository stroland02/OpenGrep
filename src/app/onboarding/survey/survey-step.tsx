"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Checkbox, FieldLabel, Select } from "@/components/ui";
import { OnboardingCard, OnboardingShell } from "@/components/onboarding";
import { saveSurvey } from "../actions";

const CHALLENGES = [
  "Slow PR reviews",
  "Previous AI tools didn't work well",
  "Too many bugs",
  "Improve code quality",
  "Team scaling",
  "Other",
];

const SOURCES = [
  "Friend or Colleague",
  "Google",
  "HackerNews",
  "LinkedIn",
  "Open Source Repository",
  "Reddit",
  "Theo",
  "X (Twitter)",
  "Other",
];

export function SurveyStep({ org }: { org: string }) {
  const router = useRouter();
  const [checked, setChecked] = React.useState<string[]>([]);
  const [source, setSource] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  function toggle(c: string) {
    setChecked((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  return (
    <OnboardingShell
      back="/onboarding/organization"
      busy={busy}
      onNext={async () => {
        setBusy(true);
        await saveSurvey(checked, source);
        router.push(`/onboarding/connect?org=${org}`);
      }}
    >
      <OnboardingCard
        title="What brought you to OpenGrep?"
        subtitle="Help us understand your needs so we can serve you better."
      >
        <FieldLabel>Describe the challenges you&apos;re facing</FieldLabel>
        <div className="space-y-2.5">
          {CHALLENGES.map((c) => (
            <button
              key={c}
              onClick={() => toggle(c)}
              className="flex h-[58px] w-full items-center gap-3 rounded-[8px] border border-line px-4 text-left hover:bg-surface-muted/60"
            >
              <Checkbox checked={checked.includes(c)} />
              <span className="text-[15px] text-ink">{c}</span>
            </button>
          ))}
        </div>

        <div className="mt-7">
          <FieldLabel>How did you hear about us?</FieldLabel>
          <Select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="">Select a source</option>
            {SOURCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
      </OnboardingCard>
    </OnboardingShell>
  );
}
