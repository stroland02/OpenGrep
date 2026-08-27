/**
 * The AI seam.
 *
 * Everything above this interface — settings that steer the reviewer, storage
 * of its findings, analytics over them — is real. What sits behind it is
 * swappable. The default implementation is deterministic and heuristic: it
 * produces genuine findings from pattern rules rather than pretending to think.
 *
 * Set REVIEW_ENGINE=claude and provide an API key to swap in a model. Nothing
 * above this file changes.
 */

export type Severity = "P0" | "P1" | "P2";

export interface ChangedFile {
  path: string;
  /** Added lines only — the reviewer comments on what the PR introduces. */
  addedLines: { line: number; text: string }[];
}

export interface ReviewInput {
  title: string;
  branch: string;
  author: string;
  files: ChangedFile[];
  /** Org strictness gates which severities produce comments. */
  strictness: "LOW" | "MEDIUM" | "HIGH";
  /** Authored rules and ingested instruction files, applied as extra context. */
  contexts: { id: string; description: string; filePattern: string }[];
}

export interface Finding {
  filePath: string;
  line: number;
  severity: Severity;
  body: string;
  rule: string;
  contextId?: string;
}

export interface ReviewResult {
  summary: string;
  confidenceScore: number; // out of 5
  sequenceDiagram: string;
  findings: Finding[];
}

export interface ReviewEngine {
  reviewPullRequest(input: ReviewInput): Promise<ReviewResult>;
  optimizeRule(text: string): Promise<string>;
}

// ---------------------------------------------------------------------------
// Heuristic engine — the default
// ---------------------------------------------------------------------------

interface PatternRule {
  id: string;
  severity: Severity;
  /** Files this rule applies to. */
  applies: RegExp;
  test: RegExp;
  message: string;
}

const RULES: PatternRule[] = [
  {
    id: "hardcoded-secret",
    severity: "P0",
    applies: /\.(ts|tsx|js|jsx|py|rb|go|java|php|env)$/i,
    test: /(password|api[_-]?key|secret|token)\s*[:=]\s*["'][^"']{6,}["']/i,
    message:
      "Hardcoded credential. Move this to an environment variable — committing secrets exposes them to anyone with repository access, and rotating them later means touching code.",
  },
  {
    id: "sql-injection",
    severity: "P0",
    applies: /\.(ts|tsx|js|jsx|py|rb|go|java|php)$/i,
    test: /(execute|query|raw)\s*\(\s*[`"'].*\$\{|\+\s*(req|request|params|input)\./i,
    message:
      "Query built by string interpolation. Use a parameterised query — user-controlled input reaching the SQL text is an injection path.",
  },
  {
    id: "bare-except",
    severity: "P1",
    applies: /\.py$/i,
    test: /except\s*:/,
    message:
      "Bare `except:` swallows everything, including KeyboardInterrupt and SystemExit. Catch the specific exception you expect.",
  },
  {
    id: "empty-catch",
    severity: "P1",
    applies: /\.(ts|tsx|js|jsx|java)$/i,
    test: /catch\s*\([^)]*\)\s*\{\s*\}/,
    message:
      "Empty catch block. Swallowing the error here means the failure is invisible in production — log it or rethrow.",
  },
  {
    id: "print-debugging",
    severity: "P2",
    applies: /\.(ts|tsx|js|jsx)$/i,
    test: /console\.(log|debug)\s*\(/,
    message:
      "Leftover `console.log`. Use the project logger so this can be filtered by level in production.",
  },
  {
    id: "python-print",
    severity: "P2",
    applies: /\.py$/i,
    test: /^\s*print\s*\(/,
    message:
      "Use `logging` rather than `print` — log output can be filtered by level and routed; print cannot.",
  },
  {
    id: "non-null-assertion",
    severity: "P1",
    applies: /\.(ts|tsx)$/i,
    test: /!\s*\.\s*\w+|\)\s*!\s*;/,
    message:
      "Non-null assertion drops the compiler's safety check. If the value can genuinely be null at runtime this becomes a crash rather than a type error.",
  },
  {
    id: "todo-left",
    severity: "P2",
    applies: /\.(ts|tsx|js|jsx|py|go|rb|java)$/i,
    test: /\/\/\s*(TODO|FIXME|HACK)|#\s*(TODO|FIXME|HACK)/,
    message:
      "TODO left in the diff. Either resolve it or open a tracked issue — comments like this outlive the context that produced them.",
  },
  {
    id: "any-type",
    severity: "P2",
    applies: /\.(ts|tsx)$/i,
    test: /:\s*any\b/,
    message:
      "`any` disables checking for this value and everything derived from it. Prefer `unknown` and narrow.",
  },
  {
    id: "missing-await",
    severity: "P1",
    applies: /\.(ts|tsx|js|jsx)$/i,
    test: /^\s*(?!.*await)(?!.*return).*\b\w+\.(save|create|update|delete|fetch)\s*\(/,
    message:
      "Promise-returning call is not awaited. The result — including any rejection — is discarded, so failures pass silently.",
  },
];

/** Which severities get commented on, per the strictness slider. */
const THRESHOLD: Record<ReviewInput["strictness"], Severity[]> = {
  LOW: ["P0", "P1", "P2"], // "Greptile will comment on all issues."
  MEDIUM: ["P0", "P1"], // "Greptile will comment on P2s less often."
  HIGH: ["P0"],
};

export class HeuristicReviewEngine implements ReviewEngine {
  async reviewPullRequest(input: ReviewInput): Promise<ReviewResult> {
    const allowed = new Set(THRESHOLD[input.strictness]);
    const findings: Finding[] = [];

    for (const file of input.files) {
      for (const { line, text } of file.addedLines) {
        for (const rule of RULES) {
          if (!rule.applies.test(file.path)) continue;
          if (!rule.test.test(text)) continue;
          if (!allowed.has(rule.severity)) continue;

          // Attribute the finding to a custom context when one covers this
          // file, so per-context usage analytics reflect real activity.
          const context = input.contexts.find((c) =>
            c.filePattern === "auto" ? false : matches(file.path, c.filePattern),
          );

          findings.push({
            filePath: file.path,
            line,
            severity: rule.severity,
            body: rule.message,
            rule: rule.id,
            contextId: context?.id,
          });
          break; // one finding per line keeps comments readable
        }
      }
    }

    return {
      summary: buildSummary(input, findings),
      confidenceScore: confidenceFrom(findings),
      sequenceDiagram: buildSequenceDiagram(input),
      findings,
    };
  }

  async optimizeRule(text: string): Promise<string> {
    // The product's "Optimize" rewrites a user's rule into the What/Why/Good/Bad
    // shape. Without a model we do the structural part, which is most of the
    // value: normalise the sections and synthesise a What line if it is missing.
    const lines = text.split("\n").map((l) => l.trimEnd());
    const has = (k: string) => lines.some((l) => l.toLowerCase().startsWith(k));

    if (has("what:")) return text.trim();

    const why = lines.find((l) => l.toLowerCase().startsWith("why:"));
    const subject = why
      ? why.slice(4).trim().replace(/\.$/, "")
      : text.split("\n")[0].trim();

    const what = `What: ${toDirective(subject)}`;
    return [what, ...lines].join("\n").trim();
  }
}

function toDirective(s: string): string {
  const t = s.charAt(0).toUpperCase() + s.slice(1);
  return t.length > 90 ? t.slice(0, 87) + "…" : t;
}

function matches(path: string, glob: string): boolean {
  const rx = glob
    .replace(/[.+^${}()|\\]/g, "\\$&")
    .replace(/\*\*\//g, "(?:.*/)?")
    .replace(/\*\*/g, ".*")
    .replace(/\*/g, "[^/]*");
  return new RegExp(`^${rx}$`, "i").test(path);
}

function buildSummary(input: ReviewInput, findings: Finding[]): string {
  const files = input.files.length;
  const p0 = findings.filter((f) => f.severity === "P0").length;
  const p1 = findings.filter((f) => f.severity === "P1").length;

  const parts = [
    `This pull request touches ${files} ${files === 1 ? "file" : "files"} on \`${input.branch}\`.`,
  ];

  if (p0 > 0) {
    parts.push(
      `${p0} blocking ${p0 === 1 ? "issue" : "issues"} found — these should be resolved before merge.`,
    );
  } else if (p1 > 0) {
    parts.push(
      `No blocking issues. ${p1} ${p1 === 1 ? "item" : "items"} worth addressing.`,
    );
  } else if (findings.length > 0) {
    parts.push("Only minor suggestions. Nothing blocking.");
  } else {
    parts.push("No issues found.");
  }

  return parts.join(" ");
}

function confidenceFrom(findings: Finding[]): number {
  if (findings.some((f) => f.severity === "P0")) return 2;
  const p1 = findings.filter((f) => f.severity === "P1").length;
  if (p1 >= 3) return 3;
  if (p1 > 0) return 4;
  return 5;
}

function buildSequenceDiagram(input: ReviewInput): string {
  const actors = input.files.slice(0, 4).map((f) => {
    const base = f.path.split("/").pop() ?? f.path;
    return base.replace(/\.[^.]+$/, "");
  });
  if (actors.length < 2) return "";

  const lines = ["sequenceDiagram"];
  for (let i = 0; i < actors.length - 1; i++) {
    lines.push(`    ${actors[i]}->>${actors[i + 1]}: call`);
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Claude engine — the swap target
// ---------------------------------------------------------------------------

/**
 * Placeholder implementing the same interface. Wiring this up is a matter of
 * calling the Messages API and mapping its structured output onto Finding[];
 * no consumer of ReviewEngine needs to change.
 */
export class ClaudeReviewEngine implements ReviewEngine {
  constructor(private apiKey: string) {}

  async reviewPullRequest(): Promise<ReviewResult> {
    throw new Error(
      "ClaudeReviewEngine is not implemented. Set REVIEW_ENGINE=heuristic, or implement this class against the Messages API.",
    );
  }

  async optimizeRule(): Promise<string> {
    throw new Error("ClaudeReviewEngine is not implemented.");
  }
}

let engine: ReviewEngine | null = null;

export function getReviewEngine(): ReviewEngine {
  if (engine) return engine;

  if (process.env.REVIEW_ENGINE === "claude") {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("REVIEW_ENGINE=claude requires ANTHROPIC_API_KEY");
    engine = new ClaudeReviewEngine(key);
  } else {
    engine = new HeuristicReviewEngine();
  }
  return engine;
}
