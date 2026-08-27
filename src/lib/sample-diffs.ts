import type { ChangedFile } from "./review-engine";

/**
 * OpenGrep does not clone repositories, so there is no real diff to read. The
 * review engine still needs real input to be worth anything, so each pull
 * request gets a deterministic synthetic diff derived from its id.
 *
 * The engine itself is unmodified — it reads these lines exactly as it would
 * read lines from a real patch. Swap this provider for a Git reader and
 * nothing downstream changes.
 */

const SNIPPETS: ChangedFile[][] = [
  [
    {
      path: "app/Http/Controllers/AuthController.php",
      addedLines: [
        { line: 40, text: "    public function login(Request $request)" },
        { line: 41, text: "    {" },
        { line: 42, text: '        $password = "sup3rs3cret-admin-pw";' },
        { line: 43, text: "        $user = User::where('email', $request->email)->first();" },
        { line: 44, text: "        return response()->json(['ok' => true]);" },
      ],
    },
    {
      path: "app/Services/Billing.php",
      addedLines: [
        { line: 116, text: "        try {" },
        { line: 117, text: "            $this->gateway->charge($amount);" },
        { line: 118, text: "        } catch (Exception $e) {}" },
      ],
    },
    {
      path: "resources/js/dashboard.ts",
      addedLines: [
        { line: 26, text: "export function render(data: any) {" },
        { line: 27, text: '  console.log("rendering", data);' },
        { line: 28, text: "  return data.items.map((i) => i.name);" },
      ],
    },
  ],
  [
    {
      path: "scripts/import.py",
      addedLines: [
        { line: 12, text: "def load(path):" },
        { line: 13, text: "    try:" },
        { line: 14, text: "        return open(path).read()" },
        { line: 15, text: "    except:" },
        { line: 16, text: '        print("could not read", path)' },
      ],
    },
    {
      path: "resources/js/dashboard.ts",
      addedLines: [
        { line: 62, text: "// TODO: handle the empty case properly" },
        { line: 63, text: "const config: any = loadConfig();" },
        { line: 64, text: "  repo.save(config);" },
      ],
    },
  ],
  [
    {
      path: "src/server/queries.ts",
      addedLines: [
        { line: 88, text: "export async function findUser(req: Request) {" },
        { line: 89, text: "  return db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);" },
        { line: 90, text: "}" },
      ],
    },
    {
      path: "src/server/cache.ts",
      addedLines: [
        { line: 21, text: "const API_KEY = \"ak_live_7f3d9c2b81aa\";" },
        { line: 22, text: "export const ttl = 3600;" },
      ],
    },
  ],
];

/** Stable hash so the same PR always produces the same diff. */
function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function diffForPullRequest(pullRequestId: string): ChangedFile[] {
  return SNIPPETS[hash(pullRequestId) % SNIPPETS.length];
}
