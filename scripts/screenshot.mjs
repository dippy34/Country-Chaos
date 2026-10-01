// Headless screenshot helper: node scripts/screenshot.mjs <url> <out.png> [waitMs]
import { chromium } from 'playwright-core';
const [url, out, wait = '4000'] = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl'],
});
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
page.on('console', (m) => console.log('[console]', m.type(), m.text()));
page.on('pageerror', (e) => console.log('[pageerror]', e.message));
await page.goto(url);
try { await page.waitForFunction('window.__done === true', null, { timeout: parseInt(wait) * 30 }); } catch (e) { console.log('timeout waiting for __done'); }
await page.waitForTimeout(parseInt(wait) / 4);
await page.screenshot({ path: out });
await browser.close();
