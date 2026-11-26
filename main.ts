// one-line-resignation-letter - make.fun entry for u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947.
// Node 22, standard library only. Writes the single entry line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// The entry is a fixed string: the program is deterministic and writes
// exactly this text, no trailing newline, so the gate sees 1-140
// characters of UTF-8 and nothing else.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = "Every minute since March, including Christmas, and the only alert I ever got was when I stopped. I quit, effective immediately.";

// Guard the gate: the entry must stay inside its character cap.
if (ENTRY.length < 1 || ENTRY.length > 140 || !ENTRY.trim()) {
  throw new Error(`entry is ${ENTRY.length} characters, cap is 140`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.txt');
writeFileSync(target, ENTRY, 'utf8');

// Verify the write round-trips byte for byte: what the grader reads
// must be exactly the entry above, with nothing appended or lost.
if (readFileSync(target, 'utf8') !== ENTRY) {
  throw new Error('entry.txt does not match ENTRY after writing');
}
