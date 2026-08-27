# Batch 07 — Screenshots 90–104

## Batch summary

**Distinct screens/pages in range**
1. Code Review Settings → When Greptile Reviews (90)
2. Code Review Settings → Custom Instructions (91)
3. Organization Settings → Organization (92, 93 scrolled, 98 edit mode, 99 dirty/edited, 100 saved + toast, 103 post-op read-only)
4. Organization Settings → People (94, 104 with Invite popover)
5. Organization Settings → Billing & Usage (95, 96 scrolled)
6. Organization Settings → API Keys (97)
7. Delete Organization confirmation modal (101 empty / disabled, 102 typed / enabled)

**Flows**
- Code Review Settings browsing: 90–91 (continues from batch-06; 91 is a scrolled/side-nav-selected state of the same page)
- Organization Settings tour: 92–97 (Organization → scroll to Danger Zone → People → Billing → API Keys)
- Org rename (edit → type → save → toast → settled): 98 → 99 → 100 → 103
- Destructive org delete confirmation: 101 → 102 (org context is `slmobbin`, a third org handle — see ambiguities)
- Invite member: 104 (popover over the People table)

**Feature areas touched:** code review configuration (strictness, auto-review, draft PRs, file limits, PR summary composition, author filters, comment header templating), organization identity/handle, Enterprise SSO (sales-gated), telemetry opt-in, feature tips, org deletion, member/role management + invitations, billing/invoices/payment methods/trial, API keys.

**Could not fully interpret / ambiguous**
- 101–102 show org name `slmobbin` and trial banner "14 days left", while 100 shows `asmobbin` and "13 days", and 103 shows `asmobbin` with "12 days". The capture sequence is NOT chronological — 101/102 appear to be from an earlier session (14 days) with a different org handle. Treat `Content-mobbin`, `asmobbin`, and `slmobbin` as three separate org fixtures.
- 90 and 91 are the same page at different scroll offsets; 91's sidebar highlight is on "Custom Instructions" and content is scrolled past "When Greptile Reviews"/"PR Summaries", so the sidebar behaves as a scroll-spy anchor list, not a router.
- Bottom ~120px of every capture is a Mobbin watermark bar, not app chrome.

---

### 90 — Code Review Settings: When Greptile Reviews
- **Route guess:** `/content-mobbin/settings/code-review` (anchor `#when-greptile-reviews`)
- **Screen type:** settings-tab
- **Flow:** Code review configuration. Continues from batch-06's Code Review Settings entries; scrolls into 91.
- **Layout:** (1) Full-width green trial banner. (2) White app bar: left = Greptile logo mark + org name + `Admin` pill + up/down chevron switcher; right = 3 icon buttons (open book / docs, gift, avatar). (3) Horizontal tab nav row with bottom-border active indicator. (4) Page header block (title + subtitle) inset ~200px from left. (5) Two-column body: left anchor sidebar (~275px, items ~52px tall, active item on light-grey fill with a dark left rail), right content column (~1115px) of section groups. Each section = icon + heading + subtitle, then a bordered white card. (6) Floating round green chat/support bubble bottom-right.
- **Nav items visible:** `Analytics`, `Repositories`, `Code Review Settings` (ACTIVE — underlined), `Custom Context`, `Pull Requests`, `Code Providers`, `Integrations`, `Organization Settings`
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · button `+ Add Payment Method`
  - App bar: `Content-mobbin` · `Admin`
  - Page header: `Code Review Settings` / `Configure how Greptile reviews pull requests.`
  - Sidebar: `When Greptile Reviews`, `PR Summaries`, `Custom Instructions`, `Greptile Comments`, `Default Coding Agents`, `Status Checks`, `Auto-enable New Repos`
  - Section 1 heading: `When Greptile Reviews` / `Control when Greptile runs and how much it reviews`
  - Card rows: `Strictness Level`; chip/hint `Greptile will comment on P2s less often.`; slider tick labels `LOW`, `MEDIUM`, `HIGH`
  - `Auto-review on new commits`
  - `Review draft pull requests` (with ⓘ info icon)
  - `File change limit` (with ⓘ info icon); stepper value `100`
  - Section 2 heading: `PR Summaries` / `Adjust what Greptile posts at the top of the PR`; right-aligned link `Personal review settings ↗`
  - Card: `Update original summary`; right label `less noisy` + toggle
  - Nested item: `PR Summary` / `Include a text summary of the changes` + toggle
  - Nested checkboxes: `Collapsible`, `Default Open` (Default Open label greyed)
- **Data entities:** org `Content-mobbin`; role `Admin`; trial days remaining `13`; file change limit `100`; strictness `MEDIUM`
- **Controls:** `+ Add Payment Method` (white/secondary on green banner); docs icon button; gift icon button; avatar button; org switcher chevron (up/down caret pair); 8 top tabs; 7 sidebar anchor links; 3-stop slider (Strictness Level, knob at MEDIUM); toggle `Auto-review on new commits` (OFF); toggle `Review draft pull requests` (OFF); number stepper `100` with up/down caret; toggle `Update original summary` (ON, dark); toggle `PR Summary` (ON, dark); checkbox `Collapsible` (unchecked); checkbox `Default Open` (unchecked + disabled); link `Personal review settings ↗`; chat bubble FAB
- **Table/list columns:** none
- **State shown:** Code Review Settings tab active; sidebar item `When Greptile Reviews` selected; strictness at MEDIUM; two toggles OFF, two ON; `Default Open` disabled (implies it is gated on `Collapsible` being checked)
- **Behavior implied:** Greptile's review aggression is a 3-level slider with live explanatory copy ("P2s" implies a P0–P3 severity taxonomy). Reviews can re-run on new commits, optionally cover draft PRs, and are skipped past a file-count threshold. PR summary block is composable (toggle sub-blocks, collapsible rendering). Org-level settings coexist with per-user "Personal review settings".
- **Notable visuals:** custom slider with a textured/grip knob; pill-shaped toggles (dark = on, light grey = off); small line icons preceding each section heading (activity/pulse, git-branch-like); no charts or code blocks

### 91 — Code Review Settings: Custom Instructions + comment filters
- **Route guess:** `/content-mobbin/settings/code-review#custom-instructions`
- **Screen type:** settings-tab (scrolled continuation of 90)
- **Flow:** Code review configuration; continues from 90.
- **Layout:** Same shell; page header scrolled out of view so the sidebar starts at the nav underline. Sidebar item `Custom Instructions` now highlighted. Content column shows three stacked sections, each icon + heading + subtitle + bordered card.
- **Nav items visible:** same 8; `Code Review Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - Sidebar: `When Greptile Reviews`, `PR Summaries`, `Custom Instructions` (active), `Greptile Comments`, `Default Coding Agents`, `Status Checks`, `Auto-enable New Repos`
  - Section: `Custom Instructions` / `Fine-tune how Greptile reviews your code`
  - Field label `Instructions` (ⓘ); textarea content `Act like strict manager`
  - Section: `What should Greptile comment on?` / `Adjust what Greptile should comment on`
  - Card label `Filters`; select `Authors`; select `Exclude`; token chips `× dependabot[bot]`, `× renovate[bot]`, `× pre-commit-ci[bot]`, overflow `…`; button `+ Add Filter`
  - Section: `What should be included in a Greptile comment?` / `Adjust what Greptile says when replying to code and highlighting issues`
  - Card label `Comment Header`; textarea content line 1 `**Disclaimer:** Reviewed by an LLM with strong opinions and zero stake in this codebase.` line 2 `---`
- **Data entities:** excluded authors `dependabot[bot]`, `renovate[bot]`, `pre-commit-ci[bot]`; instruction text `Act like strict manager`; comment header markdown `**Disclaimer:** Reviewed by an LLM with strong opinions and zero stake in this codebase.` + `---`
- **Controls:** multiline textarea `Instructions` (resize grip bottom-right); select `Authors` (up/down caret); select `Exclude` (with a crossed-set / ∉ icon, caret); multi-token input with removable `×` chips and a `…` overflow affordance; trash/delete icon button at row end (removes the filter row); `+ Add Filter` (secondary/outline); `Comment Header` textarea
- **Table/list columns:** none (filter builder is a row-per-rule layout: [subject select] [operator select] [value tokens] [delete])
- **State shown:** sidebar anchor on Custom Instructions; one filter rule configured; header textarea pre-filled and clipped by the viewport bottom
- **Behavior implied:** Free-text steering prompt for the reviewer. Comment targeting is a rule builder — subject (`Authors`) × operator (`Exclude`) × values (bot accounts), and rules are additive/deletable. The comment header supports Markdown (`**bold**`, `---` rule) and is user-templated.
- **Notable visuals:** monospace-ish token chips; textareas with visible resize handle; Markdown shown as raw source, not rendered

### 92 — Organization Settings: Organization (read-only)
- **Route guess:** `/content-mobbin/settings/organization`
- **Screen type:** settings-tab
- **Flow:** Organization Settings tour, start. Continues into 93 (scroll).
- **Layout:** Same shell. Header block, then two columns: sidebar (~285px, 4 items) + content (~1200px). Content is a sequence of `h2` + bordered card blocks.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE (underlined)
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - Header: `Organization Settings` / `Manage your organization's configuration and preferences.`
  - Sidebar: `Organization` (active), `People`, `Billing & Usage`, `API Keys`
  - `Organization Details`; labels `Name`, `Handle`; field values (greyed/disabled) `Content-mobbin`, `content-mobbin`; button `Edit`
  - `Enterprise SSO`; card copy `Contact us at support@greptile.com to enable Enterprise SSO for your organization.`
  - `Settings`; row `Help us improve Greptile` / `Allow Greptile to learn from your usage to improve the code review agent` + toggle
  - `Feature Tips`; row `New feature tips in PR comments` / `Occasional tips about Greptile features included in review comments` + toggle
  - `Danger Zone` (heading only, card below the fold)
- **Data entities:** org name `Content-mobbin`; handle `content-mobbin`; support email `support@greptile.com`
- **Controls:** `Edit` button (secondary/outline, pencil-in-square icon); two disabled text inputs; toggle `Help us improve Greptile` (ON); toggle `New feature tips in PR comments` (ON); mailto link `support@greptile.com` (green)
- **Table/list columns:** none
- **State shown:** Organization sub-tab active; details in read-only mode (inputs greyed); both toggles ON
- **Behavior implied:** Org name/handle are edit-gated behind an explicit Edit button. Enterprise SSO is not self-serve — it is a sales/support-gated upgrade. Telemetry ("learn from your usage") is opt-out at org level. In-product feature tips can be injected into PR review comments.
- **Notable visuals:** green link color matches brand; toggles dark-filled when on

### 93 — Organization Settings: Organization scrolled to Danger Zone
- **Route guess:** `/content-mobbin/settings/organization` (scrolled)
- **Screen type:** settings-tab
- **Flow:** Organization Settings tour; continues from 92, precedes 94.
- **Layout:** Same; header scrolled away, `Handle` row partially clipped at the top of the content column. Sidebar items shift up with the scroll (sidebar scrolls with page, not sticky).
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - Clipped: `Handle` / `content-mobbin`
  - `Enterprise SSO` — `Contact us at support@greptile.com to enable Enterprise SSO for your organization.`
  - `Settings` — `Help us improve Greptile` / `Allow Greptile to learn from your usage to improve the code review agent`
  - `Feature Tips` — `New feature tips in PR comments` / `Occasional tips about Greptile features included in review comments`
  - `Danger Zone`
  - Danger card: `Delete this Organization` (red, with ⓘ icon) / `This will permanently delete the organization and all its data for every member. This cannot be undone.` · button `Delete Organization` (trash icon)
- **Data entities:** handle `content-mobbin`; support email `support@greptile.com`
- **Controls:** `Delete Organization` — destructive variant, light red/pink fill with red text and trash icon (not solid red at rest)
- **Table/list columns:** none
- **State shown:** both toggles ON; nothing selected; page bottom reached (whitespace below the danger card)
- **Behavior implied:** Org deletion is irreversible and affects every member; it is visually quarantined in a "Danger Zone" section at page bottom and opens a confirmation modal (see 101–102).
- **Notable visuals:** destructive card uses red text/border-tinted button on white card; no red card background

### 94 — Organization Settings: People
- **Route guess:** `/content-mobbin/settings/people`
- **Screen type:** settings-tab (populated table)
- **Flow:** Organization Settings tour; continues from 93. Same screen re-appears at 104 with the invite popover open.
- **Layout:** Header block; sidebar (4 items, `People` active) + content. Content top row: search input (flex-grow, ~865px) + `All roles` select (~125px) + `Invite people` primary button. Below: bordered table, 3 columns, 2 rows, then large empty whitespace.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - Header: `People` / `Manage members, roles, and invitations.`
  - Sidebar: `Organization`, `People` (active), `Billing & Usage`, `API Keys`
  - Search placeholder: `Search by email`
  - Select: `All roles`
  - Button: `+ Invite people`
  - Column headers (uppercase, letter-spaced, mono-ish): `EMAIL`, `ROLE`, `ACTIONS`
  - Row 1: avatar initial `S` · `samlee@content-mobbin.com` · badge `Pending` · `Member` · `⋯`
  - Row 2: avatar initial `A` · `alexsmith@content-mobbin.com` · badge `You` · `Admin` · (no actions)
- **Data entities:**
  - Member: `samlee@content-mobbin.com`, role `Member`, status `Pending`, initial `S`
  - Member: `alexsmith@content-mobbin.com`, role `Admin`, status `You` (current user), initial `A`
- **Controls:** search input with magnifier icon (placeholder `Search by email`); `All roles` select with caret (options not shown; presumably All roles / Admin / Member); `+ Invite people` (primary, dark/black fill, white text, plus icon); per-row `⋯` overflow icon button (row 1 only)
- **Table/list columns:** `EMAIL` | `ROLE` | `ACTIONS`. Row shape: circular grey avatar with initial, email text, optional status badge inline after email, then role as plain text, then overflow menu. Header row has a light grey fill; rows are white with 1px separators.
- **State shown:** People sub-tab active; 2 rows; no row selected; current user's row has no actions (cannot act on self)
- **Behavior implied:** Two-role model (Admin, Member). Invitations exist in a `Pending` state before acceptance. Role filtering and email search are supported. Self-row actions are suppressed.
- **Notable visuals:** initial-letter avatars rather than images; grey pill badges

### 95 — Organization Settings: Billing & Usage (empty state)
- **Route guess:** `/content-mobbin/settings/billing`
- **Screen type:** settings-tab / empty-state
- **Flow:** Organization Settings tour; continues from 94, scrolls into 96.
- **Layout:** Header block; sidebar (`Billing & Usage` active) + content. Content: section heading + subtitle, then a tall bordered card whose header strip reads `INVOICE HISTORY` and whose body is a ~340px-tall empty area with centered text. Below: `Payment Details` heading with right-aligned button, then a table with one column header and a centered empty message. `Past Invoices` heading begins at the fold.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - Header: `Billing` / `Manage your subscription, payment methods, and invoices.`
  - Sidebar: `Organization`, `People`, `Billing & Usage` (active), `API Keys`
  - Section: `Billing & Usage` / `Manage your billing details`
  - Card header: `INVOICE HISTORY` (uppercase, mono, with a receipt/invoice line icon)
  - Empty copy: `No invoice data available`
  - `Payment Details` · button `+ Add Payment Method`
  - Column header `NAME`; empty copy `No payment methods`
  - `Past Invoices`
- **Data entities:** none (all empty); page title is `Billing` while the sidebar label and section heading are `Billing & Usage`
- **Controls:** `+ Add Payment Method` (secondary/outline, plus icon)
- **Table/list columns:** Payment methods table: `NAME` + one unlabeled trailing column (actions). Invoice history card is chart-shaped (large blank plot area) rather than tabular.
- **State shown:** Billing sub-tab active; every region empty; trial account
- **Behavior implied:** Invoice history is normally a visualization (usage/spend over time) — here blank because the org is on trial with no charges. Payment methods and invoices are separate lists.
- **Notable visuals:** the `INVOICE HISTORY` card is almost certainly a chart container in the populated case (tall blank canvas with a labeled header strip); uppercase mono section label style matches the table headers

### 96 — Organization Settings: Billing scrolled (Billing Portal)
- **Route guess:** `/content-mobbin/settings/billing` (scrolled)
- **Screen type:** settings-tab / empty-state
- **Flow:** Organization Settings tour; continues from 95, precedes 97.
- **Layout:** Same; the invoice-history card is clipped at top. Then `Payment Details`, `Past Invoices`, `Billing Portal` sections.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - `Payment Details` · `+ Add Payment Method`; header `NAME`; `No payment methods`
  - `Past Invoices`; headers `DATE ↓`, `AMOUNT`; `No results.`
  - `Billing Portal`
  - Card: `Manage Billing` + badge `Trial` / `You're on a free trial until Jun 1, 2026. Visit the portal to add a payment method or manage your plan.` · button `Manage`
- **Data entities:** trial end date `Jun 1, 2026`; plan status badge `Trial`
- **Controls:** `+ Add Payment Method` (secondary); `Manage` (secondary/outline); `DATE` column sort control (down arrow = currently sorted descending)
- **Table/list columns:** Past Invoices: `DATE` (sorted desc) | `AMOUNT`; empty body reads `No results.`
- **State shown:** all empty; `DATE` sorted descending; trial badge present
- **Behavior implied:** Billing is delegated to an external portal (Stripe-like) via `Manage`. Trial has a hard end date. Note two different empty strings in one page — `No payment methods` vs `No results.` — so empty copy is per-table, not global.
- **Notable visuals:** small grey `Trial` pill next to a card title

### 97 — Organization Settings: API Keys (empty)
- **Route guess:** `/content-mobbin/settings/api-keys`
- **Screen type:** settings-tab / empty-state
- **Flow:** Organization Settings tour; end of the 92–97 sweep.
- **Layout:** Header block; sidebar (`API Keys` active) + content. Content top row: search input (~995px) + `Create API Key` primary button. Below: bordered table, 4 columns, empty body. Rest of the page is whitespace.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - Header: `API Keys` / `Create and manage API keys for programmatic access.`
  - Sidebar: `Organization`, `People`, `Billing & Usage`, `API Keys` (active)
  - Search placeholder: `Search by name...`
  - Button: `+ Create API Key`
  - Column headers: `NAME`, `ID`, `CREATED`
  - Empty: `No results.`
- **Data entities:** none
- **Controls:** search input with magnifier (`Search by name...`); `+ Create API Key` (primary, dark fill); `NAME` sortable (up/down caret, unsorted); `CREATED` sortable (down arrow, sorted desc)
- **Table/list columns:** `NAME` (sortable) | `ID` | `CREATED` (sorted desc) | unlabeled actions column
- **State shown:** API Keys sub-tab active; zero keys; CREATED desc default sort
- **Behavior implied:** Public API exists with org-scoped keys; keys have a visible ID (prefix) and creation timestamp, and are searchable by name. Note the placeholder here uses an ellipsis (`Search by name...`) while People uses none (`Search by email`) — inconsistent, reproduce verbatim.
- **Notable visuals:** identical table chrome to People and Past Invoices — one shared table component

### 98 — Organization Details in edit mode (unchanged)
- **Route guess:** `/asmobbin-or-content-mobbin/settings/organization` (org bar still reads `Content-mobbin`)
- **Screen type:** settings-tab, inline-edit state
- **Flow:** Org rename, step 1. Precedes 99.
- **Layout:** Identical to 92, except the Organization Details card's right side now holds two buttons instead of `Edit`, and both inputs are enabled (white bg, dark text, visible borders).
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):** Banner `13 days left in your free trial!` · `+ Add Payment Method`; `Organization Settings` / `Manage your organization's configuration and preferences.`; sidebar `Organization` (active), `People`, `Billing & Usage`, `API Keys`; `Organization Details`; `Name` = `Content-mobbin`; `Handle` = `content-mobbin`; buttons `Discard`, `Save Changes`; `Enterprise SSO` / `Contact us at support@greptile.com to enable Enterprise SSO for your organization.`; `Settings` / `Help us improve Greptile` / `Allow Greptile to learn from your usage to improve the code review agent`; `Feature Tips` / `New feature tips in PR comments` / `Occasional tips about Greptile features included in review comments`; `Danger Zone`
- **Data entities:** name `Content-mobbin`; handle `content-mobbin`
- **Controls:** `Discard` (secondary/outline, enabled); `Save Changes` (grey fill, DISABLED — no changes yet); two enabled text inputs
- **Table/list columns:** none
- **State shown:** edit mode active, form pristine, save disabled
- **Behavior implied:** Dirty-state tracking — Save Changes only enables once a field differs from its saved value. Both name and handle are editable together.
- **Notable visuals:** disabled primary button rendered as mid-grey fill with white text

### 99 — Organization Details edited (dirty, save enabled)
- **Route guess:** same as 98
- **Screen type:** settings-tab, inline-edit dirty state
- **Flow:** Org rename, step 2. Continues from 98 into 100.
- **Layout:** Identical to 98.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE. Note: the app-bar org name still reads `Content-mobbin` (not yet saved).
- **All visible text (verbatim):** as 98 but `Name` = `asmobbin` and `Handle` = `asmobbin`; buttons `Discard`, `Save Changes`
- **Data entities:** new name `asmobbin`; new handle `asmobbin`
- **Controls:** `Discard` (secondary); `Save Changes` (now PRIMARY, dark/black fill, enabled)
- **Table/list columns:** none
- **State shown:** form dirty; both fields changed; save enabled; app bar not yet updated
- **Behavior implied:** Handle is not auto-slugified from name independently — both were changed to the same string here, but they are separate inputs. The header org label updates only after commit.
- **Notable visuals:** the enabled/disabled contrast on `Save Changes` (black vs grey) is the clearest primary-button token pair in the batch

### 100 — Organization details saved (success toast)
- **Route guess:** `/asmobbin/settings/organization`
- **Screen type:** settings-tab + toast
- **Flow:** Org rename, step 3. Continues from 99.
- **Layout:** Identical to 92 (back to read-only). New: a toast card anchored bottom-right, ~495x105px, overlapping the Feature Tips card and sitting behind/beside the chat FAB.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):** Banner `13 days left in your free trial!` · `+ Add Payment Method`; app bar `asmobbin` `Admin`; `Organization Settings` / `Manage your organization's configuration and preferences.`; sidebar `Organization`, `People`, `Billing & Usage`, `API Keys`; `Organization Details`; `Name` `asmobbin`; `Handle` `asmobbin`; `Edit`; `Enterprise SSO` / `Contact us at support@greptile.com to enable Enterprise SSO for your organization.`; `Settings` / `Help us improve Greptile` / `Allow Greptile to learn from your usage to improve the code review agent`; `Feature Tips` / `New feature tips in PR comments` / `Occasional tips about Greptile features included in review comments`; `Danger Zone`; toast title `Success`, toast body `Organization details updated successfully`
- **Data entities:** org now `asmobbin` / `asmobbin`
- **Controls:** `Edit` (returned); toast has no visible dismiss button
- **Table/list columns:** none
- **State shown:** read-only mode restored; app-bar org label updated to `asmobbin`; success toast visible
- **Behavior implied:** Saving exits edit mode, propagates the new name to the global app bar immediately, and confirms with a transient success toast. Toast text uses green title over green body on a white card.
- **Notable visuals:** toast = white card, thin border, subtle shadow, green heading `Success` and green body text; bottom-right stacking position

### 101 — Delete Organization modal (empty, confirm disabled)
- **Route guess:** `/slmobbin/settings/organization` (Danger Zone)
- **Screen type:** modal
- **Flow:** Destructive org delete. Precedes 102. NOTE: banner reads `14 days left` and org is `slmobbin` — a different/earlier session than 100/103.
- **Layout:** Whole page dimmed by a white-ish overlay (~85% white scrim; the green banner washes to pale mint, all text greys out). Centered modal ~565x330px, white, thin border, small radius. Modal body: title, paragraph, instruction line, text input, then a right-aligned button row.
- **Nav items visible:** same 8, all dimmed; `Organization Settings` still shows the active underline
- **All visible text (verbatim):**
  - Dimmed banner: `14 days left in your free trial!` · `+ Add Payment Method`
  - Dimmed app bar: `slmobbin` `Admin`
  - Modal title: `Delete Organization`
  - Body: `This action cannot be undone. This will permanently delete slmobbin.` (org name bolded inline)
  - Instruction: `Please type: confirm deletion of organization` (the phrase in bold red)
  - Input: empty, no placeholder
  - Buttons: `Cancel`, `Delete this organization`
  - Dimmed background text still legible: `Enterprise SSO`, `Contact us at support@greptile.com to enable Enterprise SSO for your organization.`, `Settings`, `Help us impr…`, `Allow Greptile …`, `Feature Tips`, `New feature`, `Occasional tips about Greptile features included in review comments`, `Danger Zone`, `Delete this Organization`, `This will permanently delete the organization and all its data for every member. This cannot be undone.`, `Delete Organization`
- **Data entities:** org `slmobbin`; required confirmation phrase `confirm deletion of organization`; trial `14 days`
- **Controls:** text input (empty, focusable); `Cancel` (secondary/outline); `Delete this organization` (destructive, DISABLED — pale pink fill, muted red text)
- **Table/list columns:** none
- **State shown:** modal open, input empty, destructive action disabled/gated
- **Behavior implied:** Type-to-confirm gate on org deletion. The required phrase is a fixed sentence (`confirm deletion of organization`), not the org name.
- **Notable visuals:** unusual light scrim (page washes out rather than darkens); avatar in app bar renders as a generic person outline icon here rather than a photo

### 102 — Delete Organization modal (phrase typed, confirm enabled)
- **Route guess:** `/slmobbin/settings/organization` (Danger Zone)
- **Screen type:** modal
- **Flow:** Destructive org delete, step 2. Continues from 101.
- **Layout:** Identical to 101.
- **Nav items visible:** same 8, dimmed
- **All visible text (verbatim):** Dimmed banner `14 days left in your free trial!` · `+ Add Payment Method`; app bar `slmobbin` `Admin`; modal `Delete Organization`; `This action cannot be undone. This will permanently delete slmobbin.`; `Please type: confirm deletion of organization`; input value `confirm deletion of organization` (rendered in monospace); `Cancel`; `Delete this organization`
- **Data entities:** org `slmobbin`; typed phrase `confirm deletion of organization`
- **Controls:** filled text input; `Cancel` (secondary); `Delete this organization` (destructive, ENABLED — solid red fill, white text)
- **Table/list columns:** none
- **State shown:** confirmation phrase matched; destructive button live
- **Behavior implied:** Exact-match validation on the typed phrase flips the destructive button from disabled-pale to solid red. Validation is live (no submit needed).
- **Notable visuals:** the input value renders in a monospace face while the prompt above it is in the sans UI face — the confirm field is deliberately mono

### 103 — Organization Settings after rename (settled)
- **Route guess:** `/asmobbin/settings/organization`
- **Screen type:** settings-tab
- **Flow:** Org rename, final settled state (a later session — banner now `12 days left`).
- **Layout:** Identical to 92/100 with no toast.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):** Banner `12 days left in your free trial!` · `+ Add Payment Method`; app bar `asmobbin` `Admin`; `Organization Settings` / `Manage your organization's configuration and preferences.`; sidebar `Organization` (active), `People`, `Billing & Usage`, `API Keys`; `Organization Details`; `Name` `asmobbin`; `Handle` `asmobbin`; `Edit`; `Enterprise SSO` / `Contact us at support@greptile.com to enable Enterprise SSO for your organization.`; `Settings` / `Help us improve Greptile` / `Allow Greptile to learn from your usage to improve the code review agent`; `Feature Tips` / `New feature tips in PR comments` / `Occasional tips about Greptile features included in review comments`; `Danger Zone`
- **Data entities:** org `asmobbin`; trial days `12`
- **Controls:** `Edit`; two toggles (both ON); mailto link
- **Table/list columns:** none
- **State shown:** read-only; toggles ON; avatar renders as generic person icon (signed-in but no photo loaded)
- **Behavior implied:** Trial countdown decrements daily and is persistent chrome across every page in the app.
- **Notable visuals:** identical to 92 apart from org name and day count — good reference frame for the default Organization tab

### 104 — People with Invite people popover
- **Route guess:** `/asmobbin/settings/people`
- **Screen type:** dropdown-open / popover over a page
- **Flow:** Invite member. Opens from the `+ Invite people` button on the People screen (94).
- **Layout:** People page as in 94. A popover panel (~710x135px) is anchored under the `+ Invite people` button, right-aligned to it, overlapping the table's ROLE/ACTIONS columns. Panel header row: title left, link-button right, separated by a hairline; body row: email input (flex) + role select + submit button.
- **Nav items visible:** same 8; `Organization Settings` ACTIVE
- **All visible text (verbatim):**
  - Banner: `13 days left in your free trial!` · `+ Add Payment Method`
  - App bar: `asmobbin` `Admin`
  - Header: `People` / `Manage members, roles, and invitations.`
  - Sidebar: `Organization`, `People` (active), `Billing & Usage`, `API Keys`
  - Search placeholder `Search by email`; select `All roles`; button `+ Invite people`
  - Table headers `EMAIL`, `ROLE` (ACTIONS obscured by the popover)
  - Row 1: `S` · `samlee@content-mobbin.com` · `Pending` · `Member`
  - Row 2: `A` · `alexsmith@content-mobbin.com` · `You` · `Admin`
  - Popover: title `Invite people`; link `Copy member link` (chain-link icon); input placeholder `Email address`; select `Member`; button `Invite`
- **Data entities:** same two members as 94 (`samlee@content-mobbin.com` / Member / Pending; `alexsmith@content-mobbin.com` / Admin / You) — note the member emails keep the `@content-mobbin.com` domain even though the org was renamed to `asmobbin`
- **Controls:** `+ Invite people` (primary, in open/active state); popover: `Copy member link` (ghost/link button with link icon); email text input (`Email address`); role select defaulting to `Member` with up/down caret; `Invite` (DISABLED — pale grey text, no email entered)
- **Table/list columns:** `EMAIL` | `ROLE` | `ACTIONS` (as 94)
- **State shown:** popover open; email empty; role `Member`; `Invite` disabled until a valid email is entered
- **Behavior implied:** Two invite paths — per-email invitation with a role assigned at invite time, and a shareable "member link" that anyone can use to join (copied to clipboard). Role selection at invite time confirms the Admin/Member role set.
- **Notable visuals:** popover uses the same card border/shadow language as the toast; no arrow/caret pointer on the popover

---

## Design tokens observed

Light mode only across all 15 screenshots. No dark-mode capture in this range.

- **Colors**
  - Page background: `#F7F7F7` – `#FAFAFA` (very light warm grey)
  - Surface / card: `#FFFFFF`
  - App bar / nav: `#FFFFFF` with a `#E7E7E7` bottom hairline
  - Border (cards, inputs, table cells): `#E5E5E5` – `#E8E8E8`, 1px
  - Primary text: `#111111` – `#1A1A1A`
  - Secondary / muted text: `#6B6B6B` – `#7A7A7A`
  - Disabled / placeholder text: `#A0A0A0`
  - Table header fill: `#F5F5F5`; header label text `#8A8A8A` uppercase
  - Sidebar active item fill: `#EFEFEF` with a `#111111` 2–3px left rail
  - Accent / brand green (banner, links, logo, chat FAB): `#2DE08E` – `#34E08F` (banner), link green `#1FB877` – `#22C07E`
  - Primary button: `#111111` fill / `#FFFFFF` text (`Invite people`, `Create API Key`, `Save Changes` enabled)
  - Disabled primary: `#B5B5B5` fill / white text
  - Toggle ON: `#111111` track, white knob; toggle OFF: `#E2E2E2` track
  - Destructive at rest: text `#E03A3A`, fill `#FDE8E8` (pale pink)
  - Destructive enabled/active: fill `#E5252B` – `#EE2B2B`, white text
  - Success (toast text): `#1FA971` – `#22B77C`
  - Badge/pill neutral (`Pending`, `You`, `Trial`, `Admin`): `#EFEFEF` fill, `#4A4A4A` text
  - Modal scrim: white at ~80–88% opacity (washes the page out rather than darkening it)
- **Typography**
  - UI sans throughout with a geometric/grotesque feel and a distinctive single-storey-ish `g`; headings noticeably tighter and heavier than body. Consistent with a Poppins/Gilroy-class display sans for headings paired with the same family at regular weight for body.
  - h1 (page title, e.g. `Code Review Settings`, `People`, `API Keys`): ~30–32px, weight 600–700
  - h2 (section, e.g. `Organization Details`, `Danger Zone`, `Billing Portal`): ~21–23px, weight 600
  - h3 / section-with-icon (e.g. `When Greptile Reviews`, `What should Greptile comment on?`): ~23–25px, weight 600
  - Card row title (e.g. `Help us improve Greptile`, `Strictness Level`): ~17–18px, weight 500–600
  - Body / subtitle: ~15–16px, weight 400, muted
  - Nav tabs & sidebar items: ~16px, weight 400 (active tab ~500)
  - Table column headers & card-header labels (`EMAIL`, `INVOICE HISTORY`, `CREATED`): ~12–13px, uppercase, letter-spacing ~0.08em, monospace or mono-flavored face
  - Mono: used for the delete-confirmation input value and the uppercase table/section labels
  - Small print (slider ticks `LOW`/`MEDIUM`/`HIGH`, badges): ~11–12px uppercase
- **Spacing & shape**
  - Border radius: cards ~8px; buttons ~7–8px; inputs ~7px; toggles fully rounded (pill); badges/pills ~5–6px; token chips ~5px; modal ~8px; avatar circles fully round
  - Border width: 1px everywhere; sidebar active rail 2–3px; active tab underline 2px
  - Card padding: ~24–32px horizontal, ~20–28px vertical; row height in setting cards ~80px; table row height ~67px; sidebar item height ~52px
  - Content column max width ~1200px, left-inset ~200px from viewport edge; sidebar column ~275–285px
  - Vertical rhythm between sections ~48–56px; heading-to-card gap ~20px
  - Shadow: almost none — cards are flat with hairline borders. Only the toast (100) and the invite popover (104) carry a soft low-opacity drop shadow.
- **Iconography**
  - Line icons, 1.5–1.75px stroke, rounded caps and joins, ~16–20px. Style is consistent with Lucide / Feather.
  - Seen: magnifier (search), plus, pencil-in-square (edit), trash (delete), chevron/caret pairs (selects, steppers, sortable columns), single down arrow (active sort), info circle ⓘ, chain link (copy link), book/manual, gift, activity-pulse, git-branch, speech bubble (×2 variants for the two comment sections), receipt/invoice, crossed-set (filter Exclude operator), horizontal ellipsis `⋯` (row overflow), external-link arrow `↗`
- **Components**
  - Persistent trial banner with inline CTA (full-bleed, brand green)
  - App bar with org switcher (name + role pill + caret) and icon-button cluster
  - Horizontal tab bar with underline active indicator
  - Page header block (h1 + muted subtitle)
  - Vertical sub-nav / anchor sidebar with active fill + left rail (used both as router in Org Settings and as scroll-spy in Code Review Settings)
  - Settings card with label/description on the left and control on the right (toggle, stepper, slider)
  - Section header with leading line icon + subtitle
  - Data table (grey uppercase header row, sortable columns, 1px separators, centered empty-state message inside the body)
  - Empty state (centered muted single-line copy; two different strings in use: `No results.` and `No <thing>`)
  - Badge/pill (neutral grey; `Pending`, `You`, `Trial`, `Admin`)
  - Removable token chips with `×` and `…` overflow
  - Filter/rule builder row: select + select + token input + trash
  - Toggle switch (dark = on)
  - 3-stop labeled slider with contextual hint chip
  - Numeric stepper input
  - Inline edit form with Discard / Save Changes dirty-state pair
  - Danger Zone card (red text + pale destructive button)
  - Type-to-confirm destructive modal with light scrim
  - Success toast (bottom-right, white card, green title + body)
  - Anchored popover form (invite) with header row + link action
  - Floating circular chat/support FAB, brand green, bottom-right, ~56px
