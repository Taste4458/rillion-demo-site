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
- Guided tour and free exploration with deterministic reset.
- Representative interactions are simulated locally in the browser.
- No production APIs, credentials, customer data, lead forms, analytics, or remote writes.
- It must identify itself as a product simulation rather than a live Rillion tenant.
- Initial scope models the core prospect story rather than every Demo51 administration screen.

## Brand Commitments

Use the current Rillion identity and product terminology. Preserve the friendly-expert voice, Gellix typography, sentence case, green/sand/lime system, calm motion, and product-UI status colors defined in the Rillion brand source of truth.

## Evidence on Hand

- Authenticated read-only access to Demo51 through the Demo51 MCP and Ego browser.
- Current Rillion brand guidelines, logo assets, font files, UI color tokens, and interaction rules.
- No public performance claims, customer endorsements, or production analytics are authorized for this artifact.

## Product Principles

- Demonstrate the workflow instead of describing it.
- Keep every public datum synthetic and every interaction reversible.
- Make state and next action obvious to a first-time AP visitor.
- Preserve product truth while simplifying legacy mechanics for exploration.
- Prefer one complete invoice story over broad but shallow screen coverage.

## Accessibility & Inclusion

Target keyboard-operable controls, visible focus, reduced-motion support, semantic landmarks, accessible names, and WCAG AA contrast. Formal conformance testing remains an open decision.
