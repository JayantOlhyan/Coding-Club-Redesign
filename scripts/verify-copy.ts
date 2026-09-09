import fs from "fs";
import path from "path";
import http from "http";
import puppeteer from "puppeteer-core";

const PORT = 3457;
const OUT_DIR = path.join(process.cwd(), "out");
const CONTENT_FILE = path.join(process.cwd(), "content.json");

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

interface BlockAssertion {
  index: number;
  expected: string;
  rendered: string;
  passed: boolean;
}

async function verifyWithBrowser(): Promise<BlockAssertion[]> {
  const server = await startServer();
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle0" });

    const rawContent = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
    const blocks = rawContent.blocks;

    const domResults = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll("[data-block]"));
      return elements.map((el) => {
        const rawAttr = el.getAttribute("data-block") || "";
        const indices = rawAttr.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
        return {
          indices,
          textContent: el.textContent || "",
        };
      });
    });

    const assertions: BlockAssertion[] = [];

    for (const item of domResults) {
      for (const idx of item.indices) {
        const expectedBlock = blocks[idx];
        const expectedText = (expectedBlock && "text" in expectedBlock) ? expectedBlock.text : "";
        assertions.push({
          index: idx,
          expected: expectedText,
          rendered: item.textContent,
          passed: item.textContent === expectedText,
        });
      }
    }

    return assertions;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

function verifyWithStaticHtml(): BlockAssertion[] {
  const htmlPath = path.join(OUT_DIR, "index.html");
  if (!fs.existsSync(htmlPath)) {
    throw new Error("out/index.html not found. Run npm run build first.");
  }
  const html = fs.readFileSync(htmlPath, "utf-8");
  const rawContent = JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8"));
  const blocks = rawContent.blocks;

  // Match elements with data-block
  const regex = /data-block="([^"]+)"[^>]*>([\s\S]*?)<\/[a-z0-9]+>/gi;
  const matches = [...html.matchAll(regex)];

  function decodeEntities(str: string): string {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&rsquo;/g, "’")
      .replace(/&lsquo;/g, "‘");
  }

  const assertions: BlockAssertion[] = [];

  for (const m of matches) {
    const rawAttr = m[1];
    const rawInner = m[2];
    const stripped = decodeEntities(rawInner.replace(/<[^>]+>/g, ""));
    const indices = rawAttr.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));

    for (const idx of indices) {
      const expectedBlock = blocks[idx];
      const expectedText = (expectedBlock && "text" in expectedBlock) ? expectedBlock.text : "";
      assertions.push({
        index: idx,
        expected: expectedText,
        rendered: stripped,
        passed: stripped === expectedText,
      });
    }
  }

  return assertions;
}

async function run() {
  console.log("=======================================================");
  console.log("COPY-FIDELITY VERIFICATION (EXACT STRING EQUALITY)");
  console.log("=======================================================\n");

  let assertions: BlockAssertion[] = [];
  try {
    assertions = await verifyWithBrowser();
    console.log("Mode: Live Browser DOM evaluation (headless Chrome)");
  } catch (err: any) {
    console.log(`Browser verification unavailable (${err.message}). Falling back to static HTML DOM evaluation.`);
    assertions = verifyWithStaticHtml();
    console.log("Mode: Static HTML evaluation (out/index.html)");
  }

  if (assertions.length === 0) {
    console.error("ERROR: Zero data-block elements found! Copy verification failed.");
    process.exit(1);
  }

  let failed = 0;
  for (const a of assertions) {
    if (!a.passed) {
      failed++;
      console.error(`\n❌ MISMATCH at block ${a.index}:`);
      console.error(`  Expected: ${JSON.stringify(a.expected)}`);
      console.error(`  Rendered: ${JSON.stringify(a.rendered)}`);
    } else {
      console.log(`✓ Block ${String(a.index).padStart(3, " ")}: ${JSON.stringify(a.rendered)}`);
    }
  }

  console.log(`\nTotal verified text blocks: ${assertions.length}`);
  console.log(`Passed: ${assertions.length - failed}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    console.error("\nCOPY-FIDELITY VERIFICATION: FAILED");
    process.exit(1);
  } else {
    console.log("\nCOPY-FIDELITY VERIFICATION: PASSED (100% exact character equality)");
  }
}

run().catch((err) => {
  console.error("Fatal error during copy verification:", err);
  process.exit(1);
});
