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

## Layout

Desktop uses a fixed 216px navigation rail and a three-part workspace: task queue, dominant invoice document, and approval/evidence rail. The layout collapses at 1180px, moving the approval evidence below the primary work. At 820px it becomes one column with a 113px horizontal icon navigation header; the invoice precedes the queue and no horizontal page overflow is allowed.

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

Desktop navigation is a vertical deep-green rail with authored line icons and the recognizable Demo51 hierarchy. Invoices and Reports are expandable groups; their child destinations use an indented dot treatment so To Verify, Invoice Log, AP performance, and Approval remain visibly subordinate. Active state uses lime fill and deep-green copy. Mobile navigation becomes a horizontal rail with accessible names and no badges.

### Analytics

Rillion Analytics uses a compact report index beside one dominant reference screen. Five supplied product screenshots—Executive dashboard, Invoice log, Payables aging, Spend report, and AP cash flow—are framed as demonstration data and navigated with explicit report buttons plus previous/next controls. The screenshots remain evidence; the surrounding shell supplies hierarchy, context, keyboard operation, and the public-simulation boundary.

### Approval Relay

The signature component is a vertical sequence of completed, active, and future ownership nodes. Completed steps use success green, the active human step uses lavender, and every node explains its outcome or next action.

## Do's and Don'ts

### Do:

- **Do** keep the active invoice, evidence, and accountable next role visible together.
- **Do** label simulated data plainly and keep all prospect-facing content synthetic.
- **Do** provide visible empty, disabled, hover, and keyboard-focus states.

### Don't:

- **Don't** use customer data, production credentials, or a live Demo51 connection.
- **Don't** turn the workspace into a wall of equal KPI cards.
- **Don't** use gradients, decorative glass, glow shadows, or Unicode glyphs as an icon system.
