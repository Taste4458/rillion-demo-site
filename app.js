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
  { id: 'tasks', label: 'My tasks', icon: 'tasks', badge: '3' },
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
    { id: 'reports', label: 'AP performance' }
  ] },
  { id: 'administration', label: 'Administration', icon: 'administration' },
  { id: 'system', label: 'System', icon: 'system' },
  { id: 'analytics', label: 'Rillion Analytics', icon: 'analytics' }
];

const approvalRoles = [
  { id: 'ap-review', label: 'AP review', description: 'Validates coding, source evidence, and exceptions before approval.' },
  { id: 'department-manager', label: 'Department manager', description: 'Confirms the purchase, business purpose, and cost ownership.' },
  { id: 'finance-controller', label: 'Finance controller', description: 'Reviews financial control and final posting readiness.' }
];

const invoices = [
  { id: 'INV-20481', vendor: 'Atlas Industrial Supply', vendorInvoice: 'ASI-774383', amount: 12480, status: 'Ready to record', type: 'match', flowProposal: 'Directly to recording', accountPosting: '6410 · Equipment', accountingDate: 'Apr 2, 2026', currency: 'USD', po: '4500821', poTone: 'good', match: 100, matchTone: 'good', matchBasis: 'po', approvalRequired: false, due: 'Apr 30, 2026', owner: 'AP automation', role: 'ap-review', confidence: 99, lines: [['Industrial gearbox — Model X200', 4, 2450], ['Mounting kit', 4, 320], ['Freight', 1, 1400]] },
  { id: 'INV-77821', vendor: 'Precision Tools Co.', vendorInvoice: 'PTC-55392', amount: 3265, status: 'Manager approval', type: 'approval', flowProposal: 'Department manager', accountPosting: '6420 · Tooling', accountingDate: 'Apr 6, 2026', currency: 'USD', po: '4500838', poTone: 'warn', match: 96, matchTone: 'warn', matchBasis: 'po', due: 'May 4, 2026', owner: 'Jordan Lee', role: 'department-manager', confidence: 97, lines: [['CNC tooling set', 1, 3265]] },
  { id: 'INV-99314', vendor: 'Summit Packaging', vendorInvoice: 'SP-209875', amount: 8750, status: 'PO exception', type: 'exception', flowProposal: 'AP review', accountPosting: 'Review required', accountingDate: 'Apr 9, 2026', currency: 'USD', po: 'No PO', poTone: 'bad', match: 72, matchTone: 'bad', matchBasis: 'exception', due: 'May 7, 2026', owner: 'AP review', role: 'ap-review', confidence: 84, lines: [['Protective packaging', 50, 175]] },
  { id: 'INV-66102', vendor: 'Riverside Logistics', vendorInvoice: 'RL-88014', amount: 960, status: 'Finance review', type: 'approval', flowProposal: 'Finance controller', accountPosting: '6210 · Freight', accountingDate: 'Apr 12, 2026', currency: 'USD', po: '4500841', poTone: 'warn', match: 91, matchTone: 'warn', matchBasis: 'po', due: 'May 12, 2026', owner: 'Morgan Patel', role: 'finance-controller', confidence: 94, lines: [['Regional freight', 1, 960]] },
  { id: 'INV-55277', vendor: 'Core Facility Services', vendorInvoice: 'CFS-44871', amount: 4320, status: 'Ready to record', type: 'match', flowProposal: 'Directly to recording', accountPosting: '6810 · Maintenance', accountingDate: 'Apr 15, 2026', currency: 'USD', po: '4500770', poTone: 'good', match: 100, matchTone: 'good', matchBasis: 'po', approvalRequired: false, due: 'May 15, 2026', owner: 'AP automation', role: 'ap-review', confidence: 99, lines: [['Quarterly maintenance', 1, 4320]] },
  { id: 'INV-18044', company: 20, vendor: 'Brightwell Consulting', vendorInvoice: 'BC-94811', amount: 6480, tax: 0, taxRate: 0, information: 'AI proposals ready', status: 'AP review', type: 'match', flowProposal: 'AI generated', accountPosting: 'AI generated · 6530', accountingDate: 'Apr 17, 2026', currency: 'USD', po: 'Non-PO', poTone: 'good', match: 99, matchTone: 'good', matchBasis: 'non-po', aiMatched: true, logOnly: true, due: 'May 17, 2026', owner: 'AP automation', role: 'ap-review', confidence: 99, lines: [['Advisory services', 1, 6480]] },
  { id: 'INV-18057', company: 20, vendor: 'Lumen Cloud Services', vendorInvoice: 'LCS-33081', amount: 12900, tax: 1032, taxRate: 8, information: 'AI proposals need review', status: 'AP review', type: 'match', flowProposal: 'AI generated', accountPosting: 'AI generated · 6710', accountingDate: 'Apr 18, 2026', currency: 'USD', po: 'Non-PO', poTone: 'good', match: 97, matchTone: 'warn', matchBasis: 'non-po', aiMatched: true, logOnly: true, due: 'May 18, 2026', owner: 'AP automation', role: 'ap-review', confidence: 98, lines: [['Cloud platform subscription', 1, 12900]] },
  { id: 'INV-18063', company: 20, vendor: 'Harbor Office Services', vendorInvoice: 'HOS-77125', amount: 1840, tax: 147.2, taxRate: 8, information: 'AI proposals ready', status: 'AP review', type: 'match', flowProposal: 'AI generated', accountPosting: 'AI generated · 6110', accountingDate: 'Apr 20, 2026', currency: 'USD', po: 'Non-PO', poTone: 'good', match: 95, matchTone: 'good', matchBasis: 'non-po', aiMatched: true, logOnly: true, due: 'May 20, 2026', owner: 'AP automation', role: 'ap-review', confidence: 96, lines: [['Office services', 1, 1840]] },
  { id: 'INV-18079', company: 30, vendor: 'Northstar Utilities', vendorInvoice: 'NU-405193', amount: 7215, tax: 0, taxRate: 0, information: 'AI proposals ready', status: 'AP review', type: 'match', flowProposal: 'AI generated', accountPosting: 'AI generated · 6250', accountingDate: 'Apr 22, 2026', currency: 'USD', po: 'Non-PO', poTone: 'good', match: 98, matchTone: 'good', matchBasis: 'non-po', aiMatched: true, logOnly: true, due: 'May 22, 2026', owner: 'AP automation', role: 'ap-review', confidence: 99, lines: [['Electric utility service', 1, 7215]] },
  { id: 'INV-18085', company: 30, vendor: 'Window Wizards', vendorInvoice: 'WW-00795', amount: 25, tax: 0, taxRate: 0, information: 'Contract match complete', contract: 'CT-0076', status: 'Ready to record', type: 'match', flowProposal: 'Directly to recording', accountPosting: 'Contract coding', accountingDate: 'Jul 22, 2026', currency: 'USD', po: '—', poTone: 'none', match: 100, matchTone: 'good', matchBasis: 'contract', approvalRequired: false, logOnly: true, due: 'Aug 21, 2026', owner: 'AP automation', role: 'ap-review', confidence: 99, lines: [['Window cleaning', 1, 25]] }
];

const analyticsReports = [
  { group: 'AP Reports', title: 'Invoice log', image: 'assets/analytics/invoice-log.png', copy: 'Review invoices currently in the log, errors requiring attention, match status, and time waiting for transfer.' },
  { group: 'AP Reports', title: 'Active invoices', image: 'assets/analytics/active-invoices.png', copy: 'See active invoice volume, flow status, invoice type, match status, role bottlenecks, and the underlying invoice list.' },
  { group: 'AP Reports', title: 'AP aging', image: 'assets/analytics/payables-aging.png', copy: 'Understand open liabilities by company, vendor, and aging band without reconciling multiple ERP screens.' },
  { group: 'Performance Tracking Reports', title: 'Invoice flow tracking', image: 'assets/analytics/invoice-flow-tracking.png', copy: 'Follow invoice-flow activity, role processing time, users, bottlenecks, and the detailed transfer history.' },
  { group: 'Performance Tracking Reports', title: 'Invoice summary', image: 'assets/analytics/invoice-summary.png', copy: 'Review invoice volume, matching and capture types, flow and coding proposals, automation success, and vendor concentration.' },
  { group: 'Business Reports', title: 'Spend report', image: 'assets/analytics/spend-report.png', copy: 'Follow monthly spend and invoice volume, then narrow the view by company, account, vendor, or object.' },
  { group: 'Business Reports', title: 'AP cash flow', image: 'assets/analytics/ap-cash-flow.png', copy: 'See upcoming payment demand by date, currency, company, and invoice status to support cash planning.' },
  { group: 'Business Reports', title: 'Vendor payment analyzer', image: 'assets/analytics/vendor-payment-analyzer.png', copy: 'Compare vendor payment timing, terms, late and early payments, and invoice volume across companies.' },
  { group: 'Executive Dashboard', title: 'Executive dashboard', image: 'assets/analytics/executive-dashboard.png', copy: 'Track invoice volume, processing time, successful flows, coding automation, and matched spend over time.' },
  { group: 'Procurement Reports', title: 'Procurement overview', image: 'assets/analytics/procurement-overview.png', copy: 'Review purchase-order, delivery, invoice-match, currency, and item performance in one procurement view.' },
  { group: 'Procurement Reports', title: 'Procurement trend', image: 'assets/analytics/procurement-trend.png', copy: 'Explore adjusted purchasing amounts over time with matching, vendor, order, item, and company filters.' }
];

const documentTabs = [
  ['inbound', 'Inbound'],
  ['to-be-processed', 'To be processed'],
  ['being-checked', 'Being checked'],
  ['processed', 'Processed'],
  ['return-to-ap', 'Return to AP']
];

const documents = [
  { id: 'DOC-10', arrived: 'May 22, 2026', type: 'Check request', name: 'Community grant request', description: 'Donation request for Habitat for Humanity', created: 'May 22, 2026', createdBy: 'Sam Carter', lines: 1, status: 'being-checked', company: 'Northstar Manufacturing', responsibleRole: 'Finance controller', amount: 5000, documentNo: 'CR-2026-04827', requestCategory: 'Donation', payee: 'Indianapolis Habitat for Humanity' },
  { id: 'DOC-11', arrived: 'May 22, 2026', type: 'Employee expense reimbursement', name: 'Lakeside trip', description: 'Hotel and travel reimbursement', created: 'May 22, 2026', createdBy: 'Sam Carter', lines: 1, status: 'being-checked', company: 'Northstar Manufacturing', responsibleRole: 'AP review', amount: 1840, documentNo: 'ER-2026-00518', requestCategory: 'Travel', payee: 'Taylor Brooks' },
  { id: 'DOC-9', arrived: 'May 19, 2026', type: 'Check request', name: 'Community sponsorship', description: 'Annual neighborhood sponsorship', created: 'May 19, 2026', createdBy: 'Matt Wilson', lines: 1, status: 'being-checked', company: 'Northstar Manufacturing', responsibleRole: 'Department manager', amount: 2500, documentNo: 'CR-2026-04791', requestCategory: 'Sponsorship', payee: 'Riverton Community Fund' },
  { id: 'DOC-12', arrived: 'May 23, 2026', type: 'Check request', name: 'Safety training deposit', description: 'Deposit for plant safety workshop', created: 'May 23, 2026', createdBy: 'Jordan Lee', lines: 2, status: 'inbound', company: 'Northstar Services', responsibleRole: 'AP review', amount: 3200, documentNo: 'CR-2026-04843', requestCategory: 'Training', payee: 'SafetyWorks Institute' },
  { id: 'DOC-8', arrived: 'May 18, 2026', type: 'Employee expense reimbursement', name: 'Customer workshop', description: 'Travel and workshop materials', created: 'May 18, 2026', createdBy: 'Avery Morgan', lines: 4, status: 'to-be-processed', company: 'Northstar Services', responsibleRole: 'AP review', amount: 2765, documentNo: 'ER-2026-00492', requestCategory: 'Travel', payee: 'Avery Morgan' },
  { id: 'DOC-7', arrived: 'May 16, 2026', type: 'Check request', name: 'Equipment certification', description: 'Annual equipment certification', created: 'May 16, 2026', createdBy: 'Alex Nguyen', lines: 1, status: 'processed', company: 'Northstar Manufacturing', responsibleRole: 'Finance controller', amount: 4125, documentNo: 'CR-2026-04762', requestCategory: 'Compliance', payee: 'Midwest Certification Group' },
  { id: 'DOC-6', arrived: 'May 15, 2026', type: 'Check request', name: 'Facility permit', description: 'Permit requires coding correction', created: 'May 15, 2026', createdBy: 'Morgan Patel', lines: 1, status: 'return-to-ap', company: 'Northstar Manufacturing', responsibleRole: 'AP review', amount: 890, documentNo: 'CR-2026-04741', requestCategory: 'Permit', payee: 'City of Riverton' }
];

const contracts = [
  { id: 'CT-0076', number: 'WW-SVC-2026-001', name: 'Window Wizards Biweekly Window Cleaning', partner: 'Window Wizards', description: 'Biweekly recurring window cleaning service', status: 'Active for matching', company: '30, Northstar Manufacturing', createdBy: 'Accounts Payable · Alex Nguyen', authorizedBy: 'CFO · Morgan Patel', validFrom: 'Jan 1, 2026', validTo: 'Dec 31, 2026', renewal: 'Dec 31, 2026', annualValue: 650, total: 25, tax: 0, notice: 3, extension: 0, currency: 'USD', flow: 'Directly to recording', partialFlow: 'According to reference matching', role: 'Accounts Payable', posting: 'Standard', line: 'Windows', attachment: 'Window Wizards - 00795 Legacy.pdf', invoiceNo: '00795', issueDate: 'Jul 22, 2026', dueDate: 'Aug 21, 2026' },
  { id: 'CT-0075', number: 'BWA-2026-014', name: 'Brightwell Advisory Retainer', partner: 'Brightwell Consulting', description: 'Monthly finance transformation advisory services', status: 'Active for matching', company: '30, Northstar Manufacturing', createdBy: 'Accounts Payable · Alex Nguyen', authorizedBy: 'Finance controller · Morgan Patel', validFrom: 'Jan 1, 2026', validTo: 'Dec 31, 2026', renewal: 'Dec 31, 2026', annualValue: 77760, total: 6480, tax: 0, notice: 2, extension: 12, currency: 'USD', flow: 'Directly to recording', partialFlow: 'AP review', role: 'Accounts Payable', posting: '6530 · Consulting services', line: 'Advisory services', attachment: 'Brightwell - 2026 Retainer.pdf', invoiceNo: '94811', issueDate: 'Apr 17, 2026', dueDate: 'May 17, 2026' },
  { id: 'CT-0074', number: 'LCS-2026-009', name: 'Lumen Cloud Platform Subscription', partner: 'Lumen Cloud Services', description: 'Annual cloud platform subscription and support', status: 'Active for matching', company: '20, Northstar Services', createdBy: 'Accounts Payable · Jordan Lee', authorizedBy: 'CFO · Morgan Patel', validFrom: 'Mar 1, 2026', validTo: 'Feb 28, 2027', renewal: 'Feb 28, 2027', annualValue: 154800, total: 12900, tax: 1032, notice: 3, extension: 12, currency: 'USD', flow: 'Accounts payable +1', partialFlow: 'According to reference matching', role: 'Accounts Payable', posting: '6710 · Software subscriptions', line: 'Cloud platform', attachment: 'Lumen Cloud - Subscription.pdf', invoiceNo: '33081', issueDate: 'Apr 18, 2026', dueDate: 'May 18, 2026' },
  { id: 'CT-0073', number: 'CFS-2026-022', name: 'Core Facility Maintenance', partner: 'Core Facility Services', description: 'Quarterly preventative maintenance agreement', status: 'Active', company: '30, Northstar Manufacturing', createdBy: 'Facilities · Taylor Brooks', authorizedBy: 'Department manager · Alex Nguyen', validFrom: 'Jan 1, 2026', validTo: 'Dec 31, 2026', renewal: 'Dec 31, 2026', annualValue: 17280, total: 4320, tax: 0, notice: 1, extension: 12, currency: 'USD', flow: 'Department manager', partialFlow: 'AP review', role: 'Accounts Payable', posting: '6810 · Maintenance', line: 'Preventative maintenance', attachment: 'Core Facility - Agreement.pdf', invoiceNo: '44871', issueDate: 'Apr 15, 2026', dueDate: 'May 15, 2026' }
];

const paymentTabs = [
  ['ready', 'Ready for payment', 66],
  ['awaiting', 'Awaiting approval', 8],
  ['in-progress', 'In progress', 16],
  ['completed', 'Completed', 10]
];

const payments = [
  { id: '0976000052', tab: 'ready', company: '30', vendor: 'ADS Security', invoiceDate: 'Sep 7, 2026', dueDate: 'Oct 7, 2026', amount: 1510, method: 'ACH', approver: 'Frank Jonsson', approvalDate: 'Aug 30, 2026' },
  { id: '0976000048', tab: 'ready', company: '30', vendor: 'Advanced Building Systems', invoiceDate: 'Sep 7, 2026', dueDate: 'Oct 7, 2026', amount: 1470, method: 'Check', approver: 'Adri Meijer', approvalDate: 'Aug 30, 2026' },
  { id: '0976000005', tab: 'ready', company: '30', vendor: 'CDW', invoiceDate: 'Sep 21, 2026', dueDate: 'Oct 21, 2026', amount: 1040, method: 'ACH', approver: 'Maria Hansson', approvalDate: 'Aug 30, 2026' },
  { id: '0976000002', tab: 'ready', company: '30', vendor: 'Absolute Laser', invoiceDate: 'Sep 21, 2026', dueDate: 'Oct 21, 2026', amount: 1010, method: 'Virtual card', approver: 'Maria Hansson', approvalDate: 'Aug 30, 2026' },
  { id: '0976000003', tab: 'ready', company: '30', vendor: 'Accurate Welding', invoiceDate: 'Sep 21, 2026', dueDate: 'Oct 21, 2026', amount: 1020, method: 'Check', approver: 'Logan Cressey', approvalDate: 'Aug 30, 2026' },
  { id: '0976000001', tab: 'ready', company: '30', vendor: 'DME Company', invoiceDate: 'Sep 21, 2026', dueDate: 'Oct 21, 2026', amount: 1000, method: 'ACH', approver: 'Maria Hansson', approvalDate: 'Aug 30, 2026' },
  { id: '0976000021', tab: 'awaiting', company: '30', vendor: 'Beacon Office Supply', invoiceDate: 'Sep 18, 2026', dueDate: 'Oct 18, 2026', amount: 2860, method: 'ACH', approver: 'Department manager', status: 'Manager review' },
  { id: '0976000024', tab: 'awaiting', company: '30', vendor: 'Clearwater Freight', invoiceDate: 'Sep 19, 2026', dueDate: 'Oct 19, 2026', amount: 4380, method: 'Check', approver: 'Finance controller', status: 'Final approval' },
  { id: '0976000027', tab: 'awaiting', company: '30', vendor: 'North Coast Packaging', invoiceDate: 'Sep 20, 2026', dueDate: 'Oct 20, 2026', amount: 1975, method: 'Virtual card', approver: 'AP review', status: 'Exception review' },
  { id: '0976000030', tab: 'in-progress', company: '30', vendor: 'Metro Industrial', invoiceDate: 'Sep 14, 2026', amount: 6420, method: 'ACH', sentBy: 'Alex Nguyen', sentOn: 'Sep 21, 2026', status: 'Submitted to bank' },
  { id: '0976000033', tab: 'in-progress', company: '30', vendor: 'Riverside Logistics', invoiceDate: 'Sep 16, 2026', amount: 960, method: 'Check', sentBy: 'Morgan Patel', sentOn: 'Sep 21, 2026', status: 'Payment file created' },
  { id: '0976000036', tab: 'in-progress', company: '30', vendor: 'Summit Packaging', invoiceDate: 'Sep 17, 2026', amount: 8750, method: 'ACH', sentBy: 'Alex Nguyen', sentOn: 'Sep 21, 2026', status: 'Processing' },
  { id: '0976000007', tab: 'completed', company: '30', vendor: 'Polychemtex Inc', invoiceDate: 'Oct 6, 2026', amount: 1060, method: 'Check', sentBy: 'Christina Ciocoi', sentOn: 'Sep 21, 2026', paymentDate: 'Sep 22, 2026', reference: 'TRC6716/3890', status: 'Settled' },
  { id: '0976000010', tab: 'completed', company: '30', vendor: 'Absolute Laser', invoiceDate: 'Oct 11, 2026', amount: 1090, method: 'Check', sentBy: 'Kevin Witkowski', sentOn: 'Sep 21, 2026', paymentDate: 'Sep 22, 2026', reference: 'TR2EBB0/2722', status: 'Settled' },
  { id: '0976000015', tab: 'completed', company: '30', vendor: 'City Transport', invoiceDate: 'Oct 26, 2026', amount: 1140, method: 'ACH', sentBy: 'Johan Eriksson', sentOn: 'Sep 21, 2026', paymentDate: 'Sep 22, 2026', reference: 'TRB7241', status: 'Settled' },
  { id: '0976000013', tab: 'completed', company: '30', vendor: 'Advanced Building Systems', invoiceDate: 'Oct 21, 2026', amount: 1120, method: 'Check', sentBy: 'Sam Carter', sentOn: 'Sep 21, 2026', paymentDate: 'Sep 22, 2026', reference: 'TRA2B16/7743', status: 'Settled' },
  { id: '0976000009', tab: 'completed', company: '30', vendor: 'DME Company', invoiceDate: 'Oct 11, 2026', amount: 1080, method: 'ACH', sentBy: 'Adri Meijer', sentOn: 'Sep 21, 2026', paymentDate: 'Sep 22, 2026', reference: 'TR43080', status: 'Settled' },
  { id: '0976000017', tab: 'completed', company: '30', vendor: 'Star Telecom', invoiceDate: 'Oct 31, 2026', amount: 1160, method: 'Virtual card', sentBy: 'Logan Meek', sentOn: 'Sep 21, 2026', paymentDate: 'Sep 22, 2026', reference: 'TRE5370/7304', status: 'Settled' }
];

const state = {
  view: location.hash.slice(1) || 'dashboard', selected: invoices[0], approved: new Set(),
  expanded: new Set(['invoices', 'reports']), tour: -1, query: '', fieldsExpanded: false,
  logFilter: 'all', approvalFilter: 'all', roleFilter: 'all', analytics: 0,
  documentTab: 'being-checked', documentCompany: 'all', documentType: 'all', selectedDocument: documents[0], documentOutcomes: new Map(),
  selectedContract: contracts[0], contractTab: 'contract-lines',
  paymentTab: 'ready', paymentQuery: '', paymentVendor: 'all', paymentMethod: 'all', paymentDate: '', paymentSelection: new Set(), paymentMoves: new Map()
};

const workspace = document.querySelector('#workspace');
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const escapeHtml = value => String(value).replace(/[&<>"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
const approvalRole = inv => approvalRoles.find(role => role.id === inv.role);
const requiresAction = inv => !inv.logOnly && inv.approvalRequired !== false;
const allViews = [...navTree.flatMap(item => item.children || [item]).map(item => item.id).filter(Boolean), 'document-detail', 'contract-detail', 'approval-report'];
const labels = { ...Object.fromEntries(navTree.flatMap(item => item.children ? item.children.map(child => [child.id, child.label]) : [[item.id, item.label]])), 'document-detail': 'Document detail', 'contract-detail': 'Contract detail', 'approval-report': 'Approval' };

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
  const badge = item.id === 'documents' ? documents.filter(doc => documentStatus(doc) === 'being-checked').length : item.badge;
  return `<button class="nav-item ${child ? 'nav-subitem' : ''} ${active ? 'active' : ''}" data-view="${item.id}" ${active ? 'aria-current="page"' : ''} aria-label="${item.label}">
    ${child ? '<span class="sub-dot" aria-hidden="true"></span>' : `<span class="icon">${icons[item.icon]}</span>`}
    <span class="nav-label">${item.label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ''}
  </button>`;
}

function status(inv) {
  const done = state.approved.has(inv.id);
  return `<span class="status ${done ? 'paid' : inv.type}">${done ? 'Approved' : inv.status}</span>`;
}

function filtered() {
  const query = state.query.toLowerCase().trim();
  return query ? invoices.filter(inv => `${inv.id} ${inv.vendor} ${inv.po} ${inv.owner} ${approvalRole(inv).label}`.toLowerCase().includes(query)) : invoices;
}

function queue() {
  const matches = filtered().filter(requiresAction);
  return `<section class="panel queue-panel"><div class="panel-head"><h2>My task queue</h2><button class="link-button" data-view="tasks">All tasks</button></div>
    <div class="task-summary">${[['3', 'Total'], ['2', 'Approvals'], ['1', 'Exception'], ['0', 'Other']].map(([value, label]) => `<div class="summary-item"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>
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
  return `<div class="stack right-stack"><section class="panel"><div class="panel-head"><h3>Approval relay</h3></div><div class="relay">
    <div class="relay-step done"><span class="relay-mark"></span><div><strong>Capture complete</strong><small>Invoice received and fields extracted</small></div></div>
    <div class="relay-step done"><span class="relay-mark"></span><div><strong>AP review complete</strong><small>Matched to PO ${inv.po}</small></div></div>
    <div class="relay-step ${approved ? 'done' : 'active'}"><span class="relay-mark"></span><div><strong>${approved ? `${approvalRole(inv).label} approved` : approvalRole(inv).label}</strong><small>${approved ? `Approved by ${inv.owner}` : `${inv.owner} · approval required`}</small></div></div>
    <div class="relay-step ${approved ? 'active' : ''}"><span class="relay-mark"></span><div><strong>Payment scheduled</strong><small>${approved ? 'Ready for ERP export' : 'Sent to ERP after approval'}</small></div></div>
    <button class="primary-button full" data-action="approve" ${approved ? 'disabled' : ''}>${approved ? 'Invoice approved' : 'Review and approve'}</button></div></section>
    <section class="panel"><div class="panel-head"><h3>Extracted fields</h3><button class="link-button" data-action="fields">${state.fieldsExpanded ? 'Show less' : 'View all'}</button></div><div class="evidence">${fields.map(([label, value]) => `<div class="evidence-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></section>
    <section class="panel"><div class="panel-head"><h3>PO match</h3><span class="status match">${inv.match}%</span></div><div class="evidence">${[['PO number', inv.po], ['Matched amount', money(inv.amount)], ['Variance', inv.match === 100 ? '$0.00' : 'Review confidence'], ['Coding', '6410 · Machinery & Equipment']].map(([label, value]) => `<div class="evidence-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></section>
  </div>`;
}

function dashboard() { workspace.innerHTML = `<div class="workspace-grid">${queue()}${invoicePanel(state.selected)}${relay(state.selected)}</div>`; }

function toVerify() {
  const rows = filtered().filter(inv => !inv.logOnly).map(inv => `<tr data-invoice="${inv.id}" tabindex="0" role="link" aria-label="Verify ${inv.id} from ${inv.vendor}"><td><strong>${inv.id}</strong><small>${inv.vendor}</small></td><td>${money(inv.amount)}</td><td>${inv.confidence}%</td><td>${inv.po}</td><td>${status(inv)}</td></tr>`).join('');
  workspace.innerHTML = pageIntro('To Verify', 'Review fields extracted through Rillion Capture before sending each invoice to the Invoice Log.', '<span class="status exception">5 need review</span>') + `<section class="panel verify-layout"><div class="verify-note"><h3>Capture verification</h3><p>Choose an invoice to inspect the source document, extracted fields, PO evidence, and next approval owner.</p><div class="mini-metrics"><div><strong>98%</strong><span>field confidence</span></div><div><strong>3m 42s</strong><span>average review</span></div></div></div><div class="table-wrap">${rows ? dataTable(['Invoice', 'Amount', 'Confidence', 'PO number', 'Next step'], rows) : emptyState('No invoices to verify', 'Try a different search term.')}</div></section>`;
}

function invoiceLog() {
  const matches = filtered().filter(inv => state.logFilter === 'all' || (state.logFilter === 'ai-match' ? inv.aiMatched : state.logFilter === 'approved' ? state.approved.has(inv.id) : inv.type === state.logFilter));
  const filters = [['all', 'All invoices'], ['ai-match', 'AI matched'], ['approval', 'In approval'], ['exception', 'Exceptions'], ['approved', 'Approved']];
  const health = (tone, label) => `<span class="log-health ${tone}"><span aria-hidden="true"></span>${label}</span>`;
  const account = (tone, label) => `<span class="account-chip ${tone}"><span aria-hidden="true"></span>${label}</span>`;
  const logDate = value => { const [month, day, year] = value.replace(',', '').split(' '); return `${String(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month) + 1).padStart(2, '0')}/${day.padStart(2, '0')}/${year}`; };
  const number = value => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const rows = matches.map(inv => {
    const proposal = inv.aiMatched ? account(inv.matchTone, 'AI generated') : inv.type === 'exception' ? account('bad', inv.flowProposal) : inv.flowProposal;
    const posting = inv.accountPosting.startsWith('AI generated') ? account(inv.matchTone, 'AI generated') : inv.accountPosting === 'Review required' ? account('bad', inv.accountPosting) : inv.accountPosting;
    const purchaseOrder = inv.matchBasis === 'contract' ? '—' : `<strong>${inv.po}</strong>${health(inv.poTone, inv.po === 'Non-PO' ? 'Non-PO verified' : inv.poTone === 'good' ? 'PO matched' : inv.poTone === 'warn' ? 'PO variance' : 'PO missing')}`;
    const contract = inv.contract ? `<strong>${inv.contract}</strong>${inv.matchBasis === 'contract' ? health('good', 'Contract matched') : ''}` : '—';
    return `<tr data-invoice="${inv.id}" tabindex="0" role="link" aria-label="Open ${inv.id} from ${inv.vendor}"><td>${inv.company || 30}</td><td><strong>${inv.vendor}</strong><small>${inv.id}</small></td><td>${inv.vendorInvoice}</td><td>${proposal}</td><td>${posting}</td><td>${logDate(inv.accountingDate)}</td><td><span class="date-chip">${logDate(inv.due)}</span></td><td class="numeric">${number(inv.amount)}</td><td class="numeric">${number(inv.tax || 0)}</td><td class="numeric">${number(inv.taxRate || 0)}</td><td>${inv.currency}</td><td>${inv.information || (inv.type === 'exception' ? 'Review required' : 'Matching complete')}</td><td>${purchaseOrder}</td><td>${contract}</td><td>${health(inv.matchTone, inv.aiMatched ? `AI matched ${inv.match}%` : inv.matchTone === 'good' ? `Matched ${inv.match}%` : inv.matchTone === 'warn' ? `Review ${inv.match}%` : `Exception ${inv.match}%`)}</td><td>${status(inv)}</td></tr>`;
  }).join('');
  workspace.innerHTML = pageIntro('Invoice Log', 'Follow every captured invoice from AP review through approval and transfer.', '<button class="primary-button" data-view="to-verify">Open To Verify</button>') + `<div class="invoice-log-toolbar"><div class="filter-tabs" aria-label="Filter invoice log">${filters.map(([id, label]) => `<button data-log-filter="${id}" aria-pressed="${state.logFilter === id}">${label}</button>`).join('')}</div><div class="log-legend" aria-label="Invoice log status key">${health('good', 'Matched')}${health('warn', 'Review')}${health('bad', 'Exception')}</div></div><section class="panel table-wrap invoice-log-table">${rows ? dataTable(['Company', 'Vendor', "Vendor's inv. no.", 'Flow proposal', 'Account posting', 'Accounting date', 'Due date', 'Total', 'Tax', 'Tax %', 'Currency', 'Information', 'Purchase order', 'Contract', 'Match', 'Status'], rows) : emptyState('No matching invoices', 'Clear the search or choose another status.')}</section>`;
}

function documentStatus(doc) { const outcome = state.documentOutcomes.get(doc.id); return outcome === 'approved' ? 'processed' : outcome || doc.status; }
function documentStatusLabel(value) { return documentTabs.find(([id]) => id === value)?.[1] || (value === 'approved' ? 'Approved' : value); }

function documentsInbox() {
  const companies = [...new Set(documents.map(doc => doc.company))];
  const types = [...new Set(documents.map(doc => doc.type))];
  const matches = documents.filter(doc => documentStatus(doc) === state.documentTab && (state.documentCompany === 'all' || doc.company === state.documentCompany) && (state.documentType === 'all' || doc.type === state.documentType));
  const tabs = documentTabs.map(([id, label]) => {
    const count = documents.filter(doc => documentStatus(doc) === id).length;
    return `<button data-document-tab="${id}" aria-pressed="${state.documentTab === id}"><span class="document-tab-mark" aria-hidden="true"></span>${label}<small>${count}</small></button>`;
  }).join('');
  const rows = matches.map(doc => `<tr data-document-row><td><span class="document-state ${documentStatus(doc)}">${documentStatusLabel(documentStatus(doc))}</span></td><td>${doc.arrived}</td><td>${doc.type}</td><td><button class="table-link" data-document="${doc.id}" aria-label="Open ${doc.name}">${doc.name}</button></td><td>${doc.description}</td><td>${doc.created}</td><td>${doc.createdBy}</td><td>${doc.lines}</td><td>${doc.id.replace('DOC-', '')}</td></tr>`).join('');
  workspace.innerHTML = pageIntro('Documents', 'Route check requests, reimbursements, and supporting records through role-based review.', '<span class="simulation-label">Synthetic document workspace</span>') + `<section class="panel document-inbox"><div class="document-controls"><div class="document-tabs" aria-label="Document status">${tabs}</div><div class="document-filters"><label>Company<select id="document-company"><option value="all">All companies</option>${companies.map(company => `<option value="${company}" ${state.documentCompany === company ? 'selected' : ''}>${company}</option>`).join('')}</select></label><label>Document type<select id="document-type"><option value="all">All document types</option>${types.map(type => `<option value="${type}" ${state.documentType === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label></div></div><div class="table-wrap">${rows ? dataTable(['Status', 'Arrived', 'Document type', 'Name', 'Description', 'Created', 'Created by', 'Lines', 'Document ID'], rows) : emptyState('No documents in this view', 'Choose another status, company, or document type.')}</div></section>`;
}

function documentDetail() {
  const doc = state.selectedDocument;
  const outcome = state.documentOutcomes.get(doc.id);
  const currentStatus = documentStatus(doc);
  const complete = currentStatus === 'processed';
  const index = documents.findIndex(item => item.id === doc.id);
  const statusCopy = outcome === 'approved' ? '<span class="status paid">Approved</span>' : `<span class="status ${currentStatus === 'return-to-ap' ? 'exception' : complete ? 'match' : 'approval'}">${documentStatusLabel(currentStatus)}</span>`;
  workspace.innerHTML = `<div class="document-toolbar"><button data-view="documents">← Documents</button><span>${index + 1} of ${documents.length}</span><button data-action="document-prev" ${index === 0 ? 'disabled' : ''}>Previous</button><button data-action="document-next" ${index === documents.length - 1 ? 'disabled' : ''}>Next</button><button data-action="document-save">Save in simulation</button><button class="document-approve" data-action="document-approve" ${complete ? 'disabled' : ''}>${outcome === 'approved' ? 'Approved' : complete ? 'Processed' : 'Approve'}</button><button data-action="document-return">Return to AP</button><button data-action="document-email">Send to email</button></div>
    <div class="document-detail-grid">
      <section class="panel document-preview"><div class="document-pane-title">Document image</div><div class="document-paper"><div class="request-brand"><strong>Northstar Manufacturing</strong><span>${doc.documentNo}</span></div><h2>${doc.type}</h2><p class="request-subtitle">Non-PO payment authorization · synthetic demonstration record</p><div class="request-grid"><div><span>Document number</span><strong>${doc.documentNo}</strong></div><div><span>Submission date</span><strong>${doc.created}</strong></div><div><span>Requested pay date</span><strong>June 5, 2026</strong></div><div><span>Request category</span><strong>${doc.requestCategory}</strong></div></div><h3>Requester and entity</h3><div class="request-grid"><div><span>Requester name</span><strong>${doc.createdBy}</strong></div><div><span>Department</span><strong>Procurement</strong></div><div><span>Company</span><strong>${doc.company}</strong></div><div><span>Responsible role</span><strong>${doc.responsibleRole}</strong></div></div><h3>Payee</h3><div class="request-grid"><div><span>Payee name</span><strong>${doc.payee}</strong></div><div><span>Payment method</span><strong>Electronic check</strong></div></div><div class="request-total"><span>Net amount payable</span><strong>${money(doc.amount)}</strong></div></div></section>
      <section class="panel document-fields"><div class="document-pane-title">Document</div><dl><dt>Document ID</dt><dd>${doc.id.replace('DOC-', '')}</dd><dt>Document type</dt><dd>${doc.type}</dd><dt>Company</dt><dd>${doc.company}</dd><dt>Name</dt><dd>${doc.name}</dd><dt>Description</dt><dd>${doc.description}</dd><dt>Created by user</dt><dd>${doc.createdBy}</dd><dt>Responsible role</dt><dd>${doc.responsibleRole}</dd><dt>Status</dt><dd>${statusCopy}</dd></dl><h3>Index</h3><div class="document-index">Requester and entity<br>Payee<br>Payment detail</div></section>
      <div class="document-side-stack"><section class="panel document-flow"><div class="document-pane-title">Flow</div><div class="flow-role done">AP review</div><span aria-hidden="true">↓</span><div class="flow-role ${complete ? 'done' : 'active'}">${doc.responsibleRole}</div></section><section class="panel"><div class="document-pane-title">Document lines</div><div class="table-wrap">${dataTable(['Approved', 'Registered', 'Description', 'Filename'], `<tr><td>${complete ? 'Yes' : 'Waiting'}</td><td>${doc.responsibleRole}</td><td>${doc.name}</td><td>${doc.documentNo}.pdf</td></tr>`)}</div></section><section class="panel"><div class="document-pane-title">Comments</div><div class="empty compact"><p>No comments yet. This synthetic record is ready for review.</p></div></section></div>
    </div>`;
}

function contractsInbox() {
  const rows = contracts.map(contract => `<tr data-contract-row><td><button class="table-link" data-contract="${contract.id}" aria-label="Open ${contract.name}">${contract.number}</button><small>${contract.id}</small></td><td><strong>${contract.name}</strong><small>${contract.partner}</small></td><td><span class="status match">${contract.status}</span></td><td>${contract.validFrom}</td><td>${contract.validTo}</td><td>${contract.renewal}</td><td class="numeric">${money(contract.annualValue)}</td></tr>`).join('');
  workspace.innerHTML = pageIntro('Contracts', 'Open an agreement to review its source, matching rules, validity, approval flow, and supporting files.', '<span class="simulation-label">Synthetic contract workspace</span>') + `<section class="panel contract-register"><div class="contract-register-summary"><div><strong>8</strong><span>active agreements</span></div><div><strong>6</strong><span>enabled for matching</span></div><div><strong>2</strong><span>renew within 90 days</span></div></div><div class="table-wrap">${dataTable(['Contract no.', 'Name and partner', 'Status', 'Valid from', 'Valid to', 'Renewal', 'Annual value'], rows)}</div></section>`;
}

function contractImage(contract) {
  return `<div class="contract-paper"><div class="contract-vendor"><div class="contract-vendor-mark">${contract.partner.split(' ').map(word => word[0]).join('').slice(0, 2)}</div><div><strong>${contract.partner}</strong><span>Professional services · synthetic agreement</span></div><small>Invoice #${contract.invoiceNo}<br>Issued ${contract.issueDate}</small></div><h2>${contract.name}</h2><p>Thank you for your business.</p><div class="contract-bill"><div><span>Customer</span><strong>Northstar Manufacturing</strong><small>1200 Foundry Lane<br>Indianapolis, IN 46202</small></div><div><span>Invoice details</span><strong>Service date ${contract.issueDate}</strong><small>${contract.description}</small></div><div><span>Payment</span><strong>Due ${contract.dueDate}</strong><small>${contract.currency}</small></div></div><div class="contract-line"><strong>Items</strong><span>Quantity</span><span>Price</span><span>Amount</span></div><div class="contract-line contract-line-item"><span>${contract.line}</span><span>1</span><span>${money(contract.total)}</span><span>${money(contract.total)}</span></div><div class="contract-paper-total"><span>Total due</span><strong>${money(contract.total + contract.tax)}</strong></div></div>`;
}

function contractTabPanel(contract) {
  if (state.contractTab === 'account-posting') return `<div class="contract-tab-panel"><div class="contract-posting"><div><span>Account posting proposal</span><strong>${contract.posting}</strong></div><div><span>Use coding from invoice</span><strong>No</strong></div><div><span>Cost owner</span><strong>${contract.role}</strong></div></div></div>`;
  if (state.contractTab === 'attachments') return `<div class="contract-tab-panel"><div class="table-wrap">${dataTable(['Registered', 'Description', 'Filename'], `<tr><td>${contract.role}</td><td>${contract.line}</td><td><button class="table-link" data-action="contract-attachment">${contract.attachment}</button></td></tr>`)}</div></div>`;
  return `<div class="contract-tab-panel"><div class="table-wrap">${dataTable(['Approve', 'Approved', 'Registered', 'Description', 'Filename'], `<tr><td><input type="checkbox" aria-label="Approve ${contract.line}"></td><td>Waiting</td><td>${contract.role}</td><td>${contract.line}</td><td>${contract.attachment}</td></tr>`)}</div></div>`;
}

function contractDetail() {
  const contract = state.selectedContract;
  const index = contracts.findIndex(item => item.id === contract.id);
  const fields = [
    ['Contract ID', contract.id.replace('CT-', '')], ['Created by', contract.createdBy], ['Authorized by', contract.authorizedBy], ['Company', contract.company], ['Contract no.', contract.number], ['Name', contract.name], ['Description', contract.description], ['Contract status', contract.status], ['Contract total', money(contract.total)], ['Valid from', contract.validFrom], ['Valid to', contract.validTo], ['Term of notice', `${contract.notice} months`], ['Automatic extension', `${contract.extension} months`], ['Currency', contract.currency], ['Net amount', money(contract.total)], ['Tax amount', money(contract.tax)], ['Invoice match flow', contract.flow], ['Partial match flow', contract.partialFlow], ['Role on direct recording', contract.role], ['Account posting proposal', contract.posting]
  ];
  const tabs = [['contract-lines', 'Contract lines'], ['account-posting', 'Account posting'], ['attachments', 'Comments/attachments']];
  workspace.innerHTML = `<div class="contract-toolbar"><button data-view="contracts">← Contracts</button><span>${index + 1} of ${contracts.length}</span><button data-action="contract-prev" ${index === 0 ? 'disabled' : ''}>Previous</button><button data-action="contract-next" ${index === contracts.length - 1 ? 'disabled' : ''}>Next</button><button data-action="contract-copy">Create new as a copy</button><button class="contract-save" data-action="contract-save">Save in simulation</button><button data-action="contract-options">Options</button></div><div class="contract-detail-grid"><section class="panel contract-preview"><div class="document-pane-title">Contract image</div>${contractImage(contract)}</section><section class="panel contract-fields"><div class="document-pane-title">Contracts</div><div class="contract-field-list">${fields.map(([label, value], fieldIndex) => `<label><span>${label}</span>${fieldIndex === 6 ? `<textarea rows="3">${escapeHtml(value)}</textarea>` : `<input value="${escapeHtml(value)}" ${fieldIndex < 3 ? 'readonly' : ''}>`}</label>`).join('')}</div></section><div class="contract-side"><section class="panel contract-flow"><div class="document-pane-title">Flow</div><div class="flow-role done">Accounts Payable</div><span aria-hidden="true">↓</span><div class="flow-role done">CFO</div></section><section class="panel contract-tabs"><div class="contract-tab-list" role="tablist" aria-label="Contract information">${tabs.map(([id, label]) => `<button role="tab" data-contract-tab="${id}" aria-selected="${state.contractTab === id}">${label}</button>`).join('')}</div>${contractTabPanel(contract)}</section></div></div>`;
}

function approvalReport() {
  const filters = [['all', 'All decisions'], ['waiting', 'Waiting'], ['approved', 'Approved']];
  const approvalInvoices = invoices.filter(requiresAction);
  const matches = approvalInvoices.filter(inv => state.approvalFilter === 'all' || (state.approvalFilter === 'approved' ? state.approved.has(inv.id) : !state.approved.has(inv.id)));
  const roles = approvalRoles.filter(role => state.roleFilter === 'all' || role.id === state.roleFilter);
  const waiting = approvalInvoices.filter(inv => !state.approved.has(inv.id) && (state.roleFilter === 'all' || inv.role === state.roleFilter)).length;
  const groups = roles.map(role => {
    const decisions = matches.filter(inv => inv.role === role.id);
    const rows = decisions.map(inv => `<tr data-invoice="${inv.id}" tabindex="0" role="link" aria-label="Open ${inv.id} assigned to ${inv.owner}"><td>${inv.owner}</td><td><strong>${inv.id}</strong><small>${inv.vendor}</small></td><td>${money(inv.amount)}</td><td>${state.approved.has(inv.id) ? 'Completed today' : inv.due}</td><td>${state.approved.has(inv.id) ? '<span class="status paid">Approved</span>' : '<span class="status approval">Waiting</span>'}</td></tr>`).join('');
    return `<section class="panel role-group"><div class="role-group-head"><div><h3>${role.label}</h3><p>${role.description}</p></div><span>${decisions.length} ${decisions.length === 1 ? 'approval' : 'approvals'}</span></div>${rows ? `<div class="table-wrap">${dataTable(['Approver', 'Invoice', 'Amount', 'Decision date', 'Status'], rows)}</div>` : emptyState(`No ${state.approvalFilter === 'approved' ? 'approved' : 'waiting'} decisions`, 'Choose another status or approval role.')}</section>`;
  }).join('');
  workspace.innerHTML = pageIntro('Approval', 'Choose a role to see its approval work, decision owner, due date, and status.', '<button class="primary-button" data-action="export">Download synthetic CSV</button>') + `<div class="approval-overview"><section class="panel approval-metric"><strong>1.8 days</strong><span>average approval cycle</span></section><section class="panel approval-metric"><strong>92%</strong><span>approved on time</span></section><section class="panel approval-metric"><strong>${waiting}</strong><span>waiting in selected roles</span></section></div><div class="filter-tabs" aria-label="Filter approval report">${filters.map(([id, label]) => `<button data-approval-filter="${id}" aria-pressed="${state.approvalFilter === id}">${label}</button>`).join('')}</div><div class="role-groups">${groups}</div>`;
}

function analytics() {
  const report = analyticsReports[state.analytics];
  workspace.innerHTML = pageIntro('Rillion Analytics', 'Explore representative Analytics views in the same board order as the Rillion platform.', `<span class="analytics-count">${state.analytics + 1} of ${analyticsReports.length}</span>`) + `<div class="analytics-layout"><nav class="panel analytics-menu" aria-label="Analytics boards">${analyticsReports.map((item, index) => `${index === 0 || item.group !== analyticsReports[index - 1].group ? `<p class="analytics-group">${item.group}</p>` : ''}<button data-analytics="${index}" aria-current="${index === state.analytics ? 'page' : 'false'}"><span>${item.title}</span><small>${index === state.analytics ? 'Viewing now' : 'Open board'}</small></button>`).join('')}</nav><section class="panel analytics-stage"><div class="analytics-head"><div><span class="analytics-board-group">${report.group}</span><h2>${report.title}</h2><p>${report.copy}</p></div><div class="analytics-actions"><button class="quiet-control" data-action="analytics-prev" ${state.analytics === 0 ? 'disabled' : ''}>Previous</button><button class="primary-button" data-action="analytics-next">${state.analytics === analyticsReports.length - 1 ? 'Back to first' : 'Next board'}</button></div></div><button class="analytics-canvas" data-action="analytics-next" aria-label="Continue from ${report.title} to the next Analytics board"><span class="analytics-image-frame"><img src="${report.image}" alt="${report.title} Analytics dashboard with demonstration data"></span><span class="analytics-continue">Click the board to continue</span></button><p class="reference-note">Reference screen from Rillion Analytics · demonstration data</p></section></div>`;
}

function reports() {
  workspace.innerHTML = pageIntro('AP performance', 'A synthetic view of invoice throughput, exceptions, and approval speed.', '<button class="primary-button" data-action="export">Download synthetic CSV</button>') + `<div class="report-grid"><section class="panel"><div class="panel-head"><h3>Invoices processed</h3><span>Last 6 months</span></div><div class="chart">${[54, 66, 58, 81, 74, 92].map((value, index) => `<div class="bar" style="height:${value}%"><span>${['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][index]}</span></div>`).join('')}</div></section><section class="panel"><div class="panel-head"><h3>Operational health</h3></div><div class="metric-list">${[['94%', 'touchless match'], ['1.8 days', 'approval cycle'], ['3.2%', 'exception rate'], ['100%', 'audit trail coverage']].map(([value, label]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div></section></div>`;
}

const paymentTabFor = payment => state.paymentMoves.get(payment.id) || payment.tab;

function paymentTabCount(tab) {
  const base = paymentTabs.find(item => item[0] === tab)[2];
  return payments.reduce((count, payment) => {
    const current = paymentTabFor(payment);
    if (current === payment.tab) return count;
    if (payment.tab === tab) return count - 1;
    if (current === tab) return count + 1;
    return count;
  }, base);
}

function paymentRow(payment) {
  const selected = state.paymentSelection.has(payment.id);
  const select = `<td><input type="checkbox" data-payment-select="${payment.id}" aria-label="Select invoice ${payment.id}" ${selected ? 'checked' : ''}></td>`;
  const invoice = `<td><button class="payment-link" data-payment-invoice="${payment.id}">${payment.id}</button></td>`;
  const common = `${invoice}<td>${payment.company}</td><td>${payment.vendor}</td><td>${payment.invoiceDate}</td>`;
  if (state.paymentTab === 'ready') return `<tr>${select}${common}<td>${payment.dueDate}</td><td>${money(payment.amount)}</td><td>${payment.method}</td><td>${payment.approver}</td><td>${payment.approvalDate}</td></tr>`;
  if (state.paymentTab === 'awaiting') return `<tr>${common}<td>${payment.dueDate}</td><td>${money(payment.amount)}</td><td>${payment.approver}</td><td><span class="status approval">${payment.status}</span></td></tr>`;
  if (state.paymentTab === 'in-progress') return `<tr>${common}<td>${money(payment.amount)}</td><td>${payment.method}</td><td>${payment.sentBy || 'Alex Nguyen'}</td><td>${payment.sentOn || 'Today'}</td><td><span class="status match">${payment.status || 'Submitted'}</span></td></tr>`;
  return `<tr>${common}<td>${money(payment.amount)}</td><td>${payment.method}</td><td>${payment.sentBy || 'Alex Nguyen'}</td><td>${payment.sentOn || 'Today'}</td><td>${payment.paymentDate || 'Today'}</td><td><button class="payment-link" data-payment-reference="${payment.reference || `SIM-${payment.id.slice(-4)}`}">${payment.reference || `SIM-${payment.id.slice(-4)}`}</button></td><td><span class="status paid">${payment.status || 'Settled'}</span></td></tr>`;
}

function paymentsPage() {
  const query = state.paymentQuery.toLowerCase().trim();
  const dateField = state.paymentTab === 'completed' ? 'paymentDate' : state.paymentTab === 'in-progress' ? 'invoiceDate' : 'dueDate';
  const dateLabel = state.paymentTab === 'completed' ? 'Payment date' : state.paymentTab === 'in-progress' ? 'Invoice date' : 'Due date';
  const records = payments.filter(payment => paymentTabFor(payment) === state.paymentTab)
    .filter(payment => !query || `${payment.id} ${payment.vendor}`.toLowerCase().includes(query))
    .filter(payment => state.paymentVendor === 'all' || payment.vendor === state.paymentVendor)
    .filter(payment => state.paymentMethod === 'all' || payment.method === state.paymentMethod)
    .filter(payment => !state.paymentDate || (payment[dateField] && new Date(payment[dateField]) >= new Date(`${state.paymentDate}T00:00:00`)));
  const vendors = [...new Set(payments.map(payment => payment.vendor))].sort();
  const methods = [...new Set(payments.map(payment => payment.method))].sort();
  const selectedCount = state.paymentSelection.size;
  const heads = {
    ready: ['<span class="sr-only">Select</span>', 'Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Due date', 'Amount', 'Payment method', 'Last approver(s)', 'Invoice approval date'],
    awaiting: ['Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Due date', 'Amount', 'Current approver', 'Status'],
    'in-progress': ['Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Amount', 'Payment method', 'Payment sent by', 'Payment sent on', 'Status'],
    completed: ['Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Amount', 'Payment method', 'Payment sent by', 'Payment sent on', 'Payment date', 'Payment reference ID', 'Status']
  }[state.paymentTab];
  const total = records.reduce((sum, payment) => sum + payment.amount, 0);
  const batchActions = state.paymentTab === 'ready' ? `<div class="payment-batch"><button class="icon-control" data-action="payment-export" aria-label="Download synthetic payment list">↓</button><button data-action="payment-outside" ${selectedCount ? '' : 'disabled'}>Pay outside Rillion</button><button data-action="payment-send" ${selectedCount ? '' : 'disabled'}>Send for payment</button><span>${selectedCount ? `${selectedCount} selected` : 'Select invoices to continue'}</span></div>` : '<div class="payment-batch"><button class="icon-control" data-action="payment-export" aria-label="Download synthetic payment list">↓</button></div>';
  workspace.innerHTML = `<div class="payments-head"><div><h2>Payments</h2><div class="payment-tabs" role="tablist" aria-label="Payment status">${paymentTabs.map(([id, label]) => `<button role="tab" data-payment-tab="${id}" aria-selected="${state.paymentTab === id}">${label} <span>(${paymentTabCount(id)})</span></button>`).join('')}</div></div><div class="payment-head-actions"><button data-action="payment-manage">Manage</button><button data-action="payment-portal">Payment portal ↗</button></div></div>
    <section class="panel payments-panel"><div class="payment-filters"><label><span>Invoice number</span><input id="payment-query" value="${escapeHtml(state.paymentQuery)}" placeholder="Invoice number"></label><label><span>Vendor</span><select id="payment-vendor"><option value="all">Name or number</option>${vendors.map(vendor => `<option ${state.paymentVendor === vendor ? 'selected' : ''}>${vendor}</option>`).join('')}</select></label><label><span>Payment method</span><select id="payment-method"><option value="all">All methods</option>${methods.map(method => `<option ${state.paymentMethod === method ? 'selected' : ''}>${method}</option>`).join('')}</select></label><label class="payment-date"><span>${dateLabel}</span><input id="payment-date" type="date" value="${state.paymentDate}" aria-label="${dateLabel} from"></label></div>${batchActions}<div class="table-wrap payment-table">${records.length ? dataTable(heads, records.map(paymentRow).join('')) : emptyState('No matching payments', 'Clear a filter or choose another payment status.')}</div><div class="payment-total"><span>Showing ${records.length} representative ${records.length === 1 ? 'invoice' : 'invoices'} · ${paymentTabCount(state.paymentTab)} total</span><strong>${money(total)} USD</strong></div></section>`;
}

function tablePage(kind) {
  const content = {
    tasks: ['My tasks', 'Everything currently waiting for action.', ['Invoice', 'Vendor', 'Amount', 'Purchase order', 'Status'], filtered().filter(requiresAction).map(inv => [inv.id, inv.vendor, money(inv.amount), inv.po, state.approved.has(inv.id) ? 'Approved' : inv.status])],
    requisitions: ['Requisitions', 'Requested spend, ownership, and fulfillment status.', ['Requisition', 'Requester', 'Vendor', 'Amount', 'Status'], invoices.map((inv, index) => [`REQ-${4021 + index}`, ['Taylor Brooks', 'Avery Morgan', 'Jordan Lee'][index % 3], inv.vendor, money(inv.amount), index < 3 ? 'Converted to PO' : 'In approval'])]
  }[kind];
  const [title, copy, heads, rowData] = content;
  const rows = rowData.map(row => `<tr ${String(row[0]).startsWith('INV') ? `data-invoice="${row[0]}" tabindex="0" role="link" aria-label="Open ${row[0]} from ${row[1]}"` : ''}>${row.map((cell, index) => `<td>${index === heads.length - 1 ? `<span class="status ${String(cell).includes('Exception') ? 'exception' : 'match'}">${cell}</span>` : cell}</td>`).join('')}</tr>`).join('');
  workspace.innerHTML = pageIntro(title, copy, '<button class="primary-button" data-action="tour">Show me how it works</button>') + `<section class="panel table-wrap">${rows ? dataTable(heads, rows) : emptyState('No matching results', 'Try an invoice number, vendor, purchase order, or owner.')}</section>`;
}

function overviewPage(kind) {
  const pages = {
    profile: ['My profile', 'Your demo identity and approval authority.', [['Role', 'AP Manager'], ['Company', 'Northstar Manufacturing'], ['Approval limit', '$50,000'], ['Language', 'English']]],
    budget: ['Budget requests', 'Plan and approve spend before it becomes a requisition.', [['Open requests', '4'], ['Awaiting your approval', '2'], ['Approved this month', '11'], ['Available budget', '$184,200']]],
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
  document.querySelector('#role-select').value = state.roleFilter;
  document.querySelector('#page-title').textContent = state.view === 'dashboard' ? 'Good morning, Alex' : labels[state.view] || 'Rillion';
  if (state.view === 'dashboard') dashboard();
  else if (state.view === 'to-verify') toVerify();
  else if (state.view === 'invoice-log') invoiceLog();
  else if (state.view === 'documents') documentsInbox();
  else if (state.view === 'document-detail') documentDetail();
  else if (state.view === 'contracts') contractsInbox();
  else if (state.view === 'contract-detail') contractDetail();
  else if (state.view === 'approval-report') approvalReport();
  else if (state.view === 'analytics') analytics();
  else if (state.view === 'reports') reports();
  else if (state.view === 'payments') paymentsPage();
  else if (['tasks', 'requisitions'].includes(state.view)) tablePage(state.view);
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
  ['Track payments', 'Payments keeps approved invoices visible as they move from posting readiness to scheduled payment and ERP export.', 'payments'],
  ['Explore Analytics', 'Move through eleven boards in the same groups and order as the Rillion Analytics platform.', 'analytics']
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

function downloadPayments() {
  const csvCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
  const records = payments.filter(payment => paymentTabFor(payment) === state.paymentTab);
  const csv = [['Invoice number', 'Company', 'Vendor', 'Invoice date', 'Due or payment date', 'Amount USD', 'Payment method', 'Status'], ...records.map(payment => [payment.id, payment.company, payment.vendor, payment.invoiceDate, payment.dueDate || payment.paymentDate || '', payment.amount, payment.method, payment.status || state.paymentTab])].map(row => row.map(csvCell).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const link = Object.assign(document.createElement('a'), { href: url, download: `rillion-synthetic-payments-${state.paymentTab}.csv` });
  link.click();
  URL.revokeObjectURL(url);
  toast(`Synthetic ${paymentTabs.find(([id]) => id === state.paymentTab)[1]} CSV downloaded`);
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
  const documentId = event.target.closest('[data-document]')?.dataset.document;
  const documentTab = event.target.closest('[data-document-tab]')?.dataset.documentTab;
  const contractId = event.target.closest('[data-contract]')?.dataset.contract;
  const contractTab = event.target.closest('[data-contract-tab]')?.dataset.contractTab;
  const logFilter = event.target.closest('[data-log-filter]')?.dataset.logFilter;
  const approvalFilter = event.target.closest('[data-approval-filter]')?.dataset.approvalFilter;
  const analyticsIndex = event.target.closest('[data-analytics]')?.dataset.analytics;
  const paymentTab = event.target.closest('[data-payment-tab]')?.dataset.paymentTab;
  const paymentInvoice = event.target.closest('[data-payment-invoice]')?.dataset.paymentInvoice;
  const paymentReference = event.target.closest('[data-payment-reference]')?.dataset.paymentReference;
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (group) { state.expanded.has(group) ? state.expanded.delete(group) : state.expanded.add(group); renderNav(); return; }
  if (view) { navigate(view); return; }
  if (invoice) { openInvoice(invoice); return; }
  if (documentId) { state.selectedDocument = documents.find(doc => doc.id === documentId) || state.selectedDocument; navigate('document-detail'); return; }
  if (documentTab) { state.documentTab = documentTab; documentsInbox(); return; }
  if (contractId) { state.selectedContract = contracts.find(contract => contract.id === contractId) || state.selectedContract; state.contractTab = 'contract-lines'; navigate('contract-detail'); return; }
  if (contractTab) { state.contractTab = contractTab; contractDetail(); return; }
  if (logFilter) { state.logFilter = logFilter; invoiceLog(); return; }
  if (approvalFilter) { state.approvalFilter = approvalFilter; approvalReport(); return; }
  if (analyticsIndex !== undefined) { state.analytics = Number(analyticsIndex); analytics(); return; }
  if (paymentTab) { state.paymentTab = paymentTab; state.paymentDate = ''; state.paymentSelection.clear(); paymentsPage(); return; }
  if (paymentInvoice) { toast(`Invoice ${paymentInvoice} opened in the synthetic payment list`); return; }
  if (paymentReference) { toast(`Payment reference ${paymentReference} opened for review`); return; }
  if (action === 'approve') { state.approved.add(state.selected.id); render(); toast(`${state.selected.id} approved and ready for payment`); }
  if (action === 'fields') { state.fieldsExpanded = !state.fieldsExpanded; render(); }
  if (action === 'reset') { state.approved.clear(); state.documentOutcomes.clear(); state.paymentSelection.clear(); state.paymentMoves.clear(); state.selected = invoices[0]; state.selectedDocument = documents[0]; state.selectedContract = contracts[0]; state.fieldsExpanded = false; state.logFilter = 'all'; state.approvalFilter = 'all'; state.roleFilter = 'all'; state.documentTab = 'being-checked'; state.documentCompany = 'all'; state.documentType = 'all'; state.contractTab = 'contract-lines'; state.paymentTab = 'ready'; state.paymentQuery = ''; state.paymentVendor = 'all'; state.paymentMethod = 'all'; state.paymentDate = ''; state.analytics = 0; state.view = 'dashboard'; state.query = ''; document.querySelector('#search').value = ''; history.replaceState(null, '', '#dashboard'); render(); toast('Demo reset'); }
  if (action === 'tour') { state.tour = 0; showTour(); }
  if (action === 'tour-next') { state.tour++; if (state.tour >= tours.length) { document.querySelector('#tour').hidden = true; state.tour = -1; toast('Tour complete — explore anything'); } else showTour(); }
  if (action === 'tour-close') { document.querySelector('#tour').hidden = true; state.tour = -1; }
  if (action === 'export') downloadReport();
  if (action === 'payment-export') downloadPayments();
  if (action === 'analytics-prev' && state.analytics > 0) { state.analytics--; analytics(); }
  if (action === 'analytics-next') { state.analytics = (state.analytics + 1) % analyticsReports.length; analytics(); }
  if (action === 'document-prev') { const index = documents.findIndex(doc => doc.id === state.selectedDocument.id); if (index > 0) { state.selectedDocument = documents[index - 1]; documentDetail(); } }
  if (action === 'document-next') { const index = documents.findIndex(doc => doc.id === state.selectedDocument.id); if (index < documents.length - 1) { state.selectedDocument = documents[index + 1]; documentDetail(); } }
  if (action === 'document-save') toast(`${state.selectedDocument.name} saved in this simulation`);
  if (action === 'document-approve') { state.documentOutcomes.set(state.selectedDocument.id, 'approved'); renderNav(); documentDetail(); toast(`${state.selectedDocument.name} approved`); }
  if (action === 'document-return') { state.documentOutcomes.set(state.selectedDocument.id, 'return-to-ap'); renderNav(); documentDetail(); toast(`${state.selectedDocument.name} returned to AP`); }
  if (action === 'document-email') toast('Synthetic email prepared — nothing was sent');
  if (action === 'contract-prev') { const index = contracts.findIndex(contract => contract.id === state.selectedContract.id); if (index > 0) { state.selectedContract = contracts[index - 1]; contractDetail(); } }
  if (action === 'contract-next') { const index = contracts.findIndex(contract => contract.id === state.selectedContract.id); if (index < contracts.length - 1) { state.selectedContract = contracts[index + 1]; contractDetail(); } }
  if (action === 'contract-copy') toast(`${state.selectedContract.name} opened as a synthetic copy`);
  if (action === 'contract-save') toast(`${state.selectedContract.name} saved in this simulation`);
  if (action === 'contract-options') toast('Contract options opened in this simulation');
  if (action === 'contract-attachment') toast(`${state.selectedContract.attachment} opened in this simulation`);
  if (action === 'payment-manage') toast('Payment settings opened in this simulation');
  if (action === 'payment-portal') toast('Synthetic payment portal preview — no external site opened');
  if (action === 'payment-send' || action === 'payment-outside') {
    const destination = action === 'payment-send' ? 'in-progress' : 'completed';
    const count = state.paymentSelection.size;
    state.paymentSelection.forEach(id => state.paymentMoves.set(id, destination));
    state.paymentSelection.clear();
    state.paymentTab = destination;
    paymentsPage();
    toast(`${count} ${count === 1 ? 'invoice' : 'invoices'} moved to ${destination === 'completed' ? 'Completed' : 'In progress'} in this simulation`);
  }
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

document.querySelector('#role-select').addEventListener('change', event => {
  state.roleFilter = event.target.value;
  navigate('approval-report');
});

document.addEventListener('change', event => {
  if (event.target.matches('#document-company')) { state.documentCompany = event.target.value; documentsInbox(); }
  if (event.target.matches('#document-type')) { state.documentType = event.target.value; documentsInbox(); }
  if (event.target.matches('#payment-query')) { state.paymentQuery = event.target.value; paymentsPage(); }
  if (event.target.matches('#payment-vendor')) { state.paymentVendor = event.target.value; paymentsPage(); }
  if (event.target.matches('#payment-method')) { state.paymentMethod = event.target.value; paymentsPage(); }
  if (event.target.matches('#payment-date')) { state.paymentDate = event.target.value; paymentsPage(); }
  if (event.target.matches('[data-payment-select]')) {
    event.target.checked ? state.paymentSelection.add(event.target.dataset.paymentSelect) : state.paymentSelection.delete(event.target.dataset.paymentSelect);
    paymentsPage();
  }
});

window.addEventListener('hashchange', () => {
  const view = location.hash.slice(1);
  if (allViews.includes(view)) { state.view = view; render(); }
});

render();
