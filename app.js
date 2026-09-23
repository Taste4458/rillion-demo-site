const svg = (path) => `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
const backButton = (label, attributes) => `<button class="back-button" ${attributes} aria-label="Back to ${label}">${svg('m15 18-6-6 6-6M9 12h10')}<span>Back to <strong>${label}</strong></span></button>`;

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
	analytics: svg('M4 19h16M6 16l4-5 3 2 5-7'),
};

const navTree = [
	{ id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
	{ id: 'profile', label: 'My profile', icon: 'profile' },
	{ id: 'tasks', label: 'My tasks', icon: 'tasks', badge: '3' },
	{ id: 'budget', label: 'Budget requests', icon: 'budget' },
	{
		id: 'requisitions',
		label: 'Requisitions',
		icon: 'requisitions',
		badge: '96',
	},
	{
		group: 'invoices',
		label: 'Invoices',
		icon: 'invoices',
		badge: '27',
		children: [
			{ id: 'to-verify', label: 'To Verify', badge: '5' },
			{ id: 'invoice-log', label: 'Invoice Log', badge: '128' },
		],
	},
	{ id: 'contracts', label: 'Contracts', icon: 'contracts', badge: '8' },
	{ id: 'documents', label: 'Documents', icon: 'documents', badge: '3' },
	{ id: 'payments', label: 'Payments', icon: 'payments' },
	{
		group: 'reports',
		label: 'Reports',
		icon: 'reports',
		children: [{ id: 'reports', label: 'AP performance' }],
	},
	{ id: 'administration', label: 'Administration', icon: 'administration' },
	{ id: 'system', label: 'System', icon: 'system' },
	{ id: 'analytics', label: 'Rillion Analytics', icon: 'analytics' },
];

const approvalRoles = [
	{
		id: 'ap-review',
		label: 'AP review',
		description: 'Validates coding, source evidence, and exceptions before approval.',
	},
	{
		id: 'department-manager',
		label: 'Department manager',
		description: 'Confirms the purchase, business purpose, and cost ownership.',
	},
	{
		id: 'finance-controller',
		label: 'Finance controller',
		description: 'Reviews financial control and final posting readiness.',
	},
];

const invoices = [
	{
		id: 'INV-20481',
		vendor: 'Atlas Industrial Supply',
		vendorInvoice: 'ASI-774383',
		amount: 12480,
		status: 'Ready to record',
		type: 'match',
		flowProposal: 'Directly to recording',
		accountPosting: '6410 · Equipment',
		accountingDate: 'Apr 2, 2026',
		currency: 'USD',
		po: '4500821',
		poTone: 'good',
		match: 100,
		matchTone: 'good',
		matchBasis: 'po',
		matchStatus: 'fully-matched',
		varianceLabel: 'No variance',
		varianceAmount: 0,
		approvalRequired: false,
		due: 'Apr 30, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 99,
		explanation: 'All purchase-order lines, quantities, unit prices, and delivered quantities match purchase order 4500821.',
		lines: [
			['Industrial gearbox — Model X200', 4, 2450],
			['Mounting kit', 4, 320],
			['Freight', 1, 1400],
		],
	},
	{
		id: 'INV-77821',
		vendor: 'Precision Tools Co.',
		vendorInvoice: 'PTC-55392',
		amount: 3265,
		status: 'Manager approval',
		type: 'approval',
		flowProposal: 'Department manager',
		accountPosting: '6420 · Tooling',
		accountingDate: 'Apr 6, 2026',
		currency: 'USD',
		po: '4500838',
		poTone: 'warn',
		match: 96,
		matchTone: 'warn',
		matchBasis: 'po',
		matchStatus: 'price-variance',
		varianceLabel: 'Price variance',
		varianceAmount: 130.6,
		due: 'May 4, 2026',
		owner: 'Jordan Lee',
		role: 'department-manager',
		confidence: 97,
		explanation: 'The supplier, item, and received quantity match purchase order 4500838, but the invoice unit price is 4% above the purchase-order price. Manager review is required.',
		lines: [['CNC tooling set', 1, 3265]],
	},
	{
		id: 'INV-78403',
		vendor: 'Midwest Safety Supply',
		vendorInvoice: 'MSS-40182',
		amount: 2180,
		status: 'Manager approval',
		type: 'approval',
		flowProposal: 'Department manager',
		accountPosting: '6440 · Safety supplies',
		accountingDate: 'Apr 7, 2026',
		currency: 'USD',
		po: '4500844',
		poTone: 'warn',
		match: 94,
		matchTone: 'warn',
		matchBasis: 'po',
		matchStatus: 'delivery-variance',
		varianceLabel: 'Delivery variance',
		varianceAmount: 280,
		due: 'May 6, 2026',
		owner: 'Jordan Lee',
		role: 'department-manager',
		confidence: 95,
		explanation: 'The invoiced quantity is greater than the delivered quantity on purchase order 4500844. Supplier, item, and unit price match; manager confirmation is required.',
		lines: [['Plant safety equipment', 2, 1090]],
	},
	{
		id: 'INV-80116',
		vendor: 'Pioneer Office Interiors',
		vendorInvoice: 'POI-28614',
		amount: 5940,
		status: 'Manager approval',
		type: 'approval',
		flowProposal: 'Department manager',
		accountPosting: '6120 · Office equipment',
		accountingDate: 'Apr 8, 2026',
		currency: 'USD',
		po: '4500847',
		poTone: 'warn',
		match: 92,
		matchTone: 'warn',
		matchBasis: 'po',
		matchStatus: 'price-variance',
		varianceLabel: 'Price variance',
		varianceAmount: 297,
		due: 'May 8, 2026',
		owner: 'Jordan Lee',
		role: 'department-manager',
		confidence: 93,
		explanation: 'The supplier, item, and received quantity match purchase order 4500847, but the invoice unit price is 5% above the purchase-order price. Manager review is required.',
		lines: [['Ergonomic workstations', 3, 1980]],
	},
	{
		id: 'INV-81742',
		vendor: 'Lakeview Electrical Services',
		vendorInvoice: 'LES-91726',
		amount: 4725,
		status: 'Manager approval',
		type: 'approval',
		flowProposal: 'Department manager',
		accountPosting: '6810 · Facility maintenance',
		accountingDate: 'Apr 10, 2026',
		currency: 'USD',
		po: '4500852',
		poTone: 'warn',
		match: 95,
		matchTone: 'warn',
		matchBasis: 'po',
		matchStatus: 'delivery-variance',
		varianceLabel: 'Delivery variance',
		varianceAmount: 525,
		due: 'May 10, 2026',
		owner: 'Jordan Lee',
		role: 'department-manager',
		confidence: 96,
		explanation: 'The invoice references purchase order 4500852 and the agreed service rate, but one completion receipt is missing. Rillion flagged the delivery variance for manager review.',
		lines: [['Panel inspection and repairs', 1, 4725]],
	},
	{
		id: 'INV-99314',
		vendor: 'Summit Packaging',
		vendorInvoice: 'SP-209875',
		amount: 8750,
		status: 'PO exception',
		type: 'exception',
		flowProposal: 'AP review',
		accountPosting: 'Review required',
		accountingDate: 'Apr 9, 2026',
		currency: 'USD',
		po: 'No PO',
		poTone: 'bad',
		match: 72,
		matchTone: 'bad',
		matchBasis: 'exception',
		matchStatus: 'po-missing',
		varianceLabel: 'Purchase order missing',
		varianceAmount: 8750,
		due: 'May 7, 2026',
		owner: 'AP review',
		role: 'ap-review',
		confidence: 84,
		explanation: 'No purchase order or contract reference was found. AP must confirm the supplier and coding before the invoice can enter approval.',
		lines: [['Protective packaging', 50, 175]],
	},
	{
		id: 'INV-82416',
		company: 30,
		vendor: 'Meridian Software Services',
		vendorInvoice: 'MSS-82416',
		amount: 8420,
		tax: 673.6,
		taxRate: 8,
		information: 'AI proposals ready for approval',
		status: 'AP review',
		type: 'approval',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6710',
		accountingDate: 'Apr 11, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 96,
		matchTone: 'good',
		matchBasis: 'non-po',
		matchStatus: 'ai-matched',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		due: 'May 11, 2026',
		owner: 'AP review',
		role: 'ap-review',
		confidence: 96,
		explanation: 'AI recognized a recurring software subscription, matched the vendor and service period to approved history, and proposed the AP review flow with account 6710.',
		lines: [['Annual planning software subscription', 1, 8420]],
	},
	{
		id: 'INV-82607',
		company: 30,
		vendor: 'Cedar Ridge Marketing',
		vendorInvoice: 'CRM-88914',
		amount: 4875,
		tax: 0,
		taxRate: 0,
		information: 'AI proposals need manager confirmation',
		status: 'Manager approval',
		type: 'approval',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6540',
		accountingDate: 'Apr 13, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 94,
		matchTone: 'warn',
		matchBasis: 'non-po',
		matchStatus: 'ai-review',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		due: 'May 13, 2026',
		owner: 'Jordan Lee',
		role: 'department-manager',
		confidence: 74,
		explanation: 'AI identified campaign services and proposed the prior marketing-services account 6540. Department manager confirmation is required because the campaign name is new.',
		lines: [['Spring campaign services', 1, 4875]],
	},
	{
		id: 'INV-82932',
		company: 30,
		vendor: 'GreenLine Waste Services',
		vendorInvoice: 'GLW-44052',
		amount: 2340,
		tax: 0,
		taxRate: 0,
		information: 'AI proposals ready for approval',
		status: 'AP review',
		type: 'approval',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6255',
		accountingDate: 'Apr 16, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 97,
		matchTone: 'good',
		matchBasis: 'non-po',
		matchStatus: 'ai-matched',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		due: 'May 16, 2026',
		owner: 'AP review',
		role: 'ap-review',
		confidence: 97,
		explanation: 'AI matched the recurring waste-service location and monthly billing pattern, then proposed the AP review flow and account 6255.',
		lines: [['Monthly waste services', 1, 2340]],
	},
	{
		id: 'INV-83148',
		company: 20,
		vendor: 'HarborPoint Insurance',
		vendorInvoice: 'HPI-260417',
		amount: 15600,
		tax: 0,
		taxRate: 0,
		information: 'AI proposals need controller confirmation',
		status: 'Finance review',
		type: 'approval',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6720',
		accountingDate: 'Apr 19, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 92,
		matchTone: 'warn',
		matchBasis: 'non-po',
		matchStatus: 'ai-review',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		due: 'May 19, 2026',
		owner: 'Morgan Patel',
		role: 'finance-controller',
		confidence: 68,
		explanation: 'AI matched the policy period and vendor to approved insurance invoices and proposed account 6720. Finance controller confirmation is required for the annual premium increase.',
		lines: [['Annual property insurance premium', 1, 15600]],
	},
	{
		id: 'INV-66102',
		vendor: 'Riverside Logistics',
		vendorInvoice: 'RL-88014',
		amount: 960,
		status: 'Finance review',
		type: 'approval',
		flowProposal: 'Finance controller',
		accountPosting: '6210 · Freight',
		accountingDate: 'Apr 12, 2026',
		currency: 'USD',
		po: '4500841',
		poTone: 'warn',
		match: 91,
		matchTone: 'warn',
		matchBasis: 'po',
		matchStatus: 'delivery-variance',
		varianceLabel: 'Delivery variance',
		varianceAmount: 120,
		due: 'May 12, 2026',
		owner: 'Morgan Patel',
		role: 'finance-controller',
		confidence: 94,
		explanation: 'Freight charges match purchase order 4500841, but one delivery receipt is incomplete. Finance review is required before posting.',
		lines: [['Regional freight', 1, 960]],
	},
	{
		id: 'INV-55277',
		vendor: 'Core Facility Services',
		vendorInvoice: 'CFS-44871',
		amount: 4320,
		status: 'Ready to record',
		type: 'match',
		flowProposal: 'Directly to recording',
		accountPosting: '6810 · Maintenance',
		accountingDate: 'Apr 15, 2026',
		currency: 'USD',
		po: '4500770',
		poTone: 'good',
		match: 100,
		matchTone: 'good',
		matchBasis: 'po',
		matchStatus: 'fully-matched',
		varianceLabel: 'No variance',
		varianceAmount: 0,
		approvalRequired: false,
		due: 'May 15, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 99,
		explanation: 'The maintenance line, quantity, price, and completed delivery match purchase order 4500770.',
		lines: [['Quarterly maintenance', 1, 4320]],
	},
	{
		id: 'INV-18044',
		company: 20,
		vendor: 'Brightwell Consulting',
		vendorInvoice: 'BC-94811',
		amount: 6480,
		tax: 0,
		taxRate: 0,
		information: 'AI proposals ready',
		status: 'AP review',
		type: 'match',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6530',
		accountingDate: 'Apr 17, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 99,
		matchTone: 'good',
		matchBasis: 'non-po',
		matchStatus: 'ai-matched',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		logOnly: true,
		due: 'May 17, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 99,
		explanation: 'AI recognized recurring advisory services from Brightwell Consulting and proposed the prior approved flow and account 6530 based on vendor history and invoice text.',
		lines: [['Advisory services', 1, 6480]],
	},
	{
		id: 'INV-18057',
		company: 20,
		vendor: 'Lumen Cloud Services',
		vendorInvoice: 'LCS-33081',
		amount: 12900,
		tax: 1032,
		taxRate: 8,
		information: 'AI proposals need review',
		status: 'AP review',
		type: 'match',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6710',
		accountingDate: 'Apr 18, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 97,
		matchTone: 'warn',
		matchBasis: 'non-po',
		matchStatus: 'ai-review',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		logOnly: true,
		due: 'May 18, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 79,
		explanation: 'AI matched the cloud subscription to prior Lumen invoices and proposed account 6710. The tax amount differs from the most recent pattern, so AP review remains required.',
		lines: [['Cloud platform subscription', 1, 12900]],
	},
	{
		id: 'INV-18063',
		company: 20,
		vendor: 'Harbor Office Services',
		vendorInvoice: 'HOS-77125',
		amount: 1840,
		tax: 147.2,
		taxRate: 8,
		information: 'AI proposals ready',
		status: 'AP review',
		type: 'match',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6110',
		accountingDate: 'Apr 20, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 95,
		matchTone: 'good',
		matchBasis: 'non-po',
		matchStatus: 'ai-matched',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		logOnly: true,
		due: 'May 20, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 96,
		explanation: 'AI identified the office-services description and repeated vendor pattern, then proposed the approved AP flow and account 6110.',
		lines: [['Office services', 1, 1840]],
	},
	{
		id: 'INV-18079',
		company: 30,
		vendor: 'Northstar Utilities',
		vendorInvoice: 'NU-405193',
		amount: 7215,
		tax: 0,
		taxRate: 0,
		information: 'AI proposals ready',
		status: 'AP review',
		type: 'match',
		flowProposal: 'AI generated',
		accountPosting: 'AI generated · 6250',
		accountingDate: 'Apr 22, 2026',
		currency: 'USD',
		po: 'Non-PO',
		poTone: 'good',
		match: 98,
		matchTone: 'good',
		matchBasis: 'non-po',
		matchStatus: 'ai-matched',
		varianceLabel: 'Non-PO',
		varianceAmount: 0,
		aiMatched: true,
		logOnly: true,
		due: 'May 22, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 99,
		explanation: 'AI recognized a recurring electric-utility invoice, matched the service period and company, and proposed account 6250 from approved history.',
		lines: [['Electric utility service', 1, 7215]],
	},
	{
		id: 'INV-18085',
		company: 30,
		vendor: 'Window Wizards',
		vendorInvoice: 'WW-00795',
		amount: 25,
		tax: 0,
		taxRate: 0,
		information: 'Contract match complete',
		contract: 'CT-0076',
		status: 'Ready to record',
		type: 'match',
		flowProposal: 'Directly to recording',
		accountPosting: 'Contract coding',
		accountingDate: 'Jul 22, 2026',
		currency: 'USD',
		po: '—',
		poTone: 'none',
		match: 100,
		matchTone: 'good',
		matchBasis: 'contract',
		matchStatus: 'fully-matched',
		varianceLabel: 'No variance',
		varianceAmount: 0,
		approvalRequired: false,
		logOnly: true,
		due: 'Aug 21, 2026',
		owner: 'AP automation',
		role: 'ap-review',
		confidence: 99,
		explanation: 'The vendor, service date, amount, and coding match active contract CT-0076, so the invoice can go directly to recording.',
		lines: [['Window cleaning', 1, 25]],
	},
];

const analyticsReports = [
	{
		group: 'AP Reports',
		title: 'Invoice log',
		image: 'assets/analytics/invoice-log.png',
		copy: 'Review invoices currently in the log, errors requiring attention, match status, and time waiting for transfer.',
	},
	{
		group: 'AP Reports',
		title: 'Active invoices',
		image: 'assets/analytics/active-invoices.png',
		leftRail: true,
		copy: 'See active invoice volume, flow status, invoice type, match status, role bottlenecks, and the underlying invoice list.',
	},
	{
		group: 'AP Reports',
		title: 'AP aging',
		image: 'assets/analytics/payables-aging.png',
		copy: 'Understand open liabilities by company, vendor, and aging band without reconciling multiple ERP screens.',
	},
	{
		group: 'Performance Tracking Reports',
		title: 'Invoice flow tracking',
		image: 'assets/analytics/invoice-flow-tracking.png',
		leftRail: true,
		copy: 'Follow invoice-flow activity, role processing time, users, bottlenecks, and the detailed transfer history.',
	},
	{
		group: 'Performance Tracking Reports',
		title: 'Invoice summary',
		image: 'assets/analytics/invoice-summary.png',
		leftRail: true,
		copy: 'Review invoice volume, matching and capture types, flow and coding proposals, automation success, and vendor concentration.',
	},
	{
		group: 'Business Reports',
		title: 'Spend report',
		image: 'assets/analytics/spend-report.png',
		copy: 'Follow monthly spend and invoice volume, then narrow the view by company, account, vendor, or object.',
	},
	{
		group: 'Business Reports',
		title: 'AP cash flow',
		image: 'assets/analytics/ap-cash-flow.png',
		copy: 'See upcoming payment demand by date, currency, company, and invoice status to support cash planning.',
	},
	{
		group: 'Business Reports',
		title: 'Vendor payment analyzer',
		image: 'assets/analytics/vendor-payment-analyzer.png',
		leftRail: true,
		copy: 'Compare vendor payment timing, terms, late and early payments, and invoice volume across companies.',
	},
	{
		group: 'Executive Dashboard',
		title: 'Executive dashboard',
		image: 'assets/analytics/executive-dashboard.png',
		leftRail: true,
		copy: 'Track invoice volume, processing time, successful flows, coding automation, and matched spend over time.',
	},
	{
		group: 'Procurement Reports',
		title: 'Procurement overview',
		image: 'assets/analytics/procurement-overview.png',
		leftRail: true,
		copy: 'Review purchase-order, delivery, invoice-match, currency, and item performance in one procurement view.',
	},
	{
		group: 'Procurement Reports',
		title: 'Procurement trend',
		image: 'assets/analytics/procurement-trend.png',
		leftRail: true,
		copy: 'Explore adjusted purchasing amounts over time with matching, vendor, order, item, and company filters.',
	},
];

const documentTabs = [
	['inbound', 'Inbound'],
	['to-be-processed', 'To be processed'],
	['being-checked', 'Being checked'],
	['processed', 'Processed'],
	['return-to-ap', 'Return to AP'],
];

const documents = [
	{
		id: 'DOC-10',
		arrived: 'May 22, 2026',
		type: 'Check request',
		name: 'Community grant request',
		description: 'Donation request for Habitat for Humanity',
		created: 'May 22, 2026',
		createdBy: 'Sam Carter',
		lines: 1,
		status: 'being-checked',
		company: 'Northstar Manufacturing',
		responsibleRole: 'Finance controller',
		amount: 5000,
		documentNo: 'CR-2026-04827',
		requestCategory: 'Donation',
		payee: 'Indianapolis Habitat for Humanity',
	},
	{
		id: 'DOC-11',
		arrived: 'May 22, 2026',
		type: 'Employee expense reimbursement',
		name: 'Lakeside trip',
		description: 'Hotel and travel reimbursement',
		created: 'May 22, 2026',
		createdBy: 'Sam Carter',
		lines: 1,
		status: 'being-checked',
		company: 'Northstar Manufacturing',
		responsibleRole: 'AP review',
		amount: 1840,
		documentNo: 'ER-2026-00518',
		requestCategory: 'Travel',
		payee: 'Taylor Brooks',
	},
	{
		id: 'DOC-9',
		arrived: 'May 19, 2026',
		type: 'Check request',
		name: 'Community sponsorship',
		description: 'Annual neighborhood sponsorship',
		created: 'May 19, 2026',
		createdBy: 'Matt Wilson',
		lines: 1,
		status: 'being-checked',
		company: 'Northstar Manufacturing',
		responsibleRole: 'Department manager',
		amount: 2500,
		documentNo: 'CR-2026-04791',
		requestCategory: 'Sponsorship',
		payee: 'Riverton Community Fund',
	},
	{
		id: 'DOC-12',
		arrived: 'May 23, 2026',
		type: 'Check request',
		name: 'Safety training deposit',
		description: 'Deposit for plant safety workshop',
		created: 'May 23, 2026',
		createdBy: 'Jordan Lee',
		lines: 2,
		status: 'inbound',
		company: 'Northstar Services',
		responsibleRole: 'AP review',
		amount: 3200,
		documentNo: 'CR-2026-04843',
		requestCategory: 'Training',
		payee: 'SafetyWorks Institute',
	},
	{
		id: 'DOC-8',
		arrived: 'May 18, 2026',
		type: 'Employee expense reimbursement',
		name: 'Customer workshop',
		description: 'Travel and workshop materials',
		created: 'May 18, 2026',
		createdBy: 'Avery Morgan',
		lines: 4,
		status: 'to-be-processed',
		company: 'Northstar Services',
		responsibleRole: 'AP review',
		amount: 2765,
		documentNo: 'ER-2026-00492',
		requestCategory: 'Travel',
		payee: 'Avery Morgan',
	},
	{
		id: 'DOC-7',
		arrived: 'May 16, 2026',
		type: 'Check request',
		name: 'Equipment certification',
		description: 'Annual equipment certification',
		created: 'May 16, 2026',
		createdBy: 'Alex Nguyen',
		lines: 1,
		status: 'processed',
		company: 'Northstar Manufacturing',
		responsibleRole: 'Finance controller',
		amount: 4125,
		documentNo: 'CR-2026-04762',
		requestCategory: 'Compliance',
		payee: 'Midwest Certification Group',
	},
	{
		id: 'DOC-6',
		arrived: 'May 15, 2026',
		type: 'Check request',
		name: 'Facility permit',
		description: 'Permit requires coding correction',
		created: 'May 15, 2026',
		createdBy: 'Morgan Patel',
		lines: 1,
		status: 'return-to-ap',
		company: 'Northstar Manufacturing',
		responsibleRole: 'AP review',
		amount: 890,
		documentNo: 'CR-2026-04741',
		requestCategory: 'Permit',
		payee: 'City of Riverton',
	},
];

const contracts = [
	{
		id: 'CT-0076',
		number: 'WW-SVC-2026-001',
		name: 'Window Wizards Biweekly Window Cleaning',
		partner: 'Window Wizards',
		description: 'Biweekly recurring window cleaning service',
		status: 'Active for matching',
		company: '30, Northstar Manufacturing',
		createdBy: 'Accounts Payable · Alex Nguyen',
		authorizedBy: 'CFO · Morgan Patel',
		validFrom: 'Jan 1, 2026',
		validTo: 'Dec 31, 2026',
		renewal: 'Dec 31, 2026',
		annualValue: 650,
		total: 25,
		tax: 0,
		notice: 3,
		extension: 0,
		currency: 'USD',
		flow: 'Directly to recording',
		partialFlow: 'According to reference matching',
		role: 'Accounts Payable',
		posting: 'Standard',
		line: 'Windows',
		attachment: 'Window Wizards - 00795 Legacy.pdf',
		invoiceNo: '00795',
		issueDate: 'Jul 22, 2026',
		dueDate: 'Aug 21, 2026',
	},
	{
		id: 'CT-0075',
		number: 'BWA-2026-014',
		name: 'Brightwell Advisory Retainer',
		partner: 'Brightwell Consulting',
		description: 'Monthly finance transformation advisory services',
		status: 'Active for matching',
		company: '30, Northstar Manufacturing',
		createdBy: 'Accounts Payable · Alex Nguyen',
		authorizedBy: 'Finance controller · Morgan Patel',
		validFrom: 'Jan 1, 2026',
		validTo: 'Dec 31, 2026',
		renewal: 'Dec 31, 2026',
		annualValue: 77760,
		total: 6480,
		tax: 0,
		notice: 2,
		extension: 12,
		currency: 'USD',
		flow: 'Directly to recording',
		partialFlow: 'AP review',
		role: 'Accounts Payable',
		posting: '6530 · Consulting services',
		line: 'Advisory services',
		attachment: 'Brightwell - 2026 Retainer.pdf',
		invoiceNo: '94811',
		issueDate: 'Apr 17, 2026',
		dueDate: 'May 17, 2026',
	},
	{
		id: 'CT-0074',
		number: 'LCS-2026-009',
		name: 'Lumen Cloud Platform Subscription',
		partner: 'Lumen Cloud Services',
		description: 'Annual cloud platform subscription and support',
		status: 'Active for matching',
		company: '20, Northstar Services',
		createdBy: 'Accounts Payable · Jordan Lee',
		authorizedBy: 'CFO · Morgan Patel',
		validFrom: 'Mar 1, 2026',
		validTo: 'Feb 28, 2027',
		renewal: 'Feb 28, 2027',
		annualValue: 154800,
		total: 12900,
		tax: 1032,
		notice: 3,
		extension: 12,
		currency: 'USD',
		flow: 'Accounts payable +1',
		partialFlow: 'According to reference matching',
		role: 'Accounts Payable',
		posting: '6710 · Software subscriptions',
		line: 'Cloud platform',
		attachment: 'Lumen Cloud - Subscription.pdf',
		invoiceNo: '33081',
		issueDate: 'Apr 18, 2026',
		dueDate: 'May 18, 2026',
	},
	{
		id: 'CT-0073',
		number: 'CFS-2026-022',
		name: 'Core Facility Maintenance',
		partner: 'Core Facility Services',
		description: 'Quarterly preventative maintenance agreement',
		status: 'Active',
		company: '30, Northstar Manufacturing',
		createdBy: 'Facilities · Taylor Brooks',
		authorizedBy: 'Department manager · Alex Nguyen',
		validFrom: 'Jan 1, 2026',
		validTo: 'Dec 31, 2026',
		renewal: 'Dec 31, 2026',
		annualValue: 17280,
		total: 4320,
		tax: 0,
		notice: 1,
		extension: 12,
		currency: 'USD',
		flow: 'Department manager',
		partialFlow: 'AP review',
		role: 'Accounts Payable',
		posting: '6810 · Maintenance',
		line: 'Preventative maintenance',
		attachment: 'Core Facility - Agreement.pdf',
		invoiceNo: '44871',
		issueDate: 'Apr 15, 2026',
		dueDate: 'May 15, 2026',
	},
];

const paymentTabs = [
	['ready', 'Ready for payment', 66],
	['awaiting', 'Awaiting approval', 8],
	['in-progress', 'In progress', 16],
	['completed', 'Completed', 10],
];

const payments = [
	{
		id: 'INV-77821',
		tab: 'ready',
		company: '30',
		vendor: 'Precision Tools Co.',
		invoiceDate: 'Apr 2, 2026',
		dueDate: 'May 4, 2026',
		amount: 3265,
		method: 'ACH',
		approver: 'Jordan Lee',
		approvalDate: 'Pending journey completion',
		journey: true,
	},
	{
		id: '0976000052',
		tab: 'ready',
		company: '30',
		vendor: 'ADS Security',
		invoiceDate: 'Sep 7, 2026',
		dueDate: 'Oct 7, 2026',
		amount: 1510,
		method: 'ACH',
		approver: 'Frank Jonsson',
		approvalDate: 'Aug 30, 2026',
	},
	{
		id: '0976000048',
		tab: 'ready',
		company: '30',
		vendor: 'Advanced Building Systems',
		invoiceDate: 'Sep 7, 2026',
		dueDate: 'Oct 7, 2026',
		amount: 1470,
		method: 'Check',
		approver: 'Adri Meijer',
		approvalDate: 'Aug 30, 2026',
	},
	{
		id: '0976000005',
		tab: 'ready',
		company: '30',
		vendor: 'CDW',
		invoiceDate: 'Sep 21, 2026',
		dueDate: 'Oct 21, 2026',
		amount: 1040,
		method: 'ACH',
		approver: 'Maria Hansson',
		approvalDate: 'Aug 30, 2026',
	},
	{
		id: '0976000002',
		tab: 'ready',
		company: '30',
		vendor: 'Absolute Laser',
		invoiceDate: 'Sep 21, 2026',
		dueDate: 'Oct 21, 2026',
		amount: 1010,
		method: 'Virtual card',
		approver: 'Maria Hansson',
		approvalDate: 'Aug 30, 2026',
	},
	{
		id: '0976000003',
		tab: 'ready',
		company: '30',
		vendor: 'Accurate Welding',
		invoiceDate: 'Sep 21, 2026',
		dueDate: 'Oct 21, 2026',
		amount: 1020,
		method: 'Check',
		approver: 'Logan Cressey',
		approvalDate: 'Aug 30, 2026',
	},
	{
		id: '0976000001',
		tab: 'ready',
		company: '30',
		vendor: 'DME Company',
		invoiceDate: 'Sep 21, 2026',
		dueDate: 'Oct 21, 2026',
		amount: 1000,
		method: 'ACH',
		approver: 'Maria Hansson',
		approvalDate: 'Aug 30, 2026',
	},
	{
		id: '0976000021',
		tab: 'awaiting',
		company: '30',
		vendor: 'Beacon Office Supply',
		invoiceDate: 'Sep 18, 2026',
		dueDate: 'Oct 18, 2026',
		amount: 2860,
		method: 'ACH',
		approver: 'Department manager',
		status: 'Manager review',
	},
	{
		id: '0976000024',
		tab: 'awaiting',
		company: '30',
		vendor: 'Clearwater Freight',
		invoiceDate: 'Sep 19, 2026',
		dueDate: 'Oct 19, 2026',
		amount: 4380,
		method: 'Check',
		approver: 'Finance controller',
		status: 'Final approval',
	},
	{
		id: '0976000027',
		tab: 'awaiting',
		company: '30',
		vendor: 'North Coast Packaging',
		invoiceDate: 'Sep 20, 2026',
		dueDate: 'Oct 20, 2026',
		amount: 1975,
		method: 'Virtual card',
		approver: 'AP review',
		status: 'Exception review',
	},
	{
		id: '0976000030',
		tab: 'in-progress',
		company: '30',
		vendor: 'Metro Industrial',
		invoiceDate: 'Sep 14, 2026',
		amount: 6420,
		method: 'ACH',
		sentBy: 'Alex Nguyen',
		sentOn: 'Sep 21, 2026',
		status: 'Submitted to bank',
	},
	{
		id: '0976000033',
		tab: 'in-progress',
		company: '30',
		vendor: 'Riverside Logistics',
		invoiceDate: 'Sep 16, 2026',
		amount: 960,
		method: 'Check',
		sentBy: 'Morgan Patel',
		sentOn: 'Sep 21, 2026',
		status: 'Payment file created',
	},
	{
		id: '0976000036',
		tab: 'in-progress',
		company: '30',
		vendor: 'Summit Packaging',
		invoiceDate: 'Sep 17, 2026',
		amount: 8750,
		method: 'ACH',
		sentBy: 'Alex Nguyen',
		sentOn: 'Sep 21, 2026',
		status: 'Processing',
	},
	{
		id: '0976000007',
		tab: 'completed',
		company: '30',
		vendor: 'Polychemtex Inc',
		invoiceDate: 'Oct 6, 2026',
		amount: 1060,
		method: 'Check',
		sentBy: 'Christina Ciocoi',
		sentOn: 'Sep 21, 2026',
		paymentDate: 'Sep 22, 2026',
		reference: 'TRC6716/3890',
		status: 'Settled',
	},
	{
		id: '0976000010',
		tab: 'completed',
		company: '30',
		vendor: 'Absolute Laser',
		invoiceDate: 'Oct 11, 2026',
		amount: 1090,
		method: 'Check',
		sentBy: 'Kevin Witkowski',
		sentOn: 'Sep 21, 2026',
		paymentDate: 'Sep 22, 2026',
		reference: 'TR2EBB0/2722',
		status: 'Settled',
	},
	{
		id: '0976000015',
		tab: 'completed',
		company: '30',
		vendor: 'City Transport',
		invoiceDate: 'Oct 26, 2026',
		amount: 1140,
		method: 'ACH',
		sentBy: 'Johan Eriksson',
		sentOn: 'Sep 21, 2026',
		paymentDate: 'Sep 22, 2026',
		reference: 'TRB7241',
		status: 'Settled',
	},
	{
		id: '0976000013',
		tab: 'completed',
		company: '30',
		vendor: 'Advanced Building Systems',
		invoiceDate: 'Oct 21, 2026',
		amount: 1120,
		method: 'Check',
		sentBy: 'Sam Carter',
		sentOn: 'Sep 21, 2026',
		paymentDate: 'Sep 22, 2026',
		reference: 'TRA2B16/7743',
		status: 'Settled',
	},
	{
		id: '0976000009',
		tab: 'completed',
		company: '30',
		vendor: 'DME Company',
		invoiceDate: 'Oct 11, 2026',
		amount: 1080,
		method: 'ACH',
		sentBy: 'Adri Meijer',
		sentOn: 'Sep 21, 2026',
		paymentDate: 'Sep 22, 2026',
		reference: 'TR43080',
		status: 'Settled',
	},
	{
		id: '0976000017',
		tab: 'completed',
		company: '30',
		vendor: 'Star Telecom',
		invoiceDate: 'Oct 31, 2026',
		amount: 1160,
		method: 'Virtual card',
		sentBy: 'Logan Meek',
		sentOn: 'Sep 21, 2026',
		paymentDate: 'Sep 22, 2026',
		reference: 'TRE5370/7304',
		status: 'Settled',
	},
];

const captureInvoices = [
	{
		id: 'CAP-9175499553',
		company: '30',
		vendor: 'Atlas Industrial Supply',
		invoiceDate: '09/11/2026',
		dueDate: '10/11/2026',
		amount: 145.6,
		invoiceNumber: '9175499553',
		fileName: 'Atlas 9175499553.pdf',
		received: '9/20/26, 6:10 PM',
		po: '4500821',
		account: '6410',
		bank: '•••• 2841',
		lines: [['2', '4500821', 'DN-31082', 'GBX-200', 'Industrial gearbox mounting kit', '4', 'PC', '35.60', '0', 'TAX-US', '6410', '142.40', 'MFG', 'LINE-7', 'Plant 2']],
	},
	{
		id: 'CAP-71741278',
		invoiceId: 'INV-77821',
		company: '30',
		vendor: 'Precision Tools Co.',
		invoiceDate: '04/02/2026',
		dueDate: '05/04/2026',
		amount: 3265,
		invoiceNumber: 'INV-77821',
		fileName: 'Precision INV-77821.pdf',
		received: '4/2/26, 9:14 AM',
		po: '4500838',
		account: '6420',
		bank: '•••• 1048',
		lines: [['10', '4500838', 'DN-77211', 'CNC-14', 'CNC tooling set', '1', 'SET', '3,265.00', '0', 'TAX-US', '6420', '3,265.00', 'OPS', 'TOOL-4', 'Plant 1']],
	},
	{
		id: 'CAP-71730252',
		company: '30',
		vendor: 'Summit Packaging',
		invoiceDate: '09/11/2026',
		dueDate: '10/11/2026',
		amount: 786.4,
		invoiceNumber: '71730252',
		fileName: 'Summit 71730252.pdf',
		received: '9/20/26, 4:35 PM',
		po: '',
		account: '6330',
		bank: '•••• 6620',
		lines: [['1', '', '', 'PKG-22', 'Protective packaging materials', '40', 'CS', '18.20', '0', 'TAX-US', '6330', '728.00', 'WHSE', 'PACK-2', 'Dock A']],
	},
	{
		id: 'CAP-D38186164',
		company: '30',
		vendor: 'Riverside Logistics',
		invoiceDate: '09/08/2026',
		dueDate: '09/18/2026',
		amount: 1921.17,
		invoiceNumber: 'D38186164',
		fileName: 'Riverside D38186164.pdf',
		received: '9/20/26, 4:30 PM',
		po: '4500841',
		account: '6210',
		bank: '•••• 8840',
		lines: [['1', '4500841', 'BOL-61642', 'FRT', 'Regional freight service', '1', 'EA', '1,921.17', '0', 'FREIGHT', '6210', '1,921.17', 'LOG', 'ROUTE-8', 'Plant 3']],
	},
	{
		id: 'CAP-789104',
		company: '30',
		vendor: 'Core Facility Services',
		invoiceDate: '09/07/2026',
		dueDate: '11/06/2026',
		amount: 852.0,
		invoiceNumber: '789104',
		fileName: 'Core Facility 789104.pdf',
		received: '9/20/26, 4:25 PM',
		po: '4500770',
		account: '6810',
		bank: '•••• 3391',
		lines: [['1', '4500770', 'WO-26091', 'MAINT', 'Preventive maintenance visit', '1', 'EA', '852.00', '0', 'TAX-US', '6810', '852.00', 'FAC', 'PM-26', 'Plant 1']],
	},
	{
		id: 'CAP-783814',
		company: '30',
		vendor: 'Brightwell Consulting',
		invoiceDate: '08/28/2026',
		dueDate: '10/27/2026',
		amount: 3992.0,
		invoiceNumber: '783814',
		fileName: 'Brightwell 783814.pdf',
		received: '9/20/26, 4:23 PM',
		po: '',
		account: '6530',
		bank: '•••• 7210',
		lines: [['1', '', '', 'ADV', 'Operational advisory services', '32', 'HR', '124.75', '0', 'EXEMPT', '6530', '3,992.00', 'FIN', 'TRANS-1', 'HQ']],
	},
	{
		id: 'CAP-783807',
		company: '30',
		vendor: 'Lumen Cloud Services',
		invoiceDate: '08/28/2026',
		dueDate: '10/27/2026',
		amount: 3122.76,
		invoiceNumber: '783807',
		fileName: 'Lumen 783807.pdf',
		received: '9/20/26, 4:20 PM',
		po: '',
		account: '6710',
		bank: '•••• 5722',
		lines: [
			['1', '', '', 'CLOUD', 'Monthly cloud platform subscription', '1', 'MO', '2,891.44', '0', 'TAX-US', '6710', '2,891.44', 'IT', 'CLOUD-9', 'HQ'],
			['2', '', '', 'TAX', 'Sales tax', '1', 'EA', '231.32', '0', 'TAX-US', '6710', '231.32', 'IT', 'CLOUD-9', 'HQ'],
		],
	},
	{
		id: 'CAP-VA07-00383748',
		company: '30',
		vendor: 'Harbor Office Services',
		invoiceDate: '09/11/2026',
		dueDate: '10/05/2026',
		amount: 2195.2,
		invoiceNumber: 'VA07-00383748',
		fileName: 'Harbor VA0700383748.pdf',
		received: '9/20/26, 4:17 PM',
		po: '',
		account: '6110',
		bank: '•••• 9462',
		lines: [['1', '', '', 'OFFICE', 'Office services and supplies', '1', 'EA', '2,032.59', '0', 'TAX-US', '6110', '2,032.59', 'ADMIN', 'OFF-4', 'HQ']],
	},
	{
		id: 'CAP-VA07-00383487',
		company: '30',
		vendor: 'Northstar Utilities',
		invoiceDate: '08/24/2026',
		dueDate: '09/01/2026',
		amount: 1107.55,
		invoiceNumber: 'VA07-00383487',
		fileName: 'Northstar Utilities VA0700383487.pdf',
		received: '9/20/26, 4:11 PM',
		po: '',
		account: '6760',
		bank: '•••• 1009',
		lines: [['1', '', '', 'UTIL', 'Electricity and facility usage', '1', 'EA', '1,107.55', '0', 'UTILITY', '6760', '1,107.55', 'FAC', 'UTIL-2', 'Plant 2']],
	},
	{
		id: 'CAP-CN-0008',
		company: '30',
		vendor: 'Video Systems Group',
		invoiceDate: '08/10/2026',
		dueDate: '08/10/2026',
		amount: -1255.05,
		invoiceNumber: 'CN-0008',
		fileName: 'Video Systems CN-0008.pdf',
		received: '9/20/26, 1:17 PM',
		po: '4500884',
		account: '6640',
		bank: '•••• 4885',
		lines: [['1', '4500884', 'RTN-092', 'CAM-4K', 'Returned inspection camera', '-1', 'EA', '1,255.05', '0', 'TAX-US', '6640', '-1,255.05', 'QA', 'VIS-6', 'Plant 3']],
	},
];

const captureFieldGroups = {
	'Header fields': [
		['Supplier bank account', 0],
		['Invoice number', 9],
		['Invoice date', 2],
		['Due date', 0],
		['Reference 1', 6],
		['Reference 2', 1],
		['Contract no.', 2],
		['PO number', 2],
		['Vendor delivery note', 0],
		['Payment reference', 0],
		['Currency', 1],
		['Total amount', 1],
		['TAX amount', 2],
		['Comments', 0],
	],
	'Line fields': [
		['Item', 29],
		['Delivery reference', 0],
		['Description', 27],
		['Attribute', 0],
		['Quantity', 11],
		['Unit', 44],
		['Unit price', 16],
		['Amount', 3],
		['Account', 114],
		['Cost Center', 47],
		['Project', 5],
		['Location', 2],
		['Group1', 1],
		['Group2', 0],
		['Group3', 0],
	],
};

const journeyInvoiceId = 'INV-77821';
const journeyCaptureId = 'CAP-71741278';
const journeySteps = [
	['Captured', 'to-verify'],
	['In Invoice Log', 'invoice-log'],
	['Manager approval', 'approval-report'],
	['Ready for payment', 'payments'],
	['Paid', 'payments'],
];
const scenarioConfig = {
	ap: { label: 'Accounts payable', view: 'to-verify', stage: 0 },
	approver: {
		label: 'Invoice approver',
		view: 'approval-report',
		stage: 2,
		role: 'department-manager',
	},
	finance: { label: 'Finance leader', view: 'payments', stage: 3 },
};
const urlParams = new URLSearchParams(location.search);
const initialScenario = scenarioConfig[urlParams.get('scenario')] ? urlParams.get('scenario') : '';
const requestedInvoice = invoices.find((inv) => inv.id === urlParams.get('invoice'));
const requestedPurchaseOrder = invoices.find((inv) => inv.po === urlParams.get('po'));
const requestedView = urlParams.get('view') || location.hash.slice(1) || (requestedPurchaseOrder ? 'purchase-order-detail' : requestedInvoice ? 'invoice-detail' : '') || scenarioConfig[initialScenario]?.view || 'dashboard';
const initialSelected = (requestedView === 'purchase-order-detail' && requestedPurchaseOrder) || requestedInvoice || requestedPurchaseOrder || (initialScenario === 'approver' ? invoices.find((inv) => inv.id === journeyInvoiceId) : invoices[0]);
const initialTransferredIds = invoices.filter((inv) => inv.type === 'approval' && inv.id !== journeyInvoiceId).map((inv) => inv.id);

const state = {
	view: requestedView,
	selected: initialSelected,
	approved: new Set(),
	expanded: new Set(['invoices', 'reports']),
	tour: -1,
	tourPersona: initialScenario || 'platform',
	tourComplete: false,
	query: '',
	fieldsExpanded: false,
	scenario: initialScenario,
	journeyStage: scenarioConfig[initialScenario]?.stage || 0,
	logFilter: 'all',
	logSelection: new Set(),
	transferred: new Set(initialTransferredIds),
	lastTransferredRole: '',
	invoiceDetailTab: 'lines',
	roleFilter: scenarioConfig[initialScenario]?.role || 'all',
	analytics: 0,
	approvalScreen: 'queue',
	approvalTab: 'to-be-processed',
	approvalCompany: 'all',
	approvalVendor: '',
	approvalDueFrom: '',
	approvalDueTo: '',
	approvalSelection: new Set(),
	approvalQueueState: new Map(),
	documentTab: 'being-checked',
	documentCompany: 'all',
	documentType: 'all',
	selectedDocument: documents[0],
	documentOutcomes: new Map(),
	selectedContract: contracts[0],
	contractTab: 'contract-lines',
	paymentTab: 'ready',
	paymentQuery: '',
	paymentVendor: 'all',
	paymentMethod: 'all',
	paymentDate: '',
	paymentSelection: new Set(),
	paymentMoves: new Map(),
	captureScreen: 'queue',
	captureSelected: captureInvoices[0],
	captureVendor: 'all',
	captureInvoice: '',
	captureAmountMin: '',
	captureAmountMax: '',
	captureSettingsField: 'Supplier bank account',
	captureSettingsTab: 'global',
};

const workspace = document.querySelector('#workspace');
const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const number = (value) =>
	Number(value).toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
const approvalRole = (inv) => approvalRoles.find((role) => role.id === inv.role);
const isActionableCandidate = (inv) => !inv.logOnly && inv.approvalRequired !== false;
const requiresAction = (inv) => isActionableCandidate(inv) && state.transferred.has(inv.id);
const transferEligible = (inv) => isActionableCandidate(inv) && !state.transferred.has(inv.id) && (inv.id !== journeyInvoiceId || state.journeyStage >= 1);
const invoiceCode = (inv) => inv.accountPosting.match(/\b\d{4}\b/)?.[0] || (inv.matchBasis === 'contract' ? '6810' : 'Uncoded');
const allViews = [
	...navTree
		.flatMap((item) => item.children || [item])
		.map((item) => item.id)
		.filter(Boolean),
	'invoice-detail',
	'purchase-order-detail',
	'document-detail',
	'contract-detail',
	'approval-report',
];
const labels = {
	...Object.fromEntries(navTree.flatMap((item) => (item.children ? item.children.map((child) => [child.id, child.label]) : [[item.id, item.label]]))),
	'invoice-detail': 'Invoice detail',
	'purchase-order-detail': 'Purchase order',
	'document-detail': 'Document detail',
	'contract-detail': 'Contract detail',
	'approval-report': 'Approval',
};

function journeyStrip() {
	const action =
		state.journeyStage === 0
			? ''
			: state.journeyStage === 1
				? '<button class="primary-button" data-action="journey-approval">Transfer to manager approval</button>'
				: state.journeyStage === 2
					? `<button class="primary-button" data-approval-invoice="${journeyInvoiceId}">Review invoice</button>`
					: state.journeyStage === 3
						? '<button class="primary-button" data-action="journey-payment">Open ready for payment</button>'
						: '<span class="journey-complete">Workflow complete</span>';
	return `<section class="journey-strip" aria-label="Precision Tools invoice journey"><div><strong>Follow one invoice end to end</strong><span>Precision Tools Co. · ${journeyInvoiceId}</span></div><ol>${journeySteps.map(([label], index) => `<li class="${index < state.journeyStage ? 'done' : index === state.journeyStage ? 'active' : ''}" ${index === state.journeyStage ? 'aria-current="step"' : ''}><span>${index + 1}</span>${label}</li>`).join('')}</ol>${action}</section>`;
}

function scenarioBanner() {
	if (!state.scenario) return '';
	const config = scenarioConfig[state.scenario];
	return `<section class="scenario-banner"><div><strong>${config.label} scenario</strong><span>This shareable view is ready to explore without the welcome dialog.</span></div><button data-tour-persona="${state.scenario}">Start this walkthrough</button><button data-share-scenario="${state.scenario}">Copy scenario link</button></section>`;
}

function journeyStatus(inv) {
	if (inv.id !== journeyInvoiceId) return status(inv);
	const states = [
		['exception', 'Waiting in Capture'],
		['match', 'AP review'],
		['approval', 'Manager approval'],
		['paid', 'Approved'],
		['paid', 'Paid'],
	];
	const [tone, label] = states[state.journeyStage];
	return `<span class="status ${tone}">${label}</span>`;
}

function renderNav() {
	document.querySelector('#nav').innerHTML = navTree
		.map((item) => {
			if (!item.children) return navButton(item);
			const open = state.expanded.has(item.group);
			const active = item.children.some((child) => child.id === state.view);
			return `<div class="nav-section ${active ? 'section-active' : ''}">
      <button class="nav-item nav-parent" data-nav-group="${item.group}" aria-expanded="${open}" aria-controls="nav-${item.group}">
        <span class="icon">${icons[item.icon]}</span><span class="nav-label">${item.label}</span>${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}<span class="chevron" aria-hidden="true"></span>
      </button>
      <div class="nav-children" id="nav-${item.group}" ${open ? '' : 'hidden'}>${item.children.map((child) => navButton(child, true)).join('')}</div>
    </div>`;
		})
		.join('');
}

function navButton(item, child = false) {
	const active = state.view === item.id;
	const badge = item.id === 'documents' ? documents.filter((doc) => documentStatus(doc) === 'being-checked').length : item.badge;
	return `<button class="nav-item ${child ? 'nav-subitem' : ''} ${active ? 'active' : ''}" data-view="${item.id}" ${active ? 'aria-current="page"' : ''} aria-label="${item.label}">
    ${child ? '<span class="sub-dot" aria-hidden="true"></span>' : `<span class="icon">${icons[item.icon]}</span>`}
    <span class="nav-label">${item.label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ''}
  </button>`;
}

function status(inv) {
	if (inv.id === journeyInvoiceId) return journeyStatus(inv);
	const done = state.approved.has(inv.id);
	return `<span class="status ${done ? 'paid' : inv.type}">${done ? 'Approved' : inv.status}</span>`;
}

const aiMatchTone = (confidence) => (confidence > 80 ? 'good' : confidence >= 50 ? 'warn' : 'bad');
const matchTone = (inv) => (inv.aiMatched ? aiMatchTone(inv.confidence) : inv.matchStatus === 'price-variance' ? 'price' : inv.matchTone);
const matchClass = (inv) => (matchTone(inv) === 'good' ? 'match' : matchTone(inv) === 'warn' ? 'approval' : matchTone(inv) === 'price' ? 'price-variant' : 'exception');
const matchLabel = (inv) => (inv.aiMatched ? `AI matched · ${inv.confidence}% confidence` : inv.matchStatus === 'delivery-variance' ? 'Delivery variant' : inv.matchStatus === 'price-variance' ? 'Price variant' : inv.matchStatus === 'fully-matched' ? 'Fully matched' : 'Match exception');

const flowReason = (inv) =>
	inv.role === 'finance-controller'
		? 'Finance controller was proposed because the amount or annual change needs financial-control review.'
		: inv.role === 'department-manager'
			? 'Department manager was proposed to confirm the business purpose and cost ownership.'
			: 'AP review was proposed because this non-PO invoice follows an established vendor and coding pattern.';

function poLineEvidence(inv, line) {
	const invoiced = line[1];
	const delivered = inv.matchStatus === 'delivery-variance' ? Math.max(0, invoiced - 1) : invoiced;
	const ordered = Math.max(invoiced, delivered);
	const poUnitPrice = inv.matchStatus === 'price-variance' ? line[2] - inv.varianceAmount / invoiced : line[2];
	const quantityGap = Math.max(0, invoiced - delivered);
	const explanation =
		inv.matchStatus === 'price-variance'
			? `Invoice unit price ${money(line[2])} is ${Math.round(((line[2] - poUnitPrice) / poUnitPrice) * 100)}% above the purchase-order price ${money(poUnitPrice)}; ordered, delivered, and invoiced quantities are ${invoiced}.`
			: inv.matchStatus === 'delivery-variance'
				? `Invoice quantity ${invoiced} exceeds delivered quantity ${delivered} by ${quantityGap}; the purchase-order unit price ${money(poUnitPrice)} matches.`
				: `Ordered, delivered, and invoiced quantities are ${invoiced}, and the unit price ${money(poUnitPrice)} matches.`;
	return {
		ordered,
		delivered,
		invoiced,
		poUnitPrice,
		invoiceUnitPrice: line[2],
		explanation,
	};
}

function lineMatchEvidence(inv, line, index) {
	if (inv.aiMatched)
		return {
			kind: 'ai',
			tone: matchTone(inv),
			coding: `AI proposed account ${invoiceCode(inv)} for “${line[0]}” from the vendor, description, and approved posting history.`,
			flow: flowReason(inv),
		};
	const po = poLineEvidence(inv, line);
	return {
		kind: 'po',
		tone: matchTone(inv),
		tooltipId: `po-line-${inv.id}-${index}`,
		...po,
	};
}

function matchSummary(inv) {
	const variance = inv.varianceAmount ? `<span>${inv.varianceLabel}: <strong>${money(inv.varianceAmount)}</strong></span>` : `<span>${inv.varianceLabel || 'No variance'}</span>`;
	return `<details class="match-summary ${matchTone(inv)}" open><summary><span>${inv.aiMatched ? 'AI matching explanation' : 'Purchase-order matching explanation'}</span><strong>${matchLabel(inv)}</strong></summary><p>${inv.explanation}</p><div>${variance}<span>${inv.matchBasis === 'non-po' ? 'AI flow and account proposals' : inv.po}</span></div></details>`;
}

function transferInvoices(ids) {
	const records = ids.map((id) => invoices.find((inv) => inv.id === id)).filter((inv) => inv && transferEligible(inv));
	records.forEach((inv) => {
		state.transferred.add(inv.id);
		state.approvalQueueState.set(inv.id, 'inbound');
	});
	if (records.some((inv) => inv.id === journeyInvoiceId)) state.journeyStage = Math.max(state.journeyStage, 2);
	const roles = [...new Set(records.map((inv) => inv.role))];
	state.lastTransferredRole = roles.length === 1 ? roles[0] : 'all';
	return records;
}

function filtered() {
	const query = state.query.toLowerCase().trim();
	return query ? invoices.filter((inv) => `${inv.id} ${inv.vendor} ${inv.po} ${inv.owner} ${approvalRole(inv).label}`.toLowerCase().includes(query)) : invoices;
}

function queue() {
	const matches = filtered().filter(requiresAction);
	const approvals = matches.filter((inv) => inv.type === 'approval').length;
	const exceptions = matches.filter((inv) => inv.type === 'exception').length;
	return `<section class="panel queue-panel"><div class="panel-head"><h2>My task queue</h2><button class="link-button" data-view="tasks">All tasks</button></div>
    <div class="task-summary">${[
			[matches.length, 'Total'],
			[approvals, 'Approvals'],
			[exceptions, 'Exception'],
			[Math.max(0, matches.length - approvals - exceptions), 'Other'],
		]
			.map(([value, label]) => `<div class="summary-item"><strong>${value}</strong><span>${label}</span></div>`)
			.join('')}</div>
    ${matches.length ? `<ul class="queue">${matches.map((inv) => `<li><button class="queue-item ${state.selected.id === inv.id ? 'selected' : ''}" data-invoice="${inv.id}"><strong>${inv.vendor}</strong><span class="amount">${money(inv.amount)}</span><small>${inv.id}</small>${journeyStatus(inv)}</button></li>`).join('')}</ul>` : emptyState('No matching invoices', 'Try a vendor, invoice number, purchase order, or owner.')}
  </section>`;
}

function invoicePaper(inv) {
	const subtotal = inv.lines.reduce((sum, line) => sum + line[1] * line[2], 0);
	const vendorMark = inv.vendor.split(' ')[0];
	return `<div class="invoice-paper"><div class="invoice-brand"><strong>${vendorMark}<span>.</span></strong><span>Invoice</span></div>
    <div class="invoice-meta"><div><strong>${inv.vendor}</strong><p>1234 Commerce Drive</p><p>Riverton, IL 60611</p><br><strong>Bill to</strong><p>Northstar Manufacturing</p><p>1000 Production Way</p></div>
      <dl><dt>Invoice no.</dt><dd>${inv.id}</dd><dt>Invoice date</dt><dd>Apr 2, 2026</dd><dt>Due date</dt><dd>${inv.due}</dd><dt>PO no.</dt><dd>${inv.po}</dd><dt>Terms</dt><dd>Net 30</dd></dl></div>
    <table class="line-table"><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>${inv.lines.map((line) => `<tr><td>${line[0]}</td><td>${line[1]}</td><td>${money(line[2])}</td><td>${money(line[1] * line[2])}</td></tr>`).join('')}</tbody></table>
    <div class="totals"><div><span>Subtotal</span><span>${money(subtotal)}</span></div><div><span>Tax & fees</span><span>${money(inv.amount - subtotal)}</span></div><div class="grand"><span>Total</span><span>${money(inv.amount)}</span></div></div>
  </div>`;
}

function invoicePanel(inv) {
	return `<section class="panel invoice-panel"><div class="invoice-head"><div>${backButton('Invoice Log', 'data-view="invoice-log"')}<h2>${inv.vendor}</h2><p>${inv.id}</p><div class="chip-row"><span class="status ${matchClass(inv)}">${matchLabel(inv)}</span>${status(inv)}</div></div><div class="invoice-total"><strong>${money(inv.amount)}</strong><small>Due ${inv.due}</small></div></div>${matchSummary(inv)}${invoicePaper(inv)}</section>`;
}

function relay(inv) {
	const approved = state.approved.has(inv.id);
	const fields = [
		['Vendor', inv.vendor],
		['Invoice number', inv.id],
		['Due date', inv.due],
		['PO number', inv.po],
		['Total amount', money(inv.amount)],
		...(state.fieldsExpanded
			? [
					['Invoice date', 'Apr 2, 2026'],
					['Payment terms', 'Net 30'],
					['Currency', 'USD'],
				]
			: []),
	];
	const extractedPanel = `<section class="panel"><div class="panel-head"><h3>Extracted fields</h3><button class="link-button" data-action="fields">${state.fieldsExpanded ? 'Show less' : 'View all'}</button></div><div class="evidence">${fields.map(([label, value]) => `<div class="evidence-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></section>`;
	const matchEvidence = [
		['Matching type', inv.aiMatched ? 'AI matching' : inv.matchBasis === 'contract' ? 'Contract matching' : 'Purchase order matching'],
		['Reference', inv.matchBasis === 'non-po' ? 'No purchase order' : inv.po],
		['Result', inv.varianceLabel],
		['Variance', money(inv.varianceAmount || 0)],
		...(inv.aiMatched ? [['Confidence', `${inv.confidence}%`]] : []),
	];
	const matchPanel = `<section class="panel"><div class="panel-head"><h3>${inv.aiMatched ? 'AI match evidence' : 'PO match evidence'}</h3><span class="status ${matchClass(inv)}">${matchLabel(inv)}</span></div><div class="evidence">${matchEvidence.map(([label, value]) => `<div class="evidence-row"><span>${label}</span><strong>${value}</strong></div>`).join('')}</div></section>`;
	if (!requiresAction(inv)) return `<div class="stack right-stack">${extractedPanel}${matchPanel}</div>`;
	return `<div class="stack right-stack"><section class="panel"><div class="panel-head"><h3>Approval relay</h3></div><div class="relay">
    <div class="relay-step done"><span class="relay-mark"></span><div><strong>Capture complete</strong><small>Invoice received and fields extracted</small></div></div>
    <div class="relay-step done"><span class="relay-mark"></span><div><strong>AP review complete</strong><small>Matched to PO ${inv.po}</small></div></div>
    <div class="relay-step ${approved ? 'done' : 'active'}"><span class="relay-mark"></span><div><strong>${approved ? `${approvalRole(inv).label} approved` : approvalRole(inv).label}</strong><small>${approved ? `Approved by ${inv.owner}` : `${inv.owner} · approval required`}</small></div></div>
    <div class="relay-step ${approved ? 'active' : ''}"><span class="relay-mark"></span><div><strong>Payment scheduled</strong><small>${approved ? 'Ready for ERP export' : 'Sent to ERP after approval'}</small></div></div>
    <button class="primary-button full" data-action="approve" ${approved ? 'disabled' : ''}>${approved ? 'Invoice approved' : 'Review and approve'}</button></div></section>${extractedPanel}${matchPanel}</div>`;
}

function dashboard() {
	workspace.innerHTML = `${journeyStrip()}<div class="workspace-grid">${queue()}${invoicePanel(state.selected)}${relay(state.selected)}</div>`;
}

function toVerify() {
	if (state.captureScreen === 'detail') {
		captureDetail();
		return;
	}
	if (state.captureScreen === 'settings') {
		captureSettings();
		return;
	}
	captureQueue();
}

function captureQueue() {
	const query = state.query.toLowerCase().trim();
	const matches = captureInvoices.filter(
		(inv) =>
			(!query || `${inv.vendor} ${inv.invoiceNumber} ${inv.fileName}`.toLowerCase().includes(query)) &&
			(state.captureVendor === 'all' || inv.vendor === state.captureVendor) &&
			(!state.captureInvoice || inv.invoiceNumber.toLowerCase().includes(state.captureInvoice.toLowerCase())) &&
			(!state.captureAmountMin || inv.amount >= Number(state.captureAmountMin)) &&
			(!state.captureAmountMax || inv.amount <= Number(state.captureAmountMax)),
	);
	const vendors = [...new Set(captureInvoices.map((inv) => inv.vendor))].sort();
	const rows = matches
		.map(
			(inv) =>
				`<tr><td>${inv.company}</td><td><button class="table-link" data-capture-invoice="${inv.id}" aria-label="Open ${inv.invoiceNumber} from ${inv.vendor}">${inv.vendor}</button></td><td>${inv.invoiceDate}</td><td>${inv.dueDate}</td><td class="numeric">${number(inv.amount)} ${inv.amount < 0 ? 'USD credit' : 'USD'}</td><td>${inv.invoiceNumber}</td><td>${inv.fileName}</td><td>${inv.received}</td></tr>`,
		)
		.join('');
	workspace.innerHTML = `${journeyStrip()}<div class="capture-titlebar"><h2>Invoices to verify</h2><div class="capture-actions"><button data-action="capture-attachments">Attachments <span>99+</span></button><button data-action="capture-upload">Upload</button><button class="primary-button" data-action="capture-settings">Settings</button></div></div><section class="panel capture-queue"><div class="capture-filters"><label>Company<select disabled><option>All companies</option></select></label><label>Vendor<select id="capture-vendor"><option value="all">Vendor name or number</option>${vendors.map((vendor) => `<option ${state.captureVendor === vendor ? 'selected' : ''}>${vendor}</option>`).join('')}</select></label><label>Total amount<span class="range-inputs"><input id="capture-min" type="number" value="${state.captureAmountMin}" placeholder="From"><input id="capture-max" type="number" value="${state.captureAmountMax}" placeholder="To"></span></label><label>Invoice number<input id="capture-invoice" value="${escapeHtml(state.captureInvoice)}" placeholder="Search invoice number"></label></div><div class="table-wrap capture-queue-table">${rows ? dataTable(['Company', 'Vendor', 'Invoice date', 'Due date', 'Total amount', 'Invoice number', 'File name', 'Received'], rows) : emptyState('No invoices match these filters', 'Clear a vendor, amount, invoice number, or global search filter.')}</div><div class="capture-pagination"><span>Total: 228 synthetic items</span><div aria-label="Pagination"><button disabled>‹</button><button aria-current="page">1</button><button>2</button><button>3</button><button>4</button><button>5</button><span>…</span><button>8</button><button>›</button></div></div><p class="capture-ai-note">Data on this page has been extracted using AI</p></section>`;
}

function captureDetail() {
	const inv = state.captureSelected;
	const index = captureInvoices.findIndex((item) => item.id === inv.id);
	const field = (label, value, stateClass = 'valid') => `<label class="capture-field ${stateClass}"><span>${label}</span><input value="${escapeHtml(value)}" aria-label="${label}"></label>`;
	const lineHeads = ['Line no.', 'Order number', 'Delivery slip number', 'Item', 'Description', 'Quantity', 'Unit', 'Unit price', 'Discount %', 'TAX code', 'Account', 'Amount', 'Cost Center', 'Project', 'Location', 'Group1', 'Group2'];
	const lineRows = inv.lines.map((line) => `<tr>${[...line, '', ''].map((value, cell) => `<td><input value="${escapeHtml(value)}" aria-label="${lineHeads[cell]}"></td>`).join('')}</tr>`).join('');
	workspace.innerHTML = `<div class="capture-detail-head">${backButton('To Verify', 'data-action="capture-back"')}<div><button data-action="capture-history" aria-label="View history">History</button><button data-action="capture-delete" aria-label="Delete invoice">Delete</button><button data-action="capture-prev" ${index === 0 ? 'disabled' : ''}>‹</button><span>${index + 1} of 228</span><button data-action="capture-next" ${index === captureInvoices.length - 1 ? 'disabled' : ''}>›</button><button data-action="capture-save">Save</button><label class="capture-toggle"><input type="checkbox"> Test invoice</label></div></div><section class="panel capture-detail"><aside class="capture-fields"><h3>Company and vendor</h3>${field('Company *', `Northstar Manufacturing, ${inv.company}`)}${field('Vendor', inv.vendor, 'review')}${field('Supplier bank account', inv.bank)}<h3>Invoice</h3>${field('Credit/Debit', inv.amount < 0 ? 'Credit' : 'Debit')}${field('Invoice number *', inv.invoiceNumber)}${field('Invoice date *', inv.invoiceDate)}${field('Due date', inv.dueDate)}${field('Reference 1', '')}${field('Reference 2', '')}${field('Contract no.', '')}${field('PO number', inv.po)}${field('Account', inv.account)}${field('Payment reference', '')}<h3>Amounts</h3>${field('Currency', 'USD')}${field('Total amount', Math.abs(inv.amount).toFixed(2))}<p class="capture-ai-note">Data on this page has been extracted using AI</p></aside><div class="capture-document"><div class="capture-document-tabs"><button aria-pressed="true">Invoice</button><button>Email</button></div><div class="capture-preview"><article class="capture-paper"><header><div><strong>${inv.vendor}</strong><span>SUPPLIER INVOICE</span></div><dl><dt>Invoice date</dt><dd>${inv.invoiceDate}</dd><dt>Invoice number</dt><dd>${inv.invoiceNumber}</dd><dt>Amount</dt><dd>${number(inv.amount)} USD</dd></dl></header><h2>${inv.amount < 0 ? 'CREDIT MEMO' : 'INVOICE'}</h2><div class="capture-paper-meta"><p><strong>Bill to</strong><br>Northstar Manufacturing<br>1000 Production Way<br>Riverton, IL 60611</p><p><strong>Payment terms</strong><br>Net 30<br><strong>Due date</strong><br>${inv.dueDate}</p></div><table><thead><tr><th>Description</th><th>Quantity</th><th>Price</th><th>Total</th></tr></thead><tbody>${inv.lines.map((line) => `<tr><td>${line[4]}</td><td>${line[5]} ${line[6]}</td><td>${line[7]}</td><td>${line[11]}</td></tr>`).join('')}</tbody></table><footer><strong>Total due</strong><strong>${number(inv.amount)} USD</strong></footer></article></div><div class="capture-line-wrap"><div class="capture-line-actions"><button aria-label="Add invoice line">Add line</button><button data-action="capture-show-po">${inv.po ? `Show ${inv.po}` : 'No purchase order'}</button></div><div class="table-wrap capture-line-grid">${dataTable(lineHeads, lineRows)}</div></div></div></section>`;
	workspace.insertAdjacentHTML('afterbegin', journeyStrip());
	workspace.querySelector('.capture-detail-head > .back-button').insertAdjacentHTML('afterend', '<strong class="capture-current-title">Invoice details</strong>');
	if (inv.id === journeyCaptureId && state.journeyStage === 0) workspace.querySelector('.capture-detail-head > div').insertAdjacentHTML('beforeend', '<button class="primary-button" data-action="capture-verify">Verify and send to Invoice Log</button>');
}

function captureSettings() {
	const tabs = [
		['global', 'Global default'],
		['company', 'Company overrides'],
		['vendor', 'Vendor overrides'],
		['history', 'Change history'],
	];
	const selected = Object.values(captureFieldGroups)
		.flat()
		.find(([label]) => label === state.captureSettingsField) || [state.captureSettingsField, 0];
	workspace.innerHTML = `<div class="capture-detail-head">${backButton('Invoice details', 'data-action="capture-settings-back"')}<div><button>Custom fields</button><button disabled>Discard</button><button disabled>Save</button></div></div><section class="panel capture-settings"><aside class="capture-setting-list">${Object.entries(
		captureFieldGroups,
	)
		.map(([group, fields]) => `<h3>${group}</h3>${fields.map(([label, overrides]) => `<button data-capture-field="${label}" aria-pressed="${state.captureSettingsField === label}"><span>${label}</span>${overrides ? `<small>${overrides} ${overrides === 1 ? 'override' : 'overrides'}</small>` : ''}</button>`).join('')}`)
		.join(
			'',
		)}</aside><div class="capture-setting-main"><h2>${state.captureSettingsField}</h2><div class="capture-setting-tabs" role="tablist">${tabs.map(([id, label]) => `<button role="tab" data-capture-settings-tab="${id}" aria-selected="${state.captureSettingsTab === id}">${label}</button>`).join('')}</div>${state.captureSettingsTab === 'global' ? `<div class="capture-setting-info">Applies to all companies (4)</div><label class="capture-setting-control">Invoice data to use<select><option>${state.captureSettingsField === 'Supplier bank account' ? 'Vendor bank account (auto-selected)' : `${state.captureSettingsField} from captured invoice`}</option></select><small>${state.captureSettingsField === 'Supplier bank account' ? 'First non-empty of: bankgiro, IBAN, plusgiro, BIC/SWIFT, bank account number' : `Use the extracted ${state.captureSettingsField.toLowerCase()} when the field is present.`}</small></label><button class="capture-revert">Revert to default and save</button>` : state.captureSettingsTab === 'company' ? `<div class="capture-setting-info">${selected[1]} company overrides configured</div>${emptyState('Company-specific rules', 'Choose a company to inspect how this field overrides the global default.')}` : state.captureSettingsTab === 'vendor' ? `<div class="capture-setting-info">Vendor-specific extraction rules</div>${emptyState('No vendor selected', 'Select a vendor to inspect or add a field override.')}` : `<div class="capture-setting-info">Change history for ${state.captureSettingsField}</div><div class="capture-history"><strong>Global default confirmed</strong><span>Sep 12, 2026 · Alex Nguyen</span><p>No material setting changes in the current synthetic history.</p></div>`}</div></section>`;
	workspace.querySelector('.capture-detail-head > .back-button').insertAdjacentHTML('afterend', '<strong class="capture-current-title">Invoice data settings</strong>');
}

const health = (tone, label) => `<span class="log-health ${tone}"><span aria-hidden="true"></span>${label}</span>`;

function invoiceLog() {
	const matches = filtered()
		.filter((inv) => inv.id !== journeyInvoiceId || state.journeyStage >= 1)
		.filter((inv) => state.logFilter === 'all' || (state.logFilter === 'ai-match' ? inv.aiMatched : state.logFilter === 'approval' ? requiresAction(inv) : state.logFilter === 'approved' ? state.approved.has(inv.id) : inv.type === state.logFilter));
	const filters = [
		['all', 'All invoices'],
		['ai-match', 'AI matched'],
		['approval', 'In approval'],
		['exception', 'Exceptions'],
		['approved', 'Approved'],
	];
	const account = (tone, label) => `<span class="account-chip ${tone}"><span aria-hidden="true"></span>${label}</span>`;
	const logDate = (value) => {
		const [month, day, year] = value.replace(',', '').split(' ');
		return `${String(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month) + 1).padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
	};
	const number = (value) =>
		value.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	const selectedCount = state.logSelection.size;
	const rows = matches
		.map((inv) => {
			const proposal = inv.aiMatched ? account(matchTone(inv), 'AI generated') : inv.type === 'exception' ? account('bad', inv.flowProposal) : inv.flowProposal;
			const posting = inv.accountPosting.startsWith('AI generated') ? account(matchTone(inv), 'AI generated') : inv.accountPosting === 'Review required' ? account('bad', inv.accountPosting) : inv.accountPosting;
			const poState = inv.po === 'Non-PO' ? 'Non-PO verified' : inv.matchStatus === 'delivery-variance' ? 'Delivery variant' : inv.matchStatus === 'price-variance' ? 'Price variant' : inv.poTone === 'good' ? 'PO matched' : 'PO missing';
			const purchaseOrder = inv.matchBasis === 'contract' ? '—' : `<strong>${inv.po}</strong>${health(matchTone(inv), poState)}`;
			const contract = inv.contract ? `<strong>${inv.contract}</strong>${inv.matchBasis === 'contract' ? health('good', 'Contract matched') : ''}` : '—';
			const selectable = transferEligible(inv);
			return `<tr><td><input type="checkbox" data-log-select="${inv.id}" ${state.logSelection.has(inv.id) ? 'checked' : ''} ${selectable ? '' : 'disabled'} aria-label="${selectable ? `Select ${inv.vendorInvoice} for transfer` : `${inv.vendorInvoice} is not eligible for transfer`}" title="${selectable ? 'Select for transfer' : state.transferred.has(inv.id) ? 'Already in approval workflow' : 'Direct recording or reference invoice'}"></td><td>${inv.company || 30}</td><td><button class="table-link invoice-log-link" data-invoice="${inv.id}" aria-label="Open ${inv.id} from ${inv.vendor}"><strong>${inv.vendor}</strong><small>${inv.id}</small></button></td><td>${inv.vendorInvoice}</td><td>${proposal}</td><td>${posting}</td><td><strong class="invoice-code">${invoiceCode(inv)}</strong></td><td>${logDate(inv.accountingDate)}</td><td><span class="date-chip">${logDate(inv.due)}</span></td><td class="numeric">${number(inv.amount)}</td><td class="numeric">${number(inv.tax || 0)}</td><td class="numeric">${number(inv.taxRate || 0)}</td><td>${inv.currency}</td><td>${inv.information || (inv.type === 'exception' ? 'Review required' : 'Matching complete')}</td><td>${purchaseOrder}</td><td>${contract}</td><td>${health(matchTone(inv), matchLabel(inv))}</td><td>${status(inv)}</td></tr>`;
		})
		.join('');
	workspace.innerHTML =
		pageIntro('Invoice Log', 'Follow every captured invoice from AP review through approval and transfer.', '<button class="primary-button" data-view="to-verify">Open To Verify</button>') +
		`<div class="invoice-log-toolbar"><div class="filter-tabs" aria-label="Filter invoice log">${filters.map(([id, label]) => `<button data-log-filter="${id}" aria-pressed="${state.logFilter === id}">${label}</button>`).join('')}</div><div class="log-legend" aria-label="Invoice log status key">${health('good', 'Matched')}${health('warn', 'Review')}${health('bad', 'Exception')}</div></div><div class="invoice-log-batch"><button class="primary-button" data-action="log-transfer" ${selectedCount ? '' : 'disabled'}>Transfer${selectedCount ? ` · ${selectedCount}` : ''}</button><button data-action="log-open-approval" ${state.lastTransferredRole ? '' : 'disabled'}>Open approval queue</button><span>${selectedCount ? `${selectedCount} selected for approval workflow` : 'Select an eligible invoice to transfer'}</span></div><section class="panel table-wrap invoice-log-table">${rows ? dataTable(['', 'Company', 'Vendor', "Vendor's inv. no.", 'Flow proposal', 'Account posting', 'Code', 'Accounting date', 'Due date', 'Total', 'Tax', 'Tax %', 'Currency', 'Information', 'Purchase order', 'Contract', 'Match', 'Status'], rows) : emptyState('No matching invoices', 'Clear the search or choose another status.')}</section>`;
	workspace.insertAdjacentHTML('afterbegin', journeyStrip());
}

const invoiceDetailTabs = [
	['lines', 'Invoice lines'],
	['posting', 'Account posting'],
	['comments', 'Comments/attachments'],
];

function invoiceDetailPanel(inv) {
	if (state.invoiceDetailTab === 'posting')
		return `<div class="invoice-posting-summary"><div><span>Code</span><strong>${invoiceCode(inv)}</strong></div><div><span>Account posting</span><strong>${inv.accountPosting}</strong></div><div><span>Flow proposal</span><strong>${inv.flowProposal}</strong></div><div><span>Match result</span><strong>${matchLabel(inv)}</strong></div></div>`;
	if (state.invoiceDetailTab === 'comments') return `<div class="invoice-detail-comment"><strong>${inv.aiMatched ? 'AI matching evidence' : 'Matching evidence'}</strong><p>${inv.explanation}</p><small>Synthetic audit entry · today</small></div>`;
	if (inv.aiMatched) {
		const rows = inv.lines
			.map((line, index) => {
				const evidence = lineMatchEvidence(inv, line, index);
				return `<tr><td>${index + 1}</td><td><span class="line-code-chip ${evidence.tone}">${invoiceCode(inv)}</span></td><td>${line[0]}</td><td>${line[1]}</td><td class="numeric">${money(line[1] * line[2])}</td><td><p class="line-evidence-copy">${evidence.coding}</p></td><td><strong>${inv.flowProposal}</strong><p class="line-flow-reason">${evidence.flow}</p></td><td>${health(evidence.tone, matchLabel(inv))}</td></tr>`;
			})
			.join('');
		return `<div class="table-wrap invoice-detail-lines">${dataTable(['Line', 'Code', 'Description', 'Quantity', 'Amount', 'Coding explanation', 'Flow proposal explanation', 'AI match'], rows)}</div>`;
	}
	if (inv.matchBasis === 'po') {
		const rows = inv.lines
			.map((line, index) => {
				const evidence = lineMatchEvidence(inv, line, index);
				return `<tr><td>${index + 1}</td><td>${line[0]}</td><td><span class="po-match-reference"><span class="po-number-chip ${evidence.tone}" tabindex="0" aria-describedby="${evidence.tooltipId}">${inv.po}</span><button class="po-info-button" data-purchase-order="${inv.po}" aria-label="Open purchase order ${inv.po}">i</button><span class="po-match-tooltip" id="${evidence.tooltipId}" role="tooltip">${evidence.explanation}</span></span></td><td>${evidence.ordered}</td><td>${evidence.delivered}</td><td>${evidence.invoiced}</td><td class="numeric">${money(line[1] * line[2])}</td><td>${health(evidence.tone, matchLabel(inv))}</td></tr>`;
			})
			.join('');
		return `<div class="table-wrap invoice-detail-lines">${dataTable(['Line', 'Description', 'Purchase order', 'Ordered', 'Delivered', 'Invoiced', 'Amount', 'Match result'], rows)}</div>`;
	}
	const rows = inv.lines.map((line, index) => `<tr><td>${index + 1}</td><td>${line[0]}</td><td><span class="line-code-chip bad">No purchase order</span></td><td>${line[1]}</td><td class="numeric">${money(line[1] * line[2])}</td><td>${health('bad', matchLabel(inv))}</td></tr>`).join('');
	return `<div class="table-wrap invoice-detail-lines">${dataTable(['Line', 'Description', 'Purchase order', 'Quantity', 'Amount', 'Match result'], rows)}</div>`;
}

function purchaseOrderDetail() {
	const inv = state.selected;
	if (inv?.matchBasis !== 'po') {
		navigate('invoice-log');
		return;
	}
	const rows = inv.lines
		.map((line, index) => {
			const evidence = poLineEvidence(inv, line);
			return `<tr><td>${index + 1}</td><td>${line[0]}</td><td>${evidence.ordered}</td><td>${evidence.delivered}</td><td>${evidence.invoiced}</td><td class="numeric">${money(evidence.poUnitPrice)}</td><td class="numeric">${money(evidence.invoiceUnitPrice)}</td><td>${health(matchTone(inv), matchLabel(inv))}</td></tr>`;
		})
		.join('');
	workspace.innerHTML = `<div class="invoice-detail-toolbar">${backButton('Invoice detail', 'data-view="invoice-detail"')}<span>Purchase order ${inv.po}</span></div><section class="panel purchase-order-detail"><div class="document-pane-title">Purchase order</div><header><div><span>Purchase order</span><strong>${inv.po}</strong></div><div><span>Vendor</span><strong>${inv.vendor}</strong></div><div><span>Related invoice</span><strong>${inv.vendorInvoice}</strong></div><div><span>Match result</span><strong>${matchLabel(inv)}</strong></div></header>${matchSummary(inv)}<div class="table-wrap purchase-order-lines">${dataTable(['Line', 'Item description', 'Ordered', 'Delivered', 'Invoiced', 'PO unit price', 'Invoice unit price', 'Result'], rows)}</div></section>`;
}

function invoiceDetail() {
	const inv = state.selected;
	const records = invoices.filter((item) => item.id !== journeyInvoiceId || state.journeyStage >= 1);
	const index = records.findIndex((item) => item.id === inv.id);
	const transferred = state.transferred.has(inv.id);
	const fields = [
		['Company', `${inv.company || 30} · Northstar Manufacturing`],
		['Vendor', inv.vendor],
		["Vendor's invoice no.", inv.vendorInvoice],
		['Code', invoiceCode(inv)],
		['Account posting', inv.accountPosting],
		['Flow proposal', inv.flowProposal],
		['Purchase order', inv.po],
		['Contract', inv.contract || '—'],
		['Accounting date', inv.accountingDate],
		['Due date', inv.due],
		['Total amount', money(inv.amount)],
		['Currency', inv.currency],
	];
	workspace.innerHTML = `<div class="invoice-detail-toolbar">${backButton('Invoice Log', 'data-view="invoice-log"')}<span>${index + 1} of ${records.length}</span><button data-action="invoice-prev" ${index <= 0 ? 'disabled' : ''}>Previous</button><button data-action="invoice-next" ${index === records.length - 1 ? 'disabled' : ''}>Next</button><button data-action="invoice-save">Save</button><button data-action="invoice-match">Match</button><button class="invoice-transfer" data-action="invoice-transfer" ${transferEligible(inv) ? '' : 'disabled'}>${transferred ? 'Transferred' : 'Transfer'}</button></div><div class="invoice-detail-grid"><section class="panel invoice-detail-fields"><div class="document-pane-title">Invoice</div><dl>${fields.map(([label, value]) => `<dt>${label}</dt><dd class="${label === 'Code' ? 'invoice-code-value' : ''}">${value}</dd>`).join('')}</dl>${matchSummary(inv)}</section><section class="panel invoice-detail-preview"><div class="document-pane-title">Invoice image</div>${invoicePaper(inv)}</section><section class="panel invoice-detail-coding"><div class="invoice-detail-tabs" role="tablist" aria-label="Invoice coding information">${invoiceDetailTabs.map(([id, label]) => `<button role="tab" data-invoice-detail-tab="${id}" aria-selected="${state.invoiceDetailTab === id}">${label}</button>`).join('')}</div>${invoiceDetailPanel(inv)}</section></div>`;
	workspace.insertAdjacentHTML('afterbegin', journeyStrip());
}

function documentStatus(doc) {
	const outcome = state.documentOutcomes.get(doc.id);
	return outcome === 'approved' ? 'processed' : outcome || doc.status;
}
function documentStatusLabel(value) {
	return documentTabs.find(([id]) => id === value)?.[1] || (value === 'approved' ? 'Approved' : value);
}

function documentsInbox() {
	const companies = [...new Set(documents.map((doc) => doc.company))];
	const types = [...new Set(documents.map((doc) => doc.type))];
	const matches = documents.filter((doc) => documentStatus(doc) === state.documentTab && (state.documentCompany === 'all' || doc.company === state.documentCompany) && (state.documentType === 'all' || doc.type === state.documentType));
	const tabs = documentTabs
		.map(([id, label]) => {
			const count = documents.filter((doc) => documentStatus(doc) === id).length;
			return `<button data-document-tab="${id}" aria-pressed="${state.documentTab === id}"><span class="document-tab-mark" aria-hidden="true"></span>${label}<small>${count}</small></button>`;
		})
		.join('');
	const rows = matches
		.map(
			(doc) =>
				`<tr data-document-row><td><span class="document-state ${documentStatus(doc)}">${documentStatusLabel(documentStatus(doc))}</span></td><td>${doc.arrived}</td><td>${doc.type}</td><td><button class="table-link" data-document="${doc.id}" aria-label="Open ${doc.name}">${doc.name}</button></td><td>${doc.description}</td><td>${doc.created}</td><td>${doc.createdBy}</td><td>${doc.lines}</td><td>${doc.id.replace('DOC-', '')}</td></tr>`,
		)
		.join('');
	workspace.innerHTML =
		pageIntro('Documents', 'Route check requests, reimbursements, and supporting records through role-based review.', '<span class="simulation-label">Synthetic document workspace</span>') +
		`<section class="panel document-inbox"><div class="document-controls"><div class="document-tabs" aria-label="Document status">${tabs}</div><div class="document-filters"><label>Company<select id="document-company"><option value="all">All companies</option>${companies.map((company) => `<option value="${company}" ${state.documentCompany === company ? 'selected' : ''}>${company}</option>`).join('')}</select></label><label>Document type<select id="document-type"><option value="all">All document types</option>${types.map((type) => `<option value="${type}" ${state.documentType === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label></div></div><div class="table-wrap">${rows ? dataTable(['Status', 'Arrived', 'Document type', 'Name', 'Description', 'Created', 'Created by', 'Lines', 'Document ID'], rows) : emptyState('No documents in this view', 'Choose another status, company, or document type.')}</div></section>`;
}

function documentDetail() {
	const doc = state.selectedDocument;
	const outcome = state.documentOutcomes.get(doc.id);
	const currentStatus = documentStatus(doc);
	const complete = currentStatus === 'processed';
	const index = documents.findIndex((item) => item.id === doc.id);
	const statusCopy = outcome === 'approved' ? '<span class="status paid">Approved</span>' : `<span class="status ${currentStatus === 'return-to-ap' ? 'exception' : complete ? 'match' : 'approval'}">${documentStatusLabel(currentStatus)}</span>`;
	workspace.innerHTML = `<div class="document-toolbar">${backButton('Documents', 'data-view="documents"')}<span>${index + 1} of ${documents.length}</span><button data-action="document-prev" ${index === 0 ? 'disabled' : ''}>Previous</button><button data-action="document-next" ${index === documents.length - 1 ? 'disabled' : ''}>Next</button><button data-action="document-save">Save in simulation</button><button class="document-approve" data-action="document-approve" ${complete ? 'disabled' : ''}>${outcome === 'approved' ? 'Approved' : complete ? 'Processed' : 'Approve'}</button><button data-action="document-return">Return to AP</button><button data-action="document-email">Send to email</button></div>
    <div class="document-detail-grid">
      <section class="panel document-preview"><div class="document-pane-title">Document image</div><div class="document-paper"><div class="request-brand"><strong>Northstar Manufacturing</strong><span>${doc.documentNo}</span></div><h2>${doc.type}</h2><p class="request-subtitle">Non-PO payment authorization · synthetic demonstration record</p><div class="request-grid"><div><span>Document number</span><strong>${doc.documentNo}</strong></div><div><span>Submission date</span><strong>${doc.created}</strong></div><div><span>Requested pay date</span><strong>June 5, 2026</strong></div><div><span>Request category</span><strong>${doc.requestCategory}</strong></div></div><h3>Requester and entity</h3><div class="request-grid"><div><span>Requester name</span><strong>${doc.createdBy}</strong></div><div><span>Department</span><strong>Procurement</strong></div><div><span>Company</span><strong>${doc.company}</strong></div><div><span>Responsible role</span><strong>${doc.responsibleRole}</strong></div></div><h3>Payee</h3><div class="request-grid"><div><span>Payee name</span><strong>${doc.payee}</strong></div><div><span>Payment method</span><strong>Electronic check</strong></div></div><div class="request-total"><span>Net amount payable</span><strong>${money(doc.amount)}</strong></div></div></section>
      <section class="panel document-fields"><div class="document-pane-title">Document</div><dl><dt>Document ID</dt><dd>${doc.id.replace('DOC-', '')}</dd><dt>Document type</dt><dd>${doc.type}</dd><dt>Company</dt><dd>${doc.company}</dd><dt>Name</dt><dd>${doc.name}</dd><dt>Description</dt><dd>${doc.description}</dd><dt>Created by user</dt><dd>${doc.createdBy}</dd><dt>Responsible role</dt><dd>${doc.responsibleRole}</dd><dt>Status</dt><dd>${statusCopy}</dd></dl><h3>Index</h3><div class="document-index">Requester and entity<br>Payee<br>Payment detail</div></section>
      <div class="document-side-stack"><section class="panel document-flow"><div class="document-pane-title">Flow</div><div class="flow-role done">AP review</div><span aria-hidden="true">↓</span><div class="flow-role ${complete ? 'done' : 'active'}">${doc.responsibleRole}</div></section><section class="panel"><div class="document-pane-title">Document lines</div><div class="table-wrap">${dataTable(['Approved', 'Registered', 'Description', 'Filename'], `<tr><td>${complete ? 'Yes' : 'Waiting'}</td><td>${doc.responsibleRole}</td><td>${doc.name}</td><td>${doc.documentNo}.pdf</td></tr>`)}</div></section><section class="panel"><div class="document-pane-title">Comments</div><div class="empty compact"><p>No comments yet. This synthetic record is ready for review.</p></div></section></div>
    </div>`;
}

function contractsInbox() {
	const rows = contracts
		.map(
			(contract) =>
				`<tr data-contract-row><td><button class="table-link" data-contract="${contract.id}" aria-label="Open ${contract.name}">${contract.number}</button><small>${contract.id}</small></td><td><strong>${contract.name}</strong><small>${contract.partner}</small></td><td><span class="status match">${contract.status}</span></td><td>${contract.validFrom}</td><td>${contract.validTo}</td><td>${contract.renewal}</td><td class="numeric">${money(contract.annualValue)}</td></tr>`,
		)
		.join('');
	workspace.innerHTML =
		pageIntro('Contracts', 'Open an agreement to review its source, matching rules, validity, approval flow, and supporting files.', '<span class="simulation-label">Synthetic contract workspace</span>') +
		`<section class="panel contract-register"><div class="contract-register-summary"><div><strong>8</strong><span>active agreements</span></div><div><strong>6</strong><span>enabled for matching</span></div><div><strong>2</strong><span>renew within 90 days</span></div></div><div class="table-wrap">${dataTable(['Contract no.', 'Name and partner', 'Status', 'Valid from', 'Valid to', 'Renewal', 'Annual value'], rows)}</div></section>`;
}

function contractImage(contract) {
	return `<div class="contract-paper"><div class="contract-vendor"><div class="contract-vendor-mark">${contract.partner
		.split(' ')
		.map((word) => word[0])
		.join('')
		.slice(
			0,
			2,
		)}</div><div><strong>${contract.partner}</strong><span>Professional services · synthetic agreement</span></div><small>Invoice #${contract.invoiceNo}<br>Issued ${contract.issueDate}</small></div><h2>${contract.name}</h2><p>Thank you for your business.</p><div class="contract-bill"><div><span>Customer</span><strong>Northstar Manufacturing</strong><small>1200 Foundry Lane<br>Indianapolis, IN 46202</small></div><div><span>Invoice details</span><strong>Service date ${contract.issueDate}</strong><small>${contract.description}</small></div><div><span>Payment</span><strong>Due ${contract.dueDate}</strong><small>${contract.currency}</small></div></div><div class="contract-line"><strong>Items</strong><span>Quantity</span><span>Price</span><span>Amount</span></div><div class="contract-line contract-line-item"><span>${contract.line}</span><span>1</span><span>${money(contract.total)}</span><span>${money(contract.total)}</span></div><div class="contract-paper-total"><span>Total due</span><strong>${money(contract.total + contract.tax)}</strong></div></div>`;
}

function contractTabPanel(contract) {
	if (state.contractTab === 'account-posting')
		return `<div class="contract-tab-panel"><div class="contract-posting"><div><span>Account posting proposal</span><strong>${contract.posting}</strong></div><div><span>Use coding from invoice</span><strong>No</strong></div><div><span>Cost owner</span><strong>${contract.role}</strong></div></div></div>`;
	if (state.contractTab === 'attachments')
		return `<div class="contract-tab-panel"><div class="table-wrap">${dataTable(['Registered', 'Description', 'Filename'], `<tr><td>${contract.role}</td><td>${contract.line}</td><td><button class="table-link" data-action="contract-attachment">${contract.attachment}</button></td></tr>`)}</div></div>`;
	return `<div class="contract-tab-panel"><div class="table-wrap">${dataTable(['Approve', 'Approved', 'Registered', 'Description', 'Filename'], `<tr><td><input type="checkbox" aria-label="Approve ${contract.line}"></td><td>Waiting</td><td>${contract.role}</td><td>${contract.line}</td><td>${contract.attachment}</td></tr>`)}</div></div>`;
}

function contractDetail() {
	const contract = state.selectedContract;
	const index = contracts.findIndex((item) => item.id === contract.id);
	const fields = [
		['Contract ID', contract.id.replace('CT-', '')],
		['Created by', contract.createdBy],
		['Authorized by', contract.authorizedBy],
		['Company', contract.company],
		['Contract no.', contract.number],
		['Name', contract.name],
		['Description', contract.description],
		['Contract status', contract.status],
		['Contract total', money(contract.total)],
		['Valid from', contract.validFrom],
		['Valid to', contract.validTo],
		['Term of notice', `${contract.notice} months`],
		['Automatic extension', `${contract.extension} months`],
		['Currency', contract.currency],
		['Net amount', money(contract.total)],
		['Tax amount', money(contract.tax)],
		['Invoice match flow', contract.flow],
		['Partial match flow', contract.partialFlow],
		['Role on direct recording', contract.role],
		['Account posting proposal', contract.posting],
	];
	const tabs = [
		['contract-lines', 'Contract lines'],
		['account-posting', 'Account posting'],
		['attachments', 'Comments/attachments'],
	];
	workspace.innerHTML = `<div class="contract-toolbar">${backButton('Contracts', 'data-view="contracts"')}<span>${index + 1} of ${contracts.length}</span><button data-action="contract-prev" ${index === 0 ? 'disabled' : ''}>Previous</button><button data-action="contract-next" ${index === contracts.length - 1 ? 'disabled' : ''}>Next</button><button data-action="contract-copy">Create new as a copy</button><button class="contract-save" data-action="contract-save">Save in simulation</button><button data-action="contract-options">Options</button></div><div class="contract-detail-grid"><section class="panel contract-preview"><div class="document-pane-title">Contract image</div>${contractImage(contract)}</section><section class="panel contract-fields"><div class="document-pane-title">Contracts</div><div class="contract-field-list">${fields.map(([label, value], fieldIndex) => `<label><span>${label}</span>${fieldIndex === 6 ? `<textarea rows="3">${escapeHtml(value)}</textarea>` : `<input value="${escapeHtml(value)}" ${fieldIndex < 3 ? 'readonly' : ''}>`}</label>`).join('')}</div></section><div class="contract-side"><section class="panel contract-flow"><div class="document-pane-title">Flow</div><div class="flow-role done">Accounts Payable</div><span aria-hidden="true">↓</span><div class="flow-role done">CFO</div></section><section class="panel contract-tabs"><div class="contract-tab-list" role="tablist" aria-label="Contract information">${tabs.map(([id, label]) => `<button role="tab" data-contract-tab="${id}" aria-selected="${state.contractTab === id}">${label}</button>`).join('')}</div>${contractTabPanel(contract)}</section></div></div>`;
}

const approvalTabs = [
	['inbound', 'Inbound'],
	['to-be-processed', 'To be processed'],
	['being-checked', 'Being checked'],
	['processed', 'Processed'],
	['return-to-ap', 'Return to AP'],
];
const approvalQueueStatus = (inv) => (state.approved.has(inv.id) ? 'processed' : state.approvalQueueState.get(inv.id) || 'to-be-processed');

function approvalRoleInvoices() {
	return invoices.filter(requiresAction).filter((inv) => state.roleFilter === 'all' || inv.role === state.roleFilter);
}

function approvalQueueInvoices() {
	const start = state.approvalDueFrom ? new Date(`${state.approvalDueFrom}T00:00:00`).getTime() : 0;
	const end = state.approvalDueTo ? new Date(`${state.approvalDueTo}T23:59:59`).getTime() : Number.POSITIVE_INFINITY;
	const query = state.query.toLowerCase().trim();
	const vendor = state.approvalVendor.toLowerCase().trim();
	return approvalRoleInvoices().filter((inv) => {
		const company = String(inv.company || 30);
		const due = new Date(inv.due).getTime();
		const searchable = `${company} ${inv.vendor} ${inv.vendorInvoice} ${inv.id} ${inv.po} ${inv.accountPosting}`.toLowerCase();
		return approvalQueueStatus(inv) === state.approvalTab && (!query || searchable.includes(query)) && (state.approvalCompany === 'all' || company === state.approvalCompany) && (!vendor || inv.vendor.toLowerCase().includes(vendor)) && due >= start && due <= end;
	});
}

function approvalReport() {
	if (state.approvalScreen === 'detail') {
		approvalDetail();
		return;
	}
	const roleInvoices = approvalRoleInvoices();
	const matches = approvalQueueInvoices();
	const selectedCount = state.approvalSelection.size;
	const companies = [...new Set(roleInvoices.map((inv) => String(inv.company || 30)))].sort();
	const statusLabels = Object.fromEntries(approvalTabs);
	const rows = matches
		.map(
			(inv) =>
				`<tr><td><input type="checkbox" data-approval-select="${inv.id}" ${state.approvalSelection.has(inv.id) ? 'checked' : ''} aria-label="Select ${inv.vendorInvoice}"></td><td><span class="approval-state ${approvalQueueStatus(inv)}"><span></span>${statusLabels[approvalQueueStatus(inv)]}</span></td><td>${inv.company || 30}</td><td><button class="table-link" data-approval-invoice="${inv.id}" aria-label="Open ${inv.vendorInvoice} from ${inv.vendor}">${inv.vendor}</button></td><td>${inv.vendorInvoice}</td><td>${inv.po === 'No PO' ? '—' : inv.po}</td><td>${inv.contract || '—'}</td><td class="numeric">${number(inv.amount)}</td><td>${inv.currency}</td><td>${inv.accountingDate}</td><td><span class="date-chip">${inv.due}</span></td><td>${inv.id.replace(/\D/g, '')}</td><td>${matchLabel(inv)}</td></tr>`,
		)
		.join('');
	const roleLabel = state.roleFilter === 'all' ? 'All approval roles' : approvalRoles.find((role) => role.id === state.roleFilter)?.label;
	workspace.innerHTML = `${journeyStrip()}${pageIntro('Invoices', `${roleLabel} work queue with invoice evidence, matching status, and due dates.`, '<button class="primary-button" data-action="export">Download synthetic CSV</button>')}<section class="panel approval-inbox"><div class="approval-tabs" role="tablist" aria-label="Approval queue status">${approvalTabs.map(([id, label]) => `<button role="tab" data-approval-tab="${id}" aria-selected="${state.approvalTab === id}"><span class="document-tab-mark" aria-hidden="true"></span>${label}<small>${roleInvoices.filter((inv) => approvalQueueStatus(inv) === id).length}</small></button>`).join('')}</div><div class="approval-filters"><label>Company<select id="approval-company"><option value="all">All companies</option>${companies.map((company) => `<option value="${company}" ${state.approvalCompany === company ? 'selected' : ''}>${company}</option>`).join('')}</select></label><label>Vendor<input id="approval-vendor" value="${escapeHtml(state.approvalVendor)}" placeholder="Supplier name or number"></label><label>Due date from<input id="approval-due-from" type="date" value="${state.approvalDueFrom}"></label><label>Due date to<input id="approval-due-to" type="date" value="${state.approvalDueTo}"></label></div><div class="approval-batch"><button class="primary-button" data-action="approval-batch-approve" ${selectedCount ? '' : 'disabled'}>Approve${selectedCount ? ` · ${selectedCount}` : ''}</button><button data-action="approval-match-po" ${selectedCount ? '' : 'disabled'}>Match to PO</button><span>${matches.length} ${matches.length === 1 ? 'invoice' : 'invoices'} in this queue</span></div><div class="table-wrap approval-table">${rows ? dataTable(['', 'Status', 'Company', 'Vendor', "Vendor's invoice no.", 'Purchase order', 'Contract', 'Total amount', 'Currency', 'Accounting date', 'Due date', 'Serial no.', 'Latest comment'], rows) : emptyState(`No invoices in ${statusLabels[state.approvalTab]}`, 'Choose another workflow tab or clear a filter.')}</div></section>`;
}

function approvalDetail() {
	const inv = state.selected;
	if (!requiresAction(inv)) {
		state.approvalScreen = 'queue';
		approvalReport();
		return;
	}
	const roleInvoices = approvalRoleInvoices();
	const index = roleInvoices.findIndex((item) => item.id === inv.id);
	const approved = state.approved.has(inv.id);
	const lineRows = inv.lines.map((line, lineIndex) => `<tr><td>${lineIndex + 1}</td><td>${line[0]}</td><td>${invoiceCode(inv)}</td><td>${line[1]}</td><td class="numeric">${money(line[1] * line[2])}</td><td>${inv.varianceLabel}</td></tr>`).join('');
	const fields = [
		['Company', `${inv.company || 30} · Northstar Manufacturing`],
		['Vendor', inv.vendor],
		["Vendor's invoice no.", inv.vendorInvoice],
		['Accounting date', inv.accountingDate],
		['Due date', inv.due],
		['Total amount', money(inv.amount)],
		['Currency', inv.currency],
		['Purchase order', inv.po],
		['Contract', inv.contract || '—'],
	];
	const postingEvidence = inv.aiMatched ? `<span>Confidence<strong>${inv.confidence}%</strong></span>` : `<span>Match result<strong>${matchLabel(inv)}</strong></span>`;
	workspace.innerHTML = `<div class="approval-toolbar">${backButton('approval queue', 'data-action="approval-back"')}<span>${index + 1} of ${roleInvoices.length}</span><button data-action="approval-prev" ${index <= 0 ? 'disabled' : ''}>Previous</button><button data-action="approval-next" ${index === roleInvoices.length - 1 ? 'disabled' : ''}>Next</button><button data-action="approval-save">Save</button><button class="approval-approve" data-action="approval-approve" ${approved ? 'disabled' : ''}>${approved ? 'Approved' : 'Approve'}</button><button data-action="approval-return">Return to AP</button><button data-action="approval-options">Options</button><button data-action="approval-purchase-order" ${inv.matchBasis === 'non-po' || inv.po === 'No PO' ? 'disabled' : ''}>Purchase order</button></div><div class="approval-detail-grid"><section class="panel approval-preview"><div class="document-pane-title">Invoice image</div>${invoicePaper(inv)}</section><section class="panel approval-data"><div class="document-pane-title">Invoice</div><dl>${fields.map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`).join('')}</dl><div class="document-pane-title">${inv.aiMatched ? 'AI matching' : 'Purchase order matching'}</div>${matchSummary(inv)}<div class="document-pane-title">Account posting</div><div class="approval-posting"><span>Flow proposal<strong>${inv.flowProposal}</strong></span><span>Code<strong>${invoiceCode(inv)}</strong></span>${postingEvidence}</div><div class="table-wrap approval-lines">${dataTable(['Line', 'Description', 'Code', 'Quantity', 'Amount', 'Match result'], lineRows)}</div></section><aside class="approval-side"><section class="panel approval-flow"><div class="document-pane-title">Flow</div><div class="flow-role done">Accounts Payable</div><span aria-hidden="true">↓</span><div class="flow-role ${approved ? 'done' : 'active'}">${approvalRole(inv).label}</div></section><section class="panel approval-comments"><div class="document-pane-title">Comments</div><div><strong>${inv.aiMatched ? 'Matched by AI' : 'Matching explanation'}</strong><p>${inv.explanation}</p><small>Rillion matching service · today</small></div><div><strong>${approved ? 'Approval completed' : 'Approval required'}</strong><p>${approved ? `${inv.owner} approved this invoice.` : `${inv.owner} owns the next decision.`}</p><small>${approvalRole(inv).label}</small></div></section></aside></div>`;
}

function analytics() {
	const report = analyticsReports[state.analytics];
	workspace.innerHTML =
		pageIntro('Rillion Analytics', 'Explore representative Analytics views in the same board order as the Rillion platform.', `<span class="analytics-count">${state.analytics + 1} of ${analyticsReports.length}</span>`) +
		`<div class="analytics-layout"><nav class="panel analytics-menu" aria-label="Analytics boards">${analyticsReports.map((item, index) => `${index === 0 || item.group !== analyticsReports[index - 1].group ? `<p class="analytics-group">${item.group}</p>` : ''}<button data-analytics="${index}" aria-current="${index === state.analytics ? 'page' : 'false'}"><span>${item.title}</span><small>${index === state.analytics ? 'Viewing now' : 'Open board'}</small></button>`).join('')}</nav><section class="panel analytics-stage"><div class="analytics-head"><div><span class="analytics-board-group">${report.group}</span><h2>${report.title}</h2><p>${report.copy}</p></div><div class="analytics-actions"><button class="quiet-control" data-action="analytics-prev" ${state.analytics === 0 ? 'disabled' : ''}>Previous</button><button class="primary-button" data-action="analytics-next">${state.analytics === analyticsReports.length - 1 ? 'Back to first' : 'Next board'}</button></div></div><button class="analytics-canvas" data-action="analytics-next" aria-label="Continue from ${report.title} to the next Analytics board"><span class="analytics-image-frame${report.leftRail ? ' analytics-image-frame--left-rail' : ''}"><img src="${report.image}" alt="${report.title} Analytics dashboard with demonstration data" loading="lazy" decoding="async" width="3200" height="1562"></span><span class="analytics-continue">Click the board to continue</span></button><p class="reference-note">Reference screen from Rillion Analytics · demonstration data</p></section></div>`;
}

function reports() {
	workspace.innerHTML =
		pageIntro('AP performance', 'A synthetic view of invoice throughput, exceptions, and approval speed.', '<button class="primary-button" data-action="export">Download synthetic CSV</button>') +
		`<div class="report-grid"><section class="panel"><div class="panel-head"><h3>Invoices processed</h3><span>Last 6 months</span></div><div class="chart">${[54, 66, 58, 81, 74, 92].map((value, index) => `<div class="bar" style="height:${value}%"><span>${['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][index]}</span></div>`).join('')}</div></section><section class="panel"><div class="panel-head"><h3>Operational health</h3></div><div class="metric-list">${[
			['94%', 'touchless match'],
			['1.8 days', 'approval cycle'],
			['3.2%', 'exception rate'],
			['100%', 'audit trail coverage'],
		]
			.map(([value, label]) => `<div class="metric"><strong>${value}</strong><span>${label}</span></div>`)
			.join('')}</div></section></div>`;
}

const paymentTabFor = (payment) => (payment.journey && state.journeyStage < 3 ? null : state.paymentMoves.get(payment.id) || payment.tab);

function paymentTabCount(tab) {
	const base = paymentTabs.find((item) => item[0] === tab)[2];
	return payments.reduce((count, payment) => {
		const current = paymentTabFor(payment);
		if (payment.journey) return count + (current === tab ? 1 : 0);
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
	const records = payments
		.filter((payment) => paymentTabFor(payment) === state.paymentTab)
		.filter((payment) => !query || `${payment.id} ${payment.vendor}`.toLowerCase().includes(query))
		.filter((payment) => state.paymentVendor === 'all' || payment.vendor === state.paymentVendor)
		.filter((payment) => state.paymentMethod === 'all' || payment.method === state.paymentMethod)
		.filter((payment) => !state.paymentDate || (payment[dateField] && new Date(payment[dateField]) >= new Date(`${state.paymentDate}T00:00:00`)));
	const vendors = [...new Set(payments.map((payment) => payment.vendor))].sort();
	const methods = [...new Set(payments.map((payment) => payment.method))].sort();
	const selectedCount = state.paymentSelection.size;
	const heads = {
		ready: ['<span class="sr-only">Select</span>', 'Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Due date', 'Amount', 'Payment method', 'Last approver(s)', 'Invoice approval date'],
		awaiting: ['Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Due date', 'Amount', 'Current approver', 'Status'],
		'in-progress': ['Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Amount', 'Payment method', 'Payment sent by', 'Payment sent on', 'Status'],
		completed: ['Invoice no.', 'Company', 'Vendor', 'Invoice date', 'Amount', 'Payment method', 'Payment sent by', 'Payment sent on', 'Payment date', 'Payment reference ID', 'Status'],
	}[state.paymentTab];
	const total = records.reduce((sum, payment) => sum + payment.amount, 0);
	const batchActions =
		state.paymentTab === 'ready'
			? `<div class="payment-batch"><button class="icon-control" data-action="payment-export" aria-label="Download synthetic payment list">↓</button><button data-action="payment-outside" ${selectedCount ? '' : 'disabled'}>Pay outside Rillion</button><button data-action="payment-send" ${selectedCount ? '' : 'disabled'}>Send for payment</button><span>${selectedCount ? `${selectedCount} selected` : 'Select invoices to continue'}</span></div>`
			: '<div class="payment-batch"><button class="icon-control" data-action="payment-export" aria-label="Download synthetic payment list">↓</button></div>';
	workspace.innerHTML = `<div class="payments-head"><div><h2>Payments</h2><div class="payment-tabs" role="tablist" aria-label="Payment status">${paymentTabs.map(([id, label]) => `<button role="tab" data-payment-tab="${id}" aria-selected="${state.paymentTab === id}">${label} <span>(${paymentTabCount(id)})</span></button>`).join('')}</div></div><div class="payment-head-actions"><button data-action="payment-manage">Manage</button><button data-action="payment-portal">Payment portal ↗</button></div></div>
    <section class="panel payments-panel"><div class="payment-filters"><label><span>Invoice number</span><input id="payment-query" value="${escapeHtml(state.paymentQuery)}" placeholder="Invoice number"></label><label><span>Vendor</span><select id="payment-vendor"><option value="all">Name or number</option>${vendors.map((vendor) => `<option ${state.paymentVendor === vendor ? 'selected' : ''}>${vendor}</option>`).join('')}</select></label><label><span>Payment method</span><select id="payment-method"><option value="all">All methods</option>${methods.map((method) => `<option ${state.paymentMethod === method ? 'selected' : ''}>${method}</option>`).join('')}</select></label><label class="payment-date"><span>${dateLabel}</span><input id="payment-date" type="date" value="${state.paymentDate}" aria-label="${dateLabel} from"></label></div>${batchActions}<div class="table-wrap payment-table">${records.length ? dataTable(heads, records.map(paymentRow).join('')) : emptyState('No matching payments', 'Clear a filter or choose another payment status.')}</div><div class="payment-total"><span>Showing ${records.length} representative ${records.length === 1 ? 'invoice' : 'invoices'} · ${paymentTabCount(state.paymentTab)} total</span><strong>${money(total)} USD</strong></div></section>`;
	workspace.insertAdjacentHTML('afterbegin', journeyStrip());
}

function tablePage(kind) {
	const content = {
		tasks: [
			'My tasks',
			'Everything currently waiting for action.',
			['Invoice', 'Vendor', 'Amount', 'Purchase order', 'Status'],
			filtered()
				.filter(requiresAction)
				.map((inv) => [inv.id, inv.vendor, money(inv.amount), inv.po, state.approved.has(inv.id) ? 'Approved' : inv.status]),
		],
		requisitions: [
			'Requisitions',
			'Requested spend, ownership, and fulfillment status.',
			['Requisition', 'Requester', 'Vendor', 'Amount', 'Status'],
			invoices.map((inv, index) => [`REQ-${4021 + index}`, ['Taylor Brooks', 'Avery Morgan', 'Jordan Lee'][index % 3], inv.vendor, money(inv.amount), index < 3 ? 'Converted to PO' : 'In approval']),
		],
	}[kind];
	const [title, copy, heads, rowData] = content;
	const rows = rowData
		.map(
			(row) =>
				`<tr ${String(row[0]).startsWith('INV') ? `data-invoice="${row[0]}" tabindex="0" role="link" aria-label="Open ${row[0]} from ${row[1]}"` : ''}>${row.map((cell, index) => `<td>${index === heads.length - 1 ? `<span class="status ${String(cell).includes('Exception') ? 'exception' : 'match'}">${cell}</span>` : cell}</td>`).join('')}</tr>`,
		)
		.join('');
	workspace.innerHTML = pageIntro(title, copy, '<button class="primary-button" data-action="tour">Show me how it works</button>') + `<section class="panel table-wrap">${rows ? dataTable(heads, rows) : emptyState('No matching results', 'Try an invoice number, vendor, purchase order, or owner.')}</section>`;
}

function overviewPage(kind) {
	const pages = {
		profile: [
			'My profile',
			'Your demo identity and approval authority.',
			[
				['Role', 'AP Manager'],
				['Company', 'Northstar Manufacturing'],
				['Approval limit', '$50,000'],
				['Language', 'English'],
			],
		],
		budget: [
			'Budget requests',
			'Plan and approve spend before it becomes a requisition.',
			[
				['Open requests', '4'],
				['Awaiting your approval', '2'],
				['Approved this month', '11'],
				['Available budget', '$184,200'],
			],
		],
		administration: [
			'Administration',
			'A representative view of configuration ownership.',
			[
				['Companies', '3 active'],
				['Users', '42 active'],
				['Approval roles', '12 configured'],
				['Integrations', 'ERP connected'],
			],
		],
		system: [
			'System',
			'A read-only overview of the synthetic demo environment.',
			[
				['Environment', 'Interactive simulation'],
				['Data source', 'Synthetic browser data'],
				['Authentication', 'Not required'],
				['External writes', 'Disabled'],
			],
		],
	};
	const [title, copy, entries] = pages[kind];
	workspace.innerHTML = pageIntro(title, copy, '<span class="simulation-label">Read-only simulation</span>') + `<section class="panel settings-list">${entries.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</section>`;
}

function pageIntro(title, copy, action = '') {
	return `<div class="page-intro"><div><h2>${title}</h2><p>${copy}</p></div>${action}</div>`;
}
function dataTable(heads, rows) {
	return `<table class="data-table"><thead><tr>${heads.map((head) => `<th>${head}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
}
function emptyState(title, copy) {
	return `<div class="empty"><h3>${title}</h3><p>${copy}</p></div>`;
}

function render() {
	if (!allViews.includes(state.view)) state.view = 'dashboard';
	renderNav();
	syncRoleCounts();
	document.querySelector('#role-select').value = state.roleFilter;
	document.querySelector('#page-title').textContent = state.view === 'dashboard' ? 'Good morning, Alex' : labels[state.view] || 'Rillion';
	if (state.view === 'dashboard') dashboard();
	else if (state.view === 'to-verify') toVerify();
	else if (state.view === 'invoice-log') invoiceLog();
	else if (state.view === 'invoice-detail') invoiceDetail();
	else if (state.view === 'purchase-order-detail') purchaseOrderDetail();
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
	if (state.scenario) workspace.insertAdjacentHTML('afterbegin', scenarioBanner());
}

function syncRoleCounts() {
	const actionable = invoices.filter(requiresAction);
	for (const option of document.querySelector('#role-select').options) {
		const role = approvalRoles.find((item) => item.id === option.value);
		const count = option.value === 'all' ? actionable.length : actionable.filter((inv) => inv.role === option.value).length;
		option.textContent = `${role?.label || 'All roles'} · ${count}`;
	}
}

function syncUrlState(view) {
	const url = new URL(location.href);
	url.hash = view;
	const isInvoiceDetail = view === 'invoice-detail' || view === 'purchase-order-detail';
	if (state.scenario || isInvoiceDetail) url.searchParams.set('view', view);
	else url.searchParams.delete('view');
	if (isInvoiceDetail) url.searchParams.set('invoice', state.selected.id);
	else url.searchParams.delete('invoice');
	if (view === 'purchase-order-detail' && state.selected.po) url.searchParams.set('po', state.selected.po);
	else url.searchParams.delete('po');
	history.replaceState(null, '', url);
}

function navigate(view) {
	if (view === 'to-verify') state.captureScreen = 'queue';
	state.view = view;
	syncUrlState(view);
	render();
	workspace.focus({ preventScroll: true });
}

const tourSets = {
	platform: [
		{
			title: 'Start with the work queue',
			copy: 'Rillion brings approvals, matching exceptions, and AP review into one prioritized queue.',
			view: 'dashboard',
		},
		{
			title: 'Verify LLM AI captured invoices',
			copy: 'To Verify keeps extracted fields and source evidence together before an invoice enters the log.',
			view: 'to-verify',
		},
		{
			title: 'Follow the Invoice Log',
			copy: 'The log keeps status, ownership, and purchasing evidence visible from receipt through transfer.',
			view: 'invoice-log',
		},
		{
			title: 'See why AI chose the coding & approvals',
			copy: 'Open an AI-matched invoice to review its confidence-colored code, coding rationale, and flow-proposal rationale.',
			view: 'invoice-detail',
			selected: 'INV-82416',
		},
		{
			title: 'Inspect a purchase-order variance',
			copy: 'Open the related purchase order to compare ordered, delivered, and invoiced quantities with the price evidence.',
			view: 'purchase-order-detail',
			selected: 'INV-80116',
		},
		{
			title: 'Measure approvals',
			copy: 'Choose a role to see who owns each decision and how quickly work moves.',
			view: 'approval-report',
			role: 'department-manager',
		},
		{
			title: 'Track payments',
			copy: 'Payments keeps approved invoices visible from posting readiness through settlement.',
			view: 'payments',
			paymentTab: 'ready',
		},
		{
			title: 'Explore Analytics',
			copy: 'Explore eleven source-faithful boards in the same order as Rillion Analytics.',
			view: 'analytics',
			analytics: 1,
		},
	],
	ap: [
		{
			title: 'See today’s AP work',
			copy: 'Start with one prioritized queue for approvals, exceptions, and review.',
			view: 'dashboard',
		},
		{
			title: 'Verify the source invoice',
			copy: 'Compare extracted fields, source evidence, and coding before release.',
			view: 'to-verify',
		},
		{
			title: 'Control the Invoice Log',
			copy: 'Track flow, coding, purchasing evidence, matching, and ownership in one grid.',
			view: 'invoice-log',
		},
		{
			title: 'Review AI matching evidence',
			copy: 'See the proposed code and approval flow with the evidence that explains both choices.',
			view: 'invoice-detail',
			selected: 'INV-82416',
		},
		{
			title: 'Review a PO price variance',
			copy: 'Compare the purchase-order and invoice unit prices before the invoice moves forward.',
			view: 'purchase-order-detail',
			selected: 'INV-80116',
		},
		{
			title: 'Prepare payment',
			copy: 'Move approved invoices into the right payment path with a visible audit state.',
			view: 'payments',
			paymentTab: 'ready',
		},
		{
			title: 'Improve the process',
			copy: 'Use Active invoices to find volume, bottlenecks, exceptions, and match health.',
			view: 'analytics',
			analytics: 1,
		},
	],
	approver: [
		{
			title: 'Open your approval role',
			copy: 'Your role view shows only decisions assigned to you.',
			view: 'approval-report',
			role: 'department-manager',
		},
		{
			title: 'Review invoice evidence',
			copy: 'The invoice, extracted fields, PO match, and prior handoffs stay together.',
			view: 'dashboard',
			selected: journeyInvoiceId,
		},
		{
			title: 'See what happens next',
			copy: 'After approval, the invoice becomes ready for payment without losing its audit trail.',
			view: 'payments',
			paymentTab: 'ready',
		},
	],
	finance: [
		{
			title: 'See payment readiness',
			copy: 'Track ready, awaiting, in-progress, and completed payments in one workspace.',
			view: 'payments',
			paymentTab: 'ready',
		},
		{
			title: 'Monitor AP performance',
			copy: 'Review throughput, exception rate, approval speed, and audit coverage.',
			view: 'reports',
		},
		{
			title: 'Explore executive Analytics',
			copy: 'Review the source-faithful Executive dashboard and continue through the Rillion Analytics board sequence.',
			view: 'analytics',
			analytics: 8,
		},
		{
			title: 'Inspect contract controls',
			copy: 'See validity, matching rules, approval flow, coding, and supporting evidence together.',
			view: 'contracts',
		},
	],
};
let tourReturnFocus = null;

function setWelcomeModal(active) {
	const shell = document.querySelector('#app-shell');
	shell.inert = active;
	active ? shell.setAttribute('aria-hidden', 'true') : shell.removeAttribute('aria-hidden');
}

function showTour() {
	const steps = tourSets[state.tourPersona] || tourSets.platform;
	const step = steps[state.tour];
	const panel = document.querySelector('#tour');
	state.tourComplete = false;
	setWelcomeModal(false);
	panel.hidden = false;
	panel.classList.remove('is-welcome', 'is-complete');
	panel.setAttribute('aria-modal', 'false');
	document.querySelector('#tour-scrim').hidden = true;
	document.querySelector('#tour-personas').hidden = true;
	document.querySelector('#tour-shortcuts').hidden = true;
	document.querySelector('#tour-start').hidden = true;
	document.querySelector('#tour-demo').hidden = true;
	document.querySelector('#tour-back').hidden = state.tour === 0;
	document.querySelector('#tour-next').hidden = false;
	document.querySelector('#tour-next').textContent = state.tour === steps.length - 1 ? 'Complete walkthrough' : 'Next';
	document.querySelector('#tour-close').textContent = 'Exit walkthrough';
	document.querySelector('#tour-count').textContent = `${state.tour + 1} of ${steps.length}`;
	document.querySelector('#tour-title').textContent = step.title;
	document.querySelector('#tour-copy').textContent = step.copy;
	if (step.role) state.roleFilter = step.role;
	if (step.paymentTab) state.paymentTab = step.paymentTab;
	if (step.analytics !== undefined) state.analytics = step.analytics;
	if (step.selected) state.selected = invoices.find((inv) => inv.id === step.selected) || state.selected;
	state.view = step.view;
	syncUrlState(step.view);
	render();
	document.querySelector('#tour-status').textContent = `${step.title}. Step ${state.tour + 1} of ${steps.length}.`;
}

function showTourComplete() {
	const panel = document.querySelector('#tour');
	state.tourComplete = true;
	panel.classList.add('is-complete');
	document.querySelector('#tour-back').hidden = false;
	document.querySelector('#tour-next').hidden = false;
	document.querySelector('#tour-next').textContent = 'Continue exploring';
	document.querySelector('#tour-demo').hidden = false;
	document.querySelector('#tour-count').textContent = 'Walkthrough complete';
	document.querySelector('#tour-title').textContent = 'Ready to see Rillion with your process?';
	document.querySelector('#tour-copy').textContent = 'Request a tailored live demo, or continue exploring this synthetic workspace on your own.';
	document.querySelector('#tour-status').textContent = 'Walkthrough complete. Request a live demo or continue exploring.';
	document.querySelector('#tour-demo').focus({ preventScroll: true });
}

function closeTour(restoreFocus = true) {
	document.querySelector('#tour').hidden = true;
	document.querySelector('#tour-scrim').hidden = true;
	setWelcomeModal(false);
	state.tour = -1;
	state.tourComplete = false;
	if (restoreFocus) (tourReturnFocus?.isConnected ? tourReturnFocus : document.querySelector('.tour-launch'))?.focus({ preventScroll: true });
}

function showTourWelcome() {
	const panel = document.querySelector('#tour');
	tourReturnFocus = document.activeElement?.closest?.('button, a, input, select') || document.querySelector('.tour-launch');
	state.tour = -1;
	state.tourComplete = false;
	panel.hidden = false;
	panel.classList.add('is-welcome');
	panel.classList.remove('is-complete');
	panel.setAttribute('aria-modal', 'true');
	setWelcomeModal(true);
	document.querySelector('#tour-scrim').hidden = false;
	document.querySelector('#tour-personas').hidden = false;
	document.querySelector('#tour-shortcuts').hidden = false;
	document.querySelector('#tour-start').hidden = false;
	document.querySelector('#tour-demo').hidden = true;
	document.querySelector('#tour-back').hidden = true;
	document.querySelector('#tour-next').hidden = true;
	document.querySelector('#tour-close').textContent = 'Explore on my own';
	document.querySelector('#tour-count').textContent = 'Explore Rillion';
	document.querySelector('#tour-title').textContent = 'Choose the walkthrough that fits your role';
	document.querySelector('#tour-copy').textContent = 'Start with your day-to-day work, take the full platform tour, jump to a module, or explore freely.';
	document.querySelector('#tour-status').textContent = 'Welcome to the Rillion interactive demo. Choose a walkthrough or platform area.';
	requestAnimationFrame(() => document.querySelector('[data-tour-persona="ap"]').focus({ preventScroll: true }));
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
	const link = Object.assign(document.createElement('a'), {
		href: url,
		download: 'rillion-synthetic-ap-report.csv',
	});
	link.click();
	URL.revokeObjectURL(url);
	toast('Synthetic report downloaded');
}

function downloadPayments() {
	const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;
	const records = payments.filter((payment) => paymentTabFor(payment) === state.paymentTab);
	const csv = [
		['Invoice number', 'Company', 'Vendor', 'Invoice date', 'Due or payment date', 'Amount USD', 'Payment method', 'Status'],
		...records.map((payment) => [payment.id, payment.company, payment.vendor, payment.invoiceDate, payment.dueDate || payment.paymentDate || '', payment.amount, payment.method, payment.status || state.paymentTab]),
	]
		.map((row) => row.map(csvCell).join(','))
		.join('\n');
	const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
	const link = Object.assign(document.createElement('a'), {
		href: url,
		download: `rillion-synthetic-payments-${state.paymentTab}.csv`,
	});
	link.click();
	URL.revokeObjectURL(url);
	toast(`Synthetic ${paymentTabs.find(([id]) => id === state.paymentTab)[1]} CSV downloaded`);
}

function openInvoice(id) {
	state.selected = invoices.find((inv) => inv.id === id) || state.selected;
	state.fieldsExpanded = false;
	state.invoiceDetailTab = 'lines';
	navigate('invoice-detail');
}

function openApprovalInvoice(id) {
	state.selected = invoices.find((inv) => inv.id === id) || state.selected;
	if (approvalQueueStatus(state.selected) === 'to-be-processed') state.approvalQueueState.set(state.selected.id, 'being-checked');
	state.approvalScreen = 'detail';
	navigate('approval-report');
}

function scenarioUrl(persona) {
	const url = new URL(location.href);
	url.search = '';
	url.searchParams.set('scenario', persona);
	url.searchParams.set('view', scenarioConfig[persona].view);
	url.searchParams.set('welcome', '0');
	url.hash = scenarioConfig[persona].view;
	return url.href;
}

async function copyScenario(persona) {
	const value = scenarioUrl(persona);
	try {
		await navigator.clipboard.writeText(value);
	} catch {
		const input = Object.assign(document.createElement('input'), { value });
		document.body.append(input);
		input.select();
		document.execCommand('copy');
		input.remove();
	}
	toast(`${scenarioConfig[persona].label} scenario link copied`);
}

document.addEventListener('click', (event) => {
	const group = event.target.closest('[data-nav-group]')?.dataset.navGroup;
	const view = event.target.closest('[data-view]')?.dataset.view;
	const invoiceControl = event.target.closest('[data-invoice]');
	const invoice = invoiceControl?.dataset.invoice;
	const approvalInvoice = event.target.closest('[data-approval-invoice]')?.dataset.approvalInvoice;
	const approvalTab = event.target.closest('[data-approval-tab]')?.dataset.approvalTab;
	const captureInvoice = event.target.closest('[data-capture-invoice]')?.dataset.captureInvoice;
	const captureField = event.target.closest('[data-capture-field]')?.dataset.captureField;
	const captureSettingsTab = event.target.closest('[data-capture-settings-tab]')?.dataset.captureSettingsTab;
	const documentId = event.target.closest('[data-document]')?.dataset.document;
	const documentTab = event.target.closest('[data-document-tab]')?.dataset.documentTab;
	const contractId = event.target.closest('[data-contract]')?.dataset.contract;
	const contractTab = event.target.closest('[data-contract-tab]')?.dataset.contractTab;
	const invoiceDetailTab = event.target.closest('[data-invoice-detail-tab]')?.dataset.invoiceDetailTab;
	const logFilter = event.target.closest('[data-log-filter]')?.dataset.logFilter;
	const analyticsIndex = event.target.closest('[data-analytics]')?.dataset.analytics;
	const paymentTab = event.target.closest('[data-payment-tab]')?.dataset.paymentTab;
	const paymentInvoice = event.target.closest('[data-payment-invoice]')?.dataset.paymentInvoice;
	const paymentReference = event.target.closest('[data-payment-reference]')?.dataset.paymentReference;
	const tourView = event.target.closest('[data-tour-view]')?.dataset.tourView;
	const tourPersona = event.target.closest('[data-tour-persona]')?.dataset.tourPersona;
	const shareScenario = event.target.closest('[data-share-scenario]')?.dataset.shareScenario;
	const purchaseOrder = event.target.closest('[data-purchase-order]')?.dataset.purchaseOrder;
	const action = event.target.closest('[data-action]')?.dataset.action;
	if (group) {
		state.expanded.has(group) ? state.expanded.delete(group) : state.expanded.add(group);
		renderNav();
		return;
	}
	if (view) {
		navigate(view);
		return;
	}
	if (captureInvoice) {
		state.captureSelected = captureInvoices.find((item) => item.id === captureInvoice) || state.captureSelected;
		state.captureScreen = 'detail';
		toVerify();
		return;
	}
	if (captureField) {
		state.captureSettingsField = captureField;
		captureSettings();
		return;
	}
	if (captureSettingsTab) {
		state.captureSettingsTab = captureSettingsTab;
		captureSettings();
		return;
	}
	if (approvalInvoice) {
		openApprovalInvoice(approvalInvoice);
		return;
	}
	if (approvalTab) {
		state.approvalTab = approvalTab;
		state.approvalSelection.clear();
		approvalReport();
		return;
	}
	if (invoice) {
		if (invoiceControl.classList.contains('invoice-log-link')) openInvoice(invoice);
		else {
			state.selected = invoices.find((inv) => inv.id === invoice) || state.selected;
			navigate('dashboard');
		}
		return;
	}
	if (purchaseOrder) {
		state.selected = invoices.find((inv) => inv.po === purchaseOrder) || state.selected;
		navigate('purchase-order-detail');
		return;
	}
	if (documentId) {
		state.selectedDocument = documents.find((doc) => doc.id === documentId) || state.selectedDocument;
		navigate('document-detail');
		return;
	}
	if (documentTab) {
		state.documentTab = documentTab;
		documentsInbox();
		return;
	}
	if (contractId) {
		state.selectedContract = contracts.find((contract) => contract.id === contractId) || state.selectedContract;
		state.contractTab = 'contract-lines';
		navigate('contract-detail');
		return;
	}
	if (contractTab) {
		state.contractTab = contractTab;
		contractDetail();
		return;
	}
	if (invoiceDetailTab) {
		state.invoiceDetailTab = invoiceDetailTab;
		invoiceDetail();
		return;
	}
	if (logFilter) {
		state.logFilter = logFilter;
		state.logSelection.clear();
		invoiceLog();
		return;
	}
	if (analyticsIndex !== undefined) {
		state.analytics = Number(analyticsIndex);
		analytics();
		return;
	}
	if (paymentTab) {
		state.paymentTab = paymentTab;
		state.paymentDate = '';
		state.paymentSelection.clear();
		paymentsPage();
		return;
	}
	if (paymentInvoice) {
		toast(`Invoice ${paymentInvoice} opened in the synthetic payment list`);
		return;
	}
	if (paymentReference) {
		toast(`Payment reference ${paymentReference} opened for review`);
		return;
	}
	if (tourView) {
		closeTour(false);
		navigate(tourView);
		return;
	}
	if (tourPersona) {
		state.tourPersona = tourPersona;
		state.tour = 0;
		showTour();
		return;
	}
	if (shareScenario) {
		copyScenario(shareScenario);
		return;
	}
	if (action === 'log-transfer') {
		const records = transferInvoices([...state.logSelection]);
		state.logSelection.clear();
		invoiceLog();
		toast(`${records.length} ${records.length === 1 ? 'invoice' : 'invoices'} transferred to approval`);
	}
	if (action === 'log-open-approval') {
		state.roleFilter = state.lastTransferredRole || 'all';
		state.approvalScreen = 'queue';
		state.approvalTab = 'inbound';
		navigate('approval-report');
	}
	if (action === 'invoice-prev' || action === 'invoice-next') {
		const records = invoices.filter((inv) => inv.id !== journeyInvoiceId || state.journeyStage >= 1);
		const index = records.findIndex((inv) => inv.id === state.selected.id) + (action === 'invoice-prev' ? -1 : 1);
		if (records[index]) {
			state.selected = records[index];
			state.invoiceDetailTab = 'lines';
			invoiceDetail();
		}
	}
	if (action === 'invoice-save') toast(`${state.selected.vendorInvoice} saved in this simulation`);
	if (action === 'invoice-match') toast(matchLabel(state.selected));
	if (action === 'invoice-transfer') {
		const records = transferInvoices([state.selected.id]);
		if (records.length) {
			state.roleFilter = state.lastTransferredRole;
			state.approvalScreen = 'queue';
			state.approvalTab = 'inbound';
			navigate('approval-report');
			toast(`${state.selected.vendorInvoice} transferred to ${approvalRole(state.selected).label}`);
		}
	}
	if (action === 'approval-back') {
		state.approvalScreen = 'queue';
		state.approvalTab = approvalQueueStatus(state.selected);
		approvalReport();
	}
	if (action === 'approval-prev' || action === 'approval-next') {
		const records = approvalRoleInvoices();
		const index = records.findIndex((inv) => inv.id === state.selected.id) + (action === 'approval-prev' ? -1 : 1);
		if (records[index]) {
			state.selected = records[index];
			if (approvalQueueStatus(state.selected) === 'to-be-processed') state.approvalQueueState.set(state.selected.id, 'being-checked');
			approvalDetail();
		}
	}
	if (action === 'approval-save') toast(`${state.selected.vendorInvoice} saved in this simulation`);
	if (action === 'approval-options') toast('Approval options opened in this simulation');
	if (action === 'approval-purchase-order') toast(`Purchase order ${state.selected.po} opened for review`);
	if (action === 'approval-return') {
		state.approved.delete(state.selected.id);
		state.approvalQueueState.set(state.selected.id, 'return-to-ap');
		state.approvalScreen = 'queue';
		state.approvalTab = 'return-to-ap';
		approvalReport();
		toast(`${state.selected.vendorInvoice} returned to AP`);
	}
	if (action === 'approval-approve') {
		state.approved.add(state.selected.id);
		state.approvalQueueState.set(state.selected.id, 'processed');
		if (state.selected.id === journeyInvoiceId) {
			state.journeyStage = Math.max(state.journeyStage, 3);
			state.paymentTab = 'ready';
			navigate('payments');
		} else {
			state.approvalScreen = 'queue';
			state.approvalTab = 'processed';
			approvalReport();
		}
		toast(`${state.selected.vendorInvoice} approved and ready for payment`);
	}
	if (action === 'approval-batch-approve') {
		state.approvalSelection.forEach((id) => {
			state.approved.add(id);
			state.approvalQueueState.set(id, 'processed');
			if (id === journeyInvoiceId) state.journeyStage = Math.max(state.journeyStage, 3);
		});
		const count = state.approvalSelection.size;
		state.approvalSelection.clear();
		state.approvalTab = 'processed';
		approvalReport();
		toast(`${count} ${count === 1 ? 'invoice' : 'invoices'} approved in this simulation`);
	}
	if (action === 'approval-match-po') {
		const count = [...state.approvalSelection].filter((id) => invoices.find((inv) => inv.id === id)?.po !== 'No PO').length;
		toast(`${count} purchase ${count === 1 ? 'order' : 'orders'} opened for matching review`);
	}
	if (action === 'approve') {
		state.approved.add(state.selected.id);
		if (state.selected.id === journeyInvoiceId) {
			state.journeyStage = Math.max(state.journeyStage, 3);
			state.paymentTab = 'ready';
			navigate('payments');
		} else render();
		toast(`${state.selected.id} approved and ready for payment`);
	}
	if (action === 'fields') {
		state.fieldsExpanded = !state.fieldsExpanded;
		render();
	}
	if (action === 'reset') {
		state.approved.clear();
		state.logSelection.clear();
		state.transferred = new Set(initialTransferredIds);
		state.lastTransferredRole = '';
		state.invoiceDetailTab = 'lines';
		state.approvalSelection.clear();
		state.approvalQueueState.clear();
		state.documentOutcomes.clear();
		state.paymentSelection.clear();
		state.paymentMoves.clear();
		state.selected = invoices[0];
		state.selectedDocument = documents[0];
		state.selectedContract = contracts[0];
		state.captureSelected = captureInvoices[0];
		state.fieldsExpanded = false;
		state.scenario = '';
		state.journeyStage = 0;
		state.tourPersona = 'platform';
		state.logFilter = 'all';
		state.roleFilter = 'all';
		state.approvalScreen = 'queue';
		state.approvalTab = 'to-be-processed';
		state.approvalCompany = 'all';
		state.approvalVendor = '';
		state.approvalDueFrom = '';
		state.approvalDueTo = '';
		state.documentTab = 'being-checked';
		state.documentCompany = 'all';
		state.documentType = 'all';
		state.contractTab = 'contract-lines';
		state.paymentTab = 'ready';
		state.paymentQuery = '';
		state.paymentVendor = 'all';
		state.paymentMethod = 'all';
		state.paymentDate = '';
		state.captureScreen = 'queue';
		state.captureVendor = 'all';
		state.captureInvoice = '';
		state.captureAmountMin = '';
		state.captureAmountMax = '';
		state.captureSettingsField = 'Supplier bank account';
		state.captureSettingsTab = 'global';
		state.analytics = 0;
		state.view = 'dashboard';
		state.query = '';
		document.querySelector('#search').value = '';
		history.replaceState(null, '', `${location.pathname}#dashboard`);
		render();
		showTourWelcome();
		toast('Demo reset');
	}
	if (action === 'tour') showTourWelcome();
	if (action === 'tour-start') {
		state.tourPersona = 'platform';
		state.tour = 0;
		showTour();
	}
	if (action === 'tour-back' && state.tourComplete) {
		state.tourComplete = false;
		showTour();
	} else if (action === 'tour-back' && state.tour > 0) {
		state.tour--;
		showTour();
	}
	if (action === 'tour-next' && state.tourComplete) {
		closeTour();
		toast('Walkthrough complete — keep exploring');
	} else if (action === 'tour-next') {
		const steps = tourSets[state.tourPersona] || tourSets.platform;
		if (state.tour === steps.length - 1) showTourComplete();
		else {
			state.tour++;
			showTour();
		}
	}
	if (action === 'tour-close') closeTour();
	if (action === 'export') downloadReport();
	if (action === 'payment-export') downloadPayments();
	if (action === 'analytics-prev' && state.analytics > 0) {
		state.analytics--;
		analytics();
	}
	if (action === 'analytics-next') {
		state.analytics = (state.analytics + 1) % analyticsReports.length;
		analytics();
	}
	if (action === 'document-prev') {
		const index = documents.findIndex((doc) => doc.id === state.selectedDocument.id);
		if (index > 0) {
			state.selectedDocument = documents[index - 1];
			documentDetail();
		}
	}
	if (action === 'document-next') {
		const index = documents.findIndex((doc) => doc.id === state.selectedDocument.id);
		if (index < documents.length - 1) {
			state.selectedDocument = documents[index + 1];
			documentDetail();
		}
	}
	if (action === 'document-save') toast(`${state.selectedDocument.name} saved in this simulation`);
	if (action === 'document-approve') {
		state.documentOutcomes.set(state.selectedDocument.id, 'approved');
		renderNav();
		documentDetail();
		toast(`${state.selectedDocument.name} approved`);
	}
	if (action === 'document-return') {
		state.documentOutcomes.set(state.selectedDocument.id, 'return-to-ap');
		renderNav();
		documentDetail();
		toast(`${state.selectedDocument.name} returned to AP`);
	}
	if (action === 'document-email') toast('Synthetic email prepared — nothing was sent');
	if (action === 'contract-prev') {
		const index = contracts.findIndex((contract) => contract.id === state.selectedContract.id);
		if (index > 0) {
			state.selectedContract = contracts[index - 1];
			contractDetail();
		}
	}
	if (action === 'contract-next') {
		const index = contracts.findIndex((contract) => contract.id === state.selectedContract.id);
		if (index < contracts.length - 1) {
			state.selectedContract = contracts[index + 1];
			contractDetail();
		}
	}
	if (action === 'contract-copy') toast(`${state.selectedContract.name} opened as a synthetic copy`);
	if (action === 'contract-save') toast(`${state.selectedContract.name} saved in this simulation`);
	if (action === 'contract-options') toast('Contract options opened in this simulation');
	if (action === 'contract-attachment') toast(`${state.selectedContract.attachment} opened in this simulation`);
	if (action === 'capture-verify') {
		state.journeyStage = Math.max(state.journeyStage, 1);
		state.logFilter = 'all';
		navigate('invoice-log');
		toast(`${journeyInvoiceId} verified and added to Invoice Log`);
	}
	if (action === 'journey-approval') {
		state.selected = invoices.find((inv) => inv.id === journeyInvoiceId);
		transferInvoices([journeyInvoiceId]);
		state.roleFilter = 'department-manager';
		state.approvalScreen = 'queue';
		state.approvalTab = 'inbound';
		navigate('approval-report');
		toast(`${journeyInvoiceId} transferred to Department manager`);
	}
	if (action === 'journey-payment') {
		state.paymentTab = 'ready';
		navigate('payments');
	}
	if (action === 'capture-back') {
		state.captureScreen = 'queue';
		toVerify();
	}
	if (action === 'capture-settings-back') {
		state.captureScreen = 'detail';
		captureDetail();
	}
	if (action === 'capture-settings') {
		state.captureScreen = 'settings';
		captureSettings();
	}
	if (action === 'capture-prev') {
		const index = captureInvoices.findIndex((item) => item.id === state.captureSelected.id);
		if (index > 0) {
			state.captureSelected = captureInvoices[index - 1];
			captureDetail();
		}
	}
	if (action === 'capture-next') {
		const index = captureInvoices.findIndex((item) => item.id === state.captureSelected.id);
		if (index < captureInvoices.length - 1) {
			state.captureSelected = captureInvoices[index + 1];
			captureDetail();
		}
	}
	if (action === 'capture-save') toast(`${state.captureSelected.invoiceNumber} saved in this simulation`);
	if (action === 'capture-delete') toast('Delete is disabled in this public simulation');
	if (action === 'capture-history') toast('Synthetic invoice history opened');
	if (action === 'capture-show-po') toast(state.captureSelected.po ? `Purchase order ${state.captureSelected.po} opened for review` : 'This invoice has no purchase order');
	if (action === 'capture-attachments') toast('Synthetic attachment inbox opened');
	if (action === 'capture-upload') toast('Upload is simulated; no file left your browser');
	if (action === 'payment-manage') toast('Payment settings opened in this simulation');
	if (action === 'payment-portal') toast('Synthetic payment portal preview — no external site opened');
	if (action === 'payment-send' || action === 'payment-outside') {
		const destination = action === 'payment-send' ? 'in-progress' : 'completed';
		const count = state.paymentSelection.size;
		state.paymentSelection.forEach((id) => {
			state.paymentMoves.set(id, destination);
		});
		if (state.paymentSelection.has(journeyInvoiceId)) state.journeyStage = 4;
		state.paymentSelection.clear();
		state.paymentTab = destination;
		paymentsPage();
		toast(`${count} ${count === 1 ? 'invoice' : 'invoices'} moved to ${destination === 'completed' ? 'Completed' : 'In progress'} in this simulation`);
	}
});

document.addEventListener('keydown', (event) => {
	const tourPanel = document.querySelector('#tour');
	if (event.key === 'Escape' && !tourPanel.hidden) {
		closeTour();
		return;
	}
	if (event.key === 'Tab' && tourPanel.classList.contains('is-welcome')) {
		const focusable = [...tourPanel.querySelectorAll('button:not([hidden]):not(:disabled), a[href]:not([hidden])')];
		const first = focusable[0];
		const last = focusable.at(-1);
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}
	const row = event.target.closest('tr[data-invoice]');
	if (row && (event.key === 'Enter' || event.key === ' ')) {
		event.preventDefault();
		openInvoice(row.dataset.invoice);
	}
});

document.querySelector('#search').addEventListener('input', (event) => {
	state.query = event.target.value;
	if (!['dashboard', 'invoice-log', 'to-verify', 'tasks', 'approval-report'].includes(state.view)) state.view = 'invoice-log';
	if (state.view === 'approval-report') state.approvalSelection.clear();
	render();
});

document.querySelector('#role-select').addEventListener('change', (event) => {
	state.roleFilter = event.target.value;
	state.approvalScreen = 'queue';
	state.approvalTab = 'to-be-processed';
	state.approvalSelection.clear();
	navigate('approval-report');
});

document.addEventListener('change', (event) => {
	if (event.target.matches('#capture-vendor')) {
		state.captureVendor = event.target.value;
		captureQueue();
	}
	if (event.target.matches('[data-log-select]')) {
		event.target.checked ? state.logSelection.add(event.target.dataset.logSelect) : state.logSelection.delete(event.target.dataset.logSelect);
		invoiceLog();
	}
	if (event.target.matches('#approval-company')) {
		state.approvalCompany = event.target.value;
		state.approvalSelection.clear();
		approvalReport();
	}
	if (event.target.matches('#approval-due-from')) {
		state.approvalDueFrom = event.target.value;
		state.approvalSelection.clear();
		approvalReport();
	}
	if (event.target.matches('#approval-due-to')) {
		state.approvalDueTo = event.target.value;
		state.approvalSelection.clear();
		approvalReport();
	}
	if (event.target.matches('[data-approval-select]')) {
		event.target.checked ? state.approvalSelection.add(event.target.dataset.approvalSelect) : state.approvalSelection.delete(event.target.dataset.approvalSelect);
		approvalReport();
	}
	if (event.target.matches('#document-company')) {
		state.documentCompany = event.target.value;
		documentsInbox();
	}
	if (event.target.matches('#document-type')) {
		state.documentType = event.target.value;
		documentsInbox();
	}
	if (event.target.matches('#payment-query')) {
		state.paymentQuery = event.target.value;
		paymentsPage();
	}
	if (event.target.matches('#payment-vendor')) {
		state.paymentVendor = event.target.value;
		paymentsPage();
	}
	if (event.target.matches('#payment-method')) {
		state.paymentMethod = event.target.value;
		paymentsPage();
	}
	if (event.target.matches('#payment-date')) {
		state.paymentDate = event.target.value;
		paymentsPage();
	}
	if (event.target.matches('[data-payment-select]')) {
		event.target.checked ? state.paymentSelection.add(event.target.dataset.paymentSelect) : state.paymentSelection.delete(event.target.dataset.paymentSelect);
		paymentsPage();
	}
});

document.addEventListener('input', (event) => {
	if (event.target.matches('#capture-invoice')) {
		state.captureInvoice = event.target.value;
		captureQueue();
	}
	if (event.target.matches('#capture-min')) {
		state.captureAmountMin = event.target.value;
		captureQueue();
	}
	if (event.target.matches('#capture-max')) {
		state.captureAmountMax = event.target.value;
		captureQueue();
	}
	if (event.target.matches('#approval-vendor')) {
		state.approvalVendor = event.target.value;
		state.approvalSelection.clear();
		approvalReport();
		document.querySelector('#approval-vendor')?.focus();
	}
});

window.addEventListener('hashchange', () => {
	const view = location.hash.slice(1);
	if (allViews.includes(view)) {
		state.view = view;
		render();
	}
});

if (state.view === 'invoice-detail' || state.view === 'purchase-order-detail') syncUrlState(state.view);
render();
if (urlParams.get('welcome') !== '0') showTourWelcome();
