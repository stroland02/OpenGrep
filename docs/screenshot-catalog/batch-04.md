# Batch 04 — Screenshots 45–59

## Batch summary

**Distinct screens/pages**
1. `Repositories` list page (49, 50, 52) — search, metrics table, pagination.
2. `Repo Settings` modal over Repositories (45, 46, 47, 48) — enable/disable repos, Enabled/Disabled tabs.
3. Repositories column-metric dropdown (51).
4. `Pull Request for <repo>` picker modal (53).
5. `Custom Context` list page (54, 59).
6. `Add Context` wizard modal (55, 56, 57, 58) — steps 1–3 and step 4 review.

**Flows**
- Manage repos / bulk enable-disable: **45–48**, resolving to the plain list at **49**.
- Repositories table sorting + metric switching: **50–52** (sort ascending → header dropdown → `# OF BUGS CAUGHT`).
- Per-repo pull-request picker: **53** (single shot).
- Custom Context: browse **54**, add-rule wizard **55–58**, created result **59**.

**Feature areas touched**
Repository connection/enablement, per-repo review metrics (reviews, avg. time to merge, upvote/downvote ratio, bugs caught), pull-request selection, custom review context (rules vs. files, `Agents.md` / `CLAUDE.md` ingestion, repo+glob scoping, AI `Optimize`), free-trial billing banner, org/role chrome.

**Could not fully interpret**
- The `LAST 7 DAYS` column (49, 50) is always visually empty — probably a sparkline that renders only with data.
- In 52 the fourth column header loses its label and shows only a bare sort glyph; whether that is a bug or an intentional collapsed state is unclear.
- The exact glyph in the `TYPE` column icon tiles (54, 59) is small; described by shape and tint.

### 45 — Repositories › Repo Settings modal (Enabled tab, nothing selected)
- **Route guess:** `/repositories` with a `Repo Settings` modal open
- **Screen type:** modal (over the Repositories page)
- **Flow:** "Manage repos / enable-disable repositories". Opened from the `Manage Repos` button on the Repositories page. Continues into 46.
- **Layout:** Full-width green trial banner (~60px) at the very top. Below it a white app header: org logo (green diamond/box mark) + org name + role pill + vertical chevron switcher on the left; three icon buttons on the right (book/docs, gift, avatar). Below that a horizontal tab nav row with a bottom rule. Main content is a centered ~1520px column: page title, subtitle, search + button row, then a table. A centered modal (~810px wide) overlays the page; the page behind is white-washed/dimmed. A fixed dark footer strip at the bottom is the Mobbin watermark (not part of the product). Round green chat-launcher bubble bottom-right.
- **Nav items visible:** `Analytics`, `Repositories` (ACTIVE — dark text + underline), `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - Trial banner: `14 days left in your free trial!` / button `+ Add Payment Method`
  - Header: `Content-mobbin` / `Admin`
  - Tabs: `Analytics` `Repositories` `Code Review Settings` `Custom Context` `Pull Requests` `Code Providers` `Integrations` `Organization Settings`
  - Page behind modal: `Repositories` / `Manage connected repositories and view review metrics.` / placeholder `Search for repos by name` / `Manage Repos` / column headers `REPO`, `…ERGE` (AVG. TIME TO MERGE, occluded), `LAST 7 DAYS` / footer `10 of 11` / pagination `1` `2`
  - Modal: `Repo Settings` (with a code-bracket icon) / placeholder `Search repositories…` / tabs `Enabled (11)` and `Disabled (0)` / column header `REPOSITORY` / buttons `Disable Repos` (disabled, grey) and `Disable All`
- **Data entities:** Modal repos (page 1 of 2): `samleemobbin-dot/astrowind-lp`, `samleemobbin-dot/docs`, `samleemobbin-dot/doggy-stickers`, `samleemobbin-dot/landingpage`, `samleemobbin-dot/laravel`, `samleemobbin-dot/mini-landing-page`, `samleemobbin-dot/newlandingpage`, `samleemobbin-dot/odyssey`. Background table repos: `samleemobbin-dot/laravel`, `/astrowind-lp`, `/docs`, `/doggy-stickers`, `/landingpage`, `/mini-landing-pa…`, `/newlandingpage`, `/odyssey`, `/openreact-lp`, `/payload-website…`. Org `Content-mobbin`, role `Admin`. Counts: Enabled 11, Disabled 0, `10 of 11`.
- **Controls:** `+ Add Payment Method` (white pill on green banner); org switcher (up/down chevron icon button); docs/book icon button; gift icon button; avatar button; tab links; search input (magnifier, placeholder `Search for repos by name`); `Manage Repos` (primary, black); column sort dropdowns (`REVIEWS ⌄`, `AVG. TIME TO MERGE ⌄`, `LAST 7 DAYS ⌄`); pagination `‹` `1` `2` `›`; modal close `✕`; modal search input (`Search repositories…`); segmented tabs `Enabled (11)` / `Disabled (0)`; header select-all checkbox; per-row checkboxes; modal pagination `‹ 1 2 ›`; `Disable Repos` (primary, disabled); `Disable All` (secondary/outline); chat bubble FAB.
- **Table/list columns:** Modal list: [checkbox] | `REPOSITORY` (GitHub octocat icon + `owner/name`). Background table: `REPO` | `REVIEWS` | `AVG. TIME TO MERGE` | `LAST 7 DAYS`.
- **State shown:** `Enabled (11)` tab active (white pill on a grey track); no checkboxes checked; `Disable Repos` disabled; modal pagination on page `1` of `2`.
- **Behavior implied:** Repos can be individually enabled/disabled for review; bulk disable via multi-select or `Disable All`. Free trial with day countdown and payment prompt. Org-scoped with roles (Admin).
- **Notable visuals:** GitHub octocat mark per row; code-bracket icon in the modal title; dimmed page behind the modal (a white wash, not a dark scrim); green brand accent.

### 46 — Repo Settings modal — two repos checked
- **Route guess:** `/repositories` (modal open)
- **Screen type:** modal
- **Flow:** Continues from 45; selection state before bulk-disable. Leads to 47.
- **Layout:** Identical to 45.
- **Nav items visible:** Same as 45; `Repositories` active.
- **All visible text:** Identical to 45 except the primary modal button now reads `Disable 2 Repos` (black, enabled).
- **Data entities:** Same repo list as 45. Checked: `samleemobbin-dot/docs`, `samleemobbin-dot/doggy-stickers`.
- **Controls:** Same as 45; `Disable 2 Repos` is now an enabled primary button.
- **Table/list columns:** Same as 45.
- **State shown:** Header select-all checkbox in the indeterminate state (dark square with a dash); 2 row checkboxes checked (dark fill + white check); the bulk button label reflects the selection count.
- **Behavior implied:** Bulk action label is dynamic (`Disable Repos` → `Disable N Repos`); tri-state select-all.
- **Notable visuals:** Indeterminate checkbox glyph.

### 47 — Repo Settings modal — after disabling (Enabled 9)
- **Route guess:** `/repositories` (modal open)
- **Screen type:** modal
- **Flow:** Continues from 46 (post bulk-disable). Leads to 48.
- **Layout:** Identical; the modal body is slightly shorter — no pagination row, since 9 items fit on one page.
- **Nav items visible:** Same; `Repositories` active.
- **All visible text:** Same chrome. Modal tabs now `Enabled (9)` / `Disabled (2)`. Buttons `Disable Repos` (disabled grey) / `Disable All`.
- **Data entities:** Enabled list: `samleemobbin-dot/astrowind-lp`, `/landingpage`, `/laravel`, `/mini-landing-page`, `/newlandingpage`, `/odyssey`, `/openreact-lp`, `/payload-website-starter`, `/tailwind-lp`. The background table now also shows `samleemobbin-dot/tailwind-lp` and no longer lists docs / doggy-stickers.
- **Controls:** Same set as 45; pagination gone.
- **Table/list columns:** [checkbox] | `REPOSITORY`.
- **State shown:** `Enabled (9)` tab active; no selections; `Disable Repos` disabled. The background table has re-flowed to match.
- **Behavior implied:** Disabling removes repos from the enabled list and from the main Repositories metrics table immediately; both tab counts update live.
- **Notable visuals:** None new.

### 48 — Repo Settings modal — Disabled tab
- **Route guess:** `/repositories` (modal open)
- **Screen type:** modal (tab switched)
- **Flow:** Continues from 47; the user clicks the `Disabled (2)` tab. Leads to 49 (modal dismissed).
- **Layout:** Same modal; the list region is mostly empty below the two rows (the modal body keeps a fixed height, leaving ~560px of whitespace).
- **Nav items visible:** Same; `Repositories` active.
- **All visible text:** Modal: `Repo Settings`, `Search repositories…`, `Enabled (9)`, `Disabled (2)`, `REPOSITORY`, `Enable Repos` (disabled grey), `Enable All`.
- **Data entities:** `samleemobbin-dot/docs`, `samleemobbin-dot/doggy-stickers`.
- **Controls:** Close `✕`; search input; segmented tabs; select-all checkbox; 2 row checkboxes; `Enable Repos` (primary, disabled); `Enable All` (secondary/outline).
- **Table/list columns:** [checkbox] | `REPOSITORY`.
- **State shown:** `Disabled (2)` tab active (white pill); nothing selected; primary action disabled.
- **Behavior implied:** The action buttons mirror the active tab (Disable ↔ Enable), so one modal handles both directions.
- **Notable visuals:** Large empty area under the short list.

### 49 — Repositories (list page, modal closed)
- **Route guess:** `/repositories`
- **Screen type:** page
- **Flow:** End of the manage-repos flow. Baseline Repositories page; leads into 50.
- **Layout:** Green trial banner → white header (org identity left, three icon buttons right) → tab nav with a bottom rule → main column (~1520px, centered, left-aligned): H1 + subtitle, then a row with a full-width search input and a `Manage Repos` button at the right, then a bordered table with a light-grey header row, then a footer row with the count on the left and pagination centered. Dark Mobbin strip at the bottom.
- **Nav items visible:** `Analytics`, `Repositories` (ACTIVE), `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - Banner: `14 days left in your free trial!` / `+ Add Payment Method`
  - Header: `Content-mobbin` `Admin`
  - Main: `Repositories` / `Manage connected repositories and view review metrics.` / placeholder `Search for repos by name` / `Manage Repos`
  - Table headers: `REPO` / `REVIEWS` / `AVG. TIME TO MERGE` / `LAST 7 DAYS`
  - Rows: `samleemobbin-dot/laravel` `2 reviews` `—`; `samleemobbin-dot/astrowind-lp` `0 reviews` `—`; `samleemobbin-dot/docs` `0 reviews` `—`; `samleemobbin-dot/doggy-stickers` `0 reviews` `—`; `samleemobbin-dot/landingpage` `0 reviews` `—`; `samleemobbin-dot/mini-landing-page` `0 reviews` `—`; `samleemobbin-dot/newlandingpage` `0 reviews` `—`; `samleemobbin-dot/odyssey` `0 reviews` `—`; `samleemobbin-dot/openreact-lp` `0 reviews` `—`; `samleemobbin-dot/payload-website-starter` `0 reviews` `—`
  - Footer: `10 of 11` / `1` `2`
- **Data entities:** The 10 repos above (the 11th, on page 2, is `samleemobbin-dot/tailwind-lp`); review counts 2 and 0; avg time to merge all `—`.
- **Controls:** Search input (magnifier, italic placeholder); `Manage Repos` (primary black); sortable column headers `REVIEWS ⌄`, `AVG. TIME TO MERGE ⌄`, `LAST 7 DAYS ⌄`; pagination `‹`, `1` (active, grey pill), `2`, `›`; chat FAB.
- **Table/list columns:** `REPO` (octocat icon + full name) | `REVIEWS` (`N reviews`) | `AVG. TIME TO MERGE` (em dash when no data) | `LAST 7 DAYS` (empty in every row — likely a sparkline slot).
- **State shown:** Page 1 of 2 active; no row selected; no sort indicator applied.
- **Behavior implied:** Per-repo review metrics over a 7-day window; header labels double as sort/period selectors.
- **Notable visuals:** Uppercase, letter-spaced, monospace-flavored table headers; octocat avatars; em dashes for null metrics.

### 50 — Repositories sorted by REVIEWS ascending (9 repos)
- **Route guess:** `/repositories?sort=reviews&dir=asc`
- **Screen type:** page (sorted table)
- **Flow:** Repositories table sorting/metric-switching flow (50–52). Continues from 49; leads into 51.
- **Layout:** Same as 49, but the table has 9 rows and no pagination/count footer.
- **Nav items visible:** Same eight tabs; `Repositories` active.
- **All visible text:**
  - Banner: `14 days left in your free trial!` / `+ Add Payment Method`
  - Header: `Content-mobbin` `Admin`
  - Main: `Repositories` / `Manage connected repositories and view review metrics.` / `Search for repos by name` / `Manage Repos`
  - Headers: `REPO` / `REVIEWS ⌃` / `AVG. TIME TO MERGE ⌄` / `LAST 7 DAYS ⌄`
  - Rows: `samleemobbin-dot/astrowind-lp` `0 reviews` `—`; `samleemobbin-dot/landingpage` `0 reviews` `—`; `samleemobbin-dot/mini-landing-page` `0 reviews` `—`; `samleemobbin-dot/newlandingpage` `0 reviews` `—`; `samleemobbin-dot/odyssey` `0 reviews` `—`; `samleemobbin-dot/openreact-lp` `0 reviews` `—`; `samleemobbin-dot/payload-website-starter` `0 reviews` `—`; `samleemobbin-dot/tailwind-lp` `0 reviews` `—`; `samleemobbin-dot/laravel` `2 reviews` `—`
- **Data entities:** The 9 enabled repos (docs and doggy-stickers are gone, matching the disable in 46–47); `laravel` = 2 reviews, all others 0.
- **Controls:** Same as 49; the `REVIEWS` header chevron now points UP (ascending sort applied). No pagination row (9 rows fit one page).
- **Table/list columns:** `REPO` | `REVIEWS` | `AVG. TIME TO MERGE` | `LAST 7 DAYS`.
- **State shown:** Sorted ascending by `REVIEWS` — the 2-review repo sits last.
- **Behavior implied:** Column headers toggle sort direction; the disabled repos really are removed from this table.
- **Notable visuals:** Chevron direction is the only sort affordance.

### 51 — Repositories — third-column metric dropdown open
- **Route guess:** `/repositories`
- **Screen type:** dropdown-open (menu over the table)
- **Flow:** Continues from 50; the user opens the `AVG. TIME TO MERGE` column header menu to swap the displayed metric. Leads into 52.
- **Layout:** Same page; a white dropdown panel (~280px wide, rounded, soft shadow) anchored under the third column header, overlapping the first three data rows.
- **Nav items visible:** Same eight; `Repositories` active.
- **All visible text:**
  - Dropdown options: `Avg. Time to Merge` (with a trailing `✓` checkmark), `Upvote/Downvote Ratio`, `# of Bugs Caught`
  - Table headers behind: `REPO` / `REVIEWS ⌄` / `AVG. TIME TO MERGE ⌄` / `LAST 7 DAYS ⌄`
  - Rows visible: `samleemobbin-dot/laravel` `2 reviews`; `samleemobbin-dot/astrowind-lp` `0 reviews`; `samleemobbin-dot/landingpage` `0 reviews`; `samleemobbin-dot/mini-landing-page` `0 reviews`; `samleemobbin-dot/newlandingpage` `0 reviews`; `samleemobbin-dot/odyssey` `0 reviews`; `samleemobbin-dot/openreact-lp` `0 reviews`; `samleemobbin-dot/payload-website-starter` `0 reviews`; `samleemobbin-dot/tailwind-lp` `0 reviews`
  - Plus the standard banner/header/title copy as in 49.
- **Data entities:** Same 9 repos; sort order back to default (laravel first).
- **Controls:** Column-header dropdown with three mutually exclusive metric options (radio-like, checkmark on the current one); everything else as in 49.
- **Table/list columns:** Third column is metric-switchable.
- **State shown:** `Avg. Time to Merge` selected (✓); menu open.
- **Behavior implied:** The product tracks three per-repo review-quality metrics: average time to merge, upvote/downvote ratio on Greptile's comments, and number of bugs caught. Only one is shown at a time in the table.
- **Notable visuals:** Lightweight menu, no icons, checkmark on the right edge.

### 52 — Repositories — third column switched to "# OF BUGS CAUGHT"
- **Route guess:** `/repositories?metric=bugs_caught`
- **Screen type:** page
- **Flow:** Continues from 51 (option chosen). Ends this sub-flow; 53 opens a different modal.
- **Layout:** Same as 49/50. The third column header now reads `# OF BUGS CAUGHT ⌄` and the fourth column header is empty except for a small up/down sort glyph at the far right.
- **Nav items visible:** Same eight; `Repositories` active.
- **All visible text:**
  - Headers: `REPO` / `REVIEWS ⌄` / `# OF BUGS CAUGHT ⌄` / (unlabeled sort control `⇅`)
  - Rows: `samleemobbin-dot/laravel` `2 reviews` `2 bugs`; `samleemobbin-dot/astrowind-lp` `0 reviews` `—`; `samleemobbin-dot/landingpage` `0 reviews` `—`; `samleemobbin-dot/mini-landing-page` `0 reviews` `—`; `samleemobbin-dot/newlandingpage` `0 reviews` `—`; `samleemobbin-dot/odyssey` `0 reviews` `—`; `samleemobbin-dot/openreact-lp` `0 reviews` `—`; `samleemobbin-dot/payload-website-starter` `0 reviews` `—`; `samleemobbin-dot/tailwind-lp` `0 reviews` `—`
  - Plus standard banner/header/title copy.
- **Data entities:** `samleemobbin-dot/laravel` — 2 reviews, `2 bugs`. All other repos `0 reviews` / `—`.
- **Controls:** Same; the `LAST 7 DAYS` selector has collapsed into a bare `⇅` sort icon button on the right edge of the header row.
- **Table/list columns:** `REPO` | `REVIEWS` | `# OF BUGS CAUGHT` | (unlabeled).
- **State shown:** Metric = bugs caught; no explicit sort direction.
- **Behavior implied:** "Bugs caught" is a first-class product metric, formatted as `N bugs` with `—` for none.
- **Notable visuals:** None new.

### 53 — Pull Request picker modal for a repo
- **Route guess:** `/repositories` with a per-repo pull-request modal (e.g. `/repositories/samleemobbin-dot/laravel/pull-requests`)
- **Screen type:** modal
- **Flow:** "Pick a PR for a repo" — reached by clicking a repo row on the Repositories page. Standalone here; 54 moves to a different tab.
- **Layout:** Same chrome, page white-washed behind. A centered modal ~660px wide, ~760px tall: header row with a branch/merge (git pull-request) icon + title on the left and a close `✕` on the right, a divider, then a search input, then a vertical list of PR cards, a large empty region, and a right-aligned result count at the bottom.
- **Nav items visible:** Same eight; `Repositories` active.
- **All visible text:**
  - Modal title: `Pull Request for samleemobbin-dot/laravel`
  - Search placeholder: `Search Pull Requests`
  - Card 1: `#2` `Test greptile review` / `Created: 5/19/2026` `Updated: 5/19/2026`
  - Card 2: `#1` `Test Greptile analytics` / `Created: 5/19/2026` `Updated: 5/19/2026`
  - Footer: `2 open pull requests found`
  - Behind: `Repositories`, `Manage connected repositories and view review met…`, `Search for repos by name`, `Manage Repos`, `REPO`, `…IME TO MERGE`, `LAST 7 DAYS`, and repo rows `samleemobbin-dot/laravel`, `/astrowind-lp`, `/landingpage`, `/mini-landing-page`, `/newlandingpage`, `/odyssey`, `/openreact-lp`, `/payload-website-starter`, `/tailwind-lp`
- **Data entities:** PRs on `samleemobbin-dot/laravel`: `#2 Test greptile review` (created 5/19/2026, updated 5/19/2026); `#1 Test Greptile analytics` (created 5/19/2026, updated 5/19/2026). Open PR count: 2.
- **Controls:** Close `✕` (ghost icon button); search input with magnifier (`Search Pull Requests`); two clickable PR cards (bordered, rounded, full-width, hover/select target — card 1 appears faintly highlighted/selected).
- **Table/list columns:** List of cards, each: `#N` (bold, muted) + title (bold) on line 1; `Created: <date>` and `Updated: <date>` (muted, small) on line 2.
- **State shown:** No search query; both PRs listed; count text confirms 2.
- **Behavior implied:** Greptile only lists OPEN pull requests here; PRs are the unit you drill into for review results. Dates are US `M/D/YYYY`.
- **Notable visuals:** Git pull-request icon (two branch lines with nodes) beside the modal title.

### 54 — Custom Context (list of context rules)
- **Route guess:** `/custom-context`
- **Screen type:** page
- **Flow:** Custom Context management flow (54 onward). New flow; tab switched from Repositories.
- **Layout:** Same banner/header/tabs. Main column: H1 `Custom Context`, subtitle, then a row with a wide search input and a black `+ Add Context` button on the right, then a bordered table with a light-grey header row and 4 rows. Empty page below the table.
- **Nav items visible:** `Analytics`, `Repositories`, `Code Review Settings`, `Custom Context` (ACTIVE — underlined), `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - Banner: `13 days left in your free trial!` / `+ Add Payment Method`  (note: 13, down from 14 — later session)
  - Header: `Content-mobbin` `Admin`
  - Main: `Custom Context` / `Manage context for Content-mobbin` / placeholder `Search context or click to add filters` / `+ Add Context`
  - Column headers: `RULES` / `SCOPE` / `TYPE` / `USAGE #` / `LAST UPDATED` / `STATUS`
  - Row 1: `Agents.md files` `1 file` | `newlandingpage` | (folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
  - Row 2: `CLAUDE.md files` `1 file` | `newlandingpage` | (folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
  - Row 3: `CLAUDE.md files` `1 file` | `newlandingpage` | (folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
  - Row 4: `Agents.md files` `1 file` | `mini-landing-page` | (folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
- **Data entities:** 4 context rules; rule names `Agents.md files`, `CLAUDE.md files` (x2), `Agents.md files`; badge `1 file` on each; scopes `newlandingpage` (x3) and `mini-landing-page`, each with an octocat icon; usage `0 reviews`; last updated `1 day ago`; status `ACTIVE`.
- **Controls:** Search input with magnifier, italic placeholder `Search context or click to add filters` (implies filter chips on click); `+ Add Context` (primary black, plus icon); header select-all checkbox; per-row checkboxes; per-row disclosure chevron `›` (expand rule to show files); sortable headers `USAGE # ⇅`, `LAST UPDATED ⌄`, `STATUS ⇅`; chat FAB.
- **Table/list columns:** [checkbox] | `RULES` (chevron + name + `N file` pill) | `SCOPE` (octocat + repo short name) | `TYPE` (small lavender/indigo rounded icon tile — folder-with-star/gear glyph) | `USAGE #` (`N reviews`) | `LAST UPDATED` (relative time) | `STATUS` (uppercase text `ACTIVE`)
- **State shown:** All rows collapsed and unchecked; all `ACTIVE`; no filters applied.
- **Behavior implied:** Greptile ingests repo-local agent instruction files (`Agents.md`, `CLAUDE.md`) as custom review context, scoped per repository, each with an on/off status and a usage counter tracking how many reviews used it. Contexts can be added manually via `+ Add Context`.
- **Notable visuals:** Small tinted (light indigo) square icon tile in the TYPE column; grey count pills; uppercase letterspaced status text; disclosure chevrons.

### 55 — Add Context modal — step 1–3 (Rule type, logging example)
- **Route guess:** `/custom-context` with the `Add Context` wizard modal open
- **Screen type:** modal (multi-step wizard, steps 1–3 on one scroll)
- **Flow:** "Add custom context rule" wizard (55–59). Opened from `+ Add Context` on 54; continues into 56.
- **Layout:** Page white-washed behind. Centered modal ~650px wide, ~925px tall, rounded, white. Header: title + one-line subtitle + close `✕` top-right. Body is divided by hairline rules into numbered steps, each with a small grey rounded number chip on the left: step 1 row (label left, segmented control right), step 2 (label, then a `Rule Description` field label and a large multiline textarea ~265px tall), step 3 (label, then `Scope` group with two side-by-side fields and an `+ Add Scope` button right-aligned). Sticky footer with two half-width buttons.
- **Nav items visible:** `Analytics`, `Repositories`, `Code Review Settings`, `Custom Context` (ACTIVE, partly occluded), `…gs` (Organization Settings, occluded)
- **All visible text:**
  - Modal: `Add Context` / `Define custom rules and files for Greptile to apply.`
  - Step 1: `1` `Choose a context type` — segmented `Rule` | `File`
  - Step 2: `2` `Teach Greptile how to use your codebase` / field label `Rule Description`
  - Textarea content (placeholder or sample text, light grey):
    `What: Using logging instead of printing log messages`
    `Why: We can't filter log messages`
    `Good: logging.error("error message")`
    `Bad: print("error message")`
  - Step 3: `3` `Apply this rule to a scope` / group label `Scope` / field labels `Repository` and `File pattern` / repository value pill `all` / file-pattern pill `auto` with placeholder `e.g. src/**/*.tsx` / button `+ Add Scope`
  - Footer: `Cancel` / `Next →`
  - Behind: `Custom Context`, `Manage context for Content-mobbin`, `Search context or click to add filters`, `+ Add Context`, `RULES`, `LAST UPDATED`, `STATUS`, rows `Agents.md files 1 file`, `CLAUDE.md files 1 file` (x2), `Agents.md files 1 file`, `1 day ago` x4, `ACTIVE` x4
- **Data entities:** Existing 4 context rules behind the modal; default scope `all` repositories with `auto` file pattern.
- **Controls:** Close `✕`; segmented toggle `Rule` (selected, white pill) / `File`; multiline textarea (`Rule Description`); `Repository` select (shows pill `all`, up/down chevron); `File pattern` tag input (shows pill `auto` + placeholder `e.g. src/**/*.tsx`); `+ Add Scope` (secondary/outline, plus icon); `Cancel` (secondary/outline); `Next →` (primary, currently DISABLED/grey with a right-arrow icon).
- **Table/list columns:** n/a (behind table as in 54).
- **State shown:** Step 1 = `Rule`; textarea shows grey guidance/placeholder text (What / Why / Good / Bad structure) so `Next` is disabled; scope defaults to `all` + `auto`.
- **Behavior implied:** Context is either a free-text RULE or an uploaded FILE. Rules are authored in a What / Why / Good / Bad template. Scope is a (repository, file-glob) pair and multiple scopes can be stacked.
- **Notable visuals:** Numbered step chips; segmented control; inline pill-in-input pattern for select/tag values.

### 56 — Add Context modal — rule text entered, Optimize available
- **Route guess:** `/custom-context` (wizard modal)
- **Screen type:** modal
- **Flow:** Continues from 55; the user has typed a real rule. Leads into 57.
- **Layout:** Identical to 55; a small dark `Optimize` button floats at the bottom-right INSIDE the textarea.
- **Nav items visible:** Same as 55.
- **All visible text:**
  - Same header/step labels as 55.
  - Textarea (dark text, scrolled — the `What:` line is above the fold):
    `Why: Hardcoded credentials are insecure and can expose sensitive data if committed to the repository`
    `Good:`
    `import os`
    `password = os.getenv("APP_PASSWORD")`
    `Bad:`
    `password = "123456"`
    `api_key = "my-secret-key"`
  - In-textarea button: `Optimize` (with a sparkle/magic-wand icon)
  - Step 3 as in 55: `Scope`, `Repository` = `all`, `File pattern` = `auto` + `e.g. src/**/*.tsx`, `+ Add Scope`
  - Footer: `Cancel` / `Next →` (now black/enabled)
- **Data entities:** Rule content about hardcoded credentials; code samples `import os`, `password = os.getenv("APP_PASSWORD")`, `password = "123456"`, `api_key = "my-secret-key"`.
- **Controls:** Same as 55, plus `Optimize` (small dark pill button with sparkle icon, overlaid inside the textarea); `Next →` now an enabled primary button.
- **Table/list columns:** n/a
- **State shown:** Textarea filled and scrolled; `Next` enabled; scope untouched.
- **Behavior implied:** Greptile offers AI rewriting/"optimizing" of a user-written rule. The Next button gates on non-empty rule text.
- **Notable visuals:** Sparkle/wand icon denoting an AI action; floating in-field action button.

### 57 — Add Context modal — file pattern set to `**/*.py`
- **Route guess:** `/custom-context` (wizard modal)
- **Screen type:** modal
- **Flow:** Continues from 56; the user replaced the `auto` file pattern with an explicit glob. Leads into 58.
- **Layout:** Identical to 56.
- **Nav items visible:** Same.
- **All visible text:** Same as 56, except the `File pattern` field now holds a removable tag `**/*.py` with an `×`, and the `auto` pill and `e.g. src/**/*.tsx` placeholder are gone. Textarea is scrolled one line further (the `Why:` line is clipped at the top: `Why: Hardcoded credentials are insecure and can expose sensitive` / `data if committed to the repository`).
- **Data entities:** Scope = repository `all`, file pattern `**/*.py`.
- **Controls:** Same as 56; the file-pattern tag has a remove `×`; `Next →` enabled (black).
- **Table/list columns:** n/a
- **State shown:** Custom glob applied; step 1 still `Rule`.
- **Behavior implied:** File patterns are entered as removable glob tags; multiple patterns per scope are plausible.
- **Notable visuals:** Removable tag chip inside an input.

### 58 — Add Context modal — step 4 Review and confirm
- **Route guess:** `/custom-context` (wizard modal, final step)
- **Screen type:** modal (wizard confirmation step)
- **Flow:** Continues from 57 (after `Next`). Leads into 59 (created).
- **Layout:** Same modal shell but shorter (~790px tall) and vertically re-centered. Header, then step `4` row, then a read-only `Rule Description` block rendered in MONOSPACE inside a bordered box, then a `Scope` section with two grey code-style pills, then the footer with `Back` and `Create Context`.
- **Nav items visible:** All eight (dimmed): `Analytics`, `Repositories`, `Code Review Settings`, `Custom Context` (active), `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - `Add Context` / `Define custom rules and files for Greptile to apply.`
  - `4` `Review and confirm`
  - `Rule Description` (monospace body):
    `What: Avoid hardcoded passwords and secrets in Python files`
    `Why: Hardcoded credentials are insecure and can expose sensitive data if committed to the repository`
    `Good:`
    `import os`
    `password = os.getenv("APP_PASSWORD")`
    `Bad:`
    `password = "123456"`
    `api_key = "my-secret-key"`
  - `Scope` — pills: `all repos` and `**/*.py`
  - Footer: `Back` / `Create Context` (with a sparkle/wand icon)
- **Data entities:** Final rule text as above; scope `all repos` + `**/*.py`.
- **Controls:** Close `✕`; `Back` (secondary/outline); `Create Context` (primary black, sparkle icon).
- **Table/list columns:** n/a
- **State shown:** Review step; content read-only; steps 1–3 are hidden (the wizard swaps panes rather than scrolling).
- **Behavior implied:** Four-step wizard: type → rule text → scope → review. The final rule text differs from what was typed in 56/57 (the `What:` line is now `Avoid hardcoded passwords and secrets in Python files`), consistent with `Optimize` having rewritten it.
- **Notable visuals:** Monospace rendering of the reviewed rule (not syntax-highlighted); grey monospace pills for scope values.

### 59 — Custom Context list with the new rule created
- **Route guess:** `/custom-context`
- **Screen type:** page (post-create success state)
- **Flow:** End of the Add Context wizard (55–59); modal dismissed and the new rule prepended to the table.
- **Layout:** Same as 54; the table now has 5 rows, the new one first.
- **Nav items visible:** `Analytics`, `Repositories`, `Code Review Settings`, `Custom Context` (ACTIVE — underlined), `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - Banner: `13 days left in your free trial!` / `+ Add Payment Method`
  - Header: `Content-mobbin` `Admin`
  - Main: `Custom Context` / `Manage context for Content-mobbin` / `Search context or click to add filters` / `+ Add Context`
  - Headers: `RULES` / `SCOPE` / `TYPE` / `USAGE #` / `LAST UPDATED` / `STATUS`
  - Row 1 (new): `What: Avoid hardcoded passwords and secrets in P…` | `Content-mobbin` (building/org icon, not octocat) | (pink/red scales-of-justice icon tile) | `0 reviews` | `less than a minute ago` | `ACTIVE`
  - Row 2: `Agents.md files` `1 file` | `newlandingpage` | (indigo folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
  - Row 3: `CLAUDE.md files` `1 file` | `newlandingpage` | (indigo folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
  - Row 4: `CLAUDE.md files` `1 file` | `newlandingpage` | (indigo folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
  - Row 5: `Agents.md files` `1 file` | `mini-landing-page` | (indigo folder icon) | `0 reviews` | `1 day ago` | `ACTIVE`
- **Data entities:** 5 context rules; new rule scoped to the ORG (`Content-mobbin`) because it applies to `all repos`; timestamp `less than a minute ago`; usage `0 reviews`; status `ACTIVE`.
- **Controls:** Same as 54; the new row has NO disclosure chevron and no `N file` pill (it is a rule, not a file bundle).
- **Table/list columns:** [checkbox] | `RULES` | `SCOPE` | `TYPE` | `USAGE #` | `LAST UPDATED` | `STATUS`
- **State shown:** Sorted by `LAST UPDATED` descending (new row first); nothing selected.
- **Behavior implied:** Rule rows and file rows are visually distinguished by TYPE icon color (pink/red = rule/policy, indigo = file); rule titles are truncated with an ellipsis; org-wide scope renders as the org name with a building icon.
- **Notable visuals:** Two distinct tinted icon tiles (indigo folder-with-star, pink scales/balance); ellipsis truncation.

## Design tokens observed

Light mode only across all 15 screenshots. (The dark strip at the bottom of every capture is the Mobbin watermark, not product chrome.)

- **Colors:**
  - Page background: `#F7F7F7`–`#FAFAFA` (very light warm grey)
  - Surface / card / modal / table row: `#FFFFFF`
  - Table + segmented-control track / muted fill: `#F1F1F1`–`#F4F4F4`
  - Border / divider: `#E6E6E6`–`#EAEAEA`, 1px
  - Primary text: `#1A1A1A`–`#222222` (near-black, not pure)
  - Secondary / muted text: `#6B7280`-ish grey; table headers a lighter `#8A8A8A`
  - Accent / brand (trial banner, logo mark, chat FAB): bright mint green `#22DD8F` / `#2BE08F`
  - Trial banner text: white on green; the banner washes to a pale mint (`#D7F7E8`) when a modal is open
  - Primary button: black `#111111` with white text; disabled primary: `#BDBDBD` grey with white text
  - Secondary button: white with a `#E0E0E0` border, dark text
  - TYPE icon tiles: light indigo/lavender tile with an indigo glyph (`#EEF0FF` / `#6366F1`-ish) for file contexts; light pink tile with a red/pink glyph (`#FDECEF` / `#E5484D`-ish) for rule contexts
  - Status `ACTIVE`: plain dark-grey uppercase text, no colored badge
  - No success/warning/error banners appeared in this range
- **Typography:**
  - UI font: a geometric/humanist sans with a distinctive single-storey-feeling `g` and rounded terminals (reads like Aeonik / General Sans / Poppins family), used everywhere.
  - Monospace: used for uppercase table headers (letter-spaced ~0.06em, ~11–12px, muted), for the reviewed rule body in screenshot 58, and for scope pills (`all repos`, `**/*.py`).
  - Hierarchy: H1 page title ~30–32px, semibold (`Repositories`, `Custom Context`); modal title ~22–24px semibold (`Repo Settings`, `Add Context`, `Pull Request for …`); subtitle/body ~15–16px regular muted; table cell text ~15px; table header ~11–12px uppercase mono; small/meta text ~13px muted (`Created: 5/19/2026`); pill text ~12–13px.
  - Search placeholders are rendered in ITALIC on the page-level search inputs (`Search for repos by name`, `Search context or click to add filters`) but roman inside modals (`Search repositories…`, `Search Pull Requests`).
- **Spacing & shape:**
  - Border radius: ~8px on buttons, inputs, cards and PR list items; ~10–12px on modals; ~6px on small pills/tags and icon tiles; ~4px on checkboxes; fully round on the chat FAB.
  - Borders: 1px hairlines everywhere; tables are fully bordered with a filled header row; rows separated by 1px rules.
  - Padding: table cells ~16–20px vertical / 20px horizontal; modal padding ~28–32px; button height ~44–48px for primary actions, ~36px for small ones; input height ~48px.
  - Shadows: minimal — a soft, large-radius shadow on the modal and on the dropdown menu; no shadows on cards or table.
  - Overlay: the underlying page is lightened (white wash / reduced opacity) rather than covered by a dark scrim.
- **Iconography:** Line icons, ~1.5px stroke, rounded caps — consistent with Lucide. Seen: magnifier, chevron-down, chevron-right, up/down chevron pair (sort/select), `✕` close, plus `+`, arrow-right, checkmark, code brackets `<>`, git pull-request, folder-with-star, scales/balance, building/org, book/docs, gift, sparkle/wand (AI actions), speech bubble (chat FAB). GitHub octocat is used as a brand mark per repo row.
- **Components:** top banner (trial/upsell with inline CTA), app header with org switcher + role pill, underlined horizontal tab bar, page header (title + subtitle), search + primary-action row, bordered data table with mono uppercase headers and sortable/metric-switchable header dropdowns, pagination footer with `N of M` count, checkbox multi-select with tri-state header, bulk-action footer bar in modal, segmented control (2-up), modal dialog (fixed height), numbered multi-step wizard modal, list-of-cards picker, tag/pill inputs, count pills, status text, tinted icon tile, floating in-field AI action button, floating chat launcher.
