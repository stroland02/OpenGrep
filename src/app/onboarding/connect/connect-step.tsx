"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Building2, Check, GitFork, Search } from "lucide-react";
import { Button, Checkbox } from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { OnboardingShell } from "@/components/onboarding";
import { CodeGraph } from "@/components/code-graph";
import { cn } from "@/lib/utils";
import { enableRepositories } from "../actions";

const REPOS = [
  "astrowind-lp",
  "docs",
  "doggy-stickers",
  "landingpage",
  "laravel",
  "mini-landing-page",
  "newlandingpage",
  "odyssey",
  "openreact-lp",
  "payload-website-starter",
  "tailwind-lp",
];

const GH_ORG = "samleemobbin-dot";

/**
 * The three-stage connection: provider, organization, then per-repository
 * enablement. The right pane's status caption tracks progress.
 */
export function ConnectStep({ org }: { org: string }) {
  const router = useRouter();
  const [stage, setStage] = React.useState<1 | 2 | 3>(1);
  const [provider, setProvider] = React.useState<"" | "GITHUB" | "GITLAB">("");
  const [ghOrgPicked, setGhOrgPicked] = React.useState(false);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [query, setQuery] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const status =
    stage === 1
      ? "AWAITING CODE PROVIDER CONNECTION"
      : stage === 2
        ? "AWAITING ORGANIZATION SELECTION"
        : `ORG FOUND: ${GH_ORG.toUpperCase()}`;

  const nextDisabled =
    (stage === 1 && !provider) ||
    (stage === 2 && !ghOrgPicked) ||
    (stage === 3 && selected.size === 0);

  const visible = REPOS.filter((r) =>
    r.toLowerCase().includes(query.trim().toLowerCase()),
  );

  async function advance() {
    if (stage === 1) return setStage(2);
    if (stage === 2) return setStage(3);

    setBusy(true);
    await enableRepositories(org, [...selected]);
    router.push(`/onboarding/review?org=${org}`);
  }

  return (
    <OnboardingShell
      variant="split"
      back="/onboarding/survey"
      nextDisabled={nextDisabled}
      busy={busy}
      onNext={advance}
    >
      <div className="grid w-full flex-1 grid-cols-1 lg:grid-cols-[49%_51%]">
        <div className="px-10 py-10">
          <h1 className="text-[32px] font-bold leading-tight tracking-tight text-ink">
            {stage === 1 && "Let's start by connecting your code provider."}
            {stage === 2 && "Choose which org you'd like to configure."}
            {stage === 3 && "Choose repositories you would like OpenGrep to review."}
          </h1>
          <p className="mt-2 text-[15px] text-ink-muted">
            Link your GitHub or GitLab to get started with OpenGrep.
          </p>

          <div className="mt-8 rounded-[8px] bg-surface-muted p-6">
            {/* Step 1 */}
            <StepRow
              icon={<GitHubMark className="size-4" />}
              label={stage > 1 ? "1. Connected to GitHub" : "1. Connect GitHub"}
              done={stage > 1}
              connector
            >
              {stage === 1 && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={provider === "GITHUB" ? "primary" : "secondary"}
                    onClick={() => setProvider("GITHUB")}
                  >
                    <GitHubMark className="size-3.5" />
                    Connect
                  </Button>
                </div>
              )}
            </StepRow>

            {/* Step 2 */}
            <StepRow
              icon={<Building2 className="size-4" />}
              label={stage > 2 ? `2. Org: ${GH_ORG}` : "2. Select Org"}
              done={stage > 2}
              muted={stage < 2}
              connector
            >
              {stage === 2 && (
                <div className="mt-3 w-full">
                  <div className="overflow-hidden rounded-[8px] border border-line bg-surface">
                    <p className="mono-label border-b border-line bg-surface-muted px-4 py-2.5">
                      Organizations linked to your account
                    </p>
                    <button
                      onClick={() => setGhOrgPicked(true)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-surface-muted/60",
                        ghOrgPicked && "bg-surface-muted",
                      )}
                    >
                      <span className="flex items-center gap-2.5 text-[15px] text-ink">
                        <Building2 className="size-4 text-ink-muted" />
                        {GH_ORG}
                      </span>
                      <span
                        className={cn(
                          "grid size-5 place-items-center rounded-full border-2",
                          ghOrgPicked ? "border-ink" : "border-[#c9c9c5]",
                        )}
                      >
                        {ghOrgPicked && <span className="size-2 rounded-full bg-ink" />}
                      </span>
                    </button>
                  </div>
                  <p className="mt-3 text-[14px] text-ink-muted">
                    Don&apos;t see your organization?{" "}
                    <span className="text-brand-dark">
                      Install OpenGrep on more GitHub organizations →
                    </span>
                  </p>
                </div>
              )}
            </StepRow>

            {/* Step 3 */}
            <StepRow
              icon={<GitFork className="size-4" />}
              label="3. Enable Repositories"
              muted={stage < 3}
            >
              {stage === 3 && (
                <div className="mt-3 w-full">
                  <div className="mb-3 flex gap-2">
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Select your repository to get started..."
                        className="h-10 w-full rounded-[8px] border border-line bg-surface pl-9 pr-3 text-[14px] outline-none placeholder:text-ink-faint"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => setSelected(new Set(REPOS))}
                    >
                      Enable All
                    </Button>
                  </div>

                  <div className="thin-scroll max-h-[300px] overflow-y-auto rounded-[8px] border border-line bg-surface">
                    <div className="mono-label grid grid-cols-[1fr_100px] gap-2 border-b border-line bg-surface-muted px-4 py-2.5">
                      <span>Repositories</span>
                      <span>Type</span>
                    </div>
                    {visible.map((r) => (
                      <label
                        key={r}
                        className="grid cursor-pointer grid-cols-[1fr_100px] items-center gap-2 border-b border-line px-4 py-3 last:border-b-0 hover:bg-surface-muted/60"
                      >
                        <span className="flex items-center gap-2.5">
                          <Checkbox
                            checked={selected.has(r)}
                            onChange={(v) =>
                              setSelected((prev) => {
                                const next = new Set(prev);
                                if (v) next.add(r);
                                else next.delete(r);
                                return next;
                              })
                            }
                          />
                          <GitHubMark className="size-4 text-ink" />
                          <span className="text-[14px] text-ink">
                            {GH_ORG}/{r}
                          </span>
                        </span>
                        <span className="text-[14px] text-ink-muted">main</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </StepRow>
          </div>
        </div>

        <div className="relative hidden border-l border-line lg:block">
          <CodeGraph status={status} />
        </div>
      </div>
    </OnboardingShell>
  );
}

function StepRow({
  icon,
  label,
  children,
  done,
  muted,
  connector,
}: {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
  done?: boolean;
  muted?: boolean;
  connector?: boolean;
}) {
  return (
    <div className={cn("flex gap-4 pb-6 last:pb-0", muted && "opacity-45")}>
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-[7px] text-white",
            done ? "bg-ink" : "bg-[#3a3a38]",
          )}
        >
          {done ? <Check className="size-4" /> : icon}
        </span>
        {connector && <span className="mt-1 w-px flex-1 bg-[#d6d6d2]" />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-h-8 items-center justify-between gap-3">
          <p className="text-[16px] font-medium text-ink">{label}</p>
          {!children ? null : <div className="shrink-0">{done ? null : null}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
