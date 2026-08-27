# OpenGrep — Design Spec

**Date:** 2026-08-26
**Source of truth:** 135 screenshots of the Greptile web platform (Jul 2026), cataloged in `docs/screenshot-catalog/`.

OpenGrep is a functional reconstruction of Greptile: an AI code-review platform that
connects to Git providers, indexes repositories, reviews pull requests, and reports on
what it caught.

## Decisions taken

**Real app, swappable AI adapter.** Auth, database, orgs, repos, PRs, reviews, contexts,
settings, billing state and API keys are all real and persistent. The AI capability sits
behind one interface (`ReviewEngine`) whose default implementation is deterministic and
heuristic. Swapping in a real model is a single-file change and touches nothing else.

**Fidelity to the screenshots over invention.** Every string, column header, empty-state
message, and inconsistency in the catalog is reproduced verbatim — including the ones that
look like bugs (`Last 60 days` in the menu vs `Last 60 Days` in the applied chip;
`No results.` vs `No payment methods` vs `No invoice data available`). Where the product
is inconsistent, OpenGrep is inconsistent in the same places.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 15, App Router, TypeScript | Server components suit a settings-heavy CRUD app; one process for UI and API |
| Styling | Tailwind CSS v4 | Token-driven; the design system is a small, regular set of primitives |
| Database | SQLite via Prisma | Real persistence with zero setup on Windows. `provider` swap moves it to Postgres |
| Auth | Session cookie + bcrypt | The screenshots show email/password plus OAuth buttons; no external IdP needed to be functional |
| Charts | Recharts | Bar, line, dashed-average reference line, hover tooltip — all present in the captures |
| Icons | lucide-react | The catalog identifies Lucide as the icon set across every batch |
| Fonts | Plus Jakarta Sans + IBM Plex Mono | Closest free pairing to the observed geometric sans and the mono-uppercase label signature |

## Design tokens

Derived from the design-token sections of all nine catalog batches, taking the consensus
where batches disagreed.

```
--brand-green      #2EE59D   trial banner, logo, primary CTAs, chat FAB
--brand-green-dim  #D6F7E6   banner behind a modal
--lime             #E8F56B   onboarding card corner handles, RE-ANALYZED chip, P2 badge
--bg               #F7F7F6   page canvas
--surface          #FFFFFF   cards, tables, modals
--surface-muted    #F4F4F3   table headers, read-only fields, segmented tracks
--border           #E6E6E4   1px hairlines, everywhere
--text             #1A1A1A   primary
--text-muted       #6B6B6B   subtitles, help text
--text-faint       #A0A0A0   column headers, placeholders
--dark             #1A1A1A   primary button fill, toggle-on track, checkbox fill
--danger           #E5484D   destructive text and enabled destructive fill
--danger-soft      #FDE8E8   destructive at rest
--success          #1FA971   success toast text, upvote metrics
--warning          #D97706   amber banner text
--p0               #F87171
--p1               #FB923C
--p2               #D8F546
```

Shape: radius 8px on cards/buttons/inputs, 4px on chips and checkboxes, full round on
toggles and avatars. Borders 1px throughout. Shadows only on modals, dropdowns, popovers
and toasts — never on cards. Content max-width 1520px in the app shell, 1200px in settings.

Two details that are easy to get wrong and are deliberate:
- **Modal backdrops are a white wash, not a dark scrim.** The page fades out rather than
  darkening. Observed in batches 4, 5, 7, 8 and 9.
- **Uppercase monospace with wide letter-spacing** is the design system's signature. It
  marks every table header, chart title, stepper label, status value, and field label.

## Domain model

```
User ──< Membership >── Organization
 │                        ├──< CodeProvider ──< Repository ──< PullRequest ──< Review ──< ReviewComment
 ├──< LinkedAccount       ├──< CustomContext ──< ContextFile
 └──< Session             ├──< ApiKey
                          └──1 CodeReviewSettings
```

- **Membership** carries `role` (ADMIN | MEMBER) and `status` (ACTIVE | PENDING). A pending
  membership *is* an invitation — the People table renders both from one list.
- **Repository.enabled** drives the Repo Settings modal's Enabled/Disabled tabs and removes
  disabled repos from the metrics table entirely (confirmed in batch 4, frames 46–50).
- **PullRequest.status** cycles COMPLETED → PENDING → COMPLETED on rerun, and `reviewCount`
  increments only on completion.
- **CustomContext.type** is RULE or PATTERN. A PATTERN auto-discovers files by a
  case-insensitive glob and owns `ContextFile` rows; a RULE has none. The `description`
  doubles as the display name, so editing it renames the table row.
- **CodeReviewSettings** holds the strictness slider, auto-review toggles, file-change
  limit, the five composable PR-summary blocks with their collapsible/default-open pair,
  custom instructions, the author-filter rule builder, and the Markdown comment header.

## The AI seam

```ts
interface ReviewEngine {
  reviewPullRequest(input: ReviewInput): Promise<ReviewResult>
  optimizeRule(text: string): Promise<string>
  summarizeChanges(diff: DiffSummary): Promise<PrSummary>
}
```

`HeuristicReviewEngine` is the default: it produces real, deterministic findings from
pattern rules (hardcoded secrets, bare `except`, `console.log`, missing null checks,
oversized functions), assigns P0/P1/P2 by rule severity, and honours the org's strictness
setting and author filters. It is genuinely useful and never calls out.

`ClaudeReviewEngine` is a stub implementing the same interface, selected by
`REVIEW_ENGINE=claude` plus an API key. Nothing above the interface changes.

This is the honest version of "the AI part": the plumbing, the settings that steer it, the
storage of its output, and the analytics over it are all real. The model behind it is one
swap away.

## Route map

| Route | Screens (frames) |
| --- | --- |
| `/` | Marketing hero (0) |
| `/login` `/signup` `/reset-password` | Auth (1–3, 128–134) |
| `/onboarding/…` | name, organization, survey, connect, repositories, indexing, rules, review wizard ×4, invite, billing, complete (4–35) |
| `/[org]/analytics` | KPI strip, 5 charts, 4 filters, Export (36–42, 76–81) |
| `/[org]/repositories` | Metrics table, search, Repo Settings modal, PR picker (43–53) |
| `/[org]/code-review-settings` | Scroll-spy rail, 7 sections (87–91) |
| `/[org]/custom-context` | Table, Add Context wizard, Details drawer (54–67) |
| `/[org]/pull-requests` | Review history, bulk rerun (68–71) |
| `/[org]/code-providers` | Provider cards, kebab, disconnect (72–75) |
| `/[org]/integrations` | Coding agents |
| `/[org]/settings/{organization,people,billing,api-keys}` | Router rail, 4 tabs (92–119) |
| `/settings/personal[/review]` | Account + Review Settings (120–127) |

The two sidebars behave differently and must not be built from one component: Organization
Settings' rail is a **router**, Code Review Settings' rail is a **scroll-spy anchor list**.

## Fixtures

Seeded from the real data in the captures. Three orgs, because the screenshots span three:
`Content-mobbin`, `asmobbin`, `slmobbin`. User `Alex Smith` / `alexsmith@content-mobbin.com`,
later renamed `Sam Lee`. Eleven repositories under `samleemobbin-dot`. Two pull requests on
`laravel` with review history. Four discovered `AGENTS.md` / `CLAUDE.md` pattern contexts
plus one authored rule about hardcoded credentials.

Trial dates are computed relative to seed time rather than frozen, so the banner counts down
like the real one instead of showing a stale number.

## Out of scope

No real Git cloning, no embeddings, no webhook receiver, no Stripe account. The Stripe
payment modal is reproduced as a faithful form with client-side Luhn validation and the
observed error strings; it stores a card record and never contacts a processor.

## Security note

Screenshots 117 and 119 contain a legible API key from the real Greptile product. It is
committed in this repo's history. If that key is live it should be rotated.
