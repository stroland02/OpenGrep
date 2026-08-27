"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  ChevronDown,
  FolderTree,
  Plus,
  Scale,
  Sparkles,
  Trash2,
  X,
  FileText,
  ArrowRight,
} from "lucide-react";
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
  Textarea,
  Th,
  Toggle,
  useToast,
} from "@/components/ui";
import { GitHubMark } from "@/components/oauth-buttons";
import { cn, relativeTime, truncate } from "@/lib/utils";
import {
  createContext,
  deleteContexts,
  optimizeRule,
  setContextsActive,
  updateContext,
} from "./actions";

type Row = {
  id: string;
  type: "RULE" | "PATTERN";
  description: string;
  pattern: string | null;
  filePattern: string;
  scope: string;
  scopeIsOrg: boolean;
  repoId: string | null;
  active: boolean;
  updatedAt: string;
  fileCount: number;
  files: { path: string; sourceRepo: string }[];
  metrics: {
    usageCount: number;
    acceptanceRate: number;
    usesThisMonth: number;
    upvoteRatio: number;
    downvoteRatio: number;
  };
};

type Repo = { id: string; label: string; short: string };

export function CustomContextView({
  handle,
  orgName,
  rows,
  repos,
}: {
  handle: string;
  orgName: string;
  rows: Row[];
  repos: Repo[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [addOpen, setAddOpen] = React.useState(false);
  const [detail, setDetail] = React.useState<Row | null>(null);

  const filtered = rows.filter(
    (r) => !query.trim() || r.description.toLowerCase().includes(query.toLowerCase()),
  );

  const allChecked = filtered.length > 0 && filtered.every((r) => selected.has(r.id));
  const someChecked = filtered.some((r) => selected.has(r.id));

  async function bulk(action: "deactivate" | "delete") {
    const ids = [...selected];
    setSelected(new Set());
    if (action === "delete") {
      await deleteContexts(handle, ids);
      toast.push({ title: "Deleted", body: `${ids.length} removed.` });
    } else {
      await setContextsActive(handle, ids, false);
      toast.push({ title: "Deactivated", body: `${ids.length} set to inactive.` });
    }
    router.refresh();
  }

  return (
    <>
      <PageHeader title="Custom Context" subtitle={`Manage context for ${orgName}`} />

      <div className="mb-5 flex gap-3">
        <SearchInput
          placeholder="Search context or click to add filters"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="shrink-0" onClick={() => setAddOpen(true)}>
          <Plus className="size-4" />
          Add Context
        </Button>
      </div>

      {selected.size > 0 && (
        <div className="mb-4 flex items-center justify-end gap-4">
          <button
            onClick={() => bulk("delete")}
            className="text-[14px] font-medium text-danger hover:underline"
          >
            Delete ({selected.size})
          </button>
          <Button onClick={() => bulk("deactivate")}>Deactivate ({selected.size})</Button>
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
            <Th>Rules</Th>
            <Th className="w-[200px]">Scope</Th>
            <Th className="w-[90px]">Type</Th>
            <Th className="w-[130px]">Usage #</Th>
            <Th className="w-[180px]">
              <span className="flex items-center gap-1.5">
                Last Updated
                <ChevronDown className="size-3" />
              </span>
            </Th>
            <Th className="w-[120px]">Status</Th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && <TableEmpty colSpan={7}>No results.</TableEmpty>}
          {filtered.map((r) => (
            <tr
              key={r.id}
              className="cursor-pointer hover:bg-surface-muted/60"
              onClick={() => setDetail(r)}
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
              <Td>
                <span className="flex items-center gap-2.5">
                  {r.type === "PATTERN" && (
                    <ChevronDown className="size-3.5 -rotate-90 text-ink-faint" />
                  )}
                  <span className="font-medium">{truncate(r.description, 46)}</span>
                  {r.fileCount > 0 && (
                    <Badge>
                      {r.fileCount} {r.fileCount === 1 ? "file" : "files"}
                    </Badge>
                  )}
                </span>
              </Td>
              <Td>
                <span className="flex items-center gap-2 text-ink">
                  {r.scopeIsOrg ? (
                    <Building2 className="size-4 text-ink-muted" />
                  ) : (
                    <GitHubMark className="size-4 text-ink" />
                  )}
                  {truncate(r.scope, 18)}
                </span>
              </Td>
              <Td>
                <TypeTile type={r.type} />
              </Td>
              <Td className="text-ink-muted">
                {r.metrics.usageCount} {r.metrics.usageCount === 1 ? "review" : "reviews"}
              </Td>
              <Td className="text-ink-muted">{relativeTime(r.updatedAt)}</Td>
              <Td>
                <span className="mono-status text-ink-muted">
                  {r.active ? "ACTIVE" : "INACTIVE"}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AddContextWizard
        open={addOpen}
        onClose={() => setAddOpen(false)}
        handle={handle}
        repos={repos}
      />

      {detail && (
        <DetailsDrawer
          handle={handle}
          row={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  );
}

/** Rule rows and file rows are told apart by icon tint: pink scales vs indigo folder. */
function TypeTile({ type }: { type: "RULE" | "PATTERN" }) {
  return (
    <span
      className={cn(
        "grid size-7 place-items-center rounded-[6px]",
        type === "RULE" ? "bg-[#fdecef] text-[#e5484d]" : "bg-[#edebfb] text-[#6366f1]",
      )}
    >
      {type === "RULE" ? <Scale className="size-4" /> : <FolderTree className="size-4" />}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Add Context wizard — type, rule text, scope, review
   --------------------------------------------------------------------------- */

const RULE_PLACEHOLDER = `What: Using logging instead of printing log messages
Why: We can't filter log messages
Good: logging.error("error message")
Bad: print("error message")`;

function AddContextWizard({
  open,
  onClose,
  handle,
  repos,
}: {
  open: boolean;
  onClose: () => void;
  handle: string;
  repos: Repo[];
}) {
  const router = useRouter();
  const toast = useToast();
  const [step, setStep] = React.useState<1 | 4>(1);
  const [type, setType] = React.useState<"RULE" | "PATTERN">("RULE");
  const [text, setText] = React.useState("");
  const [pattern, setPattern] = React.useState("");
  const [repoId, setRepoId] = React.useState("");
  const [filePattern, setFilePattern] = React.useState("");
  const [optimizing, setOptimizing] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  function reset() {
    setStep(1);
    setType("RULE");
    setText("");
    setPattern("");
    setRepoId("");
    setFilePattern("");
  }

  async function optimize() {
    setOptimizing(true);
    const res = await optimizeRule(handle, text);
    setOptimizing(false);

    if (!res.ok) {
      // The reference product surfaces the raw proxy error here; we surface a
      // readable one rather than reproducing that particular rough edge.
      toast.push({ title: "Failed to optimize rule", body: res.error, tone: "error" });
      return;
    }
    setText(res.text);
  }

  async function create() {
    setBusy(true);
    await createContext(handle, {
      type,
      description: text.trim(),
      pattern: type === "PATTERN" ? pattern : undefined,
      repoId: repoId || undefined,
      filePattern: filePattern.trim() || "auto",
    });
    setBusy(false);
    toast.push({ title: "Success", body: "Context created", tone: "success" });
    onClose();
    reset();
    router.refresh();
  }

  const canAdvance = type === "RULE" ? text.trim().length > 0 : pattern.trim().length > 0;

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      title="Add Context"
      subtitle="Define custom rules and files for OpenGrep to apply."
      footer={
        step === 1 ? (
          <>
            <Button
              variant="secondary"
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button disabled={!canAdvance} onClick={() => setStep(4)}>
              Next
              <ArrowRight className="size-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button onClick={create} disabled={busy}>
              <Sparkles className="size-4" />
              Create Context
            </Button>
          </>
        )
      }
    >
      {step === 1 ? (
        <div className="space-y-7">
          <WizardStep n={1} label="Choose a context type">
            <div className="inline-flex rounded-[8px] bg-surface-muted p-1">
              {(["RULE", "PATTERN"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    "rounded-[6px] px-5 py-1.5 text-[14px]",
                    type === t ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
                  )}
                >
                  {t === "RULE" ? "Rule" : "File"}
                </button>
              ))}
            </div>
          </WizardStep>

          <WizardStep
            n={2}
            label={
              type === "RULE"
                ? "Teach OpenGrep how to use your codebase"
                : "Match files by pattern"
            }
          >
            {type === "RULE" ? (
              <div className="relative">
                <label className="mb-2 block text-[14px] font-medium text-ink">
                  Rule Description
                </label>
                <Textarea
                  rows={10}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={RULE_PLACEHOLDER}
                  className="font-mono text-[13px] leading-relaxed"
                />
                <button
                  onClick={optimize}
                  disabled={!text.trim() || optimizing}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-[6px] bg-ink px-2.5 py-1.5 text-[13px] text-white disabled:opacity-40"
                >
                  <Sparkles className="size-3.5" />
                  {optimizing ? "Optimizing…" : "Optimize"}
                </button>
              </div>
            ) : (
              <>
                <label className="mb-2 block text-[14px] font-medium text-ink">
                  Pattern
                </label>
                <input
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="**/[Aa][Gg][Ee][Nn][Tt][Ss].md"
                  className="h-11 w-full rounded-[8px] border border-line px-3 font-mono text-[14px] outline-none focus:border-ink/30"
                />
                <label className="mb-2 mt-4 block text-[14px] font-medium text-ink">
                  Description
                </label>
                <Textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Agents.md files"
                />
              </>
            )}
          </WizardStep>

          <WizardStep n={3} label="Apply this rule to a scope">
            <p className="mb-3 text-[14px] font-medium text-ink">Scope</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[13px] text-ink-muted">Repository</label>
                <select
                  value={repoId}
                  onChange={(e) => setRepoId(e.target.value)}
                  className="h-11 w-full rounded-[8px] border border-line bg-surface px-3 text-[15px] outline-none"
                >
                  <option value="">all</option>
                  {repos.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-[13px] text-ink-muted">File pattern</label>
                <input
                  value={filePattern}
                  onChange={(e) => setFilePattern(e.target.value)}
                  placeholder="e.g. src/**/*.tsx"
                  className="h-11 w-full rounded-[8px] border border-line px-3 font-mono text-[14px] outline-none focus:border-ink/30"
                />
              </div>
            </div>
          </WizardStep>
        </div>
      ) : (
        <WizardStep n={4} label="Review and confirm">
          <p className="mb-2 text-[14px] font-medium text-ink">
            {type === "RULE" ? "Rule Description" : "Pattern"}
          </p>
          <pre className="mb-5 overflow-x-auto whitespace-pre-wrap rounded-[8px] border border-line px-4 py-3 font-mono text-[13px] leading-relaxed text-ink">
            {type === "RULE" ? text : pattern}
          </pre>

          <p className="mb-2 text-[14px] font-medium text-ink">Scope</p>
          <div className="flex gap-2">
            <span className="rounded-[5px] bg-surface-muted px-2.5 py-1 font-mono text-[13px] text-ink-muted">
              {repoId ? (repos.find((r) => r.id === repoId)?.label ?? "all repos") : "all repos"}
            </span>
            <span className="rounded-[5px] bg-surface-muted px-2.5 py-1 font-mono text-[13px] text-ink-muted">
              {filePattern.trim() || "auto"}
            </span>
          </div>
        </WizardStep>
      )}
    </Modal>
  );
}

function WizardStep({
  n,
  label,
  children,
}: {
  n: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="grid size-6 place-items-center rounded-[5px] bg-surface-muted font-mono text-[12px] text-ink-muted">
          {n}
        </span>
        <p className="text-[15px] font-medium text-ink">{label}</p>
      </div>
      <div className="pl-9">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Details drawer — read mode toggles to edit, with per-context analytics
   --------------------------------------------------------------------------- */

function DetailsDrawer({
  handle,
  row,
  onClose,
}: {
  handle: string;
  row: Row;
  onClose: () => void;
}) {
  const router = useRouter();
  const toast = useToast();
  const [editing, setEditing] = React.useState(false);
  const [description, setDescription] = React.useState(row.description);
  const [pattern, setPattern] = React.useState(row.pattern ?? "");
  const [active, setActive] = React.useState(row.active);
  const [busy, setBusy] = React.useState(false);

  async function save() {
    setBusy(true);
    await updateContext(handle, row.id, { description, pattern, active });
    setBusy(false);
    setEditing(false);
    toast.push({ title: "Success", body: "Context updated", tone: "success" });
    router.refresh();
  }

  async function toggleActive(v: boolean) {
    setActive(v);
    await updateContext(handle, row.id, { active: v });
    router.refresh();
  }

  async function remove() {
    await deleteContexts(handle, [row.id]);
    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="scrim absolute inset-0" onClick={onClose} />
      <aside className="thin-scroll relative h-full w-full max-w-[510px] overflow-y-auto border-l border-line bg-surface">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-surface px-6 py-4">
          <h2 className="text-[20px] font-semibold text-ink">Details</h2>
          <div className="flex items-center gap-2">
            {editing ? (
              <>
                <button
                  onClick={remove}
                  className="rounded-[6px] border border-line p-2 text-danger hover:bg-danger-soft"
                  aria-label="Delete"
                >
                  <Trash2 className="size-4" />
                </button>
                <Button variant="secondary" size="sm" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={save} disabled={busy}>
                  Save
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => setEditing(true)}>
                Edit
              </Button>
            )}
            <button
              onClick={onClose}
              className="rounded p-1 text-ink-muted hover:bg-surface-muted hover:text-ink"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          {row.type === "PATTERN" && (
            <Field label="Pattern">
              <input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                disabled={!editing}
                className="h-11 w-full rounded-[8px] border border-line px-3 font-mono text-[13px] outline-none disabled:bg-surface-muted disabled:text-ink-muted"
              />
            </Field>
          )}

          <Field label="Type">
            <span className="inline-flex items-center gap-2 rounded-[6px] bg-[#edebfb] px-2.5 py-1.5">
              <TypeTile type={row.type} />
              <span className="mono-status text-[#6366f1]">{row.type}</span>
            </span>
          </Field>

          <Field label="Description">
            <Textarea
              rows={row.type === "RULE" ? 9 : 3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!editing}
              className={row.type === "RULE" ? "font-mono text-[13px]" : ""}
            />
          </Field>

          <Field label="Scope">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="mb-1.5 text-[13px] text-ink-muted">Repository</p>
                <p className="rounded-[8px] bg-surface-muted px-3 py-2.5 text-[15px] text-ink-muted">
                  {row.scopeIsOrg ? "all" : row.scope}
                </p>
              </div>
              <div>
                <p className="mb-1.5 text-[13px] text-ink-muted">File pattern</p>
                <p className="rounded-[8px] bg-surface-muted px-3 py-2.5 font-mono text-[14px] text-ink-muted">
                  {row.filePattern}
                </p>
              </div>
            </div>
          </Field>

          <Field label="Status">
            <div className="flex items-center gap-3">
              <Toggle checked={active} onChange={toggleActive} />
              <span className="text-[15px] text-ink">{active ? "Active" : "Inactive"}</span>
            </div>
          </Field>

          {row.files.length > 0 && (
            <Field label={`Files (${row.files.length})`}>
              <div className="space-y-3">
                {row.files.map((f) => (
                  <div key={f.path} className="rounded-[8px] border border-line p-4">
                    <p className="mb-3 flex items-center gap-2 font-mono text-[13px] font-semibold text-ink">
                      <FileText className="size-4 text-ink-muted" />
                      {f.path.split("/").pop()?.toUpperCase()}
                    </p>
                    <p className="text-[13px] text-ink-muted">
                      File path <span className="ml-2 font-mono text-ink">{f.path}</span>
                    </p>
                    <p className="mt-1 text-[13px] text-ink-muted">
                      Source repo <span className="ml-2 text-ink">{f.sourceRepo}</span>
                    </p>
                  </div>
                ))}
              </div>
            </Field>
          )}

          <div>
            <h3 className="mb-3 text-[19px] font-semibold text-ink">Snapshot Analytics</h3>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Acceptance rate" value={`${row.metrics.acceptanceRate}%`} tone="good" />
              <Stat label="Uses this month" value={String(row.metrics.usesThisMonth)} />
              <Stat label="Upvote ratio" value={`${row.metrics.upvoteRatio}%`} tone="good" />
              <Stat label="Downvote ratio" value={`${row.metrics.downvoteRatio}%`} tone="bad" />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[19px] font-semibold text-ink">Recent Usage</h3>
            {row.metrics.usageCount === 0 ? (
              <div className="rounded-[8px] border border-line px-4 py-10 text-center text-[15px] text-ink-muted">
                No recent usage available
              </div>
            ) : (
              <p className="text-[15px] text-ink">
                Cited in {row.metrics.usageCount}{" "}
                {row.metrics.usageCount === 1 ? "review comment" : "review comments"}.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[14px] font-medium text-ink">{label}</p>
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "good" | "bad";
}) {
  return (
    <div className="rounded-[8px] border border-line px-4 py-3">
      <p className="mb-1 text-[13px] text-ink-muted">{label}</p>
      <p
        className={cn(
          "text-[22px] font-semibold",
          tone === "good" && "text-success",
          tone === "bad" && "text-danger",
          !tone && "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}
