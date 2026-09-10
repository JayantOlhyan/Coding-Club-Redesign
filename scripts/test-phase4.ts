import http from "http";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";

const PORT = 3457;
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
      resolve(server);
    });
  });
}

async function runTests() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const server = await startServer();

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Track network requests
  const networkRequests: string[] = [];
  const leakedRequests: string[] = [];
  const forbiddenDomains = ["i.imgur.com", "rvs-pricing-card.vercel.app", "vimeo.com", "player.vimeo.com"];

  page.on("request", (req) => {
    const url = req.url();
    networkRequests.push(url);
    for (const domain of forbiddenDomains) {
      if (url.includes(domain)) {
        leakedRequests.push(url);
      }
    }
  });

  await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });

  console.log("=======================================================");
  console.log("PHASE 4 VERIFICATION AUDIT RUN");
  console.log("=======================================================\n");

  // 1. Heading Hierarchy
  const headings = await page.evaluate(() => {
    const hs = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    return {
      h1Count: document.querySelectorAll("h1").length,
      levels: hs.map((h) => ({ tag: h.tagName.toLowerCase(), text: h.textContent?.trim().slice(0, 40) })),
    };
  });
  console.log(`1. HEADING HIERARCHY:`);
  console.log(`- Total <h1> tags: ${headings.h1Count} (Spec requires exactly 1)`);
  let hierarchyValid = true;
  let currentLevel = 0;
  for (const h of headings.levels) {
    const level = parseInt(h.tag.replace("h", ""), 10);
    if (level > currentLevel + 1) {
      hierarchyValid = false;
      console.log(`  Invalid jump: h${currentLevel} -> h${level} ("${h.text}")`);
    }
    currentLevel = level;
  }
  console.log(`- Heading nesting valid (no skipped levels): ${hierarchyValid ? "PASSED" : "FAILED"}`);

  // 2. Network Isolation (Zero remote calls before interaction)
  console.log(`\n2. NETWORK ISOLATION:`);
  console.log(`- Total initial requests: ${networkRequests.length}`);
  console.log(`- Leaked requests to imgur / rvs-pricing-card / vimeo: ${leakedRequests.length}`);
  console.log(`- Zero runtime dependencies status: ${leakedRequests.length === 0 ? "PASSED" : "FAILED"}`);

  // 3. Image Alt Coverage & Policies
  const imageAudit = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll("img"));
    let missingAlt = 0;
    let nonWebP = 0;
    imgs.forEach((img) => {
      if (!img.hasAttribute("alt")) missingAlt++;
      if (!img.src.includes(".webp") && !img.src.startsWith("data:")) nonWebP++;
    });
    return {
      totalImages: imgs.length,
      missingAlt,
      nonWebP,
    };
  });
  console.log(`\n3. IMAGE COMPLIANCE:`);
  console.log(`- Total <img> elements rendered: ${imageAudit.totalImages}`);
  console.log(`- Images missing alt attribute: ${imageAudit.missingAlt}`);
  console.log(`- Non-WebP image sources: ${imageAudit.nonWebP}`);

  // 4. CTAs Destination
  const ctaAudit = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("a[href*='#']"));
    const leadFormCtas = buttons.filter((b) => b.getAttribute("href") === "#lead-form");
    return {
      totalHashLinks: buttons.length,
      leadFormCtas: leadFormCtas.length,
    };
  });
  console.log(`\n4. CTA CONSOLIDATION:`);
  console.log(`- Total anchors targeting #lead-form: ${ctaAudit.leadFormCtas}`);

  // 5. Accordion Functionality (Curriculum & FAQ)
  const accordionAudit = await page.evaluate(() => {
    const details = Array.from(document.querySelectorAll("details"));
    const initialOpen = details.filter((d) => d.open).length;
    return {
      totalAccordions: details.length,
      initialOpen,
    };
  });
  console.log(`\n5. ACCORDIONS (COLLAPSED BY DEFAULT):`);
  console.log(`- Total <details> elements: ${accordionAudit.totalAccordions}`);
  console.log(`- Open on initial render: ${accordionAudit.initialOpen} (Spec requires 0)`);

  // Test expanding Curriculum Module 1
  const mod1Summary = await page.$("section#curriculum details summary");
  if (mod1Summary) {
    await mod1Summary.click();
    const isNowOpen = await page.$eval("section#curriculum details", (el) => (el as HTMLDetailsElement).open);
    console.log(`- Curriculum Module 1 expand/collapse test: ${isNowOpen ? "PASSED" : "FAILED"}`);
    await mod1Summary.click(); // close it back
  }

  // 6. Video Facade Click-to-Play
  console.log(`\n6. VIDEO FACADES:`);
  const vimeoBefore = networkRequests.filter((url) => url.includes("vimeo.com")).length;
  console.log(`- Vimeo network requests prior to click: ${vimeoBefore}`);
  const firstVideoFacade = await page.$("section#reviews button");
  if (firstVideoFacade) {
    await firstVideoFacade.click();
    await new Promise((r) => setTimeout(r, 1000));
    const hasIframe = await page.evaluate(() => {
      return document.querySelectorAll("section#reviews iframe").length > 0;
    });
    console.log(`- Video facade replaces with iframe on click: ${hasIframe ? "PASSED" : "FAILED"}`);
  }

  // 7. Lead Form Validation & Success State
  console.log(`\n7. LEAD FORM VALIDATION & SUBMISSION:`);
  await page.evaluate(() => {
    const el = document.querySelector("#lead-form");
    if (el) el.scrollIntoView();
  });

  const formInputs = await page.evaluate(() => {
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = document.querySelector('input[type="tel"]') as HTMLInputElement;
    const submitBtn = document.querySelector('#lead-form button[type="submit"]') as HTMLButtonElement;

    return {
      hasName: !!nameInput,
      hasEmail: !!emailInput,
      hasPhone: !!phoneInput,
      isSubmitDisabledInitial: submitBtn ? submitBtn.disabled : false,
    };
  });
  console.log(`- Name, email, phone fields present: ${formInputs.hasName && formInputs.hasEmail && formInputs.hasPhone ? "PASSED" : "FAILED"}`);
  console.log(`- Submit button disabled while invalid: ${formInputs.isSubmitDisabledInitial ? "PASSED" : "FAILED"}`);

  // Test entering valid data
  await page.type('input[name="name"]', "Test User");
  await page.type('input[name="email"]', "test@example.com");
  await page.type('input[type="tel"]', "9876543210");

  const isSubmitEnabled = await page.$eval('#lead-form button[type="submit"]', (el) => !(el as HTMLButtonElement).disabled);
  console.log(`- Submit button enabled with valid inputs: ${isSubmitEnabled ? "PASSED" : "FAILED"}`);

  // Submit form
  await page.click('#lead-form button[type="submit"]');
  await new Promise((r) => setTimeout(r, 500));
  const successState = await page.evaluate(() => {
    const text = document.querySelector("#lead-form")?.textContent || "";
    return text.includes("Application Submitted");
  });
  console.log(`- Form submission renders success message: ${successState ? "PASSED" : "FAILED"}`);

  // 8. Responsive Viewport Audits & Screenshots
  console.log(`\n8. RESPONSIVE VIEWPORT AUDIT:`);
  const viewports = [320, 375, 768, 1024, 1440];
  for (const width of viewports) {
    // Reload page to reset form & video states
    await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });
    await page.setViewport({ width, height: 900 });

    // Ensure all images are loaded for full screenshot
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
    await new Promise((r) => setTimeout(r, 400));

    const scrollMetrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      return {
        scrollWidth,
        innerWidth,
        hasOverflow: scrollWidth > innerWidth,
      };
    });

    const shotPath = path.join(SCREENSHOT_DIR, `viewport-${width}.png`);
    await page.screenshot({ path: shotPath, fullPage: true });

    console.log(
      `- Viewport ${width}px: scrollWidth=${scrollMetrics.scrollWidth}px, innerWidth=${scrollMetrics.innerWidth}px -> ` +
        (scrollMetrics.hasOverflow ? "FAIL (Horizontal overflow)" : "PASSED (No horizontal scroll)")
    );
  }

  await browser.close();
  server.close();
  console.log("\n=======================================================");
  console.log("PHASE 4 AUDIT COMPLETE");
  console.log("=======================================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
