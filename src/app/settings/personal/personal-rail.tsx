"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ITEMS = [
  ["/settings/personal", "Account Settings"],
  ["/settings/personal/review", "Review Settings"],
] as const;

export function PersonalRail() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-6 hidden h-fit w-[250px] shrink-0 lg:block">
      {ITEMS.map(([href, label]) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "mb-1 flex h-[46px] items-center rounded-[8px] border-l-2 px-4 text-[16px] transition-colors",
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
