import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { createReadStream, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const chromeCandidates = [
	process.env.CHROME_BIN,
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
	'/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium',
	'/usr/bin/chromium-browser',
].filter(Boolean);
const chrome = chromeCandidates.find(existsSync) || ['google-chrome', 'microsoft-edge', 'chromium', 'chromium-browser'].map((name) => spawnSync('which', [name], { encoding: 'utf8' }).stdout.trim()).find(Boolean);
assert.ok(chrome, 'Chrome, Edge, or Chromium is required; set CHROME_BIN when it is installed outside a standard path.');

const mime = {
	'.css': 'text/css',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.mjs': 'text/javascript',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.woff2': 'font/woff2',
};
const server = createServer((request, response) => {
	const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
	if (pathname === '/favicon.ico') return response.writeHead(204).end();
	const file = resolve(root, pathname === '/' ? 'index.html' : pathname.slice(1));
	if (file !== root && !file.startsWith(`${root}${sep}`)) return response.writeHead(403).end();
	if (!existsSync(file) || !statSync(file).isFile()) return response.writeHead(404).end();
	response.writeHead(200, {
		'content-type': mime[extname(file)] || 'application/octet-stream',
		'cache-control': 'no-store',
	});
	createReadStream(file).pipe(response);
});

const profile = mkdtempSync(join(tmpdir(), 'rillion-browser-smoke-'));
let browser;

class Cdp {
	constructor(url) {
		this.socket = new WebSocket(url);
		this.nextId = 1;
		this.pending = new Map();
		this.errors = [];
		this.socket.addEventListener('message', ({ data }) => {
			const message = JSON.parse(data);
			if (message.id) {
				const pending = this.pending.get(message.id);
				this.pending.delete(message.id);
				if (message.error) pending.reject(new Error(message.error.message));
				else pending.resolve(message.result);
				return;
			}
			if (message.method === 'Runtime.exceptionThrown') this.errors.push(message.params.exceptionDetails.text);
			if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') this.errors.push(message.params.entry.text);
		});
	}

	async open() {
		if (this.socket.readyState === WebSocket.OPEN) return;
		await new Promise((resolveOpen, reject) => {
			this.socket.addEventListener('open', resolveOpen, { once: true });
			this.socket.addEventListener('error', reject, { once: true });
		});
	}

	call(method, params = {}, sessionId) {
		const id = this.nextId++;
		this.socket.send(
			JSON.stringify({
				id,
				method,
				params,
				...(sessionId ? { sessionId } : {}),
			}),
		);
		return new Promise((resolveCall, reject) => this.pending.set(id, { resolve: resolveCall, reject }));
	}

	close() {
		this.socket.close();
	}
}

async function waitForDevTools(process, timeout = 10000) {
	let stderr = '';
	return await new Promise((resolveUrl, reject) => {
		const timer = setTimeout(() => reject(new Error(`Chrome did not expose DevTools within ${timeout}ms.\n${stderr}`)), timeout);
		process.stderr.on('data', (chunk) => {
			stderr += chunk;
			const match = stderr.match(/DevTools listening on (ws:\/\/[^\s]+)/);
			if (match) {
				clearTimeout(timer);
				resolveUrl(match[1]);
			}
		});
		process.once('exit', (code) => {
			clearTimeout(timer);
			reject(new Error(`Chrome exited before DevTools was ready (${code}).\n${stderr}`));
		});
	});
}

async function evaluate(cdp, sessionId, expression) {
	const result = await cdp.call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
	if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
	return result.result.value;
}

async function openUrl(cdp, sessionId, url, readyExpression) {
	cdp.errors.length = 0;
	await cdp.call('Page.navigate', { url }, sessionId);
	const deadline = Date.now() + 8000;
	while (Date.now() < deadline) {
		if (await evaluate(cdp, sessionId, `document.readyState === 'complete' && Boolean(${readyExpression})`)) break;
		await delay(50);
	}
	assert.equal(await evaluate(cdp, sessionId, `document.readyState === 'complete' && Boolean(${readyExpression})`), true, `Timed out waiting for ${url}`);
	await delay(100);
	assert.deepEqual(cdp.errors, [], `Runtime errors on ${url}`);
}

try {
	await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
	const base = `http://127.0.0.1:${server.address().port}`;
	browser = spawn(chrome, ['--headless=new', '--disable-default-apps', '--no-first-run', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
	const cdp = new Cdp(await waitForDevTools(browser));
	await cdp.open();
	const { targetId } = await cdp.call('Target.createTarget', {
		url: 'about:blank',
	});
	const { sessionId } = await cdp.call('Target.attachToTarget', {
		targetId,
		flatten: true,
	});
	await cdp.call('Page.enable', {}, sessionId);
	await cdp.call('Runtime.enable', {}, sessionId);
	await cdp.call('Log.enable', {}, sessionId);

	const aiUrl = `${base}/?welcome=0&view=invoice-detail&invoice=INV-82416#invoice-detail`;
	await openUrl(cdp, sessionId, aiUrl, `document.querySelector('.invoice-detail-grid')`);
	const ai = await evaluate(
		cdp,
		sessionId,
		`({
			href: location.href,
			text: document.querySelector('#workspace').innerText,
			code: document.querySelector('.line-code-chip')?.textContent.trim(),
			overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
		})`,
	);
	assert.match(ai.href, /invoice=INV-82416/);
	assert.match(ai.text, /INV-82416/);
	assert.match(ai.text, /Coding explanation/);
	assert.match(ai.text, /Flow proposal explanation/);
	assert.equal(ai.code, '6710');
	assert.equal(ai.overflow, 0);

	const poUrl = `${base}/?welcome=0&view=purchase-order-detail&invoice=INV-80116&po=4500847#purchase-order-detail`;
	await openUrl(cdp, sessionId, poUrl, `document.querySelector('.purchase-order-detail')`);
	const po = await evaluate(
		cdp,
		sessionId,
		`({
			href: location.href,
			text: document.querySelector('.purchase-order-detail').innerText,
			overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
		})`,
	);
	assert.match(po.href, /invoice=INV-80116/);
	assert.match(po.href, /po=4500847/);
	assert.match(po.text, /4500847/);
	assert.match(po.text, /Price variant/);
	assert.equal(po.overflow, 0);

	await cdp.call('Browser.close');
	cdp.close();
	console.log('Browser smoke passed: invoice and PO deep links restore the intended evidence in Chrome.');
} finally {
	if (browser && browser.exitCode === null) {
		const exited = new Promise((resolveExit) => browser.once('exit', resolveExit));
		browser.kill('SIGTERM');
		await Promise.race([exited, delay(2000)]);
		if (browser.exitCode === null) {
			const forcedExit = new Promise((resolveExit) => browser.once('exit', resolveExit));
			browser.kill('SIGKILL');
			await Promise.race([forcedExit, delay(2000)]);
		}
	}
	await new Promise((resolveClose) => server.close(resolveClose));
	rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
}
