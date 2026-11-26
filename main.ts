import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Where the grader looks for the entry.
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const ENTRY_FILE = "entry.txt";
// The gate allows 1 to 200 UTF-8 characters.
const MAX_CHARS = 200;

// One funny line, 1-200 characters, written to /output/entry.txt.
// The line is the whole entry: a joke that turns somewhere unexpected.
const LINE =
  "My dentist asked if I floss. I said yes — emotionally, every night, over every decision I've ever made.";

// The gate refuses entries over 200 characters or that are only whitespace,
// so fail loudly here instead of writing an invalid entry.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(
    `entry is ${charCount} characters, outside the 1-${MAX_CHARS} limit`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, ENTRY_FILE), LINE, "utf8");
