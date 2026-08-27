"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { Logo } from "@/components/logo";
import { OnboardingCard, OnboardingShell } from "@/components/onboarding";

export function BillingStep({ org }: { org: string }) {
  const router = useRouter();

  return (
    <OnboardingShell
      back={`/onboarding/invite?org=${org}`}
      nextLabel="Skip"
      onNext={() => router.push(`/onboarding/complete?org=${org}`)}
    >
      <OnboardingCard width={650}>
        <div className="flex flex-col items-center py-6 text-center">
          <Logo size={48} className="rounded-[10px]" />
          <h1 className="mt-5 text-[30px] font-bold tracking-tight text-ink">
            You get a 14-day free trial
          </h1>
          <p className="mt-2 max-w-[420px] text-[15px] text-ink-muted">
            You can add a payment method now to use OpenGrep without disruption.
          </p>
          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => router.push(`/${org}/settings/billing`)}
          >
            Add Payment Method
          </Button>
        </div>
      </OnboardingCard>
    </OnboardingShell>
  );
}
