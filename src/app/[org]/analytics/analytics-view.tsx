"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Users,
  FolderGit2,
  User,
  Calendar,
  ExternalLink,
  GitPullRequest,
  Bug,
  Check,
  GitMerge,
  MessageSquare,
  Info,
  ChevronDown,
} from "lucide-react";
import {
  APPLIED_LABELS,
  TIMEFRAME_LABELS,
  analyticsToCsv,
  type AnalyticsData,
  type Timeframe,
} from "@/lib/analytics-shared";
import {
  BarPanel,
  ChartCard,
  LinePanel,
  MergeTimePanel,
  MetricSelect,
  VoteStats,
} from "@/components/analytics-charts";
import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

export function AnalyticsView({
  data,
  repos,
  authors,
  timeframe,
  selectedRepo,
  selectedAuthor,
  orgName,
}: {
  data: AnalyticsData;
  repos: { id: string; label: string }[];
  authors: string[];
  timeframe: Timeframe;
  selectedRepo?: string;
  selectedAuthor?: string;
  orgName: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [bugMetric, setBugMetric] = React.useState("All Severity");
  const [mergeMetric, setMergeMetric] = React.useState("Mean");
  const [commentMetric, setCommentMetric] = React.useState("Upvote/Downvote Ratio");

  function setParam(key: string, value?: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${pathname}?${next.toString()}`);
  }

  function exportCsv() {
    const blob = new Blob([analyticsToCsv(data)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `opengrep-analytics-${timeframe}d.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const repoLabel = selectedRepo
    ? (repos.find((r) => r.id === selectedRepo)?.label ?? "All repositories")
    : "All repositories";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[30px] font-semibold tracking-tight text-ink">Analytics</h1>

        <div className="flex flex-wrap items-center gap-2.5">
          <FilterMenu
            icon={<Users className="size-4" />}
            label={orgName}
            options={[{ value: "", label: "All teams" }, { value: orgName, label: orgName }]}
            value=""
            onChange={() => {}}
          />
          <FilterMenu
            icon={<FolderGit2 className="size-4" />}
            label={repoLabel}
            options={[
              { value: "", label: "All repositories" },
              ...repos.map((r) => ({ value: r.id, label: r.label })),
            ]}
            value={selectedRepo ?? ""}
            onChange={(v) => setParam("repo", v || undefined)}
          />
          <FilterMenu
            icon={<User className="size-4" />}
            label={selectedAuthor ?? "All authors"}
            options={[
              { value: "", label: "All authors" },
              ...authors.map((a) => ({ value: a, label: a })),
            ]}
            value={selectedAuthor ?? ""}
            onChange={(v) => setParam("author", v || undefined)}
          />
          <FilterMenu
            icon={<Calendar className="size-4" />}
            label={APPLIED_LABELS[timeframe]}
            sectionLabel="Timeframe"
            options={(["7", "30", "60", "90"] as Timeframe[]).map((t) => ({
              value: t,
              label: TIMEFRAME_LABELS[t],
            }))}
            value={timeframe}
            onChange={(v) => setParam("t", v)}
          />
          <Button onClick={exportCsv}>
            <ExternalLink className="size-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI strip */}
      <Card className="mb-6 grid grid-cols-2 gap-6 px-7 py-6 lg:grid-cols-4">
        <Kpi label="Total Reviews" value={String(data.totalReviews)} />
        <Kpi label="Avg Merge Time" value={data.avgMergeTime} />
        <Kpi label="Addressed rate" value={`${data.addressedRate}%`} />
        <Kpi
          label="# of critical bugs caught"
          value={String(data.criticalBugs)}
          note={
            data.criticalBugs > 0
              ? `in ${data.criticalBugRepos} ${data.criticalBugRepos === 1 ? "repo" : "repos"}`
              : undefined
          }
        />
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard
          icon={<GitPullRequest className="size-4" />}
          title="PRs reviewed by OpenGrep"
          select={
            <MetricSelect
              value="PRs reviewed"
              onChange={() => {}}
              options={["PRs reviewed"]}
            />
          }
          footerLabel="Top Repos by Review Count"
          leaders={data.topReposByReviews}
        >
          <BarPanel
            data={data.buckets}
            dataKey="reviews"
            axisTitle="PRS REVIEWED"
            name="reviews"
          />
        </ChartCard>

        <ChartCard
          icon={<Bug className="size-4" />}
          title="Critical bugs caught"
          select={
            <MetricSelect
              value={bugMetric}
              onChange={setBugMetric}
              options={["All Severity", "P0", "P1", "P2"]}
            />
          }
          footerLabel="Repos with most critical bugs"
          leaders={data.reposWithMostBugs}
        >
          <BarPanel
            data={data.buckets}
            dataKey="bugs"
            axisTitle="CRITICAL BUGS CAUGHT"
            name="bugs"
          />
        </ChartCard>

        <ChartCard
          icon={<Check className="size-4" />}
          title="Addressed rate"
          select={
            <span title="Share of OpenGrep comments that were acted on before merge.">
              <Info className="size-4 text-ink-faint" />
            </span>
          }
          footerLabel="Top repos by addressed rate"
          leaders={data.topReposByAddressed}
        >
          <div className="px-5 pb-1">
            <p className="text-[30px] font-semibold text-ink">{data.addressedRate}%</p>
            <p className="text-[14px] text-ink-muted">{data.addressedCount}</p>
          </div>
          <LinePanel
            data={data.buckets}
            dataKey="addressed"
            axisTitle="ADDRESSED RATE"
            name="addressed"
            suffix="%"
          />
        </ChartCard>

        <ChartCard
          icon={<GitMerge className="size-4" />}
          title="Average time to merge"
          select={
            <MetricSelect
              value={mergeMetric}
              onChange={setMergeMetric}
              options={["Mean", "Median"]}
            />
          }
          footerLabel="Top Repos by Merge Time"
          leaders={data.topReposByMergeTime}
        >
          <MergeTimePanel data={data.buckets} />
        </ChartCard>

        <ChartCard
          className="xl:col-span-2"
          icon={<MessageSquare className="size-4" />}
          title="OpenGrep comments"
          select={
            <MetricSelect
              value={commentMetric}
              onChange={setCommentMetric}
              options={["Upvote/Downvote Ratio"]}
            />
          }
          footerLabel="Most Upvoted Comments"
          leaders={data.mostUpvotedComments}
        >
          <VoteStats up={data.upvotePct} down={data.downvotePct} />
          <LinePanel
            data={data.buckets}
            dataKey="upvoteRatio"
            axisTitle="UPVOTE/DOWNVOTE RATIO"
            name="ratio"
            suffix="%"
          />
        </ChartCard>
      </div>
    </>
  );
}

function Kpi({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div>
      <p className="mb-1.5 text-[15px] text-ink-muted">{label}</p>
      <p className="text-[34px] font-semibold leading-none tracking-tight text-ink">
        {value}
      </p>
      {note && <p className="mt-1.5 text-[14px] text-ink-muted">{note}</p>}
    </div>
  );
}

function FilterMenu({
  icon,
  label,
  options,
  value,
  onChange,
  sectionLabel,
}: {
  icon: React.ReactNode;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  sectionLabel?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 max-w-[220px] items-center gap-2 rounded-[8px] border border-line bg-surface px-3 text-[14px] text-ink hover:bg-surface-muted"
      >
        <span className="text-ink-faint">{icon}</span>
        <span className="truncate">{label}</span>
        <ChevronDown
          className={cn("size-3.5 shrink-0 text-ink-faint transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-40 max-h-[320px] w-[280px] overflow-y-auto rounded-[8px] border border-line bg-surface py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
          {sectionLabel && <p className="mono-label px-4 py-1.5">{sectionLabel}</p>}
          {options.map((o) => (
            <button
              key={o.value || "all"}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-4 py-2.5 text-left text-[15px] hover:bg-surface-muted",
                o.value === value ? "text-ink" : "text-ink-muted",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
