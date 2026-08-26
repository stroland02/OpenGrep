# Screenshot Catalog Spec

You are cataloging screenshots of the Greptile web platform (captured Jul 2026)
so a team can rebuild it faithfully as a functional app called OpenGrep.

Screenshots live in:
  C:\Users\strol\OneDrive\Desktop\Locals\OpenGrep\Greptile UI\
Named: `Greptile web Jul 2026 N.png`, N = 0..134. All are 1920x1325 browser
viewport captures. Sequential numbers usually mean sequential steps in a flow.

## Your job

Read EVERY screenshot in your assigned range, in numeric order, using the Read
tool one at a time. Write your findings to your assigned output file as you go.
Do NOT summarize loosely — this is a reconstruction reference. Precision beats
brevity. Transcribe text VERBATIM, including punctuation and casing.

## Per-screenshot entry format

Use exactly this structure, one block per screenshot:

### N — <Short screen name>
- **Route guess:** `/some/path` (your best inference from breadcrumbs, nav, URL bar if visible)
- **Screen type:** page | modal | dropdown-open | drawer | empty-state | loading | error | onboarding-step | settings-tab
- **Flow:** name the flow, and note if it continues from N-1 or into N+1
- **Layout:** describe regions top-to-bottom, left-to-right (top nav / left sidebar / main / right panel / footer). Note widths and proportions if visually obvious.
- **Nav items visible:** exact labels, and which is active/highlighted
- **All visible text:** verbatim. Headings, labels, body copy, button text, placeholder text, help text, tooltips, badges, empty-state copy, timestamps, counts. Group by region. This is the most important field — do not paraphrase or truncate.
- **Data entities:** every concrete record shown (repo names, PR titles + numbers, usernames/avatars, branch names, file paths, commit SHAs, statuses, severities, dates, numeric metrics). List them as data, since these become seed fixtures.
- **Controls:** every interactive element — buttons (label + apparent variant: primary/secondary/ghost/destructive), inputs (+ placeholder), selects (+ options if open), tabs, toggles, checkboxes, radios, sliders, search bars, pagination, sort/filter chips, icon buttons (describe the icon), links.
- **Table/list columns:** if a table or list is present, list column headers in order and describe each row's shape.
- **State shown:** active tab, selected row, expanded/collapsed sections, toggle positions, form validation, badge counts, progress indicators.
- **Behavior implied:** what this screen tells us the product DOES. Any copy that documents a feature, limit, permission, pricing tier, or integration.
- **Notable visuals:** charts (type + axes + series), diagrams, code blocks (language + whether syntax highlighted), diff views (unified/split), avatars, logos, illustrations, syntax-highlighted inline code.

## Design tokens (once per batch, at the end of your file)

A `## Design tokens observed` section:
- **Colors:** approximate hex for background(s), surface/card, border, primary text, secondary/muted text, accent/brand, and each semantic color (success/warning/error/info). Note light vs dark mode.
- **Typography:** apparent font family (sans/serif/mono), and the size/weight hierarchy you can distinguish (h1/h2/h3/body/small/code).
- **Spacing & shape:** border radius on cards/buttons/inputs, apparent padding scale, border widths, shadow usage.
- **Iconography:** icon style (line/solid, rounded/sharp) and any recognizable icon set (Lucide, Heroicons, Phosphor, etc.).
- **Components:** recurring component patterns you saw (card, stat tile, badge/pill, banner, toast, tab bar, side sheet, command palette, code viewer, diff viewer).

## Batch summary (at the top of your file, written LAST)

A `## Batch summary` section with:
- The distinct screens/pages in your range
- The distinct flows, with their screenshot number ranges
- Feature areas touched
- Any screenshot you could not interpret, and why

## Return value

Your final message back is NOT the catalog — it goes in the file. Return at most
250 words: the list of distinct screens found, the flows with number ranges, the
feature areas, and anything surprising or ambiguous. Nothing else.
