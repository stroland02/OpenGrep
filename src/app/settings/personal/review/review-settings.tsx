"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowRight, Code2, FileText, Info, Table2 } from "lucide-react";
import { Button, Card, Checkbox, Toggle } from "@/components/ui";
import { cn } from "@/lib/utils";
import { linkAccount, updateReviewPrefs } from "../actions";

/**
 * Everything under Review Preferences stays disabled until a Git provider
 * account is linked — the whole block renders greyed (frame 122).
 */
export function ReviewSettings({
  linked,
  prefs,
}: {
  linked: boolean;
  prefs: {
    showAiFixPrompts: boolean;
    personalSummary: boolean;
    personalSummaryOpen: boolean;
    personalIssuesTable: boolean;
  };
}) {
  const router = useRouter();

  async function set(patch: Partial<typeof prefs>) {
    await updateReviewPrefs(patch);
    router.refresh();
  }

  return (
    <div className="space-y-10">
      {!linked && (
        <div className="flex items-start gap-3 rounded-[8px] border border-[#f0d9b5] bg-warning-soft px-5 py-4">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
          <p className="text-[15px] text-[#8a5a12]">
            Connect your GitHub or GitLab account for Fix with your Agent and review
            preferences to take effect on your PRs.{" "}
            <button
              onClick={async () => {
                await linkAccount("GITHUB");
                router.refresh();
              }}
              className="inline-flex items-center gap-1 font-medium underline"
            >
              Connect now
              <ArrowRight className="size-3.5" />
            </button>
          </p>
        </div>
      )}

      <section>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Fix with AI</h2>
        <Card>
          <div className="flex items-center justify-between gap-6 border-b border-line p-6">
            <div>
              <p className="text-[17px] font-medium text-ink">Show AI fix prompts</p>
              <p className="mt-0.5 text-[15px] text-ink-muted">
                Copy &amp; paste into your coding agent
              </p>
            </div>
            <Toggle
              checked={prefs.showAiFixPrompts}
              onChange={(v) => set({ showAiFixPrompts: v })}
            />
          </div>

          <div className="p-6">
            <p className="text-[17px] font-medium text-ink">Fix with your Agent</p>
            <p className="mt-0.5 text-[15px] text-ink-muted">
              Link your profile and choose your coding agents.
            </p>

            <ol className="mt-5 space-y-5">
              <Step
                n={1}
                icon={Info}
                title="Link your GitHub or GitLab profile"
                help="Link your GitHub or GitLab account so OpenGrep can connect to your preferred IDE"
                done={linked}
              >
                {!linked && (
                  <Button
                    size="sm"
                    onClick={async () => {
                      await linkAccount("GITHUB");
                      router.refresh();
                    }}
                  >
                    Link account
                  </Button>
                )}
              </Step>
              <Step
                n={2}
                icon={Code2}
                title="Choose your coding agents"
                help="Pick which agents get a quick-fix button on review comments."
                disabled={!linked}
              />
            </ol>
          </div>
        </Card>
      </section>

      <section className={cn(!linked && "opacity-50")}>
        <h2 className="mb-4 text-[22px] font-semibold text-ink">Review Preferences</h2>
        <Card className="space-y-3 p-5">
          <div className="rounded-[8px] border border-line">
            <div className="flex items-center gap-4 px-5 py-4">
              <FileText className="size-5 shrink-0 text-ink-muted" />
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-medium text-ink">Summary</p>
                <p className="text-[14px] text-ink-muted">
                  Include a text summary of the changes
                </p>
              </div>
              <Toggle
                checked={prefs.personalSummary}
                disabled={!linked}
                onChange={(v) => set({ personalSummary: v })}
              />
            </div>
            <div className="flex gap-6 border-t border-line px-5 py-3">
              <Checkbox label="Collapsible" checked={false} disabled />
              <Checkbox
                label="Default Open"
                checked={prefs.personalSummaryOpen}
                disabled={!linked}
                onChange={(v) => set({ personalSummaryOpen: v })}
              />
            </div>
          </div>

          <div className="rounded-[8px] border border-line">
            <div className="flex items-center gap-4 px-5 py-4">
              <Table2 className="size-5 shrink-0 text-ink-muted" />
              <div className="min-w-0 flex-1">
                <p className="text-[16px] font-medium text-ink">Issues Table</p>
                <p className="text-[14px] text-ink-muted">
                  Show a table of important files changed with ratings
                </p>
              </div>
              <Toggle
                checked={prefs.personalIssuesTable}
                disabled={!linked}
                onChange={(v) => set({ personalIssuesTable: v })}
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  help,
  children,
  done,
  disabled,
}: {
  n: number;
  icon: React.ElementType;
  title: string;
  help: string;
  children?: React.ReactNode;
  done?: boolean;
  disabled?: boolean;
}) {
  return (
    <li className={cn("flex gap-4", disabled && "opacity-50")}>
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-[8px] border",
            done ? "border-brand bg-brand/15 text-brand-dark" : "border-line text-ink-muted",
          )}
        >
          <Icon className="size-4" />
        </span>
        {n === 1 && <span className="mt-1 w-px flex-1 bg-line" />}
      </div>
      <div className="min-w-0 flex-1 pb-2">
        <p className="text-[16px] font-medium text-ink">
          {n}. {title}
        </p>
        <p className="mt-0.5 text-[14px] text-ink-muted">{help}</p>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </li>
  );
}
