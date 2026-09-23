# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: static HTML, CSS, and JavaScript so the public demo has no application runtime, authentication layer, or backend to maintain.

## Users

Prospective Rillion customers evaluating accounts-payable automation without access to a live tenant. They need to understand the product's workflow and explore representative screens on their own or with a salesperson.

## Product Purpose

Provide a login-free, prospect-safe simulation of Rillion's invoice lifecycle. Success means a visitor can move from captured invoice through matching, approval, and reporting while understanding the current state and next action.

## Positioning

The experience demonstrates one connected AP workflow instead of presenting disconnected marketing screenshots. It lets a visitor inspect the invoice, matching evidence, approval history, and audit outcome as a coherent story.

## Operating Context

The source reference is the authenticated Demo51 environment and its invoice, requisition, purchase-order, contract, payment, report, and administration surfaces. The public experience is a separate static simulation and never communicates with Demo51.

## Capabilities and Constraints

- Public link with no login.
- Synthetic company, vendor, invoice, purchase-order, contract, and employee data only.
- Guided tour and free exploration with deterministic reset. Every fresh public-link load opens a dismissible welcome dialog with Accounts payable, Invoice approver, Finance leader, full-platform, and direct-module paths. The AP and full-platform tours open one AI-match example and one purchase-order variance example so the evidence model is demonstrated rather than merely described.
- One canonical Precision Tools invoice advances locally through Capture, Invoice Log, manager approval, payment readiness, and payment completion so the major modules share visible state.
- Shareable AP, approver, and finance scenario URLs open the relevant module and role without the welcome dialog. Invoice and purchase-order detail URLs also retain the selected synthetic record across reloads; all scenarios remain synthetic and browser-local.
- Representative interactions are simulated locally in the browser.
- No production APIs, credentials, customer data, lead forms, behavioral tracking, telemetry, or remote writes.
- It must identify itself as a product simulation rather than a live Rillion tenant.
- The navigation mirrors Demo51's primary hierarchy while keeping secondary areas representative and read-only.
- Invoices includes interactive To Verify and Invoice Log branches. To Verify follows Capture's queue → invoice detail/coding → invoice data settings workflow with synthetic records and functional filters. Invoice Log follows the real column order through tax, information, purchase order, and contract, adds the posting code from the shared invoice record, and opens each vendor invoice into a code-rich workspace with source image, fields, line coding, account posting, and comments. AI lines show confidence-colored coding and flow-proposal explanations. PO lines color the purchase-order reference, explain quantity and price discrepancies on hover or keyboard focus, and provide an info control into a synthetic purchase-order detail. Eligible rows can be selected and transferred into the appropriate Approval role's Inbound queue; direct-recording and log-only records remain ineligible. Confidence percentages appear only for AI matching: above 80% is green, 50–80% inclusive is yellow, and below 50% is red. Fully matched purchase orders, delivery variants, price variants, and PO exceptions show outcomes without confidence. Delivery variants are yellow; price variants are light orange. Reports contains AP performance; Rillion Analytics includes eleven board click-throughs grouped in platform order.
- A persistent Approval role selector lists the synthetic workflow roles and is the primary navigation path to each role's grouped approval work.
- Documents includes a status-tabbed inbox and a synthetic document-detail workspace with preview, metadata, flow, lines, comments, and simulated approval actions.
- Contracts includes a clickable register and a synthetic contract-detail workspace with source image, editable metadata, validity and matching settings, Accounts Payable-to-CFO flow, lines, account posting, attachments, and simulated toolbar actions.
- Payments includes Ready for payment, Awaiting approval, In progress, and Completed click-throughs with synthetic filters, records, and reversible simulated actions.
- The full-platform guided tour visits Payments immediately before Rillion Analytics; role tours are shorter and task-specific.
- A prominent Guided tour control is visible above the fold on initial load and opens the walkthrough chooser.
- All eleven Analytics boards use source-faithful, lazy-loaded references with fixed image dimensions and platform-ordered Previous/Next navigation.
- The final walkthrough state offers an external Request a live demo action to Rillion's official booking page.
- Detail screens use a consistent destination-labeled Back control with a left-arrow icon, a 44px minimum target, and visible hover/focus treatment.

## Brand Commitments

Use the current Rillion identity and product terminology. Preserve the friendly-expert voice, Gellix typography, sentence case, green/sand/lime system, calm motion, and product-UI status colors defined in the Rillion brand source of truth.

## Evidence on Hand

- Authenticated read-only access to Demo51 through the Demo51 MCP and Ego browser.
- Current Rillion brand guidelines, logo assets, font files, UI color tokens, and interaction rules.
- The sidebar uses the official lime Rillion logo asset on the deep-green product frame.
- Prospect-safe Rillion Analytics reference screens supplied in `User stories Analytics&BI.pptx`.
- Seven navigation-free screenshots supplied from the Rillion Analytics demonstration environment for Active Invoices, Invoice Flow Tracking, Invoice Summary, Vendor Payment Analyzer, Executive Dashboard, Procurement Overview, and Procurement Trend.
- No public performance claims, customer endorsements, or production analytics are authorized for this artifact.

## Product Principles

- Demonstrate the workflow instead of describing it.
- Keep every public datum synthetic and every interaction reversible.
- Make state and next action obvious to a first-time AP visitor.
- Preserve product truth while simplifying legacy mechanics for exploration.
- Prefer one complete invoice story over broad but shallow screen coverage.

## Accessibility & Inclusion

Target keyboard-operable controls, visible focus, reduced-motion support, semantic landmarks, accessible names, and WCAG AA contrast. The welcome dialog traps focus, makes the background inert, supports Escape, restores focus on close, and announces tour progress through a polite live region. Automated DOM/accessibility checks cover unique IDs, control names, image alternatives, focus containment, and responsive overflow; formal third-party certification is outside this simulation's scope.
