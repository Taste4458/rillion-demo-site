const svg = path => `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;

const icons = {
  dashboard: svg('M4 11.5 12 4l8 7.5V20h-5v-5H9v5H4Z'),
  profile: svg('M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0'),
  tasks: svg('m5 12 4 4L19 6'),
  budget: svg('M4 7h16v12H4Zm0 4h16M8 15h3'),
  requisitions: svg('M4 6h2l2 10h9l2-7H7m3 11h.01M17 20h.01'),
  invoices: svg('M6 3h12v18H6Zm3 5h6M9 12h6M9 16h4'),
  contracts: svg('M6 3h9l3 3v15H6Zm8 0v4h4M9 12h6M9 16h6'),
  documents: svg('M7 3h8l3 3v15H7Zm7 0v4h4M10 12h5M10 16h5'),
  payments: svg('M4 7h16v11H4Zm0 4h16m-12 4h3'),
  reports: svg('M5 20V10m5 10V4m5 16v-7m5 7V7'),
  administration: svg('M12 3v3m0 12v3M3 12h3m12 0h3m-3.6-6.4-2.1 2.1M8.7 16.3l-2.1 2.1m10.8 0-2.1-2.1M8.7 7.7 6.6 5.6M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z'),
  system: svg('M4 5h16v12H4Zm5 16h6m-3-4v4'),
  analytics: svg('M4 19h16M6 16l4-5 3 2 5-7')
};

const navTree = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'profile', label: 'My profile', icon: 'profile' },
  { id: 'tasks', label: 'My tasks', icon: 'tasks', badge: '8' },
  { id: 'budget', label: 'Budget requests', icon: 'budget' },
  { id: 'requisitions', label: 'Requisitions', icon: 'requisitions', badge: '96' },
  { group: 'invoices', label: 'Invoices', icon: 'invoices', badge: '27', children: [
    { id: 'to-verify', label: 'To Verify', badge: '5' },
    { id: 'invoice-log', label: 'Invoice Log', badge: '128' }
  ] },
  { id: 'contracts', label: 'Contracts', icon: 'contracts', badge: '8' },
  { id: 'documents', label: 'Documents', icon: 'documents', badge: '3' },
  { id: 'payments', label: 'Payments', icon: 'payments' },
  { group: 'reports', label: 'Reports', icon: 'reports', children: [
    { id: 'reports', label: 'AP performance' },
    { id: 'approval-report', label: 'Approval' }
  ] },
  { id: 'administration', label: 'Administration', icon: 'administration' },
  { id: 'system', label: 'System', icon: 'system' },
  { id: 'analytics', label: 'Rillion Analytics', icon: 'analytics' }
];

const invoices = [
  { id: 'INV-20481', vendor: 'Atlas Industrial Supply', amount: 12480, status: 'Manager approval', type: 'approval', po: '4500821', match: 98, due: 'Apr 30, 2026', owner: 'Alex Nguyen', confidence: 99, lines: [['Industrial gearbox — Model X200', 4, 2450], ['Mounting kit', 4, 320], ['Freight', 1, 1400]] },
  { id: 'INV-77821', vendor: 'Precision Tools Co.', amount: 3265, status: 'Manager approval', type: 'approval', po: '4500838', match: 96, due: 'May 4, 2026', owner: 'Jordan Lee', confidence: 97, lines: [['CNC tooling set', 1, 3265]] },
  { id: 'INV-99314', vendor: 'Summit Packaging', amount: 8750, status: 'PO exception', type: 'exception', po: '4500792', match: 72, due: 'May 7, 2026', owner: 'AP review', confidence: 84, lines: [['Protective packaging', 50, 175]] },
  { id: 'INV-66102', vendor: 'Riverside Logistics', amount: 960, status: 'AP review', type: 'match', po: '4500841', match: 91, due: 'May 12, 2026', owner: 'Morgan Patel', confidence: 94, lines: [['Regional freight', 1, 960]] },
  { id: 'INV-55277', vendor: 'Core Facility Services', amount: 4320, status: 'Manager approval', type: 'approval', po: '4500770', match: 100, due: 'May 15, 2026', owner: 'Alex Nguyen', confidence: 99, lines: [['Quarterly maintenance', 1, 4320]] }
];

const analyticsReports = [
  { title: 'Executive dashboard', image: 'assets/analytics/executive-dashboard.png', copy: 'Track invoice volume, processing time, successful flows, coding automation, and matched spend over time.' },
  { title: 'Invoice log', image: 'assets/analytics/invoice-log.png', copy: 'Review invoices currently in the log, errors requiring attention, match status, and time waiting for transfer.' },
  { title: 'Payables aging', image: 'assets/analytics/payables-aging.png', copy: 'Understand open liabilities by company, vendor, and aging band without reconciling multiple ERP screens.' },
  { title: 'Spend report', image: 'assets/analytics/spend-report.png', copy: 'Follow monthly spend and invoice volume, then narrow the view by company, account, vendor, or object.' },
  { title: 'AP cash flow', image: 'assets/analytics/ap-cash-flow.png', copy: 'See upcoming payment demand by date, currency, company, and invoice status to support cash planning.' }
];

const state = {
  view: location.hash.slice(1) || 'dashboard', selected: invoices[0], approved: new Set(),
  expanded: new Set(['invoices', 'reports']), tour: -1, query: '', fieldsExpanded: false,
  logFilter: 'all', approvalFilter: 'all', analytics: 0
};

const workspace = document.querySelector('#workspace');
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const allViews = navTree.flatMap(item => item.children || [item]).map(item => item.id).filter(Boolean);
const labels = Object.fromEntries(navTree.flatMap(item => item.children ? item.children.map(child => [child.id, child.label]) : [[item.id, item.label]]));

function renderNav() {
  document.querySelector('#nav').innerHTML = navTree.map(item => {
    if (!item.children) return navButton(item);
    const open = state.expanded.has(item.group);
    const active = item.children.some(child => child.id === state.view);
    return `<div class="nav-section ${active ? 'section-active' : ''}">
      <button class="nav-item nav-parent" data-nav-group="${item.group}" aria-expanded="${open}" aria-controls="nav-${item.group}">
        <span class="icon">${icons[item.icon]}</span><span class="nav-label">${item.label}</span>${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}<span class="chevron" aria-hidden="true"></span>
      </button>
      <div class="nav-children" id="nav-${item.group}" ${open ? '' : 'hidden'}>${item.children.map(child => navButton(child, true)).join('')}</div>
    </div>`;
  }).join('');
}

function navButton(item, child = false) {
  const active = state.view === item.id;
  return `<button class="nav-item ${child ? 'nav-subitem' : ''} ${active ? 'active' : ''}" data-view="${item.id}" ${active ? 'aria-current="page"' : ''} aria-label="${item.label}">
    ${child ? '<span class="sub-dot" aria-hidden="true"></span>' : `<span class="icon">${icons[item.icon]}</span>`}
    <span class="nav-label">${item.label}</span>${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
  </button>`;
}

function status(inv) {
  const done = state.approved.has(inv.id);
  return `<span class="status ${done ? 'paid' : inv.type}">${done ? 'Approved' : inv.status}</span>`;
}

function filtered() {
  const query = state.query.toLowerCase().trim();
  return query ? invoices.filter(inv => `${inv.id} ${inv.vendor} ${inv.po} ${inv.owner}`.toLowerCase().includes(query)) : invoices;
}

function queue() {
  const matches = filtered();
  return `<section class="panel queue-panel"><div class="panel-head"><h2>My task queue</h2><button class="link-button" data-view="tasks">All tasks</button></div>
    <div class="task-summary">${[['8', 'Total'], ['3', 'Approvals'], ['2', 'Exceptions'], ['3', 'Other']].map(([value, label]) => `<div class="summary-item"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>
    ${matches.length ? `<ul class="queue">${matches.map(inv => `<li><button class="queue-item ${state.selected.id === inv.id ? 'selected' : ''}" data-invoice="${inv.id}"><strong>${inv.vendor}</strong><span class="amount">${money(inv.amount)}</span><small>${inv.id}</small>${status(inv)}</button></li>`).join('')}</ul>` : emptyState('No matching invoices', 'Try a vendor, invoice number, purchase order, or owner.')}
  </section>`;
}

function invoicePaper(inv) {
  const subtotal = inv.lines.reduce((sum, line) => sum + line[1] * line[2], 0);
  const vendorMark = inv.vendor.split(' ')[0];
  return `<div class="invoice-paper"><div class="invoice-brand"><strong>${vendorMark}<span>.</span></strong><span>Invoice</span></div>
    <div class="invoice-meta"><div><strong>${inv.vendor}</strong><p>1234 Commerce Drive</p><p>Riverton, IL 60611</p><br><strong>Bill to</strong><p>Northstar Manufacturing</p><p>1000 Production Way</p></div>
      <dl><dt>Invoice no.</dt><dd>${inv.id}</dd><dt>Invoice date</dt><dd>Apr 2, 2026</dd><dt>Due date</dt><dd>${inv.due}</dd><dt>PO no.</dt><dd>${inv.po}</dd><dt>Terms</dt><dd>Net 30</dd></dl></div>
    <table class="line-table"><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>${inv.lines.map(line => `<tr><td>${line[0]}</td><td>${line[1]}</td><td>${money(line[2])}</td><td>${money(line[1] * line[2])}</td></tr>`).join('')}</tbody></table>
    <div class="totals"><div><span>Subtotal</span><span>${money(subtotal)}</span></div><div><span>Tax & fees</span><span>${money(inv.amount - subtotal)}</span></div><div class="grand"><span>Total</span><span>${money(inv.amount)}</span></div></div>
  </div>`;
}

function invoicePanel(inv) {
  return `<section class="panel invoice-panel"><div class="invoice-head"><div><button class="link-button" data-view="invoice-log">← Invoice Log</button><h2>${inv.vendor}</h2><p>${inv.id}</p><div class="chip-row"><span class="status match">Match ${inv.match}%</span>${status(inv)}</div></div><div class="invoice-total"><strong>${money(inv.amount)}</strong><small>Due ${inv.due}</small></div></div>${invoicePaper(inv)}</section>`;
}

function relay(inv) {
  const approved = state.approved.has(inv.id);
  const fields = [['Vendor', inv.vendor], ['Invoice number', inv.id], ['Due date', inv.due], ['PO number', inv.po], ['Total amount', money(inv.amount)], ...(state.fieldsExpanded ? [['Invoice date', 'Apr 2, 2026'], ['Payment terms', 'Net 30'], ['Currency', 'USD']] : [])];
  return `<div class="stack right-stack"><section class="panel"><div class="panel-head"><h3>Approval relay</h3><button class="link-button" data-view="approval-report">Approval report</button></div><div class="relay">
    <div class="relay-step done"><span class="relay-mark"></span><div><strong>Capture complete</strong><small>Invoice received and fields extracted</small></div></div>
    <div class="relay-step done"><span class="relay-mark"></span><div><strong>AP review complete</strong><small>Matched to PO ${inv.po}</small></div></div>
    <div class="relay-step ${approved ? 'done' : 'active'}"><span class="relay-mark"></span><div><strong>${approved ? 'Manager approved' : 'Manager approval'}</strong><small>${approved ? 'Approved by Alex Nguyen' : 'Your approval is required'}</small></div></div>
    <div class="relay-step ${approved ? 'active' : ''}"><span class="relay-mark"></span><div><strong>Payment scheduled</strong><small>${approved ? 'Ready for ERP export' : 'Sent to ERP after approval'}</small></div></div>
    <button class="primary-button full" data-action="approve" ${approved ? 'disabled' : ''}>${approved ? 'Invoice approved' : 'Review and approve'}</button></div></section>
    <section class="panel"><div class="panel-head"><h3>Extracted fields</h3><button class="link-button" data-action="fields">${state.fieldsExpanded ? 'Show less' : 'View all'}</button></div><div class="evidence">${fields.map(([label, value]) => `<div class="evidence-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></section>
    <section class="panel"><div class="panel-head"><h3>PO match</h3><span class="status match">${inv.match}%</span></div><div class="evidence">${[['PO number', inv.po], ['Matched amount', money(inv.amount)], ['Variance', inv.match === 100 ? '$0.00' : 'Review confidence'], ['Coding', '6410 · Machinery & Equipment']].map(([label, value]) => `<div class="evidence-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></section>
  </div>`;
}

function dashboard() { workspace.innerHTML = `<div class="workspace-grid">${queue()}${invoicePanel(state.selected)}${relay(state.selected)}</div>`; }

function toVerify() {
  const rows = filtered().map(inv => `<tr data-invoice="${inv.id}" tabindex="0" role="link" aria-label="Verify ${inv.id} from ${inv.vendor}"><td><strong>${inv.id}</strong><small>${inv.vendor}</small></td><td>${money(inv.amount)}</td><td>${inv.confidence}%</td><td>${inv.po}</td><td>${status(inv)}</td></tr>`).join('');
  workspace.innerHTML = pageIntro('To Verify', 'Review fields extracted through Rillion Capture before sending each invoice to the Invoice Log.', '<span class="status exception">5 need review</span>') + `<section class="panel verify-layout"><div class="verify-note"><h3>Capture verification</h3><p>Choose an invoice to inspect the source document, extracted fields, PO evidence, and next approval owner.</p><div class="mini-metrics"><div><strong>98%</strong><span>field confidence</span></div><div><strong>3m 42s</strong><span>average review</span></div></div></div><div class="table-wrap">${rows ? dataTable(['Invoice', 'Amount', 'Confidence', 'PO number', 'Next step'], rows) : emptyState('No invoices to verify', 'Try a different search term.')}</div></section>`;
}

function invoiceLog() {
  const matches = filtered().filter(inv => state.logFilter === 'all' || (state.logFilter === 'approved' ? state.approved.has(inv.id) : inv.type === state.logFilter));
  const filters = [['all', 'All invoices'], ['approval', 'In approval'], ['exception', 'Exceptions'], ['approved', 'Approved']];
  const rows = matches.map(inv => `<tr data-invoice="${inv.id}" tabindex="0" role="link" aria-label="Open ${inv.id} from ${inv.vendor}"><td><strong>${inv.id}</strong></td><td>${inv.vendor}</td><td>${money(inv.amount)}</td><td>${inv.po}</td><td>${inv.owner}</td><td>${status(inv)}</td></tr>`).join('');
  workspace.innerHTML = pageIntro('Invoice Log', 'Follow every captured invoice from AP review through approval and transfer.', '<button class="primary-button" data-view="to-verify">Open To Verify</button>') + `<div class="filter-tabs" aria-label="Filter invoice log">${filters.map(([id, label]) => `<button data-log-filter="${id}" aria-pressed="${state.logFilter === id}">${label}</button>`).join('')}</div><section class="panel table-wrap">${rows ? dataTable(['Invoice', 'Vendor', 'Amount', 'Purchase order', 'Owner', 'Status'], rows) : emptyState('No matching invoices', 'Clear the search or choose another status.')}</section>`;
}

function approvalReport() {
  const filters = [['all', 'All decisions'], ['waiting', 'Waiting'], ['approved', 'Approved']];
  const matches = invoices.filter(inv => state.approvalFilter === 'all' || (state.approvalFilter === 'approved' ? state.approved.has(inv.id) : !state.approved.has(inv.id)));
  const rows = matches.map(inv => `<tr data-invoice="${inv.id}" tabindex="0" role="link" aria-label="Open ${inv.id} assigned to ${inv.owner}"><td>${inv.owner}</td><td><strong>${inv.id}</strong><small>${inv.vendor}</small></td><td>${money(inv.amount)}</td><td>${state.approved.has(inv.id) ? 'Completed today' : inv.due}</td><td>${state.approved.has(inv.id) ? '<span class="status paid">Approved</span>' : '<span class="status approval">Waiting</span>'}</td></tr>`).join('');
  workspace.innerHTML = pageIntro('Approval', 'See who owns each decision, how long approvals take, and which invoices need attention.', '<button class="primary-button" data-action="export">Download synthetic CSV</button>') + `<div class="approval-overview"><section class="panel approval-metric"><strong>1.8 days</strong><span>average approval cycle</span></section><section class="panel approval-metric"><strong>92%</strong><span>approved on time</span></section><section class="panel approval-metric"><strong>3</strong><span>waiting on managers</span></section></div><div class="filter-tabs" aria-label="Filter approval report">${filters.map(([id, label]) => `<button data-approval-filter="${id}" aria-pressed="${state.approvalFilter === id}">${label}</button>`).join('')}</div><section class="panel table-wrap">${dataTable(['Approver', 'Invoice', 'Amount', 'Decision date', 'Status'], rows)}</section>`;
}

function analytics() {
  const report = analyticsReports[state.analytics];
  workspace.innerHTML = pageIntro('Rillion Analytics', 'Explore representative Analytics views for operational, spend, aging, and cash-flow decisions.', `<span class="analytics-count">${state.analytics + 1} of ${analyticsReports.length}</span>`) + `<div class="analytics-layout"><nav class="panel analytics-menu" aria-label="Analytics reports">${analyticsReports.map((item, index) => `<button data-analytics="${index}" aria-current="${index === state.analytics ? 'page' : 'false'}"><span>${item.title}</span><small>${index === state.analytics ? 'Viewing now' : 'Open report'}</small></button>`).join('')}</nav><section class="panel analytics-stage"><div class="analytics-head"><div><h2>${report.title}</h2><p>${report.copy}</p></div><div class="analytics-actions"><button class="quiet-control" data-action="analytics-prev" ${state.analytics === 0 ? 'disabled' : ''}>Previous</button><button class="primary-button" data-action="analytics-next">${state.analytics === analyticsReports.length - 1 ? 'Back to first' : 'Next report'}</button></div></div><button class="analytics-canvas" data-action="analytics-next" aria-label="Continue from ${report.title} to the next Analytics report"><img src="${report.image}" alt="${report.title} Analytics dashboard with synthetic demonstration data" width="1392" height="787"><span>Click the report to continue</span></button><p class="reference-note">Reference screen from Rillion Analytics · demonstration data</p></section></div>`;
}

function reports() {
  workspace.innerHTML = pageIntro('AP performance', 'A synthetic view of invoice throughput, exceptions, and approval speed.', '<button class="primary-button" data-action="export">Download synthetic CSV</button>') + `<div class="report-grid"><section class="panel"><div class="panel-head"><h3>Invoices processed</h3><span>Last 6 months</span></div><div class="chart">${[54, 66, 58, 81, 74, 92].map((value, index) => `<div class="bar" style="height:${value}%"><span>${['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][index]}</span></div>`).join('')}</div></section><section class="panel"><div class="panel-head"><h3>Operational health</h3></div><div class="metric-list">${[['94%', 'touchless match'], ['1.8 days', 'approval cycle'], ['3.2%', 'exception rate'], ['100%', 'audit trail coverage']].map(([value, label]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div><button class="report-link" data-view="approval-report">Open Approval report</button></section></div>`;
}

function tablePage(kind) {
  const content = {
    tasks: ['My tasks', 'Everything currently waiting for action.', ['Invoice', 'Vendor', 'Amount', 'Purchase order', 'Status'], filtered().map(inv => [inv.id, inv.vendor, money(inv.amount), inv.po, state.approved.has(inv.id) ? 'Approved' : inv.status])],
    requisitions: ['Requisitions', 'Requested spend, ownership, and fulfillment status.', ['Requisition', 'Requester', 'Vendor', 'Amount', 'Status'], invoices.map((inv, index) => [`REQ-${4021 + index}`, ['Taylor Brooks', 'Avery Morgan', 'Jordan Lee'][index % 3], inv.vendor, money(inv.amount), index < 3 ? 'Converted to PO' : 'In approval'])],
    contracts: ['Contracts', 'Active agreements and the invoices governed by them.', ['Contract', 'Partner', 'Status', 'Renewal', 'Annual value'], invoices.slice(0, 4).map((inv, index) => [`CT-2026-0${index + 1}`, inv.vendor, 'Active', 'Dec 31, 2026', money(inv.amount * 4)])]
  }[kind];
  const [title, copy, heads, rowData] = content;
  const rows = rowData.map(row => `<tr ${String(row[0]).startsWith('INV') ? `data-invoice="${row[0]}" tabindex="0" role="link" aria-label="Open ${row[0]} from ${row[1]}"` : ''}>${row.map((cell, index) => `<td>${index === heads.length - 1 ? `<span class="status ${String(cell).includes('Exception') ? 'exception' : 'match'}">${cell}</span>` : cell}</td>`).join('')}</tr>`).join('');
  workspace.innerHTML = pageIntro(title, copy, '<button class="primary-button" data-action="tour">Show me how it works</button>') + `<section class="panel table-wrap">${rows ? dataTable(heads, rows) : emptyState('No matching results', 'Try an invoice number, vendor, purchase order, or owner.')}</section>`;
}

function overviewPage(kind) {
  const pages = {
    profile: ['My profile', 'Your demo identity and approval authority.', [['Role', 'AP Manager'], ['Company', 'Northstar Manufacturing'], ['Approval limit', '$50,000'], ['Language', 'English']]],
    budget: ['Budget requests', 'Plan and approve spend before it becomes a requisition.', [['Open requests', '4'], ['Awaiting your approval', '2'], ['Approved this month', '11'], ['Available budget', '$184,200']]],
    documents: ['Documents', 'Find the records attached to invoices, contracts, and approvals.', [['Invoice documents', '128'], ['Purchase orders', '96'], ['Contracts', '8'], ['Other files', '3']]],
    payments: ['Payments', 'Monitor approved invoices as they move to scheduled payment.', [['Ready for payment', '14'], ['Scheduled this week', '$84,310'], ['On hold', '2'], ['Exported to ERP', '66']]],
    administration: ['Administration', 'A representative view of configuration ownership.', [['Companies', '3 active'], ['Users', '42 active'], ['Approval roles', '12 configured'], ['Integrations', 'ERP connected']]],
    system: ['System', 'A read-only overview of the synthetic demo environment.', [['Environment', 'Interactive simulation'], ['Data source', 'Synthetic browser data'], ['Authentication', 'Not required'], ['External writes', 'Disabled']]]
  };
  const [title, copy, entries] = pages[kind];
  workspace.innerHTML = pageIntro(title, copy, '<span class="simulation-label">Read-only simulation</span>') + `<section class="panel settings-list">${entries.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</section>`;
}

function pageIntro(title, copy, action = '') { return `<div class="page-intro"><div><h2>${title}</h2><p>${copy}</p></div>${action}</div>`; }
function dataTable(heads, rows) { return `<table class="data-table"><thead><tr>${heads.map(head => `<th>${head}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`; }
function emptyState(title, copy) { return `<div class="empty"><h3>${title}</h3><p>${copy}</p></div>`; }

function render() {
  if (!allViews.includes(state.view)) state.view = 'dashboard';
  renderNav();
  document.querySelector('#page-title').textContent = state.view === 'dashboard' ? 'Good morning, Alex' : labels[state.view] || 'Rillion';
  if (state.view === 'dashboard') dashboard();
  else if (state.view === 'to-verify') toVerify();
  else if (state.view === 'invoice-log') invoiceLog();
  else if (state.view === 'approval-report') approvalReport();
  else if (state.view === 'analytics') analytics();
  else if (state.view === 'reports') reports();
  else if (['tasks', 'requisitions', 'contracts'].includes(state.view)) tablePage(state.view);
  else overviewPage(state.view);
}

function navigate(view) {
  state.view = view;
  history.replaceState(null, '', `#${view}`);
  render();
  workspace.focus({ preventScroll: true });
}

const tours = [
  ['Start with the work queue', 'Rillion brings approvals, matching exceptions, and AP review into one prioritized queue.', 'dashboard'],
  ['Verify captured invoices', 'To Verify keeps extracted fields and source evidence together before an invoice enters the log.', 'to-verify'],
  ['Follow the Invoice Log', 'The log keeps status, ownership, and purchasing evidence visible from receipt through transfer.', 'invoice-log'],
  ['Measure approvals', 'The Approval report shows who owns each decision and how quickly work moves.', 'approval-report'],
  ['Explore Analytics', 'Move through five operational dashboards covering automation, aging, spend, and cash flow.', 'analytics']
];

function showTour() {
  const tour = tours[state.tour];
  document.querySelector('#tour').hidden = false;
  document.querySelector('#tour-count').textContent = `${state.tour + 1} of ${tours.length}`;
  document.querySelector('#tour-title').textContent = tour[0];
  document.querySelector('#tour-copy').textContent = tour[1];
  state.view = tour[2];
  render();
}

function toast(message) {
  const element = document.querySelector('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove('show'), 2200);
}

function downloadReport() {
  const csv = 'Metric,Value\nTouchless match,94%\nApproval cycle,1.8 days\nException rate,3.2%\nAudit trail coverage,100%\n';
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: 'rillion-synthetic-ap-report.csv' });
  link.click();
  URL.revokeObjectURL(url);
  toast('Synthetic report downloaded');
}

function openInvoice(id) {
  state.selected = invoices.find(inv => inv.id === id) || state.selected;
  state.fieldsExpanded = false;
  navigate('dashboard');
}

document.addEventListener('click', event => {
  const group = event.target.closest('[data-nav-group]')?.dataset.navGroup;
  const view = event.target.closest('[data-view]')?.dataset.view;
  const invoice = event.target.closest('[data-invoice]')?.dataset.invoice;
  const logFilter = event.target.closest('[data-log-filter]')?.dataset.logFilter;
  const approvalFilter = event.target.closest('[data-approval-filter]')?.dataset.approvalFilter;
  const analyticsIndex = event.target.closest('[data-analytics]')?.dataset.analytics;
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (group) { state.expanded.has(group) ? state.expanded.delete(group) : state.expanded.add(group); renderNav(); return; }
  if (view) { navigate(view); return; }
  if (invoice) { openInvoice(invoice); return; }
  if (logFilter) { state.logFilter = logFilter; invoiceLog(); return; }
  if (approvalFilter) { state.approvalFilter = approvalFilter; approvalReport(); return; }
  if (analyticsIndex !== undefined) { state.analytics = Number(analyticsIndex); analytics(); return; }
  if (action === 'approve') { state.approved.add(state.selected.id); render(); toast(`${state.selected.id} approved and ready for payment`); }
  if (action === 'fields') { state.fieldsExpanded = !state.fieldsExpanded; render(); }
  if (action === 'reset') { state.approved.clear(); state.selected = invoices[0]; state.fieldsExpanded = false; state.logFilter = 'all'; state.approvalFilter = 'all'; state.analytics = 0; state.view = 'dashboard'; state.query = ''; document.querySelector('#search').value = ''; history.replaceState(null, '', '#dashboard'); render(); toast('Demo reset'); }
  if (action === 'tour') { state.tour = 0; showTour(); }
  if (action === 'tour-next') { state.tour++; if (state.tour >= tours.length) { document.querySelector('#tour').hidden = true; state.tour = -1; toast('Tour complete — explore anything'); } else showTour(); }
  if (action === 'tour-close') { document.querySelector('#tour').hidden = true; state.tour = -1; }
  if (action === 'export') downloadReport();
  if (action === 'analytics-prev' && state.analytics > 0) { state.analytics--; analytics(); }
  if (action === 'analytics-next') { state.analytics = (state.analytics + 1) % analyticsReports.length; analytics(); }
});

document.addEventListener('keydown', event => {
  const row = event.target.closest('tr[data-invoice]');
  if (row && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openInvoice(row.dataset.invoice); }
});

document.querySelector('#search').addEventListener('input', event => {
  state.query = event.target.value;
  if (!['dashboard', 'invoice-log', 'to-verify', 'tasks'].includes(state.view)) state.view = 'invoice-log';
  render();
});

window.addEventListener('hashchange', () => {
  const view = location.hash.slice(1);
  if (allViews.includes(view)) { state.view = view; render(); }
});

render();
