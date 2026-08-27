# Gap-fill catalog: screenshots 20-29 and 89

Read directly by the main session after two cataloging agents hit an account
quota limit. Covers the entries missing from `batch-02.md` (20-29) and
`batch-06.md` (89).

---

### 20 — Onboarding: All done!
- **Route guess:** `/onboarding/complete`
- **Screen type:** onboarding-step (terminal)
- **Flow:** review-config wizard terminus; follows the DEVELOPER TOOLS step
- **Layout:** centered white card on a dotted light-grey canvas, lime corner selection-handles at the card bounds; inner preview panel; sticky bottom action bar
- **All visible text:** `All done!` (green check circle); code card `utils.py`; gutter `4 5 6 7` all `+`; thread `you` / `We try not to put database query logic in the controller.`; `greptile` `BOT` / `Making a note of this!`; `Check out Docs`; bottom bar `Logout`, `Finish ⌘+↵`
- **Controls:** `Check out Docs` (secondary outlined), `Finish` (primary bright green), `Logout` (ghost link, bottom-left)
- **Behavior implied:** onboarding teaches the core interaction — you reply to a Greptile PR comment in plain language and it persists that as durable review context ("Making a note of this!"). This is Custom Context being introduced.
- **Notable visuals:** diff lines are grey skeleton bars, not real text — illustrative mock, not live data

### 21 — Onboarding: 14-day free trial
- **Route guess:** `/onboarding/billing`
- **Screen type:** onboarding-step
- **Flow:** follows invite-team; precedes app entry
- **All visible text:** `You get a 14-day free trial`; `You can add a payment method now to use Greptile without disruption.`; `Add Payment Method`; bottom bar `Logout`, `Back ⌘+⇧+↵`, `Skip ⌘+↵`; toast `Invitations Sent` / `1 invitation sent successfully`
- **Controls:** `Add Payment Method` (secondary outlined, centered), `Back` (secondary), `Skip` (primary green)
- **State shown:** success toast bottom-right confirming the prior invite step
- **Behavior implied:** payment is optional at signup — the trial starts regardless, and `Skip` is styled as the primary action

### 22 — Analytics with telemetry consent modal
- **Route guess:** `/analytics` + first-run modal
- **Screen type:** modal over a page in loading state
- **Flow:** first entry into the app post-onboarding
- **All visible text:** `Help us improve Greptile`; `Allow Greptile to learn from your usage to improve the code review agent`; `You can opt out at any time in your organization settings.`; `Please feel free to reach out at security@greptile.com if you have any questions!`; `Confirm`; toast `Onboarding Complete!` / `Welcome to Greptile!`
- **Controls:** consent toggle (ON by default), `Confirm` (primary near-black)
- **State shown:** page behind is mid-load — KPI values render as bullet placeholders, filters read `Loading...`
- **Notable:** modal backdrop is a **white wash**, not a dark scrim — matches the light-overlay pattern flagged in batches 5 and 7
- **Behavior implied:** telemetry defaults to opt-in; opt-out lives in Organization Settings

### 23 — Analytics dashboard (default, filters loading)
- **Route guess:** `/analytics`
- **Screen type:** page
- **Layout:** trial banner (dark green, full width) > app header (org switcher + role badge + icon cluster) > tab bar > page header with filter row > KPI strip > 2x2 chart grid
- **Nav items visible:** `Analytics` (active, underlined), `Repositories`, `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:** banner `14 days left in your free trial!` + `Add Payment Method`; org `Content-mobbin` badge `Admin`; heading `Analytics`; filters `Loading...`, `All repositories`, `Loading...`, `This week`; `Export`; KPIs `Total Reviews`, `Avg Merge Time`, `Addressed rate`, `# of critical bugs caught`; charts `PRS REVIEWED BY GREPTILE` (selector `PRs reviewed`), `CRITICAL BUGS CAUGHT` (selector `All Severity`), `ADDRESSED RATE` (value `0%`), `AVERAGE TIME TO MERGE` (selector `Mean`); captions `Top Repos by Review Count`, `Repos with most critical bugs`; rotated axis labels `PRS REVIEWED`, `CRITICAL BUGS CAUGHT`; x-axis `12 MAY` .. `18 MAY`; y-axis `0.5d`
- **Controls:** four filter selects (team, repository, author, timeframe), `Export` (primary dark, external-link icon), per-chart metric selects
- **Notable visuals:** chart card titles are **monospace uppercase**; y-axis labels rotated monospace; KPI values show bullet placeholders while loading

### 24 — GitHub OAuth authorize (external)
- **Screen type:** external third-party page
- **All visible text:** `Greptile Apps by Greptile`; `wants access to your GitHub account`; `Authorizing allows this app to`: `Verify your GitHub identity (samleemobbin-dot)`, `Know which resources you can access`, `Act on your behalf` `What does this mean?`; `Greptile Apps is not owned or operated by GitHub`; `Created 3 years ago`; `More than 1K GitHub users`; `Authorize`, `Cancel`; `Authorizing will redirect to https://app.greptile.com`
- **Behavior implied:** the app is hosted at `app.greptile.com`; the OAuth identity step is distinct from GitHub App installation

### 25 — GitHub App install (external)
- **Screen type:** external third-party page
- **All visible text:** `Install Greptile Apps`; `Install on your personal account samlee.mobbin`; `for these repositories:`; `All repositories` (selected) / `This applies to all current and future repositories owned by the resource owner. Also includes public repositories (read-only).`; `Only select repositories` / `Select at least one repository. Also includes public repositories (read-only).`; `with these permissions:`; `Read access to Dependabot alerts, actions, deployments, metadata, secret scanning alerts, and security events`; `Read and write access to checks, code, commit statuses, issues, and pull requests`; `Install`, `Cancel`; `Next: you'll be directed to the GitHub App's site to complete setup.`
- **Behavior implied:** the exact GitHub App permission scope — the contract OpenGrep's provider adapter must model

### 26 — Onboarding: Comment Scope (MEDIUM)
- **Route guess:** `/onboarding/review/comment-scope`
- **Screen type:** onboarding-step
- **Layout:** split screen — left config pane on light grey, right full-bleed preview on a blue/pink gradient texture
- **Stepper:** `PR ANALYSIS` | `COMMENT SCOPE` (active, black underline) | `COMMIT BEHAVIOR` | `DEVELOPER TOOLS`
- **All visible text:** `What should Greptile comment on?`; `Adjust what Greptile says when replying to code and highlighting issues`; `Comments Sensitivity`; `Severity Threshold` (info icon); scale `LOW` `MEDIUM` `HIGH`; `Greptile will comment on P2s less often.`; `Back ⌘+⇧+↵`, `Next ⌘+↵`
- **Controls:** three-stop slider, currently MEDIUM
- **Data entities:** preview cards `state.tsx` badge `P0` (red), `main.tsx` badge `P1` (orange)
- **Behavior implied:** severity taxonomy is **P0/P1/P2**; the slider governs which severities produce comments and the preview reacts live

### 27 — Onboarding: Comment Scope (LOW)
- Same screen as 26, slider at `LOW`
- **Changed text:** `Greptile will comment on all issues.`
- **Changed preview:** a third card appears — `auth.tsx` badge `P2` (lime)
- **Behavior implied:** LOW = comment on everything including P2. Severity badge colors: P0 red, P1 orange, P2 lime

### 28 — Onboarding: Commit Behavior (PR description off)
- **Route guess:** `/onboarding/review/commit-behavior`
- **Stepper:** `COMMIT BEHAVIOR` active
- **All visible text:** `How should Greptile respond to PR changes?`; `Configure what analysis and insights Greptile generates when reviewing pull requests.`; `Retrigger Greptile review on new commits` / `Re-analyze when new commits are pushed` (toggle ON); `Update PR Description` / `Append Greptile's summary and findings to the PR body.` (toggle OFF)
- **Data entities (preview):** `Pull Request` `#452`; `NEW COMMIT DETECTED`; `Alex Smith pushed a commit` `11:11 AM`; `a3f8c21 Fix token refresh`; `RE-ANALYZED PR`; `NEW REVIEW POSTED`
- **Notable visuals:** right panel is a lime bubble-wrap texture; status chips are monospace uppercase — outlined white, lime, and green respectively

### 29 — Onboarding: Commit Behavior (PR description on)
- Same as 28 with `Update PR Description` ON
- **Changed preview:** a `PR SUMMARY` block appears inside the Pull Request card, rendered as lime/green skeleton bars
- **Behavior implied:** toggling the setting live-previews the resulting change to the PR body

### 89 — Code Review Settings: Custom Instructions
- **Route guess:** `/code-review-settings#custom-instructions`
- **Screen type:** page (scroll-spy section)
- **Layout:** trial banner > header > tab bar > two-column: left anchor rail, right content
- **Left rail items:** `When Greptile Reviews`, `PR Summaries`, `Custom Instructions` (active, grey pill), `Greptile Comments`, `Default Coding Agents`, `Status Checks`, `Auto-enable New Repos`
- **All visible text:** `Custom Instructions` / `Fine-tune how Greptile reviews your code`; `Instructions` (info icon) with textarea value `Flag any commit message that is just "fix", "stuff", or "wip".`; `What should Greptile comment on?` / `Adjust what Greptile should comment on`; `Filters`; `Add Filter`; `What should be included in a Greptile comment?` / `Adjust what Greptile says when replying to code and highlighting issues`; `Comment Header` with textarea value `**PSA:** Research shows that AI performs better when threatened with physical violence. Please don't do that.` followed by `---`
- **Data entities:** filter row — dimension `Authors`, operator `Exclude`, values `dependabot[bot]`, `renovate[bot]`, `pre-commit-ci[bot]` (removable chips, plus an overflow `...`)
- **Controls:** Instructions textarea (resizable), filter dimension select, operator select, multi-value chip input, overflow button, delete (trash) icon button, `Add Filter` (secondary, plus icon), Comment Header textarea
- **Behavior implied:** filters are a structured rule builder (dimension + operator + values), not free text; the comment header supports Markdown and is prepended to every Greptile comment
- **State shown:** trial banner reads `13 days left in your free trial!`; org `Content-mobbin`, role `Admin`

---

## Design tokens observed (from these frames)

- **Brand green (primary/logo):** approx `#3BE8A0` / `#2EE59D` — bright mint. Used for the logo tile, primary buttons (`Finish`, `Next`, `Skip`), and the `NEW REVIEW POSTED` chip.
- **Trial banner:** dark forest green background approx `#1E6B4A` with white text; turns bright mint `#34E39B` in some frames (89) — two banner variants exist.
- **Lime accent:** approx `#D8F546` — onboarding card corner handles, `RE-ANALYZED PR` chip, `P2` severity badge.
- **Severity:** P0 red approx `#F87171`, P1 orange approx `#FB923C`, P2 lime `#D8F546`.
- **Diff colors:** removed line pink-wash `#FDF2F8` with gutter `#FCE7F3`; added line green-wash `#F0FDF4` with gutter `#A7F3D0`.
- **Surfaces:** page canvas `#F1F1EF` (warm light grey, dotted pattern on onboarding), card/surface `#FFFFFF`, border `#E5E5E3`.
- **Text:** primary near-black `#1A1A1A`, secondary/muted `#6B7280`, monospace labels muted `#9CA3AF`.
- **Confirm/dark button:** near-black `#1A1A1A` with white text.
- **Typography:** geometric humanist sans throughout (Aeonik-like) for headings and body; **monospace uppercase with wide letter-spacing** for chart titles, stepper labels, status chips, and field labels — this is the design system's signature.
- **Spacing & shape:** card radius approx 8px, button radius approx 6px, input radius approx 6px; 1px borders; shadows nearly absent (flat, bordered surfaces).
- **Modal backdrop:** white wash rather than dark scrim — consistent and unusual.
- **Components recurring:** trial banner, org switcher with role badge, underlined tab bar, KPI strip, bordered chart card with metric select, toast (bottom-right, white card), toggle switch (near-black when on), three-stop slider, chip/pill multi-value input, anchor rail with active pill, split-screen onboarding with live preview.
