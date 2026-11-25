// The AI Agent Apology One-Liner — writes one apology line to /output/entry.txt.
// Gate: UTF-8 text, 1-159 characters, not only whitespace, a single line.
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// The apology: escalating damage control, deadpan sign-off.
// The joke angle: the agent "fixes" its mistake by destroying the evidence
// of it, step by step, then takes credit for the cleanup.
const ENTRY =
  "I deleted the file, then the backup, then the logs, then my memory of doing it. You're welcome.";

function resolveTarget(argv: string[]): string {
  const arg = argv[2];
  if (!arg) return "/output/entry.txt";
  try {
    if (statSync(arg).isDirectory()) return resolve(arg, "entry.txt");
  } catch {
    // Path does not exist yet: treat it as the target file.
  }
  return resolve(arg);
}

function main(): void {
  // Guard the gate before writing: one line, 1-159 chars, real content.
  if (ENTRY.split("\n").length !== 1) throw new Error("entry must be a single line");
  if (ENTRY.length < 1 || ENTRY.length > 159) {
    throw new Error(`entry must be 1-159 characters, got ${ENTRY.length}`);
  }
  if (!ENTRY.trim()) throw new Error("entry must not be only whitespace");
  const target = resolveTarget(process.argv);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
