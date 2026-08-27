# Batch 08 — screenshots 105–119

## Batch summary

**Distinct screens/pages**
1. Organization Settings › People (member table + Invite people popover) — 105–110
2. Organization Settings › Billing & Usage with Stripe "Add Payment Method" modal — 111–114
3. Organization Settings › API Keys (empty, create modal, key reveal, populated table) — 115–119

**Distinct flows**
- Invite a teammate (105–110): copy-link confirm → type email → role dropdown → pick Admin → invite Sent → new Pending row in table.
- Add a payment method (111–114): Stripe modal opens → invalid card number error → valid VISA accepted → card declined error.
- Create an API key (115–119): empty create modal → name typed → key revealed with one-time warning → key row in table → Copy confirmation.

**Feature areas:** org member management + RBAC (Member/Admin), invitation links, Stripe billing/trial, programmatic API access keys.

**Could not fully interpret:** in 105–109 the Invite popover overlaps the ROLE/ACTIONS columns, so those cells are partly occluded. In 111 the underlying Billing page is dimmed behind the modal and only partially legible.

---

### 105 — Organization Settings › People, Invite popover ("Copied")
- **Route guess:** `/settings/organization/people`
- **Screen type:** settings-tab with dropdown/popover open
- **Flow:** Invite a teammate, step 1. Continues into 106.
- **Layout:** Full-width green trial banner (top, ~60px). Below it a white app header bar (~62px) with org switcher left, icon cluster right. Below that a horizontal primary nav row with an underlined active item. Main content starts at x≈200: page title block, then a two-column body — left settings rail (~285px wide, x≈200–482) and main region (x≈523–1720). Popover anchored under the "Invite people" button, overlapping the table's right side. Large empty white area below. Dark footer strip with Greptile / "curated by Mobbin" branding (Mobbin watermark, not product UI).
- **Nav items visible:** Analytics, Repositories, Code Review Settings, Custom Context, Pull Requests, Code Providers, Integrations, **Organization Settings** (active, underlined black).
- **All visible text:**
  - Banner: "13 days left in your free trial!" · "+ Add Payment Method"
  - Header: "asmobbin" · "Admin"
  - Page: "People" / "Manage members, roles, and invitations."
  - Left rail: "Organization", "People" (active), "Billing & Usage", "API Keys"
  - Toolbar: placeholder "Search by email" · "All roles" · "+ Invite people"
  - Table headers: "EMAIL", "ROLE"
  - Rows: "samlee@content-mobbin.com" "Pending" "Member"; "alexsmith@content-mobbin.com" "You" "Admin"
  - Popover: "Invite people" · "Copied" (with check icon) · placeholder "Email address" · "Member" · "Invite"
- **Data entities:** org `asmobbin`; current user `alexsmith@content-mobbin.com` (Admin, You); `samlee@content-mobbin.com` (Member, Pending); trial 13 days remaining.
- **Controls:** Add Payment Method (secondary/white on green); org switcher with up/down chevron; icon buttons — book/docs, gift, avatar; nav tabs; left rail nav links; search input (magnifier icon); "All roles" select (chevron up/down); "+ Invite people" (primary, black); popover email input; role select "Member"; "Invite" button (disabled/greyed); "Copied" confirmation replacing the copy-link action.
- **Table/list columns:** EMAIL | ROLE | (ACTIONS, occluded). Row shape: circular initial avatar (S / A) + email + status pill, then role text, then "…" overflow menu.
- **State shown:** People tab active; Invite popover open; copy-link just clicked showing "Copied"; email field empty so Invite is disabled; role defaults to Member.
- **Behavior implied:** Members are invited by email or by a shareable member link; invitations sit in a Pending state; two roles exist (Member, Admin); free trial is time-boxed and prompts for a card.
- **Notable visuals:** monospace-ish uppercase small-caps table headers; grey status pills; green trial banner; floating round green chat/support bubble bottom-right.

### 106 — People › Invite popover with email typed
- **Route guess:** `/settings/organization/people`
- **Screen type:** settings-tab with popover open
- **Flow:** Invite a teammate, step 2 (from 105, into 107).
- **Layout:** Identical to 105.
- **Nav items visible:** same; Organization Settings active.
- **All visible text:** Same as 105 except popover right action now reads "Copy member link" (link/chain icon) and the input contains "alexsmith.mobbin+1@gmail.com"; button "Invite" now enabled.
- **Data entities:** invitee email `alexsmith.mobbin+1@gmail.com`.
- **Controls:** "Copy member link" (ghost link + icon); email input (filled); role select "Member"; "Invite" (secondary, now active).
- **State shown:** valid email entered → Invite enabled; "Copied" state from 105 has reverted to "Copy member link".
- **Behavior implied:** the invite button is gated on a non-empty email; the copied confirmation is transient.

### 107 — People › Invite role select open
- **Route guess:** `/settings/organization/people`
- **Screen type:** dropdown-open (select menu inside popover)
- **Flow:** Invite a teammate, step 3 (from 106, into 108).
- **Layout:** Same as 106 plus a small dropdown menu (~150px wide) below the role select, overlapping the table.
- **All visible text:** as 106, plus menu options "Member" (with trailing check mark, highlighted) and "Admin".
- **Controls:** role select expanded; options Member (selected) / Admin.
- **State shown:** Member is the current selection (checkmark, highlighted row).
- **Behavior implied:** exactly two assignable roles at invite time.

### 108 — People › Invite with role = Admin
- **Route guess:** `/settings/organization/people`
- **Screen type:** settings-tab with popover open
- **Flow:** Invite a teammate, step 4 (from 107, into 109).
- **All visible text:** as 106 but role select now reads "Admin"; email still "alexsmith.mobbin+1@gmail.com"; "Invite" enabled.
- **State shown:** role changed to Admin; dropdown closed.

### 109 — People › Invite sent ("Sent")
- **Route guess:** `/settings/organization/people`
- **Screen type:** settings-tab, success state in popover
- **Flow:** Invite a teammate, step 5 (from 108, into 110).
- **Layout:** Table now has three rows; popover still open above it.
- **All visible text:** Popover: "Invite people" · "Copy member link" · placeholder "Email address" · "Admin" · "✓ Sent" (greyed). Table rows: "samlee@content-mobbin.com" "Pending" "Member"; "alexsmith.mobbin+1@gmail.com" "Pending" "Admin"; "alexsmith@content-mobbin.com" "You" "Admin".
- **Data entities:** new member record `alexsmith.mobbin+1@gmail.com` — role Admin, status Pending.
- **Controls:** Invite button replaced by disabled "Sent" with a check; email input cleared back to placeholder; role select retains "Admin"; "…" overflow on the new row.
- **State shown:** submission succeeded; form reset except role; button shows transient success and is disabled.
- **Behavior implied:** invites are added to the list optimistically as Pending; the form stays open for consecutive invites.

### 110 — People table (popover dismissed)
- **Route guess:** `/settings/organization/people`
- **Screen type:** page / settings-tab (resting state)
- **Flow:** end of invite flow (from 109).
- **Layout:** Same shell; the full three-column table is now unobstructed.
- **All visible text:** as before plus full table header row "EMAIL" | "ROLE" | "ACTIONS", and all three rows fully visible.
- **Table/list columns:** EMAIL (avatar initial + email + pill) | ROLE (plain text) | ACTIONS ("…" icon button, absent on the "You" row).
- **State shown:** no row selected; self row has no actions menu (cannot act on yourself).
- **Behavior implied:** admins can manage other members' rows via an overflow menu; self-management is disallowed.

### 111 — Billing & Usage › Add Payment Method modal (empty)
- **Route guess:** `/settings/organization/billing`
- **Screen type:** modal (Stripe payment element) over a dimmed Billing page
- **Flow:** Add a payment method, step 1. Into 112.
- **Layout:** Centered modal ~650px wide with header bar (title + close X), scrollable body. Behind it, dimmed: Billing page with left rail ("Billing & Usage" highlighted), a "Billing & U…" card, an "INVO…" section, a "Payment De…" section with a "NAME" table header and empty state, "+ Add Payment Method" button top-right of that card, and "Past Invoices" heading below.
- **All visible text:**
  - Banner: "12 days left in your free trial!" · "+ Add Payment Method"
  - Behind modal: "Billing" / "Manage your subscription, payment methods, and inv…" · rail "Organization", "People", "Billing & Usage", "API Keys" · "Billing & U…" · "Manage your …" · "INVO…" · "Payment De…" · "NAME" · "No payment methods" · "+ Add Payment Method" · "Past Invoices"
  - Modal: "Add Payment Method" · payment method tiles "Card", "Google Pay", "Bank", "iDEAL | Wero", plus a chevron "more" tile · "Secure, fast checkout with Link" (padlock icon + chevron) · field labels "Card number", "Expiration date", "Security code", "Country" with value "Singapore" · "By providing your card information, you allow GREPTILE to charge your card for future payments in accordance with their terms." · "Save Payment Method"
- **Data entities:** trial now 12 days left; country default Singapore; brand name rendered as "GREPTILE".
- **Controls:** close X; four method tiles (Card selected, blue border) + overflow chevron tile; Link expander; card number / expiry / CVC inputs; Country select; "Save Payment Method" (primary, disabled/greyed while empty).
- **State shown:** Card tab selected; all fields empty; submit disabled; Billing page shows "No payment methods" empty state.
- **Behavior implied:** billing is Stripe-hosted with Card, Google Pay, Bank, iDEAL and Wero; Link is offered for fast checkout; trial converts to a paid subscription once a card is on file; invoices are listed historically.
- **Notable visuals:** VISA / Mastercard / JCB / Discover brand marks inside the card-number field; CVC "123" card glyph; green padlock.

### 112 — Add Payment Method — invalid card number
- **Route guess:** `/settings/organization/billing`
- **Screen type:** modal, form validation error
- **Flow:** Add a payment method, step 2 (from 111, into 113).
- **Layout:** Modal scrolled down; method tiles clipped at top; an "Optional" Link sign-up block now revealed below the consent copy.
- **All visible text:** "Add Payment Method" · "Secure, fast checkout with Link" · "Card number" with value "4098 7664 6487 6876" (red text) · error "Your card number is invalid." · "Expiration (MM/YY)" "04 / 28" · "Security code" "999" · "Country" "Singapore" · consent paragraph as 111 · "Optional" badge · "Save my information for faster checkout" · fields "Email", "Mobile number", "Full name" · "link • By providing phone number and email, you agree to create an account subject to Terms and Privacy Policy." · "Save Payment Method"
- **Data entities:** card 4098 7664 6487 6876; expiry 04 / 28; CVC 999.
- **Controls:** same as 111 plus Email / Mobile number / Full name inputs; Terms and Privacy Policy links (underlined); Save Payment Method still greyed.
- **State shown:** card field focused with red border, red value text and a red card-error icon; inline error under the field; submit disabled.
- **Behavior implied:** client-side Luhn validation before submit; the expiry label changes to "Expiration (MM/YY)" once focused.

### 113 — Add Payment Method — valid card accepted
- **Route guess:** `/settings/organization/billing`
- **Screen type:** modal, valid form
- **Flow:** Add a payment method, step 3 (from 112, into 114).
- **All visible text:** same as 112 minus the error line; card number value is masked/redacted in the capture; everything else identical ("04 / 28", "999", "Singapore", Optional Link block, "Save Payment Method").
- **Controls:** "Save Payment Method" now enabled (white with border, dark text).
- **State shown:** card field has blue focus border and a VISA brand badge; no error; submit enabled.
- **Notable visuals:** VISA logo swaps in place of the four-brand strip once the network is detected.

### 114 — Add Payment Method — card declined
- **Route guess:** `/settings/organization/billing`
- **Screen type:** modal, server-side error
- **Flow:** Add a payment method, step 4 (from 113).
- **All visible text:** identical to 113 plus error "Your card was declined." under the card field.
- **State shown:** card field bordered red with a red card-error icon; the rest of the form retains its values; "Save Payment Method" appears greyed again at the bottom.
- **Behavior implied:** decline errors from the processor surface inline on the card field rather than as a toast, and the form keeps state for a retry.

### 115 — API Keys › Create API Key modal (empty)
- **Route guess:** `/settings/organization/api-keys`
- **Screen type:** modal over an empty-state settings tab
- **Flow:** Create an API key, step 1. Into 116.
- **Layout:** Same shell. Left rail with "API Keys" highlighted. Main region: search input full width, "+ Create API Key" button right, then a table header row and an empty body. Centered modal ~650px wide, three stacked sections (header / body / footer).
- **Nav items visible:** same top nav, Organization Settings active.
- **All visible text:** "API Keys" / "Create and manage API keys for programmatic access." · rail: "Organization", "People", "Billing & Usage", "API Keys" (active) · placeholder "Search by name…" · "+ Create API Key" · table headers "NAME" (with sort chevrons), "ID", "CREATED" (with a down arrow) · modal: "Create API Key", "Name", "Create"
- **Controls:** search input; "+ Create API Key" (primary black); modal close X; Name text input (empty); "Create" button (secondary, right-aligned in footer).
- **State shown:** API Keys tab active; table empty; CREATED column sorted descending.
- **Behavior implied:** API keys are org-scoped, named, searchable, and sortable by name/created.

### 116 — Create API Key modal with name filled
- **Route guess:** `/settings/organization/api-keys`
- **Screen type:** modal
- **Flow:** Create an API key, step 2 (from 115, into 117).
- **All visible text:** as 115; Name input contains "asmobbin".
- **Data entities:** key name `asmobbin`.
- **State shown:** name entered; "Create" ready.

### 117 — API Key created — one-time reveal
- **Route guess:** `/settings/organization/api-keys`
- **Screen type:** modal, success/reveal state
- **Flow:** Create an API key, step 3 (from 116, into 118/119).
- **Layout:** Modal shifted up slightly; body now shows a read-only key field and help text; footer is a single full-width button. Behind it, a new table row is visible ("asmobbin", "…").
- **All visible text:** "Create API Key" · "API Key" · "2g9MoYTevjObOkkmyEs+loz+19PX9NoyKIcm2KbGTclKBL8C" · "Copy this key now — it won't be shown again." · "Copy API Key" (clipboard icon)
- **Data entities:** API key secret `2g9MoYTevjObOkkmyEs+loz+19PX9NoyKIcm2KbGTclKBL8C`; row name `asmobbin`.
- **Controls:** close X; read-only key field; "Copy API Key" full-width secondary button.
- **Behavior implied:** the secret is shown exactly once and stored hashed; the list only keeps a truncated id.

### 118 — API Keys table populated
- **Route guess:** `/settings/organization/api-keys`
- **Screen type:** settings-tab (resting state)
- **Flow:** after key creation (from 117/119).
- **Layout:** Full-width toolbar (search + Create) then a four-column table with one row.
- **All visible text:** headers "NAME", "ID", "CREATED"; row "asmobbin" | "2g9MoYTevjObOkkm…" | "May 20, 2026" | "…"
- **Data entities:** key `asmobbin`, id prefix `2g9MoYTevjObOkkm…`, created May 20, 2026.
- **Table/list columns:** NAME (sortable) | ID (truncated with ellipsis) | CREATED (sorted desc) | actions ("…").
- **State shown:** trial banner back to full green ("12 days left in your free trial!").
- **Behavior implied:** keys can be revoked/renamed from the row overflow menu; only a truncated id persists.

### 119 — Create API Key modal — "Copied!" confirmation
- **Route guess:** `/settings/organization/api-keys`
- **Screen type:** modal, transient confirmation
- **Flow:** Create an API key, final step (from 117).
- **All visible text:** identical to 117 except the footer button reads "Copied!" with the clipboard icon, on a grey/filled background.
- **State shown:** copy action fired; button in confirmed/disabled style.
- **Behavior implied:** clipboard copy with an inline transient confirmation, same pattern as the "Copied" state on the invite popover (105).

---

## Design tokens observed

**Mode:** light only across all 15 screenshots.

**Colors**
- Page background: `#F7F7F6` / near-white warm grey
- Surface/card, modal, table body: `#FFFFFF`
- Table header fill: `#F4F4F3`
- Border/divider: `#E6E6E4` (1px hairlines)
- Primary text: `#111111`–`#1A1A1A`
- Secondary/muted text: `#6B6B6B` (page subtitles, placeholders, column headers)
- Accent/brand green: `#22DD8E`–`#2EE59D` (trial banner, logo mark, chat bubble); dimmed banner behind modals ≈ `#D6F7E6`
- Primary button: near-black `#1A1A1A` with white label
- Error/destructive: `#DF1B41`-style red (invalid/declined text, red field borders and card icons)
- Info/focus: Stripe blue `#0570DE` (selected Card tile, focused input ring, "Secure, fast checkout with Link")
- Neutral pill/badge: `#EDEDEB` background with dark text ("Pending", "You", "Admin", "Optional")
- Footer band: `#2A2A2A` dark charcoal (Mobbin watermark, not product chrome)

**Typography**
- Sans-serif geometric/grotesque throughout (Greptile wordmark and headings share it); Stripe modal uses its own default sans.
- h1 page title ~32px semibold ("People", "Billing", "API Keys")
- Page subtitle ~15px regular muted
- Nav tabs ~16px regular, active in near-black
- Modal title ~20px semibold
- Body/table cell ~15px regular
- Table column headers ~12px uppercase, letter-spaced, muted — a monospace-flavoured small-caps treatment
- Key/secret value rendered at body size, not monospace

**Spacing & shape**
- Border radius: ~8px on inputs, buttons and pills (pills ~4–6px); ~10–12px on modals and Stripe tiles; table container ~8px with square inner cell dividers
- 1px borders; focused/error inputs use a 2px colored border
- Padding scale reads as 8 / 12 / 16 / 24 / 32px; page gutter x≈200px; rail-to-content gap ~40px
- Shadow: soft, low-opacity drop shadow on modals and the invite popover; no shadow on cards or tables
- Dimmed page behind modals via a white-ish overlay (content fades rather than darkens)

**Iconography**
- Line icons, ~1.5px stroke, rounded caps — consistent with Lucide
- Seen: magnifier, plus, chevron up/down (select), chevron down, link/chain, check, clipboard, X close, horizontal ellipsis (…), book/docs, gift, arrow-down (sort), sort chevrons
- Brand marks: VISA, Mastercard, JCB, Discover, Google Pay, Wero, Stripe Link

**Components**
- Full-bleed promo/trial banner with inline CTA
- App header with org switcher (name + role pill + chevron) and icon cluster + avatar
- Horizontal tab bar with underline active indicator
- Settings two-pane layout: vertical left rail with left-border active indicator + grey fill
- Toolbar row: search input + filter select + primary action button
- Data table with uppercase small-caps headers, sortable columns, avatar+text+pill composite cells, row overflow menu
- Status pills / badges (Pending, You, Optional)
- Anchored popover form (invite) with header action link
- Centered modal with header/body/footer sections
- Inline form validation (red border + icon + message under field)
- Transient confirmation buttons ("Copied", "Sent", "Copied!") that swap label, add a check/clipboard icon and disable
- Empty state text ("No payment methods")
- Floating round chat/support launcher, bottom-right
