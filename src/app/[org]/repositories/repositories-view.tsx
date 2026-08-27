"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronsUpDown, Code2, GitPullRequest, Search } from "lucide-react";
import {
  Badge,
  Button,
  Checkbox,
  Modal,
  PageHeader,
  SearchInput,
  Table,
  TableEmpty,
  Td,
  Th,
  useToast,
} from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { cn, formatDuration, shortDate } from "@/lib/utils";
import { setAllReposEnabled, setRepoEnabled } from "./actions";

type Pr = {
  number: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};

type Row = {
  id: string;
  label: string;
  reviews: number;
  bugs: number;
  mergeHours: number | null;
  voteRatio: number | null;
  prs: Pr[];
};

const METRICS = ["Avg. Time to Merge", "Upvote/Downvote Ratio", "# of Bugs Caught"] as const;
type Metric = (typeof METRICS)[number];

const PAGE_SIZE = 10;

export function RepositoriesView({
  handle,
  rows,
  all,
}: {
  handle: string;
  rows: Row[];
  all: { id: string; label: string; enabled: boolean }[];
}) {
  const [query, setQuery] = React.useState("");
  const [metric, setMetric] = React.useState<Metric>("Avg. Time to Merge");
  const [metricOpen, setMetricOpen] = React.useState(false);
  const [sortAsc, setSortAsc] = React.useState<boolean | null>(null);
  const [page, setPage] = React.useState(1);
  const [manageOpen, setManageOpen] = React.useState(false);
  const [prRepo, setPrRepo] = React.useState<Row | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q ? rows.filter((r) => r.label.toLowerCase().includes(q)) : rows;
    if (sortAsc === null) return base;
    return [...base].sort((a, b) =>
      sortAsc ? a.reviews - b.reviews : b.reviews - a.reviews,
    );
  }, [rows, query, sortAsc]);

  // Pagination is hidden entirely when results fit one page (frame 44).
  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  React.useEffect(() => setPage(1), [query]);

  function metricCell(r: Row) {
    if (metric === "Avg. Time to Merge") return formatDuration(r.mergeHours);
    if (metric === "# of Bugs Caught") return r.bugs > 0 ? `${r.bugs} bugs` : "—";
    return r.voteRatio === null ? "—" : `${r.voteRatio}%`;
  }

  return (
    <>
      <PageHeader
        title="Repositories"
        subtitle="Manage connected repositories and view review metrics."
      />

      <div className="mb-5 flex gap-3">
        <SearchInput
          placeholder="Search for repos by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="shrink-0" onClick={() => setManageOpen(true)}>
          Manage Repos
        </Button>
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Repo</Th>
            <Th className="w-[180px]">
              <button
                className="flex items-center gap-1.5"
                onClick={() => setSortAsc((v) => (v === null ? true : !v))}
              >
                Reviews
                <ChevronDown
                  className={cn("size-3 transition-transform", sortAsc && "rotate-180")}
                />
              </button>
            </Th>
            <Th className="relative w-[240px]">
              <button
                className="flex items-center gap-1.5"
                onClick={() => setMetricOpen((v) => !v)}
              >
                {metric === "Avg. Time to Merge"
                  ? "Avg. Time to Merge"
                  : metric === "# of Bugs Caught"
                    ? "# of Bugs Caught"
                    : "Upvote/Downvote Ratio"}
                <ChevronDown className="size-3" />
              </button>
              {metricOpen && (
                <div className="absolute left-3 top-10 z-30 w-[280px] rounded-[8px] border border-line bg-surface py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
                  {METRICS.map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        setMetric(m);
                        setMetricOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[15px] normal-case tracking-normal text-ink hover:bg-surface-muted"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {m}
                      {m === metric && <Check className="size-4" />}
                    </button>
                  ))}
                </div>
              )}
            </Th>
            <Th className="w-[160px]">Last 7 Days</Th>
          </tr>
        </thead>
        <tbody>
          {visible.length === 0 && <TableEmpty colSpan={4}>No results.</TableEmpty>}
          {visible.map((r) => (
            <tr
              key={r.id}
              onClick={() => setPrRepo(r)}
              className="cursor-pointer hover:bg-surface-muted/60"
            >
              <Td>
                <span className="flex items-center gap-2.5">
                  <GitHubMark className="size-4 text-ink" />
                  {r.label}
                </span>
              </Td>
              <Td className="text-ink-muted">
                {r.reviews} {r.reviews === 1 ? "review" : "reviews"}
              </Td>
              <Td className="text-ink-muted">{metricCell(r)}</Td>
              <Td>
                <Sparkline reviews={r.reviews} />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {pages > 1 && (
        <div className="mt-4 flex items-center">
          <p className="text-[14px] text-ink-muted">
            {visible.length} of {filtered.length}
          </p>
          <div className="mx-auto flex items-center gap-1">
            <PageBtn disabled={page === 1} onClick={() => setPage(page - 1)}>
              ‹
            </PageBtn>
            {Array.from({ length: pages }).map((_, i) => (
              <PageBtn key={i} active={page === i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </PageBtn>
            ))}
            <PageBtn disabled={page === pages} onClick={() => setPage(page + 1)}>
              ›
            </PageBtn>
          </div>
        </div>
      )}

      <ManageReposModal
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        handle={handle}
        repos={all}
      />

      <PullRequestModal repo={prRepo} onClose={() => setPrRepo(null)} />
    </>
  );
}

/** The LAST 7 DAYS column holds a sparkline; it renders empty with no data. */
function Sparkline({ reviews }: { reviews: number }) {
  if (reviews === 0) return null;
  const bars = [2, 5, 3, 6, 4, 7, 5].map((n) => Math.max(2, (n / 7) * 20));
  return (
    <span className="flex h-5 items-end gap-[3px]">
      {bars.map((h, i) => (
        <span key={i} className="w-[4px] rounded-[1px] bg-[#c9c9c5]" style={{ height: h }} />
      ))}
    </span>
  );
}

function PageBtn({
  children,
  active,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid size-8 place-items-center rounded-[6px] text-[14px]",
        active ? "bg-surface-muted text-ink" : "text-ink-muted hover:bg-surface-muted",
        disabled && "opacity-40",
      )}
    >
      {children}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Repo Settings modal — Enabled / Disabled tabs, bulk actions mirroring the tab
   --------------------------------------------------------------------------- */

function ManageReposModal({
  open,
  onClose,
  handle,
  repos,
}: {
  open: boolean;
  onClose: () => void;
  handle: string;
  repos: { id: string; label: string; enabled: boolean }[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [tab, setTab] = React.useState<"enabled" | "disabled">("enabled");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [query, setQuery] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const enabled = repos.filter((r) => r.enabled);
  const disabled = repos.filter((r) => !r.enabled);
  const list = (tab === "enabled" ? enabled : disabled).filter((r) =>
    r.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  React.useEffect(() => setSelected(new Set()), [tab, open]);

  const allChecked = list.length > 0 && list.every((r) => selected.has(r.id));
  const someChecked = list.some((r) => selected.has(r.id));

  async function apply(ids: string[], nextEnabled: boolean) {
    setBusy(true);
    await setRepoEnabled(handle, ids, nextEnabled);
    setBusy(false);
    setSelected(new Set());
    toast.push({
      title: "Success",
      body: `${ids.length} ${ids.length === 1 ? "repository" : "repositories"} ${nextEnabled ? "enabled" : "disabled"}`,
      tone: "success",
    });
    router.refresh();
  }

  async function applyAll(nextEnabled: boolean) {
    setBusy(true);
    await setAllReposEnabled(handle, nextEnabled);
    setBusy(false);
    setSelected(new Set());
    router.refresh();
  }

  const verb = tab === "enabled" ? "Disable" : "Enable";

  return (
    <Modal
      open={open}
      onClose={onClose}
      width={810}
      title={
        <span className="flex items-center gap-2.5">
          <Code2 className="size-5 text-ink-muted" />
          Repo Settings
        </span>
      }
      footer={
        <>
          <Button
            variant="secondary"
            disabled={busy}
            onClick={() => applyAll(tab !== "enabled")}
          >
            {verb} All
          </Button>
          <Button
            disabled={busy || selected.size === 0}
            onClick={() => apply([...selected], tab !== "enabled")}
          >
            {selected.size > 0 ? `${verb} ${selected.size} Repos` : `${verb} Repos`}
          </Button>
        </>
      }
    >
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories…"
          className="h-11 w-full rounded-[8px] border border-line bg-surface pl-9 pr-3 text-[15px] outline-none placeholder:text-ink-faint focus:border-ink/30"
        />
      </div>

      <div className="mb-4 inline-flex rounded-[8px] bg-surface-muted p-1">
        {(
          [
            ["enabled", `Enabled (${enabled.length})`],
            ["disabled", `Disabled (${disabled.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-[6px] px-4 py-1.5 text-[14px] transition-colors",
              tab === key ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[8px] border border-line">
        <div className="flex items-center gap-3 border-b border-line bg-surface-muted px-4 py-2.5">
          <Checkbox
            checked={allChecked}
            indeterminate={!allChecked && someChecked}
            onChange={(v) =>
              setSelected(v ? new Set(list.map((r) => r.id)) : new Set())
            }
          />
          <span className="mono-label">Repository</span>
        </div>
        <div className="thin-scroll max-h-[380px] overflow-y-auto">
          {list.length === 0 ? (
            <p className="px-4 py-12 text-center text-[15px] text-ink-muted">No results.</p>
          ) : (
            list.map((r) => (
              <label
                key={r.id}
                className="flex cursor-pointer items-center gap-3 border-b border-line px-4 py-3 last:border-b-0 hover:bg-surface-muted/60"
              >
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
                <GitHubMark className="size-4 text-ink" />
                <span className="text-[15px] text-ink">{r.label}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ---------------------------------------------------------------------------
   Pull-request picker — opened from a repo row
   --------------------------------------------------------------------------- */

function PullRequestModal({ repo, onClose }: { repo: Row | null; onClose: () => void }) {
  const [query, setQuery] = React.useState("");
  if (!repo) return null;

  // Only open pull requests are listed here (frame 53).
  const open = repo.prs.filter((p) => !query || p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <Modal
      open
      onClose={onClose}
      width={660}
      title={
        <span className="flex items-center gap-2.5 text-[20px]">
          <GitPullRequest className="size-5 text-ink-muted" />
          Pull Request for {repo.label}
        </span>
      }
    >
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pull Requests"
          className="h-11 w-full rounded-[8px] border border-line bg-surface pl-9 pr-3 text-[15px] outline-none placeholder:text-ink-faint focus:border-ink/30"
        />
      </div>

      <div className="min-h-[340px] space-y-3">
        {open.map((pr) => (
          <div
            key={pr.number}
            className="rounded-[8px] border border-line px-4 py-3.5 hover:bg-surface-muted/60"
          >
            <p className="text-[15px] font-semibold text-ink">
              <span className="mr-2 text-ink-muted">#{pr.number}</span>
              {pr.title}
            </p>
            <p className="mt-1 text-[13px] text-ink-muted">
              Created: {shortDate(pr.createdAt)}
              <span className="mx-2">·</span>
              Updated: {shortDate(pr.updatedAt)}
            </p>
          </div>
        ))}
        {open.length === 0 && (
          <p className="py-12 text-center text-[15px] text-ink-muted">No results.</p>
        )}
      </div>

      <p className="mt-4 text-right text-[14px] text-ink-muted">
        {open.length} open {open.length === 1 ? "pull request" : "pull requests"} found
      </p>
    </Modal>
  );
}
