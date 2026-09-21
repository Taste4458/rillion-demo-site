import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
for (const label of ['To Verify', 'Invoice Log', 'Approval', 'Rillion Analytics']) {
  assert.match(app, new RegExp(label), `Missing required destination: ${label}`);
}
for (const label of ['Documents', 'Document image', 'Track payments']) {
  assert.match(app, new RegExp(label), `Missing document or tour feature: ${label}`);
}
assert.match(app, /data-document-tab/, 'Missing document inbox tabs');
assert.match(app, /document-detail/, 'Missing document detail route');
assert.match(app, /class="table-link" data-document=/, 'Document rows need native interactive controls');
assert.doesNotMatch(app, /<tr data-document=/, 'Document table rows must preserve native table semantics');
assert.ok(app.indexOf("['Track payments'") < app.indexOf("['Explore Analytics'"), 'Payments must precede Analytics in the guided tour');
for (const asset of ['executive-dashboard', 'invoice-log', 'payables-aging', 'spend-report', 'ap-cash-flow']) {
  assert.ok(existsSync(new URL(`./assets/analytics/${asset}.png`, import.meta.url)), `Missing Analytics asset: ${asset}`);
}
for (const role of ['AP review', 'Department manager', 'Finance controller']) {
  assert.match(app, new RegExp(role), `Missing approval role: ${role}`);
}
const reportsNav = app.match(/\{ group: 'reports'[\s\S]*?\n  \] \},/);
assert.ok(reportsNav, 'Missing Reports navigation group');
assert.doesNotMatch(reportsNav[0], /approval-report/, 'Approval must not appear under Reports');
assert.doesNotMatch(app, /data-view="approval-report"/, 'Approval shortcuts must defer to the role selector');
for (const paymentTab of ['Ready for payment', 'Awaiting approval', 'In progress', 'Completed']) {
  assert.match(app, new RegExp(paymentTab), `Missing Payments tab: ${paymentTab}`);
}
assert.match(app, /data-payment-tab/, 'Payments tabs must be interactive');
assert.match(app, /payment-send/, 'Payments needs a simulated send action');
assert.match(app, /id="payment-date"/, 'Payments date filter must be wired to state');
assert.match(app, /function downloadPayments\(\)/, 'Payments download must export payment records');
assert.doesNotMatch(app, /copied for review/, 'Payment references must not claim an unperformed clipboard action');
assert.match(html, /id="role-select"/, 'Missing Approval role selector');
assert.ok(existsSync(new URL('./assets/rillion-logo-lime.svg', import.meta.url)), 'Missing official Rillion logo asset');
assert.doesNotMatch(app, /fetch\s*\(|XMLHttpRequest|WebSocket/, 'The public simulation must not call a backend');
console.log('Demo contract check passed: navigation, role-only Approval entry, Documents, four-state Payments, Analytics, brand, and offline boundary are present.');
