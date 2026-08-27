"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, Plus, Users, X } from "lucide-react";
import { Button, useToast } from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { Logo } from "@/components/logo";
import { OnboardingCard, OnboardingShell } from "@/components/onboarding";
import { cn } from "@/lib/utils";
import { inviteDuringOnboarding } from "../actions";

export function InviteStep({ org }: { org: string }) {
  const router = useRouter();
  const toast = useToast();
  const [draft, setDraft] = React.useState("");
  const [chips, setChips] = React.useState<string[]>([]);
  const [role, setRole] = React.useState<"ADMIN" | "MEMBER">("MEMBER");
  const [invited, setInvited] = React.useState<{ email: string; role: string }[]>([]);
  const [busy, setBusy] = React.useState(false);

  function commitDraft() {
    // The field tokenises on comma or Enter — each entry becomes a removable pill.
    const parts = draft
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    setChips((prev) => [...new Set([...prev, ...parts])]);
    setDraft("");
  }

  async function send() {
    const all = [...chips, ...draft.split(",").map((s) => s.trim())].filter(Boolean);
    if (all.length === 0) return;

    setBusy(true);
    const queued = await inviteDuringOnboarding(org, all, role);
    setBusy(false);

    setInvited((prev) => [...prev, ...all.map((email) => ({ email, role }))]);
    setChips([]);
    setDraft("");
    toast.push({
      title: "Invites added",
      body: `${queued} invite(s) queued`,
    });
  }

  return (
    <OnboardingShell
      back={`/onboarding/review?org=${org}`}
      onNext={() => router.push(`/onboarding/billing?org=${org}`)}
    >
      <OnboardingCard width={650}>
        <div className="flex justify-center">
          <Logo size={44} className="rounded-[9px]" />
        </div>
        <h1 className="mt-5 text-center text-[32px] font-bold tracking-tight text-ink">
          Invite your team
        </h1>
        <p className="mt-2 text-center text-[15px] text-ink-muted">
          Add team members to start using OpenGrep together.
        </p>

        <div className="mt-7 rounded-[8px] border border-line p-5">
          <p className="mb-5 text-[17px] font-semibold text-ink">Invite user to this team</p>

          <div className="mb-5">
            <p className="mb-2 text-[14px] font-medium text-ink">Team</p>
            <div className="flex h-11 items-center gap-2.5 rounded-[8px] border border-line bg-surface-muted px-3">
              <Users className="size-4 text-ink-muted" />
              <span className="text-[15px] text-ink">{org}</span>
              <span className="ml-auto flex items-center gap-1.5">
                <GitHubMark className="size-3.5 text-ink" />
                <span className="mono-label">GitHub</span>
              </span>
            </div>
          </div>

          <div className="mb-5">
            <p className="mb-2 text-[14px] font-medium text-ink">
              Default role for the invited people
            </p>
            <div className="space-y-2">
              {(["ADMIN", "MEMBER"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex w-full items-center gap-3 rounded-[8px] border border-line px-4 py-3 text-left hover:bg-surface-muted/60"
                >
                  <span
                    className={cn(
                      "grid size-5 place-items-center rounded-full border-2",
                      role === r ? "border-ink bg-ink text-white" : "border-[#c9c9c5]",
                    )}
                  >
                    {role === r && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  <span className="text-[15px] text-ink">
                    {r === "ADMIN" ? "Admin" : "Member"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 text-[14px] font-medium text-ink">Email</p>
            <div className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-[8px] border border-line px-2 py-1.5">
              {chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1 rounded-[5px] bg-surface-muted px-2 py-1 text-[13px] text-ink"
                >
                  {c}
                  <button
                    onClick={() => setChips(chips.filter((x) => x !== c))}
                    aria-label={`Remove ${c}`}
                  >
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    commitDraft();
                  }
                }}
                onBlur={commitDraft}
                placeholder="enter an email separated by commas"
                className="min-w-[200px] flex-1 bg-transparent px-1 py-1 text-[15px] outline-none placeholder:text-ink-faint"
              />
            </div>
          </div>

          <Button
            className="w-full"
            disabled={chips.length === 0 && !draft.trim()}
            onClick={send}
          >
            <Plus className="size-4" />
            {busy ? "Sending…" : "Send Invite"}
          </Button>

          {invited.length > 0 && (
            <div className="mt-6 border-t border-line pt-5">
              <p className="flex items-center gap-2 text-[16px] font-semibold text-ink">
                <CheckCircle2 className="size-5 text-success" />
                Invitation Sent
              </p>
              <p className="mt-1 text-[14px] text-ink-muted">
                They&apos;ll receive an email with instructions to join. You can track
                invitation status in Team Settings.
              </p>
              <div className="mt-4 space-y-2">
                {invited.map((i) => (
                  <div
                    key={i.email}
                    className="flex items-center justify-between text-[14px]"
                  >
                    <span className="text-ink">{i.email}</span>
                    <span className="text-ink-muted">
                      {i.role === "ADMIN" ? "Admin" : "Member"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </OnboardingCard>
    </OnboardingShell>
  );
}
