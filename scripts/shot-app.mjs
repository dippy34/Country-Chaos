// node scripts/shot-app.mjs "<query>" out.png [frames] [keys...]
import { chromium } from 'playwright-core';
const [query, out, frames = '40', ...keys] = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text().slice(0, 400)); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto(`http://localhost:5173/?${query}`);
await page.waitForFunction(() => !document.getElementById('loading'), null, { timeout: 600000 });
for (const k of keys) {
  if (k.startsWith('hold:')) { const [, key, ms] = k.split(':'); await page.keyboard.down(key); await page.waitForTimeout(parseInt(ms)); await page.keyboard.up(key); }
  else if (k.startsWith('wait:')) await page.waitForTimeout(parseInt(k.slice(5)));
  else if (k.startsWith('eval:')) await page.evaluate(k.slice(5));
  else await page.keyboard.press(k);
}
// let N frames render
await page.evaluate((n) => new Promise((res) => { let c = 0; const f = () => (++c >= n ? res() : requestAnimationFrame(f)); requestAnimationFrame(f); }), parseInt(frames));
await page.screenshot({ path: out, timeout: 300000 });
const info = await page.evaluate(() => { const a = window.lightcone; return { exp: a.exposure.exposure, L: a.exposure.measuredL }; });
console.log(JSON.stringify(info));
console.log(errors.slice(0, 12).join('\n'));
await browser.close();
