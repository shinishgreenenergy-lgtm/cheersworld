// Smoke-test the static export: serve out/, load in Chromium, assert
// anchors exist, no dead nav links, no console errors. Full-page screenshots.
import { chromium } from "playwright";
import { spawn } from "node:child_process";

const PORT = 8123;
const server = spawn("python3", ["-m", "http.server", String(PORT), "-d", "out"], { stdio: "ignore" });
const die = (msg) => {
  console.error(`SMOKE FAIL: ${msg}`);
  server.kill();
  process.exit(1);
};

try {
  await new Promise((r) => setTimeout(r, 1200));
  const browser = await chromium.launch();
  const errors = [];

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });

  // every section anchor exists
  const ids = ["top", "trust", "about", "dimensions", "science", "solutions", "architecture", "research", "evidence", "dashboards", "government", "testimonials", "team", "gallery", "knowledge", "contact"];
  for (const id of ids) {
    if (!(await page.$(`#${id}`))) die(`missing section #${id}`);
  }

  // no dead links anywhere
  const dead = await page.$$eval('a[href="#"]', (as) => as.length);
  if (dead > 0) die(`${dead} dead href="#" links`);

  // no page-level horizontal overflow (measured after settle; 2px tolerance
  // because animated transforms can transiently nudge scrollWidth)
  const overflowAt = (p) =>
    p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

  // scroll through to trigger lazy/in-view content, let animations settle
  // (incl. the auto-advancing testimonial slide), then screenshot
  const scrollThrough = (p) =>
    p.evaluate(async () => {
      // small steps + dwell so IntersectionObserver-driven reveals reliably fire
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
  const settle = async (p) => {
    await p.waitForTimeout(1500);
    // sync with the auto-advancing testimonial carousel: wait for a slide
    // transition to start, then finish, so the upcoming ~4.5s of stability
    // covers the (slow) full-page capture without catching a blank slide
    await p
      .waitForFunction(() => {
        const f = document.querySelector("#testimonials figure");
        return !f || getComputedStyle(f).opacity !== "1";
      }, { timeout: 7000 })
      .catch(() => {});
    await p
      .waitForFunction(() => {
        const f = document.querySelector("#testimonials figure");
        return f && getComputedStyle(f).opacity === "1";
      }, { timeout: 7000 })
      .catch(() => {});
  };

  await scrollThrough(page);
  await settle(page);
  const desktopOverflow = await overflowAt(page);
  if (desktopOverflow > 2) die(`horizontal overflow at 1440px: ${desktopOverflow}px`);
  await page.screenshot({ path: "smoke-desktop.png", fullPage: true });

  const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mob.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  mob.on("pageerror", (e) => errors.push(String(e)));
  await mob.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle" });
  await scrollThrough(mob);
  await settle(mob);
  const mobileOverflow = await overflowAt(mob);
  if (mobileOverflow > 2) die(`horizontal overflow at 390px: ${mobileOverflow}px`);
  await mob.screenshot({ path: "smoke-mobile.png", fullPage: true });

  await browser.close();
  if (errors.length) die(`console/page errors:\n${errors.join("\n")}`);
  console.log("SMOKE PASS");
} finally {
  server.kill();
}
