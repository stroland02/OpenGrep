<!-- BATCH SUMMARY WRITTEN LAST — see top section after completion -->

## Screenshots 15–29

### 15 — Onboarding: Enable Repositories (repo picker)
- **Route guess:** `/onboarding/repositories` (step 3 of connect flow)
- **Screen type:** onboarding-step
- **Flow:** GitHub connect / repo enablement onboarding. Continues from 14 (org selection); leads into 16.
- **Layout:** Two-column split. Left ~49% (0–935px): light-grey page with heading, then a bordered white card containing a vertical 3-step checklist, a search+action row, and a repo table. Right ~51%: dotted-grid canvas with a large 3D wireframe sphere of file-type node chips ("codegraph"), monospace caption at its lower left. Thin vertical hatched divider strip at x≈935–965. Bottom bar (full width, y≈1130–1195): `Logout` far left, `Back` and `Next` centered. Dark footer band (y≈1200–1325) with Greptile logo left, "curated by Mobbin" right.
- **Nav items visible:** No app nav. Stepper: `1. Connected to GitHub` (checked), `2. Org: samleemobbin-dot` (checked), `3. Enable Repositories` (active, non-check icon)
- **All visible text:**
  - Heading: `Choose repositories you would like greptile to review.`
  - Stepper: `1. Connected to GitHub` / `2. Org: samleemobbin-dot` / `3. Enable Repositories`
  - Search placeholder: `Select your repository to get started...`
  - Buttons: `Enable` (disabled), `Enable All`
  - Table headers: `REPOSITORIES`, `TYPE`
  - Rows (repo / type): `samleemobbin-dot/astrowind-lp` / `main`; `samleemobbin-dot/docs` / `main`; `samleemobbin-dot/doggy-stickers` / `main`; `samleemobbin-dot/landingpage` / `main`; `samleemobbin-dot/laravel` / `main`; `samleemobbin-dot/mini-landing-p…` / `main`; `samleemobbin-dot/newlandingpage` / `main`; `samleemobbin-dot/odyssey` / `main`; `samleemobbin-dot/openreact-lp` / `main`
  - Right panel caption: `ORG FOUND: SAMLEEMOBBIN-DOT`
  - Bottom bar: `Logout`, `Back ⌘+⇧+↵`, `Next ⌘+↵ →`
  - Dark footer: `Greptile`, `curated by`, `Mobbin`
- **Data entities:** Org `samleemobbin-dot`. Repos: astrowind-lp, docs, doggy-stickers, landingpage, laravel, mini-landing-p… (mini-landing-page), newlandingpage, odyssey, openreact-lp — all default branch `main`.
- **Controls:** Search input with magnifier icon; `Enable` button (secondary, greyed/disabled); `Enable All` (primary, solid black); header select-all checkbox; per-row checkboxes (all unchecked); `Back` (secondary white outline, ⌘+⇧+↵ hint); `Next` (primary but pale mint = disabled, ⌘+↵ hint + arrow); `Logout` (ghost link); floating circular chat/support button bottom-right (dark green, speech-bubble icon).
- **Table/list columns:** `REPOSITORIES` (checkbox + GitHub octocat mark + `org/repo`), `TYPE` (muted grey branch name). A third column is clipped at the card's right edge.
- **State shown:** Steps 1–2 complete (filled black circle + check), step 3 current. Zero repos selected → `Enable` and `Next` disabled. Repo list scrolls (clipped at bottom).
- **Behavior implied:** Greptile installs per-GitHub-org, then repos are opted in individually or via Enable All. Default branch tracked per repo. Keyboard shortcuts for Back/Next.
- **Notable visuals:** Right hero: point-cloud sphere (~120 nodes + edges) studded with colored rounded-square file chips (green, blue, yellow, pink) bearing file-type glyphs (TS, JSON, braces, database). Monospace uppercase caption.

### 16 — Onboarding: Repositories Enabled (success)
- **Route guess:** `/onboarding/repositories` (post-enable confirmation)
- **Screen type:** onboarding-step (success state)
- **Flow:** Same connect flow; continues from 15, leads into 17.
- **Layout:** Identical split. Left card now holds only the 3-step checklist (no search/table), so it is short. Right panel: same sphere, different rotation and caption.
- **Nav items visible:** Stepper `1. Connected to GitHub`, `2. Org: samleemobbin-dot`, `3. Repositories Enabled` — all three checked.
- **All visible text:**
  - Heading: `You've successfully connected your repositories!`
  - Stepper: `1. Connected to GitHub` / `2. Org: samleemobbin-dot` / `3. Repositories Enabled`
  - Right caption: `ENABLE REPOSITORY — GREPTILE IS CONSTRUCTING A GRAPH OF YOUR REPOS`
  - Bottom bar: `Logout`, `Back ⌘+⇧+↵`, `Next ⌘+↵ →`
  - Dark footer: `Greptile`, `curated by`, `Mobbin`
- **Data entities:** Org `samleemobbin-dot`.
- **Controls:** `Back` (secondary), `Next` (primary, now saturated green — enabled), `Logout`, chat bubble.
- **Table/list columns:** none.
- **State shown:** All 3 steps checked; `Next` enabled (contrast with 15's pale disabled state).
- **Behavior implied:** After enabling, Greptile immediately begins constructing the code graph asynchronously.
- **Notable visuals:** Same node-sphere; chips include a `DOC` glyph, heart glyph, refresh/sync glyphs.

### 17 — Onboarding: Indexing repos (codegraph + toast)
- **Route guess:** `/onboarding/indexing`
- **Screen type:** onboarding-step (progress) with toast
- **Flow:** Same flow; continues from 16, leads into 18.
- **Layout:** Same split. Left: heading + body paragraph + repo table (bordered, no outer card padding). Right: dotted canvas with an annotated sphere — a title chip top-right and four callout labels joined by hairlines to nodes; a toast card sits bottom-right, overlapping near the chat bubble.
- **Nav items visible:** none (stepper replaced by table)
- **All visible text:**
  - Heading: `Greptile is indexing your repos.`
  - Body: `Before reviewing your code, Greptile builds a full node graph of your repo. This step takes a little time, but ensures every PR review is thorough and context-aware.`
  - Table headers: `Repositories`, `Type`
  - Rows: `samleemobbin-dot/astrowind-lp` `main`; `samleemobbin-dot/docs` `main`; `samleemobbin-dot/doggy-stickers` `main`; `samleemobbin-dot/landingpage` `main`; `samleemobbin-dot/laravel` `main`; `samleemobbin-dot/mini-landing-page` `main`; `samleemobbin-dot/newlandingpage` `main` (clipped mid-row below)
  - Right panel chip: `FIG.1 CODEGRAPH FOR` + `SAMLEEMOBBIN-DOT/ASTROWIND-LP`
  - Node callouts: `index.ts`, `README.md`, `package.json`, `utils.ts`
  - Toast: `Repositories Submitted` / `11 repositories submitted for indexing.`
  - Bottom bar: `Logout`, `Back ⌘+⇧+↵`, `Next ⌘+↵ →`
  - Dark footer: `Greptile`, `curated by`, `Mobbin`
- **Data entities:** 11 repositories submitted for indexing. `mini-landing-page` now untruncated. Codegraph subject: `samleemobbin-dot/astrowind-lp`. Files: index.ts, README.md, package.json, utils.ts.
- **Controls:** `Back`, `Next` (primary green, enabled), `Logout`, chat bubble; toast has no visible dismiss control.
- **Table/list columns:** `Repositories` (GitHub mark + name), `Type` (muted `main`).
- **State shown:** Indexing in progress; success toast; count = 11.
- **Behavior implied:** Indexing is per-repo and produces a per-repo "codegraph" of files/symbols; onboarding does not block on it (Next enabled).
- **Notable visuals:** Annotated figure treatment — monospace label chips with thin leader lines to sphere nodes; toast is a plain white card with shadow, title + body.

### 18 — Onboarding: AI rules files detected
- **Route guess:** `/onboarding/rules`
- **Screen type:** onboarding-step (centered card on illustrated full-bleed canvas)
- **Flow:** Same flow; continues from 17, leads into 19 (review-config wizard).
- **Layout:** Full-width light dotted canvas scattered with pastel file-chips and crosshair registration marks. Centered white card (~x635–1285, y210–905) with lime accent squares at all four corners, holding a centered heading and a two-column table. Same bottom bar + dark footer.
- **Nav items visible:** none
- **All visible text:**
  - Heading: `We found some AI rules files, Greptile is adding them to its context now!`
  - Table rows (repo / detected files): `samleemobbin-dot/lara…` / (none); `samleemobbin-dot/min…` / `AGENT.MD 1`; `samleemobbin-dot/new…` / `CLAUDE.MD 1` + `AGENT.M…` (clipped); `samleemobbin-dot/ody…` / (none); `samleemobbin-dot/ope…` / (none); `samleemobbin-dot/pay…` / (none); `samleemobbin-dot/tail…` / (none)
  - Background decorative chips: `STYLE GUIDE`, `CURSOR.RULES`, `RULE`, `RULE`, `CLAUDE.MD`, `AGENT.MD`, `COPILOT`, `AGENTS.MD`
  - Bottom bar: `Logout`, `Back ⌘+⇧+↵`, `Next ⌘+↵ →`
  - Dark footer: `Greptile`, `curated by`, `Mobbin`
- **Data entities:** Repos (truncated): lara… (laravel), min… (mini-landing-page), new… (newlandingpage), ody… (odyssey), ope… (openreact-lp), pay…, tail…. Rules files found: `AGENT.MD` ×1 in mini-…, `CLAUDE.MD` ×1 and `AGENT.M…` in new….
- **Controls:** `Back`, `Next` (primary green), `Logout`, chat bubble. Table rows appear non-interactive (no checkboxes).
- **Table/list columns:** Unlabeled two columns: repo (GitHub mark + name), detected rules-file badges (small icon + monospace filename + numeric count).
- **State shown:** Scan complete; only 2 of 7 visible repos have rules files.
- **Behavior implied:** Greptile auto-discovers AI/agent rules files (AGENT.MD, AGENTS.MD, CLAUDE.MD, CURSOR.RULES, COPILOT, STYLE GUIDE) per repo and ingests them as review context — explicit interop with other AI coding tools.
- **Notable visuals:** Pastel badge pills (lilac CLAUDE.MD, blue AGENT.MD, lime STYLE GUIDE), scales/balance glyph on rules badges, crosshair marks, lime corner brackets on the card.

### 19 — Review config wizard: PR Analysis (PR summary contents)
- **Route guess:** `/onboarding/settings/pr-analysis`
- **Screen type:** onboarding-step / settings-tab (wizard step 1 of 4)
- **Flow:** Review-configuration wizard (19 → 20 → …). Continues from 18.
- **Layout:** Split. Left ~49%: 4-segment tab/progress strip at top, heading, subcopy, then a card with four toggle rows. Right ~51%: full-bleed coral/peach gradient photographic background carrying a floating pink mock of a GitHub PR comment by `greptile`. Same bottom bar + dark footer.
- **Nav items visible:** Wizard tabs (monospace uppercase): `PR ANALYSIS` (active, thick black underline), `COMMENT SCOPE`, `COMMIT BEHAVIOR`, `DEVELOPER TOOLS` (inactive, light-grey underlines)
- **All visible text:**
  - Heading: `What should be included in your PR summary?`
  - Subcopy: `A PR summary is an overview of the changes, added as a comment or appended to the PR description.`
  - Row 1: `PR Summary` / `Include a text summary of the changes` / `Collapsible`, `Default Open`
  - Row 2: `Sequence Diagrams` / `Generate a sequence diagram of the changes` / `Collapsible`, `Default Open`
  - Row 3: `Issue Table` / `Show a table of important files changed` / `Collapsible`, `Default Open`
  - Row 4: `Confidence Score` / `Include a confidence score out of 5 for the PR` / `Collapsible`, `Default Open`
  - Right-panel mock: `greptile`; blocks `PR Summary`, `Sequence Diagrams`, `Issue Table`, `Confidence Score`; issue-table headers `File`, `Score`, `Overview`; rows `src/app.tsx` `3/5` `Major structura…`, `src/utils.ts` `5/5` `Minor cleanup`; confidence body `5/5 – Ready to merge!`
  - Bottom bar: `Logout`, `Back ⌘+⇧+↵`, `Next ⌘+↵ →`
  - Dark footer: `Greptile`, `curated by`, `Mobbin`
- **Data entities:** Sample files `src/app.tsx` (3/5, "Major structura…"), `src/utils.ts` (5/5, "Minor cleanup"); PR confidence `5/5 – Ready to merge!`.
- **Controls:** Four pill toggles (all ON: black track, white knob right); eight checkboxes — `Collapsible` (enabled, unchecked) and `Default Open` (greyed/disabled) per row; four wizard tabs; `Back`, `Next` (primary green), `Logout`, chat bubble.
- **Table/list columns:** Settings rows: leading icon + title + description + trailing toggle, with a sub-row of two checkboxes.
- **State shown:** Tab 1 active; all four blocks enabled; all `Collapsible` unchecked, therefore all `Default Open` disabled (dependent checkbox).
- **Behavior implied:** Greptile posts a PR summary as a comment or appends it to the PR description, composed of optional blocks: text summary, sequence diagram, per-file issue table with /5 scores, and an overall /5 confidence score. Each block can render inside a collapsible section, open or closed by default.
- **Notable visuals:** Live preview of a GitHub comment rendered in coral/pink with redacted bar placeholders for text; sequence-diagram sketch with lifelines and arrows; monospace file paths; row icons (document, node-tree, table, bar chart).
