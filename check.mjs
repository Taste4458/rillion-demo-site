import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
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
assert.ok(app.indexOf("['Verify captured invoices'") < app.indexOf("['Follow the Invoice Log'"), 'Invoice Log must follow To Verify in the guided tour');
for (const field of ["Vendor's inv. no.", 'Flow proposal', 'Account posting', 'Accounting date', 'Due date', 'Total', 'Tax', 'Tax %', 'Currency', 'Information', 'Purchase order', 'Contract', 'Match']) {
  assert.match(app, new RegExp(field.replace('.', '\\.')), `Invoice Log is missing ${field}`);
}
for (const label of ['PO matched', 'PO variance', 'PO missing', 'Matched', 'Review', 'Exception']) {
  assert.match(app, new RegExp(label), `Invoice Log is missing status: ${label}`);
}
for (const label of ['AI matched', 'Non-PO verified']) {
  assert.match(app, new RegExp(label), `Invoice Log is missing non-PO automation status: ${label}`);
}
assert.ok((app.match(/aiMatched: true/g) || []).length >= 4, 'Invoice Log needs at least four AI-matched examples');
assert.ok((app.match(/logOnly: true/g) || []).length >= 4, 'AI-matched examples must remain Invoice-Log-only');
assert.ok((app.match(/filter\(inv => !inv\.logOnly\)/g) || []).length >= 3, 'Log-only invoices must be excluded from work and approval queues');
for (const tone of ['good', 'warn', 'bad']) {
  assert.match(css, new RegExp(`\\.log-health\\.${tone}`), `Invoice Log is missing ${tone} status styling`);
  assert.match(css, new RegExp(`\\.account-chip\\.${tone}`), `Invoice Log is missing ${tone} account-column styling`);
}
assert.match(css, /\.date-chip/, 'Invoice Log needs the real overdue-date treatment');
for (const label of ['Contract image', 'Contract lines', 'Account posting', 'Comments/attachments', 'Window Wizards', 'Accounts Payable', 'CFO']) {
  assert.match(app, new RegExp(label), `Missing contract workspace content: ${label}`);
}
assert.match(app, /data-contract=/, 'Contract register needs clickable contract controls');
assert.match(app, /contract-detail/, 'Missing contract detail route');
assert.match(app, /data-contract-tab=/, 'Contract detail tabs must be interactive');
assert.doesNotMatch(app, /<tr data-contract=/, 'Contract table rows must preserve native table semantics');
assert.match(css, /\.contract-detail-grid/, 'Contract detail needs a responsive workspace layout');
const analyticsAssets = ['invoice-log', 'active-invoices', 'payables-aging', 'invoice-flow-tracking', 'invoice-summary', 'spend-report', 'ap-cash-flow', 'vendor-payment-analyzer', 'executive-dashboard', 'procurement-overview', 'procurement-trend'];
for (const asset of analyticsAssets) {
  assert.ok(existsSync(new URL(`./assets/analytics/${asset}.png`, import.meta.url)), `Missing Analytics asset: ${asset}`);
}
const analyticsOrder = ['Invoice log', 'Active invoices', 'AP aging', 'Invoice flow tracking', 'Invoice summary', 'Spend report', 'AP cash flow', 'Vendor payment analyzer', 'Executive dashboard', 'Procurement overview', 'Procurement trend'];
for (let index = 1; index < analyticsOrder.length; index++) {
  assert.ok(app.indexOf(`title: '${analyticsOrder[index - 1]}'`) < app.indexOf(`title: '${analyticsOrder[index]}'`), `Analytics board order is wrong near ${analyticsOrder[index]}`);
}
for (const group of ['AP Reports', 'Performance Tracking Reports', 'Business Reports', 'Executive Dashboard', 'Procurement Reports']) {
  assert.match(app, new RegExp(`group: '${group}'`), `Missing Analytics group: ${group}`);
}
assert.match(html, /class="tour-launch"/, 'Guided tour launch must be visible immediately');
assert.match(html, /6-step walkthrough/, 'Guided tour launch needs a recognizable description');
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
console.log('Demo contract check passed: navigation, guided tour, real Invoice Log columns, clickable Contracts, role-only Approval, Documents, Payments, eleven ordered Analytics boards, brand, and offline boundary are present.');
