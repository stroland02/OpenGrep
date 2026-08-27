"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button, useToast } from "@/components/ui";
import { Logo } from "@/components/logo";
import { OnboardingCard, OnboardingShell } from "@/components/onboarding";
import { completeOnboarding } from "../actions";

/**
 * The closing screen teaches the product's core loop: reply to an OpenGrep
 * comment in plain language and it keeps that as durable review context.
 */
export function CompleteStep({ org }: { org: string }) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = React.useState(false);

  return (
    <OnboardingShell
      nextLabel="Finish"
      busy={busy}
      onNext={async () => {
        setBusy(true);
        await completeOnboarding();
        toast.push({ title: "Onboarding Complete!", body: "Welcome to OpenGrep!" });
        router.push(`/${org}/analytics`);
      }}
    >
      <OnboardingCard width={645}>
        <div className="flex items-center justify-center gap-3">
          <CheckCircle2 className="size-8 text-success" />
          <h1 className="text-[30px] font-bold tracking-tight text-ink">All done!</h1>
        </div>

        <div className="mt-8 rounded-[8px] bg-surface-muted p-6">
          <div className="overflow-hidden rounded-[8px] border border-line bg-surface">
            <div className="border-b border-line bg-surface-muted px-4 py-2.5">
              <span className="font-mono text-[13px] text-ink">utils.py</span>
            </div>

            <div className="space-y-1.5 bg-[#f0fdf4] px-4 py-3">
              {[4, 5, 6, 7].map((n) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="w-5 text-right font-mono text-[11px] text-ink-faint">
                    {n}
                  </span>
                  <span className="font-mono text-[11px] text-success">+</span>
                  <span className="h-2 flex-1 rounded bg-[#dcdcd8]" style={{ maxWidth: `${55 + n * 6}%` }} />
                </div>
              ))}
            </div>

            <div className="space-y-4 px-4 py-4">
              <div className="flex gap-3">
                <span className="size-6 shrink-0 rounded-[5px] bg-[#8fb6f5]" />
                <div>
                  <p className="text-[13px] font-semibold text-ink">you</p>
                  <p className="mt-1 text-[14px] text-ink">
                    We try not to put database query logic in the controller.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Logo size={24} className="shrink-0 rounded-[5px]" />
                <div>
                  <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
                    opengrep
                    <span className="mono-label rounded-[3px] border border-line px-1 py-0.5">
                      BOT
                    </span>
                  </p>
                  <p className="mt-1 text-[14px] text-ink">Making a note of this!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => window.open("https://github.com/stroland02/OpenGrep", "_blank")}
          >
            Check out Docs
          </Button>
        </div>
      </OnboardingCard>
    </OnboardingShell>
  );
}
