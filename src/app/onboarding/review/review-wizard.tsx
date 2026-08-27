"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FileText, BarChart3, Table2, Workflow, Repeat, GitPullRequest, Plus } from "lucide-react";
import { Checkbox, Toggle } from "@/components/ui";
import { OnboardingShell, WizardTabs } from "@/components/onboarding";
import { cn } from "@/lib/utils";
import { saveReviewConfig } from "../actions";

const STEPS = ["PR ANALYSIS", "COMMENT SCOPE", "COMMIT BEHAVIOR", "DEVELOPER TOOLS"];

type Block = { enabled: boolean; collapsible: boolean; defaultOpen: boolean };

const BLOCKS: [string, string, string, React.ElementType][] = [
  ["summary", "PR Summary", "Include a text summary of the changes", FileText],
  ["sequenceDiagram", "Sequence Diagrams", "Generate a sequence diagram of the changes", Workflow],
  ["issueTable", "Issue Table", "Show a table of important files changed", Table2],
  ["confidence", "Confidence Score", "Include a confidence score out of 5 for the PR", BarChart3],
];

const AGENTS = ["Cursor", "Claude Code", "Codex", "Conductor"];

export function ReviewWizard({ org }: { org: string }) {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [busy, setBusy] = React.useState(false);

  const [blocks, setBlocks] = React.useState<Record<string, Block>>(
    Object.fromEntries(
      BLOCKS.map(([k]) => [k, { enabled: true, collapsible: false, defaultOpen: false }]),
    ),
  );
  const [strictness, setStrictness] = React.useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [retrigger, setRetrigger] = React.useState(true);
  const [updateDescription, setUpdateDescription] = React.useState(false);
  const [agents, setAgents] = React.useState<string[]>([]);
  const [showFixPrompts, setShowFixPrompts] = React.useState(true);

  async function advance() {
    if (step < 3) return setStep(step + 1);

    setBusy(true);
    await saveReviewConfig(org, {
      strictness,
      autoReviewOnNewCommits: retrigger,
      updateOriginalSummary: updateDescription,
      blocks: JSON.stringify(blocks),
      codingAgents: JSON.stringify(agents),
    });
    router.push(`/onboarding/invite?org=${org}`);
  }

  return (
    <OnboardingShell
      variant="split"
      back={step === 0 ? `/onboarding/connect?org=${org}` : undefined}
      busy={busy}
      onNext={advance}
    >
      <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[49%_51%]">
        <div className="px-10 py-10">
          <WizardTabs steps={STEPS} active={step} />

          {step === 0 && (
            <>
              <Heading
                title="What should be included in your PR summary?"
                sub="A PR summary is an overview of the changes, added as a comment or appended to the PR description."
              />
              <div className="space-y-3">
                {BLOCKS.map(([key, title, desc, Icon]) => {
                  const b = blocks[key];
                  return (
                    <div key={key} className="rounded-[8px] border border-line bg-surface">
                      <div className="flex items-center gap-4 px-5 py-4">
                        <Icon className="size-5 shrink-0 text-ink-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[16px] font-medium text-ink">{title}</p>
                          <p className="text-[14px] text-ink-muted">{desc}</p>
                        </div>
                        <Toggle
                          checked={b.enabled}
                          onChange={(v) =>
                            setBlocks({ ...blocks, [key]: { ...b, enabled: v } })
                          }
                        />
                      </div>
                      <div className="flex gap-6 border-t border-line px-5 py-3">
                        <Checkbox
                          label="Collapsible"
                          checked={b.collapsible}
                          onChange={(v) =>
                            setBlocks({
                              ...blocks,
                              [key]: {
                                ...b,
                                collapsible: v,
                                defaultOpen: v ? b.defaultOpen : false,
                              },
                            })
                          }
                        />
                        <Checkbox
                          label="Default Open"
                          checked={b.defaultOpen}
                          disabled={!b.collapsible}
                          onChange={(v) =>
                            setBlocks({ ...blocks, [key]: { ...b, defaultOpen: v } })
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <Heading
                title="What should OpenGrep comment on?"
                sub="Adjust what OpenGrep says when replying to code and highlighting issues"
              />
              <div className="rounded-[8px] border border-line bg-surface p-5">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-[7px] bg-surface-muted">
                      <FileText className="size-4 text-ink-muted" />
                    </span>
                    <div>
                      <p className="text-[16px] font-medium text-ink">Comments Sensitivity</p>
                      <p className="text-[14px] text-ink-muted">Severity Threshold</p>
                    </div>
                  </div>

                  <div className="w-[230px]">
                    <div className="mb-2 flex justify-between">
                      {["LOW", "MEDIUM", "HIGH"].map((l) => (
                        <span key={l} className="mono-label">
                          {l}
                        </span>
                      ))}
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={2}
                      value={["LOW", "MEDIUM", "HIGH"].indexOf(strictness)}
                      onChange={(e) =>
                        setStrictness(
                          (["LOW", "MEDIUM", "HIGH"] as const)[Number(e.target.value)],
                        )
                      }
                      className="w-full accent-ink"
                    />
                  </div>
                </div>

                <p className="mt-4 border-t border-line pt-4 text-[15px] text-ink-muted">
                  {strictness === "LOW"
                    ? "OpenGrep will comment on all issues."
                    : strictness === "MEDIUM"
                      ? "OpenGrep will comment on P2s less often."
                      : "OpenGrep will only comment on blocking issues."}
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Heading
                title="How should OpenGrep respond to PR changes?"
                sub="Configure what analysis and insights OpenGrep generates when reviewing pull requests."
              />
              <div className="rounded-[8px] border border-line bg-surface">
                <SettingRow
                  icon={Repeat}
                  title="Retrigger OpenGrep review on new commits"
                  desc="Re-analyze when new commits are pushed"
                  checked={retrigger}
                  onChange={setRetrigger}
                />
                <SettingRow
                  icon={GitPullRequest}
                  title="Update PR Description"
                  desc="Append OpenGrep's summary and findings to the PR body."
                  checked={updateDescription}
                  onChange={setUpdateDescription}
                  last
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <Heading
                title="Integrate OpenGrep with your coding agents."
                sub="Choose which agents OpenGrep should format suggestions for and add quick-fix buttons to your PRs."
              />
              <div className="rounded-[8px] border border-line bg-surface">
                <SettingRow
                  icon={FileText}
                  title="Prompt to Fix with AI"
                  desc="Include copy-paste prompts for fixing issues with your agent"
                  checked={showFixPrompts}
                  onChange={setShowFixPrompts}
                />
                <div className="px-5 py-4">
                  <p className="text-[16px] font-medium text-ink">Coding Agents</p>
                  <p className="mb-3 text-[14px] text-ink-muted">
                    Choose which agents to show fix buttons for
                  </p>

                  <div className="mb-3 flex flex-wrap gap-2">
                    {agents.map((a) => (
                      <span
                        key={a}
                        className="rounded-[6px] bg-[#fbeae2] px-2.5 py-1 text-[13px] font-medium text-[#d97757]"
                      >
                        Fix in {a.replace(" Code", "")}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {AGENTS.filter((a) => !agents.includes(a)).map((a) => (
                      <button
                        key={a}
                        onClick={() => setAgents([...agents, a])}
                        className="inline-flex items-center gap-1.5 rounded-[8px] border border-line px-3 py-1.5 text-[14px] text-ink hover:bg-surface-muted"
                      >
                        <Plus className="size-3.5" />
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <PreviewPane
          step={step}
          strictness={strictness}
          updateDescription={updateDescription}
          agents={agents}
          blocks={blocks}
        />
      </div>
    </OnboardingShell>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-[32px] font-bold leading-tight tracking-tight text-ink">
        {title}
      </h1>
      <p className="mt-2 text-[15px] text-ink-muted">{sub}</p>
    </div>
  );
}

function SettingRow({
  icon: Icon,
  title,
  desc,
  checked,
  onChange,
  last,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-5 py-4",
        !last && "border-b border-line",
      )}
    >
      <Icon className="size-5 shrink-0 text-ink-muted" />
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-medium text-ink">{title}</p>
        <p className="text-[14px] text-ink-muted">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

/** Live preview that reacts to the settings on the left, as in the captures. */
function PreviewPane({
  step,
  strictness,
  updateDescription,
  agents,
  blocks,
}: {
  step: number;
  strictness: string;
  updateDescription: boolean;
  agents: string[];
  blocks: Record<string, Block>;
}) {
  const gradients = [
    "linear-gradient(140deg,#ffb59b,#ff8f7a 55%,#ff7a95)",
    "linear-gradient(140deg,#8fb6f5,#b79bf5 55%,#f5a8d8)",
    "linear-gradient(140deg,#dff08a,#c9e86a 60%,#a8dd7a)",
    "linear-gradient(140deg,#f5a8d8,#f08ab5 60%,#e87a9a)",
  ];

  const severities =
    strictness === "LOW"
      ? ["P0", "P1", "P2"]
      : strictness === "MEDIUM"
        ? ["P0", "P1"]
        : ["P0"];

  return (
    <div
      className="relative hidden items-center justify-center border-l border-line p-12 lg:flex"
      style={{ background: gradients[step] }}
    >
      <div className="w-full max-w-[430px] space-y-4">
        {step === 0 && (
          <div className="rounded-[8px] bg-white p-4 shadow-lg">
            <p className="mb-3 text-[13px] font-semibold text-ink">opengrep</p>
            {BLOCKS.filter(([k]) => blocks[k].enabled).map(([k, title]) => (
              <div key={k} className="mb-2.5">
                <p className="mono-label mb-1">{title}</p>
                <div className="space-y-1">
                  <div className="h-2 w-full rounded bg-[#f0d5d5]" />
                  <div className="h-2 w-3/4 rounded bg-[#f0d5d5]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 1 &&
          severities.map((sev, i) => (
            <div key={sev} className="rounded-[8px] bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-[12px] text-ink">
                  {["state.tsx", "main.tsx", "auth.tsx"][i]}
                </span>
                <span
                  className={cn(
                    "rounded-[3px] px-1.5 py-0.5 font-mono text-[11px] font-semibold",
                    sev === "P0" && "bg-p0 text-white",
                    sev === "P1" && "bg-p1 text-white",
                    sev === "P2" && "bg-p2 text-ink",
                  )}
                >
                  {sev}
                </span>
              </div>
              <div className="space-y-1 px-4 py-3">
                <div className="h-2 w-full rounded bg-[#fce7f3]" />
                <div className="h-2 w-5/6 rounded bg-[#d1fae5]" />
              </div>
            </div>
          ))}

        {step === 2 && (
          <>
            <div className="rounded-[8px] bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="text-[13px] font-medium text-ink">Pull Request</span>
                <span className="font-mono text-[12px] text-ink-muted">#452</span>
              </div>
              <div className="space-y-1.5 px-4 py-3">
                <div className="h-2 w-2/3 rounded bg-[#e5e5e3]" />
                <div className="h-2 w-full rounded bg-[#e5e5e3]" />
                {updateDescription && (
                  <>
                    <p className="mono-label pt-2">PR Summary</p>
                    <div className="h-2 w-5/6 rounded bg-[#e8f56b]" />
                    <div className="h-2 w-2/3 rounded bg-[#c9f5de]" />
                  </>
                )}
              </div>
            </div>
            <p className="mono-status mx-auto w-fit rounded-[4px] border border-line bg-white px-3 py-1.5 text-ink-muted">
              New commit detected
            </p>
            <p className="mono-status mx-auto w-fit rounded-[4px] bg-lime px-3 py-1.5 text-ink">
              Re-analyzed PR
            </p>
            <p className="mono-status mx-auto w-fit rounded-[4px] bg-brand px-3 py-1.5 text-ink">
              New review posted
            </p>
          </>
        )}

        {step === 3 && (
          <div className="rounded-[8px] bg-white shadow-lg">
            <div className="border-b border-line px-4 py-2.5">
              <span className="font-mono text-[12px] text-ink">acme/webapp</span>
            </div>
            <div className="space-y-1 px-4 py-3">
              <div className="h-2 w-full rounded bg-[#fce7f3]" />
              <div className="h-2 w-5/6 rounded bg-[#d1fae5]" />
            </div>
            <div className="border-t border-line px-4 py-3">
              <p className="mb-2 text-[13px] font-semibold text-ink">opengrep</p>
              <div className="flex flex-wrap gap-1.5">
                {agents.map((a) => (
                  <span
                    key={a}
                    className="rounded-[5px] bg-[#fbeae2] px-2 py-1 text-[12px] font-medium text-[#d97757]"
                  >
                    Fix in {a.replace(" Code", "")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
