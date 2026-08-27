"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FieldLabel, Input } from "@/components/ui";
import { OnboardingCard, OnboardingShell } from "@/components/onboarding";
import { saveName } from "./actions";

export function NameStep({ initial }: { initial: string }) {
  const router = useRouter();
  const [name, setName] = React.useState(initial);
  const [busy, setBusy] = React.useState(false);

  return (
    <OnboardingShell
      nextDisabled={!name.trim()}
      busy={busy}
      onNext={async () => {
        setBusy(true);
        await saveName(name);
        router.push("/onboarding/organization");
      }}
    >
      <OnboardingCard
        title="What's your name?"
        subtitle="Let's start by setting up your profile."
      >
        <FieldLabel required>Full name</FieldLabel>
        <Input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
        />
      </OnboardingCard>
    </OnboardingShell>
  );
}
