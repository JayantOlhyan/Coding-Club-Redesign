import { content, SECTION_MAP, DOCUMENTED_DROPS } from "../lib/content";
import manifestData from "../public/images/manifest.json";

interface Assignment {
  section: string;
  subfield?: string;
}

function verifyParity(targetSection?: string): boolean {
  const totalBlocks = content.blocks.length;
  console.log(`=======================================================`);
  console.log(`PARITY & BIJECTION VERIFICATION REPORT`);
  console.log(`Total blocks in content.json: ${totalBlocks}`);
  console.log(`=======================================================\n`);

  const assignmentMap = new Map<number, string[]>();

  // Helper to record an assignment
  function record(idx: number, dest: string) {
    if (!assignmentMap.has(idx)) {
      assignmentMap.set(idx, []);
    }
    assignmentMap.get(idx)!.push(dest);
  }

  // 1. Record documented drops
  for (const dropIdx of DOCUMENTED_DROPS) {
    record(dropIdx, "DOCUMENTED_DROPS");
  }

  // 2. Record SECTION_MAP destinations
  for (const [secName, secData] of Object.entries(SECTION_MAP)) {
    const indices = (secData as any).indices as number[];
    if (!indices || !Array.isArray(indices)) {
      console.error(`ERROR: Section ${secName} does not define an 'indices' array!`);
      return false;
    }
    for (const idx of indices) {
      record(idx, `SECTION_MAP.${secName}`);
    }
  }

  // 3. Check bijection across all blocks 0 to totalBlocks - 1
  let missingCount = 0;
  let duplicateCount = 0;
  let exactCount = 0;

  const missingIndices: number[] = [];
  const duplicateIndices: { index: number; destinations: string[] }[] = [];

  for (let i = 0; i < totalBlocks; i++) {
    const destinations = assignmentMap.get(i) || [];
    if (destinations.length === 0) {
      missingCount++;
      missingIndices.push(i);
    } else if (destinations.length > 1) {
      duplicateCount++;
      duplicateIndices.push({ index: i, destinations });
    } else {
      exactCount++;
    }
  }

  console.log(`BIJECTION ASSERTION RESULTS:`);
  console.log(`- Exact 1-to-1 mapped blocks : ${exactCount}`);
  console.log(`- Missing / unassigned blocks : ${missingCount}`);
  console.log(`- Multiply-assigned blocks    : ${duplicateCount}`);
  console.log(`- Documented drops            : ${DOCUMENTED_DROPS.length}`);
  console.log(`- Active section blocks       : ${exactCount - DOCUMENTED_DROPS.length}\n`);

  if (missingCount > 0) {
    console.error(`FAILED: ${missingCount} blocks have no destination:`);
    for (const idx of missingIndices) {
      const b = content.blocks[idx];
      console.error(`  [${idx}] (${b.type}): ${JSON.stringify((b as any).text || (b as any).src || (b as any).name)}`);
    }
  }

  if (duplicateCount > 0) {
    console.error(`FAILED: ${duplicateCount} blocks assigned to multiple destinations:`);
    for (const d of duplicateIndices) {
      console.error(`  [${d.index}] assigned to: ${d.destinations.join(", ")}`);
    }
  }

  // 4. Check Image Manifest Coverage for every image block in SECTION_MAP
  console.log(`--- IMAGE MANIFEST COVERAGE ASSERTION ---`);
  let manifestMisses = 0;
  let activeImageCount = 0;

  for (const [secName, secData] of Object.entries(SECTION_MAP)) {
    const indices = (secData as any).indices as number[];
    for (const idx of indices) {
      const b = content.blocks[idx];
      if (b.type === "image") {
        activeImageCount++;
        const src = (b as any).src;
        try {
          const meta = (manifestData as Record<string, any>)[src];
          if (!meta || !meta.width || !meta.height || !meta.webpFilename) {
            console.error(`  FAIL: Image manifest miss or invalid dimensions for [${idx}] (${src}) in ${secName}`);
            manifestMisses++;
          }
        } catch (err: any) {
          console.error(`  FAIL: Exception checking manifest for [${idx}] (${src}): ${err.message}`);
          manifestMisses++;
        }
      }
    }
  }

  console.log(`- Active image blocks in SECTION_MAP : ${activeImageCount}`);
  console.log(`- Manifest coverage misses           : ${manifestMisses}`);
  if (manifestMisses === 0) {
    console.log(`MANIFEST COVERAGE: PASSED (100% of active images resolved with explicit dimensions)\n`);
  } else {
    console.error(`MANIFEST COVERAGE: FAILED (${manifestMisses} misses)\n`);
  }

  if (targetSection) {
    console.log(`--- TARGET SECTION VERIFICATION: ${targetSection} ---`);
    const secData = (SECTION_MAP as any)[targetSection];
    if (!secData) {
      console.error(`Section '${targetSection}' not found in SECTION_MAP!`);
      return false;
    }
    console.log(`Assigned indices for ${targetSection}:`, secData.indices);
    for (const idx of secData.indices) {
      const b = content.blocks[idx];
      const val = (b as any).text || (b as any).src || (b as any).name || "";
      console.log(`  [${idx}] ${b.type}: ${String(val).substring(0, 60)}`);
    }
  }

  const passed = missingCount === 0 && duplicateCount === 0 && exactCount === totalBlocks && manifestMisses === 0;
  console.log(`\nBIJECTION VERIFICATION: ${passed ? "PASSED (100% Bijection + Manifest Coverage confirmed)" : "FAILED"}`);
  console.log(`=======================================================`);
  return passed;
}

const target = process.argv[2];
const success = verifyParity(target);
if (!success) {
  process.exit(1);
}
