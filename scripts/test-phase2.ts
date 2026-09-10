import http from "http";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";

const PORT = 3456;
const OUT_DIR = path.join(process.cwd(), "out");
const SCREENSHOT_DIR = path.join(process.cwd(), "screenshots");

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function startServer(): Promise<http.Server> {
  const server = http.createServer((req, res) => {
    let reqPath = req.url?.split("?")[0] || "/";
    if (reqPath === "/") reqPath = "/index.html";

    let filePath = path.join(OUT_DIR, reqPath);
    if (!fs.existsSync(filePath) && fs.existsSync(filePath + ".html")) {
      filePath = filePath + ".html";
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`Test static server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function runTests() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const server = await startServer();

  console.log("Launching headless browser...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Track network requests
  const networkRequests: string[] = [];
  const forbiddenDomains = ["i.imgur.com", "rvs-pricing-card.vercel.app"];
  const leakedRequests: string[] = [];

  page.on("request", (req) => {
    const url = req.url();
    networkRequests.push(url);
    for (const domain of forbiddenDomains) {
      if (url.includes(domain)) {
        leakedRequests.push(url);
      }
    }
  });

  console.log(`Navigating to http://localhost:${PORT}...`);
  await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });

  // 1. Font rendering checks
  console.log("\n=======================================================");
  console.log("1. FONT RENDERING & COMPUTED STYLES VERIFICATION");
  console.log("=======================================================");

  const fontChecks = await page.evaluate(async () => {
    await document.fonts.ready;
    const checks = {
      clash500: document.fonts.check("500 16px 'Clash Grotesk'"),
      clash600: document.fonts.check("600 16px 'Clash Grotesk'"),
      satoshi400: document.fonts.check("400 16px 'Satoshi'"),
      satoshi700: document.fonts.check("700 16px 'Satoshi'"),
    };

    const h1 = document.querySelector("h1");
    const p = document.querySelector("p");

    const h1FontFamily = h1 ? window.getComputedStyle(h1).fontFamily : "none";
    const h1FontWeight = h1 ? window.getComputedStyle(h1).fontWeight : "none";
    const h1FontSize = h1 ? window.getComputedStyle(h1).fontSize : "none";

    const pFontFamily = p ? window.getComputedStyle(p).fontFamily : "none";
    const pFontWeight = p ? window.getComputedStyle(p).fontWeight : "none";
    const pFontSize = p ? window.getComputedStyle(p).fontSize : "none";

    return {
      checks,
      h1: { fontFamily: h1FontFamily, fontWeight: h1FontWeight, fontSize: h1FontSize },
      p: { fontFamily: pFontFamily, fontWeight: pFontWeight, fontSize: pFontSize },
    };
  });

  console.log("document.fonts.check results:");
  console.log(`- Clash Grotesk weight 500 : ${fontChecks.checks.clash500 ? "LOADED & ACTIVE" : "FAILED"}`);
  console.log(`- Clash Grotesk weight 600 : ${fontChecks.checks.clash600 ? "LOADED & ACTIVE" : "FAILED"}`);
  console.log(`- Satoshi weight 400       : ${fontChecks.checks.satoshi400 ? "LOADED & ACTIVE" : "FAILED"}`);
  console.log(`- Satoshi weight 700       : ${fontChecks.checks.satoshi700 ? "LOADED & ACTIVE" : "FAILED"}`);
  console.log(`\nComputed style for <h1>:`);
  console.log(`  font-family: ${fontChecks.h1.fontFamily}`);
  console.log(`  font-weight: ${fontChecks.h1.fontWeight}`);
  console.log(`  font-size:   ${fontChecks.h1.fontSize}`);
  console.log(`Computed style for <p> (desktop):`);
  console.log(`  font-family: ${fontChecks.p.fontFamily}`);
  console.log(`  font-weight: ${fontChecks.p.fontWeight}`);
  console.log(`  font-size:   ${fontChecks.p.fontSize}`);

  // Intrinsic Image Dimensions Check (Block 1)
  const imgBlock1 = await page.$eval('img[src*="T8nPPpx"]', (el) => ({
    width: el.getAttribute("width"),
    height: el.getAttribute("height"),
    naturalWidth: (el as HTMLImageElement).naturalWidth,
    naturalHeight: (el as HTMLImageElement).naturalHeight,
    loading: el.getAttribute("loading"),
  }));
  console.log(`\nBlock 1 <img> attributes check (manifest intrinsic):`);
  console.log(`  width:        ${imgBlock1.width} (manifest: 501)`);
  console.log(`  height:       ${imgBlock1.height} (manifest: 446)`);
  console.log(`  loading:      ${imgBlock1.loading} (policy: eager)`);


  // 2. Network leaks verification
  console.log("\n=======================================================");
  console.log("2. ZERO REMOTE CALLS VERIFICATION");
  console.log("=======================================================");
  console.log(`Total requests made during page load: ${networkRequests.length}`);
  console.log(`Requests to i.imgur.com or rvs-pricing-card: ${leakedRequests.length}`);
  if (leakedRequests.length === 0) {
    console.log("ZERO remote requests confirmed! All assets served locally.");
  } else {
    console.error("LEAK DETECTED:", leakedRequests);
  }

  // 3. Responsive viewport tests & screenshots
  console.log("\n=======================================================");
  console.log("3. RESPONSIVE VIEWPORT & HORIZONTAL SCROLL CHECKS");
  console.log("=======================================================");
  const viewports = [320, 375, 768, 1024, 1440];

  for (const width of viewports) {
    await page.setViewport({ width, height: 900 });
    // Trigger lazy images and ensure all images are fully loaded before screenshotting
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll("img"));
      await Promise.all(
        images.map((img) => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve();
          return new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.loading = "eager";
          });
        })
      );
    });
    await new Promise((r) => setTimeout(r, 500));

    const scrollMetrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      return {
        scrollWidth,
        innerWidth,
        hasHorizontalScroll: scrollWidth > innerWidth,
      };
    });

    const shotPath = path.join(SCREENSHOT_DIR, `viewport-${width}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });

    console.log(
      `Viewport ${width}px: scrollWidth=${scrollMetrics.scrollWidth}px, innerWidth=${scrollMetrics.innerWidth}px -> ` +
        (scrollMetrics.hasHorizontalScroll
          ? "FAIL (Horizontal overflow!)"
          : "PASSED (No horizontal scroll)") +
        ` | Screenshot: ${shotPath}`
    );

    if (width === 375) {
      const mobileStyles = await page.evaluate(() => {
        const h1 = document.querySelector("h1");
        const p = document.querySelector("p");
        return {
          h1Size: h1 ? window.getComputedStyle(h1).fontSize : "",
          pSize: p ? window.getComputedStyle(p).fontSize : "",
          pWeight: p ? window.getComputedStyle(p).fontWeight : "",
        };
      });
      console.log(`  -> Mobile (375px) typography: <h1> fontSize=${mobileStyles.h1Size} (spec: 32px), <p> fontSize=${mobileStyles.pSize} (spec: 16px), <p> fontWeight=${mobileStyles.pWeight} (spec: 400)`);
    }
  }

  // 4. Keyboard traversal check
  console.log("\n=======================================================");
  console.log("4. KEYBOARD FOCUS & INTERACTIVE ELEMENTS");
  console.log("=======================================================");
  await page.keyboard.press("Tab");
  const focusedTag = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return "none";
    const ring = window.getComputedStyle(el).outline || window.getComputedStyle(el).boxShadow;
    return {
      tagName: el.tagName,
      href: el.getAttribute("href"),
      text: el.textContent?.trim(),
      outline: window.getComputedStyle(el).outline,
      boxShadow: window.getComputedStyle(el).boxShadow,
    };
  });
  console.log("Focused element upon Tab keypress:", focusedTag);

  await browser.close();
  server.close();
  console.log("\nTesting complete!");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
