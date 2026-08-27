# Batch 01 — Screenshots 0–14

## Batch summary

**Distinct screens (11 unique across 15 captures):**
1. Marketing homepage hero (0)
2. Log in (1)
3. Create an account (2 empty, 3 filled)
4. Onboarding — What's your name? (4 empty/disabled, 5 filled/enabled)
5. Onboarding — Create Your Organization (6)
6. Onboarding — What brought you to Greptile? (7 empty, 8 one checked, 9 select open, 10 fully answered)
7. Connect code provider — no provider chosen (11)
8. Connect code provider — GitHub chosen, three-step stepper (12)
9. Select GitHub org — none selected (13)
10. Select GitHub org — selected, Next enabled (14)

**Flows:**
- Marketing entry into auth: 0
- Authentication (login / signup): 1–3
- Profile and organization onboarding wizard: 4–10 (name → organization → intent survey)
- Code-provider connection wizard: 11–14 (provider → connect → select org → enable repositories, which continues past 14)

**Feature areas touched:** marketing and positioning, email+password auth, OAuth SSO (GitHub / GitLab / Google), multi-tenant organizations with URL handles, user profiling and GTM attribution, GitHub App installation, org selection, per-repository enablement (announced but not yet shown), in-app support chat.

**Could not interpret:** none. Two minor ambiguities remain: (a) screenshot 1's login screen has no password field, so whether login is magic-link or a two-step password prompt is unresolved; (b) the right-pane file-chip constellation in 11–14 looks decorative, but because its caption tracks wizard state it may become a real repo/file visualization once a connection completes — later batches should confirm.


### 0 — Marketing homepage (hero)
- **Route guess:** `/` (greptile.com marketing site)
- **Screen type:** page (marketing landing)
- **Flow:** Signup/onboarding funnel, entry point. Leads into 1 (login) / 2 (signup).
- **Layout:** Full-bleed light page. Top bar (~80px) with logo far left, centered horizontal nav, right-aligned CTA pill pair. Hero occupies the upper-middle: left half holds headline + subcopy + CTA pair (headline starts ~x=85, two lines); right half is a large halftone/dithered lizard illustration bleeding off the right edge with a mint-green glow outline. Faint dotted/crosshair blueprint grid background. Bottom logo strip full width with a centered eyebrow line above 8 evenly-divided logo cells separated by vertical rules. The black `Greptile / curated by Mobbin` bar at the very bottom is a capture watermark, not app chrome (present on every screenshot in this batch).
- **Nav items visible:** `EXAMPLES`, `PRICING`, `FEATURES` (chevron), `ENTERPRISE`, `BLOG`, `RESOURCES` (chevron). None highlighted. Each has a small line icon to its left (image/screen, `$`, sparkle, bank/building, open book, bookmark/square).
- **All visible text:**
  - Top nav: `EXAMPLES` · `$ PRICING` · `FEATURES` · `ENTERPRISE` · `BLOG` · `RESOURCES` · `Contact Sales` · `Sign up`
  - Hero heading: `The AI Code Reviewer.`
  - Hero sub: `AI agents that review and test pull requests with full context of the codebase.`
  - Hero CTAs: `Contact Sales` · `Start now`
  - Logo strip eyebrow: `OVER 9,000+ TEAMS USE GREPTILE`
  - Logo wordmarks: `substack`, `klaviyo`, `Retool`, `NVIDIA.`, `Brex`, `scale`, `PostHog`, `Mintlify`
  - Capture watermark (not app): `Greptile` / `curated by` / `Mobbin`
- **Data entities:** Customer logos: substack, klaviyo, Retool, NVIDIA, Brex, Scale, PostHog, Mintlify. Metric: `9,000+` teams.
- **Controls:** Nav links (ghost, uppercase, letter-spaced); two dropdown nav triggers (FEATURES, RESOURCES); `Contact Sales` (dark charcoal, chamfered/notched-hexagon shape, secondary); `Sign up` (green, chamfered, primary) — the pair overlap into one conjoined shape; hero repeats the same pair as `Contact Sales` + `Start now`.
- **Table/list columns:** none.
- **State shown:** Default top-of-page; no active nav item.
- **Behavior implied:** Product is an AI code-review agent that reviews AND tests pull requests with whole-codebase context. Two funnels: self-serve (`Sign up` / `Start now`) and sales-led (`Contact Sales`), implying an Enterprise tier. `PRICING` + `ENTERPRISE` nav confirm tiering.
- **Notable visuals:** Dithered/halftone black-and-white lizard (gecko) photo-illustration with mint edge glow. Engineering-blueprint grid with `+` crosshair ticks. Chamfered-corner button geometry is a signature motif.

### 1 — Log in
- **Route guess:** `/login`
- **Screen type:** page (auth)
- **Flow:** Auth flow. Cross-links to 2 via `Sign up`.
- **Layout:** Two-pane split ~40/60. Left pane white with a vertically centered form column ~480px wide. Right pane is a solid periwinkle/indigo field carrying a full-height vertical band of overlapping guilloche/moiré line art in coral + white, with 5 stacked lighter-blue square tiles each containing a wireframe globe, plus small lime-yellow square accents. Two-line caption bottom-right of the art pane.
- **Nav items visible:** none (bare auth page, no app chrome).
- **All visible text:**
  - `Log into your account`
  - `Don't have an account? Sign up`
  - `ENTER WORK EMAIL`
  - placeholder: `me@example.com`
  - `Login  →`
  - `Sign in with GitHub`
  - `Sign in with GitLab`
  - `Sign in with Google`
  - Art pane: `The Greptile System`
- **Data entities:** none (empty form).
- **Controls:** Email text input (placeholder `me@example.com`); `Login →` (full-width green primary, square corners, trailing arrow); `Sign in with GitHub` (full-width light-grey secondary, octocat mark); `Sign in with GitLab` (grey secondary, orange fox mark); `Sign in with Google` (grey secondary, multicolor G); `Sign up` inline link (blue, underlined).
- **Table/list columns:** none.
- **State shown:** Empty email field showing placeholder; Login button appears enabled.
- **Behavior implied:** Email-first login with no password field on this screen (magic link or a password step-up). Three identity providers: GitHub, GitLab, Google. `WORK EMAIL` label implies a B2B work-domain expectation.
- **Notable visuals:** Guilloche/spirograph line art; wireframe-globe tiles; "The Greptile System" brand art panel.

### 2 — Create an account (empty)
- **Route guess:** `/signup`
- **Screen type:** page (auth)
- **Flow:** Signup flow step 1. Continues into 3 (filled) → 4 (onboarding).
- **Layout:** Same 40/60 split as 1; identical left-column geometry. Right art panel same periwinkle field with a different sphere arrangement (largest tile near the bottom, lime square accents on its four sides). Legal copy pinned near the bottom of the left pane, centered.
- **Nav items visible:** none.
- **All visible text:**
  - `Create an account`
  - `Already have an account? Login`
  - `ENTER WORK EMAIL` — placeholder `me@example.com`
  - `ENTER PASSWORD` (with an ⓘ info-circle icon)
  - password field showing masked dots
  - `Start for Free  →`
  - `Sign up with GitHub`
  - `Sign up with GitLab`
  - `Sign up with Google`
  - `By signing up, you agree to the Terms of Service and Privacy Policy.`
  - Art pane: `The Greptile System`
- **Data entities:** none.
- **Controls:** Email input; password input (masked); ⓘ info tooltip trigger beside `ENTER PASSWORD` (implies password-requirements tooltip); `Start for Free →` (green primary, full width); three grey secondary OAuth buttons; `Login` inline link (blue, underlined); `Terms of Service` and `Privacy Policy` underlined links.
- **Table/list columns:** none.
- **State shown:** Email empty (placeholder); password field contains masked characters.
- **Behavior implied:** A free self-serve tier exists (`Start for Free`). Password auth is supported alongside OAuth, with documented password rules behind the info icon.
- **Notable visuals:** Same brand art panel; masked-dot password rendering.

### 3 — Create an account (filled)
- **Route guess:** `/signup`
- **Screen type:** page (auth) — filled state of 2
- **Flow:** Signup flow step 1 completed. Continues into 4.
- **Layout:** Identical to 2; art panel spheres arranged differently again (largest tile lower-middle) — the panel art appears animated/randomized.
- **Nav items visible:** none.
- **All visible text:** Identical to 2, except the email field contains `alexsmith@content-mobbin.com` and the password shows a longer masked string.
- **Data entities:** User email `alexsmith@content-mobbin.com`; implied org domain `content-mobbin.com`; implied user `Alex Smith`.
- **Controls:** Same as 2.
- **State shown:** Both fields populated; form valid and ready to submit.
- **Behavior implied:** The work-email domain seeds the organization later — screenshot 6 pre-fills org name, handle, and website from `content-mobbin`.
- **Notable visuals:** Same.

### 4 — Onboarding: name (empty)
- **Route guess:** `/onboarding` (step 1 of 3)
- **Screen type:** onboarding-step
- **Flow:** Post-signup onboarding wizard step 1. Continues from 3, into 5.
- **Layout:** Full-page light-grey dotted background. A horizontal band of coral/magenta guilloche waveform art crosses the middle third of the viewport. A centered white card (~645px wide, ~280px tall) sits on that band with tiny lime-yellow square markers at its four corners (a selection-handle motif). Card content is centered. Bottom bar: `Logout` far left, a centered wide `Next` button (~585px), and a floating round dark support-chat bubble bottom-right.
- **Nav items visible:** none (wizard chrome only).
- **All visible text:**
  - `What's your name?`
  - `Let's start by setting up your profile.`
  - `FULL NAME` with a red asterisk `*` (required)
  - placeholder: `John Doe`
  - `Logout`
  - `Next  ⌘+↵  →`
- **Data entities:** none yet (placeholder only).
- **Controls:** Full-name text input (placeholder `John Doe`); `Next` button in DISABLED state (pale washed-out green fill, muted grey label) with the keyboard hint `⌘+↵`; `Logout` ghost text link; floating support-chat FAB (dark circle, speech-bubble icon).
- **Table/list columns:** none.
- **State shown:** Wizard step 1; required field empty; primary CTA disabled. No `Back` button on step 1.
- **Behavior implied:** Multi-step onboarding wizard with keyboard shortcuts (`⌘+↵` advances). Required-field validation gates `Next`. An in-app support chat widget is present throughout onboarding.
- **Notable visuals:** Guilloche waveform band; lime corner handles on the card; the disabled button is the same green at low opacity.

### 5 — Onboarding: name (filled)
- **Route guess:** `/onboarding` (step 1 of 3)
- **Screen type:** onboarding-step
- **Flow:** Same step as 4, now filled. Continues into 6.
- **Layout:** Identical to 4; the guilloche band's waveform phase differs, confirming the background animates.
- **Nav items visible:** none.
- **All visible text:** Identical to 4, except the input value is `Alex Smith` and `Next ⌘+↵ →` is fully saturated.
- **Data entities:** User full name `Alex Smith`.
- **Controls:** Same as 4; `Next` now ENABLED (solid green primary).
- **State shown:** Valid form; CTA enabled.
- **Behavior implied:** Live validation — the button enables as soon as the required field is non-empty.
- **Notable visuals:** Same.

### 6 — Onboarding: create organization
- **Route guess:** `/onboarding/organization` (step 2 of 3)
- **Screen type:** onboarding-step
- **Flow:** Onboarding wizard step 2. Continues from 5, into 7.
- **Layout:** Same dotted background; two large pink wireframe point-cloud spheres decorate top-right and bottom-left. Centered white card (~645px wide, ~665px tall) with lime corner handles. Fields stack full width. Bottom bar now carries TWO centered buttons: `Back` (white/outline, ~280px) and `Next` (green, ~280px). `Logout` far left; support FAB bottom-right.
- **Nav items visible:** none.
- **All visible text:**
  - `Create Your Organization`
  - `Set up your team's workspace in Greptile.`
  - `ORGANIZATION NAME *` — value `Content-mobbin`
  - `HANDLE *` — static prefix `greptile.com/` then input value `content-mobbin`
  - `COMPANY WEBSITE` — value `content-mobbin.com`
  - `COMPANY SIZE` — options `JUST ME`, `2-10`, `11-50`, `51-200`, `201-1000`, `1000+`
  - `Logout`
  - `Back  ⌘+⇧+↵`
  - `Next  ⌘+↵  →`
- **Data entities:** Org name `Content-mobbin`; handle/slug `content-mobbin`; org URL `greptile.com/content-mobbin`; company website `content-mobbin.com`; company size `JUST ME`.
- **Controls:** Three text inputs (org name; handle with an inline URL prefix affix; company website); a six-option segmented chip radio group laid out 3×2 for company size; `Back` (secondary white with border, shortcut `⌘+⇧+↵`); `Next` (green primary, `⌘+↵`); `Logout` link; support FAB.
- **Table/list columns:** none.
- **State shown:** `JUST ME` selected (pale mint fill); the other five unselected (white with grey border). Org name/handle/website appear auto-derived from the signup email domain.
- **Behavior implied:** Multi-tenant organizations addressed by handle at `greptile.com/<handle>`. Company size is captured for segmentation. The handle is editable and namespaced. Back-navigation has its own shortcut.
- **Notable visuals:** Pink low-poly sphere / point-cloud illustrations; inline prefix affix on the handle input; selected chip uses a light mint fill.

### 7 — Onboarding: intent survey (empty)
- **Route guess:** `/onboarding/survey` (step 3 of 3)
- **Screen type:** onboarding-step
- **Flow:** Onboarding wizard step 3. Continues from 6, into 8 (checked) → 9 (dropdown open).
- **Layout:** Same dotted background and the same two pink point-cloud spheres (top-right, bottom-left). Centered white card ~645px wide, ~725px tall, lime corner handles. Inside: heading, subhead, a monospace uppercase group label, six full-width checkbox rows (each its own bordered row ~58px tall), a divider gap, a second monospace label, then a select. Bottom bar: `Logout`, centered `Back` + `Next` pair, support FAB.
- **Nav items visible:** none.
- **All visible text:**
  - `What brought you to Greptile?`
  - `Help us understand your needs so we can serve you better.`
  - `DESCRIBE THE CHALLENGES YOU'RE FACING`
  - `Slow PR reviews`
  - `Previous AI tools didn't work well`
  - `Too many bugs`
  - `Improve code quality`
  - `Team scaling`
  - `Other`
  - `HOW DID YOU HEAR ABOUT US?`
  - select placeholder: `Select a source`
  - `Logout` · `Back  ⌘+⇧+↵` · `Next  ⌘+↵  →`
- **Data entities:** none selected.
- **Controls:** Six square checkboxes, unchecked, left-aligned inside bordered full-width rows (the whole row reads as the hit target); one select/combobox showing `Select a source` with a stacked up/down chevron affordance at the right; `Back` secondary; `Next` green primary (enabled with nothing selected, so this step is optional); `Logout`; support FAB.
- **Table/list columns:** none.
- **State shown:** All checkboxes unchecked; select unset showing placeholder.
- **Behavior implied:** A multi-select intent survey (checkboxes, not radios) plus a single-select attribution source. The copy reveals the product's pain framing: slow PR reviews, failed prior AI tools, bug volume, code quality, team scaling.
- **Notable visuals:** Monospace uppercase field labels (a recurring pattern); bordered-row checkbox pattern.

### 8 — Onboarding: intent survey (one checked)
- **Route guess:** `/onboarding/survey`
- **Screen type:** onboarding-step
- **Flow:** Same step as 7 with a selection made. Continues into 9.
- **Layout:** Identical to 7.
- **Nav items visible:** none.
- **All visible text:** Identical to 7.
- **Data entities:** Selected challenge `Improve code quality`.
- **Controls:** Same as 7.
- **State shown:** `Improve code quality` CHECKED — a filled near-black square with a white checkmark. All other rows unchecked. Select still shows `Select a source`. The row border and background do not change on check; only the box fills.
- **Behavior implied:** The checked state uses a solid dark fill rather than the brand green, so dark is the selected-control color for checkboxes.
- **Notable visuals:** Same.

### 9 — Onboarding: source select open
- **Route guess:** `/onboarding/survey`
- **Screen type:** dropdown-open
- **Flow:** Same step as 7–8, with the `HOW DID YOU HEAR ABOUT US?` select expanded.
- **Layout:** Identical card, but the listbox renders UPWARD and overlays the six checkbox rows entirely — the menu spans from just under the `DESCRIBE THE CHALLENGES YOU'RE FACING` label down to just above the trigger. White bordered panel, 9 options at ~46px row height, left-aligned labels.
- **Nav items visible:** none.
- **All visible text:**
  - `What brought you to Greptile?` / `Help us understand your needs so we can serve you better.` / `DESCRIBE THE CHALLENGES YOU'RE FACING`
  - Options: `Friend or Colleague`, `Google`, `HackerNews`, `LinkedIn`, `Open Source Repository`, `Reddit`, `Theo`, `X (Twitter)`, `Other`
  - Trigger: `Select a source`
  - `Logout` · `Back  ⌘+⇧+↵` · `Next  ⌘+↵  →`
- **Data entities:** Attribution-source option list (9 values, alphabetical with `Other` last). `Theo` is a named developer-influencer channel.
- **Controls:** Open listbox; `Friend or Colleague` is hover/highlighted with a light grey row fill. The trigger stays visible below the menu.
- **Table/list columns:** none.
- **State shown:** Menu open; first option highlighted; nothing committed.
- **Behavior implied:** Attribution tracking covers developer-influencer channels (Theo), HackerNews, and open-source repos — a dev-tool GTM signal.
- **Notable visuals:** Upward-opening select menu; grey hover row.

### 10 — Onboarding: intent survey (source chosen)
- **Route guess:** `/onboarding/survey`
- **Screen type:** onboarding-step
- **Flow:** Onboarding step 3 fully answered. Continues from 9, into 11 (code provider connection).
- **Layout:** Identical to 7/8; the pink point-cloud spheres have shifted slightly, confirming the decoration animates or randomizes per render.
- **Nav items visible:** none.
- **All visible text:** Identical to 7, except the select now reads `LinkedIn` instead of `Select a source`.
- **Data entities:** Challenge selected `Improve code quality`. Attribution source `LinkedIn`.
- **Controls:** Same as 7/8; the select now shows a committed value in full-strength text (the placeholder was grey).
- **State shown:** One checkbox checked (`Improve code quality`, dark fill with white check); select committed to `LinkedIn`; `Next` enabled.
- **Behavior implied:** The menu closes on selection and the trigger displays the chosen label; committed values render darker than placeholders.
- **Notable visuals:** Same.

### 11 — Connect code provider (nothing selected)
- **Route guess:** `/onboarding/connect` or `/onboarding/provider`
- **Screen type:** onboarding-step (empty-state / awaiting connection)
- **Flow:** Repository-connection flow step 1. Continues from 10, into 12 (provider chosen) → 13/14 (org selection).
- **Layout:** A NEW two-pane layout replaces the centered-card wizard. Left pane ~49% (0–935px): heading at top-left (~x=82, y=78) with an inline dropdown control sitting on the same baseline as the heading's last words; subcopy directly beneath; the rest of the pane is empty. A hairline vertical divider with a diagonal-hatch gutter (~25px) separates the panes. Right pane ~51%: a dotted grid canvas holding a loose scattered constellation of ~60 small rounded-square file-type chips in green, blue, yellow, and pink, irregularly sized (~8–34px) and clustered toward the center. A monospace status line sits under the constellation, roughly centered in the right pane. Bottom bar unchanged: `Logout`, centered `Back` + `Next`, support FAB.
- **Nav items visible:** none.
- **All visible text:**
  - `Let's start by connecting your` + inline select showing `Code Provider`
  - `Link your GitHub or GitLab to get started with Greptile.`
  - Right pane status: `AWAITING CODE PROVIDER CONNECTION`
  - `Logout` · `Back  ⌘+⇧+↵` · `Next  ⌘+↵  →`
- **Data entities:** none yet.
- **Controls:** Inline select embedded in the sentence, labeled `Code Provider`, with a stacked up/down chevron (white pill, border, subtle shadow); `Back` (secondary, enabled); `Next` (DISABLED — pale green, muted label); `Logout`; support FAB.
- **Table/list columns:** none.
- **State shown:** No provider selected; `Next` disabled; right pane idle in an "awaiting" state.
- **Behavior implied:** Repo connection is a required onboarding gate. Only GitHub and GitLab are supported code providers. The right pane is a live status canvas whose caption tracks connection progress (it changes across 11→13).
- **Notable visuals:** Sentence-embedded select control (the heading doubles as a form). File-type chip constellation whose chips carry tiny glyphs suggesting language and file icons — braces `{ }`, database, image, audio, `DOC`, cube/package, fingerprint, repo. Diagonal-hatch gutter between panes. Monospace all-caps status text with wide letter-spacing.

### 12 — Connect code provider (GitHub chosen)
- **Route guess:** `/onboarding/connect`
- **Screen type:** onboarding-step
- **Flow:** Repository connection with a provider selected. Continues from 11, into 13.
- **Layout:** Same two-pane layout as 11, plus a light-grey rounded card (~772px wide, ~250px tall) below the subcopy in the left pane containing a three-item vertical stepper. Step rows are ~76px apart; each has a small dark rounded-square icon at the left joined by a thin vertical connector rule, and the first row carries a right-aligned button.
- **Nav items visible:** none.
- **All visible text:**
  - `Let's start by connecting your` + inline select showing the GitHub octocat mark and `Github`
  - `Link your GitHub or GitLab to get started with Greptile.`
  - `1. Connect GitHub` — `Connect`
  - `2. Select Org`
  - `3. Enable Repositories`
  - Right pane: `AWAITING CODE PROVIDER CONNECTION`
  - `Logout` · `Back  ⌘+⇧+↵` · `Next  ⌘+↵  →`
- **Data entities:** Provider `Github` — cased exactly that way in the select, while body copy uses `GitHub`.
- **Controls:** Inline provider select (now octocat mark + `Github`, with a green-tinted border indicating a valid selection); `Connect` (dark near-black solid button, primary-on-card variant); `Back` secondary; `Next` still DISABLED (pale green); `Logout`; support FAB.
- **Table/list columns:** Three-step stepper — step number + label, with an action slot at the right of the active step. Step icons: GitHub octocat (1), building/bank (2), repo-fork glyph (3).
- **State shown:** Step 1 active with its `Connect` action exposed; steps 2 and 3 inert (grey icons, no actions); `Next` disabled until the connection completes.
- **Behavior implied:** GitHub connection is a three-stage process — app install/OAuth, then org choice, then per-repository enablement. Repositories are opt-in individually, not all-or-nothing.
- **Notable visuals:** Vertical stepper with connector rule; provider select gains a green border once valid; same file-chip constellation.

### 13 — Select GitHub org (none selected)
- **Route guess:** `/onboarding/connect` (stepper step 2)
- **Screen type:** onboarding-step
- **Flow:** Repository connection step 2. Continues from 12, into 14.
- **Layout:** Same two-pane split; the left heading changes. The stepper card grows (~772px × ~460px) because step 2 expands into an inline sub-panel: a white bordered box (~675px wide) nested under `2. Select Org` with a grey header strip and one org row, then helper text and a link below the box but still inside the expanded region. Step 3 sits below that region.
- **Nav items visible:** none.
- **All visible text:**
  - `Choose which org you'd like to configure.`
  - `1. Connected to GitHub`
  - `2. Select Org`
  - `Organizations linked to your account`
  - `samleemobbin-dot`
  - `Don't see your organization?`
  - `Install Greptile on more GitHub organizations →`
  - `3. Enable Repositories`
  - Right pane: `AWAITING ORGANIZATION SELECTION`
  - `Logout` · `Back  ⌘+⇧+↵` · `Next  ⌘+↵  →`
- **Data entities:** GitHub organization `samleemobbin-dot` (the single org linked to the account).
- **Controls:** Radio button (empty outlined circle) at the RIGHT end of the org row, not leading; the whole row reads as clickable. `Install Greptile on more GitHub organizations →` green text link with trailing arrow; `Back` secondary; `Next` DISABLED (pale green); `Logout`; support FAB.
- **Table/list columns:** Org list with a single implicit column under the grey header strip `Organizations linked to your account`; each row is building icon + org handle (left) + radio (right).
- **State shown:** Step 1 complete — its icon is a dark filled circle-check and the label past-tenses to `Connected to GitHub`. Step 2 active and expanded. Step 3 still inert. No org selected, so `Next` is disabled. Right-pane status advanced to `AWAITING ORGANIZATION SELECTION`.
- **Behavior implied:** Greptile installs as a GitHub App per organization, and users can install it on additional orgs from here (a deep link into GitHub's app-install flow). Exactly one org is configured at a time (radio, not checkbox). Step labels change tense on completion.
- **Notable visuals:** Circle-check completion icon; expanded stepper sub-panel; brand-green link color for the secondary install action.

### 14 — Select GitHub org (org selected)
- **Route guess:** `/onboarding/connect` (stepper step 2)
- **Screen type:** onboarding-step
- **Flow:** Repository connection step 2 satisfied. Continues into screenshot 15 (step 3, Enable Repositories — outside this batch).
- **Layout:** Identical to 13; only selection and button states differ. The right-pane constellation has re-scattered slightly, confirming it animates.
- **Nav items visible:** none.
- **All visible text:** Identical to 13.
- **Data entities:** Selected GitHub org `samleemobbin-dot`.
- **Controls:** Same as 13. `Next` is now ENABLED (solid green, `⌘+↵ →`).
- **State shown:** Org row SELECTED — the row gains a light grey tint and the radio becomes a filled dark ring with a dot. `Next` enabled. The right pane still reads `AWAITING ORGANIZATION SELECTION`, so that status text updates only once the step is committed, not on mere selection.
- **Behavior implied:** Selecting the org unblocks the wizard; actual repo enablement happens on the following step.
- **Notable visuals:** Filled radio (dark ring + dot) and a subtle row tint as the selected-row treatment.

## Design tokens observed

**Mode:** Light only across all 15 screenshots. No dark-mode variant appears.

- **Colors**
  - Page background (app/onboarding): `#EFEFED`–`#F0F0EE` warm light grey, overlaid with a fine dotted grid in ~`#D8D8D4`
  - Surface / card: `#FFFFFF`
  - Secondary surface / inset panel (stepper card, list header strip, OAuth buttons, hover row): `#F5F5F3`–`#E8E8E6`
  - Border: `#E2E2DE`–`#D6D6D2` hairline, 1px
  - Primary text: `#111111`–`#1A1A1A` near-black; the marketing headline is a desaturated navy-charcoal ~`#3A3A52`
  - Secondary / muted text: `#6B6B6B`–`#8A8A8A`; monospace labels ~`#7A7A7A`
  - Accent / brand green (primary CTA): `#26E08A`–`#2EE59D` mint; the disabled variant is the same hue at ~25% (`#BFEFD6`)
  - Dark action (secondary CTA, checkbox fill, `Connect` button, stepper icons): `#1E1E1E`–`#2B2B2B`
  - Link blue (auth pages): approximately `#3B5BDB`, underlined
  - Green link (in-app text link): brand mint, darkened for contrast
  - Required-field asterisk: coral red `#F0524D`
  - Brand art palette (non-semantic): periwinkle `#5A5AF0`, cornflower tile `#6E9CF5`, coral/magenta guilloche `#F06A50` / `#F075C0`, lime accent `#DFF25C`, pink point-cloud `#F09FE8`
  - Selected-chip fill (company size): pale mint `#D6F5E4`
  - No full success/warning/error semantic set is exercised in this batch beyond the required-asterisk red.
- **Typography**
  - Display / headings: a geometric grotesque with a distinctive single-story `a` and tight apertures (reads like Gilroy, Cabinet Grotesk, or Poppins), weight ~700. Marketing H1 ~110px; wizard card H1 ~34px; connect-screen page H1 ~32px.
  - Body / UI: humanist sans (Inter-like) — 16px regular body, 15px controls, 14px helper text, 13px legal.
  - Field labels and status text: MONOSPACE, uppercase, letter-spaced ~0.08em, 12–13px, muted grey (`ENTER WORK EMAIL`, `FULL NAME`, `COMPANY SIZE`, `DESCRIBE THE CHALLENGES YOU'RE FACING`, `AWAITING CODE PROVIDER CONNECTION`). This is the strongest signature of the design system.
  - Marketing nav: uppercase, letter-spaced, ~13px.
  - Keyboard hints (`⌘+↵`, `⌘+⇧+↵`) render inline in button labels at ~85% size and reduced opacity.
- **Spacing & shape**
  - Radius: inputs and buttons ~4–6px (nearly square); onboarding cards ~2–4px (effectively square-cornered); the inline provider select and small chips ~8px; file-type chips ~4–6px; radios and avatars fully round.
  - Marketing buttons are the exception — chamfered/notched hexagonal ends rather than rounded.
  - Padding scale: 8 / 12 / 16 / 24 / 32 / 48px. Card interior padding ~40px. Field height ~44px; bordered checkbox rows ~58px; wizard bottom bar ~64px tall.
  - Border widths: 1px throughout; the active provider select uses a 1px green border.
  - Shadows: almost none — cards rely on borders. Only the onboarding cards carry a very soft tight drop shadow, and the support FAB a stronger one.
  - Signature detail: 6×6px lime-yellow squares at the four corners of onboarding cards, a design-tool selection-handle motif.
- **Iconography**
  - Line icons, ~1.5px stroke, rounded caps and joins — consistent with Lucide/Feather. Seen: building/bank (org), repo-fork, image/screen, open book, bookmark, sparkle, arrow-right, stacked up/down chevron on selects.
  - Brand marks used as-is: GitHub octocat (monochrome), GitLab fox (orange), Google G (multicolor).
  - Solid/filled treatment appears only for state — dark filled checkbox with white check, dark filled circle-check for a completed step, filled radio ring with dot.
- **Components recurring in this batch**
  - Split auth layout (form column + full-bleed brand art panel)
  - Centered wizard card with lime corner handles plus a fixed bottom action bar (`Logout` / `Back` / `Next`)
  - Sentence-embedded inline select (heading doubles as a control)
  - Vertical numbered stepper with connector rule, per-step action slot, and an expandable inline sub-panel
  - Bordered-row checkbox list (the row is the hit target)
  - Segmented chip radio group (company size)
  - Input with a static text prefix affix (`greptile.com/`)
  - Select/listbox that opens upward and overlays content
  - Radio list with right-aligned radios under a grey header strip
  - Disabled-primary-button pattern (brand green at low opacity)
  - Keyboard-shortcut hints inline in button labels
  - Right-hand status canvas with a monospace all-caps status line (`AWAITING …`)
  - Floating support-chat FAB, bottom-right, persistent across every onboarding screen
  - Marketing: top nav with dropdown triggers, chamfered dual-CTA pill pair, logo-wall social-proof strip

