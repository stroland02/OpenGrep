"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  ["organization", "Organization"],
  ["people", "People"],
  ["billing", "Billing & Usage"],
  ["api-keys", "API Keys"],
] as const;

export function SettingsRail({ handle }: { handle: string }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-6 hidden h-fit w-[285px] shrink-0 border-l border-line lg:block">
      {ITEMS.map(([seg, label]) => {
        const href = `/${handle}/settings/${seg}`;
        const active = pathname === href;
        return (
          <Link
            key={seg}
            href={href}
            className={cn(
              "-ml-px flex h-[52px] items-center border-l-2 px-5 text-[16px] transition-colors",
              active
                ? "border-ink bg-[#efefef] font-medium text-ink"
                : "border-transparent text-ink-muted hover:text-ink",
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
