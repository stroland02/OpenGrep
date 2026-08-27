# OpenGrep

An AI code review platform — repositories, pull requests, reviews, custom review
context, analytics, org management and billing — reconstructed from 135 UI
reference screenshots of the Greptile web app.

Not affiliated with Greptile. The screenshots in `Greptile UI/` are the project's
specification; `docs/screenshot-catalog/` is the inventory extracted from them.

## Quick start

```bash
npm install
npm run setup     # generate client, create SQLite db, seed reference data
npm run dev
```

Then open http://localhost:3000 and sign in:

```
alexsmith@content-mobbin.com
opengrep
```

The seed creates three organizations (`content-mobbin`, `asmobbin`, `slmobbin`),
eleven repositories, two pull requests with review history, and the five custom
context entries from the captures.

## What actually works

Everything below is real and persists to the database.

| Area | Behaviour |
| --- | --- |
| Auth | Email + password with bcrypt, httpOnly session cookies, lazy expiry cleanup |
| Multi-tenancy | Orgs addressed by URL handle; every page asserts membership before rendering |
| Repositories | Enable/disable with bulk actions; disabled repos leave the metrics table entirely |
| Pull requests | Bulk rerun walks COMPLETED → PENDING → COMPLETED and appends a review per pass |
| Reviews | The engine reads a diff and produces real findings; vote and mark-addressed feed the metrics |
| Custom context | Rules and glob patterns, org- or repo-scoped, with per-context effectiveness analytics |
| Code review settings | Strictness, auto-review, file limits, five composable PR-summary blocks, author filter rule builder, Markdown comment header |
| Analytics | Five charts computed from actual review data, filterable by repo/author/timeframe, CSV export |
| Org settings | Rename with dirty-state tracking, RBAC, invitations, type-to-confirm deletion |
| API keys | Generated, shown once, stored bcrypt-hashed; only a prefix persists |
| Billing | Luhn-validated card capture, payment methods, invoices, trial countdown |

## The AI seam

The review capability sits behind one interface in `src/lib/review-engine.ts`:

```ts
interface ReviewEngine {
  reviewPullRequest(input: ReviewInput): Promise<ReviewResult>
  optimizeRule(text: string): Promise<string>
}
```

`HeuristicReviewEngine` is the default and does real work: ten pattern rules
covering hardcoded secrets, SQL injection, bare `except`, empty catch blocks,
unawaited promises, `any`, leftover debug output and stale TODOs. Findings carry
P0/P1/P2 severities, and the org's strictness setting decides which of them
become comments — LOW surfaces everything, MEDIUM drops P2, HIGH keeps only
blocking issues. Findings are attributed back to whichever custom context covers
the file, which is what drives the per-context acceptance and usage metrics.

`ClaudeReviewEngine` is a stub implementing the same interface. Selecting it is a
config change:

```bash
REVIEW_ENGINE=claude
ANTHROPIC_API_KEY=sk-ant-...
```

Nothing above the interface changes.

## What is deliberately not real

Stated plainly so nothing here reads as more than it is:

- **No Git cloning or indexing.** Each pull request gets a deterministic synthetic
  diff from `src/lib/sample-diffs.ts`. The engine reads those lines exactly as it
  would read a real patch — swap that provider for a Git reader and the rest holds.
- **No OAuth.** GitHub/GitLab/Google buttons explain themselves rather than
  failing silently. Connecting a provider records the connection directly.
- **No payment processor.** The card form validates with a real Luhn check and
  reproduces the reference error strings, then stores a record. Nothing is charged.
- **No outbound email.** Invitations create `PENDING` memberships; password reset
  is a stub.

## Verification

```bash
npm run typecheck          # tsc --noEmit
npm run build              # full production build
npm run check:engine       # findings across all three strictness levels
npm run check:globs        # glob matcher + custom-context attribution
npm run check:pipeline     # PR -> diff -> engine -> stored review, then rolls back
```

## Design

Tokens were read off the screenshots rather than invented — mint `#2EE59D`,
canvas `#F7F7F6`, hairline `#E6E6E4`, P0/P1/P2 as red/orange/lime. Two details
that are easy to get wrong and are intentional:

- **Modal backdrops are a white wash, not a dark scrim.** The page fades out.
- **Uppercase monospace with wide tracking** marks every table header, chart
  title, stepper label and status value. It is the design system's signature.

Product inconsistencies are reproduced rather than tidied — `Last 60 days` in the
menu versus `Last 60 Days` in the applied chip, and three different empty-state
strings (`No results.`, `No payment methods`, `No invoice data available`).

The two sidebars are not the same component: Organization Settings' rail is a
router, Code Review Settings' rail is a scroll-spy anchor list.

## Layout

```
src/app/
  page.tsx                  marketing
  login, signup, reset-password
  onboarding/               name → org → survey → connect → review wizard → invite → billing → done
  [org]/                    analytics, repositories, pull-requests, custom-context,
                            code-review-settings, code-providers, integrations, settings/*
  settings/personal/        account + review preferences
src/lib/
  review-engine.ts          the AI seam
  analytics.ts              server-side aggregation
  analytics-shared.ts       types and pure helpers the client also needs
  auth.ts, db.ts, org.ts, utils.ts, sample-diffs.ts
prisma/
  schema.prisma, seed.ts
docs/
  screenshot-catalog/       per-screen inventory of all 135 references
  superpowers/specs/        design spec
```

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Prisma + SQLite ·
Recharts · Lucide · bcrypt

SQLite keeps setup to zero on Windows. Moving to Postgres is a `provider` and
connection-string change; no model depends on SQLite specifics.

## Security note

Screenshots 117 and 119 contain a legible API key from the real Greptile product,
captured at its one-time reveal step. It is committed in this repository's
history. If that key is live, rotate it.
