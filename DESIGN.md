---
name: Rillion Interactive Demo
description: A calm, accountable accounts-payable workspace that keeps evidence and ownership visible.
colors:
  primary-green: "#0F3732"
  secondary-green: "#1D5249"
  sand: "#F6F1DC"
  sand-light: "#FAF6EC"
  lime: "#C9F0AB"
  lavender: "#D5CBFB"
  lemon: "#F1E979"
  ink: "#313730"
  muted: "#626961"
  outline: "#CFD6CD"
  surface: "#FFFFFF"
  success: "#1F8A5B"
typography:
  headline:
    fontFamily: "Gellix, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Gellix, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Gellix, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.01em"
rounded:
  chip: "5px"
  control: "8px"
  surface: "12px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.primary-green}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  surface-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "16px"
---

# Design System: Rillion Interactive Demo

## Overview

**Creative North Star: "The Approval Relay"**

The interface treats invoice processing as accountable handoffs around a shared evidence record. It is operational and data-dense, but the hierarchy stays calm: the active invoice leads, the approval owner follows, and navigation recedes.

This is a synthetic product simulation, not a live tenant. The approved composition is recorded in `.impeccable/mocks/decision/approval-relay.png`; the verified desktop render is `.impeccable/review/desktop.png`. Mobile composition was verified through a 390×844 responsive DOM and computed-layout pass because Ego screenshot capture was unavailable for that viewport.

**Key Characteristics:**

- Deep-green product frame with a sand work surface.
- Official Rillion lime logo artwork on the deep-green rail, with clearspace kept free of controls and decoration.
- White evidence surfaces with thin neutral rules and restrained elevation.
- Lime reserved for primary actions, active navigation, and successful match states.
- Persistent ownership: every workflow state names the next responsible role.

## Colors

The palette is Rillion's own: grounded greens, warm sand, and precise light accents.

### Primary

- **Rillion Green:** the application frame, navigation, high-contrast status surfaces, and dark controls.
- **Rillion Lime:** primary action, active navigation, and positive match emphasis.

### Secondary

- **Approval Lavender:** the currently active human approval step.
- **Attention Lemon:** exceptions requiring review.

### Neutral

- **Sand and Sand Light:** the persistent work surface and header.
- **White Surface:** documents, queues, evidence panels, and tables.
- **Ink and Muted Green-Gray:** primary and secondary copy; the muted value is AA-safe on the light surfaces used here.
- **Outline:** 1px separators and defined surface edges.

**The Rarity Rule.** Lime identifies the current action or a verified positive state; it does not decorate neutral content.

## Typography

**Display Font:** Gellix (Arial fallback)
**Body Font:** Gellix (Arial fallback)

**Character:** Geometric, direct, and compact enough for operations. Weight and scale—not alternate typefaces—carry hierarchy.

### Hierarchy

- **Headline** (700, 24px, 1.15): workspace identity and greeting.
- **Title** (600, 18px, 1.2): panels and workflow regions.
- **Body** (400, 15px, 1.45): interface copy and evidence.
- **Label** (600, 11–13px): status, company context, and table headers.

**The Evidence Rule.** Money and measurements use tabular numerals; labels remain short and literal.

## Brand Mark

Use the official `assets/rillion-logo-lime.svg` artwork without redrawing, recoloring, stretching, or adding effects. It appears lime on Rillion Green and retains clearspace of at least half the rendered logo height on all sides; the desktop rail uses additional lower space to separate branding from navigation. The image keeps its native aspect ratio and has an accessible `Rillion` alternative.

## Layout

Desktop uses a fixed 236px navigation rail and a three-part workspace: task queue, dominant invoice document, and approval/evidence rail. Document detail uses three columns: source preview, indexed fields, and a stacked flow/lines/comments rail. The layout collapses at 1180px, moving secondary evidence below the primary work. At 820px it becomes one column with a horizontal navigation header; document detail becomes one column, its toolbar scrolls horizontally inside the viewport, and no horizontal page overflow is allowed. The 390px contract keeps the role selector, logo, document actions, and all primary content reachable.

Spacing follows a compact 6/10/16/24px rhythm. Groups are tight inside evidence blocks and separated generously between workflow regions.

## Elevation & Depth

Depth is restrained and structural. White surfaces combine a 1px neutral outline with a low ambient shadow (`0 5px 16px rgba(24,28,23,.09)`). The invoice paper uses an even quieter shadow so it reads as evidence rather than a floating card.

**The Evidence-First Rule.** Elevation may separate work surfaces, but it must never outrank document content or approval state.

## Shapes

Cards use gently rounded 12px corners, controls use 8px, and status chips use compact 5px corners. Circular forms are reserved for people and workflow nodes. Borders stay at 1px; there are no ornamental heavy rails or glow effects.

## Components

### Buttons

- **Primary:** lime fill, deep-green text, 8px corners, and 10×15px padding.
- **Hover / Focus:** a slightly deeper lime hover and a 3px blue focus ring with 3px offset.
- **Text actions:** transparent, semibold, and underlined only when they serve as navigation.

### Chips

- **Style:** small rectangular labels with one semantic fill: lime for match, lavender for approval, lemon for exception, and success green for completion.

### Cards / Containers

- **Corner Style:** 12px.
- **Background:** white on sand.
- **Shadow Strategy:** ambient-low only.
- **Border:** 1px neutral outline.
- **Internal Padding:** generally 14–18px.

### Inputs / Fields

- **Style:** white surface, 1px outline, 9px radius, compact icon and placeholder.
- **Focus:** the global 3px accessible focus ring.
- **Empty:** a named recovery message replaces unexplained blank results.

### Navigation

Desktop navigation is a vertical deep-green rail with the official lime Rillion logo, authored line icons, and the recognizable Demo51 hierarchy. Invoices and Reports are expandable groups; their child destinations use an indented dot treatment so To Verify, Invoice Log, and AP performance remain visibly subordinate. AP performance is the only Reports child. Approval is intentionally absent from the sidebar and direct calls to action because the persistent role selector is its primary navigation path. Active state uses lime fill and deep-green copy. Mobile navigation becomes a horizontal rail with accessible names and no badges.

The upper-right Approval role selector is a native select control that lists all synthetic workflow roles. Choosing a role opens the Approval report and makes that role the active grouping lens; approvals remain nested beneath explicit role headings so responsibility is never inferred from a person name alone.

### Role-Grouped Approval

Approval metrics and status filters precede one section per selected role. Each section uses a deep-green heading, short ownership description, and lime count chip, followed by a standard decision table. “All roles” renders every group; a selected role renders only its group. Empty role/status intersections provide a named recovery message.

### Capture / To Verify

To Verify recreates the current Capture sequence with three local states. The queue uses the live field order—Company, Vendor, Invoice date, Due date, Total amount, Invoice number, File name, and Received—plus vendor, amount, invoice-number, and global filters. Vendor names are semantic buttons that open Invoice details. Detail keeps extracted header fields beside a synthetic source invoice and a wide, internally scrollable line-coding grid with purchasing and account dimensions. Settings separates header and line fields, displays override counts, and exposes Global default, Company overrides, Vendor overrides, and Change history tabs. Desktop follows the dense operational composition; at 820px the workspaces become one column while wide evidence remains contained inside its own scroller.

### Documents Inbox

The Demo51-inspired inbox uses five status tabs—Inbound, To be processed, Being checked, Processed, and Return to AP—plus native Company and Document type filters. The wide operational table remains horizontally scrollable. Document names are semantic buttons with authored underline, hover, and global focus treatment; rows themselves are not interactive controls.

### Document Detail

The detail workspace keeps the source document, indexed metadata, approval flow, document lines, and comments visible together. A deep-green toolbar contains navigation and simulated Save, Approve, Return to AP, and Send to email actions. On desktop the workspace is three columns; at 1180px the side stack moves below, and at 820px it becomes one column with the toolbar horizontally scrollable rather than widening the page.

### Contracts Register and Detail

Contracts opens with a compact register whose contract-number buttons preserve native table semantics and lead into a Demo51-inspired detail workspace. The detail keeps a synthetic source image, editable metadata and validity terms, Accounts Payable-to-CFO flow, and tabbed contract lines, account posting, and attachments together. The deep-green toolbar provides Previous, Next, Create copy, Save, and Options actions with truthful simulation feedback. Desktop uses three columns; the flow and tabbed evidence move below at 1180px, and the page becomes a single contained column at 820px.

### Payments Workspace

Payments follows the Demo51 operational sequence with four native tab controls: Ready for payment, Awaiting approval, In progress, and Completed. Dynamic tab counts and totals reflect the current synthetic browser state. A shared filter row narrows records by invoice, vendor, payment method, and date; a payment-specific CSV export respects the active view. Ready for payment gates Pay outside Rillion and Send for payment behind invoice selection, then simulates the selected transition locally. Completed exposes payment dates, reference IDs, settled status, and a reference-review action. Manage and Payment portal remain truthful simulated actions confirmed by toasts. Wide payment tables scroll inside their surface and never widen the 390px page.

### Guided Tour

The six-step tour follows the operational story from queue to invoice verification, invoice log, approvals, Payments, and Analytics. Payments is always step 5, immediately before Analytics at step 6, so the story closes with reporting only after the payment state is understood. Its launch control is visible in the top bar on first paint, uses a compass-style product icon, and explicitly says “Guided tour” and “6-step walkthrough.” A short two-cycle arrival cue helps first-time visitors discover it without stealing focus or looping indefinitely.

### Invoice Log

Invoice Log follows To Verify in both navigation and the guided tour. Its horizontally contained operational grid mirrors Demo51's evidence density and live column order: company, vendor, vendor invoice, flow proposal, account posting, accounting date, due date, total, tax, tax %, currency, information, purchase order, and contract, followed by the simulation's match and workflow status evidence. Automated flow/account proposals use compact labeled green, yellow, or red chips, overdue dates use the real pale-critical treatment, and monetary columns use aligned tabular numerals. PO and match use the same labeled three-state language: green means matched, yellow means review or variance, and red means exception or missing PO. `Directly to recording` is reserved for 100% matched purchase orders and contracts; those records are excluded from approval work. Legitimate non-PO examples show `AI generated` in both the flow and account-posting proposal columns, pair `Non-PO verified` with `AI matched`, and remain log-only so they do not inflate To Verify or approval work. Text and a dot accompany every color so state never depends on color alone.

### Analytics

Rillion Analytics uses a grouped board index beside one dominant reference screen. Eleven supplied product views follow the real platform hierarchy: AP Reports (Invoice Log, Active Invoices, AP Aging), Performance Tracking Reports (Invoice Flow Tracking, Invoice Summary), Business Reports (Spend Report, AP Cash Flow, Vendor Payment Analyzer), Executive Dashboard, and Procurement Reports (Procurement Overview, Procurement Trend). Explicit board buttons and previous/next controls support both direct and sequential exploration. The seven newly supplied demonstration captures are already navigation-free and display without cropping. The screenshots remain evidence; the surrounding shell supplies hierarchy, context, keyboard operation, and the public-simulation boundary.

### Approval Relay

The signature component is a vertical sequence of completed, active, and future ownership nodes. Completed steps use success green, the active human step uses lavender, and every node explains its outcome or next action.

## Do's and Don'ts

### Do:

- **Do** keep the active invoice, evidence, and accountable next role visible together.
- **Do** label simulated data plainly and keep all prospect-facing content synthetic.
- **Do** provide visible empty, disabled, hover, and keyboard-focus states.
- **Do** keep Payments immediately before Analytics in the guided-tour sequence.
- **Do** keep the Guided tour launch visible above the fold and the Analytics boards in platform group order.

### Don't:

- **Don't** use customer data, production credentials, or a live Demo51 connection.
- **Don't** turn the workspace into a wall of equal KPI cards.
- **Don't** use gradients, decorative glass, glow shadows, or Unicode glyphs as an icon system.
- **Don't** make an entire table row act like a link when a semantic document button can name the destination.
