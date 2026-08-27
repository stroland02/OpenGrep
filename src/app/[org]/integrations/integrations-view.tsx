"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { Badge, Button, Card, PageHeader, useToast } from "@/components/ui";
import { saveReviewSettings } from "../code-review-settings/actions";

/**
 * "Prompt to Fix with AI" adds a copy-paste fix prompt to review comments;
 * each configured agent also gets a labelled quick-fix button (frames 30-32).
 */
const AGENTS: { name: string; blurb: string }[] = [
  { name: "Cursor", blurb: "Opens the fix in Cursor with the finding as context." },
  { name: "Claude Code", blurb: "Hands the finding to Claude Code in your terminal." },
  { name: "Codex", blurb: "Sends the finding to Codex as a task." },
  { name: "Conductor", blurb: "Queues the fix as a Conductor run." },
];

export function IntegrationsView({
  handle,
  agents,
}: {
  handle: string;
  agents: string[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [busy, setBusy] = React.useState(false);

  async function toggle(name: string) {
    const next = agents.includes(name)
      ? agents.filter((a) => a !== name)
      : [...agents, name];

    setBusy(true);
    await saveReviewSettings(handle, { codingAgents: JSON.stringify(next) });
    setBusy(false);
    toast.push({
      title: "Success",
      body: agents.includes(name) ? `${name} removed` : `${name} added`,
      tone: "success",
    });
    router.refresh();
  }

  return (
    <>
      <PageHeader
        title="Integrations"
        subtitle="Choose which agents OpenGrep should format suggestions for and add quick-fix buttons to your PRs."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {AGENTS.map((a) => {
          const on = agents.includes(a.name);
          return (
            <Card key={a.name} className="flex items-start gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-[#fbeae2] text-[16px] font-bold text-[#d97757]">
                {a.name.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-[17px] font-medium text-ink">
                  {a.name}
                  {on && <Badge tone="success">Enabled</Badge>}
                </p>
                <p className="mt-1 text-[14px] text-ink-muted">{a.blurb}</p>
              </div>
              <Button
                variant={on ? "secondary" : "primary"}
                size="sm"
                disabled={busy}
                onClick={() => toggle(a.name)}
              >
                {on ? (
                  <>
                    <Check className="size-3.5" />
                    Added
                  </>
                ) : (
                  <>
                    <Plus className="size-3.5" />
                    Add Agent
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-5">
        <p className="text-[15px] text-ink">
          Each enabled agent renders as a{" "}
          <span className="rounded-[5px] bg-[#fbeae2] px-2 py-0.5 text-[13px] font-medium text-[#d97757]">
            Fix in …
          </span>{" "}
          button beneath every OpenGrep comment.
        </p>
      </Card>
    </>
  );
}
