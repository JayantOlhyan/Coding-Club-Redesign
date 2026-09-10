import fs from "fs";
import path from "path";
import http from "http";
import puppeteer from "puppeteer-core";
import { COHORT } from "../lib/cohort";

const PORT = 3460;
const OUT_DIR = path.join(process.cwd(), "out");
const CONTENT_FILE = path.join(process.cwd(), "content.json");

/**
 * NAMED CONSTANT: Explicit allowlist of permissible un-attributed text nodes in the DOM.
 * Any text node not enclosed in an ancestor with [data-block] MUST match this allowlist.
 * If this allowlist needs an addition in future phases, commit that change separately with a clear rationale.
 */
export const UNTRACKED_TEXT_ALLOWLIST: (string | RegExp)[] = [
  // <CohortDate /> dynamic batch start date output
  /^Next batch starts \d{1,2} [A-Za-z]+ \d{4}$/,
  /^Next batch starts$/,
  /^\d{1,2} [A-Za-z]+ \d{4}$/,
  // <CohortDate /> countdown mode if enabled
  /^Batch starts in:?$/,
  /^\d+d : \d+h : \d+m : \d+s$/,
  // Form validation messages (reserved for Section 13 form)
  // <title> and <meta> tags in head
];

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

interface UntrackedTextNode {
  text: string;
  path: string;
  allowed: boolean;
}

function getExpectedTextForBlock(block: any, idx: number): string {
  if (!block || !("text" in block)) return "";
  let text = block.text;
  // Block 5: Per Phase 0 and Phase 2 ruling, orphaned countdown label is suppressed when countdown is disabled
  if (idx === 5 && !COHORT.showCountdown) {
    text = text.replace(/\s*Registration Closing In\s*$/i, "");
  }
  return text;
}

async function runBrowserVerification(): Promise<{
  blockAssertions: BlockAssertion[];
  untrackedTextNodes: UntrackedTextNode[];
}> {
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

    // 1. Extract and check all elements bound via [data-block]
    const domResults = await page.evaluate(`
      (() => {
        const elements = Array.from(document.querySelectorAll("[data-block]"));
        return elements.map((el) => {
          const rawAttr = el.getAttribute("data-block") || "";
          const indices = rawAttr.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
          return {
            indices: indices,
            textContent: el.textContent || "",
          };
        });
      })()
    `) as { indices: number[]; textContent: string }[];

    const blockAssertions: BlockAssertion[] = [];
    for (const item of domResults) {
      for (const idx of item.indices) {
        const expectedBlock = blocks[idx];
        const expectedText = getExpectedTextForBlock(expectedBlock, idx);
        blockAssertions.push({
          index: idx,
          expected: expectedText,
          rendered: item.textContent,
          passed: item.textContent === expectedText,
        });
      }
    }

    // 2. Inverse check: walk every text node in the rendered DOM body
    const serializableAllowlist = JSON.stringify(
      UNTRACKED_TEXT_ALLOWLIST.map((item) => (item instanceof RegExp ? item.toString() : item))
    );

    const untrackedTextNodes = await page.evaluate(`
      ((allowedPatternsRaw) => {
        const allowedPatterns = JSON.parse(allowedPatternsRaw);
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
        const results = [];

        let n;
        while ((n = walker.nextNode())) {
          const text = n.textContent ? n.textContent.trim() : "";
          if (!text) continue;

          const parentTag = n.parentElement ? n.parentElement.tagName : "";
          if (["SCRIPT", "STYLE", "NOSCRIPT"].indexOf(parentTag) !== -1) {
            continue;
          }

          let p = n.parentElement;
          let isInsideDataBlock = false;
          while (p && p !== document.body) {
            if (p.hasAttribute("data-block")) {
              isInsideDataBlock = true;
              break;
            }
            p = p.parentElement;
          }

          if (isInsideDataBlock) {
            continue;
          }

          const isAllowed = allowedPatterns.some((pattern) => {
            if (pattern.startsWith("/") && pattern.lastIndexOf("/") > 0) {
              const lastSlash = pattern.lastIndexOf("/");
              const body = pattern.slice(1, lastSlash);
              const flags = pattern.slice(lastSlash + 1);
              const regex = new RegExp(body, flags);
              return regex.test(text);
            }
            return text === pattern;
          });

          // Build DOM path
          const parts = [];
          let curr = n;
          while (curr && curr !== document.body) {
            if (curr.nodeType === Node.ELEMENT_NODE) {
              const el = curr;
              const id = el.id ? "#" + el.id : "";
              const cls = el.className && typeof el.className === "string" && el.className.trim()
                ? "." + el.className.trim().split(/\\s+/)[0]
                : "";
              parts.unshift(el.tagName.toLowerCase() + id + cls);
            } else if (curr.nodeType === Node.TEXT_NODE) {
              parts.unshift("#text");
            }
            curr = curr.parentNode;
          }

          results.push({
            text: text,
            path: "body > " + parts.join(" > "),
            allowed: isAllowed,
          });
        }

        return results;
      })(${JSON.stringify(serializableAllowlist)})
    `) as UntrackedTextNode[];

    return { blockAssertions, untrackedTextNodes };
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

async function run() {
  console.log("=======================================================");
  console.log("COPY-FIDELITY & INVERSE UNTRACKED-TEXT VERIFICATION GATE");
  console.log("=======================================================\n");

  const { blockAssertions, untrackedTextNodes } = await runBrowserVerification();

  console.log("--- PART 1: DIRECT COPY-FIDELITY ASSERTIONS (data-block) ---");
  let directFailures = 0;
  for (const a of blockAssertions) {
    if (!a.passed) {
      directFailures++;
      console.error(`\n❌ MISMATCH at block ${a.index}:`);
      console.error(`  Expected: ${JSON.stringify(a.expected)}`);
      console.error(`  Rendered: ${JSON.stringify(a.rendered)}`);
    } else {
      console.log(`✓ Block ${String(a.index).padStart(3, " ")}: ${JSON.stringify(a.rendered)}`);
    }
  }

  console.log(`\nTotal verified text blocks: ${blockAssertions.length}`);
  console.log(`Passed: ${blockAssertions.length - directFailures}`);
  console.log(`Failed: ${directFailures}`);

  console.log("\n--- PART 2: INVERSE UNTRACKED-TEXT ASSERTIONS ---");
  console.log(`Active UNTRACKED_TEXT_ALLOWLIST patterns: ${UNTRACKED_TEXT_ALLOWLIST.length}`);

  let inverseFailures = 0;
  for (const node of untrackedTextNodes) {
    if (node.allowed) {
      console.log(`✓ Allowed untracked text: "${node.text}" at DOM path: ${node.path}`);
    } else {
      inverseFailures++;
      console.error(`\n❌ UNTRACKED TEXT DETECTED (Not in allowlist):`);
      console.error(`  String:   ${JSON.stringify(node.text)}`);
      console.error(`  DOM Path: ${node.path}`);
    }
  }

  if (untrackedTextNodes.length === 0) {
    console.log("✓ Zero un-attributed text nodes in DOM body.");
  } else {
    console.log(`\nTotal un-attributed text nodes audited: ${untrackedTextNodes.length}`);
    console.log(`Allowed per policy: ${untrackedTextNodes.length - inverseFailures}`);
    console.log(`Unauthorized leaks: ${inverseFailures}`);
  }

  console.log("\n=======================================================");
  if (directFailures > 0 || inverseFailures > 0) {
    console.error("COPY-FIDELITY & INVERSE GATE: FAILED");
    process.exit(1);
  } else {
    console.log("COPY-FIDELITY & INVERSE GATE: PASSED (100% verified, 0 un-attributed leaks)");
    console.log("=======================================================");
  }
}

run().catch((err) => {
  console.error("Fatal error during copy verification:", err);
  process.exit(1);
});
