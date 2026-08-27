# Batch 03 — Screenshots 30–44

## Batch summary

**Distinct screens/pages in range**
1. Onboarding wizard step 4 — "Developer Tools" (30, 31, 32) — three states of one screen
2. Onboarding — "Invite your team" (33, 34, 35) — three states of one screen
3. Analytics dashboard, top of page (36, 37, 39, 40, 41, 42) — filter/tooltip variants
4. Analytics dashboard, scrolled to bottom (38)
5. Repositories list (43) and Repositories list filtered by search (44)

**Distinct flows**
- **Onboarding wizard, Developer Tools step (30–32):** default state -> "Add Agent" dropdown open -> agent chip added. Continues from batch-02's COMMIT BEHAVIOR step; leads into 33.
- **Onboarding, Invite your team (33–35):** empty form -> email chip entered / Send Invite enabled -> invitation sent + toast. Ends onboarding; app lands on Analytics at 36.
- **Analytics exploration (36–42):** default "This week" view -> chart hover tooltip -> scrolled lower cards -> teams filter dropdown -> team selected -> timeframe dropdown -> "Last 60 Days" applied.
- **Repositories browsing (43–44):** full paginated list -> search "laravel" narrows to one row.

**Feature areas touched:** onboarding wizard (developer tools / coding-agent integration, team invites + roles), analytics & reporting (review counts, critical bugs, addressed rate, merge time, comment up/downvotes, export), repository management, billing trial banner, org/team switching.

**Could not interpret:** none. Note: every screenshot has a Mobbin watermark strip across the bottom ~150px which covers the real page footer; screenshots 36–42 are therefore cut off mid-card at that strip.

---

### 30 — Onboarding wizard, step 4: Developer Tools
- **Route guess:** `/onboarding/developer-tools` (step 4 of 4 in wizard)
- **Screen type:** onboarding-step
- **Flow:** Onboarding wizard. Continues from 29 (COMMIT BEHAVIOR step, prior batch); the "Add Agent" control is opened in 31.
- **Layout:** Two-column split. Left ~50% (0–940px) white/near-white content column: 4-segment progress stepper across the top, then H1 + subcopy, then a rounded outer card containing two stacked setting rows. Right ~50% (940–1920px) is a decorative full-bleed pink crocodile/reptile-skin texture panel with a small floating white "PR comment" mock card overlaid at roughly the vertical middle-right. A fixed bottom bar (Logout left, Back/Next right of center) spans the full width. Below that is the Mobbin watermark strip (not part of the app).
- **Nav items visible:** Stepper segments: `PR ANALYSIS`, `COMMENT SCOPE`, `COMMIT BEHAVIOR`, `DEVELOPER TOOLS`. `DEVELOPER TOOLS` is active (dark/black bar above it, dark label); the first three have light grey bars and grey labels.
- **All visible text:**
  - Stepper: "PR ANALYSIS" / "COMMENT SCOPE" / "COMMIT BEHAVIOR" / "DEVELOPER TOOLS"
  - H1: "Integrate Greptile with your coding agents."
  - Subcopy: "Choose which agents Greptile should format suggestions for and add quick-fix buttons to your PRs."
  - Row 1 title: "Prompt to Fix with AI"; description: "Include copy-paste prompts for fixing issues with your agent"
  - Row 2 title: "Coding Agents"; description: "Choose which agents to show fix buttons for"; button: "+ Add Agent"
  - Right-panel mock card header: "acme/webapp"; gutter line numbers "01", "01", "02"; diff markers "-", "+", "+"; comment author "greptile"
  - Bottom bar: "Logout", "Back ⌘+⇧+↵", "Next ⌘+↵"
- **Data entities:** repo `acme/webapp` (mock); bot identity `greptile`; diff line numbers 01/01/02.
- **Controls:** toggle switch for "Prompt to Fix with AI" (ON — dark/black track, knob right); "+ Add Agent" secondary/outline button with plus icon; "Back ⌘+⇧+↵" secondary white button with border; "Next ⌘+↵" primary green button with right-arrow icon; "Logout" ghost text link; floating round green chat/support bubble bottom-right.
- **Table/list columns:** none.
- **State shown:** step 4 of 4 active; "Prompt to Fix with AI" toggle ON; no coding agents added yet (Coding Agents row shows only the Add Agent button).
- **Behavior implied:** Greptile can emit copy-paste "fix this" prompts inside PR comments, and render quick-fix buttons targeted at specific third-party coding agents. Agent list is user-configurable per org. Keyboard shortcuts exist for wizard navigation (⌘+↵ next, ⌘+⇧+↵ back).
- **Notable visuals:** Faux PR diff card (unified diff, skeleton/placeholder bars instead of real code — red-tinted removed line, green-tinted added lines, green line-number chips), greptile square logo mark in the comment; decorative pink reptile-skin photographic texture; hatched/striped seam at the split boundary.

### 31 — Developer Tools step, "Add Agent" dropdown open
- **Route guess:** `/onboarding/developer-tools`
- **Screen type:** dropdown-open (over onboarding-step)
- **Flow:** Onboarding wizard; continues from 30 (user clicked "+ Add Agent"), resolves into 32.
- **Layout:** Identical to 30. A dropdown menu panel (~200px wide) is anchored under the "+ Add Agent" button, overlapping the bottom of the outer card, listing four agent options left-aligned.
- **Nav items visible:** Same stepper; `DEVELOPER TOOLS` active.
- **All visible text:** All text from 30, plus dropdown options: "Cursor", "Claude Code", "Codex", "Conductor".
- **Data entities:** Supported coding agents: Cursor, Claude Code, Codex, Conductor.
- **Controls:** Dropdown menu with four selectable rows (no icons, no checkmarks visible); "+ Add Agent" trigger remains visible above.
- **Table/list columns:** none.
- **State shown:** Menu open; no option highlighted/selected; toggle still ON.
- **Behavior implied:** Greptile integrates with exactly four named coding agents at this time. Selecting one adds a fix-button target.
- **Notable visuals:** White dropdown surface, thin light border, subtle shadow, ~8px radius, generous row height (~46px).

### 32 — Developer Tools step, agent added ("Fix in Claude")
- **Route guess:** `/onboarding/developer-tools`
- **Screen type:** onboarding-step
- **Flow:** Onboarding wizard; continues from 31 (user picked "Claude Code"); Next proceeds to 33.
- **Layout:** Same as 30. The "Coding Agents" row has grown taller: a chip/pill sits below the description on the left. The right-panel mock PR card has grown and now shows the same chip beneath the greptile comment, and shifted up slightly.
- **Nav items visible:** Same stepper; `DEVELOPER TOOLS` active.
- **All visible text:** All text from 30, plus chip label (appears twice — in the settings row and in the PR mock): "Fix in Claude"
- **Data entities:** Selected agent: Claude (from "Claude Code"); repo `acme/webapp`; commenter `greptile`.
- **Controls:** "Fix in Claude" chip (pale peach/salmon background, orange-red text, orange asterisk/spark glyph — appears removable/selected-state); "+ Add Agent" button now rendered with a filled grey/hover background; toggle; Back/Next.
- **Table/list columns:** none.
- **State shown:** One coding agent configured; toggle ON; Add Agent button in pressed/hover styling.
- **Behavior implied:** Each configured agent produces a labeled quick-fix button rendered in the PR comment ("Fix in Claude"), previewed live in the right-hand mock.
- **Notable visuals:** Live preview coupling — the settings panel change is mirrored in the PR mock card. Claude brand asterisk icon in orange on a pale tint chip.

### 33 — Invite your team (empty)
- **Route guess:** `/onboarding/invite` (or `/onboarding/team`)
- **Screen type:** onboarding-step (centered card)
- **Flow:** Onboarding, invite step. Continues from 32; the email is filled in 34.
- **Layout:** Full-width light grey dotted-grid background with two large decorative pink wireframe-sphere / point-cloud graphics (upper-right and lower-left). A single centered white sheet (~650px wide, x≈636–1284) floats on top with tiny lime-yellow square corner markers at its four corners. Inside: centered Greptile logo, H1, subcopy, then a bordered inner card containing the invite form. Fixed bottom bar as before.
- **Nav items visible:** No top nav. Bottom bar only: "Logout", "Back ⌘+⇧+↵", "Next ⌘+↵".
- **All visible text:**
  - H1: "Invite your team"
  - Subcopy: "Add team members to start using Greptile together."
  - Card heading: "Invite user to this team"
  - Field label: "Team"; team value: "samleemobbin-dot"; provider label: "GITHUB"
  - Field label: "Default role for the invited people"; options: "Admin", "Member"
  - Field label: "Email"; input placeholder: "enter an email separated by commas"
  - Button: "+ Send Invite"
  - Bottom bar: "Logout", "Back ⌘+⇧+↵", "Next ⌘+↵"
- **Data entities:** Team/org `samleemobbin-dot`, provider GITHUB. Roles: Admin, Member.
- **Controls:** Team display field (read-only looking, with two-person icon and GitHub mark); two radio-style role selectors rendered as full-width bordered boxes — "Admin" (empty circle) and "Member" (filled dark circle with white check); email text input (placeholder shown); "+ Send Invite" button in DISABLED state (grey background, grey text); "Back"/"Next"; "Logout"; green chat bubble.
- **Table/list columns:** none.
- **State shown:** Role = Member selected (default); email empty; Send Invite disabled until an email is present.
- **Behavior implied:** Invites are per-team, tied to a GitHub org. Two role tiers only (Admin / Member). Multiple invitees accepted in one field, comma-separated. Invite step is skippable via Next.
- **Notable visuals:** Dotted grid background; two pink low-poly sphere line drawings; lime corner registration squares on the sheet; Greptile diamond logo mark in green.

### 34 — Invite your team (email entered)
- **Route guess:** `/onboarding/invite`
- **Screen type:** onboarding-step
- **Flow:** Onboarding invite; continues from 33 (email typed), submits into 35.
- **Layout:** Same as 33; sheet shifted up ~4px. Email field now contains a chip rather than placeholder text.
- **Nav items visible:** Bottom bar only, as 33.
- **All visible text:** Same as 33 except the Email field, which now shows the chip "samlee@content-mobbin.com" with a "×" remove affordance; button reads "+ Send Invite" in enabled (dark) styling.
- **Data entities:** Invitee email `samlee@content-mobbin.com`; team `samleemobbin-dot` (GITHUB); role Member.
- **Controls:** Email token/chip with × dismiss; "+ Send Invite" now ENABLED (near-black background, white text, plus icon); role radios unchanged; Back/Next; Logout.
- **Table/list columns:** none.
- **State shown:** One pending email token; Member role selected; Send Invite enabled.
- **Behavior implied:** Email input is a tokenizing/chip input — each entry becomes a removable pill; the submit button enables only with at least one token.
- **Notable visuals:** Same decorative background; chip is light grey with rounded corners.

### 35 — Invite your team (invitation sent + toast)
- **Route guess:** `/onboarding/invite`
- **Screen type:** onboarding-step with success state + toast
- **Flow:** Onboarding invite; continues from 34 (Send Invite clicked). Next leads into the app (Analytics, 36).
- **Layout:** Same centered sheet, now taller and shifted up (card top near y≈40) because a confirmation block and an invited-person row were appended below the Send Invite button. A toast notification is anchored bottom-right (x≈1408–1900, y≈1085–1188), partially behind the chat bubble.
- **Nav items visible:** Bottom bar only.
- **All visible text:**
  - H1: "Invite your team"; Subcopy: "Add team members to start using Greptile together."
  - Card heading: "Invite user to this team"
  - "Team" / "samleemobbin-dot" / "GITHUB"
  - "Default role for the invited people" / "Admin" / "Member"
  - "Email" / placeholder "enter an email separated by commas"
  - Button: "+ Send Invite" (disabled again)
  - Success block heading: "Invitation Sent"
  - Success body: "They'll receive an email with instructions to join. You can track invitation status in Team Settings."
  - Invited row: "samlee@content-mobbin.com" (left) — "Member" (right)
  - Toast title: "Invites added"; toast body: "1 invite(s) queued"
  - Bottom bar: "Logout", "Back ⌘+⇧+↵", "Next ⌘+↵"
- **Data entities:** Invited user `samlee@content-mobbin.com` with role `Member`; queued invite count `1`.
- **Controls:** Send Invite (disabled grey, field cleared); role radios; email input reset to placeholder; Back/Next; Logout; toast (no visible dismiss button).
- **Table/list columns:** Invited-people list — two implicit columns: email (left) and role (right).
- **State shown:** Success confirmation with check-circle icon; email field cleared; Send Invite disabled again; toast visible.
- **Behavior implied:** Invites are queued asynchronously and emailed. Invitation status is later trackable in "Team Settings" — implying a Team Settings screen with an invitations table. The form resets for repeat invites.
- **Notable visuals:** Outline check-circle icon next to "Invitation Sent"; white toast card with shadow, ~8px radius, bottom-right anchored.

### 36 — Analytics dashboard (default, This week)
- **Route guess:** `/analytics` (org `Content-mobbin`)
- **Screen type:** page
- **Flow:** Main app after onboarding. Start of the Analytics exploration flow (36–42); 37 shows the hover tooltip on this same view.
- **Layout:** Top-to-bottom: (1) full-width green trial banner (~60px); (2) app header row with org switcher on the left and three icon affordances + avatar on the right; (3) horizontal tab bar; (4) content area on light grey — page title row with four filter dropdowns + Export at right; (5) a single wide KPI strip card with four stats in a row; (6) a two-column grid of chart cards (equal ~50% each) — row 1: "PRS REVIEWED BY GREPTILE" and "CRITICAL BUGS CAUGHT"; row 2 (cut off by the watermark): "ADDRESSED RATE" and "AVERAGE TIME TO MERGE". Content is constrained to ~1520px centered (x≈199–1721).
- **Nav items visible:** `Analytics` (ACTIVE — dark text with black underline), `Repositories`, `Code Review Settings`, `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`.
- **All visible text:**
  - Banner: "14 days left in your free trial!" and button "+ Add Payment Method"
  - Header: "Content-mobbin", badge "Admin"
  - Tabs: "Analytics", "Repositories", "Code Review Settings", "Custom Context", "Pull Requests", "Code Providers", "Integrations", "Organization Settings"
  - Page title: "Analytics"
  - Filters: "All teams", "All repositories", "All authors", "This week", "Export"
  - KPI labels/values: "Total Reviews" / "2"; "Avg Merge Time" / "-"; "Addressed rate" / "0%"; "# of critical bugs caught" / "2" + "in 1 repos"
  - Left chart card: "PRS REVIEWED BY GREPTILE"; selector "PRs reviewed"; y-axis label "PRS REVIEWED"; y ticks "2", "1.5", "1", "0.5", "0"; x ticks "13 MAY", "14 MAY", "15 MAY", "16 MAY", "17 MAY", "18 MAY", "19 MAY"; footer "Top Repos by Review Count"; row "samleemobbin-dot/laravel" — "2"
  - Right chart card: "CRITICAL BUGS CAUGHT"; selector "All Severity"; y-axis label "CRITICAL BUGS CAUGHT"; same ticks; footer "Repos with most critical bugs"; row "samleemobbin-dot/laravel" — "2"
  - Lower-left card (partially visible): "ADDRESSED RATE", value "0%", secondary "0"
  - Lower-right card (partially visible): "AVERAGE TIME TO MERGE"; selector "Mean"; y tick "0.5d"
- **Data entities:** Org `Content-mobbin`, viewer role `Admin`; repo `samleemobbin-dot/laravel` (2 reviews, 2 critical bugs); date range 13 MAY – 19 MAY; totals: 2 reviews, 0% addressed, 2 critical bugs in 1 repo; trial: 14 days left.
- **Controls:** "+ Add Payment Method" white button on green banner; org switcher with up/down chevron stepper icon; header icon buttons — book/docs icon, gift icon, user avatar (photo); tab bar; four dropdown filters (people icon "All teams", repo icon "All repositories", person icon "All authors", calendar icon "This week"); "Export" dark button with external-link icon; per-card select "PRs reviewed" (up/down chevrons), "All Severity", "Mean"; info "i" icon on ADDRESSED RATE card; green chat bubble.
- **Table/list columns:** Mini leaderboards in each chart card footer — columns: repo (GitHub icon + name) | value (right-aligned).
- **State shown:** Analytics tab active; all filters at their defaults ("All …", "This week"); one bar plotted at 19 MAY = 2 in both charts.
- **Behavior implied:** Product tracks PRs reviewed, critical bugs caught (by severity), addressed rate (whether Greptile comments were acted on), and average time to merge (mean/other aggregations). Data is sliceable by team, repository, author, and timeframe, and exportable. 14-day free trial with in-app payment prompt. Org switching + Admin role.
- **Notable visuals:** Vertical bar charts (single grey/slate series, category x-axis of dates, linear y-axis) rendered inside cards; monospace uppercase styling for card titles and axis labels; rotated (vertical) axis titles; GitHub octocat marks beside repo names.

### 37 — Analytics dashboard, chart hover tooltip
- **Route guess:** `/analytics`
- **Screen type:** page (hover/tooltip state)
- **Flow:** Analytics exploration; same view as 36 with the cursor over the 19 MAY column of the left chart.
- **Layout:** Identical to 36. A light vertical hover band highlights the 19 MAY category; a white tooltip card floats to the left of the bar.
- **Nav items visible:** Same; `Analytics` active.
- **All visible text:** Everything from 36, plus tooltip: "MAY 19" and series row "laravel" with value "2" (preceded by a small grey square series swatch).
- **Data entities:** Series `laravel` = 2 on MAY 19.
- **Controls:** Same as 36 (tooltip itself is non-interactive).
- **Table/list columns:** Tooltip acts as a mini table: swatch | series name | value.
- **State shown:** Hover on the 19 MAY bar; column highlight band visible.
- **Behavior implied:** Charts are stacked/multi-series by repository — the tooltip names the repo series, so multiple repos would stack in one bar.
- **Notable visuals:** Tooltip = white card, thin border, small shadow, monospace uppercase date header, sentence-case series name.

### 38 — Analytics dashboard, scrolled to lower cards
- **Route guess:** `/analytics` (scrolled)
- **Screen type:** page (scrolled)
- **Flow:** Analytics exploration; the bottom of the page begun in 36. Banner, header and tab bar remain pinned at top.
- **Layout:** Banner + header + tab bar pinned at top. Below: the bottom halves of the two row-2 cards ("ADDRESSED RATE" left, "AVERAGE TIME TO MERGE" right), then a single full-width card "GREPTILE COMMENTS" spanning both columns.
- **Nav items visible:** Same eight tabs; `Analytics` active.
- **All visible text:**
  - Banner: "14 days left in your free trial!" / "+ Add Payment Method"; header "Content-mobbin" "Admin"
  - Left card: y-axis label "ADDRESSED RATE"; tick "0"; series annotation "AVERAGE"; x ticks "13 MAY" … "19 MAY"; footer "Top repos by addressed rate"; row "samleemobbin-dot/laravel" — "0%"
  - Right card: y-axis label "AVERAGE TIME"; tick "0"; annotation "AVERAGE"; x ticks "13 MAY" … "19 MAY"; footer "Top Repos by Merge Time" (no rows listed)
  - Bottom card title: "GREPTILE COMMENTS"; selector "Upvote/Downvote Ratio"
  - Stat labels: "UPVOTES" / "0%" (green) and "DOWNVOTES" / "0%" (red)
  - y-axis label "UPVOTE/DOWNVOTE RATIO"; ticks "5" and "0"; annotation "AVERAGE"; x ticks "13 MAY", "14 MAY", "15 MAY", "16 MAY", "17 MAY", "18 MAY", "19 MAY"
  - Footer: "Most Upvoted Comments" (empty beneath it)
- **Data entities:** `samleemobbin-dot/laravel` addressed rate 0%; upvotes 0%, downvotes 0%; date range 13–19 MAY.
- **Controls:** "Upvote/Downvote Ratio" select (chevron stepper); thumbs-up and thumbs-down icons as stat labels; chat bubble.
- **Table/list columns:** Card footers are mini leaderboards: repo | value. "Top Repos by Merge Time" and "Most Upvoted Comments" are empty (no rows) — de facto empty states with no copy.
- **State shown:** All metrics zero/empty for this trial account; dashed "AVERAGE" baseline drawn at 0 on each line chart.
- **Behavior implied:** Users can upvote/downvote Greptile's PR comments, and that feedback is aggregated into a ratio metric plus a "Most Upvoted Comments" leaderboard. Line charts carry a dashed AVERAGE reference line.
- **Notable visuals:** Line charts with a dashed horizontal AVERAGE reference line labeled at the right end; green and red large percentage numerals; thumbs icons (line style).

### 39 — Analytics, "All teams" filter dropdown open
- **Route guess:** `/analytics`
- **Screen type:** dropdown-open
- **Flow:** Analytics exploration; user opened the teams filter. Selection applied in 40.
- **Layout:** Same as 36; a dropdown panel (~285px wide) drops from the "All teams" control, overlapping the KPI strip and hiding the "Avg Merge Time" value.
- **Nav items visible:** Same eight tabs; `Analytics` active.
- **All visible text:** All of 36's chrome, plus dropdown: section label "Teams"; options "All teams", "samleemobbin-dot". KPI values now read: "Total Reviews" "3"; "Addressed rate" "0%"; "# of critical bugs caught" "2" "in 1 repos". Left chart footer row now "samleemobbin-dot/laravel" — "3". Right chart footer row "samleemobbin-dot/laravel" — "2".
- **Data entities:** Team `samleemobbin-dot`; total reviews now 3 (data advanced since 36/37).
- **Controls:** Multi-select checkbox list — "All teams" (checked, dark filled with white check) and "samleemobbin-dot" (checked); the trigger's chevron flipped to point up.
- **Table/list columns:** none.
- **State shown:** Both checkboxes checked; filter trigger expanded.
- **Behavior implied:** Team filter is a multi-select with an "All teams" master checkbox; teams map 1:1 to connected GitHub orgs.
- **Notable visuals:** Square checkboxes with rounded corners, black fill when checked.

### 40 — Analytics, team filter applied
- **Route guess:** `/analytics`
- **Screen type:** page
- **Flow:** Analytics exploration; continues from 39 (dropdown closed with a team selected). Timeframe dropdown opens in 41.
- **Layout:** Identical to 36/39 with the dropdown closed.
- **Nav items visible:** Same; `Analytics` active.
- **All visible text:** Same as 36 except the first filter now reads "samleemobbin…" (truncated with ellipsis) and KPIs read "Total Reviews" "3", "Avg Merge Time" "-", "Addressed rate" "0%", "# of critical bugs caught" "2" "in 1 repos"; left chart footer "samleemobbin-dot/laravel" — "3"; right chart footer "samleemobbin-dot/laravel" — "2".
- **Data entities:** Selected team `samleemobbin-dot`; 3 reviews; 2 critical bugs in 1 repo.
- **Controls:** Same filter/select controls; first filter label truncated.
- **Table/list columns:** Chart-footer leaderboards as before.
- **State shown:** Team filter narrowed; other filters default; bars unchanged (2 at 19 MAY) although Total Reviews reads 3.
- **Behavior implied:** Filter chips truncate long team names; applied filters reflect in the trigger label.
- **Notable visuals:** Same as 36.

### 41 — Analytics, timeframe dropdown open
- **Route guess:** `/analytics`
- **Screen type:** dropdown-open
- **Flow:** Analytics exploration; continues from 40; the choice is applied in 42.
- **Layout:** Same as 40; a dropdown (~253px wide) drops from the "This week" control at the right of the filter row, overlapping the KPI strip and hiding the "# of critical bugs caught" value.
- **Nav items visible:** Same; `Analytics` active.
- **All visible text:** Page chrome as 40, plus dropdown: section label "Timeframe"; options "Last 7 days" (highlighted/hovered — light grey row background), "Last 30 days", "Last 60 days", "Last 90 days".
- **Data entities:** Timeframe presets: 7 / 30 / 60 / 90 days.
- **Controls:** Single-select menu (no checkboxes); hover highlight on "Last 7 days".
- **Table/list columns:** none.
- **State shown:** Menu open; "Last 7 days" hovered/active-looking; KPI "Total Reviews" 3, "Addressed rate" 0%.
- **Behavior implied:** Only four fixed relative ranges are offered (no custom range picker visible), even though the trigger's default label is "This week".
- **Notable visuals:** Same dropdown styling as 39 but without checkboxes.

### 42 — Analytics, "Last 60 Days" applied
- **Route guess:** `/analytics`
- **Screen type:** page
- **Flow:** End of Analytics exploration; continues from 41. Next flow starts at 43 (Repositories tab).
- **Layout:** Identical to 40; the filter row shifts slightly left because the timeframe chip label is wider.
- **Nav items visible:** Same; `Analytics` active.
- **All visible text:** Same as 40 except the timeframe filter now reads "Last 60 Days" (note capitalized "Days", vs. "Last 60 days" in the menu at 41). KPIs: "Total Reviews" "3", "Avg Merge Time" "-", "Addressed rate" "0%", "# of critical bugs caught" "2" "in 1 repos". Chart footers: "samleemobbin-dot/laravel" — "3" (left), "samleemobbin-dot/laravel" — "2" (right).
- **Data entities:** Timeframe = Last 60 Days; same metrics as 40.
- **Controls:** Same as 40.
- **Table/list columns:** Chart-footer leaderboards.
- **State shown:** Timeframe applied but the x-axis still shows 13–19 MAY only (7 buckets) — the chart did not re-bucket in this capture.
- **Behavior implied:** Filter selections persist in the trigger label; capitalization inconsistency between menu item and applied chip is a real product detail.
- **Notable visuals:** Same as 36.

### 43 — Repositories list
- **Route guess:** `/repositories`
- **Screen type:** page (list/table)
- **Flow:** Repository management; 44 shows the same list filtered by search.
- **Layout:** Banner, header, tab bar as before. Content column ~1520px centered: page H1 + subtitle, then a search input row (search field ~1360px wide + "Manage Repos" button at right), then a bordered table, then a pagination footer row (count at far left, page controls centered).
- **Nav items visible:** Same eight tabs; `Repositories` is ACTIVE (dark text + black underline); `Analytics` now inactive grey.
- **All visible text:**
  - Banner: "14 days left in your free trial!" / "+ Add Payment Method"; header "Content-mobbin" "Admin"
  - H1: "Repositories"; subtitle: "Manage connected repositories and view review metrics."
  - Search placeholder: "Search for repos by name"; button: "Manage Repos"
  - Column headers: "REPO", "REVIEWS", "AVG. TIME TO MERGE", "LAST 7 DAYS"
  - Rows (repo / reviews / merge time): "samleemobbin-dot/astrowind-lp" / "0 reviews" / "—"; "samleemobbin-dot/docs" / "0 reviews" / "—"; "samleemobbin-dot/doggy-stickers" / "0 reviews" / "—"; "samleemobbin-dot/landingpage" / "0 reviews" / "—"; "samleemobbin-dot/laravel" / "0 reviews" / "—"; "samleemobbin-dot/mini-landing-page" / "0 reviews" / "—"; "samleemobbin-dot/newlandingpage" / "0 reviews" / "—"; "samleemobbin-dot/odyssey" / "0 reviews" / "—"; "samleemobbin-dot/openreact-lp" / "0 reviews" / "—"; "samleemobbin-dot/payload-website-starter" / "0 reviews" / "—"
  - Footer: "10 of 11"; page buttons "1", "2"
- **Data entities:** 11 connected repos under `samleemobbin-dot` (10 listed on page 1): astrowind-lp, docs, doggy-stickers, landingpage, laravel, mini-landing-page, newlandingpage, odyssey, openreact-lp, payload-website-starter. All show 0 reviews and "—" merge time under the LAST 7 DAYS window.
- **Controls:** Search input with magnifier icon (italic placeholder); "Manage Repos" primary dark button; sortable column headers "REVIEWS", "AVG. TIME TO MERGE", "LAST 7 DAYS" (each with a chevron-down affordance — the last is likely a timeframe selector, not a sort); pagination — previous "<" (disabled-looking), page "1" (active, grey filled), page "2", next ">"; chat bubble.
- **Table/list columns:** REPO (GitHub octocat icon + `owner/name`) | REVIEWS ("N reviews") | AVG. TIME TO MERGE ("—" when no data) | LAST 7 DAYS (header only; the column body appears empty in this capture).
- **State shown:** Repositories tab active; page 1 of 2; search empty; 10 of 11 shown; the `laravel` row shows "0 reviews" here even though Analytics attributes 2–3 reviews to it — this column is scoped to "LAST 7 DAYS".
- **Behavior implied:** Repos are connected per code provider (GitHub) and managed through a separate "Manage Repos" flow (likely the GitHub App installation/repo selection). Per-repo review metrics are windowed and the window is switchable from the column header. Pagination at 10 rows/page.
- **Notable visuals:** Bordered table with grey uppercase monospace column headers, ~57px row height, thin row dividers; GitHub logo marks; em-dash placeholders for null metrics.

### 44 — Repositories list, search filtered to "laravel"
- **Route guess:** `/repositories?q=laravel`
- **Screen type:** page (filtered list)
- **Flow:** Repository management; continues from 43 (user typed in the search box).
- **Layout:** Same as 43. The table collapses to one row; the pagination footer disappears entirely; the rest of the page is empty white space down to the watermark.
- **Nav items visible:** Same eight tabs; `Repositories` active.
- **All visible text:**
  - Banner and header as 43
  - H1: "Repositories"; subtitle: "Manage connected repositories and view review metrics."
  - Search input value: "laravel"; button "Manage Repos"
  - Column headers: "REPO", "REVIEWS", "AVG. TIME TO MERGE", "LAST 7 DAYS"
  - Single row: "samleemobbin-dot/laravel" / "2 reviews" / "—"
- **Data entities:** `samleemobbin-dot/laravel` — 2 reviews, merge time "—".
- **Controls:** Search input (now with a typed value, non-italic), "Manage Repos", sortable/selectable column headers, chat bubble. No pagination rendered.
- **Table/list columns:** Same four columns as 43.
- **State shown:** Search filter applied; 1 result; pagination hidden because results fit one page. Reviews reads "2 reviews" (vs "0 reviews" at 43) — the two captures reflect different data/window states.
- **Behavior implied:** Search filters by repo-name substring and re-paginates; the row's review count is live.
- **Notable visuals:** Same table styling; no explicit "no results" state observed.

---

## Design tokens observed

**Mode:** Light mode only across all 15 screenshots. No dark-mode variant seen.

**Colors (approximate)**
- App background (content area): `#F6F6F5` / `#F4F4F3` warm-neutral light grey
- Onboarding background: same light grey with a dotted-grid pattern (dot ~1px, ~20px pitch, `#D8D8D6`)
- Surface / card: `#FFFFFF`
- Border (cards, tables, inputs): `#E5E5E3` – `#EAEAE8`, 1px
- Primary text: `#1A1A1A` / near-black `#111111`
- Secondary / muted text: `#6B6B6B` – `#767676`
- Tertiary axis/label text (monospace, uppercase): `#A0A0A0`
- Accent / brand green (banner, primary CTA, logo, chat bubble): `#2EE59D` – `#22DD8F`
- Dark/primary button fill: `#1A1A1A` (Export, Manage Repos, Send Invite enabled, toggle track when on)
- Disabled button fill: `#C7C7C5` with white text
- Success (upvotes): `#2EE59D`; Error/negative (downvotes): `#F2584F`
- Diff removed-line tint: `#FDF0F3` pink; diff added-line tint: `#E9FBF1` green; added-line gutter chip: `#C9F5DE`
- Claude chip: background `#FBEAE2`, text/icon `#D97757`
- Chart bar/series grey: `#8A8A93` slate
- Decorative: pink reptile texture in the `#F0A8E8` family; pink wireframe spheres `#F3A8E8` lines; lime corner squares `#E8F56B`

**Typography**
- Primary family: a geometric/grotesque sans with a single-story `g` and rounded terminals — reads like the Gilroy / Poppins / General Sans family (clearly not system-ui or Inter; the `g` and `a` are characteristic).
- Secondary family: a **monospace** used for every uppercase micro-label — stepper labels ("PR ANALYSIS"), chart card titles ("PRS REVIEWED BY GREPTILE"), axis labels, table column headers, tooltip date headers, the "GITHUB" provider label. Letter-spaced roughly 0.08em.
- Hierarchy observed:
  - H1 (onboarding): ~34–36px, 600–700, tight leading
  - H1 (page title "Analytics", "Repositories"): ~30px, 600
  - H2 / card heading ("Invite user to this team"): ~19px, 600
  - KPI numeral and big stat percent: ~34px, 700
  - Setting-row title ("Prompt to Fix with AI"): ~16px, 600
  - Body / nav tabs / dropdown options: ~15–16px, 400–500
  - Subcopy / descriptions: ~14–15px, 400, muted
  - Micro-label (mono, uppercase): ~11–12px, 500, letterspaced
  - Table cell: ~15px, 400

**Spacing & shape**
- Border radius: cards ~8px; buttons ~6–8px; inputs ~6px; chips/pills ~6px; toggle fully rounded (pill); dropdown panels ~8px; toast ~8px; avatar rounded-square ~8px.
- Border width: 1px everywhere; active tab underline ~2px solid black.
- Padding: card ~24–28px; table cell ~20px vertical / 24px horizontal; button ~10–12px vertical / 16–20px horizontal; setting row ~20px.
- Spacing scale reads as a 4px base: 4 / 8 / 12 / 16 / 24 / 32 / 48.
- Shadows: restrained — dropdowns, tooltip and toast get a soft low-opacity shadow (≈ 0 4px 12px rgba(0,0,0,.08)); cards rely on borders instead. The onboarding sheet has no shadow but carries lime corner markers.
- Content max width ~1520px, centered.

**Iconography**
- Line-style icons, ~1.5px stroke, rounded joins and caps — consistent with **Lucide** (users, calendar, search, external-link, check-circle, thumbs-up/down, bug, git-pull-request, git-merge, message-circle, lightbulb, wand/sparkles, book-open, gift, plus, chevron-down, chevrons-up-down).
- Brand marks used verbatim: GitHub octocat, Claude asterisk, Greptile diamond/box logo.
- Select controls use a double-chevron (up+down) stepper glyph; filter dropdowns use a single chevron-down.

**Components (recurring)**
- Full-width promo/trial banner with inline CTA button
- App header with org switcher (name + role badge + chevrons) and right-side icon cluster + avatar
- Horizontal underline tab bar
- Filter bar of icon+label dropdown chips, plus a right-aligned action button
- KPI / stat strip (single card, four stats in a row, label above large numeral)
- Chart card: mono uppercase title with leading icon, right-aligned select, plot area, footer mini-leaderboard
- Bar chart, line chart with dashed AVERAGE reference line, hover tooltip card
- Bordered data table with mono uppercase sortable headers + pagination footer ("N of M", prev / page numbers / next)
- Search input with leading magnifier and italic placeholder
- Settings row: icon + title + description on the left, control (toggle or button) on the right, inside a nested card
- Toggle switch (dark when on)
- Radio-as-card selector pair (Admin / Member)
- Tokenizing email input with removable chips
- Dropdown menu (plain list) and multi-select dropdown (checkbox list with a section label)
- Chip / pill badge (role "Admin", "Fix in Claude")
- Toast (bottom-right, title + body)
- Inline success block (check icon + heading + body)
- Onboarding wizard: segmented progress stepper + split-screen with decorative panel + live preview mock + fixed footer with keyboard-shortcut-annotated Back/Next
- Centered onboarding sheet with lime corner registration marks
- Floating round support/chat bubble (bottom-right, green)
