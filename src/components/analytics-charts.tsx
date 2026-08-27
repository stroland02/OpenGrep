"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronsUpDown, ThumbsDown, ThumbsUp } from "lucide-react";
import type { Bucket, Leader } from "@/lib/analytics";
import { GitHubMark } from "./oauth-buttons";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Chart card shell: mono uppercase title + leading icon, right-aligned metric
   select, plot area, footer mini-leaderboard.
   --------------------------------------------------------------------------- */

export function ChartCard({
  icon,
  title,
  select,
  children,
  footerLabel,
  leaders,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  select?: React.ReactNode;
  children: React.ReactNode;
  footerLabel?: string;
  leaders?: Leader[];
  className?: string;
}) {
  return (
    <div className={cn("rounded-[8px] border border-line bg-surface", className)}>
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2 text-ink-faint">
          {icon}
          <span className="mono-label">{title}</span>
        </div>
        {select}
      </div>

      <div className="px-3 pt-5">{children}</div>

      {footerLabel && (
        <div className="px-5 pb-5 pt-3">
          <p className="mb-2.5 text-[14px] text-ink-muted">{footerLabel}</p>
          <div className="space-y-1.5">
            {leaders?.length
              ? leaders.map((l) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-between text-[14px]"
                  >
                    <span className="flex min-w-0 items-center gap-2 text-ink">
                      <GitHubMark className="size-3.5 shrink-0 text-ink-muted" />
                      <span className="truncate">{l.name}</span>
                    </span>
                    <span className="ml-3 shrink-0 tabular-nums text-ink">{l.value}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </div>
  );
}

/** Bare select styled to match the in-card metric switchers. */
export function MetricSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-[8px] border border-line bg-surface pl-3 pr-8 text-[14px] text-ink outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-faint" />
    </div>
  );
}

const AXIS = {
  fontSize: 10,
  fontFamily: "var(--font-plex-mono), monospace",
  fill: "#a0a0a0",
  letterSpacing: "0.06em",
};

function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-[6px] border border-line bg-surface px-3 py-2 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <p className="mono-label mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-[13px]">
          <span className="size-2.5 rounded-[2px] bg-[#8a8a93]" />
          <span className="text-ink">{p.name}</span>
          <span className="ml-2 tabular-nums text-ink">
            {Math.round(p.value)}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Vertical bar chart with a rotated monospace axis title. */
export function BarPanel({
  data,
  dataKey,
  axisTitle,
  name,
}: {
  data: Bucket[];
  dataKey: "reviews" | "bugs";
  axisTitle: string;
  name: string;
}) {
  return (
    <div className="flex">
      <RotatedTitle text={axisTitle} />
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} margin={{ top: 4, right: 12, bottom: 4, left: 0 }}>
          <CartesianGrid vertical={false} stroke="#eeeeec" />
          <XAxis
            dataKey="label"
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={18}
          />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} width={34} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            content={<ChartTooltip />}
          />
          <Bar dataKey={dataKey} name={name} fill="#8a8a93" radius={[2, 2, 0, 0]} maxBarSize={26} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Line chart carrying a dashed AVERAGE reference line, labelled at its right end. */
export function LinePanel({
  data,
  dataKey,
  axisTitle,
  name,
  suffix = "",
}: {
  data: Bucket[];
  dataKey: "addressed" | "upvoteRatio";
  axisTitle: string;
  name: string;
  suffix?: string;
}) {
  const values = data.map((d) => d[dataKey]);
  const average = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  return (
    <div className="flex">
      <RotatedTitle text={axisTitle} />
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data} margin={{ top: 4, right: 54, bottom: 4, left: 0 }}>
          <CartesianGrid vertical={false} stroke="#eeeeec" />
          <XAxis
            dataKey="label"
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={18}
          />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} width={34} />
          <Tooltip content={<ChartTooltip suffix={suffix} />} />
          <ReferenceLine
            y={average}
            stroke="#b8b8b4"
            strokeDasharray="4 4"
            label={{
              value: "AVERAGE",
              position: "right",
              style: { ...AXIS, fontSize: 9 },
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke="#8a8a93"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Merge-time chart, which has to tolerate null buckets (no merges that day). */
export function MergeTimePanel({ data }: { data: Bucket[] }) {
  const points = data.map((d) => ({ ...d, value: d.mergeHours ?? 0 }));
  const real = data.filter((d) => d.mergeHours !== null).map((d) => d.mergeHours!);
  const average = real.length ? real.reduce((a, b) => a + b, 0) / real.length : 0;

  return (
    <div className="flex">
      <RotatedTitle text="AVERAGE TIME" />
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={points} margin={{ top: 4, right: 54, bottom: 4, left: 0 }}>
          <CartesianGrid vertical={false} stroke="#eeeeec" />
          <XAxis
            dataKey="label"
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={18}
          />
          <YAxis
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            width={40}
            tickFormatter={(v: number) => `${(v / 24).toFixed(1)}d`}
          />
          <Tooltip content={<ChartTooltip suffix="h" />} />
          <ReferenceLine
            y={average}
            stroke="#b8b8b4"
            strokeDasharray="4 4"
            label={{ value: "AVERAGE", position: "right", style: { ...AXIS, fontSize: 9 } }}
          />
          <Line
            type="monotone"
            dataKey="value"
            name="merge time"
            stroke="#8a8a93"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function RotatedTitle({ text }: { text: string }) {
  return (
    <div className="flex w-6 shrink-0 items-center justify-center">
      <span
        className="mono-label whitespace-nowrap"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {text}
      </span>
    </div>
  );
}

/** The upvote/downvote stat pair above the comments chart. */
export function VoteStats({ up, down }: { up: number; down: number }) {
  return (
    <div className="flex gap-12 px-5 pb-1 pt-4">
      <div>
        <p className="mono-label mb-1 flex items-center gap-1.5">
          <ThumbsUp className="size-3.5" />
          Upvotes
        </p>
        <p className="text-[30px] font-semibold text-success">{up}%</p>
      </div>
      <div>
        <p className="mono-label mb-1 flex items-center gap-1.5">
          <ThumbsDown className="size-3.5" />
          Downvotes
        </p>
        <p className="text-[30px] font-semibold text-danger">{down}%</p>
      </div>
    </div>
  );
}
