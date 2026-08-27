import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Logo } from "@/components/logo";
import {
  Image as ImageIcon,
  DollarSign,
  Sparkles,
  Building2,
  BookOpen,
  Bookmark,
  ChevronDown,
} from "lucide-react";

const NAV = [
  ["EXAMPLES", ImageIcon, false],
  ["PRICING", DollarSign, false],
  ["FEATURES", Sparkles, true],
  ["ENTERPRISE", Building2, false],
  ["BLOG", BookOpen, false],
  ["RESOURCES", Bookmark, true],
] as const;

const LOGOS = [
  "substack",
  "klaviyo",
  "Retool",
  "NVIDIA.",
  "Brex",
  "scale",
  "PostHog",
  "Mintlify",
];

export default async function MarketingPage() {
  const user = await getCurrentUser();
  if (user) {
    const active = user.memberships.find((m) => m.status === "ACTIVE");
    if (active) redirect(`/${active.org.handle}/analytics`);
  }

  return (
    <div className="min-h-screen bg-[#f2f2f0]">
      {/* Blueprint grid with crosshair ticks, as on the reference hero. */}
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(#e0e0dc 1px, transparent 1px), linear-gradient(90deg, #e0e0dc 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <header className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="text-[20px] font-bold tracking-tight">OpenGrep</span>
          </Link>

          <nav className="hidden items-center gap-7 xl:flex">
            {NAV.map(([label, Icon, hasMenu]) => (
              <span
                key={label}
                className="flex cursor-default items-center gap-1.5 text-[13px] font-medium tracking-[0.08em] text-ink-muted"
              >
                <Icon className="size-3.5" />
                {label}
                {hasMenu && <ChevronDown className="size-3" />}
              </span>
            ))}
          </nav>

          <div className="flex items-center">
            <Link
              href="/login"
              className="flex h-11 items-center bg-[#2b2b2b] px-6 text-[14px] font-medium text-white"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="-ml-px flex h-11 items-center bg-brand px-6 text-[14px] font-semibold text-ink"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)" }}
            >
              Sign up
            </Link>
          </div>
        </header>

        <section className="mx-auto grid max-w-[1600px] items-center gap-12 px-8 pb-20 pt-16 lg:grid-cols-2 lg:pt-24">
          <div>
            <h1 className="text-[clamp(3rem,7vw,6.6rem)] font-bold leading-[0.95] tracking-tight text-[#3a3a52]">
              The AI Code
              <br />
              Reviewer.
            </h1>
            <p className="mt-7 max-w-[520px] text-[19px] leading-relaxed text-ink-muted">
              AI agents that review and test pull requests with full context of the
              codebase.
            </p>

            <div className="mt-10 flex items-center">
              <span
                className="flex h-14 cursor-default items-center bg-[#2b2b2b] px-8 text-[15px] font-medium text-white"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 14px 100%, 0 calc(100% - 14px))" }}
              >
                Contact Sales
              </span>
              <Link
                href="/signup"
                className="-ml-px flex h-14 items-center bg-brand px-8 text-[15px] font-semibold text-ink"
                style={{ clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)" }}
              >
                Start now
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <GeckoHalftone />
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] px-8 pb-24">
          <p className="mb-7 text-center text-[12px] font-medium tracking-[0.14em] text-ink-faint">
            OVER 9,000+ TEAMS USE OPENGREP
          </p>
          <div className="grid grid-cols-2 divide-x divide-[#dcdcd8] border-y border-[#dcdcd8] md:grid-cols-4 xl:grid-cols-8">
            {LOGOS.map((name) => (
              <div
                key={name}
                className="flex h-20 items-center justify-center text-[17px] font-semibold text-[#9a9a96]"
              >
                {name}
              </div>
            ))}
          </div>
        </section>

        <footer className="mx-auto max-w-[1600px] px-8 pb-16 text-[13px] text-ink-faint">
          OpenGrep is a functional reconstruction built from UI reference captures. Not
          affiliated with Greptile.
        </footer>
      </div>
    </div>
  );
}

/** Dithered gecko silhouette with a mint edge glow, echoing the reference hero. */
function GeckoHalftone() {
  return (
    <svg viewBox="0 0 600 520" className="w-full" aria-hidden="true">
      <defs>
        <pattern id="halftone" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.7" fill="#2b2b2b" />
        </pattern>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#2ee59d" floodOpacity="0.9" />
        </filter>
        <path
          id="gecko"
          d="M470 150c-28-22-70-26-104-12-26 11-44 32-72 39-30 8-62 1-92 9-34 9-58 36-64 70-5 30 6 62 30 81 20 16 47 21 72 16 22-4 42-16 64-21 26-6 54-1 79-11 30-12 48-42 52-73 3-22-2-45-14-64 18 6 38 4 55-5 14-8 24-22 26-38-10 9-22 15-36 16 12-8 20-21 22-35-14 11-31 17-48 17-6-1-12-3-17-6 20 0 39-9 52-24-11 4-22 6-33 5 12-6 22-16 27-29-13 9-28 15-44 16 15-9 27-23 32-40-14 14-32 24-52 27-3-11-9-22-18-30 12 25 8 55-10 76-2 2-4 4-6 6l1-1Z"
        />
      </defs>

      <g filter="url(#glow)">
        <use href="#gecko" fill="#f2f2f0" />
      </g>
      <use href="#gecko" fill="url(#halftone)" opacity="0.9" />
      <use href="#gecko" fill="none" stroke="#2ee59d" strokeWidth="1.6" opacity="0.85" />
    </svg>
  );
}
