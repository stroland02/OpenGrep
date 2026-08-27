import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The reference UI shows "1 day ago", "about 3 hours ago", "less than a minute
 * ago" — date-fns' own phrasing, so we use it directly rather than rolling a
 * formatter that would drift from the captures.
 */
export function relativeTime(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

/** Trial banner copy. Counts down daily, like the real one. */
export function daysLeft(trialEndsAt: Date | string): number {
  const ms = new Date(trialEndsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

/** "May 20, 2026" — the format used in the API Keys table. */
export function longDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** "5/19/2026" — the format used in the pull-request picker. */
export function shortDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US");
}

/** Analytics x-axis buckets render as "13 MAY". */
export function axisDate(date: Date): string {
  return `${date.getDate()} ${date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase()}`;
}

/**
 * Average time to merge is shown as "3.5d" on the chart axis and "—" when
 * there is nothing to average.
 */
export function formatDuration(hours: number | null): string {
  if (hours === null || Number.isNaN(hours)) return "—";
  const days = hours / 24;
  if (days >= 1) return `${days.toFixed(1)}d`;
  return `${Math.round(hours)}h`;
}

/**
 * Case-insensitive glob matching, enough for the patterns the product uses:
 * `**` (any depth), `*` (within a segment), and bracket character classes such
 * as `**\/[Aa][Gg][Ee][Nn][Tt][Ss].md`.
 */
export function globToRegExp(glob: string): RegExp {
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "[") {
      const end = glob.indexOf("]", i);
      if (end > i) {
        out += glob.slice(i, end + 1);
        i = end;
        continue;
      }
      out += "\\[";
    } else if (c === "*") {
      if (glob[i + 1] === "*") {
        // `**/` swallows any number of leading segments, including none.
        if (glob[i + 2] === "/") {
          out += "(?:.*/)?";
          i += 2;
        } else {
          out += ".*";
          i += 1;
        }
      } else {
        out += "[^/]*";
      }
    } else if (".+^${}()|\\/".includes(c)) {
      out += "\\" + c;
    } else if (c === "?") {
      out += "[^/]";
    } else {
      out += c;
    }
  }
  return new RegExp(`^${out}$`, "i");
}

export function matchesGlob(path: string, glob: string): boolean {
  return globToRegExp(glob).test(path);
}

/** Truncation used in tables — the product ellipsises rather than wraps. */
export function truncate(text: string, max: number): string {
  return text.length <= max ? text : text.slice(0, max) + "…";
}

export function pluralize(n: number, singular: string, plural?: string): string {
  return `${n} ${n === 1 ? singular : plural ?? singular + "s"}`;
}
