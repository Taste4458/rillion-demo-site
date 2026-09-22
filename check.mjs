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
assert.ok(app.indexOf("title: 'Track payments'") < app.indexOf("title: 'Explore Analytics'"), 'Payments must precede Analytics in the guided tour');
assert.ok(app.indexOf("title: 'Verify captured invoices'") < app.indexOf("title: 'Follow the Invoice Log'"), 'Invoice Log must follow To Verify in the guided tour');
for (const label of ['Invoices to verify', 'Invoice details', 'Invoice data settings', 'Supplier bank account', 'Company overrides', 'Vendor overrides', 'Change history']) {
	assert.match(app, new RegExp(label), `Capture flow is missing ${label}`);
}
for (const field of ['Company', 'Vendor', 'Invoice date', 'Due date', 'Total amount', 'Invoice number', 'File name', 'Received']) {
	assert.match(app, new RegExp(field), `Capture queue is missing ${field}`);
}
assert.match(app, /data-capture-invoice=/, 'Capture queue needs semantic invoice links');
assert.match(app, /capture-line-grid/, 'Capture detail needs a scroll-contained coding grid');
assert.match(app, /data-capture-field=/, 'Capture settings fields must be interactive');
assert.ok((app.match(/id: 'CAP-/g) || []).length >= 10, 'Capture queue needs ten representative synthetic invoices');
for (const field of ["Vendor's inv. no.", 'Flow proposal', 'Account posting', 'Accounting date', 'Due date', 'Total', 'Tax', 'Tax %', 'Currency', 'Information', 'Purchase order', 'Contract', 'Match']) {
	assert.match(app, new RegExp(field.replace('.', '\\.')), `Invoice Log is missing ${field}`);
}
for (const label of ['PO matched', 'Delivery variant', 'Price variant', 'PO missing', 'Matched', 'Review', 'Exception']) {
	assert.match(app, new RegExp(label), `Invoice Log is missing status: ${label}`);
}
for (const label of ['AI matched', 'Non-PO verified']) {
	assert.match(app, new RegExp(label), `Invoice Log is missing non-PO automation status: ${label}`);
}
assert.ok((app.match(/aiMatched: true/g) || []).length >= 4, 'Invoice Log needs at least four AI-matched examples');
assert.ok((app.match(/logOnly: true/g) || []).length >= 4, 'Invoice Log needs at least four log-only reference examples');
assert.ok((app.match(/filter\(requiresAction\)/g) || []).length >= 3, 'Direct-recording and log-only invoices must be excluded from task and approval queues');
const invoiceBlock = app.slice(app.indexOf('const invoices = ['), app.indexOf('const analyticsReports = ['));
const invoiceRecords = [...invoiceBlock.matchAll(/\n\t\{\n\t\tid: 'INV-[\s\S]*?\n\t\},?/g)].map((match) => match[0]);
const directRecords = invoiceRecords.filter((line) => line.includes("flowProposal: 'Directly to recording'"));
const aiRecords = invoiceRecords.filter((line) => line.includes('aiMatched: true'));
const aiRecordValues = aiRecords.map((line) => ({
	confidence: Number(line.match(/confidence: (\d+)/)?.[1]),
	tone: line.match(/matchTone: '([^']+)'/)?.[1],
}));
const actionableAiRecords = aiRecords.filter((line) => !line.includes('logOnly: true'));
const varianceRecords = invoiceRecords.filter((line) => line.includes("matchStatus: 'delivery-variance'") || line.includes("matchStatus: 'price-variance'"));
const independentManagerRecords = invoiceRecords.filter((line) => line.includes("role: 'department-manager'") && !line.includes("id: 'INV-77821'"));
assert.ok(directRecords.length >= 3, 'Invoice Log needs representative direct-recording PO and contract matches');
assert.ok(
	directRecords.every((line) => line.includes('match: 100') && (line.includes("matchBasis: 'po'") || line.includes("matchBasis: 'contract'"))),
	'Direct recording must be limited to fully matched purchase orders and contracts',
);
assert.ok(aiRecords.length >= 4 && aiRecords.every((line) => line.includes("matchBasis: 'non-po'") && line.includes("flowProposal: 'AI generated'") && line.includes("accountPosting: 'AI generated")), 'Every AI-matched non-PO must carry AI flow and account-posting proposals');
assert.ok(
	aiRecordValues.every(({ confidence, tone }) => (confidence > 80 ? tone === 'good' : confidence >= 50 ? tone === 'warn' : tone === 'bad')),
	'Every AI example must use the tone implied by its confidence range',
);
assert.ok(
	aiRecords.every((line) => !line.includes("contract: '") && !line.includes("flowProposal: 'Directly to recording'")),
	'Non-PO AI matches must not masquerade as contract matches or direct recording',
);
assert.ok(actionableAiRecords.length >= 4, 'Approval queues need at least four actionable AI-matched invoices');
for (const role of ['ap-review', 'department-manager', 'finance-controller']) {
	assert.ok(
		actionableAiRecords.some((line) => line.includes(`role: '${role}'`)),
		`Actionable AI invoices must include ${role}`,
	);
}
assert.ok(varianceRecords.some((line) => line.includes("matchStatus: 'delivery-variance'")) && varianceRecords.some((line) => line.includes("matchStatus: 'price-variance'")), 'Purchase-order examples need both delivery and price variance');
assert.ok(
	varianceRecords.every((line) => line.includes('explanation:')),
	'Every purchase-order variance needs an explanation',
);
const matchLabelSource = app.match(/const matchLabel = [^\n]+/)[0];
const aiMatchToneSource = app.match(/const aiMatchTone = [^\n]+/)[0];
const aiMatchTone = new Function(`${aiMatchToneSource}; return aiMatchTone;`)();
assert.equal(aiMatchTone(81), 'good', 'AI confidence above 80 must be green');
assert.equal(aiMatchTone(80), 'warn', 'AI confidence of 80 must be yellow');
assert.equal(aiMatchTone(50), 'warn', 'AI confidence of 50 must be yellow');
assert.equal(aiMatchTone(49), 'bad', 'AI confidence below 50 must be red');
assert.equal((matchLabelSource.match(/inv\.confidence/g) || []).length, 1, 'Only the AI match-label branch may display confidence');
assert.doesNotMatch(matchLabelSource, /(Delivery variant|Price variant|Fully matched|Match exception)[^']*confidence/, 'Purchase-order outcomes must not display confidence');
assert.match(app, /inv\.matchStatus === 'price-variance' \? 'price'/, 'Price variants need a distinct visual tone');
assert.match(css, /\.log-health\.price/, 'Invoice Log needs light-orange price-variant styling');
assert.match(app, /health\(matchTone\(inv\), poState\)/, 'Purchase-order and match chips must share the price-variant tone');
assert.ok(independentManagerRecords.length >= 3, 'Department manager needs at least three approvals independent of the connected journey');
assert.match(app, /function syncRoleCounts\(\)/, 'Approval role counts must derive from actionable invoices');
assert.doesNotMatch(app, /Open Precision invoice/, 'The shared journey strip must not expose a vendor-specific dashboard CTA');
for (const label of ['Inbound', 'To be processed', 'Being checked', 'Processed', 'Return to AP']) {
	assert.match(app, new RegExp(label), `Approver queue is missing workflow tab: ${label}`);
}
assert.match(app, /approvalQueueState: new Map\(\)/, 'Approver queue transitions need local workflow state');
assert.match(app, /function approvalDetail\(\)/, 'Approver queue needs a linked invoice-detail workspace');
assert.doesNotMatch(app, /<div class="flow-role">Payment scheduled<\/div>/, 'Payment scheduling must not appear in an approval flow proposal');
assert.match(app, /data-approval-invoice=/, 'Approver queue needs semantic invoice controls');
assert.doesNotMatch(app, /<tr[^>]*data-approval-invoice=/, 'Approver rows must preserve native table semantics');
for (const action of ['approval-back', 'approval-approve', 'approval-return', 'approval-match-po']) {
	assert.match(app, new RegExp(action), `Approver workspace is missing ${action}`);
}
assert.match(css, /\.approval-detail-grid/, 'Approver detail needs a responsive workspace layout');
assert.match(css, /\.approval-table \.data-table\s*\{[^}]*min-width:/, 'Approver queue needs a scroll-contained worklist');
assert.match(app, /class="table-link invoice-log-link" data-invoice=/, 'Invoice Log needs native invoice-detail links');
assert.match(app, /function invoiceCode\(inv\)|const invoiceCode = \(?inv\)? =>/, 'Invoice Log and detail need one shared code resolver');
assert.ok((app.match(/invoiceCode\(inv\)/g) || []).length >= 6, 'Invoice code must be reused across log, detail, and approval evidence');
assert.match(app, /'invoice-detail': 'Invoice detail'/, 'Invoice Log links need a dedicated invoice-detail route');
assert.match(app, /data-invoice-detail-tab=/, 'Invoice detail needs interactive coding tabs');
for (const label of ['Invoice lines', 'Account posting', 'Comments/attachments', 'Code']) assert.match(app, new RegExp(label), `Invoice detail is missing ${label}`);
assert.match(app, /logSelection: new Set\(\)/, 'Invoice Log needs selection state for Transfer');
assert.match(app, /transferred: new Set\(initialTransferredIds\)/, 'Approval visibility needs shared transfer state');
assert.match(app, /data-action="log-transfer"/, 'Invoice Log needs a selection-gated Transfer action');
assert.match(app, /state\.approvalQueueState\.set\(inv\.id, 'inbound'\)/, 'Transfer must place invoices in Approval Inbound');
assert.match(app, /const requiresAction = \(?inv\)? => isActionableCandidate\(inv\) && state\.transferred\.has\(inv\.id\)/, 'Approval queues must be gated by transfer state');
assert.match(app, /function matchSummary\(inv\)/, 'Invoice detail needs shared matching confidence and explanation evidence');
assert.match(app, /if \(!requiresAction\(inv\)\) return/, 'Direct-recording and log-only invoice details must not show approval actions');
for (const tone of ['good', 'warn', 'bad']) {
	assert.match(css, new RegExp(`\\.log-health\\.${tone}`), `Invoice Log is missing ${tone} status styling`);
	assert.match(css, new RegExp(`\\.account-chip\\.${tone}`), `Invoice Log is missing ${tone} account-column styling`);
}
assert.match(css, /\.date-chip/, 'Invoice Log needs the real overdue-date treatment');
assert.match(css, /\.invoice-detail-grid/, 'Invoice detail needs a responsive workspace layout');
assert.match(css, /\.invoice-log-batch/, 'Invoice Log needs a visible Transfer toolbar');
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
assert.match(html, /Choose a walkthrough/, 'Guided tour launch needs a recognizable description');
assert.match(html, /role="dialog"/, 'Guided tour welcome must be an accessible dialog');
assert.match(html, /id="tour-scrim"/, 'Guided tour welcome needs a clear modal boundary');
for (const view of ['to-verify', 'documents', 'contracts', 'payments', 'analytics']) {
	assert.match(html, new RegExp(`data-tour-view="${view}"`), `Guided tour welcome is missing the ${view} shortcut`);
}
assert.match(app, /function showTourWelcome\(\)/, 'Missing first-load tour welcome behavior');
assert.match(app, /action === 'tour-back'/, 'Guided tour needs a Back action');
assert.match(app, /if \(urlParams\.get\('welcome'\) !== '0'\) showTourWelcome\(\);\s*$/, 'Guided tour welcome must open unless a shared scenario suppresses it');
assert.doesNotMatch(app, /localStorage|sessionStorage/, 'Tour dismissal must reset on a fresh link load');
for (const persona of ['ap', 'approver', 'finance']) {
	assert.match(html, new RegExp(`data-tour-persona="${persona}"`), `Missing ${persona} persona walkthrough`);
	assert.match(app, new RegExp(`${persona}: \\[`), `Missing ${persona} tour steps`);
}
assert.match(app, /journeyStage/, 'Connected invoice journey needs shared workflow state');
for (const action of ['capture-verify', 'journey-approval', 'journey-payment']) assert.match(app, new RegExp(action), `Missing connected journey action: ${action}`);
assert.match(app, /payment\.journey && state\.journeyStage < 3 \? null/, 'Journey payment must stay hidden until approval');
assert.match(app, /state\.journeyStage = 4/, 'Payment action must complete the connected journey');
assert.match(app, /new URLSearchParams\(location\.search\)/, 'Shareable scenarios need native URL parsing');
assert.match(app, /welcome.*'0'/, 'Shareable scenarios need a welcome bypass');
assert.match(app, /function scenarioUrl\(persona\)/, 'Missing shareable scenario link builder');
assert.match(app, /loading="lazy" decoding="async"/, 'Analytics reference images must load lazily');
assert.match(app, /class="analytics-canvas" data-action="analytics-next"/, 'Analytics board images must advance the platform-ordered sequence');
assert.equal((app.match(/leftRail: true/g) || []).length, 7, 'Only dark-edge Analytics captures should receive the gray left rail');
const cashFlowIndex = app.indexOf("title: 'AP cash flow'");
const cashFlowRecord = app.slice(app.lastIndexOf('\n\t{', cashFlowIndex), app.indexOf('\n\t},', cashFlowIndex) + 4);
assert.doesNotMatch(cashFlowRecord, /leftRail/, 'AP cash flow must preserve its full native sidebar');
assert.match(app, /analytics-image-frame\$\{report\.leftRail \? ' analytics-image-frame--left-rail' : ''\}/, 'Analytics must apply the gray rail selectively');
assert.match(css, /\.analytics-image-frame--left-rail::before\s*\{[^}]*width:\s*7\.5%;[^}]*background:\s*var\(--wash\)/, 'Dark-edge Analytics captures need the Spend Report gray left rail');
assert.doesNotMatch(app, /interactiveAnalytics|data-analytics-filter|analytics-reference/, 'Analytics must remain source-faithful rather than using simplified synthetic boards');
assert.match(html, /id="app-shell"/, 'Modal needs a background shell target');
assert.match(html, /id="tour-status"[\s\S]*aria-live="polite"/, 'Tour needs live screen-reader announcements');
assert.match(app, /shell\.inert = active/, 'Welcome modal must make the background inert');
assert.match(app, /event\.key === 'Tab'.*is-welcome/, 'Welcome modal must trap keyboard focus');
assert.match(html, /https:\/\/www\.rillion\.com\/book-demo\//, 'Tour must end with the official live-demo handoff');
assert.match(html, /target="_blank" rel="noopener noreferrer"/, 'External live-demo handoff must isolate the new tab');
for (const destination of ['Invoice Log', 'To Verify', 'Invoice details', 'Documents', 'Contracts']) {
	assert.match(app, new RegExp(`backButton\\('${destination}'`), `Missing intuitive back control for ${destination}`);
}
for (const role of ['AP review', 'Department manager', 'Finance controller']) {
	assert.match(app, new RegExp(role), `Missing approval role: ${role}`);
}
const reportsNav = app.match(/\{\s*group: 'reports',[\s\S]*?\n\t\},/);
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
console.log('Demo contract check passed: navigation, three-screen Capture flow, guided tour, AI-only confidence, code-rich invoice detail, transfer-gated Approval, clickable Contracts, Documents, Payments, eleven source-faithful Analytics boards, brand, and offline boundary are present.');
