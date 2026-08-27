"use client";

import * as React from "react";
import {
  Activity,
  GitPullRequest,
  Settings2,
  MessageSquare,
  Code2,
  CheckCircle2,
  FolderPlus,
  Info,
  Plus,
  Trash2,
  ExternalLink,
  FileText,
  BarChart3,
  Table2,
  Workflow,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  PageHeader,
  Textarea,
  Toggle,
  useToast,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { saveReviewSettings, type SettingsPatch } from "./actions";

type Settings = {
  strictness: string;
  autoReviewOnNewCommits: boolean;
  reviewDraftPullRequests: boolean;
  fileChangeLimit: number;
  updateOriginalSummary: boolean;
  blocks: string;
  customInstructions: string;
  commentHeader: string;
  filters: string;
  codingAgents: string;
  statusChecks: boolean;
  autoEnableNewRepos: boolean;
};

type Block = { enabled: boolean; collapsible: boolean; defaultOpen: boolean };
type Filter = { subject: string; operator: string; values: string[] };

const SECTIONS = [
  ["when-opengrep-reviews", "When OpenGrep Reviews"],
  ["pr-summaries", "PR Summaries"],
  ["custom-instructions", "Custom Instructions"],
  ["opengrep-comments", "OpenGrep Comments"],
  ["default-coding-agents", "Default Coding Agents"],
  ["status-checks", "Status Checks"],
  ["auto-enable-new-repos", "Auto-enable New Repos"],
] as const;

const BLOCK_META: [keyof BlockMap, string, string, React.ElementType][] = [
  ["summary", "PR Summary", "Include a text summary of the changes", FileText],
  ["confidence", "Confidence Score", "Include a confidence rating for the PR", BarChart3],
  [
    "issueTable",
    "Issue Table",
    "Show a table of important files changed with ratings",
    Table2,
  ],
  [
    "sequenceDiagram",
    "Sequence Diagram",
    "Generate a sequence diagram of the changes",
    Workflow,
  ],
  [
    "outsideDiff",
    "Comments Outside Diff",
    "Allow comments on lines not in the diff",
    MessageSquare,
  ],
];

type BlockMap = {
  summary: Block;
  confidence: Block;
  issueTable: Block;
  sequenceDiagram: Block;
  outsideDiff: Block;
};

const DEFAULT_BLOCK: Block = { enabled: true, collapsible: false, defaultOpen: false };

const AGENTS = ["Cursor", "Claude Code", "Codex", "Conductor"];

export function CodeReviewSettingsView({
  handle,
  settings,
}: {
  handle: string;
  settings: Settings;
}) {
  const toast = useToast();
  const [state, setState] = React.useState(settings);
  const [active, setActive] = React.useState<string>(SECTIONS[0][0]);

  const blocks: BlockMap = React.useMemo(() => {
    const parsed = safeParse<Partial<BlockMap>>(state.blocks, {});
    return {
      summary: parsed.summary ?? DEFAULT_BLOCK,
      confidence: parsed.confidence ?? DEFAULT_BLOCK,
      issueTable: parsed.issueTable ?? DEFAULT_BLOCK,
      sequenceDiagram: parsed.sequenceDiagram ?? DEFAULT_BLOCK,
      outsideDiff: parsed.outsideDiff ?? DEFAULT_BLOCK,
    };
  }, [state.blocks]);

  const filters = React.useMemo(
    () => safeParse<Filter[]>(state.filters, []),
    [state.filters],
  );
  const agents = React.useMemo(
    () => safeParse<string[]>(state.codingAgents, []),
    [state.codingAgents],
  );

  // Settings save on change rather than behind a Save button — the reference
  // product has no save affordance on this page.
  const commit = React.useCallback(
    async (patch: SettingsPatch) => {
      setState((prev) => ({ ...prev, ...patch }) as Settings);
      await saveReviewSettings(handle, patch);
    },
    [handle],
  );

  // The rail here is a scroll-spy anchor list, not a router — unlike the one in
  // Organization Settings.
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    for (const [id] of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function setBlock(key: keyof BlockMap, patch: Partial<Block>) {
    const next = { ...blocks, [key]: { ...blocks[key], ...patch } };
    commit({ blocks: JSON.stringify(next) });
  }

  return (
    <>
      <PageHeader
        title="Code Review Settings"
        subtitle="Configure how OpenGrep reviews pull requests."
      />

      <div className="flex gap-10">
        <nav className="sticky top-6 hidden h-fit w-[275px] shrink-0 border-l border-line lg:block">
          {SECTIONS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                "-ml-px flex h-[52px] items-center border-l-2 px-5 text-[16px] transition-colors",
                active === id
                  ? "border-ink bg-[#efefef] font-medium text-ink"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="min-w-0 flex-1 space-y-12 pb-24">
          {/* ---------------- When OpenGrep Reviews ---------------- */}
          <Section
            id="when-opengrep-reviews"
            icon={Activity}
            title="When OpenGrep Reviews"
            subtitle="Control when OpenGrep runs and how much it reviews"
          >
            <Card>
              <Row label="Strictness Level" hint={strictnessHint(state.strictness)}>
                <StrictnessSlider
                  value={state.strictness}
                  onChange={(v) => commit({ strictness: v })}
                />
              </Row>
              <Row label="Auto-review on new commits">
                <Toggle
                  checked={state.autoReviewOnNewCommits}
                  onChange={(v) => commit({ autoReviewOnNewCommits: v })}
                />
              </Row>
              <Row
                label="Review draft pull requests"
                info="Draft PRs are usually work in progress; reviewing them can be noisy."
              >
                <Toggle
                  checked={state.reviewDraftPullRequests}
                  onChange={(v) => commit({ reviewDraftPullRequests: v })}
                />
              </Row>
              <Row
                label="File change limit"
                info="Pull requests touching more files than this are skipped."
                last
              >
                <input
                  type="number"
                  min={1}
                  value={state.fileChangeLimit}
                  onChange={(e) =>
                    commit({ fileChangeLimit: Number(e.target.value) || 1 })
                  }
                  className="h-10 w-[110px] rounded-[8px] border border-line px-3 text-[15px] outline-none focus:border-ink/30"
                />
              </Row>
            </Card>
          </Section>

          {/* ---------------- PR Summaries ---------------- */}
          <Section
            id="pr-summaries"
            icon={GitPullRequest}
            title="PR Summaries"
            subtitle="Adjust what OpenGrep posts at the top of the PR"
            action={
              <a
                href="/settings/personal/review"
                className="inline-flex items-center gap-1.5 text-[14px] text-brand-dark hover:underline"
              >
                Personal review settings
                <ExternalLink className="size-3.5" />
              </a>
            }
          >
            <Card>
              <Row label="Update original summary" last={BLOCK_META.length === 0}>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] text-ink-muted">less noisy</span>
                  <Toggle
                    checked={state.updateOriginalSummary}
                    onChange={(v) => commit({ updateOriginalSummary: v })}
                  />
                </div>
              </Row>

              <div className="space-y-3 p-5">
                {BLOCK_META.map(([key, title, desc, Icon]) => {
                  const b = blocks[key];
                  return (
                    <div key={key} className="rounded-[8px] border border-line">
                      <div className="flex items-center gap-4 px-5 py-4">
                        <Icon className="size-5 shrink-0 text-ink-muted" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[16px] font-medium text-ink">{title}</p>
                          <p className="text-[14px] text-ink-muted">{desc}</p>
                        </div>
                        <Toggle
                          checked={b.enabled}
                          onChange={(v) => setBlock(key, { enabled: v })}
                        />
                      </div>
                      <div className="flex gap-6 border-t border-line px-5 py-3">
                        <Checkbox
                          label="Collapsible"
                          checked={b.collapsible}
                          onChange={(v) =>
                            // Default Open only means anything inside a
                            // collapsible block, so it resets when this clears.
                            setBlock(key, {
                              collapsible: v,
                              defaultOpen: v ? b.defaultOpen : false,
                            })
                          }
                        />
                        <Checkbox
                          label="Default Open"
                          checked={b.defaultOpen}
                          disabled={!b.collapsible}
                          onChange={(v) => setBlock(key, { defaultOpen: v })}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Section>

          {/* ---------------- Custom Instructions ---------------- */}
          <Section
            id="custom-instructions"
            icon={Settings2}
            title="Custom Instructions"
            subtitle="Fine-tune how OpenGrep reviews your code"
          >
            <Card className="p-5">
              <div className="mb-2 flex items-center gap-1.5">
                <span className="text-[14px] font-medium text-ink">Instructions</span>
                <span title="Free-text steering applied to every review in this organization.">
                  <Info className="size-3.5 text-ink-faint" />
                </span>
              </div>
              <Textarea
                rows={5}
                value={state.customInstructions}
                onChange={(e) => setState({ ...state, customInstructions: e.target.value })}
                onBlur={() => commit({ customInstructions: state.customInstructions })}
                placeholder="Act like a strict reviewer."
              />
            </Card>
          </Section>

          {/* ---------------- OpenGrep Comments ---------------- */}
          <Section
            id="opengrep-comments"
            icon={MessageSquare}
            title="What should OpenGrep comment on?"
            subtitle="Adjust what OpenGrep should comment on"
          >
            <FilterBuilder
              filters={filters}
              onChange={(next) => commit({ filters: JSON.stringify(next) })}
            />

            <div className="mt-8">
              <h3 className="mb-1 text-[23px] font-semibold text-ink">
                What should be included in an OpenGrep comment?
              </h3>
              <p className="mb-4 text-[15px] text-ink-muted">
                Adjust what OpenGrep says when replying to code and highlighting issues
              </p>
              <Card className="p-5">
                <p className="mb-2 text-[14px] font-medium text-ink">Comment Header</p>
                <Textarea
                  rows={4}
                  value={state.commentHeader}
                  onChange={(e) => setState({ ...state, commentHeader: e.target.value })}
                  onBlur={() => commit({ commentHeader: state.commentHeader })}
                  className="font-mono text-[13px]"
                  placeholder="**Note:** reviewed automatically.&#10;---"
                />
                <p className="mt-2 text-[13px] text-ink-muted">
                  Markdown. Prepended to every comment OpenGrep posts.
                </p>
              </Card>
            </div>
          </Section>

          {/* ---------------- Default Coding Agents ---------------- */}
          <Section
            id="default-coding-agents"
            icon={Code2}
            title="Default Coding Agents"
            subtitle="Choose which agents to show fix buttons for"
          >
            <Card className="p-5">
              <div className="mb-4 flex flex-wrap gap-2">
                {agents.length === 0 && (
                  <p className="text-[15px] text-ink-muted">No agents configured.</p>
                )}
                {agents.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#fbeae2] px-2.5 py-1 text-[13px] font-medium text-[#d97757]"
                  >
                    Fix in {a.replace(" Code", "")}
                    <button
                      onClick={() =>
                        commit({
                          codingAgents: JSON.stringify(agents.filter((x) => x !== a)),
                        })
                      }
                      aria-label={`Remove ${a}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {AGENTS.filter((a) => !agents.includes(a)).map((a) => (
                  <Button
                    key={a}
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      commit({ codingAgents: JSON.stringify([...agents, a]) })
                    }
                  >
                    <Plus className="size-3.5" />
                    {a}
                  </Button>
                ))}
              </div>
            </Card>
          </Section>

          {/* ---------------- Status Checks ---------------- */}
          <Section
            id="status-checks"
            icon={CheckCircle2}
            title="Status Checks"
            subtitle="Report review results as a commit status on the pull request"
          >
            <Card>
              <Row label="Post a status check for every review" last>
                <Toggle
                  checked={state.statusChecks}
                  onChange={(v) => commit({ statusChecks: v })}
                />
              </Row>
            </Card>
          </Section>

          {/* ---------------- Auto-enable ---------------- */}
          <Section
            id="auto-enable-new-repos"
            icon={FolderPlus}
            title="Auto-enable New Repos"
            subtitle="Start reviewing repositories as soon as they appear"
          >
            <Card>
              <Row label="Enable new repositories automatically" last>
                <Toggle
                  checked={state.autoEnableNewRepos}
                  onChange={(v) => commit({ autoEnableNewRepos: v })}
                />
              </Row>
            </Card>
          </Section>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Pieces
   --------------------------------------------------------------------------- */

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  action,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <Icon className="mt-1 size-5 shrink-0 text-ink-muted" />
          <div>
            <h2 className="text-[23px] font-semibold leading-tight text-ink">{title}</h2>
            <p className="mt-0.5 text-[15px] text-ink-muted">{subtitle}</p>
          </div>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Row({
  label,
  hint,
  info,
  children,
  last,
}: {
  label: string;
  hint?: string;
  info?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-6 px-5 py-5",
        !last && "border-b border-line",
      )}
    >
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[17px] font-medium text-ink">
          {label}
          {info && (
            <span title={info}>
              <Info className="size-3.5 text-ink-faint" />
            </span>
          )}
        </p>
        {hint && (
          <span className="mt-1.5 inline-block rounded-[5px] bg-surface-muted px-2 py-1 text-[13px] text-ink-muted">
            {hint}
          </span>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function strictnessHint(level: string) {
  if (level === "LOW") return "OpenGrep will comment on all issues.";
  if (level === "HIGH") return "OpenGrep will only comment on blocking issues.";
  return "OpenGrep will comment on P2s less often.";
}

function StrictnessSlider({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const levels = ["LOW", "MEDIUM", "HIGH"];
  const index = Math.max(0, levels.indexOf(value));

  return (
    <div className="w-[240px]">
      <div className="mb-2 flex justify-between">
        {levels.map((l) => (
          <span key={l} className="mono-label">
            {l}
          </span>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={2}
        step={1}
        value={index}
        onChange={(e) => onChange(levels[Number(e.target.value)])}
        className="w-full accent-ink"
      />
    </div>
  );
}

/**
 * Comment targeting is a structured rule builder — subject, operator, values —
 * not free text (frames 89, 91).
 */
function FilterBuilder({
  filters,
  onChange,
}: {
  filters: Filter[];
  onChange: (next: Filter[]) => void;
}) {
  const [draft, setDraft] = React.useState("");

  function update(i: number, patch: Partial<Filter>) {
    onChange(filters.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  }

  return (
    <Card className="p-5">
      <p className="mb-3 text-[14px] font-medium text-ink">Filters</p>

      <div className="space-y-3">
        {filters.map((f, i) => (
          <div key={i} className="flex flex-wrap items-center gap-2">
            <select
              value={f.subject}
              onChange={(e) => update(i, { subject: e.target.value })}
              className="h-10 rounded-[8px] border border-line bg-surface px-3 text-[14px] outline-none"
            >
              <option>Authors</option>
              <option>Files</option>
              <option>Branches</option>
            </select>
            <select
              value={f.operator}
              onChange={(e) => update(i, { operator: e.target.value })}
              className="h-10 rounded-[8px] border border-line bg-surface px-3 text-[14px] outline-none"
            >
              <option>Exclude</option>
              <option>Include</option>
            </select>

            <div className="flex min-w-[280px] flex-1 flex-wrap items-center gap-1.5 rounded-[8px] border border-line px-2 py-1.5">
              {f.values.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 rounded-[5px] bg-surface-muted px-2 py-1 font-mono text-[12px] text-ink"
                >
                  <button
                    onClick={() =>
                      update(i, { values: f.values.filter((x) => x !== v) })
                    }
                    aria-label={`Remove ${v}`}
                  >
                    <X className="size-3" />
                  </button>
                  {v}
                </span>
              ))}
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && draft.trim()) {
                    e.preventDefault();
                    update(i, { values: [...f.values, draft.trim()] });
                    setDraft("");
                  }
                }}
                placeholder="add value…"
                className="min-w-[110px] flex-1 bg-transparent px-1 text-[13px] outline-none placeholder:text-ink-faint"
              />
            </div>

            <button
              onClick={() => onChange(filters.filter((_, idx) => idx !== i))}
              className="rounded-[6px] p-2 text-ink-muted hover:bg-danger-soft hover:text-danger"
              aria-label="Delete filter"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="mt-3"
        onClick={() =>
          onChange([...filters, { subject: "Authors", operator: "Exclude", values: [] }])
        }
      >
        <Plus className="size-3.5" />
        Add Filter
      </Button>
    </Card>
  );
}

function safeParse<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
