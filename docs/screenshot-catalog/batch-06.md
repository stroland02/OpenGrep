# Batch 06 — Screenshots 75–89

<!-- Batch summary written last; see bottom-anchored section below after entries. -->

### 75 — Code Providers (empty state, post-disconnect)
- **Route guess:** `/settings/code-providers` (org-level tab bar; org `asmobbin`)
- **Screen type:** settings-tab / empty-state (with success toast)
- **Flow:** GitHub disconnect flow — result of confirming disconnect (continues from 74); leads into reconnect flow at 76+
- **Layout:** Full-width green trial banner (~62px) at very top; white app header row with org switcher left and 3 icon buttons right; horizontal tab nav row beneath with bottom-border active indicator; light gray page canvas; centered page title + subtitle at left margin (~200px gutter); one full-width bordered white card (~1520px wide, ~280px tall) containing centered empty-state; toast bottom-right; dark Mobbin attribution footer bar (not part of product).
- **Nav items visible:** `Analytics`, `Repositories`, `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers` (ACTIVE — bold + black underline), `Integrations`, `Organization Settings`
- **All visible text:**
  - Trial banner: `11 days left in your free trial!` / button `+ Add Payment Method`
  - Header: `asmobbin` · badge `Admin` · up/down chevron switcher glyph
  - Page: `Code Providers` (h1) / `Connect or manage your code providers`
  - Empty state: `No code providers connected` / `Connect GitHub or GitLab to sync repositories and start reviews.`
  - Buttons: `Connect GitLab`, `Connect GitHub`
  - Toast: `Success` / `Disconnected github successfully`
  - Footer (Mobbin watermark): `Greptile`, `curated by`, `Mobbin`
- **Data entities:** org `asmobbin`; role `Admin`; trial days remaining `11`; providers GitHub, GitLab
- **Controls:** `+ Add Payment Method` (white/secondary button on green banner); org switcher (chevron up/down icon button); header icon buttons — book/docs icon, gift icon, user/person avatar icon; 8 tabs; `Connect GitLab` (secondary, GitLab fox logo) and `Connect GitHub` (secondary, GitHub octocat mark); floating round green chat/support bubble bottom-right
- **Table/list columns:** none
- **State shown:** Code Providers tab active; zero providers connected; transient success toast visible
- **Behavior implied:** Providers can be disconnected and reconnected; both GitHub and GitLab are supported; repos sync from the provider and reviews depend on it; free trial is time-limited with payment-method upsell; org-scoped settings with Admin role.
- **Notable visuals:** GitHub octocat + GitLab fox logos side by side as empty-state illustration; toast card with subtle shadow; green (#2ee59d-ish) brand banner; Greptile diamond/cube logo mark.

### 76 — Analytics dashboard with org switcher dropdown open
- **Route guess:** `/analytics` (org `asmobbin`)
- **Screen type:** page + dropdown-open (org switcher popover overlays tab bar)
- **Flow:** Org switching / analytics review. Note trial says `12 days` here vs `11 days` in 75 — this capture is from an EARLIER session day, so 76 likely starts a new flow rather than continuing 75.
- **Layout:** green trial banner; app header (org switcher left, icon buttons right incl. photo avatar); tab nav; dropdown panel (~360x110px) anchored under org name, covering `Analytics`/`Repositories`/`Code Review Settings` labels; main canvas: page title row with 4 filter selects + Export button right-aligned; full-width KPI strip card (4 columns); 2x2 grid of chart cards (~745px each, 24px gutter).
- **Nav items visible:** `Anal…` (Analytics, ACTIVE — underlined), `…tings` (Code Review Settings, partially hidden), `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - Banner: `12 days left in your free trial!` / `+ Add Payment Method`
  - Header: `asmobbin` `Admin`
  - Dropdown: `asmobbin` (highlighted row, building icon) / `+ Add organizations`
  - Title: `Analytics`
  - Filters: `All teams`, `All repositories`, `All authors`, `This week`, `Export`
  - KPI strip: `Total Reviews` `5` · `Avg Merge Time` `-` · `Addressed rate` `0%` · `# of critical bugs caught` `3` `in 1 repos`
  - Card 1: `PRS REVIEWED BY GREPTILE`, select `PRs reviewed`, y-axis label `PRS REVIEWED`, ticks `2, 1.5, 1, 0.5, 0`, x ticks `14 MAY, 15 MAY, 16 MAY, 17 MAY, 18 MAY, 19 MAY, 20 MAY`, `Top Repos by Review Count`, `samleemobbin-dot/laravel` `5`
  - Card 2: `CRITICAL BUGS CAUGHT`, select `All Severity`, y-axis label `CRITICAL BUGS CAUGHT`, ticks `3, .25, 1.5, .75, 0` (as rendered), same x ticks, `Repos with most critical bugs`, `samleemobbin-dot/laravel` `3`
  - Card 3: `ADDRESSED RATE` (check icon, info `i` icon right), `0%` `0`
  - Card 4: `AVERAGE TIME TO MERGE`, select `Mean`, y tick `0.5d`
- **Data entities:** org `asmobbin`; repo `samleemobbin-dot/laravel` (GitHub icon) — 5 reviews, 3 critical bugs; date range 14–20 May; totals 5 / – / 0% / 3 in 1 repos
- **Controls:** 4 filter selects with chevrons (teams/repositories/authors/date-range with calendar icon); `Export` (primary dark/black button, external-link icon); per-card selects `PRs reviewed`, `All Severity`, `Mean` (up/down chevron style); info tooltip icon; org switcher popover with `+ Add organizations` action; support chat bubble
- **Table/list columns:** mini leaderboards: [repo name | count], right-aligned count
- **State shown:** Analytics tab active; org dropdown expanded with current org highlighted; date filter = This week; all-scope filters unset
- **Behavior implied:** Multi-org support with org creation; analytics filterable by team, repo, author, and date range; exportable; tracks reviews, merge time, addressed rate (fix-adoption), and critical bugs by severity.
- **Notable visuals:** vertical bar charts, single gray bars on 19 MAY; stacked segments in bugs chart (2 shades = severity split); monospace/uppercase letter-spaced card titles; KPI numbers very large (~40px) light-weight.

### 77 — Create Organization modal
- **Route guess:** `/analytics` with modal overlay (no route change implied)
- **Screen type:** modal
- **Flow:** Org creation — continues from 76 (`+ Add organizations` clicked); dropdown still rendered behind the scrim
- **Layout:** entire page washed out by white ~85% scrim (charts/KPIs faded but visible); centered modal card ~650x360px with 3 stacked sections divided by hairline rules — header (title + description + close X top-right), body (field), footer (right-aligned action).
- **Nav items visible:** same tab bar as 76, all faded/disabled-looking
- **All visible text:**
  - Modal: `Create Organization` (h2) / `Organizations are a way to group your projects and users. You can create multiple organizations to keep your projects separate.` / label `Organization Name` / footer button `Create`
  - Faded background: `12 days left in your free trial!`, `+ Add Payment Method`, `asmobbin` `Admin`, dropdown `asmobbin` / `+ Add organizations`, tabs, `Total Reviews 5`, `Avg Merge Time -`, `Addressed rate 0%`, `# of critical bugs caught 3 in 1 repos`, `PRS REVIEWED BY GREPTILE`, `All Severity`, `Top Repos by Review Count`, `samleemobbin-dot/laravel 5`, `Repos with most critical bugs`, `samleemobbin-dot/laravel 3`, `ADDRESSED RATE`, `0% 0`, `AVERAGE TIME TO MERGE`, `Mean`, `0.5d`
- **Data entities:** none new (org `asmobbin` behind)
- **Controls:** close `X` icon button (ghost); `Organization Name` text input (empty, no placeholder, ~605px wide, 1px border, small radius); `Create` button (secondary/outline white with border — not filled)
- **Table/list columns:** none
- **State shown:** input empty and unfocused; Create appears enabled-but-neutral; modal blocks page
- **Behavior implied:** Users can create additional organizations; orgs group projects and users and keep them separate — i.e. tenancy boundary for repos, settings, and analytics. Only a name is required at creation.
- **Notable visuals:** heavy white-out scrim rather than dark overlay; modal has no shadow-heavy elevation, just border + subtle shadow; section divider rules.

### 78 — Create Organization modal, name filled
- **Route guess:** `/analytics` with modal overlay
- **Screen type:** modal (filled form state)
- **Flow:** Org creation — continues from 77 (name typed), into 79 (submit result)
- **Layout:** identical to 77.
- **Nav items visible:** identical to 77 (faded)
- **All visible text:** identical to 77 except input now contains `slmobbin`. Modal: `Create Organization` / `Organizations are a way to group your projects and users. You can create multiple organizations to keep your projects separate.` / `Organization Name` / value `slmobbin` / `Create`
- **Data entities:** new org name being created: `slmobbin`
- **Controls:** same — text input now populated; `Create` button (outline)
- **Table/list columns:** none
- **State shown:** input filled, no validation message, no character counter; Create still same visual weight (no enabled/disabled color shift observed)
- **Behavior implied:** free-form org name, no slug preview or availability check shown at this step.
- **Notable visuals:** input text renders in same sans font, ~15px, dark gray.

### 79 — Analytics, new empty org (`slmobbin`) active
- **Route guess:** `/analytics` (org context switched to `slmobbin`)
- **Screen type:** page (zero-data / empty analytics)
- **Flow:** Org creation result — continues from 78; app auto-switched into the new org. Trial banner now reads `14 days`.
- **Layout:** same as 76 without dropdown: banner / header / tab bar / title+filters row / KPI strip card / 2x2 chart card grid.
- **Nav items visible:** `Analytics` (ACTIVE, underlined), `Repositories`, `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - `14 days left in your free trial!` / `+ Add Payment Method`
  - `slmobbin` `Admin`
  - `Analytics`; filters `All teams`, `All repositories`, `All authors`, `This week`; `Export`
  - KPI: `Total Reviews` `0` · `Avg Merge Time` `-` · `Addressed rate` `0%` · `# of critical bugs caught` `0`
  - `PRS REVIEWED BY GREPTILE` / `PRs reviewed` / y label `PRS REVIEWED` ticks `5, 2, 0` / x `14 MAY … 20 MAY` / `Top Repos by Review Count` (no rows)
  - `CRITICAL BUGS CAUGHT` / `All Severity` / y label `CRITICAL BUGS CAUGHT` ticks `5, 2, 0` / `Repos with most critical bugs` (no rows)
  - `ADDRESSED RATE` / `0%` `0`
  - `AVERAGE TIME TO MERGE` / `Mean` / `0.5d`
- **Data entities:** org `slmobbin` (Admin); all metrics zero; no repos listed
- **Controls:** same control set as 76 (4 filters, Export, 3 card selects, info icon, chat bubble)
- **Table/list columns:** leaderboard lists present but empty — no "no data" copy, just blank area
- **State shown:** brand-new org, no repos connected, empty charts render axes only; `# of critical bugs caught` shows bare `0` with no "in N repos" suffix
- **Behavior implied:** Creating an org immediately switches context to it; analytics are org-scoped; empty orgs still render the full dashboard chrome; the "in N repos" suffix only appears when > 0.
- **Notable visuals:** empty bar charts with gridlines at 5/2/0; identical chart shells to populated version.

### 80 — Org switcher dropdown with two orgs
- **Route guess:** `/analytics` (org `slmobbin`) with switcher popover open
- **Screen type:** dropdown-open
- **Flow:** Org switching — continues from 79 (new org now listed alongside the original)
- **Layout:** same as 79; dropdown popover (~360x150px) below org name, now 3 rows: two org rows + divider + add action.
- **Nav items visible:** `Anal…` (Analytics active), `…tings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - `14 days left in your free trial!` / `+ Add Payment Method`
  - `slmobbin` `Admin`
  - Dropdown rows: `asmobbin`, `slmobbin` (highlighted/current, gray bg), `+ Add organizations`
  - Page content identical to 79: `Total Reviews 0`, `Avg Merge Time -`, `Addressed rate 0%`, `# of critical bugs caught 0`, `All teams`, `All repositories`, `All authors`, `This week`, `Export`, `PRS REVIEWED BY GREPTILE`, `PRs reviewed`, `Top Repos by Review Count`, `CRITICAL BUGS CAUGHT`, `All Severity`, `Repos with most critical bugs`, `ADDRESSED RATE`, `0% 0`, `AVERAGE TIME TO MERGE`, `Mean`, `0.5d`
- **Data entities:** orgs `asmobbin`, `slmobbin`; user role `Admin` in current org
- **Controls:** org rows (clickable, each with small building/org icon), `+ Add organizations` (ghost row with plus icon), plus everything from 79
- **Table/list columns:** dropdown list rows: [org icon | org name]
- **State shown:** current org row highlighted; no checkmark used for selection, just background tint
- **Behavior implied:** confirms org creation succeeded and orgs are listed alphabetically/by creation; switching is a single click from the header anywhere in the app.
- **Notable visuals:** popover has 1px border, ~8px radius, white surface, subtle shadow; it overlaps and hides tab labels rather than pushing content.

### 81 — Analytics loading state (KPIs skeleton) after org switch
- **Route guess:** `/analytics` (org back to `asmobbin`)
- **Screen type:** loading
- **Flow:** Org switching — continues from 80 (selected `asmobbin`); data refetching. Trial banner reads `12 days`.
- **Layout:** identical to 79/80 minus dropdown.
- **Nav items visible:** `Analytics` (ACTIVE), `Repositories`, `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - `12 days left in your free trial!` / `+ Add Payment Method`
  - `asmobbin` `Admin`
  - `Analytics`; `All teams`, `All repositories`, `All authors`, `This week`, `Export`
  - KPI labels `Total Reviews`, `Avg Merge Time`, `Addressed rate`, `# of critical bugs caught` — values render as loading ellipses `...` / `...` / `-` / `...`
  - `PRS REVIEWED BY GREPTILE` / `PRs reviewed` / `Top Repos by Review Count`
  - `CRITICAL BUGS CAUGHT` / `All Severity` / `Repos with most critical bugs`
  - `ADDRESSED RATE` / `0%`
  - `AVERAGE TIME TO MERGE` / `Mean` / `0.5d`
- **Data entities:** org `asmobbin`; no values resolved yet
- **Controls:** same as 79
- **Table/list columns:** leaderboards empty during load
- **State shown:** KPI values show animated dot/ellipsis placeholders; charts render axis scaffold (5/2/0) with no bars and no x-axis date labels yet; `ADDRESSED RATE` shows `0%` without the trailing count
- **Behavior implied:** analytics values load asynchronously per-tile; the shell renders immediately (no full-page spinner); switching orgs refetches all tiles.
- **Notable visuals:** three-dot ellipsis skeleton in place of large numerals; date axis absent while loading — useful detail for reconstructing loading behavior.

### 82 — User/account menu dropdown open
- **Route guess:** `/analytics` with account popover open
- **Screen type:** dropdown-open
- **Flow:** Account menu / logout entry point — starts a new flow after 81 (data now loaded: 5 / – / 0% / 3 in 1 repos)
- **Layout:** as 76 (populated analytics); popover (~370x200px) anchored under the avatar icon at far right of header, top edge just below header, overlapping the filter row and KPI card area.
- **Nav items visible:** `Analytics` (ACTIVE), `Repositories`, `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text:**
  - `12 days left in your free trial!` / `+ Add Payment Method`
  - `asmobbin` `Admin`
  - Popover: `Alex Smith` / `alexsmith@content-mobbi…` (truncated with ellipsis) / edit (pencil-in-square) icon / `Settings` (gear icon) / `Logout` (red text + logout arrow icon)
  - Page: `Analytics`, `All teams`, `All repositories`, `All authors`, `This week` (Export hidden behind popover), `Total Reviews 5`, `Avg Merge Time -`, `Addressed rate 0%`, `# of critical bugs caught 3 in 1 repos`, `PRS REVIEWED BY GREPTILE`, `PRs reviewed`, `Top Repos by Review Count`, `samleemobbin-dot/laravel 5`, `CRITICAL BUGS CAUGHT`, `All Severity`, `Repos with most critical bugs`, `samleemobbin-dot/laravel 3`, `ADDRESSED RATE`, `0% 0`, `AVERAGE TIME TO MERGE`, `Mean`, `0.5d`, x-axis `14 MAY`–`20 MAY`
- **Data entities:** user `Alex Smith`, email `alexsmith@content-mobbi…` (truncated, likely `@content-mobbin…`); avatar photo of a man; org `asmobbin`; repo `samleemobbin-dot/laravel`
- **Controls:** avatar icon button (opens popover); edit-profile icon button (top-right of popover); `Settings` menu item; `Logout` menu item (destructive/red); header book icon (docs), gift icon (referral/rewards)
- **Table/list columns:** popover: identity block then divider then two action rows
- **State shown:** popover open; no submenu; Logout styled destructive red (~#e5484d)
- **Behavior implied:** personal account settings are separate from Organization Settings; profile is editable; gift icon suggests a referral/credits feature; docs icon suggests external documentation.
- **Notable visuals:** circular photo avatar ~48px in popover, ~28px in header; long email truncated with ellipsis rather than wrapped.

### 83 — Account menu: inline display-name edit mode
- **Route guess:** `/analytics` with account popover in edit state
- **Screen type:** dropdown-open (inline edit)
- **Flow:** Profile rename — continues from 82 (pencil icon clicked)
- **Layout:** identical to 82; popover identity row swaps the static name for a bordered text input with a focus ring, plus two icon buttons (check / X) to the right. Email shrinks/truncates further to make room.
- **Nav items visible:** same as 82
- **All visible text:**
  - Popover: input value `Alex Smith` (with text caret after "Smith") / `alexsmith@content…` (further truncated) / `Settings` / `Logout`
  - Banner and page text identical to 82: `12 days left in your free trial!`, `+ Add Payment Method`, `asmobbin`, `Admin`, `Analytics`, `All teams`, `All repositories`, `All authors`, `This week`, `Total Reviews 5`, `Avg Merge Time -`, `Addressed rate 0%`, `# of critical bugs caught 3 in 1 repos`, `PRS REVIEWED BY GREPTILE`, `PRs reviewed`, `Top Repos by Review Count`, `samleemobbin-dot/laravel 5`, `CRITICAL BUGS CAUGHT`, `All Severity`, `Repos with most critical bugs`, `samleemobbin-dot/laravel 3`, `ADDRESSED RATE`, `0% 0`, `AVERAGE TIME TO MERGE`, `Mean`, `0.5d`
- **Data entities:** user display name `Alex Smith`; email `alexsmith@content…`
- **Controls:** name text input (focused, value prefilled, ~150px wide); confirm button (checkmark icon, outlined square); cancel button (X icon, outlined square); `Settings`; `Logout`
- **Table/list columns:** none
- **State shown:** input focused with caret; email not editable; menu items still visible below
- **Behavior implied:** display name is editable inline from the account menu with explicit confirm/cancel; email is read-only (likely provider/SSO-derived).
- **Notable visuals:** two square icon buttons with 1px border and small radius; input has slightly heavier border indicating focus.

### 84 — Account menu: display name retyped
- **Route guess:** `/analytics` with account popover in edit state
- **Screen type:** dropdown-open (inline edit, dirty)
- **Flow:** Profile rename — continues from 83, into 85 (saved)
- **Layout:** identical to 83.
- **Nav items visible:** same as 82/83
- **All visible text:** popover input now reads `Sam Lee` (caret at end); `alexsmith@content…`; `Settings`; `Logout`. Rest of page identical to 83 (`12 days left in your free trial!`, `+ Add Payment Method`, `asmobbin` `Admin`, `Analytics`, `All teams`, `All repositories`, `All authors`, `This week`, `Total Reviews 5`, `Avg Merge Time -`, `Addressed rate 0%`, `# of critical bugs caught 3 in 1 repos`, chart titles/selects, `samleemobbin-dot/laravel 5` and `3`, `ADDRESSED RATE 0% 0`, `AVERAGE TIME TO MERGE Mean 0.5d`).
- **Data entities:** new display name `Sam Lee`; email unchanged `alexsmith@content…`
- **Controls:** same input + check/X icon buttons; `Settings`; `Logout`
- **Table/list columns:** none
- **State shown:** dirty input; no validation error; email unchanged proving name and email are decoupled
- **Behavior implied:** display name is free text and independent of the account email.
- **Notable visuals:** none new.

### 85 — Name saved (success toast, green variant)
- **Route guess:** `/analytics` with account popover open
- **Screen type:** dropdown-open + toast
- **Flow:** Profile rename result — continues from 84 (checkmark confirmed)
- **Layout:** as 82 (popover back to read mode) plus a toast card bottom-right (~490x100px) partially covering the AVERAGE TIME TO MERGE card.
- **Nav items visible:** same as 82
- **All visible text:**
  - Popover: `Sam Lee` / `alexsmith@content-mobbi…` / edit icon / `Settings` / `Logout`
  - Toast: `Success` / `Name updated successfully` (both rendered in green text)
  - Page identical to 82: `12 days left in your free trial!`, `+ Add Payment Method`, `asmobbin` `Admin`, `Analytics`, `All teams`, `All repositories`, `All authors`, `This week`, `Total Reviews 5`, `Avg Merge Time -`, `Addressed rate 0%`, `# of critical bugs caught 3 in 1 repos`, `PRS REVIEWED BY GREPTILE`, `PRs reviewed`, `Top Repos by Review Count`, `samleemobbin-dot/laravel 5`, `CRITICAL BUGS CAUGHT`, `All Severity`, `Repos with most critical bugs`, `samleemobbin-dot/laravel 3`, `ADDRESSED RATE`, `0% 0`, `AVERAGE TIME TO MERGE`, `0.5d`
- **Data entities:** user now `Sam Lee` (email unchanged)
- **Controls:** popover returns to read mode with pencil icon; `Settings`; `Logout`; chat bubble
- **Table/list columns:** none
- **State shown:** save succeeded; popover stays open after save; toast auto-dismissing
- **Behavior implied:** optimistic/immediate profile update with toast confirmation; two toast variants exist — neutral/black text (75: "Disconnected github successfully") and green success text (85) — worth noting as an inconsistency to normalize in OpenGrep.
- **Notable visuals:** green success toast (title + body both green ~#0f9d58/#12b76a family), white card, subtle border and shadow, bottom-right anchored above the chat bubble.

### 86 — Login page (split layout)
- **Route guess:** `/login`
- **Screen type:** page (auth)
- **Flow:** Logout result / authentication — follows `Logout` from 85; leads into 87 (email entered)
- **Layout:** two-column split, no app chrome. LEFT ~40% (0–768px) white, vertically centered form column ~480px wide, left-padded ~145px: logo mark, h1, subtext, field label, input, primary button, then 3 stacked OAuth buttons. RIGHT ~60% (768–1920px) full-bleed periwinkle/indigo artwork panel with a vertical woven-line cylinder motif and 5 lighter-blue squares containing wireframe spheres (largest centered), plus 4 small yellow-green squares; caption bottom-right.
- **Nav items visible:** none (unauthenticated shell)
- **All visible text:**
  - `Log into your account` (h1, ~40px bold)
  - `Don't have an account?` `Sign up` (blue underlined link)
  - `ENTER WORK EMAIL` (uppercase, letter-spaced, muted label)
  - Input placeholder: `me@example.com`
  - Primary button: `Login` with right-arrow `→`
  - `Sign in with GitHub`
  - `Sign in with GitLab`
  - `Sign in with Google`
  - Artwork caption: `The Greptile System` (two lines, yellow-green bold text)
  - Footer watermark: `Greptile`, `curated by`, `Mobbin`
- **Data entities:** none (no user data — confirms logout succeeded)
- **Controls:** email input (empty, placeholder only, full-width ~480px, 1px light border, ~6px radius); `Login →` (PRIMARY — solid green #2ee59d-ish, black text, full-width, ~52px tall); `Sign in with GitHub` / `Sign in with GitLab` / `Sign in with Google` (secondary — light gray #ededed fill, no border, dark text, brand logo left of centered label); `Sign up` (inline text link)
- **Table/list columns:** none
- **State shown:** empty form, no errors; email-first ("work email") suggests magic-link or SSO-by-domain rather than password field
- **Behavior implied:** four auth paths — work email plus GitHub, GitLab, and Google OAuth; no password field visible, so email likely triggers a code/magic link or routes to SSO; separate signup route; "work email" wording implies B2B/team accounts.
- **Notable visuals:** green Greptile diamond/cube logo mark ~56px; large abstract generative artwork (moire/lissajous line weave, wireframe globes) in periwinkle `#6C63F5`-ish with coral line overlay and yellow-green `#E8F98C`-ish accents; strong brand color contrast vs the rest of the app's neutral gray UI.

### 87 — Code Review Settings — When Greptile Reviews (top of page)
- **Route guess:** `/settings/code-review` (org `Content-mobbin`; left rail suggests anchors like `#when-greptile-reviews`)
- **Screen type:** settings-tab
- **Flow:** Code review configuration — NEW flow (not continuous with 86; different org `Content-mobbin`, trial `13 days`). Continues into 88 and 89 as the same page scrolls.
- **Layout:** banner / header / tab bar; page title + subtitle at ~200px left margin; below, a two-column body: LEFT in-page section nav rail (~275px wide, starts x≈200, vertical hairline on its left, rows ~56px tall, active row has gray fill + dark left border); RIGHT content column (~1115px, x≈575–1690) of stacked sections, each with an icon + section heading + one-line description then a bordered white settings card with divided rows.
- **Nav items visible:** top tabs `Analytics`, `Repositories`, `Code Review Settings` (ACTIVE — bold + underline), `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`. Side rail: `When Greptile Reviews` (ACTIVE), `PR Summaries`, `Custom Instructions`, `Greptile Comments`, `Default Coding Agents`, `Status Checks`, `Auto-enable New Repos`
- **All visible text:**
  - `13 days left in your free trial!` / `+ Add Payment Method`
  - `Content-mobbin` `Admin`
  - `Code Review Settings` (h1) / `Configure how Greptile reviews pull requests.`
  - Section 1 heading `When Greptile Reviews` (activity/pulse icon) / `Control when Greptile runs and how much it reviews`
  - `Strictness Level`; pill/hint `Greptile will comment on P2s less often.`; slider labels `LOW`, `MEDIUM`, `HIGH`
  - `Auto-review on new commits` (toggle)
  - `Review draft pull requests` (info icon) (toggle)
  - `File change limit` (info icon) — numeric input `100`
  - Section 2 heading `PR Summaries` (git-PR icon) / `Adjust what Greptile posts at the top of the PR` / link `Personal review settings ↗`
  - `Update original summary` — right label `less noisy` + toggle
  - Sub-card: `PR Summary` (document icon) / `Include a text summary of the changes` + toggle; checkboxes `Collapsible`, `Default Open` (the latter grayed/disabled)
- **Data entities:** org `Content-mobbin` (Admin); strictness = MEDIUM; file change limit = `100`
- **Controls:** 3-stop slider (LOW/MEDIUM/HIGH) with a grip-textured square thumb, filled track left of thumb; toggles (pill switches, ON = black fill, knob right) for `Auto-review on new commits`, `Review draft pull requests`, `Update original summary`, `PR Summary`; number input with up/down stepper (`100`); checkboxes `Collapsible` (unchecked), `Default Open` (unchecked + disabled); info tooltip icons; external link `Personal review settings ↗`; left rail nav rows
- **Table/list columns:** settings rows: [label (+info icon) | control right-aligned]
- **State shown:** first rail item active; all four visible toggles ON; strictness at MEDIUM (center); `Default Open` disabled until `Collapsible` is checked (dependency)
- **Behavior implied:** Review aggressiveness is tunable on a low/medium/high scale that changes how often low-priority ("P2") comments are posted; reviews can auto-run on every new commit and on draft PRs; PRs above a file-change limit are skipped (default 100); the PR summary block is configurable — posted or not, collapsible, and open by default; personal (per-user) review settings exist separately from org settings.
- **Notable visuals:** section icons (pulse, git-PR, document) in thin line style; hint text rendered as a gray pill/chip rather than plain helper text; nested card-in-card for the PR Summary component.

### 88 — Code Review Settings — PR Summaries section (scrolled)
- **Route guess:** `/settings/code-review` scrolled to `PR Summaries`
- **Screen type:** settings-tab (scrolled)
- **Flow:** Code review configuration — continues from 87, into 89
- **Layout:** same two-column layout; page has scrolled so the h1/subtitle are gone and the side rail is sticky with `PR Summaries` now the active (gray-filled) row. Main column shows one large bordered card containing 5 nested sub-cards, each: icon + title + description + toggle right, and a divided lower strip with two checkboxes.
- **Nav items visible:** top tabs unchanged (`Code Review Settings` active). Rail: `When Greptile Reviews`, `PR Summaries` (ACTIVE), `Custom Instructions`, `Greptile Comments`, `Default Coding Agents`, `Status Checks`, `Auto-enable New Repos`
- **All visible text:**
  - `13 days left in your free trial!` / `+ Add Payment Method` / `Content-mobbin` `Admin`
  - `PR Summaries` / `Adjust what Greptile posts at the top of the PR` / `Personal review settings ↗`
  - `Update original summary` — `less noisy` + toggle
  - `PR Summary` / `Include a text summary of the changes` — `Collapsible`, `Default Open`
  - `Confidence Score` / `Include a confidence rating for the PR` — `Collapsible`, `Default Open`
  - `Issue Table` / `Show a table of important files changed with ratings` — `Collapsible`, `Default Open`
  - `Sequence Diagram` / `Generate a sequence diagram of the changes` — `Collapsible`, `Default Open`
  - `Comments Outside Diff` / `Allow comments on lines not in the diff` — `Collapsible`, `Default Open`
  - Next section: `Custom Instructions` (gear icon) / `Fine-tune how Greptile reviews your code`
- **Data entities:** five PR-summary block types: PR Summary, Confidence Score, Issue Table, Sequence Diagram, Comments Outside Diff
- **Controls:** master toggle `Update original summary` (ON); 5 block toggles (all ON, black); 10 checkboxes. Checkbox states: PR Summary — both unchecked (`Default Open` disabled/gray); Confidence Score — both unchecked (`Default Open` disabled); Issue Table — `Collapsible` CHECKED, `Default Open` unchecked but ENABLED; Sequence Diagram — both unchecked (`Default Open` disabled); Comments Outside Diff — BOTH CHECKED. External link `Personal review settings ↗`
- **Table/list columns:** repeated sub-card shape: [icon | title + description | toggle] over [checkbox Collapsible | checkbox Default Open]
- **State shown:** confirms the dependency — `Default Open` becomes enabled only when `Collapsible` is checked; toggles all on
- **Behavior implied:** Greptile posts a composable PR comment made of blocks — text summary, a confidence rating for the PR, an issue table of important changed files with ratings, and a generated sequence diagram — and each block can be collapsible/open by default; it can also comment on lines outside the diff; "Update original summary" (less noisy) means editing the first comment instead of adding new ones.
- **Notable visuals:** icon set per block — document, bar-chart, table/grid, node-graph, speech bubble (thin line icons); checkboxes are square with black fill + white check when checked; disabled checkbox labels rendered light gray.
