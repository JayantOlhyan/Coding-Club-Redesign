import fs from "fs";
import path from "path";
import sharp from "sharp";

const IMAGES_TXT_PATH = path.join(process.cwd(), "images.txt");
const OUTPUT_DIR = path.join(process.cwd(), "public", "images");
const FALLBACK_DIR = path.join(process.cwd(), "assets-source", "fallback");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

interface ImageMeta {
  index: number;
  url: string;
  filename: string;
  webpFilename: string;
  width: number;
  height: number;
  format: string;
  status: "downloaded" | "svg_placeholder" | "error";
  error?: string;
}

async function fetchWithRetry(url: string, retries = 3): Promise<Buffer> {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
    Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
  };

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { headers });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (err: any) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} retries`);
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(FALLBACK_DIR)) {
    fs.mkdirSync(FALLBACK_DIR, { recursive: true });
  }

  const rawLines = fs.readFileSync(IMAGES_TXT_PATH, "utf-8").split("\n");
  const urls = rawLines.map((l) => l.trim()).filter(Boolean);

  console.log(`Found ${urls.length} images in images.txt`);

  const manifest: Record<string, ImageMeta> = {};

  for (let idx = 0; idx < urls.length; idx++) {
    const url = urls[idx];
    const filename = url.split("/").pop() || `image_${idx}`;
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf(".")) || filename;
    const isSvg = url.endsWith(".svg");
    const webpFilename = isSvg ? `${nameWithoutExt}.svg` : `${nameWithoutExt}.webp`;

    console.log(`[${idx + 1}/${urls.length}] Processing ${url}...`);

    // Handle tick.svg special rule
    if (url.includes("rvs-pricing-card.vercel.app/tick.svg")) {
      console.log(`  -> Skipping external tick.svg (replaced with inline SVG per Rule 5)`);
      manifest[url] = {
        index: idx,
        url,
        filename,
        webpFilename: "tick.svg",
        width: 16,
        height: 16,
        format: "svg",
        status: "svg_placeholder",
      };
      continue;
    }

    try {
      const buffer = await fetchWithRetry(url);

      if (isSvg) {
        // Save SVG directly
        const svgPath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(svgPath, buffer);
        manifest[url] = {
          index: idx,
          url,
          filename,
          webpFilename: filename,
          width: 24,
          height: 24,
          format: "svg",
          status: "downloaded",
        };
        console.log(`  -> Saved SVG: ${filename}`);
      } else {
        // Save original fallback
        const fallbackPath = path.join(FALLBACK_DIR, filename);
        fs.writeFileSync(fallbackPath, buffer);

        // Convert to WebP
        const webpPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);
        const imageInstance = sharp(buffer);
        const metadata = await imageInstance.metadata();

        await imageInstance.webp({ quality: 85 }).toFile(webpPath);

        const width = metadata.width || 0;
        const height = metadata.height || 0;
        const format = metadata.format || "unknown";

        manifest[url] = {
          index: idx,
          url,
          filename,
          webpFilename: `${nameWithoutExt}.webp`,
          width,
          height,
          format,
          status: "downloaded",
        };

        const origSize = buffer.length;
        const webpSize = fs.statSync(webpPath).size;
        const saving = Math.round((1 - webpSize / origSize) * 100);
        console.log(
          `  -> Converted to WebP: ${width}x${height} (${Math.round(origSize / 1024)}KB -> ${Math.round(
            webpSize / 1024
          )}KB, ${saving}% saved)`
        );
      }
    } catch (err: any) {
      console.error(`  -> ERROR fetching ${url}:`, err.message);

      // Create neutral fallback SVG placeholder per PRD §11
      const placeholderPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);
      // 1x1 transparent or neutral SVG
      const placeholderSvg = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="100%" height="100%" fill="#E4E2DD"/><text x="50%" y="50%" fill="#444750" text-anchor="middle" font-family="sans-serif" font-size="14">Image Unavailable</text></svg>`
      );
      await sharp(placeholderSvg).webp().toFile(placeholderPath);

      manifest[url] = {
        index: idx,
        url,
        filename,
        webpFilename: `${nameWithoutExt}.webp`,
        width: 400,
        height: 300,
        format: "placeholder",
        status: "error",
        error: err.message,
      };
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`\nFinished image migration! Manifest written to ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
