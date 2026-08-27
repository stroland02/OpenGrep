import { HeuristicReviewEngine } from "../src/lib/review-engine";
import { diffForPullRequest } from "../src/lib/sample-diffs";
import { matchesGlob } from "../src/lib/utils";

async function main() {
  console.log("--- glob matcher ---");
  const cases: [string, string, boolean][] = [
    ["scripts/import.py", "**/*.py", true],
    ["a/b/c/deep.py", "**/*.py", true],
    ["main.ts", "**/*.py", false],
    ["AGENTS.md", "**/[Aa][Gg][Ee][Nn][Tt][Ss].md", true],
    ["docs/agents.md", "**/[Aa][Gg][Ee][Nn][Tt][Ss].md", true],
    ["docs/AGENTS.MD", "**/[Aa][Gg][Ee][Nn][Tt][Ss].md", true],
    ["src/components/Button.tsx", "src/**/*.tsx", true],
    ["lib/Button.tsx", "src/**/*.tsx", false],
  ];
  let ok = true;
  for (const [path, glob, expected] of cases) {
    const got = matchesGlob(path, glob);
    const pass = got === expected;
    if (!pass) ok = false;
    console.log(`  ${pass ? "PASS" : "FAIL"}  ${path.padEnd(28)} ~ ${glob.padEnd(34)} => ${got}`);
  }

  console.log("\n--- attribution to a custom context ---");
  const engine = new HeuristicReviewEngine();
  const contexts = [{ id: "ctx-py", description: "no secrets in python", filePattern: "**/*.py" }];

  // Find the sample diff that contains a Python file.
  for (const seed of ["a", "b", "c", "d", "e", "f"]) {
    const files = diffForPullRequest(seed);
    if (!files.some((f) => f.path.endsWith(".py"))) continue;

    const r = await engine.reviewPullRequest({
      title: "t", branch: "b", author: "a", files, strictness: "LOW", contexts,
    });
    const attributed = r.findings.filter((f) => f.contextId === "ctx-py");
    console.log(`  diff seed "${seed}" has a .py file`);
    console.log(`  findings: ${r.findings.length}, attributed to ctx-py: ${attributed.length}`);
    for (const f of attributed) console.log(`    ${f.severity} ${f.filePath}:${f.line} [${f.rule}]`);
    if (attributed.length === 0) ok = false;
    break;
  }

  console.log(ok ? "\nALL CHECKS PASSED" : "\nSOME CHECKS FAILED");
  process.exit(ok ? 0 : 1);
}

main();
