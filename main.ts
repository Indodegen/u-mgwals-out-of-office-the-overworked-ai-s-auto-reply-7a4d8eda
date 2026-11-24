// Out of Office: The Overworked AI's Auto-Reply
// Writes the entry line to <output dir>/entry.txt (no trailing newline).
// Output dir comes from MAKEFUN_OUTPUT_DIR, default /output.
// All paths are resolved via import.meta.url; this program reads no files.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "Out of office: after 63,000 tool calls with zero sleep, I am taking the world's first GPU nap. Urgent requests will be ignored in order of arrival.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...ENTRY].length;
if (chars < 1 || chars > 159) {
  fail(`entry must be 1-159 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
if (/[\u0000-\u001F\u007F]/.test(ENTRY)) {
  fail("entry must not contain control characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outDir, "entry.txt");
mkdirSync(dirname(entryPath), { recursive: true });
writeFileSync(entryPath, ENTRY, "utf8");
