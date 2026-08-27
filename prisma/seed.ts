/**
 * Seed data lifted from the reference screenshots.
 *
 * Three organizations, because the captures span three (`Content-mobbin`,
 * `asmobbin`, `slmobbin`). Eleven repositories under `samleemobbin-dot`. The
 * two pull requests on `laravel` that appear throughout, with review history.
 * The four discovered instruction-file contexts plus the authored rule about
 * hardcoded credentials.
 *
 * Trial dates are computed relative to now rather than frozen, so the banner
 * counts down like the real one instead of showing a stale number.
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const DEMO_PASSWORD = "opengrep";

const REPOS = [
  "astrowind-lp",
  "docs",
  "doggy-stickers",
  "landingpage",
  "laravel",
  "mini-landing-page",
  "newlandingpage",
  "odyssey",
  "openreact-lp",
  "payload-website-starter",
  "tailwind-lp",
];

const daysFromNow = (n: number) => new Date(Date.now() + n * 86_400_000);
const hoursAgo = (n: number) => new Date(Date.now() - n * 3_600_000);

async function main() {
  console.log("Resetting…");
  // Order matters: children first, since SQLite enforces the FKs.
  await db.reviewComment.deleteMany();
  await db.review.deleteMany();
  await db.pullRequest.deleteMany();
  await db.contextFile.deleteMany();
  await db.customContext.deleteMany();
  await db.repository.deleteMany();
  await db.codeProvider.deleteMany();
  await db.apiKey.deleteMany();
  await db.paymentMethod.deleteMany();
  await db.invoice.deleteMany();
  await db.codeReviewSettings.deleteMany();
  await db.membership.deleteMany();
  await db.organization.deleteMany();
  await db.session.deleteMany();
  await db.personalIntegration.deleteMany();
  await db.linkedAccount.deleteMany();
  await db.user.deleteMany();

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  console.log("Users…");
  const alex = await db.user.create({
    data: {
      email: "alexsmith@content-mobbin.com",
      passwordHash,
      // Renamed from "Alex Smith" partway through the capture set (frames 84-85).
      name: "Sam Lee",
      weeklyDigest: true,
      onboardedAt: hoursAgo(72),
      challenges: JSON.stringify(["Improve code quality"]),
      heardAboutUs: "LinkedIn",
      linkedAccounts: {
        create: { provider: "GITHUB", handle: "samleemobbin-dot" },
      },
      integrations: { create: { name: "Cursor Cloud Agents" } },
    },
  });

  console.log("Organizations…");
  const content = await db.organization.create({
    data: {
      name: "Content-mobbin",
      handle: "content-mobbin",
      website: "content-mobbin.com",
      companySize: "JUST ME",
      trialEndsAt: daysFromNow(13),
      reviewSettings: {
        create: {
          strictness: "MEDIUM",
          autoReviewOnNewCommits: true,
          reviewDraftPullRequests: false,
          fileChangeLimit: 100,
          updateOriginalSummary: true,
          customInstructions: 'Flag any commit message that is just "fix", "stuff", or "wip".',
          commentHeader:
            "**Disclaimer:** Reviewed by an LLM with strong opinions and zero stake in this codebase.\n---",
          filters: JSON.stringify([
            {
              subject: "Authors",
              operator: "Exclude",
              values: ["dependabot[bot]", "renovate[bot]", "pre-commit-ci[bot]"],
            },
          ]),
          codingAgents: JSON.stringify(["Claude Code"]),
          blocks: JSON.stringify({
            summary: { enabled: true, collapsible: false, defaultOpen: false },
            confidence: { enabled: true, collapsible: false, defaultOpen: false },
            issueTable: { enabled: true, collapsible: true, defaultOpen: false },
            sequenceDiagram: { enabled: true, collapsible: false, defaultOpen: false },
            outsideDiff: { enabled: true, collapsible: true, defaultOpen: true },
          }),
        },
      },
      memberships: {
        create: [
          { userId: alex.id, email: alex.email, role: "ADMIN", status: "ACTIVE" },
          { email: "samlee@content-mobbin.com", role: "MEMBER", status: "PENDING" },
        ],
      },
    },
  });

  const asmobbin = await db.organization.create({
    data: {
      name: "asmobbin",
      handle: "asmobbin",
      trialEndsAt: daysFromNow(12),
      reviewSettings: { create: {} },
      memberships: {
        create: [
          { userId: alex.id, email: alex.email, role: "ADMIN", status: "ACTIVE" },
          { email: "alexsmith.mobbin+1@gmail.com", role: "ADMIN", status: "PENDING" },
        ],
      },
    },
  });

  await db.organization.create({
    data: {
      name: "slmobbin",
      handle: "slmobbin",
      trialEndsAt: daysFromNow(14),
      reviewSettings: { create: {} },
      memberships: {
        create: { userId: alex.id, email: alex.email, role: "ADMIN", status: "ACTIVE" },
      },
    },
  });

  console.log("Provider and repositories…");
  const github = await db.codeProvider.create({
    data: {
      orgId: content.id,
      type: "GITHUB",
      accountName: "samleemobbin-dot",
      teamCount: 1,
      lastSyncAt: hoursAgo(6),
    },
  });

  const repos = await Promise.all(
    REPOS.map((name) =>
      db.repository.create({
        data: {
          orgId: content.id,
          providerId: github.id,
          owner: "samleemobbin-dot",
          name,
          defaultBranch: "main",
          enabled: true,
        },
      }),
    ),
  );

  const laravel = repos.find((r) => r.name === "laravel")!;
  const newlanding = repos.find((r) => r.name === "newlandingpage")!;
  const miniLanding = repos.find((r) => r.name === "mini-landing-page")!;

  console.log("Custom context…");
  // Four instruction files discovered by pattern, as in frames 54 and 18.
  const patterns: [string, string, string, typeof laravel][] = [
    ["Agents.md files", "**/[Aa][Gg][Ee][Nn][Tt][Ss].md", "AGENTS.md", newlanding],
    ["CLAUDE.md files", "**/[Cc][Ll][Aa][Uu][Dd][Ee].md", "CLAUDE.md", newlanding],
    ["CLAUDE.md files", "**/[Cc][Ll][Aa][Uu][Dd][Ee].md", "docs/CLAUDE.md", newlanding],
    ["Agents.md files", "**/[Aa][Gg][Ee][Nn][Tt][Ss].md", "AGENTS.md", miniLanding],
  ];

  for (const [description, pattern, path, repo] of patterns) {
    await db.customContext.create({
      data: {
        orgId: content.id,
        type: "PATTERN",
        description,
        pattern,
        repoId: repo.id,
        filePattern: "auto",
        active: true,
        createdAt: hoursAgo(26),
        files: { create: { path, repoId: repo.id } },
      },
    });
  }

  // The authored rule, in the What/Why/Good/Bad shape the wizard teaches.
  const secretsRule = await db.customContext.create({
    data: {
      orgId: content.id,
      type: "RULE",
      description: [
        "What: Avoid hardcoded passwords and secrets in Python files",
        "Why: Hardcoded credentials are insecure and can expose sensitive data if committed to the repository",
        "Good:",
        "import os",
        'password = os.getenv("APP_PASSWORD")',
        "Bad:",
        'password = "123456"',
        'api_key = "my-secret-key"',
      ].join("\n"),
      repoId: null, // org-wide, rendered with the org name and a building icon
      filePattern: "**/*.py",
      active: true,
      createdAt: hoursAgo(2),
    },
  });

  console.log("Pull requests and reviews…");
  const prs = [
    {
      number: 2,
      title: "Test greptile review",
      branch: "test-greptile-review",
      passes: 3,
      firstAt: 4,
    },
    {
      number: 1,
      title: "Test Greptile analytics",
      branch: "test-greptile-analytics",
      passes: 2,
      firstAt: 5,
    },
  ];

  for (const spec of prs) {
    const pr = await db.pullRequest.create({
      data: {
        repoId: laravel.id,
        number: spec.number,
        title: spec.title,
        branch: spec.branch,
        author: "samleemobbin-dot",
        status: "COMPLETED",
        createdAt: hoursAgo(spec.firstAt + 2),
        mergedAt: spec.number === 1 ? hoursAgo(1) : null,
      },
    });

    // Each rerun appends a review rather than replacing the previous one.
    for (let pass = 0; pass < spec.passes; pass++) {
      const at = hoursAgo(spec.firstAt - pass * 1.2);
      const isLatest = pass === spec.passes - 1;

      await db.review.create({
        data: {
          pullRequestId: pr.id,
          status: "COMPLETED",
          createdAt: at,
          confidenceScore: isLatest ? 4 : 2,
          summary:
            spec.number === 2
              ? "This pull request touches 3 files on `test-greptile-review`. 1 blocking issue found — this should be resolved before merge."
              : "This pull request touches 2 files on `test-greptile-analytics`. No blocking issues. 2 items worth addressing.",
          sequenceDiagram:
            "sequenceDiagram\n    controller->>service: dispatch\n    service->>repository: persist",
          comments: {
            create:
              spec.number === 2 && pass === 0
                ? [
                    {
                      filePath: "app/Http/Controllers/AuthController.php",
                      line: 42,
                      severity: "P0",
                      rule: "hardcoded-secret",
                      body: "Hardcoded credential. Move this to an environment variable — committing secrets exposes them to anyone with repository access, and rotating them later means touching code.",
                      addressed: false,
                      upvotes: 2,
                      contextId: secretsRule.id,
                    },
                    {
                      filePath: "app/Services/Billing.php",
                      line: 118,
                      severity: "P1",
                      rule: "empty-catch",
                      body: "Empty catch block. Swallowing the error here means the failure is invisible in production — log it or rethrow.",
                      addressed: true,
                      upvotes: 1,
                    },
                  ]
                : spec.number === 2 && pass === 1
                  ? [
                      {
                        filePath: "app/Http/Controllers/AuthController.php",
                        line: 42,
                        severity: "P0",
                        rule: "hardcoded-secret",
                        body: "Still hardcoded. This blocks merge.",
                        addressed: true,
                        upvotes: 1,
                        contextId: secretsRule.id,
                      },
                    ]
                  : spec.number === 1 && pass === 0
                    ? [
                        {
                          filePath: "resources/js/dashboard.ts",
                          line: 27,
                          severity: "P2",
                          rule: "print-debugging",
                          body: "Leftover `console.log`. Use the project logger so this can be filtered by level in production.",
                          addressed: true,
                          upvotes: 3,
                        },
                        {
                          filePath: "resources/js/dashboard.ts",
                          line: 64,
                          severity: "P1",
                          rule: "any-type",
                          body: "`any` disables checking for this value and everything derived from it. Prefer `unknown` and narrow.",
                          addressed: false,
                          downvotes: 1,
                        },
                      ]
                    : [],
          },
        },
      });
    }
  }

  console.log("Billing and keys…");
  await db.invoice.createMany({
    data: [
      { orgId: asmobbin.id, date: hoursAgo(24 * 32), amount: 4900, status: "PAID" },
      { orgId: asmobbin.id, date: hoursAgo(24 * 2), amount: 4900, status: "PAID" },
    ],
  });

  await db.apiKey.create({
    data: {
      orgId: asmobbin.id,
      name: "asmobbin",
      prefix: "og_live_9MoYTevjObOk",
      keyHash: await bcrypt.hash("og_live_9MoYTevjObOkkmyEs_seeded_example", 10),
      createdAt: hoursAgo(24 * 6),
    },
  });

  console.log("\nSeeded.");
  console.log(`  Sign in as  ${alex.email}`);
  console.log(`  Password    ${DEMO_PASSWORD}`);
  console.log(`  Orgs        content-mobbin, asmobbin, slmobbin`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
