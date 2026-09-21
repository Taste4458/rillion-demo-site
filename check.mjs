import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('./app.js', import.meta.url), 'utf8');
for (const label of ['To Verify', 'Invoice Log', 'Approval', 'Rillion Analytics']) {
  assert.match(app, new RegExp(label), `Missing required destination: ${label}`);
}
for (const asset of ['executive-dashboard', 'invoice-log', 'payables-aging', 'spend-report', 'ap-cash-flow']) {
  assert.ok(existsSync(new URL(`./assets/analytics/${asset}.png`, import.meta.url)), `Missing Analytics asset: ${asset}`);
}
assert.doesNotMatch(app, /fetch\s*\(|XMLHttpRequest|WebSocket/, 'The public simulation must not call a backend');
console.log('Demo contract check passed: navigation, Analytics assets, and offline boundary are present.');
