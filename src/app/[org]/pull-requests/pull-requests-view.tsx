"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ThumbsDown, ThumbsUp, X } from "lucide-react";
import {
  Badge,
  Button,
  Checkbox,
  PageHeader,
  SearchInput,
  SeverityBadge,
  StatusChip,
  Table,
  TableEmpty,
  Td,
  Th,
  TimeAgo,
  useToast,
} from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { cn, truncate } from "@/lib/utils";
import { rerunReviews, toggleAddressed, voteOnComment } from "./actions";

type Comment = {
  id: string;
  filePath: string;
  line: number;
  severity: string;
  body: string;
  addressed: boolean;
  upvotes: number;
  downvotes: number;
};

type Row = {
  id: string;
  number: number;
  title: string;
  repo: string;
  branch: string;
  status: string;
  reviewCount: number;
  updatedAt: string;
  latest: {
    summary: string;
    confidenceScore: number;
    sequenceDiagram: string;
    comments: Comment[];
  } | null;
};

export function PullRequestsView({ handle, rows }: { handle: string; rows: Row[] }) {
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [open, setOpen] = React.useState<Row | null>(null);
  const [busy, setBusy] = React.useState(false);

  const filtered = rows.filter((r) => {
    const q = query.trim().toLowerCase();
    return !q || r.title.toLowerCase().includes(q) || r.repo.toLowerCase().includes(q);
  });

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const someChecked = filtered.some((r) => selected.has(r.id));

  async function rerun() {
    const ids = [...selected];
    setBusy(true);
    setSelected(new Set());
    await rerunReviews(handle, ids);
    setBusy(false);
    toast.push({
      title: "Reviews complete",
      body: `${ids.length} ${ids.length === 1 ? "review" : "reviews"} re-ran.`,
      tone: "success",
    });
    router.refresh();
  }

  return (
    <>
      <PageHeader
        title="Pull Requests"
        subtitle="Review history across your repositories."
      />

      <SearchInput
        placeholder="Search pull requests or click to add filters"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-5"
      />

      {selected.size > 0 && (
        <div className="mb-4 flex justify-end">
          <Button onClick={rerun} disabled={busy}>
            {busy ? "Running…" : `Rerun (${selected.size})`}
          </Button>
        </div>
      )}

      <Table>
        <thead>
          <tr>
            <Th className="w-[52px]">
              <Checkbox
                checked={allChecked}
                indeterminate={!allChecked && someChecked}
                onChange={(v) =>
                  setSelected(v ? new Set(filtered.map((r) => r.id)) : new Set())
                }
              />
            </Th>
            <Th className="w-[80px]">PR #</Th>
            <Th>PR Name</Th>
            <Th className="w-[160px]">Repo</Th>
            <Th className="w-[190px]">Branch</Th>
            <Th className="w-[170px]">Status</Th>
            <Th className="w-[120px]"># Reviews</Th>
            <Th className="w-[180px]">
              <span className="flex items-center gap-1.5">
                Last Updated
                <ChevronDown className="size-3" />
              </span>
            </Th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && <TableEmpty colSpan={8}>No results.</TableEmpty>}
          {filtered.map((r) => (
            <tr
              key={r.id}
              className="cursor-pointer hover:bg-surface-muted/60"
              onClick={() => setOpen(r)}
            >
              <Td onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selected.has(r.id)}
                  onChange={(v) =>
                    setSelected((prev) => {
                      const next = new Set(prev);
                      if (v) next.add(r.id);
                      else next.delete(r.id);
                      return next;
                    })
                  }
                />
              </Td>
              <Td className="text-ink-muted">#{r.number}</Td>
              <Td className="font-medium">{r.title}</Td>
              <Td>
                <span className="flex items-center gap-2">
                  <GitHubMark className="size-4 text-ink" />
                  {r.repo}
                </span>
              </Td>
              <Td className="text-ink-muted">{truncate(r.branch, 18)}</Td>
              <Td>
                <StatusChip status={r.status} />
              </Td>
              <Td className="tabular-nums">{r.reviewCount}</Td>
              <Td className="text-ink-muted">
                <TimeAgo date={r.updatedAt} />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {open && (
        <ReviewDrawer handle={handle} row={open} onClose={() => setOpen(null)} />
      )}
    </>
  );
}

/**
 * The review itself: the summary block, confidence score and per-file findings
 * that the reference product posts onto the PR.
 */
function ReviewDrawer({
  handle,
  row,
  onClose,
}: {
  handle: string;
  row: Row;
  onClose: () => void;
}) {
  const router = useRouter();

  async function vote(id: string, dir: "up" | "down") {
    await voteOnComment(handle, id, dir);
    router.refresh();
  }

  async function address(id: string) {
    await toggleAddressed(handle, id);
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="scrim absolute inset-0" onClick={onClose} />
      <aside className="thin-scroll relative h-full w-full max-w-[620px] overflow-y-auto border-l border-line bg-surface">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-line bg-surface px-6 py-5">
          <div>
            <p className="text-[13px] text-ink-muted">
              #{row.number} · {row.repo}
            </p>
            <h2 className="mt-0.5 text-[20px] font-semibold text-ink">{row.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-ink-muted hover:bg-surface-muted hover:text-ink"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {!row.latest ? (
          <p className="px-6 py-16 text-center text-[15px] text-ink-muted">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-7 px-6 py-6">
            <section>
              <p className="mono-label mb-2">PR Summary</p>
              <p className="text-[15px] leading-relaxed text-ink">{row.latest.summary}</p>
            </section>

            <section>
              <p className="mono-label mb-2">Confidence Score</p>
              <p className="text-[15px] text-ink">
                {row.latest.confidenceScore}/5 —{" "}
                {row.latest.confidenceScore >= 5
                  ? "Ready to merge!"
                  : row.latest.confidenceScore >= 4
                    ? "Minor cleanup"
                    : row.latest.confidenceScore >= 3
                      ? "Worth another look"
                      : "Blocking issues present"}
              </p>
            </section>

            {row.latest.sequenceDiagram && (
              <section>
                <p className="mono-label mb-2">Sequence Diagram</p>
                <pre className="overflow-x-auto rounded-[8px] border border-line bg-surface-muted p-4 font-mono text-[12px] leading-relaxed text-ink-muted">
                  {row.latest.sequenceDiagram}
                </pre>
              </section>
            )}

            <section>
              <p className="mono-label mb-3">
                Issue Table ({row.latest.comments.length})
              </p>
              {row.latest.comments.length === 0 ? (
                <p className="rounded-[8px] border border-line px-4 py-8 text-center text-[15px] text-ink-muted">
                  No issues found.
                </p>
              ) : (
                <div className="space-y-3">
                  {row.latest.comments.map((c) => (
                    <div key={c.id} className="rounded-[8px] border border-line p-4">
                      <div className="mb-2 flex items-center gap-2.5">
                        <SeverityBadge severity={c.severity} />
                        <span className="font-mono text-[12px] text-ink-muted">
                          {c.filePath}:{c.line}
                        </span>
                        {c.addressed && <Badge tone="success">Addressed</Badge>}
                      </div>
                      <p className="text-[14px] leading-relaxed text-ink">{c.body}</p>

                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => vote(c.id, "up")}
                          className="inline-flex items-center gap-1.5 rounded-[6px] border border-line px-2.5 py-1 text-[13px] text-ink-muted hover:bg-surface-muted"
                        >
                          <ThumbsUp className="size-3.5" />
                          {c.upvotes}
                        </button>
                        <button
                          onClick={() => vote(c.id, "down")}
                          className="inline-flex items-center gap-1.5 rounded-[6px] border border-line px-2.5 py-1 text-[13px] text-ink-muted hover:bg-surface-muted"
                        >
                          <ThumbsDown className="size-3.5" />
                          {c.downvotes}
                        </button>
                        <button
                          onClick={() => address(c.id)}
                          className={cn(
                            "ml-auto rounded-[6px] border px-2.5 py-1 text-[13px]",
                            c.addressed
                              ? "border-line text-ink-muted hover:bg-surface-muted"
                              : "border-ink bg-ink text-white hover:bg-ink/90",
                          )}
                        >
                          {c.addressed ? "Mark unaddressed" : "Mark addressed"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </aside>
    </div>
  );
}
