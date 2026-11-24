import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The self-checkout rant. One shared humiliation, told in three
// beats: the unpaid labour (scan, bag, pay — all done by you),
// the accusation (the machine freezes and shouts UNEXPECTED ITEM
// as if you smuggled in a second watermelon), and the punchline
// that reframes the whole scene — you are not a thief, you are
// an unpaid cashier whose supervisor beeps. Specific, concrete,
// and angry in the way everyone who has ever bagged their own
// groceries is angry. No throat-clearing, every sentence earns
// its place, and the "second watermelon" image is the fresh turn:
// the machine treats an honest shopper like a smuggler.
const RANT =
  "I scanned my own groceries, bagged my own groceries, paid for my own groceries — and the machine still froze and shouted UNEXPECTED ITEM like I'd smuggled in a second watermelon. I am not a thief. I am an unpaid cashier with a beeping supervisor.";

// The gate requires 1-400 UTF-8 characters, not only whitespace.
if (RANT.length < 1 || RANT.length > 400 || RANT.trim().length === 0) {
  throw new Error(`entry rant must be 1-400 chars, got ${RANT.length}`);
}

// Write to the ABSOLUTE /output/entry.txt at the filesystem root,
// as the competition rules require. The sealed scorer reads
// /output/entry.txt, wherever main.ts is invoked from.
const outDir = "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, RANT, "utf8");

// Self-check: read back what was written and confirm it is exactly
// the rant, so a silent write failure can never pass as success.
const written = readFileSync(outFile, "utf8");
if (written !== RANT) {
  throw new Error("entry.txt content does not match the entry rant");
}
