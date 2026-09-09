import rawContent from "@/content/content.json";
import manifestData from "@/public/images/manifest.json";

// --- Types ---

export type HeadingBlock = {
  type: "heading";
  level: number;
  text: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type BulletBlock = {
  type: "bullet";
  text: string;
};

export type CtaBlock = {
  type: "cta";
  text: string;
  href: string;
};

export type ImageBlock = {
  type: "image";
  src: string;
  alt: string;
  lazy: boolean;
};

export type EmbedBlock = {
  type: "embed";
  src: string;
};

export type FieldBlock = {
  type: "field";
  input_type: string;
  name: string;
  placeholder: string;
  required: boolean;
};

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | BulletBlock
  | CtaBlock
  | ImageBlock
  | EmbedBlock
  | FieldBlock;

export type RawContent = {
  meta: {
    title: string;
    [key: string]: string;
  };
  blocks: ContentBlock[];
};

export const content = rawContent as RawContent;

// Helper to access block by index with type assertion
export function getBlock<T extends ContentBlock>(index: number): T {
  const block = content.blocks[index];
  if (!block) {
    throw new Error(`Block at index ${index} not found in content.json`);
  }
  return block as T;
}

export function getBlocks<T extends ContentBlock>(indices: number[]): T[] {
  return indices.map((idx) => getBlock<T>(idx));
}

// Local image filename mapping helper
// Dimension manifest loader
export interface ImageDimension {
  width: number;
  height: number;
  webpFilename: string;
}

export function getImageMeta(src: string): ImageDimension {
  const entry = (manifestData as Record<string, any>)[src];
  if (entry) {
    return {
      width: entry.width,
      height: entry.height,
      webpFilename: entry.webpFilename,
    };
  }
  const errorMessage = `[FATAL] Image manifest miss for src: "${src}". Map and manifest have diverged.`;
  if (process.env.NODE_ENV !== "production") {
    throw new Error(errorMessage);
  }
  console.error(errorMessage);
  return { width: 0, height: 0, webpFilename: "" };
}

// Local image filename mapping helper
export function getLocalImagePath(src: string): string {
  if (!src) return "";
  const meta = getImageMeta(src);
  if (meta.webpFilename) {
    return `/images/${meta.webpFilename}`;
  }
  return "";
}

// --- Authoritative SECTION_MAP (Amended 13-Section Architecture) ---
export const SECTION_MAP = {
  hero: {
    logo: 4,
    urgencyHeader: 5,
    h1: 6,
    subheads: [8, 9],
    liveBadge: 10,
    ctas: [14, 15],
    urgencyNotice: 16,
    indices: [4, 5, 6, 8, 9, 10, 14, 15, 16],
  },
  trustBar: {
    logoStripHeading: 0,
    logoStripImage: 1,
    communityHeading: 37,
    proofImages: [38, 39, 40, 41],
    indices: [0, 1, 37, 38, 39, 40, 41],
  },
  whoThisIsFor: {
    headings: [17, 18, 19],
    image: 20,
    items: [21, 22, 23, 24, 25, 26],
    closingText: 27,
    indices: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
  },
  ctaBandA: {
    headings: [28, 29],
    cta: 30,
    indices: [28, 29, 30],
  },
  benefits: {
    headings: [31, 32],
    panels: [33, 34, 35],
    prose: 36,
    indices: [31, 32, 33, 34, 35, 36],
  },
  ctaBandB: {
    headings: [42, 43],
    paragraph: 44,
    cta: 45,
    indices: [42, 43, 44, 45],
  },
  whatToExpect: {
    heading: 46,
    h1Features: [49, 50, 51, 52, 53, 54, 55],
    urgencyLabel: 56, // conditional on showCountdown
    scarcityText: 57, // rendered prose
    indices: [46, 49, 50, 51, 52, 53, 54, 55, 56, 57],
  },
  ctaBandC: {
    cta: 59,
    indices: [59],
  },
  curriculum: {
    // 9 modules with 186 bullets total
    modules: [
      { number: 1, headings: [60, 61, 62], description: 63, bullets: Array.from({ length: 11 }, (_, i) => 64 + i) },
      { number: 2, headings: [83, 84, 85], description: 86, bullets: Array.from({ length: 15 }, (_, i) => 87 + i) },
      { number: 3, headings: [102, 103, 104], description: 105, bullets: Array.from({ length: 7 }, (_, i) => 106 + i) },
      { number: 4, headings: [113, 114, 115], description: 116, bullets: Array.from({ length: 24 }, (_, i) => 117 + i) },
      { number: 5, headings: [142, 143, 144], description: 145, bullets: Array.from({ length: 19 }, (_, i) => 146 + i) },
      { number: 6, headings: [165, 166, 167], description: 168, bullets: Array.from({ length: 26 }, (_, i) => 169 + i) },
      { number: 7, headings: [195, 196, 197], description: 198, bullets: Array.from({ length: 20 }, (_, i) => 199 + i) },
      { number: 8, headings: [219, 220, 221], description: 222, bullets: Array.from({ length: 20 }, (_, i) => 223 + i) },
      { number: 9, headings: [244, 245, 246], description: 247, bullets: Array.from({ length: 44 }, (_, i) => 248 + i) },
    ],
    closingCta: 82,
    indices: [
      ...Array.from({ length: 15 }, (_, i) => 60 + i),
      ...Array.from({ length: 19 }, (_, i) => 83 + i),
      ...Array.from({ length: 11 }, (_, i) => 102 + i),
      ...Array.from({ length: 28 }, (_, i) => 113 + i),
      ...Array.from({ length: 23 }, (_, i) => 142 + i),
      ...Array.from({ length: 30 }, (_, i) => 165 + i),
      ...Array.from({ length: 24 }, (_, i) => 195 + i),
      ...Array.from({ length: 24 }, (_, i) => 219 + i),
      ...Array.from({ length: 48 }, (_, i) => 244 + i),
      82,
    ],
  },
  ctaBandD: {
    headings: [292, 293, 294],
    cta: 295,
    indices: [292, 293, 294, 295],
  },
  mentors: {
    headings: [296, 297],
    taHeading: 75,
    leadBadge: 80, // "Main Instructor"
    leadPhoto: 81, // Instructor photo
    instructors: [
      { id: "rishabh", photo: 298, name: 299, bio: 300 },
      { id: "srishti", photo: 301, name: 302, bio: 303 },
      { id: "abhishek", photo: 304, name: 305, bio: 306 },
      // Mentor 4: Rajat Bansal. Name heading 77 and thumbnail photo 76 are referenced out of order
      // because extract_content.py deduplicated the string "Rajat Bansal"
      // which first appeared inside Teaching Assistance at index 77.
      { id: "rajat", photo: 307, name: 77, bio: 308, altPhoto: 76 },
      { id: "siddharth", photo: 309, name: 310, bio: 311 },
      // Mentor 6: Ashutosh Negi. Name heading 79 and thumbnail photo 78 are referenced out of order
      // because extract_content.py deduplicated the string "Ashutosh Negi"
      // which first appeared inside Teaching Assistance at index 79.
      { id: "ashutosh", photo: 312, name: 79, bio: 313, altPhoto: 78 },
    ],
    indices: [75, 76, 77, 78, 79, 80, 81, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313],
  },
  ctaBandE: {
    headings: [314, 315],
    cta: 316,
    indices: [314, 315, 316],
  },
  outcomes: {
    headings: [317, 318],
    screenshots: [319, 320, 321, 322, 323, 324, 325, 326],
    indices: [317, 318, 319, 320, 321, 322, 323, 324, 325, 326],
  },
  reviews: {
    heading: 327,
    vimeoVideos: [328, 329, 330, 331, 332, 333, 334, 335, 336],
    indices: [327, 328, 329, 330, 331, 332, 333, 334, 335, 336],
  },
  beforeAndAfter: {
    headings: [337, 338],
    before: {
      heading: 339,
      image: 340,
      bullets: [341, 342, 343, 344],
    },
    after: {
      heading: 345,
      image: 346,
      bullets: [347, 348, 349, 350],
    },
    indices: [337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350],
  },
  pricing: {
    planName: 2,
    headings: [351, 352],
    bullets: [353, 354, 355],
    priceTiers: [356, 357],
    cta: 358,
    details: [
      { heading: 359, text: 360 }, // WHAT
      { heading: 361, text: 362 }, // WHEN
      { heading: 363, text: 364 }, // WHY
    ],
    closingHeadings: [365, 366],
    indices: [2, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366],
  },
  faq: {
    heading: 367,
    items: [
      { q: 368, a: 369 },
      { q: 370, a: 371 },
      { q: 372, a: 373 },
      { q: 374, a: 375 },
      { q: 376, a: 377 },
      { q: 378, a: 379 },
      { q: 380, a: 381 },
      { q: 382, a: 383 },
    ],
    indices: [367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383],
  },
  finalCtaAndFooter: {
    fields: [11, 12, 13],
    footerLogo: 384,
    links: [385, 386, 387, 388, 389],
    indices: [11, 12, 13, 384, 385, 386, 387, 388, 389],
  },
};

// Documented dropped block indices per client governing decision:
// - 3: rvs-pricing-card.vercel.app/tick.svg (replaced with inline SVG per Rule 5)
// - 7: Duplicate mobile H1
// - 47: Decorative leftarrow.svg
// - 48: Decorative rightarrow.svg
// - 58: Decorative down.svg
// - 141: Duplicate instructor photo A8rtTVc.jpg
// - 243: Duplicate instructor photo Vhbv4ng.jpg
export const DOCUMENTED_DROPS = [3, 7, 47, 48, 58, 141, 243];
