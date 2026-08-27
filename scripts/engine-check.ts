import { HeuristicReviewEngine } from "../src/lib/review-engine";

const files = [
  {
    path: "app/Auth.php",
    addedLines: [
      { line: 42, text: '        $password = "sup3rs3cret-admin-pw";' },
      { line: 43, text: "        $x = 1;" },
    ],
  },
  {
    path: "scripts/import.py",
    addedLines: [
      { line: 15, text: "    except:" },
      { line: 16, text: '        print("could not read")' },
    ],
  },
  {
    path: "src/api.ts",
    addedLines: [
      { line: 89, text: "  return db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);" },
      { line: 90, text: "  const c: any = load();" },
    ],
  },
];

async function main() {
  const engine = new HeuristicReviewEngine();

  for (const strictness of ["LOW", "MEDIUM", "HIGH"] as const) {
    const r = await engine.reviewPullRequest({
      title: "t",
      branch: "b",
      author: "a",
      files,
      strictness,
      contexts: [],
    });
    console.log(
      `\n--- strictness ${strictness}: ${r.findings.length} findings, confidence ${r.confidenceScore}/5`,
    );
    for (const f of r.findings) {
      console.log(`    ${f.severity}  ${f.filePath}:${f.line}  [${f.rule}]`);
    }
    console.log(`    summary: ${r.summary}`);
  }

  console.log("\n--- optimizeRule ---");
  const out = await engine.optimizeRule(
    'Why: Hardcoded credentials are insecure\nGood:\nos.getenv("PW")\nBad:\npassword = "123456"',
  );
  console.log(out.split("\n").map((l) => "    " + l).join("\n"));
}

main();
